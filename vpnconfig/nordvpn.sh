#!/bin/bash

scriptversion="3.5"
scriptshpath=$(readlink -f "$0")
scriptpath=$(dirname "$scriptshpath")
if [ $# -lt 1 ]; then
  cat <<EOF

Usage:
	$0 [-c] [-d] [-l] [-p tcp|udp] [-n port] [-x] [-s] [-c id-file] [server name]

Parameters:
	-d            - daemonize - script will exit upon VPN connection
	-l            - output server list matched with the grep pattern (see examples below)
	-p tcp|udp    - sets preferred protocol, default is OpenVPN UDP
	-s            - print connection status and return exit code of 0 (connected), 1 (connecting), 2 (disconnected)
	-c id-file    - file in which your vpn! credentials are stored (optional - you will be prompted if not provided)
	                file should be: 1st line = username, 2nd line = password - file should be visible only to the current user
	-t	      - checks and shows the top 10 fastest vpn! servers by latency
	-f 	      - connects you to the fastest server based on latency (ping)
	-m            - run on list exist
	-x            - stop the current (daemonized) VPN connection
	-n port       - port number to use (default 443 for TCP, 553 for UDP)
	[server name] - this is grep pattern by which the script will filter server list (if multiple results, selects random server for connection)
	-u	      - checks version and updates this script

List servers:
	$0 -l "New York"  - lists all servers in New York
	$0 -l "|us|"      - lists all servers with US Geolocation (so incl. virtual locations)
Connect:
	$0 -p udp "|us|"  - connects to a random US-presence server using OpenVPN UDP protocol
	$0 -p tcp Texas   - connects to a random Texas server using OpenVPN TCP protocol
	$0 -n 55 Texas    - connect via port 55 to random Texas server
EOF
  exit -2
fi

cd $(dirname $0)

SERVICE_INTERFACE=service
OPENVPN_SERVICE=openvpn
VPN_NAME=NORDVPN
VPN_STATUS_FILE=/tmp/nordvpn-status.txt
VPN_LOG_FILE=/tmp/nordvpn-log.txt

# If no root privs, try to get them

if [[ ! "$(whoami)" == "root" ]]; then
  echo "[ VPN! Linux CLI Script ]"

  # If no sudo, can't get root privs - so exit

  if [[ $(which sudo) == "" ]]; then
    echo "'sudo' package missing! Please install."
    echo "e.g.: apt-get install sudo"
    exit 1
  fi

  echo "Requesting su permissions..."
  sudo $0 $*

  # If getting root privs fails, advise user to use script with root privs and exit

  if [[ $? > 0 ]]; then
    echo
    echo "Acquiring su permission failed!"
    echo "Please run this script with sudo permissions!"
    echo "(e.g. 'sudo $0' or 'sudo bash $0')"
    echo
    exit 1
  fi

  exit 0
fi

# Check what distro is installed to decide if running openvpn as service or process

distro() {
  if [[ -f /etc/redhat-release ]]; then
    os=$(cat /etc/redhat-release)
  elif [[ $(which lsb_release) != "" ]]; then
    os=$(lsb_release -s -d)

  else
    os="$(uname -s) $(uname -r) $(uname -v)"
  fi
}

# Function to check if package installed, and if not, ask if user wants to attempt installation
# If user doesn't, exit. If user does, install it using either yum or apt-get

function checkpkg {
  if [[ $(which $1) == "" ]]; then
    echo -n "Package '$1' not found! Attempt installation? (y/n) "
    read -n1 answer
    echo
    case $answer in
    y)
      $pkgmgr $1
      ;;
    n)
      echo -n "Proceed anyway? (y/n) "
      read -n1 answer2
      echo
      if [[ "$answer2" == "n" ]]; then
        exit
      fi
      ;;
    esac
  fi
}

# Function to stop OpenVPN (either as service or process)

function stop_vpn {
  echo "Stopping ${VPN_NAME} VPN"
  if [[ "$startas" == "service" ]]; then
    ${SERVICE_INTERFACE} ${OPENVPN_SERVICE} stop ${VPN_NAME}
  else
    # replace with pid
    killall openvpn
  fi

  local RC=$?
  if [ $RC -eq 0 ]; then
    sleep 2
  fi
  return $RC
}

# Function to clean temporary files

function cleanup {
  if [ "$TAILERPID" ]; then
    kill $TAILERPID 2>/dev/null
  fi
  unset TAILERPID
  rm /tmp/nordvpn-config.cfg 2>/dev/null
  rm /tmp/down.sh 2>/dev/null
  rm /tmp/routeup.sh 2>/dev/null
  rm ${VPN_STATUS_FILE} 2>/dev/null
}

# Function to clean temp. files and the log file

function full_cleanup {
  cleanup
  rm ${VPN_LOG_FILE} 2>/dev/null
}

# Function to stop OpenVPN and clean temp. files + log, then exit

function exit_vpn {
  stop_vpn
  local RC=$?
  full_cleanup
  exit $RC
}

function runlistexist {
  stop_vpn
  cleanup
  fastestserver=""
  fastestserver=$(cat /tmp/fastlist.txt)
  echo "Fastest server: $fastestserver"
  echo
}
function runisrael {
  stop_vpn
  cleanup
}
# Function to execute server latency test using fping

function pingtest {
  rm /tmp/pingtest* 2>/dev/null
  echo
  # No fping package available? Then advise to install and exit.
  if [[ $(which fping) == "" ]]; then
    echo "'fping' package not found!"
    echo -e "Please install (apt-get install fping)\n"
    exit
  fi

  # How many servers do we have? (line count of serverlist)
  servercount=$(wc -l serversnord.txt | awk '{print $1}')
  i=1

  while read line; do
    # Extract server IP and name from each line of the list
    serverip=$(echo $line | awk '{print $1}')
    servername=$(echo $line | awk '{$1="";print $0}')
    # Parse the average latency result for each server
    avg=$(fping -B 1.0 -t 300 -i 1 -r 0 -e -c 1 -q $serverip 2>&1 | awk -F'/' '{print $8}')
    # Save the servername and average latency to temp. result file
    echo "$serverip = $avg" >>/tmp/pingtest.txt

    # Calculate percentage of how far we're done with testing
    percentage=$((($i * 100) / $servercount))
    echo -ne "Testing all servers for latency using fping ($i \ $servercount) $percentage %  \033[0K\r"

    # How many servers have we tested so far?
    i=$((i + 1))
  done <serversnord.txt

  # Sort the latency test results by latency, save to 2nd temp file
  cat /tmp/pingtest.txt | awk -F[=] '{ t=$1;$1=$2;$2=t;print; }' | sort -n >/tmp/pingtest.txt.2

  # Get rid of lines that don't contain a latency value, save rest to final result file
  while read line; do
    firstcol=$(echo $line | awk '{print $1}')
    re='^[0-9]+([.][0-9]+)?$'

    if [[ $firstcol =~ $re ]]; then
      echo $line >>/tmp/pingtest.best.txt
    fi
  done </tmp/pingtest.txt.2

  echo

  # Print top 10 servers based on latency IF we're just supposed to test
  if [[ ! "$1" == "connect" ]]; then
    echo
    echo "Top 10 Servers by latency (ping)"
    echo "================================"
    cat /tmp/pingtest.best.txt | sort -n | head -10
    echo
    exit
  else
    # Set best server as connect target for VPN connection process if we're supposed to do that
    fastestserver=""
    fastestserver=$(cat /tmp/pingtest.best.txt | head -5 | awk '$1 < 20{print}' | awk '{$1="";print}' | sed -e 's/^[[:space:]]*//')
    if [[ ! $fastestserver =~ [^[:space:]] ]]; then
      fastestserver=$(cat /tmp/pingtest.best.txt | head -2 | awk '{$1="";print}' | sed -e 's/^[[:space:]]*//')
    fi
    grep=$fastestserver
    echo "Fastest server: $fastestserver"
    echo "$grep" >/tmp/fastlist.txt
    echo
  fi
}

# Function to print connection status of OpenVPN
function print_status {
  local STATUS=2
  if [ -f ${VPN_STATUS_FILE} ]; then
    local count=0
    while read line; do
      echo "$line"
      if [ $count -eq 0 ]; then
        echo "$line" | grep -qi "^CONNECTED"
        local RC=$?
        if [ $RC -eq 0 ]; then
          STATUS=0
        else
          echo "$line" | grep -qi "^CONNECTING"
          RC=$?
          if [ $RC -eq 0 ]; then
            STATUS=1
          fi
        fi
        count=1
      fi
    done <$VPN_STATUS_FILE
  else
    echo "Disconnected"
  fi
  return $STATUS
}

# Check which package manager to use, apt-get or yum. If both avail., use apt-get
pkgmgr=""
if [[ ! $(which yum) == "" ]]; then
  pkgmgr="yum install"
fi
if [[ ! $(which apt-get) == "" ]]; then
  pkgmgr="apt-get install"
fi

# Check for needed packages and offer installation
checkpkg curl
checkpkg wget
checkpkg fping
checkpkg openvpn

# If curl not available, use wget
curl=$(which curl)
if [ "$curl" == "" ]; then
  curl=$(which wget)
  if [ "$curl" == "" ]; then
    echo <<EOF
Error: Please install curl or wget for this script to work.
You can try any of the following commands:
apt-get install wget
yum install wget
apt-get install curl
yum install curl
EOF
    exit 1
  else
    curl="$curl -T 5 -O - "
  fi
else
  curl="$curl -k --connect-timeout 5 -s"
fi

# In case /usr/sbin is not in path env, add it, so we can run OpenVPN as process
if [[ $PATH != *"/usr/sbin"* ]]; then PATH=$PATH:/usr/sbin; fi

openvpn=$(which openvpn)
port=
proto=
isisrael=0
authfile=
list=0
confonly=0
stopvpn=0
printstatus=0
asdaemon=0

# Check for what parameter script was run with and act accordingly
while getopts "mftdiuslxp:c:n:" parm; do
  case $parm in
  m)
    runlistexist
    ;;
  t)
    pingtest
    ;;
  f)
    pingtest connect
    ;;
  s)
    printstatus=1
    ;;
  d)
    asdaemon=1
    ;;
  i)
    isisrael=1
    ;;
  n)
    port="$OPTARG"
    ;;
  x)
    stopvpn=1
    ;;
  l)
    list=1
    ;;
  p)
    proto="$OPTARG"
    ;;
  c)
    authfile=$(readlink -m "$OPTARG")
    ;;
  ?) echo "unknown $parm / $OPTARG" ;;
  esac
done

# Script run with -x ? THen stop OpenVPN and clean temp. files and exit
if [ $stopvpn -eq 1 ]; then
  stop_vpn
  cleanup
  exit 0
# Script run with with -s ? Then print connection status and exit
elif [ $printstatus -eq 1 ]; then
  print_status
  RC=$?
  exit $RC
fi

# Script run with -d but credential file not specified (-c)? Advise and exit
if [ $asdaemon -eq 1 -a -z "$authfile" ]; then
  echo "You must specify a credentials file (the -c option) when using the -d option"
  echo "Create a file with your username as 1st line, password as 2nd line."
  echo "e.g. echo MyUsername > /tmp/vpnlogin && echo MyPassword >> /tmp/vpnlogin"
  echo "Then connect like this: $0 -c /tmp/vpnlogin -d Texas"
  exit 4

fi

# Script run with -c but credentials file doesn't exit? Advise and exit
if [ "$authfile" -a ! -r "$authfile" ]; then
  echo "Credentials file '$authfile' does not exist or is not readable"
  exit 5
fi

shift $(($OPTIND - 1))
grep="$*"

# If we did a latency test, use fastest server as VPN connection target
if [[ ! "$fastestserver" == "" ]]; then
  grep="$fastestserver"
fi

names=()
locations=()
ips=()
tcps=()
udps=()
count=0
full_cleanup

if [[ $isisrael -eq 0 ]]; then
  echo "Obtaining list of servers..."
  # If serverlist empty
  if [[ "$(cat /tmp/fastlist.txt)" == "" ]]; then
    echo "Unable to fetch serverlist!"
    echo "Please check your internet connection!"
    exit
  fi

  while read line; do
    : $((count++))
    ips[$count]=$(echo "$line")
  done </tmp/fastlist.txt
  echo "ips: ${ips}"

  # No server matching grep pattern? Advise and exit; otherwise print match count
  if [ "$count" -lt 1 ]; then
    echo "No matching servers to connect: $grep"
    exit
  else
    echo "$count servers matched"
  fi

  if [ $list -eq 1 ]; then
    for i in $(seq 1 $count); do
      echo -e "${ips[$i]}"
    done
    exit
  fi

  # Select random server from matched servers
  i=$(($RANDOM % $count + 1))
  SERVER="${ips[$i]}"
  echo "Selected Server:"
  echo -e $SERVER
else
  runisrael
  echo "Set Israel as VPN"
  i=0
  ips[0]="169.150.226.32"
  SERVER="${ips[$i]}"
  echo "Selected Server:"
  echo -e $SERVER
fi

proto=udp
port=1194
nameIp=
# shellcheck disable=SC2162
while read line; do
  ipAdd=$(echo $line | awk '{print $1}')
  nameIpRow=$(echo $line | awk '{$1="";print $0}')
#  echo "ipAdd ${ipAdd}, nameIpRow ${nameIpRow}, SERVER ${SERVER}"
  if [[ "${SERVER}" == "${ipAdd}" ]]; then
    trim_string=`echo $nameIpRow`
    nameIp="${trim_string}"
    echo "Found name ${nameIp}"
    break
  fi
done <serversnord.txt

echo "Loading configuration..." #

# *.ovpn template to temp file - silently
cat $scriptpath/nordvpn.ovpn >>/tmp/nordvpn-config.cfg 2>/dev/null

# Add a few config lines we'll need
echo "verify-x509-name CN=$nameIp" >>/tmp/nordvpn-config.cfg
echo "remote ${ips[$i]} $port" >>/tmp/nordvpn-config.cfg
echo "log-append ${VPN_LOG_FILE}" >>/tmp/nordvpn-config.cfg
echo "route-up /tmp/routeup.sh" >>/tmp/nordvpn-config.cfg
echo "down /tmp/down.sh" >>/tmp/nordvpn-config.cfg

# If credentials file was specified, add location to config file
if [ "$authfile" ]; then
  echo "auth-user-pass $authfile" >>/tmp/nordvpn-config.cfg
fi


# To start OpenVPN as service, config file needs to be in /etc/openvpn/ - so link it from there to temp
if [ ! -f /etc/openvpn/${VPN_NAME}.conf ]; then
  cat <<EOF | tee /etc/openvpn/${VPN_NAME}.conf >/dev/null
config /tmp/nordvpn-config.cfg
EOF
fi

# Create script to run upon successful VPN connection
cat <<EOF >/tmp/routeup.sh
#!/bin/sh
echo "Connected to \"$SERVER\" ($proto/$port)" > ${HMA_STATUS_FILE}
rm /tmp/routeup.sh
EOF

# Create script to run upon disconnecting from VPN
cat <<EOF >/tmp/down.sh
#!/bin/sh
	rm /tmp/nordvpn-config.cfg 2>/dev/null
	rm /tmp/routeup.sh 2>/dev/null
	rm ${VPN_STATUS_FILE} 2>/dev/null
	rm /tmp/down.sh 2>/dev/null
EOF



# Ensure scripts are accessible and executable
chmod 755 /tmp/down.sh
chmod 755 /tmp/routeup.sh

echo "Connecting to \"$SERVER\" ($proto/$port)" >${VPN_STATUS_FILE}
echo "" >${VPN_LOG_FILE}

if [ $asdaemon -eq 0 ]; then
  (tail -f ${VPN_LOG_FILE} 2>/dev/null | sed -e '/^WARNING:/ d' -e '/^NOTE:/ d') &
  TAILERPID=$!
fi

# Check for what distro is being used
distro
echo
echo "Detected distro: $os"
echo

# If Debian or Ubuntu, run OpenVPN as service
echo "Calling OpenVPN as process...3"
startas="process"
$openvpn --daemon --config /etc/openvpn/${VPN_NAME}.conf

# If OpenVPN exit code isn't 0, connection must have failed. Clean temp files and exit
RC=$?
if [ $RC -gt 0 ]; then
  echo "Connecting to \"$SERVER\" failed"
  cleanup
  exit $RC
fi

if [ $asdaemon -eq 0 ]; then
  trap exit_vpn SIGINT SIGTERM
  print_status
  RC=$?
  if [ $RC != 0 ]; then
    echo "Enter CTRL-C to terminate connection"
    echo "Waiting for connection to complete..."
    while [ $RC != 0 ]; do
      sleep 5
      print_status >/dev/null
      RC=$?
    done
    print_status
  fi
  while true; do
    sleep 2
    read dummy
  done
else
  print_status
  echo "  to see status use \"$0 -s\""
  echo "  to disconnect use \"$0 -x\""
fi
