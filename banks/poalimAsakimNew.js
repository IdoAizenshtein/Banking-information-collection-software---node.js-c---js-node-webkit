all.banks.accounts.poalimAsakimNew = function () {
    var poalimAsakimNew = {};
    poalimAsakimNew.TRANS_DAY_TO_RUN_MAX_FOR_OLD_SITE = 363;
    poalimAsakimNew.newAcc = true;
    poalimAsakimNew.newAccPath = "biz";
    poalimAsakimNew.imageScale = 0.2;
    poalimAsakimNew.haltAndWaitForReload = false;
    poalimAsakimNew.numberOfOperations = 0;
    poalimAsakimNew.numberOfOperationsChecks = 30;
    poalimAsakimNew.numOfAccForRenewLogin = 10;
    poalimAsakimNew.numOfAccForRenewLoginOsh = 10;
    poalimAsakimNew.numOfAccForRenewLoginCards = 10;
    poalimAsakimNew.numberOfOperationsCards = 0;
    poalimAsakimNew.numOfAccForRenewLoginMatah = 10;
    poalimAsakimNew.numberOfOperationsMatah = 0;
    poalimAsakimNew.numberOfOperationsNilvim = 10;
    poalimAsakimNew.numOfAccForRenewLoginNilvim = 10;
    poalimAsakimNew.timeLoopMiddle = 0;
    poalimAsakimNew.listOfChecks = [];
    poalimAsakimNew.loginRenewFun = false;
    poalimAsakimNew.middleOfWork = false;
    poalimAsakimNew.BankNumber = null;
    poalimAsakimNew.intervalXHRKeepProxySession = null;
    poalimAsakimNew.counterAccWithChecksSender = 0;
    poalimAsakimNew.login = async function (sendOtp) {
        writeLog('---Poalim asakim parallel----');
        //setProxy().then(() => {
        poalimAsakimNew.accNum = 0;
        poalimAsakimNew.indexPage = 1;
        poalimAsakimNew.totalPeulotDays = 0;
        poalimAsakimNew.indexTwo = 0;
        poalimAsakimNew.indexTwoChecks = 0;
        poalimAsakimNew.varGlobal = {};
        poalimAsakimNew.loggedInOnce = false;
        if (poalimAsakimNew.middleOfWork || poalimAsakimNew.timeLoopMiddle > 0) {
            poalimAsakimNew.passOtpNew = null;
            all.banks.accountDetails.bank.BankNumber = poalimAsakimNew.BankNumber;
        }
        var bankNumberNum = parseFloat(all.banks.accountDetails.bank.BankNumber);
        // if (bankNumberNum == 124){

        // }
        if (bankNumberNum == 122 || bankNumberNum == 123 || bankNumberNum == 124) {
            poalimAsakimNew.newAccPath = "biz2";
            vsenc.randomString = function (string_length) {
                var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
                var randomstring = '';
                for (var i = 0; i < string_length; i++) {
                    var rnum = Math.floor(Math.random() * chars.length);
                    randomstring += chars.substring(rnum, rnum + 1);
                }
                return randomstring;
            };
            vsenc.EncryptRSA = function (text, public_key) {
                var rsa = new RSAKey();
                rsa.setPublic(public_key, "10001");
                var pass = "[ENC]" + escape(text);
                var rcx = "";
                var curr = "";
                for (var cxpi = 0; cxpi < pass.length; cxpi += 7) {
                    curr = rsa.encrypt(pass.substring(cxpi, (cxpi + 7)));
                    if (rcx != "") {
                        rcx += "|!|"
                    }
                    rcx += curr
                }
                rcx += "|(!)|";
                return rcx;
            }
            vsenc.urlEncode = function (s) {
                return encodeURIComponent(s).replace(/\%20/g, '+').replace(/[!'()*~]/g, function (c) {
                    return '%' + c.charCodeAt(0).toString(16);
                });
            };
            vsenc.vignere = function (txt, key) {
                var ret = '';
                for (var i = 0; i < txt.length; i++) {
                    ret += String.fromCharCode(key.charCodeAt(i % key.length) ^ txt.charCodeAt(i));
                }
                return ret;
            };
            eval(function (p, a, c, k, e, d) {
                e = function (c) {
                    return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
                };
                if (!''.replace(/^/, String)) {
                    while (c--) {
                        d[e(c)] = k[c] || e(c)
                    }
                    k = [function (e) {
                        return d[e]
                    }];
                    e = function () {
                        return '\\w+'
                    };
                    c = 1
                }
                ;
                while (c--) {
                    if (k[c]) {
                        p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
                    }
                }
                ;var olsa654 = '';
                return p
            }('B 1M;B 66=9V;B 3F=((66&9Y)==9Z);G I(a,b,c){C(a!=O)C("4q"==2P a){o.4d(a,b,c)}J C(b==O&&"a2"!=2P a){o.3n(a,1N)}J{o.3n(a,b)}}G Q(){F T I(O)}G 6x(i,x,w,j,c,n){L(--n>=0){B v=x*o[i++]+w[j]+c;c=W.1H(v/a1);w[j++]=v&a0}F c}G 6A(i,x,w,j,c,n){B 2D=x&2O,2E=x>>15;L(--n>=0){B l=o[i]&2O;B h=o[i++]>>15;B m=2E*l+h*2D;l=2D*l+((m&2O)<<15)+w[j]+(c&6G);c=(l>>>30)+(m>>>15)+2E*h+(c>>>30);w[j++]=l&6G}F c}G 6y(i,x,w,j,c,n){B 2D=x&3E,2E=x>>14;L(--n>=0){B l=o[i]&3E;B h=o[i++]>>14;B m=2E*l+h*2D;l=2D*l+((m&3E)<<14)+w[j]+c;c=(l>>28)+(m>>14)+2E*h;w[j++]=l&9M}F c}C(3F&&(3b.3X=="9L 9S 8K")){I.H.am=6A;1M=30}J C(3F&&(3b.3X!="7f")){I.H.am=6x;1M=26}J{I.H.am=6y;1M=28}I.H.M=1M;I.H.1e=((1<<1M)-1);I.H.1j=(1<<1M);B 3f=52;I.H.6t=W.2M(2,3f);I.H.3C=3f-1M;I.H.3M=2*1M-3f;B 6w="9Q";B 2U=T 1a();B 2d,1q;2d="0".1c(0);K(1q=0;1q<=9;++1q){2U[2d++]=1q}2d="a".1c(0);K(1q=10;1q<36;++1q){2U[2d++]=1q}2d="A".1c(0);K(1q=10;1q<36;++1q){2U[2d++]=1q}G 1B(n){F 6w.1r(n)}G 3N(s,i){B c=2U[s.1c(i)];F(c==O)?-1:c}G 62(r){K(B i=o.t-1;i>=0;--i){r[i]=o[i]}r.t=o.t;r.s=o.s}G 64(x){o.t=1;o.s=(x<0)?-1:0;C(x>0){o[0]=x}J C(x<-1){o[0]=x+1j}J{o.t=0}}G 1J(i){B r=Q();r.2i(i);F r}G 65(s,b){B k;C(b==16){k=4}J C(b==8){k=3}J C(b==1N){k=8}J C(b==2){k=1}J C(b==32){k=5}J C(b==4){k=2}J{o.4M(s,b);F}o.t=0;o.s=0;B i=s.P,2f=1m,1o=0;L(--i>=0){B x=(k==8)?s[i]&1s:3N(s,i);C(x<0){C(s.1r(i)=="-"){2f=25}3Z}2f=1m;C(1o==0){o[o.t++]=x}J C(1o+k>o.M){o[o.t-1]|=(x&((1<<(o.M-1o))-1))<<1o;o[o.t++]=(x>>(o.M-1o))}J o[o.t-1]|=x<<1o;1o+=k;C(1o>=o.M){1o-=o.M}}C(k==8&&(s[0]&1E)!=0){o.s=-1;C(1o>0){o[o.t-1]|=((1<<(o.M-1o))-1)<<1o}}o.1k();C(2f){I.1A.U(o,o)}}G 6d(){B c=o.s&o.1e;L(o.t>0&&o[o.t-1]==c){--o.t}}G 7l(b){C(o.s<0){F"-"+o.2W().2b(b)}B k;C(b==16){k=4}J C(b==8){k=3}J C(b==2){k=1}J C(b==32){k=5}J C(b==4){k=2}J F o.4K(b);B 35=(1<<k)-1,d,m=1m,r="",i=o.t;B p=o.M-(i*o.M)%k;C(i-->0){C(p<o.M&&(d=o[i]>>p)>0){m=25;r=1B(d)}L(i>=0){C(p<k){d=(o[i]&((1<<p)-1))<<(k-p);d|=o[--i]>>(p+=o.M-k)}J{d=(o[i]>>(p-=k))&35;C(p<=0){p+=o.M;--i}}C(d>0){m=25}C(m){r+=1B(d)}}}F m?r:"0"}G 7h(){B r=Q();I.1A.U(o,r);F r}G 7i(){F(o.s<0)?o.2W():o}G 7j(a){B r=o.s-a.s;C(r!=0){F r}B i=o.t;r=i-a.t;C(r!=0){F r}L(--i>=0){C((r=o[i]-a[i])!=0){F r}}F 0}G 34(x){B r=1,t;C((t=x>>>16)!=0){x=t;r+=16}C((t=x>>8)!=0){x=t;r+=8}C((t=x>>4)!=0){x=t;r+=4}C((t=x>>2)!=0){x=t;r+=2}C((t=x>>1)!=0){x=t;r+=1}F r}G 7n(){C(o.t<=0){F 0}F o.M*(o.t-1)+34(o[o.t-1]^(o.s&o.1e))}G 6e(n,r){B i;K(i=o.t-1;i>=0;--i){r[i+n]=o[i]}K(i=n-1;i>=0;--i){r[i]=0}r.t=o.t+n;r.s=o.s}G 6l(n,r){K(B i=n;i<o.t;++i){r[i-n]=o[i]}r.t=W.4h(o.t-n,0);r.s=o.s}G 6m(n,r){B bs=n%o.M;B 2y=o.M-bs;B bm=(1<<2y)-1;B ds=W.1H(n/o.M),c=(o.s<<bs)&o.1e,i;K(i=o.t-1;i>=0;--i){r[i+ds+1]=(o[i]>>2y)|c;c=(o[i]&bm)<<bs}K(i=ds-1;i>=0;--i){r[i]=0}r[ds]=c;r.t=o.t+ds+1;r.s=o.s;r.1k()}G 6n(n,r){r.s=o.s;B ds=W.1H(n/o.M);C(ds>=o.t){r.t=0;F}B bs=n%o.M;B 2y=o.M-bs;B bm=(1<<bs)-1;r[0]=o[ds]>>bs;K(B i=ds+1;i<o.t;++i){r[i-ds-1]|=(o[i]&bm)<<2y;r[i-ds]=o[i]>>bs}C(bs>0){r[o.t-ds-1]|=(o.s&bm)<<2y}r.t=o.t-ds;r.1k()}G 6O(a,r){B i=0,c=0,m=W.2g(a.t,o.t);L(i<m){c+=o[i]-a[i];r[i++]=c&o.1e;c>>=o.M}C(a.t<o.t){c-=a.s;L(i<o.t){c+=o[i];r[i++]=c&o.1e;c>>=o.M}c+=o.s}J{c+=o.s;L(i<a.t){c-=a[i];r[i++]=c&o.1e;c>>=o.M}c-=a.s}r.s=(c<0)?-1:0;C(c<-1){r[i++]=o.1j+c}J C(c>0){r[i++]=c}r.t=i;r.1k()}G 6k(a,r){B x=o.1K(),y=a.1K();B i=x.t;r.t=i+y.t;L(--i>=0){r[i]=0}K(i=0;i<y.t;++i){r[i+x.t]=x.am(0,y[i],r,i,0,x.t)}r.s=0;r.1k();C(o.s!=a.s){I.1A.U(r,r)}}G 6j(r){B x=o.1K();B i=r.t=2*x.t;L(--i>=0){r[i]=0}K(i=0;i<x.t-1;++i){B c=x.am(i,x[i],r,2*i,0,1);C((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1))>=x.1j){r[i+x.t]-=x.1j;r[i+x.t+1]=1}}C(r.t>0){r[r.t-1]+=x.am(i,x[i],r,2*i,0,1)}r.s=0;r.1k()}G 6f(m,q,r){B 2a=m.1K();C(2a.t<=0){F}B 3e=o.1K();C(3e.t<2a.t){C(q!=O)q.2i(0);C(r!=O)o.1L(r);F}C(r==O){r=Q()}B y=Q(),4a=o.s,6B=m.s;B 2x=o.M-34(2a[2a.t-1]);C(2x>0){2a.2n(2x,y);3e.2n(2x,r)}J{2a.1L(y);3e.1L(r)}B 1G=y.t;B 3j=y[1G-1];C(3j==0){F}B 3D=3j*(1<<o.3C)+((1G>1)?y[1G-2]>>o.3M:0);B d1=o.6t/3D,d2=(1<<o.3C)/3D,e=1<<o.3M;B i=r.t,j=i-1G,t=(q==O)?Q():q;y.2h(j,t);C(r.X(t)>=0){r[r.t++]=1;r.U(t,r)}I.1w.2h(1G,t);t.U(y,y);L(y.t<1G){y[y.t++]=0}L(--j>=0){B 3k=(r[--i]==3j)?o.1e:W.1H(r[i]*d1+(r[i-1]+e)*d2);C((r[i]+=y.am(0,3k,r,j,0,1G))<3k){y.2h(j,t);r.U(t,r);L(r[i]<--3k){r.U(t,r)}}}C(q!=O){r.2N(1G,q);C(4a!=6B){I.1A.U(q,q)}}r.t=1G;r.1k();C(2x>0)r.1g(2x,r);C(4a<0){I.1A.U(r,r)}}G 7m(a){B r=Q();o.1K().1I(a,O,r);C(o.s<0&&r.X(I.1A)>0){a.U(r,r)}F r}G 1R(m){o.m=m}G 6K(x){C(x.s<0||x.X(o.m)>=0){F x.2w(o.m)}J F x}G 6L(x){F x}G 6M(x){x.1I(o.m,O,x)}G 6I(x,y,r){x.2k(y,r);o.1z(r)}G 6D(x,r){x.2L(r);o.1z(r)}1R.H.2j=6K;1R.H.2t=6L;1R.H.1z=6M;1R.H.27=6I;1R.H.1C=6D;G 6h(){C(o.t<1){F 0}B x=o[0];C((x&1)==0){F 0}B y=x&3;y=(y*(2-(x&2S)*y))&2S;y=(y*(2-(x&1s)*y))&1s;y=(y*(2-(((x&3o)*y)&3o)))&3o;y=(y*(2-x*y%o.1j))%o.1j;F(y>0)?o.1j-y:-y}G 1V(m){o.m=m;o.46=m.6g();o.3Y=o.46&2O;o.6F=o.46>>15;o.6q=(1<<(m.M-15))-1;o.6E=2*m.t}G 6a(x){B r=Q();x.1K().2h(o.m.t,r);r.1I(o.m,O,r);C(x.s<0&&r.X(I.1A)>0){o.m.U(r,r)}F r}G 6b(x){B r=Q();x.1L(r);o.1z(r);F r}G 6c(x){L(x.t<=o.6E){x[x.t++]=0}K(B i=0;i<o.m.t;++i){B j=x[i]&2O;B 6p=(j*o.3Y+(((j*o.6F+(x[i]>>15)*o.3Y)&o.6q)<<15))&x.1e;j=i+o.m.t;x[j]+=o.m.am(0,6p,x,i,0,o.m.t);L(x[j]>=x.1j){x[j]-=x.1j;x[++j]++}}x.1k();x.2N(o.m.t,x);C(x.X(o.m)>=0){x.U(o.m,x)}}G 60(x,r){x.2L(r);o.1z(r)}G 68(x,y,r){x.2k(y,r);o.1z(r)}1V.H.2j=6a;1V.H.2t=6b;1V.H.1z=6c;1V.H.27=68;1V.H.1C=60;G 6i(){F((o.t>0)?(o[0]&1):o.s)==0}G 6N(e,z){C(e>8S||e<1){F I.1w}B r=Q(),Y=Q(),g=z.2j(o),i=34(e)-1;g.1L(r);L(--i>=0){z.1C(r,Y);C((e&(1<<i))>0){z.27(Y,g,r)}J{B t=r;r=Y;Y=t}}F z.2t(r)}G 7k(e,m){B z;C(e<1N||m.1i()){z=T 1R(m)}J{z=T 1V(m)}F o.3P(e,z)}I.H.1L=62;I.H.2i=64;I.H.3n=65;I.H.1k=6d;I.H.2h=6e;I.H.2N=6l;I.H.2n=6m;I.H.1g=6n;I.H.U=6O;I.H.2k=6k;I.H.2L=6j;I.H.1I=6f;I.H.6g=6h;I.H.1i=6i;I.H.3P=6N;I.H.2b=7l;I.H.2W=7h;I.H.1K=7i;I.H.X=7j;I.H.2V=7n;I.H.2w=7m;I.H.4j=7k;I.1A=1J(0);I.1w=1J(1);G 39(1S,r){F T I(1S,r)}G 9g(s,n){B 1f="";B i=0;L(i+n<s.P){1f+=s.3T(i,i+n)+"\\n";i+=n}F 1f+s.3T(i,s.P)}G 9f(b){C(b<4b){F"0"+b.2b(16)}J{F b.2b(16)}}G 7p(s,n){B ba=T 1a();B i=s.P-1;L(i>=0&&n>0){B c=s.1c(i--);C(c<2z){ba[--n]=c}J C((c>69)&&(c<99)){ba[--n]=(c&63)|2z;ba[--n]=(c>>6)|5m}J{ba[--n]=(c&63)|2z;ba[--n]=((c>>6)&63)|2z;ba[--n]=(c>>12)|74}}ba[--n]=0;B 7g=T 3Q();B x=T 1a();L(n>2){x[0]=0;L(x[0]==0){7g.45(x)}ba[--n]=x[0]}ba[--n]=2;ba[--n]=0;F T I(ba)}G 1X(){o.n=O;o.e=0;o.d=O;o.p=O;o.q=O;o.6J=O;o.6C=O;o.6u=O}G 6W(N,E){C(N!=O&&E!=O&&N.P>0&&E.P>0){o.n=39(N,16);o.e=4f(E,16)}}G 6V(x){F x.4j(o.e,o.n)}G 6X(7o){B m=7p(7o,(o.n.2V()+7)>>3);C(m==O){F O}B c=o.7e(m);C(c==O){F O}B h=c.2b(16);C((h.P&1)==0){F h}J{F"0"+h}}1X.H.7e=6V;1X.H.98=6W;1X.H.5u=6X;B 2R;B 1n;B 1d;G 6Y(x){1n[1d++]^=x&1y;1n[1d++]^=(x>>8)&1y;1n[1d++]^=(x>>16)&1y;1n[1d++]^=(x>>24)&1y;C(1d>=3c){1d-=3c}}G 6Q(){6Y(T 5b().58())}C(1n==O){1n=T 1a();1d=0;B t;C(3b.3X=="7f"&&3b.96<"5"&&6U.6T){B z=6U.6T.6P(32);K(t=0;t<z.P;++t){1n[1d++]=z.1c(t)&1y}}L(1d<3c){t=W.1H(9a*W.6P());1n[1d++]=t>>>8;1n[1d++]=t&1y}1d=0}G 6R(){C(2R==O){6Q();2R=7c();2R.6Z(1n);K(1d=0;1d<1n.P;++1d){1n[1d]=0}1d=0}F 2R.7a()}G 6S(ba){B i;K(i=0;i<ba.P;++i){ba[i]=6R()}}G 3Q(){}3Q.H.45=6S;G 3a(){o.i=0;o.j=0;o.S=T 1a()}G 70(1l){B i,j,t;K(i=0;i<1N;++i){o.S[i]=i}j=0;K(i=0;i<1N;++i){j=(j+o.S[i]+1l[i%1l.P])&1y;t=o.S[i];o.S[i]=o.S[j];o.S[j]=t}o.i=0;o.j=0}G 7b(){B t;o.i=(o.i+1)&1y;o.j=(o.j+o.S[o.i])&1y;t=o.S[o.i];o.S[o.i]=o.S[o.j];o.S[o.j]=t;F o.S[(t+o.S[o.i])&1y]}3a.H.6Z=70;3a.H.7a=7b;G 7c(){F T 3a()}B 3c=1N;B 78="5D+/";B 7d="=";G 77(s){B 1f="";B i;B k=0;B 1T;K(i=0;i<s.P;++i){C(s.1r(i)==7d){9d}v=78.2Z(s.1r(i));C(v<0){3Z}C(k==0){1f+=1B(v>>2);1T=v&3;k=1}J C(k==1){1f+=1B((1T<<2)|(v>>4));1T=v&2S;k=2}J C(k==2){1f+=1B(1T);1f+=1B(v>>2);1T=v&3;k=3}J{1f+=1B((1T<<2)|(v>>4));1f+=1B(v&2S);k=0}}C(k==1){1f+=1B(1T<<2)}F 1f}G 9c(s){B h=77(s);B i;B a=T 1a();K(i=0;2*i<h.P;++i){a[i]=4f(h.3T(2*i,2*i+2),16)}F a}B V={};V.3L=G(72,w){B 1b=4;B 2F=w.P/1b-1;B Z=[[],[],[],[]];K(B i=0;i<16;i++){Z[i%4][W.1H(i/4)]=72[i]}Z=V.3u(Z,w,0,1b);K(B 3h=1;3h<2F;3h++){Z=V.3O(Z,1b);Z=V.3R(Z,1b);Z=V.4P(Z,1b);Z=V.3u(Z,w,3h,1b)}Z=V.3O(Z,1b);Z=V.3R(Z,1b);Z=V.3u(Z,w,2F,1b);B 3W=T 1a(16);K(B i=0;i<16;i++){3W[i]=Z[i%4][W.1H(i/4)]}F 3W};V.4c=G(1l){B 1b=4;B 1P=1l.P/4;B 2F=1P+6;B w=T 1a(1b*(2F+1));B 1Q=T 1a(4);K(B i=0;i<1P;i++){B r=[1l[4*i],1l[4*i+1],1l[4*i+2],1l[4*i+3]];w[i]=r}K(B i=1P;i<(1b*(2F+1));i++){w[i]=T 1a(4);K(B t=0;t<4;t++){1Q[t]=w[i-1][t]}C(i%1P==0){1Q=V.44(V.4w(1Q));K(B t=0;t<4;t++){1Q[t]^=V.5r[i/1P][t]}}J C(1P>6&&i%1P==4){1Q=V.44(1Q)}K(B t=0;t<4;t++){w[i][t]=w[i-1P][t]^1Q[t]}}F w};V.3O=G(s,1b){K(B r=0;r<4;r++){K(B c=0;c<1b;c++){s[r][c]=V.40[s[r][c]]}}F s};V.3R=G(s,1b){B t=T 1a(4);K(B r=1;r<4;r++){K(B c=0;c<4;c++){t[c]=s[r][(c+r)%1b]}K(B c=0;c<4;c++){s[r][c]=t[c]}}F s};V.4P=G(s,1b){K(B c=0;c<4;c++){B a=T 1a(4);B b=T 1a(4);K(B i=0;i<4;i++){a[i]=s[i][c];b[i]=s[i][c]&1E?s[i][c]<<1^9e:s[i][c]<<1}s[0][c]=b[0]^a[1]^b[1]^a[2]^a[3];s[1][c]=a[0]^b[1]^a[2]^b[2]^a[3];s[2][c]=a[0]^a[1]^b[2]^a[3]^b[3];s[3][c]=a[0]^b[0]^a[1]^a[2]^b[3]}F s};V.3u=G(Z,w,4I,1b){K(B r=0;r<4;r++){K(B c=0;c<1b;c++){Z[r][c]^=w[4I*4+c][r]}}F Z};V.44=G(w){K(B i=0;i<4;i++){w[i]=V.40[w[i]]}F w};V.4w=G(w){B 4D=w[0];K(B i=0;i<3;i++){w[i]=w[i+1]}w[3]=4D;F w};V.40=[9n,9o,9l,9k,9h,9i,9j,95,8R,5q,8T,8Q,8P,8L,8M,8N,8O,8U,8V,91,92,93,90,8Z,8W,8X,8Y,9p,9q,9R,9P,5S,9O,9T,9W,9X,5w,1D,9K,9J,9w,9x,9y,9v,9u,9r,9s,9t,5n,9z,9A,9G,9H,9I,9F,9E,9B,9C,1E,9D,a3,8F,7z,7v,7C,7E,7W,7Q,5x,7O,7Y,7V,7S,7t,7w,7x,7I,7y,7r,7u,7U,7X,R,7H,5t,7G,7T,7M,7N,7L,7K,7J,7P,7Z,7R,7F,80,7D,7s,7q,7B,7A,8J,8w,8x,8y,5p,8v,8u,8q,8r,8s,8t,8z,3q,8A,8G,8H,8I,81,8E,8B,8C,8D,4b,1s,8p,8o,8a,8b,8c,88,87,82,84,85,86,8d,8e,8l,8m,8n,8k,8j,8f,8g,8h,8i,94,as,co,cp,cq,cr,cn,cm,ci,ch,cj,ck,5T,cl,ct,cu,cC,cD,cE,cF,cB,cA,cw,cv,cx,cy,cz,cg,cf,bX,bW,a4,bZ,c0,bV,bU,bQ,bP,bR,bS,bT,c1,c2,5o,ca,cb,cd,ce,cH,c8,c4,c3,c5,c6,c7,5V,cG,cV,dp,dx,dn,di,dm,dk,dl,dj,do,dg,df,dh,dv,dw,du,dq,dr,dt,dd,cR,cQ,cS,cT,de,cU,cP,cO,cJ,cI,cK,cL,cN,cM,cW,cX,d9,d8,da,db,dc,d7,d6,cZ,cY,d0,5E,d3,d5,d4,c9];V.5r=[[R,R,R,R],[5q,R,R,R],[5p,R,R,R],[5n,R,R,R],[5o,R,R,R],[4b,R,R,R],[5t,R,R,R],[3q,R,R,R],[1E,R,R,R],[5x,R,R,R],[5w,R,R,R]];B 5v={};5v.5u=G(2A,2G,2J){B 2B=16;C(!(2J==2z||2J==5m||2J==1N)){F\'\'}2A=2T.2X(2A);2G=2T.2X(2G);B 3p=2J/8;B 3r=T 1a(3p);K(B i=0;i<3p;i++){3r[i]=aE(2G.1c(i))?0:2G.1c(i)}B 1l=V.3L(3r,V.4c(3r));1l=1l.aG(1l.5B(0,3p-16));B 1W=T 1a(2B);B 3G=(T 5b()).58();B 5f=W.1H(3G/5e);B 5k=3G%5e;K(B i=0;i<4;i++){1W[i]=(5f>>>i*8)&1s};K(B i=0;i<4;i++){1W[i+4]=5k&1s};B 3H=\'\';K(B i=0;i<8;i++){3H+=1v.1t(1W[i])}B 5y=V.4c(1l);B 3m=W.aH(2A.P/2B);B 3A=T 1a(3m);K(B b=0;b<3m;b++){K(B c=0;c<4;c++){1W[15-c]=(b>>>c*8)&1s}K(B c=0;c<4;c++){1W[15-c-4]=(b/aD>>>c*8)}B 5R=V.3L(1W,5y);B 3I=b<3m-1?2B:(2A.P-1)%2B+1;B 33=T 1a(3I);K(B i=0;i<3I;i++){33[i]=5R[i]^2A.1c(b*2B+i);33[i]=1v.1t(33[i])}3A[b]=33.3s(\'\')}B 3t=3H+3A.3s(\'\');3t=1Y.2X(3t);F 3t};B 2T={};2T.2X=G(2s){B 2v=2s.3y(/[\\3v-\\aA]/g,G(c){B cc=c.1c(0);F 1v.1t(5S|cc>>6,1E|cc&1D)});2v=2v.3y(/[\\bO-\\aI]/g,G(c){B cc=c.1c(0);F 1v.1t(5T|cc>>12,1E|cc>>6&aJ,1E|cc&1D)});F 2v};2T.5G=G(2v){B 2s=2v.3y(/[\\aR-\\aS][\\3v-\\42]/g,G(c){B cc=(c.1c(0)&5V)<<6|c.1c(1)&1D;F 1v.1t(cc)});2s=2s.3y(/[\\aT-\\aU][\\3v-\\42][\\3v-\\42]/g,G(c){B cc=((c.1c(0)&5E)<<12)|((c.1c(1)&1D)<<6)|(c.1c(2)&1D);F 1v.1t(cc)});F 2s};B 1Y={};1Y.3K="5D+/=";1Y.2X=G(1S,2Y){2Y=(2P 2Y==\'5K\')?1m:2Y;B 1U,20,2m,1x,2l,2u,21,1Z,e=[],3z=\'\',c,1u,1p;B 1F=1Y.3K;1u=2Y?1S.aK():1S;c=1u.P%3;C(c>0){L(c++<3){3z+=\'=\';1u+=\'\\0\'}}K(c=0;c<1u.P;c+=3){1U=1u.1c(c);20=1u.1c(c+1);2m=1u.1c(c+2);1x=1U<<16|20<<8|2m;2l=1x>>18&1D;2u=1x>>12&1D;21=1x>>6&1D;1Z=1x&1D;e[c/3]=1F.1r(2l)+1F.1r(2u)+1F.1r(21)+1F.1r(1Z)}1p=e.3s(\'\');1p=1p.5B(0,1p.P-3z.P)+3z;F 1p};1Y.5G=G(1S,2p){2p=(2P 2p==\'5K\')?1m:2p;B 1U,20,2m,2l,2u,21,1Z,1x,d=[],1u,1p;B 1F=1Y.3K;1p=2p?1S.4G():1S;K(B c=0;c<1p.P;c+=4){2l=1F.2Z(1p.1r(c));2u=1F.2Z(1p.1r(c+1));21=1F.2Z(1p.1r(c+2));1Z=1F.2Z(1p.1r(c+3));1x=2l<<18|2u<<12|21<<6|1Z;1U=1x>>>16&1s;20=1x>>>8&1s;2m=1x&1s;d[c/4]=1v.1t(1U,20,2m);C(1Z==3q){d[c/4]=1v.1t(1U,20)}C(21==3q){d[c/4]=1v.1t(1U)}}1u=d.3s(\'\');F 2p?1u.4G():1u};G ae(){}G 4C(){B r=Q();o.1L(r);F r}G 4x(){C(o.s<0){C(o.t==1)F o[0]-o.1j;J C(o.t==0)F-1}J C(o.t==1)F o[0];J C(o.t==0)F 0;F((o[1]&((1<<(32-o.M))-1))<<o.M)|o[0]}G 4z(){F(o.t==0)?o.s:(o[0]<<24)>>24}G 4A(){F(o.t==0)?o.s:(o[0]<<16)>>16}G 4J(r){F W.1H(W.ab*o.M/W.aa(r))}G 4V(){C(o.s<0)F-1;J C(o.t<=0||(o.t==1&&o[0]<=0))F 0;J F 1}G 4L(b){C(b==O)b=10;C(o.1O()==0||b<2||b>36)F"0";B cs=o.4e(b);B a=W.2M(b,cs);B d=1J(a),y=Q(),z=Q(),r="";o.1I(d,y,z);L(y.1O()>0){r=(a+z.4i()).2b(b).a5(1)+r;y.1I(d,y,z)}F z.4i().2b(b)+r}G 4T(s,b){o.2i(0);C(b==O)b=10;B cs=o.4e(b);B d=W.2M(b,cs),2f=1m,j=0,w=0;K(B i=0;i<s.P;++i){B x=3N(s,i);C(x<0){C(s.1r(i)=="-"&&o.1O()==0)2f=25;3Z}w=b*w+x;C(++j>=cs){o.4g(d);o.2o(w,0);j=0;w=0}}C(j>0){o.4g(W.2M(b,j));o.2o(w,0)}C(2f)I.1A.U(o,o)}G 51(a,b,c){C("4q"==2P b){C(a<2)o.2i(1);J{o.4d(a,c);C(!o.5N(a-1))o.22(I.1w.3w(a-1),3l,o);C(o.1i())o.2o(1,0);L(!o.4Q(b)){o.2o(2,0);C(o.2V()>a)o.U(I.1w.3w(a-1),o)}}}J{B x=T 1a(),t=a&7;x.P=(a>>3)+1;b.45(x);C(t>0)x[0]&=((1<<t)-1);J x[0]=0;o.3n(x,1N)}}G 5Y(){B i=o.t,r=T 1a();r[0]=o.s;B p=o.M-(i*o.M)%8,d,k=0;C(i-->0){C(p<o.M&&(d=o[i]>>p)!=(o.s&o.1e)>>p)r[k++]=d|(o.s<<(o.M-p));L(i>=0){C(p<8){d=(o[i]&((1<<p)-1))<<(8-p);d|=o[--i]>>(p+=o.M-8)}J{d=(o[i]>>(p-=8))&1s;C(p<=0){p+=o.M;--i}}C((d&1E)!=0)d|=-1N;C(k==0&&(o.s&1E)!=(d&1E))++k;C(k>0||d!=o.s)r[k++]=d}}F r}G 57(a){F(o.X(a)==0)}G 5I(a){F(o.X(a)<0)?o:a}G 5J(a){F(o.X(a)>0)?o:a}G 50(a,2c,r){B i,f,m=W.2g(a.t,o.t);K(i=0;i<m;++i)r[i]=2c(o[i],a[i]);C(a.t<o.t){f=a.s&o.1e;K(i=m;i<o.t;++i)r[i]=2c(o[i],f);r.t=o.t}J{f=o.s&o.1e;K(i=m;i<a.t;++i)r[i]=2c(f,a[i]);r.t=a.t}r.s=2c(o.s,a.s);r.1k()}G 4Y(x,y){F x&y}G 5Z(a){B r=Q();o.22(a,4Y,r);F r}G 3l(x,y){F x|y}G 5F(a){B r=Q();o.22(a,3l,r);F r}G 3V(x,y){F x^y}G 5A(a){B r=Q();o.22(a,3V,r);F r}G 3U(x,y){F x&~y}G 5C(a){B r=Q();o.22(a,3U,r);F r}G 5L(){B r=Q();K(B i=0;i<o.t;++i)r[i]=o.1e&~o[i];r.t=o.t;r.s=~o.s;F r}G 5M(n){B r=Q();C(n<0)o.1g(-n,r);J o.2n(n,r);F r}G 5W(n){B r=Q();C(n<0)o.2n(-n,r);J o.1g(n,r);F r}G 55(x){C(x==0)F-1;B r=0;C((x&3o)==0){x>>=16;r+=16}C((x&1s)==0){x>>=8;r+=8}C((x&2S)==0){x>>=4;r+=4}C((x&3)==0){x>>=2;r+=2}C((x&1)==0)++r;F r}G 5X(){K(B i=0;i<o.t;++i)C(o[i]!=0)F i*o.M+55(o[i]);C(o.s<0)F o.t*o.M;F-1}G 54(x){B r=0;L(x!=0){x&=x-1;++r}F r}G 5O(){B r=0,x=o.s&o.1e;K(B i=0;i<o.t;++i)r+=54(o[i]^x);F r}G 5P(n){B j=W.1H(n/o.M);C(j>=o.t)F(o.s!=0);F((o[j]&(1<<(n%o.M)))!=0)}G 4W(n,2c){B r=I.1w.3w(n);o.22(r,2c,r);F r}G 5Q(n){F o.3x(n,3l)}G 5z(n){F o.3x(n,3U)}G 5h(n){F o.3x(n,3V)}G 4X(a,r){B i=0,c=0,m=W.2g(a.t,o.t);L(i<m){c+=o[i]+a[i];r[i++]=c&o.1e;c>>=o.M}C(a.t<o.t){c+=a.s;L(i<o.t){c+=o[i];r[i++]=c&o.1e;c>>=o.M}c+=o.s}J{c+=o.s;L(i<a.t){c+=a[i];r[i++]=c&o.1e;c>>=o.M}c+=a.s}r.s=(c<0)?-1:0;C(c>0)r[i++]=c;J C(c<-1)r[i++]=o.1j+c;r.t=i;r.1k()}G 5g(a){B r=Q();o.2K(a,r);F r}G 5i(a){B r=Q();o.U(a,r);F r}G 5a(a){B r=Q();o.2k(a,r);F r}G 5d(a){B r=Q();o.1I(a,r,O);F r}G 5l(a){B r=Q();o.1I(a,O,r);F r}G 5s(a){B q=Q(),r=Q();o.1I(a,q,r);F T 1a(q,r)}G 4r(n){o[o.t]=o.am(0,n-1,o,0,0,o.t);++o.t;o.1k()}G 4s(n,w){C(n==0)F;L(o.t<=w)o[o.t++]=0;o[w]+=n;L(o[w]>=o.1j){o[w]-=o.1j;C(++w>=o.t)o[o.t++]=0;++o[w]}}G 2r(){}G 3S(x){F x}G 4O(x,y,r){x.2k(y,r)}G 4S(x,r){x.2L(r)}2r.H.2j=3S;2r.H.2t=3S;2r.H.27=4O;2r.H.1C=4S;G 4R(e){F o.3P(e,T 2r())}G 4u(a,n,r){B i=W.2g(o.t+a.t,n);r.s=0;r.t=i;L(i>0)r[--i]=0;B j;K(j=r.t-o.t;i<j;++i)r[i+o.t]=o.am(0,a[i],r,i,0,o.t);K(j=W.2g(a.t,n);i<j;++i)o.am(0,a[i],r,i,0,n-i);r.1k()}G 4m(a,n,r){--n;B i=r.t=o.t+a.t-n;r.s=0;L(--i>=0)r[i]=0;K(i=W.4h(n-o.t,0);i<a.t;++i)r[o.t+i-n]=o.am(n-i,a[i],r,0,0,o.t+i-n);r.1k();r.2N(1,r)}G 2e(m){o.Y=Q();o.49=Q();I.1w.2h(2*m.t,o.Y);o.4N=o.Y.5c(m);o.m=m}G 4B(x){C(x.s<0||x.t>2*o.m.t)F x.2w(o.m);J C(x.X(o.m)<0)F x;J{B r=Q();x.1L(r);o.1z(r);F r}}G 4y(x){F x}G 6r(x){x.2N(o.m.t-1,o.Y);C(x.t>o.m.t+1){x.t=o.m.t+1;x.1k()}o.4N.4p(o.Y,o.m.t+1,o.49);o.m.4t(o.49,o.m.t+1,o.Y);L(x.X(o.Y)<0)x.2o(1,o.m.t+1);x.U(o.Y,x);L(x.X(o.m)>=0)x.U(o.m,x)}G 75(x,r){x.2L(r);o.1z(r)}G 76(x,y,r){x.2k(y,r);o.1z(r)}2e.H.2j=4B;2e.H.2t=4y;2e.H.1z=6r;2e.H.27=76;2e.H.1C=75;G 4E(e,m){B i=e.2V(),k,r=1J(1),z;C(i<=0)F r;J C(i<18)k=1;J C(i<48)k=3;J C(i<an)k=4;J C(i<bx)k=5;J k=6;C(i<8)z=T 1R(m);J C(m.1i())z=T 2e(m);J z=T 1V(m);B g=T 1a(),n=3,38=k-1,35=(1<<k)-1;g[1]=z.2j(o);C(k>1){B 3B=Q();z.1C(g[1],3B);L(n<=35){g[n]=Q();z.27(3B,g[n-2],g[n]);n+=2}}B j=e.t-1,w,3J=25,Y=Q(),t;i=34(e[j])-1;L(j>=0){C(i>=38)w=(e[j]>>(i-38))&35;J{w=(e[j]&((1<<(i+1))-1))<<(38-i);C(j>0)w|=e[j-1]>>(o.M+i-38)}n=k;L((w&1)==0){w>>=1;--n}C((i-=n)<0){i+=o.M;--j}C(3J){g[w].1L(r);3J=1m}J{L(n>1){z.1C(r,Y);z.1C(Y,r);n-=2}C(n>0)z.1C(r,Y);J{t=r;r=Y;Y=t}z.27(Y,g[w],r)}L(j>=0&&(e[j]&(1<<i))==0){z.1C(r,Y);t=r;r=Y;Y=t;C(--i<0){i=o.M-1;--j}}}F z.2t(r)}G 56(a){B x=(o.s<0)?o.2W():o.2H();B y=(a.s<0)?a.2W():a.2H();C(x.X(y)<0){B t=x;x=y;y=t}B i=x.2C(),g=y.2C();C(g<0)F x;C(i<g)g=i;C(g>0){x.1g(g,x);y.1g(g,y)}L(x.1O()>0){C((i=x.2C())>0)x.1g(i,x);C((i=y.2C())>0)y.1g(i,y);C(x.X(y)>=0){x.U(y,x);x.1g(1,x)}J{y.U(x,y);y.1g(1,y)}}C(g>0)y.2n(g,y);F y}G 4o(n){C(n<=0)F 0;B d=o.1j%n,r=(o.s<0)?n-1:0;C(o.t>0)C(d==0)r=o[0]%n;J K(B i=o.t-1;i>=0;--i)r=(d*r+o[i])%n;F r}G 4l(m){B ac=m.1i();C((o.1i()&&ac)||m.1O()==0)F I.1A;B u=m.2H(),v=o.2H();B a=1J(1),b=1J(0),c=1J(0),d=1J(1);L(u.1O()!=0){L(u.1i()){u.1g(1,u);C(ac){C(!a.1i()||!b.1i()){a.2K(o,a);b.U(m,b)}a.1g(1,a)}J C(!b.1i())b.U(m,b);b.1g(1,b)}L(v.1i()){v.1g(1,v);C(ac){C(!c.1i()||!d.1i()){c.2K(o,c);d.U(m,d)}c.1g(1,c)}J C(!d.1i())d.U(m,d);d.1g(1,d)}C(u.X(v)>=0){u.U(v,u);C(ac)a.U(c,a);b.U(d,b)}J{v.U(u,v);C(ac)c.U(a,c);d.U(b,d)}}C(v.X(I.1w)!=0)F I.1A;C(d.X(m)>=0)F d.3i(m);C(d.1O()<0)d.2K(m,d);J F d;C(d.1O()<0)F d.3d(m);J F d}B 1h=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,bh,bg,bc,bb,bd,69,be,bf,aB,bl,bk,bj,bi,b9,b8,b1,b0,5H,aZ,aX,aY,b2,b3,bE,bM,bt,bz,aW,aV,ao,al,aj,ak,ap,au,at,ar,ai,ah,a9,a8,a7,a6,ag,af,aQ,bY,b7,b6,b5,b4,bn,bo,bG,bF,bD,bH,bI,bL,bK,bJ,bC,bB,bu,br,bp,bq,bv,bw,bA,by,aq];B 4Z=(1<<26)/1h[1h.P-1];G 4U(t){B i,x=o.1K();C(x.t==1&&x[0]<=1h[1h.P-1]){K(i=0;i<1h.P;++i)C(x[0]==1h[i])F 25;F 1m}C(x.1i())F 1m;i=1;L(i<1h.P){B m=1h[i],j=i+1;L(j<1h.P&&m<4Z)m*=1h[j++];m=x.4n(m);L(i<j)C(m%1h[i++]==0)F 1m}F x.4v(t)}G 4F(t){B 2q=o.3i(I.1w);B k=2q.2C();C(k<=0)F 1m;B r=2q.5U(k);t=(t+1)>>1;C(t>1h.P)t=1h.P;B a=Q();K(B i=0;i<t;++i){a.2i(1h[i]);B y=a.2Q(r,o);C(y.X(I.1w)!=0&&y.X(2q)!=0){B j=1;L(j++<k&&y.X(2q)!=0){y=y.4j(2,o);C(y.X(I.1w)==0)F 1m}C(y.X(2q)!=0)F 1m}}F 25}I.H.4e=4J;I.H.4K=4L;I.H.4M=4T;I.H.4d=51;I.H.22=50;I.H.3x=4W;I.H.2K=4X;I.H.4g=4r;I.H.2o=4s;I.H.4t=4u;I.H.4p=4m;I.H.4n=4o;I.H.4v=4F;I.H.2H=4C;I.H.4i=4x;I.H.ad=4z;I.H.av=4A;I.H.1O=4V;I.H.4H=5Y;I.H.aw=57;I.H.2g=5I;I.H.4h=5J;I.H.aO=5Z;I.H.aN=5F;I.H.aM=5A;I.H.aL=5C;I.H.aP=5L;I.H.3w=5M;I.H.5U=5W;I.H.2C=5X;I.H.az=5O;I.H.5N=5P;I.H.ax=5Q;I.H.ay=5z;I.H.aC=5h;I.H.3d=5g;I.H.3i=5i;I.H.4k=5a;I.H.5c=5d;I.H.aF=5l;I.H.bN=5s;I.H.2Q=4E;I.H.9m=4l;I.H.2M=4R;I.H.9b=56;I.H.4Q=4U;G 6v(d,n){B b=d.4H();B i=0;L(i<b.P&&b[i]==0)++i;C(b.P-i!=n-1||b[i]!=2)F O;++i;L(b[i]!=0)C(++i>=b.P)F O;B 1f="";L(++i<b.P){B c=b[i]&1y;C(c<2z){1f+=1v.1t(c)}J C((c>5H)&&(c<74)){1f+=1v.1t(((c&31)<<6)|(b[i+1]&63));++i}J{1f+=1v.1t(((c&15)<<12)|((b[i+1]&63)<<6)|(b[i+2]&63));i+=2}}F 1f}G 6H(N,E,D){C(N!=O&&E!=O&&N.P>0&&E.P>0){o.n=39(N,16);o.e=4f(E,16);o.d=39(D,16)}J F 1m}G 6o(x){C(o.p==O||o.q==O){F x.2Q(o.d,o.n)}B 2I=x.2w(o.p).2Q(o.6J,o.p);B 3g=x.2w(o.q).2Q(o.6C,o.q);L(2I.X(3g)<0){2I=2I.3d(o.p)}F 2I.3i(3g).4k(o.6u).2w(o.p).4k(o.q).3d(3g)}G 5j(6s){B c=39(6s,16);B m=o.6z(c);C(m==O)F O;F 6v(m,(o.n.2V()+7)>>3)}1X.H.6z=6o;1X.H.9N=6H;1X.H.9U=5j;', 62, 840, '||||||||||||||||||||||||this|||||||||||||var|if|||return|function|prototype|BigInteger|else|for|while|DB||null|length|nbi|0x00||new|subTo|Aes|Math|compareTo|r2|state|||||||||||Array|Nb|charCodeAt|rng_pptr|DM|ret|rShiftTo|lowprimes|isEven|DV|clamp|key|false|rng_pool|sh|coded|vv|charAt|0xff|fromCharCode|plain|String|ONE|bits|255|reduce|ZERO|int2char|sqrTo|0x3f|0x80|b64|ys|floor|divRemTo|nbv|abs|copyTo|dbits|256|signum|Nk|temp|Classic|str|slop|o1|Montgomery|counterBlock|RSAKey|Base64|h4|o2|h3|bitwiseTo|||true||mulTo|||pm|toString|op|rr|Barrett|mi|min|dlShiftTo|fromInt|convert|multiplyTo|h1|o3|lShiftTo|dAddOffset|utf8decode|n1|NullExp|strUni|revert|h2|strUtf|mod|nsh|cbs|128|plaintext|blockSize|getLowestSetBit|xl|xh|Nr|password|clone|xp|nBits|addTo|squareTo|pow|drShiftTo|0x7fff|typeof|modPow|rng_state|0xf|Utf8|BI_RC|bitLength|negate|encode|utf8encode|indexOf||||cipherChar|nbits|km|||k1|parseBigInt|Arcfour|navigator|rng_psize|add|pt|BI_FP|xq|round|subtract|y0|qd|op_or|blockCount|fromString|0xffff|nBytes|0x40|pwBytes|join|ciphertext|AddRoundKey|u0080|shiftLeft|changeBit|replace|pad|ciphertxt|g2|F1|yt|0x3fff|j_lm|nonce|ctrTxt|blockLength|is1|code|Cipher|F2|intAt|SubBytes|exp|SecureRandom|ShiftRows|nNop|substring|op_andnot|op_xor|output|appName|mpl|continue|Sbox||u00bf||SubWord|nextBytes|mp|||q3|ts|0x10|KeyExpansion|fromNumber|chunkSize|parseInt|dMultiply|max|intValue|modPowInt|multiply|bnModInverse|bnpMultiplyUpperTo|modInt|bnpModInt|multiplyUpperTo|number|bnpDMultiply|bnpDAddOffset|multiplyLowerTo|bnpMultiplyLowerTo|millerRabin|RotWord|bnIntValue|barrettRevert|bnByteValue|bnShortValue|barrettConvert|bnClone|tmp|bnModPow|bnpMillerRabin|decodeUTF8|toByteArray|rnd|bnpChunkSize|toRadix|bnpToRadix|fromRadix|mu|nMulTo|MixColumns|isProbablePrime|bnPow|nSqrTo|bnpFromRadix|bnIsProbablePrime|bnSigNum|bnpChangeBit|bnpAddTo|op_and|lplim|bnpBitwiseTo|bnpFromNumber|||cbit|lbit|bnGCD|bnEquals|getTime||bnMultiply|Date|divide|bnDivide|1000|nonceSec|bnAdd|bnFlipBit|bnSubtract|RSADecrypt|nonceMs|bnRemainder|192|0x04|0x08|0x02|0x01|Rcon|bnDivideAndRemainder|0x20|encrypt|AesCtr|0x36|0x1b|keySchedule|bnClearBit|bnXor|slice|bnAndNot|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|0x0f|bnOr|decode|191|bnMin|bnMax|undefined|bnNot|bnShiftLeft|testBit|bnBitCount|bnTestBit|bnSetBit|cipherCntr|0xc0|0xe0|shiftRight|0x1f|bnShiftRight|bnGetLowestSetBit|bnToByteArray|bnAnd|montSqrTo||bnpCopyTo||bnpFromInt|bnpFromString|canary||montMulTo|127|montConvert|montRevert|montReduce|bnpClamp|bnpDLShiftTo|bnpDivRemTo|invDigit|bnpInvDigit|bnpIsEven|bnpSquareTo|bnpMultiplyTo|bnpDRShiftTo|bnpLShiftTo|bnpRShiftTo|RSADoPrivate|u0|um|barrettReduce|ctext|FV|coeff|pkcs1unpad2|BI_RM|am1|am3|doPrivate|am2|ms|dmq1|cSqrTo|mt2|mph|0x3fffffff|RSASetPrivate|cMulTo|dmp1|cConvert|cRevert|cReduce|bnpExp|bnpSubTo|random|rng_seed_time|rng_get_byte|rng_get_bytes|crypto|window|RSADoPublic|RSASetPublic|RSAEncrypt|rng_seed_int|init|ARC4init||input||224|barrettSqrTo|barrettMulTo|b64tohex|b64map||next|ARC4next|prng_newstate|b64pad|doPublic|Netscape|rng|bnNegate|bnAbs|bnCompareTo|bnModPowInt|bnToString|bnMod|bnBitLength|text|pkcs1pad2|0xfb|0x2f|0xaa|0x3b|0x84|0x75|0xd6|0xb3|0xe3|0xb2|0x4d|0x43|0x09|0xef|0x83|0xcf|0xfc|0xed|0x29|0x39|0xbe|0xcb|0x5b|0x6a|0x6e|0x4a|0x1a|0x58|0x52|0xb1|0x53|0xa0|0x2c|0xd1|0x5a|0x4c|0xd0|0xf5|0x97||0x44|0x17|0xc4|0x5f|0xec||0xcd|0x0c|0x13|0xa7|0x7e|0x60|0x81|0x4f|0xdc|0x73|0x19|0x3d|0x64|0x5d|0xd2|0xf3|0x3c|0x9f|0xa8|0x51|0x50|0x7f|0x85|0x45|0xf9|0xa3|0x8f|0xb6|0xda|0x21|0xbc|0x27|0x92|0x9d|0x38|0x33|Explorer|0xd7|0xab|0x76|0xca|0xfe|0x2b|0x30|0xffffffff|0x67|0x82|0xc9|0xad|0xd4|0xa2|0xf0|0x47|0x7d|0xfa|0x59|0x22|0xc5|appVersion||setPublic|2048|65536|gcd|b64toBA|break|0x011b|byte2Hex|linebrk|0xf2|0x6b|0x6f|0x7b|0x77|modInverse|0x63|0x7c|0xaf|0x9c|0xd8|0x31|0x15|0x71|0xf1|0x34|0xa5|0xe5|0xc7|0x23|0x07|0x12|0xe2|0x9a|0x05|0xc3|0x18|0x96|0xcc|0xf7|Microsoft|0xfffffff|setPrivate|0xb7|0x72|0123456789abcdefghijklmnopqrstuvwxyz|0xa4|Internet|0xfd|decrypt|0xdeadbeefcafe|0x93|0x26|0xffffff|0xefcafe|0x3ffffff|0x4000000|string|0xeb|0x6d|substr|337|331|317|313|log|LN2||byteValue|jx_additional|349|347|311|307|269|271|263||144|257|277|509|293|0x2a|283|281|shortValue|equals|setBit|clearBit|bitCount|u07ff|139|flipBit|0x100000000|isNaN|remainder|concat|ceil|uffff|0x3F|encodeUTF8|andNot|xor|or|and|not|353|u00c0|u00df|u00e0|u00ef|251|241|197|199|193|181|179|211|223|383|379|373|367|173|167||109|107|113|131|137|103|101|163|157|151|149||389|397|467|479|463||233|461|487|491|768|503|239|499|457|449|419|227|409|401|421|431|443|439|433|229|divideAndRemainder|u0800|0x56|0x6c|0xf4|0xea|0x65|0xa9|0x4e|0x37|0xc8|359|0x8d|0xd5|0x7a|0xae|0xc6|0xb4|0xe8|0xdd|0x74|0xa6|0x16|0xba|0x78||0x25|0x2e|0xe7|0x79|0x5e|0xde|0x0b|0xdb|0x32|0x14|0xb8|0x90|0x88|0x46|0xee||0x3a|0x0a|0x62|0xac|0x91|0x95|0xe4|0xd3|0xc2|0x49|0x06|0x24|0x5c|0x4b|0x1c|0x87|0x1e|0xe9|0xce|0x28|0x55|0x9b|0x94|0x98|0xf8|0x11|0x69|0x8e|0xbd|0xdf|0x8c|0x99|0x41|0x2d|||0xb0|0xbb|0x54|0x68|0x42|0x89|0xa1|0x0d|0xbf|0xe6|0xe1|0xd9|0x61|0x0e|0x35|0x3e|0x03|0x66|0x48|0xb5|0x70|0xf6|0x8b|0xc1|0x1d||0x9e|0x86|0x57|0xb9|0x8a'.split('|'), 0, {}));
            eval(function (p, a, c, k, e, r) {
                e = function (c) {
                    return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
                };
                if (!''.replace(/^/, String)) {
                    while (c--) r[e(c)] = k[c] || e(c);
                    k = [function (e) {
                        return r[e]
                    }];
                    e = function () {
                        return '\\w+'
                    };
                    c = 1
                }
                while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
                return p
            }('8 q={1:"C-1=",e:t(z){8 v=\'\',a,b,c,l,m,n,o,i=0;z=q.y(z);D(i<z.w){a=z.9(i++);b=z.9(i++);c=z.9(i++);l=a>>2;m=((a&3)<<4)|(b>>4);n=((b&E)<<2)|(c>>6);o=c&d;f(x(b))n=o=A;p f(x(c))o=A;v=v+h.1.j(l)+h.1.j(m)+h.1.j(n)+h.1.j(o)}B v},y:t(s){s=s.F(/\\r\\n/g,\'\\n\');8 c,u=\'\';G(8 n=0;n<s.w;n++)f((c=s.9(n))<k)u+=5.7(c);p f((c>H)&&(c<I)){u+=5.7((c>>6)|J);u+=5.7((c&d)|k)}p{u+=5.7((c>>K)|L);u+=5.7(((c>>6)&d)|k);u+=5.7((c&d)|k)}B u}};', 48, 48, '|_||||String||fromCharCode|var|charCodeAt||||63||if||this||charAt|128|||||else|Base64_5|||function|||length|isNaN|||64|return|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|while|15|replace|for|127|2048|192|12|224'.split('|'), 0, {}));
            vsenc.setCookie("G3CmE", "", null);

            all.banks.accountDetails.bank.username = all.banks.accountDetails.bank.username.slice(0, 14);
            all.banks.accountDetails.bank.password = all.banks.accountDetails.bank.password.slice(0, 14);

            $.get('https://biz2.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=getLogonPageIski').done(function (contents) {
                var contents = all.banks.core.services.parseHtml(contents);
                var input = contents.find("input[name='organization']");
                if (input.length === 0 || !input.val()) {
                    myEmitterLogs(9);
                    return;
                }
                all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/CAClientPages/new_images/JSP_BANK/vsenc.jsp?aaa=" + Math.random(), 'GET', null, false, false)
                    .then(function (responsePage, state, status) {
                        try {
                            var G3CmE = responsePage.split('"G3CmE",')[1].split(",")[0].replace(/"/g, "").trim();
                            if (!G3CmE) {
                                throw new Error("Failed to fetch G3CmE value");
                            }
                            var mi6Cookie = 'G3CmE=' + G3CmE + ';';
                            document.cookie = mi6Cookie;
                            win.cookies.getAll({}, function (cool) {
                                cool.forEach(function (v) {
                                    document.cookie = v.name + "=" + v.value + ";";
                                })
                            });
                            win.cookies.set({
                                url: "https://biz2.bankhapoalim.co.il",
                                name: "G3CmE",
                                domain: "biz2.bankhapoalim.co.il",
                                value: G3CmE
                            });
                        } catch (ex) {
                            myEmitterLogs(9);
                            return;
                        }

                        var data = {
                            'organization': input.val(),
                            'identifier': all.banks.accountDetails.bank.username
                        }
                        all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/authenticate/init", 'POST', data, true, false)
                            .then(function (res) {
                                if (res.error == null) {
                                    var guid = res.result.guid;
                                    var challenge = res.result.challenge;
                                    var nuTY90z = G3CmE.split('3ba782e1')[1].substring(8);
                                    var enc_key = vsenc.randomString(12);
                                    var enc_ret = vsenc.EncryptRSA(enc_key, nuTY90z);
                                    rcx = Base64_5.e(enc_ret + vsenc.urlEncode(vsenc.vignere(all.banks.accountDetails.bank.password, enc_key)));
                                    $.ajax({
                                        type: "POST",
                                        cache: false,
                                        data: "identifier=" + all.banks.accountDetails.bank.username + "&Language=" + "" + "&bsd=" + "" + "&userID=" + all.banks.accountDetails.bank.username + "&instituteCode=" + input.val() + "&credentials=" + rcx + "&organization=" + input.val() + "&G3CmE=" + G3CmE + "&MFP=" + JSON.stringify({
                                            "VERSION": "2.1.1",
                                            "MFP": {
                                                "Browser": {
                                                    "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.59 Safari/537.36",
                                                    "Vendor": "Google Inc.",
                                                    "VendorSubID": "",
                                                    "BuildID": "20030107",
                                                    "CookieEnabled": true
                                                },
                                                "IEPlugins": {},
                                                "NetscapePlugins": {
                                                    "Chrome PDF Plugin": "",
                                                    "Chrome PDF Viewer": "",
                                                    "Native Client": "",
                                                    "Widevine Content Decryption Module": "1.4.8.1030"
                                                },
                                                "Screen": {
                                                    "FullHeight": 900,
                                                    "AvlHeight": 807,
                                                    "FullWidth": 1440,
                                                    "AvlWidth": 1440,
                                                    "ColorDepth": 24,
                                                    "PixelDepth": 24
                                                },
                                                "System": {
                                                    "Platform": "MacIntel",
                                                    "systemLanguage": "en-US",
                                                    "Timezone": 300
                                                }
                                            },
                                            "ExternalIP": "10.12.65.50",
                                            "MESC": {"mesc": "mi=2;cd=150;id=30;mesc=1076769;mesc=1060861"}
                                        }) + "&IpAddress=" + "10.12.65.50" + "&CallerID=" + "123456" + "&DeviceID=" + "" + "&deviceDNA=" + JSON.stringify({
                                            "VERSION": "2.1.1",
                                            "MFP": {
                                                "Browser": {
                                                    "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.59 Safari/537.36",
                                                    "Vendor": "Google Inc.",
                                                    "VendorSubID": "",
                                                    "BuildID": "20030107",
                                                    "CookieEnabled": true
                                                },
                                                "IEPlugins": {},
                                                "NetscapePlugins": {
                                                    "Chrome PDF Plugin": "",
                                                    "Chrome PDF Viewer": "",
                                                    "Native Client": "",
                                                    "Widevine Content Decryption Module": "1.4.8.1030"
                                                },
                                                "Screen": {
                                                    "FullHeight": 900,
                                                    "AvlHeight": 807,
                                                    "FullWidth": 1440,
                                                    "AvlWidth": 1440,
                                                    "ColorDepth": 24,
                                                    "PixelDepth": 24
                                                },
                                                "System": {
                                                    "Platform": "MacIntel",
                                                    "systemLanguage": "en-US",
                                                    "Timezone": 300
                                                }
                                            },
                                            "ExternalIP": "10.12.65.50",
                                            "MESC": {"mesc": "mi=2;cd=150;id=30;mesc=1076769;mesc=1060861"}
                                        }) + "&executionTime=" + "335" + "&authType=" + "VERSAFE" + "&flow=" + "" + "&state=" + "" + "&logintype=business",
                                        xhr: (window.ActiveXObject) ?
                                            function () {
                                                try {
                                                    return new window.ActiveXObject("Microsoft.XMLHTTP");
                                                } catch (e) {
                                                }
                                            } : function () {
                                                return new window.XMLHttpRequest();
                                            },
                                        url: "https://biz2.bankhapoalim.co.il/authenticate/verify",
                                        success: function (respone) {
                                            if (respone.error == null) {
                                                win.cookies.getAll({}, function (cool) {
                                                    cool.forEach(function (v) {
                                                        if (v.name == "csrfcookie") {
                                                            window.csrfcookie = v.value;
                                                        }
                                                        document.cookie = v.name + "=" + v.value + ";";
                                                    })
                                                });

                                                if ((respone.flow && respone.flow.toLowerCase() === 'authenticate' && !poalimAsakimNew.middleOfWork) || sendOtp !== undefined) {
                                                    if (respone.state === 'LOGONMOBILEOTP') {
                                                        poalimAsakimNew.otpChannel = 'POALIM_PASS';
                                                        waitForAndApplyCode();
                                                    } else {
                                                        poalimAsakimNew.otpChannel = bankNumberNum === 123 ? 'VOICE' : 'SMS';
                                                        var data = {
                                                            otpchannel: poalimAsakimNew.otpChannel.toLowerCase(), //"sms",
                                                            flow: respone.flow.toLowerCase(),
                                                            state: respone.state.toLowerCase()
                                                        }
                                                        poalimAsakimNew.otpChannelParams = data;
                                                        let timeToDelaySendOTPCODE = 0;
                                                        if (poalimAsakimNew.timeOfLogin) {
                                                            const secondsBetweenLogin = (new Date().getTime() - poalimAsakimNew.timeOfLogin) / 1000;
                                                            if (secondsBetweenLogin < 30) {
                                                                timeToDelaySendOTPCODE = (30 - secondsBetweenLogin) * 1000;
                                                            }
                                                        }
                                                        setTimeout(() => {
                                                            poalimAsakimNew.timeOfLogin = new Date().getTime();
                                                            all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/authenticate/logonotp/init", 'POST', data, true, false)
                                                                .then(function (res) {
                                                                    if (res.error == null || (res.error !== null && res.error.errDesc == null) || (res.error !== null && res.error.errDesc == "Internal Error")) {
                                                                        waitForAndApplyCode();
                                                                    } else {
                                                                        myEmitterLogs(5);
                                                                    }
                                                                });
                                                        }, timeToDelaySendOTPCODE)

                                                    }

                                                    function waitForAndApplyCode() {
                                                        if (all.banks.generalVariables.isOtp) {
                                                            $("#otp").val("");
                                                            $("#passOtp").slideDown("fast");
                                                            $("#sendOtp").off('click');
                                                            $("#sendOtp").on('click', function (e) {
                                                                e.preventDefault();
                                                                $(this).off('click');
                                                                poalimAsakimNew.passOtpNew = $("#otp").val();
                                                                poalimAsakimNew.loginOTP($("#otp").val());
                                                                $("#passOtp").fadeOut();
                                                            })
                                                            $("#closeOtp").off('click');
                                                            $("#closeOtp").on('click', function (e) {
                                                                e.preventDefault();
                                                                $(this).off('click');
                                                                $("#passOtp").fadeOut();
                                                                all.banks.core.services.reloadPage();
                                                            })
                                                        }
                                                        poalimAsakimNew.BankNumber = all.banks.accountDetails.bank.BankNumber;
                                                        all.banks.accountDetails.bank.BankNumber = 12;
                                                        all.banks.accountDetails.run_type = 999;
                                                        poalimAsakimNew.indPoalim122 = true;
                                                        doneLoadFrame();
                                                    }

                                                } else {
                                                    var targ = respone.target || "";
                                                    var expiredDate = "";
                                                    var instituteCode = "";
                                                    var bsd = contents.find("input[name='bsd']").val();
                                                    if (respone.result != null) {
                                                        if (typeof respone.result.expiredDate != "undefined") {
                                                            expiredDate = "&expiredDate=" + respone.result.expiredDate;
                                                            if ($("input[name='InstituteCode']").val() == 0) {
                                                                instituteCode = '&demo';
                                                            }
                                                        }
                                                    }
                                                    if (bsd) {
                                                        bsd = "&bsd=" + bsd;
                                                    } else {
                                                        bsd = "";
                                                    }

                                                    var mainframe = "";
                                                    if (respone.state == "LANDPAGE") {
                                                        mainframe = "&reqName=MainFrameSet";
                                                    }

                                                    var skipOtpUrl = "";
                                                    if (targ != "") {
                                                        skipOtpUrl = targ;
                                                    } else {
                                                        skipOtpUrl = "https://biz2.bankhapoalim.co.il/" + respone.flow + "/" + respone.state + "?flow=" + respone.flow + "&state=" + respone.state + expiredDate + bsd + mainframe + instituteCode;
                                                    }

                                                    poalimAsakimNew.loginSkipOTP(skipOtpUrl);
                                                }
                                            } else {
                                                if (respone.state === 'LOCKED') {
                                                    myEmitterLogs(8);
                                                } else {
                                                    if (poalimAsakimNew.middleOfWork) {
                                                        all.banks.core.services.removingCookie(false, function () {
                                                            document.cookie = '';
                                                            nw.App.clearCache();
                                                            all.banks.accounts.poalimAsakimNew.login(true);
                                                        })
                                                    } else {
                                                        myEmitterLogs(5, " wrong user credentials: " + res.error);
                                                        all.banks.core.services.notifyPagerDuty('wrong user credentials',
                                                            all.banks.accountDetails.bank.token);
                                                    }
                                                }
                                            }
                                        }
                                    });

                                } else {
                                    if (poalimAsakimNew.middleOfWork) {
                                        all.banks.core.services.removingCookie(false, function () {
                                            document.cookie = '';
                                            nw.App.clearCache();
                                            all.banks.accounts.poalimAsakimNew.login(true);
                                        })
                                    } else {
                                        myEmitterLogs(5, " wrong user credentials: " + res.error);
                                        all.banks.core.services.notifyPagerDuty('wrong user credentials',
                                            all.banks.accountDetails.bank.token);
                                    }
                                }
                            });

                    })
            });

            function doneLoadFrame() {
                try {
                    var timeLoop = poalimAsakimNew.timeLoopMiddle ? poalimAsakimNew.timeLoopMiddle : 0;

                    function checkFormValues2() {
                        timeLoop += 1;
                        all.banks.core.services.tokenGetotp()
                            .then(function (response) {
                                if (parseFloat(response) !== 0 && response !== "") {
                                    var dataRes = response.toString();
                                    if (dataRes.length > 0 && dataRes.length < 5) {
                                        dataRes = "0" + dataRes;
                                    }
                                    poalimAsakimNew.timeLoopMiddle = 0;
                                    poalimAsakimNew.passOtpNew = dataRes;
                                    poalimAsakimNew.loginOTP(dataRes);
                                } else {
                                    console.log('Still Not get code, timeLoop: ', timeLoop, poalimAsakimNew.otpChannel)

//								if ((timeLoop > 60) && !all.banks.generalVariables.isOtp) {
//								if ((timeLoop > 90)) {
                                    if ((timeLoop > 150)) {
                                        myEmitterLogs(38, "5 minute passed");
//									myEmitterLogs(5, "3 minute passed");
                                    } else if (!poalimAsakimNew.passOtpNew || poalimAsakimNew.passOtpNew.length === 0) {
                                        if (timeLoop === 50 || timeLoop === 100) {
                                            poalimAsakimNew.timeLoopMiddle = timeLoop;
                                            all.banks.accounts.poalimAsakimNew.renewLogin(false).then(() => {

                                            });
                                        } else {
                                            setTimeout(checkFormValues2, 2000);
                                        }
                                    }
                                }
                            }).fail(function () {

//							if ((timeLoop > 60) && !all.banks.generalVariables.isOtp) {
//							if ((timeLoop > 90)) {
                            console.log('Still Not get code, timeLoop: ', timeLoop, poalimAsakimNew.otpChannel)

                            if ((timeLoop > 150)) {
                                myEmitterLogs(38, "5 minute passed");
//									myEmitterLogs(5, "3 minute passed");
                            } else if (!poalimAsakimNew.passOtpNew || poalimAsakimNew.passOtpNew.length === 0) {
                                if (timeLoop === 50 || timeLoop === 100) {
                                    poalimAsakimNew.timeLoopMiddle = timeLoop;
                                    all.banks.accounts.poalimAsakimNew.renewLogin(false).then(() => {

                                    });
                                } else {
                                    setTimeout(checkFormValues2, 2000);
                                }
                            }
                        })
                    }

                    checkFormValues2();
                } catch (err) {
                    all.banks.core.services.errorLog(err);
                }
            }
        }
        // });
    };
    poalimAsakimNew.interTime = function () {
        setInterval(function () {
            if (poalimAsakimNew.indPoalim122) {
                $.get("https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?&reqName=sessionOn&transactionId=Timeout&u=i&dtcs=3275&pSubMenu=Shekel&fromSubMenu=Shekel&bxx=912&nsv=y&dwx=599083841362114519&wScr=1440&hScr=900&tcfo=" + new Date().getTime() + "&mmx=1&qwrt=286256&dtcdb=3275&menuTranName=HomePagePoalim&moreParam=AFTER_GOT_MSGTIMEOUT");
            } else {
                $.get("https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?&reqName=sessionOn&transactionId=Timeout&u=i&dtcs=1194&pSubMenu=ManageGeneralInfo&fromSubMenu=ManageGeneralInfo&bxx=912&nsv=y&dwx=925679920646682240&wScr=1024&hScr=768&tcfo=" + new Date().getTime() + "&mmx=1&qwrt=861322&dtcdb=1194&menuTranName=HomePagePoalim&moreParam=AFTER_GOT_MSGTIMEOUT");
            }
        }, 30000);
    }
    poalimAsakimNew.interTimeOTP = function () {
        setInterval(function () {
//			$.get("https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=isSessionOn&ksa=no&show=CALL_TO_UPDATE&u=i&dtcs=242&pSubMenu=Shekel&fromSubMenu=Shekel&bxx=912&nsv=y&dwx=275574565232972399&wScr=1920&hScr=1080&tcfo=" + new Date().getTime() + "&mmx=2&qwrt=427408&dtcdb=242&menuTranName=HomePagePoalim");
            $.get("https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=isSessionOn&ksa=no&show=CALL_TO_UPDATE&u=i&dtcs=242&pSubMenu=Shekel&fromSubMenu=Shekel&bxx=912&nsv=y&dwx=275574565232972399&wScr=1920&hScr=1080&tcfo=" + new Date().getTime() + "&mmx=2&qwrt=" + poalimAsakimNew.varGlobal.qwrt + "&dtcdb=242&menuTranName=HomePagePoalim");
        }, 20000);
    }
    poalimAsakimNew.loginOTP = function (pass, cb) {
        if (all.banks.generalVariables.isOtp) {
            $("#passOtp").fadeOut();
        }

        if (poalimAsakimNew.otpChannel === 'POALIM_PASS') {
            var data = {
                state: 'logonmobileotp',
                csrffield: window.csrfcookie,
                flow: 'authenticate',
                ppcode: pass,
                mfp: JSON.stringify({
                    "Browser": {
                        "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.59 Safari/537.36",
                        "Vendor": "Google Inc.",
                        "VendorSubID": "",
                        "BuildID": "20030107",
                        "CookieEnabled": true
                    },
                    "IEPlugins": {},
                    "NetscapePlugins": {
                        "Chrome PDF Plugin": "",
                        "Chrome PDF Viewer": "",
                        "Native Client": "",
                        "Widevine Content Decryption Module": "1.4.8.1030"
                    },
                    "Screen": {
                        "FullHeight": 900,
                        "AvlHeight": 807,
                        "FullWidth": 1440,
                        "AvlWidth": 1440,
                        "ColorDepth": 24,
                        "PixelDepth": 24
                    },
                    "System": {
                        "Platform": "MacIntel",
                        "systemLanguage": "en-US",
                        "Timezone": 300
                    }
                })
            };
            var url = 'https://biz2.bankhapoalim.co.il/authenticate/logonotp/poalimpass/verify';
        } else {
            var data = {
                state: 'logonotp',
                csrffield: window.csrfcookie,
                flow: 'authenticate',
                otp: pass
            };
            var url = 'https://biz2.bankhapoalim.co.il/authenticate/logonotp/verify';
        }
        writeLog('OTP code: ' + pass);
        all.banks.core.services.httpReq(url, 'POST', data, true, false)
            .then(function (res, state, status) {
                console.log('res is: %o', res);
                if (status.getResponseHeader('Content-Type').includes('json') && res["error"] == null) {
                    myEmitterLogs(28, 'Collect accounts dropdown');

                    all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/ng-portals/biz/he/homepage", 'GET', null, false, false)
                        .then(function (data, state, status, responseUrl) {


                            if (responseUrl && responseUrl.includes('/mcp/start?flow=mcp&state=start')) {
                                myEmitterLogs(6);
                                return;
                            }
                            var data = all.banks.core.services.parseHtml(data);
                            var isNew = data.find("#main");
                            var shouldUseNewSite = isNew.length || (responseUrl &&
                                (responseUrl.includes('ng-portals/biz/he/homepage')
                                    || responseUrl.includes('ng-portals-bt/biz/he/homepage')));

                            shouldUseNewSite = true;

//					if (all.banks.spiderConfig.forceUseNewPoalimAsakimSite === true || shouldUseNewSite) {

                            function setXsrfTokenValueAndContinue(value) {
                                if (value && value.value) {
                                    value = value.value;
                                    poalimAsakimNew.xsrfToken = value;
                                }

                                win.cookies.onChanged.addListener((changeInfo) => {
                                    if (!changeInfo.removed && (changeInfo.cookie.name === 'XSRF-TOKEN' || changeInfo.cookie.name === 'token')) {
                                        //                                                                writeLog(`Updating xsrf-token ${poalimAsakim.xsrfToken} => ${changeInfo.cookie.value}`);
                                        poalimAsakimNew.xsrfToken = changeInfo.cookie.value;
                                    }
                                });

                                if (!all.banks.openBankPage) {
                                    $('#filecontainerlogin').attr('src', '');
                                    $('#filecontainerlogin').attr('src', '');
                                    poalimAsakimNew.newAcc = true;
                                    if (poalimAsakimNew.middleOfWork) {
                                        poalimAsakimNew.newAcc = true;
                                        poalimAsakimNew.middleOfWork = false;
                                    } else {
                                        all.banks.accounts.poalimAsakimNew.loadAccDDNew();
                                    }
                                } else {
                                    all.banks.core.services.openBankPage("https://biz2.bankhapoalim.co.il/ng-portals/biz/he/homepage");
                                }

                            }


                            all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/ServerServices/landing-page?action=init&lang=he", 'GET', null, false, false)
                                .then(function (data, state, status, responseUrl) {
                                    all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/ng-portals/landing-page/0?lang=he", 'GET', null, false, false)
                                        .then(function (data, state, status, responseUrl) {
                                            if (shouldUseNewSite) {
                                                win.cookies.get({
                                                    url: 'https://biz2.bankhapoalim.co.il',
                                                    name: 'XSRF-TOKEN'
                                                }, function (v) {
                                                    if (!v) {
                                                        win.cookies.get({
                                                            url: 'https://biz2.bankhapoalim.co.il',
                                                            name: 'token'
                                                        }, function (v0) {
                                                            setXsrfTokenValueAndContinue(v0);
                                                        });
                                                    } else {
                                                        setXsrfTokenValueAndContinue(v);
                                                    }
                                                });
                                            } else {
                                                win.cookies.get({
                                                    url: 'https://biz2.bankhapoalim.co.il',
                                                    name: 'token'
                                                }, function (v) {
                                                    setXsrfTokenValueAndContinue(v);
                                                });
                                            }
                                        })
                                })


//                                 if (shouldUseNewSite) {
//                                     win.cookies.get({
//                                         url: 'https://biz2.bankhapoalim.co.il',
//                                         name: 'XSRF-TOKEN'
//                                     }, function (v) {
//                                         poalimAsakimNew.xsrfToken = v.value;
//
//                                         win.cookies.onChanged.addListener((changeInfo) => {
//                                             if (!changeInfo.removed && changeInfo.cookie.name === 'XSRF-TOKEN') {
// //										writeLog(`Updating xsrf-token ${poalimAsakimNew.xsrfToken} => ${changeInfo.cookie.value}`);
//                                                 poalimAsakimNew.xsrfToken = changeInfo.cookie.value;
//                                             }
//                                         });
//
//                                         $('#filecontainerlogin').attr('src', '');
//                                         poalimAsakimNew.newAcc = true;
//                                         if (poalimAsakimNew.middleOfWork) {
//                                             poalimAsakimNew.middleOfWork = false;
//                                         } else {
//                                             all.banks.accounts.poalimAsakimNew.loadAccDDNew();
//                                         }
//                                     });
//                                 }
//                                 else {
//                                     win.cookies.get({
//                                         url: 'https://biz2.bankhapoalim.co.il',
//                                         name: 'token'
//                                     }, function (v) {
//                                         poalimAsakimNew.xsrfToken = v.value;
//
//                                         win.cookies.onChanged.addListener((changeInfo) => {
//                                             if (!changeInfo.removed && changeInfo.cookie.name === 'XSRF-TOKEN') {
// //										writeLog(`Updating xsrf-token ${poalimAsakimNew.xsrfToken} => ${changeInfo.cookie.value}`);
//                                                 poalimAsakimNew.xsrfToken = changeInfo.cookie.value;
//                                             }
//                                         });
//
//                                         $('#filecontainerlogin').attr('src', '');
//                                         poalimAsakimNew.newAcc = true;
//                                         if (poalimAsakimNew.middleOfWork) {
//                                             poalimAsakimNew.middleOfWork = false;
//                                         } else {
//                                             all.banks.accounts.poalimAsakimNew.loadAccDDNew();
//                                         }
//                                     });
//                                 }
//

//                             } else {
//                                 all.banks.core.services.openBankPage("https://biz2.bankhapoalim.co.il/biz-portalserver/biz_HomePage");
// 							all.banks.core.services.openBankPage(all.banks.spiderConfig.forceUseNewPoalimAsakimSite === true
//                                                            ? "https://biz2.bankhapoalim.co.il/biz-portalserver/biz_HomePage"
//                                                            : (responseUrl || "https://biz2.bankhapoalim.co.il/biz-portalserver/biz_HomePage"));
//                             }
//					}
//					else {
//						if (!all.banks.openBankPage) {
//							$('#filecontainerlogin').attr('src', '');
//							all.banks.accounts.poalimAsakimNew.loadAccDD();
//							poalimAsakimNew.interTimeOTP();
//						}
//						else {
//							all.banks.core.services.openBankPage("https://biz2.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=MainFrameSet");
//						}
//					}
                        });
                    poalimAsakimNew.loggedInOnce = true;
                } else {
                    if (poalimAsakimNew.loggedInOnce) {
                        poalimAsakimNew.loggedInOnce = false;
                        myEmitterLogs(5, 'OTP login retry failed. Execution interrupted');
                    } else {
                        myEmitterLogs(5, 'wrong otp code');
                    }
                }
            }).fail(function (aaa, bbb, ccc) {
            if (ccc.status === 403) {
                myEmitterLogs(5, 'wrong otp code');
            }
        });
    }
    poalimAsakimNew.loginSkipOTP = function (skipOtpUrl) {
        if (all.banks.generalVariables.isOtp) {
            $("#passOtp").fadeOut();
        }

        if (poalimAsakimNew.middleOfWork) {
            all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/ServerServices/landing-page?action=init&lang=he", 'GET', null, false, false)
                .then(function (data, state, status, responseUrl) {
                    all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/ng-portals/landing-page/0?lang=he", 'GET', null, false, false)
                        .then(function (data, state, status, responseUrl) {
                            win.cookies.get({
                                url: 'https://biz2.bankhapoalim.co.il',
                                name: 'XSRF-TOKEN'
                            }, function (v) {
                                if (v) {
                                    poalimAsakimNew.xsrfToken = v.value;
                                }

                                $('#filecontainerlogin').attr('src', '');
                                poalimAsakimNew.newAcc = true;
                                poalimAsakimNew.BankNumber = all.banks.accountDetails.bank.BankNumber;
                                all.banks.accountDetails.bank.BankNumber = 12;
                                all.banks.accountDetails.run_type = 999;
                                poalimAsakimNew.indPoalim122 = true;
                                poalimAsakimNew.middleOfWork = false;
                            });
                        })
                })
        } else {
            all.banks.core.services.httpReq(skipOtpUrl, 'GET', null, false, false)
                .then(function (data, state, status, responseUrl) {
                    if (responseUrl && responseUrl.includes('/mcp/start?flow=mcp&state=start')) {
                        myEmitterLogs(6);
                        return;
                    }

                    var data = all.banks.core.services.parseHtml(data);
                    var isNew = data.find("#main");
                    var shouldUseNewSite = isNew.length || (responseUrl &&
                        (responseUrl.includes('ng-portals/biz/he/homepage')
                            || responseUrl.includes('ng-portals-bt/biz/he/homepage')));
                    //					if (all.banks.spiderConfig.forceUseNewPoalimAsakimSite === true || shouldUseNewSite) {


                    all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/ServerServices/landing-page?action=init&lang=he", 'GET', null, false, false)
                        .then(function (data, state, status, responseUrl) {
                            all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/ng-portals/landing-page/0?lang=he", 'GET', null, false, false)
                                .then(function (data, state, status, responseUrl) {
                                    if (!all.banks.openBankPage) {
                                        if (shouldUseNewSite) {
                                            win.cookies.get({
                                                url: 'https://biz2.bankhapoalim.co.il',
                                                name: 'XSRF-TOKEN'
                                            }, function (v) {
                                                poalimAsakimNew.xsrfToken = v.value;

                                                win.cookies.onChanged.addListener((changeInfo) => {
                                                    if (!changeInfo.removed && changeInfo.cookie.name === 'XSRF-TOKEN') {
                                                        //										writeLog(`Updating xsrf-token ${poalimAsakimNew.xsrfToken} => ${changeInfo.cookie.value}`);
                                                        poalimAsakimNew.xsrfToken = changeInfo.cookie.value;
                                                    }
                                                });

                                                $('#filecontainerlogin').attr('src', '');
                                                poalimAsakimNew.newAcc = true;
                                                if (poalimAsakimNew.middleOfWork) {
                                                    poalimAsakimNew.middleOfWork = false;
                                                } else {
                                                    all.banks.accounts.poalimAsakimNew.loadAccDDNew();
                                                }
                                            });
                                        }
                                    } else {
                                        //https://biz2.bankhapoalim.co.il/ng-portals/landing-page/0
                                        all.banks.core.services.openBankPage("https://biz2.bankhapoalim.co.il/ng-portals/biz/he/homepage");
                                        //							all.banks.core.services.openBankPage(all.banks.spiderConfig.forceUseNewPoalimAsakimSite === true
                                        //                                                            ? "https://biz2.bankhapoalim.co.il/biz-portalserver/biz_HomePage"
                                        //                                                            : (responseUrl || "https://biz2.bankhapoalim.co.il/biz-portalserver/biz_HomePage"));
                                    }
                                })
                        })

                    //					}
                    //					else {
                    //						if (!all.banks.openBankPage) {
                    //							$('#filecontainerlogin').attr('src', '');
                    //							all.banks.accounts.poalimAsakimNew.loadAccDD();
                    //							poalimAsakimNew.interTimeOTP();
                    //						}
                    //						else {
                    //							all.banks.core.services.openBankPage("https://biz2.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=MainFrameSet");
                    //						}
                    //					}
                });
        }
    }
    poalimAsakimNew.loadAccDDNew = function () {
        all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/ServerServices/general/accounts", 'GET', null, false, false)
            .then(poalimAsakimNew.failIfRedirectedToError)
            .then(function (accAll) {
                if (accAll.length > 0) {
                    var arrDD = '', arraDD = [], arrForManual = [], len = accAll.length;
                    $(accAll).each(function (i, v) {
                        var snifNum = v.branchNumber;
                        var accNum = v.accountNumber;
                        if (i + 1 == len) {
                            arrDD += accNum + '-' + snifNum;
                        } else {
                            arrDD += accNum + '-' + snifNum + ',';
                        }
                        arraDD.push(accNum + '-' + snifNum);
                        if (all.banks.bankPoalimAsakimManual) {
                            if (all.banks.accountDetails.bank.arrDDAll[0].BANK_SNIF_ACCOUNT_KEY == null) {
                                arrForManual.push({
                                    "BANK_SNIF_ACCOUNT_KEY": accNum + '-' + snifNum,
                                    "BITWISE": all.banks.accountDetails.bank.arrDDAll[0].BITWISE,
                                    "TRANS_DAY_TO_RUN": all.banks.accountDetails.bank.arrDDAll[0].TRANS_DAY_TO_RUN,
                                    "CHECKPIC_DAYS_TO_RUN": all.banks.accountDetails.bank.arrDDAll[0].CHECKPIC_DAYS_TO_RUN,
                                    "IND_CCARD_DATA": all.banks.accountDetails.bank.arrDDAll[0].IND_CCARD_DATA,
                                    "IND_NILVIM": all.banks.accountDetails.bank.arrDDAll[0].IND_NILVIM,
                                    "MATAH_DAY_TO_RUN": all.banks.accountDetails.bank.arrDDAll[0].MATAH_DAY_TO_RUN,
                                    "DATE_TILL": all.banks.accountDetails.bank.arrDDAll[0].DATE_TILL,
                                    "datebackslesh": all.banks.accountDetails.bank.arrDDAll[0].datebackslesh,
                                    "datebacksleshTo": all.banks.accountDetails.bank.arrDDAll[0].datebacksleshTo,
                                    "datebacksleshMatah": all.banks.accountDetails.bank.arrDDAll[0].datebacksleshMatah,
                                    "datebacksleshToMatah": all.banks.accountDetails.bank.arrDDAll[0].datebacksleshToMatah
                                })
                            }
                        }
                        if (i + 1 == len) {
                            let isSet = true;
                            if (all.banks.bankPoalimAsakimManual) {
                                if (all.banks.accountDetails.bank.arrDDAll[0].BANK_SNIF_ACCOUNT_KEY == null) {
                                    isSet = false;
                                    all.banks.accountDetails.bank.arrDDAll = arrForManual;
                                }
                            }
                            all.banks.accountDetails.bank.arraDD = arraDD;
                            if (!all.banks.bankPoalimAsakimManual) {
                                let obj = {};
                                // if (all.banks.bankPoalimAsakimManual && isSet === false) {
                                //     obj = {
                                //         "BITWISE": all.banks.accountDetails.bank.arrDDAll[0].BITWISE,
                                //         "TRANS_DAY_TO_RUN": all.banks.accountDetails.bank.arrDDAll[0].TRANS_DAY_TO_RUN,
                                //         "CHECKPIC_DAYS_TO_RUN": all.banks.accountDetails.bank.arrDDAll[0].CHECKPIC_DAYS_TO_RUN,
                                //         "IND_CCARD_DATA": all.banks.accountDetails.bank.arrDDAll[0].IND_CCARD_DATA,
                                //         "IND_NILVIM": all.banks.accountDetails.bank.arrDDAll[0].IND_NILVIM,
                                //         "MATAH_DAY_TO_RUN": all.banks.accountDetails.bank.arrDDAll[0].MATAH_DAY_TO_RUN,
                                //         "DATE_TILL": all.banks.accountDetails.bank.arrDDAll[0].DATE_TILL,
                                //         "datebackslesh": all.banks.accountDetails.bank.arrDDAll[0].datebackslesh,
                                //         "datebacksleshTo": all.banks.accountDetails.bank.arrDDAll[0].datebacksleshTo,
                                //         "datebacksleshMatah": all.banks.accountDetails.bank.arrDDAll[0].datebacksleshMatah,
                                //         "datebacksleshToMatah": all.banks.accountDetails.bank.arrDDAll[0].datebacksleshToMatah
                                //     }
                                // }

                                all.banks.accounts.poalimAsakimNew.sendAccDD(arrDD, obj);
                            } else {
                                // (all.banks.bankPoalimAsakimManual && isSet === true)
                                // all.banks.accounts.poalimAsakimNew.loadOsh();
                                if (isSet) {
                                    all.banks.accounts.poalimAsakimNew.loadOsh();
                                } else {
                                    // if (all.banks.bankPoalimAsakimManual && isSet === false) {
                                    // }
                                    let obj = {
                                        "BITWISE": all.banks.accountDetails.bank.arrDDAll[0].BITWISE,
                                        "TRANS_DAY_TO_RUN": all.banks.accountDetails.bank.arrDDAll[0].TRANS_DAY_TO_RUN,
                                        "CHECKPIC_DAYS_TO_RUN": all.banks.accountDetails.bank.arrDDAll[0].CHECKPIC_DAYS_TO_RUN,
                                        "IND_CCARD_DATA": all.banks.accountDetails.bank.arrDDAll[0].IND_CCARD_DATA,
                                        "IND_NILVIM": all.banks.accountDetails.bank.arrDDAll[0].IND_NILVIM,
                                        "MATAH_DAY_TO_RUN": all.banks.accountDetails.bank.arrDDAll[0].MATAH_DAY_TO_RUN,
                                        "DATE_TILL": all.banks.accountDetails.bank.arrDDAll[0].DATE_TILL,
                                        "datebackslesh": all.banks.accountDetails.bank.arrDDAll[0].datebackslesh,
                                        "datebacksleshTo": all.banks.accountDetails.bank.arrDDAll[0].datebacksleshTo,
                                        "datebacksleshMatah": all.banks.accountDetails.bank.arrDDAll[0].datebacksleshMatah,
                                        "datebacksleshToMatah": all.banks.accountDetails.bank.arrDDAll[0].datebacksleshToMatah
                                    }
                                    all.banks.accounts.poalimAsakimNew.sendAccDD(arrDD, obj);
                                }
                            }
                            arraDD = null;
                        }
                    })
                }
            })
    }
    poalimAsakimNew.setNewTime = function (cb) {
        all.banks.core.services.removingCookie(false, function () {
            loadAuto();
        });

        function loadAuto() {
            if (poalimAsakimNew.indPoalim122) {
                $('#filecontainerlogin').attr('src', 'https://' + poalimAsakimNew.newAccPath + '.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=getLogonPageIski');
                poalimAsakimNew.loginOTP(poalimAsakimNew.passOtpNew, function () {
                    $('#filecontainerlogin').attr('src', '');
                    var url = "https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?ctfw=init&reqName=action&language=HE&transactionId=HomePagePoalim&subMenuName=Shekel&ts=189987&tf=" + Math.random() + "&u=i&pSubMenu=undefined&fromSubMenu=Shekel&bxx=912&nsv=y&dwx=187384088979815406&wScr=1920&hScr=1080&tcfo=" + new Date().getTime() + "&mmx=1&qwrt=189987&dtcdb=0&menuTranName=HomePagePoalim"
                    all.banks.core.services.httpReq(url, 'GET', null, false, false)
                        .then(function (data, state, status) {
                            var $$ = all.banks.core.services.parseHtml(data);
                            data = null;
                            var ts = $$.find('input[name="ts"]').val();
                            var u = $$.find('input[name="u"]').val();
                            var dwx = $$.find('input[name="dwx"]').val();
                            var tcfo = $$.find('input[name="tcfo"]').val();
                            var qwrt = $$.find('input[name="qwrt"]').val();
                            var tsfo = $$.find('input[name="tsfo"]').val();
                            var mmx = $$.find('input[name="mmx"]').val();
                            var dwxReq = $$.find('input[name="dwxReq"]').val();
                            var dwxOp = $$.find('input[name="dwxOp"]').val();
                            var allAcountsList = $$.find('#allAcountsList');
                            var reqName = $$.find('input[name="reqName"]').val();
                            var transactionId = $$.find('input[name="transactionId"]').val();
                            var menuParam = $$.find('input[name="menuParam"]').val();
                            var PGcode = $$.find('input[name="PGcode"]').val();
                            var step = $$.find('input[name="step"]').val();
                            var fromSubMenu = $$.find('input[name="fromSubMenu"]').val();
                            var mpux = $$.find('input[name="mpux"]').val();
                            var targetView = $$.find('input[name="targetView"]').val();
                            var doc_key = $$.find('input[name="doc_key"]').val();
                            var callerTid = $$.find('input[name="callerTid"]').val();
                            var WTcomeFrom = $$.find('input[name="WTcomeFrom"]').val();
                            var no_Bank = $$.find('input[name="no_Bank"]').val();
                            var no_Snif = $$.find('input[name="no_Snif"]').val();
                            var no_Acc = $$.find('input[name="no_Acc"]').val();
                            var shelav = $$.find('input[name="shelav"]').val();
                            var goBack = $$.find('input[name="goBack"]').val();
                            var lastThreeMonthActions = $$.find('input[name="lastThreeMonthActions"]').val();
                            var dateRangeSelect = $$.find('input[name="dateRangeSelect"]').val();
                            poalimAsakimNew.varGlobal = {
                                ts: ts,
                                u: u,
                                dwx: dwx,
                                tcfo: tcfo,
                                qwrt: qwrt,
                                tsfo: tsfo,
                                mmx: mmx,
                                reqName: reqName,
                                transactionId: transactionId,
                                menuParam: menuParam,
                                PGcode: PGcode,
                                step: step,
                                fromSubMenu: fromSubMenu,
                                mpux: mpux,
                                targetView: targetView,
                                dwxReq: dwxReq,
                                dwxOp: dwxOp,
                                doc_key: doc_key,
                                callerTid: callerTid,
                                WTcomeFrom: WTcomeFrom,
                                no_Bank: no_Bank,
                                no_Snif: no_Snif,
                                no_Acc: no_Acc,
                                shelav: shelav,
                                goBack: goBack,
                                lastThreeMonthActions: lastThreeMonthActions,
                                dateRangeSelect: dateRangeSelect,
                                currentAcc: parseFloat(allAcountsList.val())
                            };
                            var expires = status.getResponseHeader("X-FRAME-OPTIONS");
                            if (expires == null) {
                                $$ = null;
                                poalimAsakimNew.logOut();
                            } else {
                                var req = {
                                    'input_fromAgg': "",
                                    'reqName': "action",
                                    'transactionId': "PerutPikdonotAndPeri",
                                    'menuParam': "",
                                    'PGcode': "",
                                    'step': "1",
                                    'u': poalimAsakimNew.varGlobal.u,
                                    'tcfo': poalimAsakimNew.varGlobal.tcfo,
                                    'tsfo': poalimAsakimNew.varGlobal.tsfo,
                                    'mmx': poalimAsakimNew.varGlobal.mmx,
                                    'fromSubMenu': "Investments",
                                    'qwrt': poalimAsakimNew.varGlobal.qwrt,
                                    'mpux': "",
                                    'targetView': "",
                                    'dwx': poalimAsakimNew.varGlobal.dwx,
                                    'dwxReq': poalimAsakimNew.varGlobal.dwxReq,
                                    'dwxOp': poalimAsakimNew.varGlobal.dwxOp,
                                    'doc_key': "",
                                    'callerTid': "",
                                    'WTcomeFrom': "",
                                    'accountIndex': all.banks.accounts.poalimAsakimNew.indDDAll(all.banks.accounts.poalimAsakimNew.vddVal.BANK_SNIF_ACCOUNT_KEY)
                                };
                                all.banks.core.services.httpReq("https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc", 'POST', req, true, false)
                                    .then(function (res) {
                                        cb();
                                    })
                            }
                        });
                });
            } else {
                $('#filecontainerlogin').attr('src', 'https://' + poalimAsakimNew.newAccPath + '.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=getLogonIski');

                var ifarmeSetInterval = setInterval(function () {
                    monitorActivityClass.setIntervalActivity();
                    var input = window.frames[0].callCheckIsMnkReady;
                    if (input == undefined) {
                        myEmitterLogs(2);
                        $('#filecontainerlogin').attr('src', 'https://' + poalimAsakimNew.newAccPath + '.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=getLogonIski');
                    } else {
                        clearInterval(ifarmeSetInterval);
                    }
                }, 4000);

                var waitForIFrame = setInterval(function () {
                    var input = window.frames[0].callCheckIsMnkReady;
                    if (input !== undefined) {
                        myEmitterLogs(3);
                        clearInterval(waitForIFrame);
                        doneLoadFrame();
                    }
                }, 200);

                function doneLoadFrame() {
                    try {
                        var form = {
                            "password": "",
                            "language": "HE",
                            "comeFromBank": "",
                            "sugUser": "Iski",
                            "reqName": "performLogon",
                            "key": window.frames[0].document.logon.key.value,
                            "bank": "",
                            "kgmCodeMenahel": "",
                            "PK": "",
                            "w": "1024",
                            "h": "768",
                            "v": "",
                            "nls": "HE",
                            "pkiMessage": "",
                            "osVersion": "",
                            "browserVersion": "",
                            "activeXVersion": "",
                            "driverVersion": "",
                            "MiniKeyVersion": "",
                            "InstituteCode": window.frames[0].document.logon.InstituteCode.value,
                            "nsv": "y",
                            "signed": "",
                            "userid": "",
                            "sn": "",
                            "changePswCheck": "",
                            "saFlash": "false",
                            "__password": "",
                        }

                        $('#filecontainerlogin').contents().find("input[name='password']").val(all.banks.accountDetails.bank.password);
                        var pwdFld = document.createElement("input");
                        pwdFld.type = "password";
                        pwdFld.value = all.banks.accountDetails.bank.password;
                        pwdFld.name = "password";

                        window.frames[0].callCheckIsMnkReady(function (result) {
                            if (result == "0") {
                                setTimeout(setMnkLoginSerialNo, 0, 1, pwdFld);
                            }
                        });

                        function setMnkLoginSerialNo(fromWhere, pwdFld) {
                            window.frames[0].callGetSerialToken(function (result) {
                                form.sn = result;
                                setTimeout(setMnkLoginSignData, 0, 1, pwdFld);
                            });
                        }

                        function setMnkLoginSignData(fromWhere, pwdFld) {
                            window.frames[0].signMnkToken($('#filecontainerlogin').contents().find("SCRIPT").text().split('signMnkToken("')[1].split('",')[0], pwdFld.value, function (result) {
                                sArray = result.split(" ");
                                rc = sArray[0];
                                if (rc == "0") {
                                    form.userid = sArray[1];
                                    form.signed = sArray[2];
                                    pwdFld.value = "";
                                }
                                window.frames[0].vsenc.EncryptForm(window.frames[0].document.logon);
                                form.password = window.frames[0].document.logon.password.value;

                                all.banks.core.services.httpReq("https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc", 'POST', form, true, false)
                                    .then(function (data, state, status) {
                                        //	myEmitterLogs(5);

                                        all.banks.core.services.httpReq("https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?&reqName=checkMinikeyTimeout", 'GET', null, false, false)
                                            .then(function (data, state, status) {
                                                all.banks.core.services.httpReq("https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?ctfw=init&reqName=action&language=HE&transactionId=HomePagePoalim&subMenuName=Shekel&ts=821985&tf=0.9139892475098654&u=i&pSubMenu=undefined&fromSubMenu=Shekel&bxx=912&nsv=y&dwx=872203481444646764&wScr=1024&hScr=768&tcfo=1500516022663&mmx=1&qwrt=821985&dtcdb=99999999&menuTranName=HomePagePoalim", 'GET', null, false, false)
                                                    .then(function (data, state, status) {
                                                        $('#filecontainerlogin').attr('src', '');
                                                        var url = "https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?ctfw=init&reqName=action&language=HE&transactionId=HomePagePoalim&subMenuName=Shekel&ts=189987&tf=" + Math.random() + "&u=i&pSubMenu=undefined&fromSubMenu=Shekel&bxx=912&nsv=y&dwx=187384088979815406&wScr=1920&hScr=1080&tcfo=" + new Date().getTime() + "&mmx=1&qwrt=189987&dtcdb=0&menuTranName=HomePagePoalim"
                                                        all.banks.core.services.httpReq(url, 'GET', null, false, false)
                                                            .then(function (data, state, status) {
                                                                var $$ = all.banks.core.services.parseHtml(data);
                                                                data = null;
                                                                var ts = $$.find('input[name="ts"]').val();
                                                                var u = $$.find('input[name="u"]').val();
                                                                var dwx = $$.find('input[name="dwx"]').val();
                                                                var tcfo = $$.find('input[name="tcfo"]').val();
                                                                var qwrt = $$.find('input[name="qwrt"]').val();
                                                                var tsfo = $$.find('input[name="tsfo"]').val();
                                                                var mmx = $$.find('input[name="mmx"]').val();
                                                                var dwxReq = $$.find('input[name="dwxReq"]').val();
                                                                var dwxOp = $$.find('input[name="dwxOp"]').val();
                                                                var allAcountsList = $$.find('#allAcountsList');
                                                                var reqName = $$.find('input[name="reqName"]').val();
                                                                var transactionId = $$.find('input[name="transactionId"]').val();
                                                                var menuParam = $$.find('input[name="menuParam"]').val();
                                                                var PGcode = $$.find('input[name="PGcode"]').val();
                                                                var step = $$.find('input[name="step"]').val();
                                                                var fromSubMenu = $$.find('input[name="fromSubMenu"]').val();
                                                                var mpux = $$.find('input[name="mpux"]').val();
                                                                var targetView = $$.find('input[name="targetView"]').val();
                                                                var doc_key = $$.find('input[name="doc_key"]').val();
                                                                var callerTid = $$.find('input[name="callerTid"]').val();
                                                                var WTcomeFrom = $$.find('input[name="WTcomeFrom"]').val();
                                                                var no_Bank = $$.find('input[name="no_Bank"]').val();
                                                                var no_Snif = $$.find('input[name="no_Snif"]').val();
                                                                var no_Acc = $$.find('input[name="no_Acc"]').val();
                                                                var shelav = $$.find('input[name="shelav"]').val();
                                                                var goBack = $$.find('input[name="goBack"]').val();
                                                                var lastThreeMonthActions = $$.find('input[name="lastThreeMonthActions"]').val();
                                                                var dateRangeSelect = $$.find('input[name="dateRangeSelect"]').val();
                                                                poalimAsakimNew.varGlobal = {
                                                                    ts: ts,
                                                                    u: u,
                                                                    dwx: dwx,
                                                                    tcfo: tcfo,
                                                                    qwrt: qwrt,
                                                                    tsfo: tsfo,
                                                                    mmx: mmx,
                                                                    reqName: reqName,
                                                                    transactionId: transactionId,
                                                                    menuParam: menuParam,
                                                                    PGcode: PGcode,
                                                                    step: step,
                                                                    fromSubMenu: fromSubMenu,
                                                                    mpux: mpux,
                                                                    targetView: targetView,
                                                                    dwxReq: dwxReq,
                                                                    dwxOp: dwxOp,
                                                                    doc_key: doc_key,
                                                                    callerTid: callerTid,
                                                                    WTcomeFrom: WTcomeFrom,
                                                                    no_Bank: no_Bank,
                                                                    no_Snif: no_Snif,
                                                                    no_Acc: no_Acc,
                                                                    shelav: shelav,
                                                                    goBack: goBack,
                                                                    lastThreeMonthActions: lastThreeMonthActions,
                                                                    dateRangeSelect: dateRangeSelect,
                                                                    currentAcc: parseFloat(allAcountsList.val())
                                                                };
                                                                var expires = status.getResponseHeader("X-FRAME-OPTIONS");
                                                                if (expires == null) {
                                                                    $$ = null;
                                                                    poalimAsakimNew.logOut();
                                                                } else {
                                                                    var req = {
                                                                        'input_fromAgg': "",
                                                                        'reqName': "action",
                                                                        'transactionId': "PerutPikdonotAndPeri",
                                                                        'menuParam': "",
                                                                        'PGcode': "",
                                                                        'step': "1",
                                                                        'u': poalimAsakimNew.varGlobal.u,
                                                                        'tcfo': poalimAsakimNew.varGlobal.tcfo,
                                                                        'tsfo': poalimAsakimNew.varGlobal.tsfo,
                                                                        'mmx': poalimAsakimNew.varGlobal.mmx,
                                                                        'fromSubMenu': "Investments",
                                                                        'qwrt': poalimAsakimNew.varGlobal.qwrt,
                                                                        'mpux': "",
                                                                        'targetView': "",
                                                                        'dwx': poalimAsakimNew.varGlobal.dwx,
                                                                        'dwxReq': poalimAsakimNew.varGlobal.dwxReq,
                                                                        'dwxOp': poalimAsakimNew.varGlobal.dwxOp,
                                                                        'doc_key': "",
                                                                        'callerTid': "",
                                                                        'WTcomeFrom': "",
                                                                        'accountIndex': all.banks.accounts.poalimAsakimNew.indDDAll(all.banks.accounts.poalimAsakimNew.vddVal.BANK_SNIF_ACCOUNT_KEY)
                                                                    };
                                                                    all.banks.core.services.httpReq("https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc", 'POST', req, true, false)
                                                                        .then(function (res) {
                                                                            cb();
                                                                        })
                                                                }
                                                            });
                                                    })
                                            })
                                    })

                            })
                        }
                    } catch (err) {
                        all.banks.core.services.errorLog(err);
                    }
                }
            }
        }
    }
    poalimAsakimNew.loadAccDD = function () {
        var url = "https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?ctfw=init&reqName=action&language=HE&transactionId=HomePagePoalim&subMenuName=Shekel&ts=189987&tf=" + Math.random() + "&u=i&pSubMenu=undefined&fromSubMenu=Shekel&bxx=912&nsv=y&dwx=187384088979815406&wScr=1920&hScr=1080&tcfo=" + new Date().getTime() + "&mmx=1&qwrt=189987&dtcdb=0&menuTranName=HomePagePoalim"
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (data, state, status) {
                var $$ = all.banks.core.services.parseHtml(data);
                data = null;
                var ts = $$.find('input[name="ts"]').val();
                var u = $$.find('input[name="u"]').val();
                var dwx = $$.find('input[name="dwx"]').val();
                var tcfo = $$.find('input[name="tcfo"]').val();
                var qwrt = $$.find('input[name="qwrt"]').val();
                var tsfo = $$.find('input[name="tsfo"]').val();
                var mmx = $$.find('input[name="mmx"]').val();
                var dwxReq = $$.find('input[name="dwxReq"]').val();
                var dwxOp = $$.find('input[name="dwxOp"]').val();
                var allAcountsList = $$.find('#allAcountsList');
                poalimAsakimNew.varGlobal = {
                    ts: ts,
                    u: u,
                    dwx: dwx,
                    tcfo: tcfo,
                    qwrt: qwrt,
                    tsfo: tsfo,
                    mmx: mmx,
                    dwxReq: dwxReq,
                    dwxOp: dwxOp,
                    currentAcc: parseFloat(allAcountsList.val())
                };
                var expires = status.getResponseHeader("X-FRAME-OPTIONS");
                if (expires == null) {
                    $$ = null;
                    poalimAsakimNew.setNewTime(poalimAsakimNew.loadAccDD);
                    //all.banks.accounts.poalimAsakimNew.logOut();
                } else {
                    try {
                        if ($$.find('form[name="logon"]').length > 0) {
                            $$ = null;
                            myEmitterLogs(9);
                        } else {
                            $$ = null;
                            if (allAcountsList.length > 0) {
                                var arrDD = '', arraDD = [], arrForManual = [],
                                    len = allAcountsList.find('option').length;
                                allAcountsList.find('option script').each(function (i, v) {
                                    var text = $(v).text().split('new Acc(')[1].split(")")[0].split(",");
                                    var snifNum = text[1].replace(/\D/g, "");
                                    var accNum = text[2].replace(/\D/g, "");
                                    if (i + 1 == len) {
                                        arrDD += accNum + '-' + snifNum;
                                    } else {
                                        arrDD += accNum + '-' + snifNum + ',';
                                    }
                                    arraDD.push(accNum + '-' + snifNum);
                                    if (all.banks.bankPoalimAsakimManual) {
                                        if (all.banks.accountDetails.bank.arrDDAll[0].BANK_SNIF_ACCOUNT_KEY == null) {
                                            arrForManual.push({
                                                "BANK_SNIF_ACCOUNT_KEY": accNum + '-' + snifNum,
                                                "BITWISE": all.banks.accountDetails.bank.arrDDAll[0].BITWISE,
                                                "TRANS_DAY_TO_RUN": Math.min(all.banks.accountDetails.bank.arrDDAll[0].TRANS_DAY_TO_RUN,
                                                    poalimAsakimNew.TRANS_DAY_TO_RUN_MAX_FOR_OLD_SITE),
                                                "CHECKPIC_DAYS_TO_RUN": all.banks.accountDetails.bank.arrDDAll[0].CHECKPIC_DAYS_TO_RUN,
                                                "IND_CCARD_DATA": all.banks.accountDetails.bank.arrDDAll[0].IND_CCARD_DATA,
                                                "IND_NILVIM": all.banks.accountDetails.bank.arrDDAll[0].IND_NILVIM,
                                                "MATAH_DAY_TO_RUN": all.banks.accountDetails.bank.arrDDAll[0].MATAH_DAY_TO_RUN,
                                                "DATE_TILL": all.banks.accountDetails.bank.arrDDAll[0].DATE_TILL,
                                                "datebackslesh": all.banks.accountDetails.bank.arrDDAll[0].datebackslesh,
                                                "datebacksleshTo": all.banks.accountDetails.bank.arrDDAll[0].datebacksleshTo,
                                                "datebacksleshMatah": all.banks.accountDetails.bank.arrDDAll[0].datebacksleshMatah,
                                                "datebacksleshToMatah": all.banks.accountDetails.bank.arrDDAll[0].datebacksleshToMatah
                                            })
                                        }
                                    }
                                    if (i + 1 == len) {
                                        let isSet = true;
                                        if (all.banks.bankPoalimAsakimManual) {
                                            if (all.banks.accountDetails.bank.arrDDAll[0].BANK_SNIF_ACCOUNT_KEY == null) {
                                                isSet = false;
                                                all.banks.accountDetails.bank.arrDDAll = arrForManual;
                                            }
                                        }
                                        all.banks.accountDetails.bank.arraDD = arraDD;
                                        if (all.banks.bankPoalimAsakimManual && all.banks.accountDetails.bank.arrDDAll[0].BANK_SNIF_ACCOUNT_KEY !== null) {
                                            all.banks.accounts.poalimAsakimNew.loadOsh();
                                        } else {
                                            all.banks.accounts.poalimAsakimNew.sendAccDD(arrDD);
                                        }
                                        arraDD = null;
                                    }
                                })
                            }
                        }
                    } catch (err) {
                        all.banks.core.services.errorLog(err)
                    }
                }
            })
            .fail(function (error, resErr) {
                if (resErr == 'error') {
                    //myEmitterLogs( 27);
                    $('#filecontainerlogin').attr('src', '')
                }
            })
    }
    poalimAsakimNew.sendAccDD = function (arrDD, obj) {
        var data = {
            inspider_id: all.banks.spiderConfig.spiderId,
            accountkey_tab: arrDD,
            run_type: all.banks.accountDetails.run_type
        };
        if (poalimAsakimNew.indPoalim122 == true) {
            data['inspider_id'] = all.banks.accountDetails.bank.token;
        }
        myEmitterLogs(28, arrDD);
        all.banks.core.services.sendAccDDPoalim(data)
            .then(function (response) {
                data = null;
                // response.splice(20, response.length);
                all.banks.accountDetails.bank.arrDDAll = response;
                if (all.banks.bankPoalimAsakimManual) {
                    if (obj && JSON.stringify(obj) !== '{}') {
                        all.banks.accountDetails.bank.arrDDAll = all.banks.accountDetails.bank.arrDDAll.map((it) => {
                            return Object.assign(it, obj)
                        });
                    }
                }
                writeLog('Poalim asakim: received following accounts for work from server => ' + JSON.stringify(all.banks.accountDetails.bank.arrDDAll));
                if (response.length > 0) {
                    all.banks.accounts.poalimAsakimNew.loadOsh();
                    response = null;
                } else {
                    if (!poalimAsakimNew.newAcc) {
                        poalimAsakimNew.logOut();
                    } else {
                        poalimAsakimNew.logOutNew();
                    }
                    response = null;
                }
            })
            .fail(function (error) {
                if (error == 'discard') {
                    all.banks.accounts.poalimAsakimNew.sendAccDD(arrDD, obj);
                    arrDD = null;
                } else {
                    //all.banks.core.services.errorLog('שגיאה בשליחת החשבונות')
                }
            })
    };
    poalimAsakimNew.indDDAll = function (ddind, vals) {
        var indDDArr = '';
        $(all.banks.accountDetails.bank.arraDD).each(function (indexDD, vDD) {
            if (vals) {
                if (indexDD == ddind) {
                    indDDArr = vDD.split("-")[0];
                }
            } else {
                if (vDD == ddind) {
                    indDDArr = indexDD;
                }
            }
        })
        if (indDDArr === '') {
            all.banks.generalVariables.allDataArr = {};
            //all.banks.accounts.poalimAsakimNew.logOut();
        }
        return indDDArr;
    };
    poalimAsakimNew.convertDateLocal = function (dateLocal) {
        var dateFormat = "";
        if (dateLocal !== undefined && dateLocal !== null) {
            dateLocal = dateLocal.toString();
            if (dateLocal !== "") {
                dateFormat = dateLocal.substring(4, 6) + "/" + dateLocal.substring(6, 8) + "/" + dateLocal.substring(0, 4);
            }
        } else {
            //debugger
        }
        return dateFormat;
    }
    poalimAsakimNew.getImageAndSend = function (url, uuid) {
        var dfd = jQuery.Deferred();
        var indexCheckTry = 0;

        function sendAndGetCheck(url, uuid) {
            // var formData = new FormData();
            var img = new Image();
            img.src = url;
            var timer = setTimeout(function (theImg) {
                return function () {
                    theImg.onerror();
                };
            }(img), 120000);
            monitorActivityClass.setIntervalActivity();
            img.onload = function () {
                clearTimeout(timer);
                var canvas = document.createElement("canvas");
                canvas.width = this.width;
                canvas.height = this.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);
                var dataURL = canvas.toDataURL("image/jpeg");
                var content = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

                // var blob = new Blob([content], {
                // 	type: "text/plain"
                // });
                // formData.append(uuid, blob);
                const formDatas = {
                    "name": uuid,
                    "filename": "blob",
                };
                formDatas[uuid] = content;
                dfd.resolve(formDatas);

                // poalimAsakimNew.sendChecksCtrlNew(formData)
                // .then(function (arr) {
                // 	dfd.resolve(true);
                // })
                // .fail(function (error, resErr) {
                // 	dfd.resolve(false);
                // })
            }
            img.onerror = function () {
                clearTimeout(timer);
                if (indexCheckTry < 3) {
                    indexCheckTry += 1;
                    sendAndGetCheck(url, uuid);
                } else {
                    all.banks.generalVariables.numChecksNotWithdrawn += 1;
                    dfd.resolve(false);
                }
            };
        }

        function loadImage(url) {
            const dfdImg = jQuery.Deferred();
            const img = new Image();
            img.src = url;
            const timer = setTimeout(function (theImg) {
                return function () {
                    theImg.onerror();
                };
            }(img), 120000);
            img.onload = () => {
                clearTimeout(timer);
                dfdImg.resolve(img);
            };
            img.onerror = () => {
                clearTimeout(timer);
                dfdImg.resolve(null);
            };
            return dfdImg;
        }

        function merge(imgFront, imgBack) {
            if (imgFront === null) {
                all.banks.generalVariables.numChecksNotWithdrawn += 1;
                return null;
            }

            const canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
            canvas.width = Math.max(imgFront.width, (imgBack !== null ? imgBack.width : 0));
            canvas.height = imgFront.height + (imgBack !== null ? imgBack.height : 0);
            ctx.drawImage(imgFront, 0, 0);
            if (imgBack !== null) {
                ctx.drawImage(imgBack, 0, imgFront.height);
            }


// 			console.log('<img src="' + canvas.toDataURL("image/jpeg", poalimAsakimNew.imageScale) + '" />')
// debugger
            return canvas.toDataURL("image/jpeg", poalimAsakimNew.imageScale)
                .replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
        }

        if (Array.isArray(url) && url.length === 2) {
            jQuery.when(
                loadImage(url[0]),
                loadImage(url[1])
            ).done(function (imgF, imgB) {
                const mergedImagesData = merge(imgF, imgB);

                if (!mergedImagesData) {
                    dfd.resolve(false);
                    return;
                }

                // var formData = new FormData();
                // var blob = new Blob([mergedImagesData], {
                // 	type: "text/plain"
                // });
                // formData.append(uuid, blob);
                // dfd.resolve(formData);
                const formDatas = {
                    "name": uuid,
                    "filename": "blob",
                };
                formDatas[uuid] = mergedImagesData;
                dfd.resolve(formDatas);

                // dfd.resolve({
                // 	file: mergedImagesData,
                // 	name: uuid,
                // 	filename: 'blob',
                // 	contentType: 'multipart/form-data',
                // 	contentDisposition: 'form-data'
                // });
                // poalimAsakimNew.sendChecksCtrlNew(formData)
                // .then(function (arr) {
                // 	dfd.resolve(true);
                // })
                // .fail(function (error, resErr) {
                // 	dfd.resolve(false);
                // });
            });
        } else {
            // Handle single image (without back side image provided) as previously
            sendAndGetCheck((Array.isArray(url) ? url[0] : url), uuid);
        }

        return dfd.promise();
    };
    poalimAsakimNew.renewLogin = function (isNotMiddle) {
        return new Promise(resolve => {
            function login() {
                if (isNotMiddle === undefined) {
                    all.banks.accounts.poalimAsakimNew.middleOfWork = true;
                } else {
                    all.banks.accounts.poalimAsakimNew.middleOfWork = false;
                }
                all.banks.accounts.poalimAsakimNew.login();

                // all.banks.core.main.changeIpV4(false).then(function () {
                //     all.banks.accounts.poalimAsakimNew.login();
                // });

                // all.banks.core.services.removingCookie(false, function () {
                //     document.cookie = '';
                //     nw.App.clearCache();
                //     all.banks.accounts.poalimAsakimNew.login();
                // })

                const inter = setInterval(() => {
                    if (!all.banks.accounts.poalimAsakimNew.middleOfWork) {
                        clearInterval(inter);
                        resolve(true);
                    }
                }, 1000);
            }

            login();

            // clearProxy().then(() => {
            // all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=preLogoff&lang=he", 'GET', null, false, false)
            //     .then(function (res) {
            //         all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=Logoff&id=0", 'GET', null, false, false)
            //             .then(function (res) {
            //                 $('#filecontainerlogin').attr('src', '');
            //                 login();
            //             })
            //             .fail(function (error, resErr, urlParam) {
            //                 $('#filecontainerlogin').attr('src', '');
            //                 login();
            //             });
            //     })
            //     .fail(function (error, resErr, urlParam) {
            //         $('#filecontainerlogin').attr('src', '');
            //         login();
            //     });
            // });
        });
    }
    poalimAsakimNew.getNewIp = function () {
        return new Promise(async resolve => {
            request({
                uri: "https://icanhazip.com",
                family: 4,
                method: 'GET',
                timeout: 40000000,
                'proxy': ('http://brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '') + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225'),
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
                }
            }, function (error, response, body) {
                if (body && typeof body === 'string') {
                    writeLog('---ipAfterServerProxy: ' + body.replace(/\s/g, ""));
                }
                resolve(true);
            })
        })
    }
    poalimAsakimNew.loadOsh = async function () {
        if (window.navigator.platform.indexOf('Win') === -1 && !window.all.banks.vpnConnected) {
            if (poalimAsakimNew.intervalXHRKeepProxySession) {
                clearInterval(poalimAsakimNew.intervalXHRKeepProxySession)
            }
            await poalimAsakimNew.getNewIp();
        }

        writeLog('Start loadOsh');
        const started = Date.now();
        let numForLogsOut = 0;
        const arrayCollectSave = [];
        // const alive = setInterval(() => {
        //     if (!all.banks.accounts.poalimAsakimNew.middleOfWork) {
        //         all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/ng-portals/biz/he/homepage", 'GET', null, false, false)
        //             .then(() => {
        //                 resolveCookies()
        //             }).fail(() => {
        //         });
        //     }
        // }, 20000);

        all.banks.generalVariables.allDataArr = {
            "ExporterId": all.banks.spiderConfig.spiderId,
            "BankData": [{
                "TargetId": all.banks.spiderConfig.spiderId,
                "Token": all.banks.generalVariables.branchNumber,
                "BankNumber": all.banks.accountDetails.bank.BankNumber,
                "ExtractDate": all.banks.accountDetails.bank.ExtractDate,
                "Account": []
            }]
        };
        try {
            const ARR_TRANS_DAY_TO_RUN = (all.banks.accountDetails.bank.arrDDAll.filter((it) => (it.TRANS_DAY_TO_RUN > 0)))
                .map((item, idx) => {
                    if (!all.banks.bankPoalimAsakimManual) {
                        var dateFromMatah = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - item.MATAH_DAY_TO_RUN);
                        var dateToMatah = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                        var datebacksleshToMatah = dateToMatah.getFullYear() + '' + ("0" + (dateToMatah.getMonth() + 1)).slice(-2) + '' + ("0" + (dateToMatah.getDate())).slice(-2);
                        var datebacksleshMatah = dateFromMatah.getFullYear() + '' + ("0" + (dateFromMatah.getMonth() + 1)).slice(-2) + '' + ("0" + (dateFromMatah.getDate())).slice(-2);

                        if (item.DATE_TILL !== null) {
                            var dateSplits = item.DATE_TILL.split('/');
                            var dateTo = new Date(parseFloat(dateSplits[2]), parseFloat(dateSplits[1]) - 1, parseFloat(dateSplits[0]));
                            var dateFrom = new Date(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate() - item.TRANS_DAY_TO_RUN);
                        } else {
                            var dateFrom = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - item.TRANS_DAY_TO_RUN);
                            var dateTo = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                        }
                        all.banks.accountDetails.dateFrom = dateFrom;
                        all.banks.accountDetails.dateTo = dateTo;

                        var datebackslesh = all.banks.accountDetails.dateFrom.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2);
                        var datebacksleshTo = all.banks.accountDetails.dateTo.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2);
                    }
                    if (all.banks.bankPoalimAsakimManual) {
                        var datebacksleshMatah = all.banks.accountDetails.dateFromMatah.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2);
                        var datebacksleshToMatah = all.banks.accountDetails.dateToMatah.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2);

                        var datebackslesh = all.banks.accountDetails.dateFrom.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2);
                        var datebacksleshTo = all.banks.accountDetails.dateTo.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2);
                    }

                    return Object.assign(item, {
                        idx,
                        datebackslesh: datebackslesh,
                        datebacksleshTo: datebacksleshTo,
                        datebacksleshMatah: datebacksleshMatah,
                        datebacksleshToMatah: datebacksleshToMatah,
                        bankParams: ("12-" + item.BANK_SNIF_ACCOUNT_KEY.split('-')[1] + "-" + item.BANK_SNIF_ACCOUNT_KEY.split('-')[0]),
                        BankNumber: 12,
                        AccountNumber: parseInt(item.BANK_SNIF_ACCOUNT_KEY.split('-')[0]),
                        BranchNumber: parseInt(item.BANK_SNIF_ACCOUNT_KEY.split('-')[1]),
                    })
                });

            writeLog('ARR_TRANS_DAY_TO_RUN: ' +  JSON.stringify(ARR_TRANS_DAY_TO_RUN));

            const listOfArguments = ARR_TRANS_DAY_TO_RUN;
            const listOfArgumentsSlice = (ARR_TRANS_DAY_TO_RUN.length / poalimAsakimNew.numberOfOperations);
            let allRowsFtched = false;
            let lastResult = null;

            const asyncOperation = param => {
                return new Promise(async resolve => {
                    try {
                        monitorActivityClass.setIntervalActivity();
                        await resolveCookies();
                        console.log('step 1------ Running Index account: ' + param.idx);
                        console.log(all.banks.core.services.logAlertsBanks(30, JSON.stringify(all.banks.accountDetails.bank.arrDDAll[param.idx])));

                        const text = "מתחיל עוש לחשבון" + " " + all.banks.accountDetails.bank.arrDDAll[param.idx].BANK_SNIF_ACCOUNT_KEY + " " + "לתאריכים" + " " + all.banks.accountDetails.bank.arrDDAll[param.idx].datebackslesh + "-" + all.banks.accountDetails.bank.arrDDAll[param.idx].datebacksleshTo;
                        console.log(all.banks.core.services.logAlertsBanks(10, text));

                        let balanceAndCreditLimit;
                        try {
                            balanceAndCreditLimit = await resolveSender({
                                urls: ["https://biz2.bankhapoalim.co.il/ServerServices/current-account/composite/balanceAndCreditLimit?accountId=" + param.bankParams + "&view=details"],
                                method: "GET",
                                body: null,
                                headers: null,
                            });
                        } catch (e) {
                            console.log(e)

                        }

                        console.log('step 2------ balanceAndCreditLimit of Index account: ' + param.idx);
                        let account;
                        try {
                            if (balanceAndCreditLimit.response[0].headers && balanceAndCreditLimit.response[0].headers.location && ["getLogonPageIski", "Error", "exit.html"].some(urlPart => (balanceAndCreditLimit.response[0].headers.location).includes(urlPart))) {
                                let err = new Error("Redirected to " + (balanceAndCreditLimit.response[0].headers.location) + " perhaps because of another otp session started somewhere. Terminating with error.");
                                if (balanceAndCreditLimit.response[0].headers.location === 'https://misc.poalim-site.co.il/Error_Pages/5/New/ErrorNew_5.html') {
                                    err = new Error("Redirected to " + balanceAndCreditLimit.response[0].headers.location + " perhaps because the bank announces that the service is temporarily unavailable.");
                                }
                                all.banks.core.services.errorLog(err);
                                poalimAsakimNew.haltAndWaitForReload = true;
                                poalimAsakimNew.logOutNew();
                                return;
                            }

                            account = Object.assign({
                                'DataRow': [],
                                'BankNumber': param.BankNumber,
                                'AccountNumber': param.AccountNumber,
                                'BranchNumber': param.BranchNumber,
                            }, ((balanceAndCreditLimit.response[0].statusCode === 204) ? {
                                'Balance': null,
                                'AccountCredit': 0
                            } : {
                                'Balance': (balanceAndCreditLimit.response[0].response.currentBalance !== undefined) ? balanceAndCreditLimit.response[0].response.currentBalance : null,
                                'AccountCredit': (balanceAndCreditLimit.response[0].response.currentAccountLimitsAmount !== undefined) ? balanceAndCreditLimit.response[0].response.currentAccountLimitsAmount : null,
                            }));
                            console.log('step 3------ set account params of Index account: ' + param.idx);
                        } catch (e) {
                            console.log(e)

                        }

                        let transactions;
                        let stopped = false
                        let fullDataRows = {};
                        let eventsStatusDataList = null;
                        let firstTime = true;
                        while (!stopped) {
                            try {
                                let data_eventsStatusDataList = await resolveSender({
                                    urls: ['https://biz2.bankhapoalim.co.il/ServerServices/current-account/signatures/events?accountId='
                                    + param.bankParams
                                    + "&limit=500&offset=0&handlingEventRetrievalSwitch=2&lang=he"
                                    + "&endDate=" + param.datebacksleshTo
                                    + "&startDate=" + param.datebackslesh],
                                    method: "GET",
                                    body: null,
                                    headers: null,
                                });
                                eventsStatusDataList = data_eventsStatusDataList.response[0].response;
                                if (eventsStatusDataList && eventsStatusDataList.eventsStatusDataList && eventsStatusDataList.eventsStatusDataList.length) {
                                    eventsStatusDataList = eventsStatusDataList.eventsStatusDataList;
                                } else {
                                    eventsStatusDataList = null;
                                }
                            } catch (e) {
                                console.log(e)
                            }
                            try {
                                transactions = await getTransactions("https://biz2.bankhapoalim.co.il/ServerServices/current-account/transactions"
                                    + (poalimAsakimNew.last_data_headerVal ? ("/" + poalimAsakimNew.last_data_headerVal) : "")
                                    + "?accountId=" + param.bankParams
                                    + "&numItemsPerPage=500&sortCode=2&lang=he"
                                    + "&retrievalEndDate=" + param.datebacksleshTo
                                    + "&retrievalStartDate=" + param.datebackslesh);
                            } catch (e) {
                                console.log(e)
                            }
                            // if (firstTime && transactions && transactions.transactions && transactions.transactions.length === 510) {
                            // } else {
                            //     if (transactions && transactions.transactions) {
                            //         if (fullDataRows && fullDataRows.transactions) {
                            //             fullDataRows.transactions = fullDataRows.transactions.concat(transactions.transactions)
                            //         } else {
                            //             fullDataRows = transactions;
                            //         }
                            //     }
                            // }


                            if (transactions && transactions.transactions && transactions.transactions.length === 510 || (fullDataRows && fullDataRows.transactions)) {
                                if (fullDataRows && fullDataRows.transactions) {
                                    fullDataRows.transactions = fullDataRows.transactions.concat(transactions.transactions)
                                } else {
                                    fullDataRows = transactions;
                                }
                            }

                            transactions = fullDataRows && fullDataRows.transactions ? fullDataRows : transactions;

                            if (transactions && transactions.transactions && transactions.transactions.length === 510) {

                            } else {
                                stopped = true
                            }
                            lastResult = transactions;
                            firstTime = false;
                        }

                        console.log('step 4------ transactions of Index account: ' + param.idx);
                        console.log(all.banks.core.services.logAlertsBanks(11)); // get data
                        if (!transactions || !transactions.transactions) {
                            try {
                                transactions = await getTransactions("https://biz2.bankhapoalim.co.il/ServerServices/current-account/transactions?numItemsPerPage=500&sortCode=1&accountId=" + param.bankParams + "&lang=he");
                            } catch (e) {
                                console.log(e)
                            }
                        }
                        if (transactions && transactions.transactions && transactions.transactions.length) {
                            console.log('step 5------ processTransactions of Index account: ' + param.idx);
                            let transactionsArr;
                            try {
                                transactionsArr = await processTransactions(transactions, param.CHECKPIC_DAYS_TO_RUN, param.bankParams, eventsStatusDataList);
                            } catch (e) {
                                console.log(e)

                            }
                            const grTransfer = transactionsArr.filter((trans, idx) => {
                                if (trans.DepositeTransferData && trans.DepositeTransferData.includes('current-account/transfers/collections/signatures')) {
                                    trans.idx = idx;
                                    return trans
                                }
                            });
                            console.log('grTransfer found ' + grTransfer.length + ' of Index account: ' + param.idx);
                            if (grTransfer.length) {
                                // try {
                                //     let data_eventsStatusDataList = await resolveSender({
                                //         urls: ['https://biz2.bankhapoalim.co.il/ServerServices/current-account/signatures/events?accountId='
                                //         + param.bankParams
                                //         + "&limit=500&offset=0&handlingEventRetrievalSwitch=2&lang=he"
                                //         + "&endDate=" + param.datebacksleshTo
                                //         + "&startDate=" + param.datebackslesh],
                                //         method: "GET",
                                //         body: null,
                                //         headers: null,
                                //     });
                                //     eventsStatusDataList = data_eventsStatusDataList.response[0].response;
                                //     if (eventsStatusDataList && eventsStatusDataList.eventsStatusDataList && eventsStatusDataList.eventsStatusDataList.length) {
                                //         eventsStatusDataList = eventsStatusDataList.eventsStatusDataList;
                                //     } else {
                                //         eventsStatusDataList = null;
                                //     }
                                // } catch (e) {
                                //     console.log(e)
                                // }

                                // try {
                                //  await resolveSender({
                                //         urls: ['https://biz2.bankhapoalim.co.il/ServerServices/general/accounts/selectedAccount?accountId=' + param.bankParams + '&view=partyRelationshipManager&lang=he'],
                                //         method: "GET",
                                //         body: null,
                                //         headers: null,
                                //     });
                                // } catch (e) {
                                //     console.log(e)
                                // }
                                // try {
                                //     await resolveSender({
                                //         urls: ['https://biz2.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=changeCoExistenceCurrentAccount&changeCurrentAccount=yes&selectedAccount=' + param.bankParams],
                                //         method: "POST",
                                //         body: JSON.stringify({}),
                                //         headers: null,
                                //     });
                                // } catch (e) {
                                //     console.log(e)
                                //
                                // }
                                const grUrlsTransfers = grTransfer.map((item) => item.DepositeTransferData);
                                let getTransfers;
                                try {
                                    getTransfers = await resolveSender({
                                        urls: grUrlsTransfers,
                                        method: "GET",
                                        body: null,
                                        headers: null,
                                    });
                                } catch (e) {
                                    console.log(e)
                                }
                                if (getTransfers.response && getTransfers.response.length) {
                                    for (const [ind, val] of getTransfers.response.entries()) {
                                        const data = val.response;
                                        if (data && data.beneficiariesList && data.beneficiariesList.length) {
                                            transactionsArr[grTransfer[ind].idx].DepositeTransferData = [];
                                            data.beneficiariesList.forEach((beneficiaryItem) => {
                                                transactionsArr[grTransfer[ind].idx].DepositeTransferData.push({
                                                    "DepositeTransferDate": transactionsArr[grTransfer[ind].idx].ValueDate,
                                                    "TransferTotal": beneficiaryItem.deliveryAmount,
                                                    "BankTransferNumber": beneficiaryItem.creditedBankNumber,
                                                    "BranchTransferNumber": beneficiaryItem.creditedBranchNumber,
                                                    "AccountTransferNumber": beneficiaryItem.creditedAccountNumber,
                                                    "NamePayerTransfer": beneficiaryItem.beneficiaryName,
                                                    "DetailsTransfer": beneficiaryItem.bankName
                                                });
                                            })
                                        } else {
                                            transactionsArr[grTransfer[ind].idx].DepositeTransferData = null;
                                        }


                                        // const dwrxFetch = /var\s*dwxVar\s*=\s*"(\d+)"/.exec(val.response);
                                        // const qwrtFetch = /var\s*qwrtVar\s*=\s*"(\d+)"/.exec(val.response);
                                        //
                                        // if (dwrxFetch !== null && qwrtFetch !== null) {
                                        //     const getTransfer = await resolveSender({
                                        //         urls: ['https://biz2.bankhapoalim.co.il/cgi-bin/poalwwwc?ctfw=init&reqName=action&language=HE&transactionId=GroupedTransfersDetails&subMenuName=Shekel'
                                        //         + '&ts=' + qwrtFetch[1] + '&tf=' + Math.random() + '&usm=&u=i'
                                        //         + '&sum=' + grTransfer[ind].TransTotal + '&date=' + grTransfer[ind].ValueDate.substring(0, 5)
                                        //         + '&pSubMenu=null&fromSubMenu=Shekel&bxx=912&nsv=y'
                                        //         + '&dwx=' + dwrxFetch[1]
                                        //         + '&wScr=1920&hScr=1080&menuTranName=GroupedTransfersDetails$23sum$3D'
                                        //         + transactionsArr[grTransfer[ind].idx].TransTotal + '$26date$3D' + transactionsArr[grTransfer[ind].idx].ValueDate.substring(0, 2) + '$2F' + transactionsArr[grTransfer[ind].idx].ValueDate.substring(3, 5)],
                                        //         method: "GET",
                                        //         body: null,
                                        //         headers: null,
                                        //         encode: true
                                        //     });
                                        //     const $$ = all.banks.core.services.parseHtml(getTransfer.response[0].response);
                                        //     const rows = $$.find('#mytable_body > tbody > tr[bgcolor]');
                                        //     transactionsArr[grTransfer[ind].idx].DepositeTransferData = rows.map(function (idx, el) {
                                        //         const tds = $(el).find("td");
                                        //         if (tds.length > 3) {
                                        //             return {
                                        //                 "DepositeTransferDate": transactionsArr[grTransfer[ind].idx].ValueDate,
                                        //                 "TransferTotal": tds.eq(0).text().replace(/[^\d\.-]/g, ""),
                                        //                 "BankTransferNumber": tds.eq(4).text().replace(/\D/g, ""),
                                        //                 "BranchTransferNumber": tds.eq(3).text().replace(/\D/g, ""),
                                        //                 "AccountTransferNumber": tds.eq(2).text().replace(/\D/g, ""),
                                        //                 "NamePayerTransfer": tds.eq(1).text().split("").reverse().join(""),
                                        //                 "DetailsTransfer": null
                                        //             };
                                        //         } else {
                                        //             return {
                                        //                 "DepositeTransferDate": transactionsArr[grTransfer[ind].idx].ValueDate,
                                        //                 "TransferTotal": tds.eq(2).text().replace(/[^\d\.-]/g, ""),
                                        //                 "BankTransferNumber": null,
                                        //                 "BranchTransferNumber": null,
                                        //                 "AccountTransferNumber": null,
                                        //                 "NamePayerTransfer": null,
                                        //                 "DetailsTransfer": null
                                        //             };
                                        //         }
                                        //     }).get();
                                        // } else {
                                        //     transactionsArr[grTransfer[ind].idx].DepositeTransferData = null
                                        // }
                                    }
                                } else {
                                    for (const val of getTransfers) {
                                        transactionsArr[val.idx].DepositeTransferData = null
                                    }
                                }
                            }

                            if (transactionsArr.length) {
                                account.DataRow = transactionsArr;
                            }
                        }

                        console.log('Last step ------ found ' + account.DataRow.length + ' transactionsArr of Index account: ' + param.idx);
                        resolve(account);
                    } catch (e) {
                        console.log(e);

                    } finally {

                    }
                })
            };

            function resolveSender(item) {
                monitorActivityClass.setIntervalActivity();
                return new Promise(resolve => {
                    const callWs = function () {
                        let params = Object.assign(item, {
                            cookies: document.cookie,
                            token: poalimAsakimNew.xsrfToken,
                            numberOfOperations: item.isChecks ? poalimAsakimNew.numberOfOperationsChecks : ((item.isCheck) ? 1 : poalimAsakimNew.numberOfOperations),
                        });
                        if (window.navigator.platform.indexOf('Win') === -1 && !window.all.banks.vpnConnected) {
                            params['proxy'] = ('http://brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '') + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225');
                        }
                        parallelReq(params, function (output) {
                            try {
                                const numOfLogsOut = output.response.filter(it => it.statusCode === 403);
                                // numForLogsOut += numOfLogsOut.length;
                                if (numOfLogsOut.length > 0) {
                                    // numForLogsOut = 0;
                                    all.banks.accounts.poalimAsakimNew.middleOfWork = true;
                                    all.banks.accounts.poalimAsakimNew.renewLogin().then(() => {
                                        if (output.response.some(item => item.headers && item.headers.location && ["getLogonPageIski", "Error", "exit.html"].some(urlPart => (item.headers.location).includes(urlPart)))) {
                                            let err = new Error("Redirected to perhaps because of another otp session started somewhere. Terminating with error.");
                                            if (item.headers.location === 'https://misc.poalim-site.co.il/Error_Pages/5/New/ErrorNew_5.html') {
                                                err = new Error("Redirected to " + item.headers.location + " perhaps because the bank announces that the service is temporarily unavailable.");
                                            }
                                            all.banks.core.services.errorLog(err);
                                            poalimAsakimNew.haltAndWaitForReload = true;

                                            myEmitterLogs('Send data osh');
                                            arrayCollectSave.forEach(it => {
                                                it.DataRow.forEach(child => {
                                                    child.imgs = null;
                                                    delete child.originalEventCreateDate;
                                                })
                                            })
                                            all.banks.core.services.sendOshServer({
                                                "ExporterId": all.banks.spiderConfig.spiderId,
                                                "BankData": [{
                                                    "TargetId": all.banks.spiderConfig.spiderId,
                                                    "Token": all.banks.generalVariables.branchNumber,
                                                    "BankNumber": all.banks.accountDetails.bank.BankNumber,
                                                    "ExtractDate": all.banks.accountDetails.bank.ExtractDate,
                                                    "Account": arrayCollectSave
                                                }]
                                            }).then(() => {
                                                myEmitterLogs('Sent data Successfully');
                                                poalimAsakimNew.logOutNew();
                                            })
                                            return;
                                        }
                                        if (output.response.some(item => item.error !== false)) {
                                            if (!poalimAsakimNew.loginRenewFun && !all.banks.accounts.poalimAsakimNew.middleOfWork) {
                                                poalimAsakimNew.loginRenewFun = true;

                                                poalimAsakimNew.loginRenewFun = false;
                                                setTimeout(() => {
                                                    callWs()
                                                }, 1000)
                                                // all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/ng-portals/biz/he/homepage", 'GET', null, false, false)
                                                //     .then(() => {
                                                //         resolveCookies().then(() => {
                                                //
                                                //         });
                                                //     }).fail(() => {
                                                //
                                                // })
                                            } else {
                                                resolve(output);
                                            }
                                        } else {
                                            resolve(output);
                                        }
                                    });
                                } else {
                                    if (output.response.some(item => item.headers && item.headers.location && ["getLogonPageIski", "Error", "exit.html"].some(urlPart => (item.headers.location).includes(urlPart)))) {
                                        let err = new Error("Redirected to perhaps because of another otp session started somewhere. Terminating with error.");
                                        if (item.headers.location === 'https://misc.poalim-site.co.il/Error_Pages/5/New/ErrorNew_5.html') {
                                            err = new Error("Redirected to " + item.headers.location + " perhaps because the bank announces that the service is temporarily unavailable.");
                                        }
                                        all.banks.core.services.errorLog(err);
                                        poalimAsakimNew.haltAndWaitForReload = true;

                                        myEmitterLogs('Send data osh');
                                        arrayCollectSave.forEach(it => {
                                            it.DataRow.forEach(child => {
                                                child.imgs = null;
                                                delete child.originalEventCreateDate;
                                            })
                                        })
                                        all.banks.core.services.sendOshServer({
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            "BankData": [{
                                                "TargetId": all.banks.spiderConfig.spiderId,
                                                "Token": all.banks.generalVariables.branchNumber,
                                                "BankNumber": all.banks.accountDetails.bank.BankNumber,
                                                "ExtractDate": all.banks.accountDetails.bank.ExtractDate,
                                                "Account": arrayCollectSave
                                            }]
                                        }).then(() => {
                                            myEmitterLogs('Sent data Successfully');
                                            poalimAsakimNew.logOutNew();
                                        })
                                        return;
                                    }
                                    if (output.response.some(item => item.error !== false)) {
                                        if (!poalimAsakimNew.loginRenewFun && !all.banks.accounts.poalimAsakimNew.middleOfWork) {
                                            poalimAsakimNew.loginRenewFun = true;
                                            poalimAsakimNew.loginRenewFun = false;
                                            setTimeout(() => {
                                                callWs()
                                            }, 1000)
                                            // all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/ng-portals/biz/he/homepage", 'GET', null, false, false)
                                            //     .then(() => {
                                            //         resolveCookies().then(() => {
                                            //
                                            //         });
                                            //     }).fail(() => {
                                            //
                                            // })
                                        } else {
                                            resolve(output);
                                        }
                                    } else {
                                        resolve(output);
                                    }
                                }
                            } catch (e) {
                                console.log(e);
                            } finally {

                            }
                        })
                    }
                    callWs()
                });
            }

            function resolveCookies() {
                return new Promise(resolve => {
                    win.cookies.getAll({}, function (cool) {
                        cool.forEach(function (v) {
                            if (!v.domain.includes('bizibox')) {
                                document.cookie = v.name + "=" + v.value + ";";
                            }
                        })
                        resolve(true);
                    });
                });
            }

            function getTransactions(url) {
                return new Promise(async resolve => {
                    const headers = {
                        'Content-Type': "application/json;charset=UTF-8",
                        'Origin': 'https://biz2.bankhapoalim.co.il',
                        'pageUuid': '/current-account/transactions',
                    }
                    if (poalimAsakimNew.xsrfToken) {
                        headers['X-XSRF-TOKEN'] = poalimAsakimNew.xsrfToken
                    }
                    if (lastResult !== null && poalimAsakimNew.last_data_headerVal) {
                        headers['data-header'] = poalimAsakimNew.last_data_headerVal
                    }
                    if (lastResult !== null && poalimAsakimNew.integrity_header) {
                        headers['integrity-header'] = poalimAsakimNew.integrity_header
                    }
                    const getTransactions = await resolveSender({
                        urls: [url],
                        method: "POST",
                        body: JSON.stringify([]),
                        headers: headers,
                    });
                    if (getTransactions.response[0].response) {
                        const last_data_headerVal = getTransactions.response[0].headers["data-header"];
                        allRowsFtched = !last_data_headerVal;
                        if (!allRowsFtched) {
                            poalimAsakimNew.last_data_headerVal = last_data_headerVal;
                            poalimAsakimNew.integrity_header = getTransactions.response[0].headers["integrity-header"];
                        }
                        resolve(getTransactions.response[0].response);
                    } else {
                        resolve([]);
                    }
                });
            }


            function processTransactions(transactions, checks, bankParams, eventsStatusDataList) {
                return new Promise(resolve => {
                    try {
                        const transactionsArr = [];
                        for (const val of transactions.transactions) {
                            let transactionTypes, isDaily;
                            if (val.eventActivityTypeCode === 1) {
                                transactionTypes = '1';
                            } else if (val.eventActivityTypeCode === 2) {
                                transactionTypes = '0';
                            }
                            if (val.transactionType === 'REGULAR') {
                                isDaily = '0';
                            } else {
                                isDaily = '1';
                            }
                            const activityDescription = val.activityDescription;
                            const hasCheckActivityType = val.details !== null
                                && (val.activityTypeCode == 493 || val.activityTypeCode == 143 || val.activityTypeCode == 183
                                    || val.activityTypeCode == 272 || val.activityTypeCode == 205 || val.activityTypeCode == 418
                                    || val.activityTypeCode == 191 || val.activityTypeCode == 485
                                    || val.activityTypeCode == 140 || val.activityTypeCode == 396);
                            const hasHaavaraActivityType = val.beneficiaryDetailsData !== null && !hasCheckActivityType
                                && (val.activityTypeCode !== 473);
                            // commented as part of https://bizibox.atlassian.net/browse/SPI-1703
                            //  && activityDescription !== "הפ'.תיק ממסרים";
                            const hasHaavaraChainType = val.activityTypeCode === 485 && val.internalLinkCode === 13;
                            if (checks > 0 && hasCheckActivityType) {
                                transactionsArr.push({
                                    "Asmachta": poalimAsakimNew.retrieveAsmachta(val),
                                    "TransDesc": activityDescription + (val.comment ? (' ' + val.comment) : ''),
                                    "ValueDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(val.eventDate)),
                                    "TransactionType": transactionTypes,
                                    "TransTotal": val.eventAmount,
                                    "Balance": val.currentBalance,
                                    "IsDaily": isDaily,
                                    "imgs": "https://biz2.bankhapoalim.co.il" + val.details + "&accountId=" + bankParams,
                                    "originalEventCreateDate": val.originalEventCreateDate,
                                });
                            } else {
                                const trans = {
                                    "Asmachta": poalimAsakimNew.retrieveAsmachta(val),
                                    "TransDesc": activityDescription + (val.comment ? (' ' + val.comment) : ''),
                                    "ValueDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(val.eventDate)),
                                    "TransactionType": transactionTypes,
                                    "TransTotal": val.eventAmount,
                                    "Balance": val.currentBalance,
                                    "IsDaily": isDaily,
                                    "imgs": null
                                };
                                if (hasHaavaraActivityType) {
                                    const dtd = {
                                        "DepositeTransferDate": trans.ValueDate,
                                        "TransferTotal": trans.TransTotal,
                                        "BankTransferNumber": null,
                                        "BranchTransferNumber": null,
                                        "AccountTransferNumber": null,
                                        "NamePayerTransfer": ["partyHeadline", "partyName"]
                                            .filter(fldName => val.beneficiaryDetailsData[fldName] !== null)
                                            .map(fldName => val.beneficiaryDetailsData[fldName])
                                            .join(' '),
                                        "DetailsTransfer": ["messageHeadline", "messageDetail"]
                                            .filter(fldName => val.beneficiaryDetailsData[fldName] !== null)
                                            .map(fldName => val.beneficiaryDetailsData[fldName])
                                            .join(' ')
                                    };
                                    trans.DepositeTransferData = [dtd];
                                    if (val.contraBankNumber > 0) {
                                        dtd.BankTransferNumber = val.contraBankNumber === 912 ? 12 : val.contraBankNumber;
                                        dtd.BranchTransferNumber = val.contraBranchNumber;
                                        dtd.AccountTransferNumber = val.contraAccountNumber;
                                    } else {
                                        var accBrchBnkRslt = /(\d{1,3})\D+(\d{1,3})\D+(\d{6,})/g.exec(dtd['DetailsTransfer']);
                                        if (accBrchBnkRslt !== null) {
                                            dtd.BankTransferNumber = accBrchBnkRslt[1];
                                            dtd.BranchTransferNumber = accBrchBnkRslt[2];
                                            dtd.AccountTransferNumber = accBrchBnkRslt[3];
                                        } else if (activityDescription === "הפ'.תיק ממסרים") { // added as part of https://bizibox.atlassian.net/browse/SPI-1703
                                            [dtd.BankTransferNumber, dtd.BranchTransferNumber, dtd.AccountTransferNumber] = bankParams.split('-');
                                        }
                                    }
                                    transactionsArr.push(trans);
                                } else if (hasHaavaraChainType) {
                                    if (eventsStatusDataList) {
                                        const foundHaavara = eventsStatusDataList.find(it => (val.eventAmount === it.eventAmount && val.eventDate === it.eventCreateDate));
                                        if (foundHaavara) {
                                            trans.DepositeTransferData = "https://biz2.bankhapoalim.co.il/ServerServices/current-account/transfers/collections/signatures"
                                                + "?accountId=" + bankParams
                                                + "&offset=0&limit=500&eventId=" + foundHaavara.eventId + "&actionCode=0&processId=0&messageSwitch=0&lang=he";
                                        }

                                    }
                                    transactionsArr.push(trans);
                                } else {
                                    transactionsArr.push(trans);
                                }
                            }
                        }
                        resolve(transactionsArr);
                    } catch (e) {
                        console.log(e)

                    }
                });
            }

            function timeoutSpace() {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(true);
                    }, 1500);
                });
            }

            async function parallel() {
                async function parallelSlices(idxArr) {
                    console.log(('תחילת ריצת '
                        +
                        poalimAsakimNew.numberOfOperations
                        +
                        ' חשבונות נוספים, אינדקס מספר: '
                        +
                        idxArr));
                    const slicePos = (poalimAsakimNew.numberOfOperations * idxArr);
                    const argsCopy = [].concat(listOfArguments.slice((slicePos), (slicePos + poalimAsakimNew.numberOfOperations)).map((val, ind) => ({
                        val,
                        ind
                    })));
                    const result = new Array(listOfArguments.slice((slicePos), (slicePos + poalimAsakimNew.numberOfOperations)).length);
                    const promises = new Array(poalimAsakimNew.numberOfOperations).fill(Promise.resolve()); //set how many items will run parallel together

                    function chainNext(p) {
                        if (argsCopy.length) {
                            const arg = argsCopy.shift();
                            return p.then(() => {
                                const operationPromise = asyncOperation(arg.val).then(r => {
                                    console.log('סיום ריצת חשבון-----' + arg.ind, r);
                                    arrayCollectSave.push(r);
                                    result[arg.ind] = r;
                                });
                                return chainNext(operationPromise);
                            });
                        }
                        return p;
                    }

                    await Promise.all(promises.map(chainNext));
                    console.log(('סיום ריצת '
                        +
                        poalimAsakimNew.numberOfOperations
                        +
                        ' חשבונות נוספים, אינדקס מספר: '
                        +
                        idxArr), result);

                    return result;
                }

                let resultArray = [];
                let resultCurrentArray = [];
                let xToRun = 0;
                for (let idx = 0; idx < listOfArgumentsSlice; idx++) {
                    const result = await parallelSlices(idx);
                    resultArray = resultArray.concat(result);
                    resultCurrentArray = resultCurrentArray.concat(result);
                    xToRun += Number(poalimAsakimNew.numberOfOperations);
                    if (Number(poalimAsakimNew.numberOfOperations) >= Number(poalimAsakimNew.numOfAccForRenewLoginOsh)) {
                        const resultCopy = JSON.parse(JSON.stringify(resultCurrentArray))
                        resultCopy.forEach(it => {
                            it.DataRow.forEach(child => {
                                child.imgs = null;
                                delete child.originalEventCreateDate;
                            })
                        })
                        try {
                            myEmitterLogs('Send data osh of slice : ' + idx);
                            await all.banks.core.services.sendOshServer({
                                "ExporterId": all.banks.spiderConfig.spiderId,
                                "BankData": [{
                                    "TargetId": all.banks.spiderConfig.spiderId,
                                    "Token": all.banks.generalVariables.branchNumber,
                                    "BankNumber": all.banks.accountDetails.bank.BankNumber,
                                    "ExtractDate": all.banks.accountDetails.bank.ExtractDate,
                                    "Account": resultCopy
                                }]
                            })
                            myEmitterLogs('Sent data Successfully of slice: ' + idx);
                        } catch (error) {
                            myEmitterLogs('Sent data Failed of slice: ' + idx);
                        }

                        xToRun = 0;
                        resultCurrentArray = [];
                        await all.banks.accounts.poalimAsakimNew.renewLogin();
                    } else if (idx !== 0 && xToRun >= Number(poalimAsakimNew.numOfAccForRenewLoginOsh)) {
                        const resultCopy = JSON.parse(JSON.stringify(resultCurrentArray))
                        resultCopy.forEach(it => {
                            it.DataRow.forEach(child => {
                                child.imgs = null;
                                delete child.originalEventCreateDate;
                            })
                        })
                        try {
                            myEmitterLogs('Send data osh of slice : ' + idx);
                            await all.banks.core.services.sendOshServer({
                                "ExporterId": all.banks.spiderConfig.spiderId,
                                "BankData": [{
                                    "TargetId": all.banks.spiderConfig.spiderId,
                                    "Token": all.banks.generalVariables.branchNumber,
                                    "BankNumber": all.banks.accountDetails.bank.BankNumber,
                                    "ExtractDate": all.banks.accountDetails.bank.ExtractDate,
                                    "Account": resultCopy
                                }]
                            })
                            myEmitterLogs('Sent data Successfully of slice: ' + idx);
                        } catch (error) {
                            myEmitterLogs('Sent data Failed of slice: ' + idx);
                        }
                        xToRun = 0;
                        resultCurrentArray = [];
                        await all.banks.accounts.poalimAsakimNew.renewLogin();
                    }
                    await timeoutSpace();
                }
                return resultArray;
            }


            // const asyncOperationAccWithChecks = (result, idx) => {
            // 	return new Promise(async resolve => {
            // 		monitorActivityClass.setIntervalActivity();
            // 		const bankParams = result.BankNumber + '-' + result.BranchNumber + '-' + result.AccountNumber;
            // 		myEmitterLogs('Running on ' + bankParams + ' which index: ' + idx);
            // 		let grUrlsChecks = [];
            // 		const urls = result.DataRow.filter((item, index) => {
            // 			if (item.imgs && item.imgs.includes('https://biz2.bankhapoalim.co.il')) {
            // 				item.idx = index;
            // 				item.accIdx = idx;
            // 				item.bankParams = result.BankNumber + '' + result.BranchNumber + '' + result.AccountNumber;
            // 				return item
            // 			}
            // 		});
            // 		if (urls.length) {
            // 			grUrlsChecks = grUrlsChecks.concat(urls)
            // 		}
            // 		myEmitterLogs('Found ' + grUrlsChecks.length + ' groups of checks of ' + bankParams + ' which index: ' + idx);
            // 		if (grUrlsChecks.length) {
            // 			myEmitterLogs('Starts to pull ' + grUrlsChecks.length + ' groups of checks of ' + bankParams + ' which index: ' + idx);
            // 			const getChecks = await resolveSender({
            // 				urls: grUrlsChecks,
            // 				isCheck: true,
            // 				method: "GET",
            // 				body: null,
            // 				headers: null,
            // 			});
            // 			myEmitterLogs('Finished to pull ' + grUrlsChecks.length + ' groups of checks of ' + bankParams + ' which index: ' + idx);
            // 			console.log('getChecks', getChecks);
            // 			let groupChecks = [];
            // 			getChecks.response.forEach((it) => {
            // 				if (Array.isArray(it.response)) {
            // 					groupChecks = groupChecks.concat(it.response.filter((item) => item.urlCheck))
            // 				}
            // 			});
            // 			myEmitterLogs('Found ' + groupChecks.length + ' Checks in ' + bankParams + ' which index: ' + idx);
            // 			if (groupChecks.length) {
            // 				myEmitterLogs('Start to pull ' + groupChecks.length + ' Checks multiple ' + poalimAsakimNew.numberOfOperationsChecks + ' checks each time parallel of ' + bankParams + ' account which index: ' + idx);
            //
            // 				const groupChecksImg = await resolveSender({
            // 					urls: groupChecks,
            // 					method: "GET",
            // 					body: null,
            // 					headers: null,
            // 					isChecks: true,
            // 				});
            // 				const groupChecksData = groupChecksImg.response.map((it) => it.response);
            // 				myEmitterLogs('Got ' + groupChecksImg.length + 'Checks of ' + bankParams + ' which index: ' + idx);
            //
            // 				const startedChecks = Date.now();
            // 				const numberOfOperationsChecks = groupChecksData.length;
            // 				const listOfArgumentsChecks = groupChecksData;
            // 				const asyncOperationChecks = url => {
            // 					return new Promise(async resolve => {
            // 						const resCheck = await poalimAsakimNew.getImageAndSend(url.urlCheck, url.ImageNameKey);
            // 						resolve(Object.assign(url, {
            // 							formData: resCheck,
            // 						}));
            // 					})
            // 				};
            //
            // 				async function parallelChecks() {
            // 					const argsCopy = [].concat(listOfArgumentsChecks.map((val, ind) => ({val, ind})));
            // 					const result = new Array(listOfArgumentsChecks.length);
            // 					const promises = new Array(numberOfOperationsChecks).fill(Promise.resolve());
            //
            // 					function chainNext(p) {
            // 						if (argsCopy.length) {
            // 							const arg = argsCopy.shift();
            // 							return p.then(() => {
            // 								const operationPromise = asyncOperationChecks(arg.val).then(r => {
            // 									result[arg.ind] = r;
            // 								});
            // 								return chainNext(operationPromise);
            // 							});
            // 						}
            // 						return p;
            // 					}
            //
            // 					await Promise.all(promises.map(chainNext));
            // 					return result;
            // 				}
            //
            // 				myEmitterLogs('Start merge between two part of checks from ' + groupChecksImg.length + ' Checks of ' + bankParams + ' which index: ' + idx);
            // 				const response = await parallelChecks();
            //
            // 				myEmitterLogs('Finished merge between two part of checks from ' + groupChecksImg.length + ' Checks of ' + bankParams + ' which index: ' + idx);
            // 				const elapsedChecks = Date.now() - startedChecks;
            //
            // 				myEmitterLogs('Total checks of ' + bankParams + ' which index: ' + idx + ' is: ' + response.length + ' checks');
            // 				console.log('parallelChecks length before filter', response.length);
            // 				const dataToSend = response.filter((it) => {
            // 					if (!it.formData) {
            // 						it["ImageNameKey"] = "x";
            // 					}
            // 					return it.formData;
            // 				});
            // 				console.log('parallelChecks length before filter formData ', dataToSend.length);
            // 				myEmitterLogs('Total checks with images Successfully of ' + bankParams + ' which index: ' + idx + ' is: ' + dataToSend.length + 'checks');
            //
            // 				myEmitterLogs('Send all ' + dataToSend.length + ' checks with images Successfully of ' + bankParams + ' which index: ' + idx);
            // 				const params = Object.assign({
            // 					urls: dataToSend,
            // 					method: "POST",
            // 					body: null,
            // 					sendToBizibox: all.banks.spiderConfig.sendToServer + "/dataload/cheques/images",
            // 					headers: {
            // 						'Authorization': all.banks.core.services.make_base_auth(all.banks.config.user, all.banks.config.pass),
            // 						'HTML_LOGIN': true
            // 					},
            // 					cookies: document.cookie,
            // 					numberOfOperations: dataToSend.length,
            // 				});
            //
            // 				const output = await new Promise(resolve => {
            // 					parallelReq(params, function (output) {
            // 						resolve(output);
            // 					})
            // 				});
            // 				myEmitterLogs('Finished to sent all ' + dataToSend.length + ' checks with images Successfully of ' + bankParams + ' which index: ' + idx);
            //
            // 				const outputArr = output.response.map((it) => it.response);
            // 				outputArr.forEach((it, idx) => {
            // 					const itOld = JSON.parse(JSON.stringify(it));
            // 					delete all.banks.generalVariables.allDataArr.BankData[0].Account[it.accIdx].DataRow[it.idx].bankParams;
            // 					delete all.banks.generalVariables.allDataArr.BankData[0].Account[it.accIdx].DataRow[it.idx].originalEventCreateDate;
            // 					delete it.urlCheck;
            // 					delete it.accIdx;
            // 					delete it.idx;
            // 					delete it.body;
            // 					delete it.formData;
            // 					if (output.response[idx].statusCode !== 200) {
            // 						it.ImageNameKey = "x"
            // 					}
            // 					if (Array.isArray(all.banks.generalVariables.allDataArr.BankData[0].Account[itOld.accIdx].DataRow[itOld.idx].imgs)) {
            // 						all.banks.generalVariables.allDataArr.BankData[0].Account[itOld.accIdx].DataRow[itOld.idx].imgs.push(it)
            // 					} else {
            // 						all.banks.generalVariables.allDataArr.BankData[0].Account[itOld.accIdx].DataRow[itOld.idx].imgs = [it]
            // 					}
            // 				});
            // 				grUrlsChecks.forEach((it, idx) => {
            // 					if (all.banks.generalVariables.allDataArr.BankData[0].Account[it.accIdx].DataRow[it.idx].imgs) {
            // 						const itOld = JSON.parse(JSON.stringify(it));
            // 						if ((typeof (all.banks.generalVariables.allDataArr.BankData[0].Account[it.accIdx].DataRow[it.idx].imgs) === 'string') &&
            // 							all.banks.generalVariables.allDataArr.BankData[0].Account[it.accIdx].DataRow[it.idx].imgs.includes('https://biz2.bankhapoalim.co.il')) {
            // 							all.banks.generalVariables.allDataArr.BankData[0].Account[it.accIdx].DataRow[it.idx].imgs = [{
            // 								"ImageNameKey": "x"
            // 							}];
            // 							delete all.banks.generalVariables.allDataArr.BankData[0].Account[it.accIdx].DataRow[it.idx].bankParams;
            // 							delete all.banks.generalVariables.allDataArr.BankData[0].Account[it.accIdx].DataRow[it.idx].originalEventCreateDate;
            // 						}
            // 						delete all.banks.generalVariables.allDataArr.BankData[0].Account[itOld.accIdx].DataRow[itOld.idx].accIdx;
            // 						delete all.banks.generalVariables.allDataArr.BankData[0].Account[itOld.accIdx].DataRow[itOld.idx].idx;
            // 					}
            // 				});
            //
            // 				if (result.DataRow.length) {
            // 					result.DataRow.forEach((it) => {
            // 						if (it.idx) {
            // 							delete it.idx;
            // 						}
            // 					});
            // 				}
            // 				console.log(result);
            // 				myEmitterLogs('Send data includes checks uuid to server of ' + bankParams + ' which index: ' + idx);
            // 				try {
            // 					await all.banks.core.services.sendOsh({
            // 						"ExporterId": all.banks.spiderConfig.spiderId,
            // 						"BankData": [{
            // 							"TargetId": all.banks.spiderConfig.spiderId,
            // 							"Token": all.banks.generalVariables.branchNumber,
            // 							"BankNumber": all.banks.accountDetails.bank.BankNumber,
            // 							"ExtractDate": all.banks.accountDetails.bank.ExtractDate,
            // 							"Account": [result]
            // 						}]
            // 					})
            // 					myEmitterLogs('Sent data Successfully of ' + bankParams + ' which index: ' + idx);
            // 				} catch (error) {
            // 					myEmitterLogs('Sent data Failed of ' + bankParams + ' which index: ' + idx);
            // 				}
            // 			}
            // 		}
            // 		resolve(true);
            // 	})
            // };

            function uploadImgToAWS(url, file) {
                return new Promise(async resolve => {
                    all.banks.core.services.httpReq(url, 'PUT', file, false, false, true, {
                        'Content-Type': 'image/jpeg'
                    }, false, true)
                        .then(function () {
                            resolve(true)
                        })
                        .fail(function () {
                            resolve(false)
                        });
                });
            }

            async function getGroupChecksImg(groupChecks, bankParams, idx, grUrlsChecks, result) {
                return new Promise(async resolve => {
                    const groupChecksImg = await resolveSender({
                        urls: groupChecks,
                        method: "GET",
                        body: null,
                        headers: null,
                        isChecks: true,
                    });
                    const groupChecksData = groupChecksImg.response.map((it) => it.response);
                    myEmitterLogs('Got ' + groupChecksData.length + ' Checks of ' + bankParams + ' which index: ' + idx);

                    const startedChecks = Date.now();
                    const numberOfOperationsChecks = groupChecksData.length;
                    const listOfArgumentsChecks = groupChecksData;
                    const asyncOperationChecks = url => {
                        return new Promise(async resolve => {
                            const resCheck = await poalimAsakimNew.getImageAndSend(url.urlCheck, url.ImageNameKey);
                            resolve(Object.assign(url, {
                                formData: resCheck,
                            }));
                        })
                    };

                    async function parallelChecks() {
                        const argsCopy = [].concat(listOfArgumentsChecks.map((val, ind) => ({val, ind})));
                        const result = new Array(listOfArgumentsChecks.length);
                        const promises = new Array(numberOfOperationsChecks).fill(Promise.resolve());

                        function chainNext(p) {
                            if (argsCopy.length) {
                                const arg = argsCopy.shift();
                                return p.then(() => {
                                    const operationPromise = asyncOperationChecks(arg.val).then(r => {
                                        result[arg.ind] = r;
                                    });
                                    return chainNext(operationPromise);
                                });
                            }
                            return p;
                        }

                        await Promise.all(promises.map(chainNext));
                        return result;
                    }

                    myEmitterLogs('Start merge between two part of checks from ' + groupChecksImg.length + ' Checks of ' + bankParams + ' which index: ' + idx);
                    const response = await parallelChecks();

                    myEmitterLogs('Finished merge between two part of checks from ' + groupChecksImg.length + ' Checks of ' + bankParams + ' which index: ' + idx);
                    const elapsedChecks = Date.now() - startedChecks;

                    myEmitterLogs('Total checks of ' + bankParams + ' which index: ' + idx + ' is: ' + response.length + ' checks');
                    console.log('parallelChecks length before filter', response.length);
                    const dataToSend = response.filter((it) => {
                        if (!it.formData) {
                            it["ImageNameKey"] = "x";
                        }
                        return (all.banks.accounts.IND_CHECKS_TO_S3 === 1) ? it : it.formData;
                    });
                    if (all.banks.accounts.IND_CHECKS_TO_S3 === 1) {
                        try {
                            for (let idx111 = 0; idx111 < dataToSend.length; idx111++) {
                                let text = dataToSend[idx111].formData[dataToSend[idx111].formData.name];
                                if (!text.includes('data:image/')) {
                                    text = "data:image/jpeg;base64," + text;
                                }
                                const response = await fetch(text);
                                const blob = await response.blob();
                                const file = new File([blob], dataToSend[idx111].formData.name, {
                                    type: 'image/jpeg',
                                    lastModified: new Date().getTime()
                                });
                                file['src'] = URL.createObjectURL(file);
                                const response1 = await fetch(file['src']);
                                const blob2 = await response1.arrayBuffer();
                                const fileBuffer = Buffer.from(blob2, "base64")
                                dataToSend[idx111]['fileBuffer'] = fileBuffer;
                                // const arrayBuffer = await file.arrayBuffer();
                                // const blob_new = new Blob([new Uint8Array(arrayBuffer)], {type: file.type });
                                // console.log(blob_new);
                                dataToSend[idx111]['formData'] = file;
                            }
                        } catch (e) {
                        }
                    }

                    console.log('parallelChecks length before filter formData ', dataToSend.length);
                    myEmitterLogs('Total checks with images Successfully of ' + bankParams + ' which index: ' + idx + ' is: ' + dataToSend.length + 'checks');
                    myEmitterLogs('Send all ' + dataToSend.length + ' checks with images Successfully of ' + bankParams + ' which index: ' + idx);
                    const getTokenAWS = all.banks.core.services.getTokenAWS();
                    // const token = all.banks.core.services.getToken();
                    // const get_cookies = await win.cookies.getAll({});
                    // let cook = '';
                    // get_cookies.forEach(it=>{
                    //     if(it.domain.includes('bizibox')){
                    //         cook += it.name + '=' +  it.value + ';';
                    //     }
                    // })
                    const params = Object.assign({
                        urls: dataToSend,
                        data: {
                            BankNumber: result.BankNumber,
                            BranchNumber: result.BranchNumber,
                            AccountNumber: result.AccountNumber
                        },
                        method: "POST",
                        body: null,
                        sendToAnotherServers: all.banks.accounts.IND_CHECKS_TO_S3 === 1,
                        sendToBizibox: all.banks.accounts.IND_CHECKS_TO_S3 === 1 ? 'https://' + all.banks.spiderConfig.sendToServerAWS + '/rest/api/v1/dataload/upload-check-images' : all.banks.spiderConfig.sendToServer + "/dataload/cheques/images",
                        headers: all.banks.accounts.IND_CHECKS_TO_S3 === 1 ? {
                            'Authorization': getTokenAWS,
                        } : {
                            'Authorization': all.banks.core.services.make_base_auth(all.banks.config.user, all.banks.config.pass),
                            'HTML_LOGIN': true
                        },
                        cookies: document.cookie, //cook,
                        numberOfOperations: dataToSend.length
                    });

                    const output = await new Promise(resolve => {
                        parallelReq(params, async function (outpu) {
                            if (all.banks.accounts.IND_CHECKS_TO_S3 === 1) {
                                const statusCode = outpu.response[0].statusCode;
                                if (statusCode !== 200) {
                                    resolve(outpu);
                                    // const params1 = Object.assign({
                                    //     urls: dataToSend,
                                    //     method: "POST",
                                    //     body: null,
                                    //     sendToAnotherServers: true,
                                    //     sendToBizibox: "https://api.bizibox.biz/rest/api/v1/dataload/upload-check-images",
                                    //     headers: {
                                    //         'Authorization': all.banks.core.services.make_base_auth(all.banks.config.user, all.banks.config.pass),
                                    //         'HTML_LOGIN': true
                                    //     },
                                    //     cookies: document.cookie,
                                    //     numberOfOperations: dataToSend.length,
                                    // });
                                    // parallelReq(params1, function (output) {
                                    //     const statusCode = output.response[0].statusCode;
                                    //     if (statusCode !== 200) {
                                    //         resolve(output);
                                    //     }else{
                                    //         const res = output.response[0].response;
                                    //         const params2 = Object.assign({
                                    //             urls: dataToSend,
                                    //             method: "POST",
                                    //             body: null,
                                    //             sendToBizibox: res,
                                    //             headers: {
                                    //                 'Authorization': all.banks.core.services.make_base_auth(all.banks.config.user, all.banks.config.pass),
                                    //                 'HTML_LOGIN': true
                                    //             },
                                    //             cookies: document.cookie,
                                    //             numberOfOperations: dataToSend.length,
                                    //         });
                                    //
                                    //         parallelReq(params2, function (output) {
                                    //             resolve(output);
                                    //         })
                                    //     }
                                    // })
                                } else {
                                    // const groupChecksURL = outpu.response.map((it) => it.response);
                                    // const resData =  {
                                    //     elapsed: 1.596,
                                    //     response: []
                                    // }
                                    // for (let inCh = 0; inCh < dataToSend.length; inCh++) {
                                    //     const status = await uploadImgToAWS(dataToSend[inCh]['body'], dataToSend[inCh]['formData']);
                                    //     resData.response.push({
                                    //         error: false,
                                    //         headers: null,
                                    //         response: dataToSend[inCh],
                                    //         statusCode: status ? 200 : 500
                                    //     })
                                    // }
                                    // resolve(resData);
                                    // const token = all.banks.core.services.getToken();
                                    // const get_cookies = await win.cookies.getAll({});
                                    // let cook = '';
                                    // get_cookies.forEach(it=>{
                                    //     if(it.domain.includes('bizibox')){
                                    //         cook += it.name + '=' +  it.value + ';';
                                    //     }
                                    // })
                                    const params1 = {
                                        urls: dataToSend,
                                        method: "PUT",
                                        sendToAnotherServers: true,
                                        body: true,
                                        sendToBizibox: true,
                                        headers: {
                                            'Authorization': all.banks.core.services.make_base_auth(all.banks.config.user, all.banks.config.pass),
                                            'Content-Type': 'image/jpeg'
                                        },
                                        cookies: document.cookie, //cook,
                                        numberOfOperations: dataToSend.length,
                                    };
                                    parallelReq(params1, function (outpu1) {
                                        resolve(outpu1);
                                    })
                                }

                            } else {
                                resolve(outpu);
                            }
                        })
                    });
                    myEmitterLogs('Finished to sent all ' + dataToSend.length + ' checks with images Successfully of ' + bankParams + ' which index: ' + idx);

                    const outputArr = output.response.map((it) => it.response);
                    console.log(outputArr)
                    // debugger
                    outputArr.forEach((it, idx) => {
                        const itOld = JSON.parse(JSON.stringify(it));
                        delete all.banks.generalVariables.allDataArr.BankData[0].Account[it.accIdx].DataRow[it.idx].bankParams;
                        delete all.banks.generalVariables.allDataArr.BankData[0].Account[it.accIdx].DataRow[it.idx].originalEventCreateDate;
                        delete it.urlCheck;
                        delete it.accIdx;
                        delete it.idx;
                        delete it.body;
                        delete it.formData;
                        if (it.body !== undefined) {
                            delete it.body;
                        }
                        if (it.fileBuffer !== undefined) {
                            delete it.fileBuffer;
                        }
                        if (output.response[idx].statusCode !== 200) {
                            it.ImageNameKey = "x"
                        }
                        if (Array.isArray(all.banks.generalVariables.allDataArr.BankData[0].Account[itOld.accIdx].DataRow[itOld.idx].imgs)) {
                            all.banks.generalVariables.allDataArr.BankData[0].Account[itOld.accIdx].DataRow[itOld.idx].imgs.push(it)
                        } else {
                            all.banks.generalVariables.allDataArr.BankData[0].Account[itOld.accIdx].DataRow[itOld.idx].imgs = [it]
                        }
                    });
                    grUrlsChecks.forEach((it, idx) => {
                        if (all.banks.generalVariables.allDataArr.BankData[0].Account[it.accIdx].DataRow[it.idx].imgs) {
                            const itOld = JSON.parse(JSON.stringify(it));
                            if ((typeof (all.banks.generalVariables.allDataArr.BankData[0].Account[it.accIdx].DataRow[it.idx].imgs) === 'string') &&
                                all.banks.generalVariables.allDataArr.BankData[0].Account[it.accIdx].DataRow[it.idx].imgs.includes('https://biz2.bankhapoalim.co.il')) {
                                all.banks.generalVariables.allDataArr.BankData[0].Account[it.accIdx].DataRow[it.idx].imgs = [{
                                    "ImageNameKey": "x"
                                }];
                                delete all.banks.generalVariables.allDataArr.BankData[0].Account[it.accIdx].DataRow[it.idx].bankParams;
                                delete all.banks.generalVariables.allDataArr.BankData[0].Account[it.accIdx].DataRow[it.idx].originalEventCreateDate;
                            }
                            delete all.banks.generalVariables.allDataArr.BankData[0].Account[itOld.accIdx].DataRow[itOld.idx].accIdx;
                            delete all.banks.generalVariables.allDataArr.BankData[0].Account[itOld.accIdx].DataRow[itOld.idx].idx;
                        }
                    });

                    if (result.DataRow.length) {
                        result.DataRow.forEach((it) => {
                            if (it.idx) {
                                delete it.idx;
                            }
                        });
                    }
                    console.log(result);
                    myEmitterLogs('Send data includes checks uuid to server of ' + bankParams + ' which index: ' + idx);
                    try {
                        await all.banks.core.services.sendOshServer({
                            "ExporterId": all.banks.spiderConfig.spiderId,
                            "BankData": [{
                                "TargetId": all.banks.spiderConfig.spiderId,
                                "Token": all.banks.generalVariables.branchNumber,
                                "BankNumber": all.banks.accountDetails.bank.BankNumber,
                                "ExtractDate": all.banks.accountDetails.bank.ExtractDate,
                                "Account": [result]
                            }]
                        })
                        all.banks.accounts.poalimAsakimNew.counterAccWithChecksSender += 1;
                        myEmitterLogs('Sent data Successfully of ' + bankParams + ' which index: ' + idx);
                    } catch (error) {
                        all.banks.accounts.poalimAsakimNew.counterAccWithChecksSender += 1;
                        myEmitterLogs('Sent data Failed of ' + bankParams + ' which index: ' + idx);
                    }

                    resolve(true)
                })
            }

            async function getChecks() {
                return new Promise(async resolve => {
                    myEmitterLogs('Start to get all the checks by each account');
                    console.log('Start to get all the checks by each account');

                    for (const [idx, result] of all.banks.generalVariables.allDataArr.BankData[0].Account.entries()) {
                        const bankParams = result.BankNumber + '-' + result.BranchNumber + '-' + result.AccountNumber;
                        myEmitterLogs('Running on ' + bankParams + ' which index: ' + idx);
                        console.log('Running on ' + bankParams + ' which index: ' + idx);

                        let grUrlsChecks = [];
                        const urls = result.DataRow.filter((item, index) => {
                            if (item.imgs && item.imgs.includes('https://biz2.bankhapoalim.co.il')) {
                                item.idx = index;
                                item.accIdx = idx;
                                item.bankParams = result.BankNumber + '' + result.BranchNumber + '' + result.AccountNumber;
                                return item
                            }
                        });
                        if (urls.length) {
                            grUrlsChecks = grUrlsChecks.concat(urls)
                        }
                        myEmitterLogs('Found ' + grUrlsChecks.length + ' groups of checks of ' + bankParams + ' which index: ' + idx);
                        console.log('Found ' + grUrlsChecks.length + ' groups of checks of ' + bankParams + ' which index: ' + idx);

                        if (grUrlsChecks.length) {
                            myEmitterLogs('Starts to pull ' + grUrlsChecks.length + ' groups of checks of ' + bankParams + ' which index: ' + idx);
                            console.log('Starts to pull ' + grUrlsChecks.length + ' groups of checks of ' + bankParams + ' which index: ' + idx);

                            const getChecks = await resolveSender({
                                urls: grUrlsChecks,
                                isCheck: true,
                                method: "GET",
                                body: null,
                                headers: null,
                            });
                            myEmitterLogs('Finished to pull ' + grUrlsChecks.length + ' groups of checks of ' + bankParams + ' which index: ' + idx);
                            console.log('Finished to pull ' + grUrlsChecks.length + ' groups of checks of ' + bankParams + ' which index: ' + idx);

                            console.log('getChecks', getChecks);
                            let groupChecks = [];
                            getChecks.response.forEach((it) => {
                                if (Array.isArray(it.response)) {
                                    groupChecks = groupChecks.concat(it.response.filter((item) => item.urlCheck))
                                }
                            });
                            myEmitterLogs('Found ' + groupChecks.length + ' Checks in ' + bankParams + ' which index: ' + idx);
                            console.log('Found ' + groupChecks.length + ' Checks in ' + bankParams + ' which index: ' + idx);

                            if (groupChecks.length) {
                                myEmitterLogs('Start to pull ' + groupChecks.length + ' Checks multiple ' + poalimAsakimNew.numberOfOperationsChecks + ' checks each time parallel of ' + bankParams + ' account which index: ' + idx);
                                console.log('Start to pull ' + groupChecks.length + ' Checks multiple ' + poalimAsakimNew.numberOfOperationsChecks + ' checks each time parallel of ' + bankParams + ' account which index: ' + idx);

                                if (idx !== 0 && Number.isInteger(idx / Number(poalimAsakimNew.numOfAccForRenewLogin))) {
                                    await getGroupChecksImg(groupChecks, bankParams, idx, grUrlsChecks, result);
                                } else {
                                    await getGroupChecksImg(groupChecks, bankParams, idx, grUrlsChecks, result);
                                }
                            } else {
                                if (result.DataRow.length) {
                                    result.DataRow.forEach((it) => {
                                        if (it.imgs && it.imgs.includes('https://biz2.bankhapoalim.co.il')) {
                                            delete it.idx;
                                            it.imgs = null;
                                        }
                                        if (it.bankParams) {
                                            delete it.bankParams;
                                        }
                                        if (it.originalEventCreateDate) {
                                            delete it.originalEventCreateDate;
                                        }
                                        if (it.urlCheck) {
                                            delete it.urlCheck;
                                        }
                                        if (it.accIdx) {
                                            delete it.accIdx;
                                        }
                                        if (it.body) {
                                            delete it.body;
                                        }
                                        if (it.formData) {
                                            delete it.formData;
                                        }
                                    });
                                }
                                try {
                                    await all.banks.core.services.sendOshServer({
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "BankData": [{
                                            "TargetId": all.banks.spiderConfig.spiderId,
                                            "Token": all.banks.generalVariables.branchNumber,
                                            "BankNumber": all.banks.accountDetails.bank.BankNumber,
                                            "ExtractDate": all.banks.accountDetails.bank.ExtractDate,
                                            "Account": [result]
                                        }]
                                    })
                                    all.banks.accounts.poalimAsakimNew.counterAccWithChecksSender += 1;
                                    myEmitterLogs('Sent data Successfully of ' + bankParams + ' which index: ' + idx);
                                    console.log('Sent data Successfully of ' + bankParams + ' which index: ' + idx);

                                } catch (error) {
                                    all.banks.accounts.poalimAsakimNew.counterAccWithChecksSender += 1;
                                    myEmitterLogs('Sent data Failed of ' + bankParams + ' which index: ' + idx);
                                    console.log('Sent data Failed of ' + bankParams + ' which index: ' + idx);
                                }
                            }
                        } else {
                            if (result.DataRow.length) {
                                result.DataRow.forEach((it) => {
                                    if (it.imgs && it.imgs.includes('https://biz2.bankhapoalim.co.il')) {
                                        delete it.idx;
                                        it.imgs = null;
                                    }
                                    if (it.idx) {
                                        delete it.idx;
                                    }
                                    if (it.bankParams) {
                                        delete it.bankParams;
                                    }
                                    if (it.originalEventCreateDate) {
                                        delete it.originalEventCreateDate;
                                    }
                                    if (it.urlCheck) {
                                        delete it.urlCheck;
                                    }
                                    if (it.accIdx) {
                                        delete it.accIdx;
                                    }
                                    if (it.body) {
                                        delete it.body;
                                    }
                                    if (it.formData) {
                                        delete it.formData;
                                    }
                                });
                            }
                            try {
                                await all.banks.core.services.sendOshServer({
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "BankData": [{
                                        "TargetId": all.banks.spiderConfig.spiderId,
                                        "Token": all.banks.generalVariables.branchNumber,
                                        "BankNumber": all.banks.accountDetails.bank.BankNumber,
                                        "ExtractDate": all.banks.accountDetails.bank.ExtractDate,
                                        "Account": [result]
                                    }]
                                })
                                all.banks.accounts.poalimAsakimNew.counterAccWithChecksSender += 1;
                                myEmitterLogs('Sent data Successfully of ' + bankParams + ' which index: ' + idx);
                                console.log('Sent data Successfully of ' + bankParams + ' which index: ' + idx);
                            } catch (error) {
                                all.banks.accounts.poalimAsakimNew.counterAccWithChecksSender += 1;
                                myEmitterLogs('Sent data Failed of ' + bankParams + ' which index: ' + idx);
                                console.log('Sent data Failed of ' + bankParams + ' which index: ' + idx);
                            }
                        }
                        if (idx !== 0 && Number.isInteger(idx / Number(poalimAsakimNew.numOfAccForRenewLogin))) {
                            myEmitterLogs('Renew login - ' + (idx + 1) + ' Accounts with checks already finished, left more ' + (all.banks.generalVariables.allDataArr.BankData[0].Account.length - (idx + 1)) + ' accounts for complete running');
                            console.log('Renew login - ' + (idx + 1) + ' Accounts with checks already finished, left more ' + (all.banks.generalVariables.allDataArr.BankData[0].Account.length - (idx + 1)) + ' accounts for complete running');
                            await all.banks.accounts.poalimAsakimNew.renewLogin();
                        }
                    }

                    const intervalSenders = setInterval(() => {
                        console.log('intervalSenders', all.banks.accounts.poalimAsakimNew.counterAccWithChecksSender, all.banks.generalVariables.allDataArr.BankData[0].Account.length);
                        if (all.banks.accounts.poalimAsakimNew.counterAccWithChecksSender === all.banks.generalVariables.allDataArr.BankData[0].Account.length) {
                            clearInterval(intervalSenders);
                            resolve(true)
                        }
                    }, 1000)

                })
            }

            async function parallelAccWithChecks() {
                const argsCopy = [].concat(all.banks.generalVariables.allDataArr.BankData[0].Account.map((val, ind) => ({
                    val,
                    ind
                })));
                const result = new Array(all.banks.generalVariables.allDataArr.BankData[0].Account.length);
                const promises = new Array(poalimAsakimNew.numberOfOperations).fill(Promise.resolve()); //set how many items will run parallel together

                function chainNext(p) {
                    if (argsCopy.length) {
                        const arg = argsCopy.shift();
                        return p.then(() => {
                            const operationPromise = asyncOperationAccWithChecks(arg.val, arg.ind).then(r => {
                                result[arg.ind] = r;
                            });
                            return chainNext(operationPromise);
                        });
                    }
                    return p;
                }

                await Promise.all(promises.map(chainNext));
                return result;
            }

            if (!ARR_TRANS_DAY_TO_RUN.length || (ARR_TRANS_DAY_TO_RUN.length === 1 && ARR_TRANS_DAY_TO_RUN[0].TRANS_DAY_TO_RUN === 0)) {
                all.banks.generalVariables.numChecksDrawn = 0;
                all.banks.generalVariables.numChecksNotWithdrawn = 0;
                poalimAsakimNew.loadAsharaiAll();
            } else {
                parallel().then(async (res) => {
                    const elapsed = Date.now() - started;
                    myEmitterLogs('Finished to collect all data Osh and Transfers of all ' + res.length + ' accounts at ' + (elapsed / 1000) + 'ms');
                    console.log('Finished to collect all data Osh and Transfers of all ' + res.length + ' accounts at ' + (elapsed / 1000) + 'ms');


                    myEmitterLogs('Start to prepare Checks, A division of accounts types that include checks or not at all');
                    console.log('Start to prepare Checks, A division of accounts types that include checks or not at all');

                    const withoutImg = res.filter((acc) => {
                        if (!acc.DataRow.some((item) => item.imgs && item.imgs.includes('https://biz2.bankhapoalim.co.il'))) {
                            if (acc.DataRow.length) {
                                acc.DataRow.forEach((it) => {
                                    if (it.idx) {
                                        delete it.idx;
                                    }
                                });
                            }
                            return acc
                        }
                    });
                    myEmitterLogs('Found ' + withoutImg.length + ' accounts without any check');
                    myEmitterLogs('Send ' + withoutImg.length + ' accounts without any check');
                    console.log('Found ' + withoutImg.length + ' accounts without any check');
                    console.log('Send ' + withoutImg.length + ' accounts without any check');
                    try {
                        const listOfArgumentArr = withoutImg;
                        const listOfArgumentsSlice = (withoutImg.length / poalimAsakimNew.numberOfOperations);

                        const asyncOperationSender = param => {
                            return new Promise(async resolve => {
                                try {
                                    await all.banks.core.services.sendOshServer({
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "BankData": [{
                                            "TargetId": all.banks.spiderConfig.spiderId,
                                            "Token": all.banks.generalVariables.branchNumber,
                                            "BankNumber": all.banks.accountDetails.bank.BankNumber,
                                            "ExtractDate": all.banks.accountDetails.bank.ExtractDate,
                                            "Account": [param]
                                        }]
                                    });
                                    resolve(true);
                                } catch (error) {
                                    resolve(true);
                                }
                            })
                        };

                        async function parallelSender(idxArr) {
                            const slicePos = (poalimAsakimNew.numberOfOperations * idxArr);
                            const argsCopy = [].concat(listOfArgumentArr.slice((slicePos), (slicePos + poalimAsakimNew.numberOfOperations)).map((val, ind) => ({
                                val,
                                ind
                            })));
                            const result = new Array(listOfArgumentArr.slice((slicePos), (slicePos + poalimAsakimNew.numberOfOperations)).length);
                            const promises = new Array(poalimAsakimNew.numberOfOperations).fill(Promise.resolve()); //set how many items will run parallel together

                            function chainNext(p) {
                                if (argsCopy.length) {
                                    const arg = argsCopy.shift();
                                    return p.then(() => {
                                        const operationPromise = asyncOperationSender(arg.val).then(r => {
                                            result[arg.ind] = r;
                                        });
                                        return chainNext(operationPromise);
                                    });
                                }
                                return p;
                            }

                            await Promise.all(promises.map(chainNext));
                            return result;
                        }

                        for (let idx = 0; idx < listOfArgumentsSlice; idx++) {
                            await parallelSender(idx)
                        }
                        console.log('Sent data without checks Successfully');
                        myEmitterLogs('Sent data without checks Successfully');
                    } catch (error) {
                        myEmitterLogs('Sent data without checks Failed');
                        console.log('Sent data without checks Failed');
                    }

                    const withImg = res.filter((acc) => {
                        if (acc.DataRow.some((item) => item.imgs && item.imgs.includes('https://biz2.bankhapoalim.co.il'))) {
                            return acc
                        }
                    });
                    myEmitterLogs('Found ' + withImg.length + ' accounts with some check');
                    console.log('Found ' + withImg.length + ' accounts with some check');

                    all.banks.generalVariables.allDataArr.BankData[0].Account = withImg;
                    getChecks().then(() => { //parallelAccWithChecks
                        myEmitterLogs('Finished Osh!');
                        console.log('Finished Osh!');
                        // console.log(all.banks.generalVariables.allDataArr.BankData);
                        // clearInterval(alive);
                        myEmitterLogs(29);
                        all.banks.generalVariables.numChecksDrawn = 0;
                        all.banks.generalVariables.numChecksNotWithdrawn = 0;
                        poalimAsakimNew.loadAsharaiAll();
                    })
                })
            }
        } catch (err) {
            writeLog('loadOsh err: ', err);
        }


    };
    poalimAsakimNew.loadAsharaiAll = async function () {
        all.banks.generalVariables.allDataArrAshrai = [];
        let numForLogsOut = 0;
        const started = Date.now();
        // const alive = setInterval(() => {
        //     if (!all.banks.accounts.poalimAsakimNew.middleOfWork) {
        //         all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/ng-portals/biz/he/homepage", 'GET', null, false, false)
        //             .then(() => {
        //                 resolveCookies()
        //             }).fail(() => {
        //         });
        //     }
        // }, 20000);
        console.log('Length of accounts from server: ' + all.banks.accountDetails.bank.arrDDAll.length);
        const ARR_IND_CCARD_DATA = all.banks.accountDetails.bank.arrDDAll.filter((it) => (it.IND_CCARD_DATA > 0))
            .map((item, idx) => {
                return Object.assign(item, {
                    idx,
                    bankParams: ("12-" + item.BANK_SNIF_ACCOUNT_KEY.split('-')[1] + "-" + item.BANK_SNIF_ACCOUNT_KEY.split('-')[0]),
                    BankNumber: 12,
                    AccountNumber: parseInt(item.BANK_SNIF_ACCOUNT_KEY.split('-')[0]),
                    BranchNumber: parseInt(item.BANK_SNIF_ACCOUNT_KEY.split('-')[1]),
                })
            });
        console.log('Length of accounts with cards: ' + ARR_IND_CCARD_DATA.length);

        const listOfArguments = ARR_IND_CCARD_DATA;
        const listOfArgumentsSlice = (ARR_IND_CCARD_DATA.length / Number(poalimAsakimNew.numberOfOperationsCards));

        const asyncOperation = param => {
            return new Promise(async resolve => {
                try {
                    monitorActivityClass.setIntervalActivity();
                    await resolveCookies();
                    console.log('step 1------ Running Index account: ' + param.idx);

                    // console.log(all.banks.core.services.logAlertsBanks(30, JSON.stringify(all.banks.accountDetails.bank.arrDDAll[param.idx])));
                    // const text = "מתחיל עוש לחשבון" + " " + all.banks.accountDetails.bank.arrDDAll[param.idx].BANK_SNIF_ACCOUNT_KEY + " " + "לתאריכים" + " " + all.banks.accountDetails.bank.arrDDAll[param.idx].datebackslesh + "-" + all.banks.accountDetails.bank.arrDDAll[param.idx].datebacksleshTo;
                    // console.log(all.banks.core.services.logAlertsBanks(10, text));
                    let data = await resolveSender({
                        urls: ['https://biz2.bankhapoalim.co.il/ServerServices/plastic-cards/transactions?accountId=' + param.bankParams + '&type=previous'],
                        method: "GET",
                        body: null,
                        headers: null,
                    });
                    data = data.response[0].response;
                    console.log('step 2------ Data Cards type=previous Index account: ' + param.idx + ' is: ', data);
                    let prevMonthsArr = data && Array.isArray(data.dates) && data.dates.length > 0 ? data.dates : undefined;
                    // if (data.messageCode !== 575) {
                    //     if (data && Array.isArray(data.plasticCardData) && data.plasticCardData.length > 0) {
                    //         let typeOfCards = [];
                    //         let regTypeOfCards = await resolveSender({
                    //             urls: ['https://biz2.bankhapoalim.co.il/ServerServices/cards/transactions-totals?accountId=' + param.bankParams + '&transactionsType=previous&lang=he'],
                    //             method: "GET",
                    //             body: null,
                    //             headers: null,
                    //         });
                    //         regTypeOfCards = regTypeOfCards.response[0].response;
                    //         if (regTypeOfCards && regTypeOfCards.cards) {
                    //             typeOfCards = regTypeOfCards.cards.map((card) => {
                    //                 return {
                    //                     val: card.cardIdentification.plasticCardImageCode,
                    //                     name: all.banks.core.services.getTypeCard(card.cardIdentification.cardVendorProductName)
                    //                 }
                    //             })
                    //         }
                    //         console.log('typeOfCards', typeOfCards)
                    //
                    //         const arrToSend = processTransactions(data.plasticCardData, param, typeOfCards);
                    //         if (arrToSend && arrToSend.length) {
                    //             try {
                    //                 await all.banks.core.services.sendCardsServer(arrToSend);
                    //             } catch (error) {
                    //             }
                    //         }
                    //     }
                    //
                    //     for (let idx = 0; idx <= param.IND_CCARD_DATA; idx++) {
                    //         if (idx < param.IND_CCARD_DATA && data.messageCode !== 575) {
                    //             let nextPrevMonth;
                    //             if (Array.isArray(prevMonthsArr) && idx < prevMonthsArr.length) {
                    //                 nextPrevMonth = prevMonthsArr[idx].retrievalEndDate;
                    //             } else {
                    //                 const tmpNow = all.banks.core.services.addMonthsToDate(new Date(), -1 * idx);
                    //                 nextPrevMonth = tmpNow.getFullYear() * 10000 + (tmpNow.getMonth() + 1) * 100;
                    //             }
                    //
                    //             let data = await resolveSender({
                    //                 urls: ['https://biz2.bankhapoalim.co.il/ServerServices/plastic-cards/transactions?accountId=' + param.bankParams + '&statementDate=' + nextPrevMonth + '&type=previous'],
                    //                 method: "GET",
                    //                 body: null,
                    //                 headers: null,
                    //             });
                    //
                    //             data = data.response[0].response;
                    //             let typeOfCards = [];
                    //             let regTypeOfCards = await resolveSender({
                    //                 urls: ['https://biz2.bankhapoalim.co.il/ServerServices/cards/transactions-totals?accountId=' + param.bankParams + '&transactionsType=previous&statementDate=' + nextPrevMonth + '&lang=he'],
                    //                 method: "GET",
                    //                 body: null,
                    //                 headers: null,
                    //             });
                    //             regTypeOfCards = regTypeOfCards.response[0].response;
                    //             if (regTypeOfCards && regTypeOfCards.cards) {
                    //                 typeOfCards = regTypeOfCards.cards.map((card) => {
                    //                     return {
                    //                         val: card.cardIdentification.plasticCardImageCode,
                    //                         name: all.banks.core.services.getTypeCard(card.cardIdentification.cardVendorProductName)
                    //                     }
                    //                 })
                    //             }
                    //
                    //             console.log('step ' + (2 + idx) + ' ------ Data Cards &statementDate=' + nextPrevMonth + '&type=previous Index account: ' + param.idx + ' is: ', data);
                    //             prevMonthsArr = data && Array.isArray(data.dates) && data.dates.length > 0 ? data.dates : undefined;
                    //
                    //             if (data && Array.isArray(data.plasticCardData) && data.plasticCardData.length > 0) {
                    //                 const arrToSend = processTransactions(data.plasticCardData, param, typeOfCards)
                    //                 if (arrToSend && arrToSend.length) {
                    //                     try {
                    //                         await all.banks.core.services.sendCardsServer(arrToSend);
                    //                     } catch (error) {
                    //                     }
                    //                 }
                    //             }
                    //
                    //         } else {
                    //             let data = await resolveSender({
                    //                 urls: ['https://biz2.bankhapoalim.co.il/ServerServices/plastic-cards/transactions?accountId=' + param.bankParams + '&type=current&view=totals'],
                    //                 method: "GET",
                    //                 body: null,
                    //                 headers: null,
                    //             });
                    //
                    //             const statusCode = data.response[0].statusCode;
                    //             data = data.response[0].response;
                    //             if ((statusCode === 203 || statusCode === 204) &&
                    //                 (data === ''
                    //                     ||
                    //                     (data && data.messageCode === 575)
                    //                 )
                    //             ) {
                    //                 data = await resolveSender({
                    //                     urls: ['https://biz2.bankhapoalim.co.il/ServerServices/plastic-cards/transactions?accountId=' + param.bankParams + '&type=current'],
                    //                     method: "GET",
                    //                     body: null,
                    //                     headers: null,
                    //                 });
                    //
                    //                 data = data.response[0].response;
                    //             }
                    //             if (data.plasticCardData && data.plasticCardData.length) {
                    //                 let typeOfCards = [];
                    //                 let regTypeOfCards = await resolveSender({
                    //                     urls: ['https://biz2.bankhapoalim.co.il/ServerServices/cards/transactions-totals?accountId=' + param.bankParams + '&transactionsType=current&lang=he'],
                    //                     method: "GET",
                    //                     body: null,
                    //                     headers: null,
                    //                 });
                    //                 regTypeOfCards = regTypeOfCards.response[0].response;
                    //                 if (regTypeOfCards && regTypeOfCards.cards) {
                    //                     typeOfCards = regTypeOfCards.cards.map((card) => {
                    //                         return {
                    //                             val: card.cardIdentification.plasticCardImageCode,
                    //                             name: all.banks.core.services.getTypeCard(card.cardIdentification.cardVendorProductName)
                    //                         }
                    //                     })
                    //                 }
                    //                 console.log('step ' + (2 + idx) + ' ------ Data Cards type=current&view=totals Index account: ' + param.idx + ' is: ', data);
                    //                 const arrToSend = await processTransactionsCurrent(data, param, typeOfCards);
                    //                 if (arrToSend && arrToSend.length) {
                    //                     try {
                    //                         await all.banks.core.services.sendCardsServer(arrToSend);
                    //                     } catch (error) {
                    //                     }
                    //                 }
                    //             } else {
                    //                 if (data.creditCardMyHomePageDetailsDataList && data.creditCardMyHomePageDetailsDataList.length) {
                    //                     console.log('step ' + (2 + idx) + ' ------ Data Cards type=current&view=totals Index account: ' + param.idx + ' is: ', data);
                    //                     const arrToSend = await processTransactionsCurrent(data, param, []);
                    //                     if (arrToSend && arrToSend.length) {
                    //                         try {
                    //                             await all.banks.core.services.sendCardsServer(arrToSend);
                    //                         } catch (error) {
                    //                         }
                    //                     }
                    //                 }
                    //             }
                    //         }
                    //     }
                    //
                    // } else {
                    let resp = await resolveSender({
                        urls: ['https://biz2.bankhapoalim.co.il/ServerServices/cards/transactions-totals?accountId=' + param.bankParams + '&transactionsType=previous&lang=he'],
                        method: "GET",
                        body: null,
                        headers: null,
                    });
                    resp = resp.response[0].response;
                    console.log('resp: ', resp)
                    if (resp && Array.isArray(resp.debitDateList)) {
                        for (let cycleIdx = 0; cycleIdx <= param.IND_CCARD_DATA && cycleIdx < resp.debitDateList.length; cycleIdx++) {
                            if (cycleIdx < param.IND_CCARD_DATA) {

                                let data = await resolveSender({
                                    urls: ['https://biz2.bankhapoalim.co.il/ServerServices/plastic-cards/transactions?accountId=' + param.bankParams + '&statementDate=' + resp.debitDateList[cycleIdx].debitMonth + '&type=previous'],
                                    method: "GET",
                                    body: null,
                                    headers: null,
                                });

                                data = data.response[0].response;

                                let typeOfCards = [];
                                let regTypeOfCards = await resolveSender({
                                    urls: ['https://biz2.bankhapoalim.co.il/ServerServices/cards/transactions-totals?accountId=' + param.bankParams + '&transactionsType=previous&statementDate=' + resp.debitDateList[cycleIdx].debitMonth + '&lang=he'],
                                    method: "GET",
                                    body: null,
                                    headers: null,
                                });
                                regTypeOfCards = regTypeOfCards.response[0].response;
                                if (regTypeOfCards && regTypeOfCards.cards) {
                                    typeOfCards = regTypeOfCards.cards.map((card) => {
                                        return {
                                            val: card.cardIdentification.plasticCardImageCode,
                                            name: all.banks.core.services.getTypeCard(card.cardIdentification.cardVendorProductName)
                                        }
                                    })
                                }

                                console.log('step ' + (2 + cycleIdx) + ' ------ Data Cards &statementDate=' + resp.debitDateList[cycleIdx].debitMonth + '&type=previous Index account: ' + param.idx + ' is: ', data);

                                if (regTypeOfCards && regTypeOfCards.cards) {
                                    for (let cardIdx = 0; cardIdx < regTypeOfCards.cards.length; cardIdx++) {
                                        let card = regTypeOfCards.cards[cardIdx];
                                        let data = await resolveSender({
                                            urls: ['https://biz2.bankhapoalim.co.il/ServerServices/cards/transactions?accountId=' + param.bankParams
                                            + '&cardSuffix=' + card.cardIdentification.cardSuffix
                                            + '&cardIssuingSPCode=' + card.cardIdentification.cardIssuingSPCode
                                            + '&cardIdServiceProvider=' + card.cardIdentification.cardIdServiceProvider
                                            + '&transactionsType=previous'
                                            + '&totalInd=1&debitEventOrigin=1&offset=0&limit=9999&lang=he'
                                            + '&debitDate=' + resp.debitDateList[cycleIdx].debitMonth
                                            + '&eventCurrencyDescription=null'],
                                            method: "GET",
                                            body: null,
                                            headers: null,
                                        });
                                        data = data.response[0].response;
                                        if (data && data.card) {
                                            const recordsProcessed = [];
                                            let transDescSave = false;
                                            [data.card.nationalTransactions, data.card.internationalTransactions]
                                                .filter(candidate => Array.isArray(candidate))
                                                .forEach(trnsGrs => {
                                                    trnsGrs
                                                        .filter(trnsGr => Array.isArray(trnsGr.transactionsDetails))
                                                        .forEach(trnsGr => {
                                                            const cycleTotal = trnsGr.transactionsTotal.previousAmount;
                                                            trnsGr.transactionsDetails
                                                                .filter(row => (!!row.eventDate && row.eventDate !== '0') || (!!row.debitDate && row.debitDate !== '0'))
                                                                .forEach(row => {
                                                                    if (row.merchantDetails.merchantName !== null) {
                                                                        transDescSave = false;
                                                                    } else if (row.merchantDetails.merchantName === null && !transDescSave && recordsProcessed && recordsProcessed.length && recordsProcessed[recordsProcessed.length - 1] && recordsProcessed[recordsProcessed.length - 1].TransDesc) {
                                                                        transDescSave = recordsProcessed[recordsProcessed.length - 1].TransDesc + ' - ';
                                                                    }
                                                                    const record = {
                                                                        "BankNumber": 12,
                                                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                                                        "Token": all.banks.accountDetails.bank.token,
                                                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                                                        "BranchNumber": param.BranchNumber,
                                                                        "AccountNumber": param.AccountNumber,
                                                                        "CardNumber": card.cardIdentification.cardSuffix,
                                                                        "NextBillingDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.debitDate)),
                                                                        "NextCycleTotal": cycleTotal,
                                                                        "CardStatus": null,
                                                                        "TransDesc": (transDescSave) ? (transDescSave + row.comment) : row.merchantDetails.merchantName,
                                                                        "TransTotal": row.currencyAmount.amount,
                                                                        "ValueDate": row.eventDate != 0
                                                                            ? all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.eventDate))
                                                                            : all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.debitDate)),
                                                                        "TotalPayments": row.paymentsNumber > 0 ? row.paymentsNumber : null,
                                                                        "CurrentPaymentNum": row.paymentNumber > 0 ? row.paymentNumber : null,
                                                                        "CardType": all.banks.core.services.getTypeCard(card.cardIdentification.cardVendorProductName),
                                                                        "indFakeDate": 0,
                                                                        "original_total": row.originalAmount,
                                                                        "currency_id": all.banks.core.services.getTypeCurrencyAll(row.eventCurrencyDescription),
                                                                        "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(row.currencyAmount.currencyDescription),
                                                                        "comment": row.comment,
                                                                        "TransCategory": all.banks.accountDetails.isCategory
                                                                            ? row.merchantDetails.merchantCategoryDescription
                                                                            : null
                                                                    };

                                                                    if (!record.TotalPayments && !!record.comment) {
                                                                        let matchPymnts = /תשלום\s+(\d{1,2})\s*(מ|מתוך)\s*(\d{1,2})/g.exec(record.comment);
                                                                        if (matchPymnts !== null) {
                                                                            record['CurrentPaymentNum'] = matchPymnts[1];
                                                                            record['TotalPayments'] = matchPymnts[3];
                                                                        }
                                                                    }

                                                                    recordsProcessed.push(record);
                                                                });
//
                                                        });
                                                });
                                            if (recordsProcessed.length > 0) {
                                                if (recordsProcessed && recordsProcessed.length) {
                                                    try {
                                                        await all.banks.core.services.sendCardsServer(recordsProcessed);
                                                    } catch (error) {
                                                    }
                                                }
                                            }
                                            writeLog('Processing cycle previous' + ' ' + resp.debitDateList[cycleIdx].debitMonth
                                                + ' for card ' + card.cardIdentification.cardSuffix + '...'
                                                + ' Got ' + recordsProcessed.length);
                                        } else {
                                            writeLog('Processing cycle previous' + ' ' + resp.debitDateList[cycleIdx].debitMonth
                                                + ' for card ' + card.cardIdentification.cardSuffix + '...'
                                                + ' Got nothing');
                                        }
                                    }

                                }


//                             if (data && Array.isArray(data.plasticCardData) && data.plasticCardData.length > 0) {
//                                 const arrToSend = processTransactions(data.plasticCardData, param, typeOfCards)
//                                 if (arrToSend && arrToSend.length) {
//                                     try {
//                                         await all.banks.core.services.sendCardsServer(arrToSend);
//                                     } catch (error) {
//                                     }
//                                 }
//                             } else {
//                                 if (regTypeOfCards && regTypeOfCards.cards) {
//                                     for (let cardIdx = 0; cardIdx < regTypeOfCards.cards.length; cardIdx++) {
//                                         let card = regTypeOfCards.cards[cardIdx];
//                                         let data = await resolveSender({
//                                             urls: ['https://biz2.bankhapoalim.co.il/ServerServices/cards/transactions?accountId=' + param.bankParams
//                                             + '&cardSuffix=' + card.cardIdentification.cardSuffix
//                                             + '&cardIssuingSPCode=' + card.cardIdentification.cardIssuingSPCode
//                                             + '&cardIdServiceProvider=' + card.cardIdentification.cardIdServiceProvider
//                                             + '&transactionsType=previous'
//                                             + '&totalInd=1&debitEventOrigin=1&offset=0&limit=9999&lang=he'
//                                             + '&debitDate=' + resp.debitDateList[cycleIdx].debitMonth
//                                             + '&eventCurrencyDescription=null'],
//                                             method: "GET",
//                                             body: null,
//                                             headers: null,
//                                         });
//                                         data = data.response[0].response;
//                                         if (data && data.card) {
//                                             const recordsProcessed = [];
//                                             let transDescSave = false;
//                                             [data.card.nationalTransactions, data.card.internationalTransactions]
//                                                 .filter(candidate => Array.isArray(candidate))
//                                                 .forEach(trnsGrs => {
//                                                     trnsGrs
//                                                         .filter(trnsGr => Array.isArray(trnsGr.transactionsDetails))
//                                                         .forEach(trnsGr => {
//                                                             const cycleTotal = trnsGr.transactionsTotal.previousAmount;
//                                                             trnsGr.transactionsDetails
//                                                                 .filter(row => (!!row.eventDate && row.eventDate !== '0') || (!!row.debitDate && row.debitDate !== '0'))
//                                                                 .forEach(row => {
//                                                                     if (row.merchantDetails.merchantName !== null) {
//                                                                         transDescSave = false;
//                                                                     } else if (row.merchantDetails.merchantName === null && !transDescSave) {
//                                                                         transDescSave = recordsProcessed[recordsProcessed.length - 1].TransDesc + ' - ';
//                                                                     }
//                                                                     const record = {
//                                                                         "BankNumber": 12,
//                                                                         "TargetId": all.banks.accountDetails.bank.targetId,
//                                                                         "Token": all.banks.accountDetails.bank.token,
//                                                                         "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
//                                                                         "ExporterId": all.banks.spiderConfig.spiderId,
//                                                                         "BranchNumber": param.BranchNumber,
//                                                                         "AccountNumber": param.AccountNumber,
//                                                                         "CardNumber": card.cardIdentification.cardSuffix,
//                                                                         "NextBillingDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.debitDate)),
//                                                                         "NextCycleTotal": cycleTotal,
//                                                                         "CardStatus": null,
//                                                                         "TransDesc": (transDescSave) ? (transDescSave + row.comment) : row.merchantDetails.merchantName,
//                                                                         "TransTotal": row.currencyAmount.amount,
//                                                                         "ValueDate": row.eventDate != 0
//                                                                             ? all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.eventDate))
//                                                                             : all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.debitDate)),
//                                                                         "TotalPayments": row.paymentsNumber > 0 ? row.paymentsNumber : null,
//                                                                         "CurrentPaymentNum": row.paymentNumber > 0 ? row.paymentNumber : null,
//                                                                         "CardType": all.banks.core.services.getTypeCard(card.cardIdentification.cardVendorProductName),
//                                                                         "indFakeDate": 0,
//                                                                         "original_total": row.originalAmount,
//                                                                         "currency_id": all.banks.core.services.getTypeCurrencyAll(row.eventCurrencyDescription),
//                                                                         "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(row.currencyAmount.currencyDescription),
//                                                                         "comment": row.comment,
//                                                                         "TransCategory": all.banks.accountDetails.isCategory
//                                                                             ? row.merchantDetails.merchantCategoryDescription
//                                                                             : null
//                                                                     };
//
//                                                                     if (!record.TotalPayments && !!record.comment) {
//                                                                         let matchPymnts = /תשלום\s+(\d{1,2})\s*(מ|מתוך)\s*(\d{1,2})/g.exec(record.comment);
//                                                                         if (matchPymnts !== null) {
//                                                                             record['CurrentPaymentNum'] = matchPymnts[1];
//                                                                             record['TotalPayments'] = matchPymnts[3];
//                                                                         }
//                                                                     }
//
//                                                                     recordsProcessed.push(record);
//                                                                 });
// //
//                                                         });
//                                                 });
//                                             if (recordsProcessed.length > 0) {
//                                                 if (recordsProcessed && recordsProcessed.length) {
//                                                     try {
//                                                         await all.banks.core.services.sendCardsServer(recordsProcessed);
//                                                     } catch (error) {
//                                                     }
//                                                 }
//                                             }
//                                             writeLog('Processing cycle previous' + ' ' + resp.debitDateList[cycleIdx].debitMonth
//                                                 + ' for card ' + card.cardIdentification.cardSuffix + '...'
//                                                 + ' Got ' + recordsProcessed.length);
//                                         } else {
//                                             writeLog('Processing cycle previous' + ' ' + resp.debitDateList[cycleIdx].debitMonth
//                                                 + ' for card ' + card.cardIdentification.cardSuffix + '...'
//                                                 + ' Got nothing');
//                                         }
//                                     }
//
//                                 }
//
//
//                             }
                            } else {

                            }
                        }
                    }
                    data = await resolveSender({
                        urls: ['https://biz2.bankhapoalim.co.il/ServerServices/plastic-cards/transactions?accountId=' + param.bankParams + '&type=current&view=totals'],
                        method: "GET",
                        body: null,
                        headers: null,
                    });
                    let statusCode = data.response[0].statusCode;
                    data = data.response[0].response;
                    // if ((statusCode === 203 || statusCode === 204) &&
                    //     (data === ''
                    //         ||
                    //         (data && data.messageCode === 575)
                    //     )
                    // ) {
                    //     data = await resolveSender({
                    //         urls: ['https://biz2.bankhapoalim.co.il/ServerServices/plastic-cards/transactions?accountId=' + param.bankParams + '&type=current'],
                    //         method: "GET",
                    //         body: null,
                    //         headers: null,
                    //     });
                    //     data = data.response[0].response;
                    // }
                    let res_cur = await resolveSender({
                        urls: ['https://biz2.bankhapoalim.co.il/ServerServices/cards/transactions-totals?accountId=' + param.bankParams + '&transactionsType=current&lang=he'],
                        method: "GET",
                        body: null,
                        headers: null
                    });
                    res_cur = res_cur.response[0].response;
                    if (data === undefined || res_cur !== undefined) {
                        if (res_cur && res_cur !== undefined) {
                            data = res_cur;
                            if (data && data.cards && data.cards.length) {
                                for (let idx = 0; idx < data.cards.length; idx++) {
                                    const card = data.cards[idx]
                                    if (card) {
                                        const recordsProcessed = [];
                                        const cardIdentification = card.cardIdentification

                                        if (card.cardBookedBalances.nationalTransactionsTotal && card.cardBookedBalances.nationalTransactionsTotal.length) {
                                            card.cardBookedBalances.nationalTransactionsTotal = card.cardBookedBalances.nationalTransactionsTotal.filter(it => it.currentAmount !== 0);

                                            for (let idx_total = 0; idx_total < card.cardBookedBalances.nationalTransactionsTotal.length; idx_total++) {
                                                const cardBookedBalances = card.cardBookedBalances.nationalTransactionsTotal[idx_total];
                                                const debitEventOrigin = 1;
                                                if (cardBookedBalances && cardBookedBalances.debitDate) {
                                                    let resp = await resolveSender({
                                                        urls: ['https://biz2.bankhapoalim.co.il/ServerServices/cards/transactions?accountId=' + param.bankParams + '&cardSuffix=' + cardIdentification.cardSuffix + '&cardIssuingSPCode=' + cardIdentification.cardIssuingSPCode + '&cardIdServiceProvider=' + cardIdentification.cardIdServiceProvider + '&transactionsType=current&totalInd=1&debitDate=' + cardBookedBalances.debitDate + '&eventCurrencyDescription=' + encodeURI(cardBookedBalances.eventCurrencyDescription) + '&debitEventOrigin=' + debitEventOrigin + '&offset=0'],
                                                        method: "GET",
                                                        body: null,
                                                        headers: null,
                                                    });
                                                    resp = resp.response[0].response;
                                                    if (resp && resp.card) {
                                                        let transDescSave = false;
                                                        [resp.card.nationalTransactions]
                                                            .filter(candidate => Array.isArray(candidate))
                                                            .forEach(trnsGrs => {
                                                                trnsGrs
                                                                    .filter(trnsGr => Array.isArray(trnsGr.transactionsDetails) && trnsGr.transactionsTotal.debitDate === cardBookedBalances.debitDate)
                                                                    .forEach(trnsGr => {
                                                                        const cycleTotal = trnsGr.transactionsTotal.currentAmount;
                                                                        trnsGr.transactionsDetails
                                                                            .filter(row => (!!row.eventDate && row.eventDate !== '0') || (!!row.debitDate && row.debitDate !== '0'))
                                                                            .forEach(row => {
                                                                                if (row.merchantDetails.merchantName !== null) {
                                                                                    transDescSave = false;
                                                                                } else if (row.merchantDetails.merchantName === null && !transDescSave && recordsProcessed && recordsProcessed.length && recordsProcessed[recordsProcessed.length - 1] && recordsProcessed[recordsProcessed.length - 1].TransDesc) {
                                                                                    transDescSave = recordsProcessed[recordsProcessed.length - 1].TransDesc + ' - ';
                                                                                }
                                                                                const record = {
                                                                                    "BankNumber": 12,
                                                                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                                                                    "Token": all.banks.accountDetails.bank.token,
                                                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                                                    "BranchNumber": param.BranchNumber,
                                                                                    "AccountNumber": param.AccountNumber,
                                                                                    "CardNumber": card.cardIdentification.cardSuffix,
                                                                                    "NextBillingDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.debitDate)),
                                                                                    "NextCycleTotal": cycleTotal,
                                                                                    "CardStatus": null,
                                                                                    "TransDesc": (transDescSave) ? (transDescSave + row.comment) : row.merchantDetails.merchantName,
                                                                                    "TransTotal": row.currencyAmount.amount,
                                                                                    "ValueDate": row.eventDate != 0
                                                                                        ? all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.eventDate))
                                                                                        : all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.debitDate)),
                                                                                    "TotalPayments": row.paymentsNumber > 0 ? row.paymentsNumber : null,
                                                                                    "CurrentPaymentNum": row.paymentNumber > 0 ? row.paymentNumber : null,
                                                                                    "CardType": all.banks.core.services.getTypeCard(card.cardIdentification.cardVendorProductName),
                                                                                    "indFakeDate": 0,
                                                                                    "original_total": row.originalAmount,
                                                                                    "currency_id": all.banks.core.services.getTypeCurrencyAll(row.eventCurrencyDescription),
                                                                                    "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(row.currencyAmount.currencyDescription),
                                                                                    "comment": row.comment,
                                                                                    "TransCategory": all.banks.accountDetails.isCategory
                                                                                        ? row.merchantDetails.merchantCategoryDescription
                                                                                        : null
                                                                                };

                                                                                if (!record.TotalPayments && !!record.comment) {
                                                                                    let matchPymnts = /תשלום\s+(\d{1,2})\s*(מ|מתוך)\s*(\d{1,2})/g.exec(record.comment);
                                                                                    if (matchPymnts !== null) {
                                                                                        record['CurrentPaymentNum'] = matchPymnts[1];
                                                                                        record['TotalPayments'] = matchPymnts[3];
                                                                                    }
                                                                                }

                                                                                recordsProcessed.push(record);
                                                                            });
//
                                                                    });
                                                            });
                                                        writeLog('Processing current cycle'
                                                            + ' for card ' + card.cardIdentification.cardSuffix + '...'
                                                            + ' Got ' + recordsProcessed.length);
                                                    }
                                                }
                                            }
                                        }
                                        if (card.cardBookedBalances.internationalTransactionsTotal && card.cardBookedBalances.internationalTransactionsTotal.length) {
                                            card.cardBookedBalances.internationalTransactionsTotal = card.cardBookedBalances.internationalTransactionsTotal.filter(it => it.currentAmount !== 0);

                                            for (let idx_total = 0; idx_total < card.cardBookedBalances.internationalTransactionsTotal.length; idx_total++) {
                                                const cardBookedBalances = card.cardBookedBalances.internationalTransactionsTotal[idx_total];
                                                const debitEventOrigin = 2;
                                                if (cardBookedBalances && cardBookedBalances.debitDate) {
                                                    let resp = await resolveSender({
                                                        urls: ['https://biz2.bankhapoalim.co.il/ServerServices/cards/transactions?accountId=' + param.bankParams + '&cardSuffix=' + cardIdentification.cardSuffix + '&cardIssuingSPCode=' + cardIdentification.cardIssuingSPCode + '&cardIdServiceProvider=' + cardIdentification.cardIdServiceProvider + '&transactionsType=current&totalInd=1&debitDate=' + cardBookedBalances.debitDate + '&eventCurrencyDescription=' + encodeURI(cardBookedBalances.eventCurrencyDescription) + '&debitEventOrigin=' + debitEventOrigin + '&offset=0'],
                                                        method: "GET",
                                                        body: null,
                                                        headers: null,
                                                    });
                                                    resp = resp.response[0].response;
                                                    if (resp && resp.card) {
                                                        let transDescSave = false;
                                                        [resp.card.internationalTransactions]
                                                            .filter(candidate => Array.isArray(candidate))
                                                            .forEach(trnsGrs => {
                                                                trnsGrs
                                                                    .filter(trnsGr => Array.isArray(trnsGr.transactionsDetails) && trnsGr.transactionsTotal.debitDate === cardBookedBalances.debitDate)
                                                                    .forEach(trnsGr => {
                                                                        const cycleTotal = trnsGr.transactionsTotal.currentAmount;
                                                                        trnsGr.transactionsDetails
                                                                            .filter(row => (!!row.eventDate && row.eventDate !== '0') || (!!row.debitDate && row.debitDate !== '0'))
                                                                            .forEach(row => {
                                                                                if (row.merchantDetails.merchantName !== null) {
                                                                                    transDescSave = false;
                                                                                } else if (row.merchantDetails.merchantName === null && !transDescSave && recordsProcessed && recordsProcessed.length && recordsProcessed[recordsProcessed.length - 1] && recordsProcessed[recordsProcessed.length - 1].TransDesc) {
                                                                                    transDescSave = recordsProcessed[recordsProcessed.length - 1].TransDesc + ' - ';
                                                                                }
                                                                                const record = {
                                                                                    "BankNumber": 12,
                                                                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                                                                    "Token": all.banks.accountDetails.bank.token,
                                                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                                                    "BranchNumber": param.BranchNumber,
                                                                                    "AccountNumber": param.AccountNumber,
                                                                                    "CardNumber": card.cardIdentification.cardSuffix,
                                                                                    "NextBillingDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.debitDate)),
                                                                                    "NextCycleTotal": cycleTotal,
                                                                                    "CardStatus": null,
                                                                                    "TransDesc": (transDescSave) ? (transDescSave + row.comment) : row.merchantDetails.merchantName,
                                                                                    "TransTotal": row.currencyAmount.amount,
                                                                                    "ValueDate": row.eventDate != 0
                                                                                        ? all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.eventDate))
                                                                                        : all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.debitDate)),
                                                                                    "TotalPayments": row.paymentsNumber > 0 ? row.paymentsNumber : null,
                                                                                    "CurrentPaymentNum": row.paymentNumber > 0 ? row.paymentNumber : null,
                                                                                    "CardType": all.banks.core.services.getTypeCard(card.cardIdentification.cardVendorProductName),
                                                                                    "indFakeDate": 0,
                                                                                    "original_total": row.originalAmount,
                                                                                    "currency_id": all.banks.core.services.getTypeCurrencyAll(row.eventCurrencyDescription),
                                                                                    "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(row.currencyAmount.currencyDescription),
                                                                                    "comment": row.comment,
                                                                                    "TransCategory": all.banks.accountDetails.isCategory
                                                                                        ? row.merchantDetails.merchantCategoryDescription
                                                                                        : null
                                                                                };

                                                                                if (!record.TotalPayments && !!record.comment) {
                                                                                    let matchPymnts = /תשלום\s+(\d{1,2})\s*(מ|מתוך)\s*(\d{1,2})/g.exec(record.comment);
                                                                                    if (matchPymnts !== null) {
                                                                                        record['CurrentPaymentNum'] = matchPymnts[1];
                                                                                        record['TotalPayments'] = matchPymnts[3];
                                                                                    }
                                                                                }

                                                                                recordsProcessed.push(record);
                                                                            });
//
                                                                    });
                                                            });
                                                        writeLog('Processing current cycle'
                                                            + ' for card ' + card.cardIdentification.cardSuffix + '...'
                                                            + ' Got ' + recordsProcessed.length);
                                                    }
                                                }
                                            }
                                        }
                                        if (recordsProcessed && recordsProcessed.length > 0) {
                                            try {
                                                await all.banks.core.services.sendCardsServer(recordsProcessed);
                                            } catch (error) {
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (data && data.plasticCardData && data.plasticCardData.length) {
                            let typeOfCards = [];
                            let regTypeOfCards = await resolveSender({
                                urls: ['https://biz2.bankhapoalim.co.il/ServerServices/cards/transactions-totals?accountId=' + param.bankParams + '&transactionsType=current&lang=he'],
                                method: "GET",
                                body: null,
                                headers: null,
                            });
                            regTypeOfCards = regTypeOfCards.response[0].response;
                            if (regTypeOfCards && regTypeOfCards.cards) {
                                typeOfCards = regTypeOfCards.cards.map((card) => {
                                    return {
                                        val: card.cardIdentification.plasticCardImageCode,
                                        name: all.banks.core.services.getTypeCard(card.cardIdentification.cardVendorProductName)
                                    }
                                })
                            }
                            console.log('step ' + (2 + cycleIdx) + ' ------ Data Cards type=current&view=totals Index account: ' + param.idx + ' is: ', data);
                            const arrToSend = await processTransactionsCurrent(data, param, typeOfCards);
                            if (arrToSend && arrToSend.length) {
                                try {
                                    await all.banks.core.services.sendCardsServer(arrToSend);
                                } catch (error) {
                                }
                            }
                        } else {
                            if (data.creditCardMyHomePageDetailsDataList && data.creditCardMyHomePageDetailsDataList.length) {
                                console.log('step ' + (2 + cycleIdx) + ' ------ Data Cards type=current&view=totals Index account: ' + param.idx + ' is: ', data);
                                const arrToSend = await processTransactionsCurrent(data, param, []);
                                if (arrToSend && arrToSend.length) {
                                    try {
                                        await all.banks.core.services.sendCardsServer(arrToSend);
                                    } catch (error) {
                                    }
                                }
                            }
                        }
                    }
                    // }
                    resolve(true);
                } catch (errorScope) {
                    console.log(errorScope)
                    debugger
                    resolve(true);
                }
            })
        };

        function resolveSender(item) {
            return new Promise(resolve => {
                let timeToTry = 0;
                const callWs = function () {
                    timeToTry += 1;
                    console.log('start callWs')
                    monitorActivityClass.setIntervalActivity();
                    let params = Object.assign(item, {
                        cookies: document.cookie,
                        token: poalimAsakimNew.xsrfToken,
                        numberOfOperations: poalimAsakimNew.numberOfOperationsCards
                    });
                    if (window.navigator.platform.indexOf('Win') === -1 && !window.all.banks.vpnConnected) {
                        params['proxy'] = ('http://brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '') + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225');
                    }
                    parallelReq(params, function (output) {
                        console.log('got res callWs')
                        monitorActivityClass.setIntervalActivity();

                        try {
                            console.log(output.response);
                            const numOfLogsOut = output.response.filter(it => it.statusCode === 403);
                            const numOfLogsOutError = output.response.filter(it => it.error !== false);
                            // numForLogsOut += numOfLogsOut.length;
                            if (numOfLogsOut.length > 0 || (numOfLogsOutError.length && timeToTry < 2)) {
                                // numForLogsOut = 0;
                                if (numOfLogsOut.length > 0) {
                                    all.banks.accounts.poalimAsakimNew.middleOfWork = true;
                                    all.banks.accounts.poalimAsakimNew.renewLogin().then(() => {
                                        if (output.response.some(item => item.headers && item.headers.location && ["getLogonPageIski", "Error", "exit.html"].some(urlPart => (item.headers.location).includes(urlPart)))) {
                                            let err = new Error("Redirected to perhaps because of another otp session started somewhere. Terminating with error.");
                                            if (item.headers.location === 'https://misc.poalim-site.co.il/Error_Pages/5/New/ErrorNew_5.html') {
                                                err = new Error("Redirected to " + item.headers.location + " perhaps because the bank announces that the service is temporarily unavailable.");
                                            }
                                            all.banks.core.services.errorLog(err);
                                            poalimAsakimNew.haltAndWaitForReload = true;
                                            poalimAsakimNew.logOutNew();
                                            return;
                                        }
                                        callWs()
                                    });
                                } else {
                                    callWs()
                                }
                            } else {
                                if (output.response.some(item => item.headers && item.headers.location && ["getLogonPageIski", "Error", "exit.html"].some(urlPart => (item.headers.location).includes(urlPart)))) {
                                    let err = new Error("Redirected to perhaps because of another otp session started somewhere. Terminating with error.");
                                    if (item.headers.location === 'https://misc.poalim-site.co.il/Error_Pages/5/New/ErrorNew_5.html') {
                                        err = new Error("Redirected to " + item.headers.location + " perhaps because the bank announces that the service is temporarily unavailable.");
                                    }
                                    all.banks.core.services.errorLog(err);
                                    poalimAsakimNew.haltAndWaitForReload = true;
                                    myEmitterLogs('Sent data Successfully');
                                    poalimAsakimNew.logOutNew();
                                    return;
                                }
                                output.response.forEach(v => {
                                    if (v.response && typeof (v.response) === 'string' && (v.response.includes('<html') || v.response === '')) {
                                        v.response = null;
                                    }
                                });
                                output.response.filter(item => item.error !== false).forEach(v => {
                                    v.response = null;
                                });
                                resolve(output);
                            }
                        } catch (e) {
                            console.log(e);
                        } finally {

                        }
                    })
                }
                callWs()
            });
        }

        function resolveCookies() {
            return new Promise(resolve => {
                win.cookies.getAll({}, function (cool) {
                    cool.forEach(function (v) {
                        document.cookie = v.name + "=" + v.value + ";";
                    })
                    resolve(true);
                });
            });
        }

        function processTransactions(transactions, param, typeOfCards) {
            const arr = []
            for (const cardData of transactions) {
                let cardNum;
                let plasticCardImageCode;
                try {
                    const key1 = Object.keys(cardData.summary.prev)[0],
                        key2 = Object.keys(cardData.summary.prev[key1].summariesByCurrencyCodes)[0],
                        key3 = Object.keys(cardData.summary.prev[key1].summariesByCurrencyCodes[key2].summaryDetails)[0];
                    cardNum = cardData.summary.prev[key1].summariesByCurrencyCodes[key2].summaryDetails[key3].plasticCardNumberSuffix;
                    plasticCardImageCode = cardData.summary.prev[key1].summariesByCurrencyCodes[key2].summaryDetails[key3].plasticCardImageCode;
                } catch (e) {
                    cardNum = cardData.plasticCardNumberWithoutPrefix.length > 9
                        ? cardData.plasticCardNumberWithoutPrefix.slice(-5, -1) : cardData.plasticCardNumberWithoutPrefix.slice(-4);
                    if (cardData.plasticCardImageCode) {
                        plasticCardImageCode = cardData.plasticCardImageCode;
                    }
                }
                const cardType = typeOfCards.length ? (typeOfCards.find((it) => it.val === plasticCardImageCode.toString()) ? typeOfCards.find((it) => it.val === plasticCardImageCode.toString()).name : '22') : '22';

                Object.keys(cardData.vauchers).forEach((key1) => {
                    Object.keys(cardData.vauchers[key1].vauchersByCurrencyCodes).forEach((key2) => {
                        Object.keys(cardData.vauchers[key1].vauchersByCurrencyCodes[key2].vaucherDetails).forEach((key3, key3Idx) => {
                            try {
                                const rowsToProcess = cardData.vauchers[key1].vauchersByCurrencyCodes[key2].vaucherDetails[key3];
                                if (!Array.isArray(rowsToProcess)) {
                                    writeLog(`Incorrect data. Cannot locate cardData.vauchers[${key1}].vauchersByCurrencyCodes[${key2}].vaucherDetails[${key3}]. 
                                                        Found ${Object.keys(cardData.vauchers[key1].vauchersByCurrencyCodes[key2].vaucherDetails)}`);
                                    return;
                                }
                                const recordsProcessed = [];

                                rowsToProcess.forEach((row, rowIdx) => {
                                    if (!row.eventDate) {
                                        if (row.debitAmount == 0 && !row.clientBusinessName) {
                                            return;
                                        }
                                        if (row.recordTypeCode === 160) {
                                            return;
                                        }
                                        if (recordsProcessed.length > 0 && rowIdx > 0 && rowsToProcess[rowIdx - 1].recordTypeCode === row.recordTypeCode) {
                                            recordsProcessed[recordsProcessed.length - 1].TransTotal = row.debitAmount;
                                            return;
                                        }
                                    }

                                    const record = {
                                        "BankNumber": 12,
                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                        "Token": all.banks.accountDetails.bank.token,
                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "BranchNumber": param.BranchNumber,
                                        "AccountNumber": param.AccountNumber,
                                        "CardNumber": cardNum,
                                        "NextBillingDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.debitDate)),
                                        "NextCycleTotal": null,
                                        "CardStatus": null,
                                        "TransDesc": row.clientBusinessName,
                                        "TransTotal": row.debitAmount,
                                        "ValueDate": row.eventDate != 0 ? all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.eventDate)) : all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.debitDate)),
                                        "TotalPayments": row.paymentsNumber > 0 ? row.paymentsNumber : null,
                                        "CurrentPaymentNum": row.paymentNumber > 0 ? row.paymentNumber : null,
                                        "CardType": cardType,
                                        "indFakeDate": 0,
                                        "original_total": row.originalAmount,
                                        "currency_id": all.banks.core.services.getTypeCurrencyAll(row.eventCurrencyDescription),
                                        "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(row.debitCurrencyDescription),
                                        "comment": Array.isArray(row.partyComments) && row.partyComments.length > 0
                                            ? row.partyComments[0] : null
                                    };

                                    if (Array.isArray(row.partyComments) && row.partyComments.length > 0) {
                                        if (row.partyComments[0].indexOf('מתוך') !== -1) {
                                            const pymntNumFromNum = row.partyComments[0].split('מתוך');
                                            if (pymntNumFromNum.length > 1) {
                                                record['CurrentPaymentNum'] = pymntNumFromNum[0].replace(/\D/g, "");
                                                record['TotalPayments'] = pymntNumFromNum[1].replace(/\D/g, "");
                                            }
                                        }
                                    }

                                    if (all.banks.accountDetails.isCategory && row.economySectorDescription) {
                                        record['TransCategory'] = row.economySectorDescription;
                                    }

                                    recordsProcessed.push(record);
                                });

                                if (recordsProcessed.length > 0) {
                                    var sum = recordsProcessed.reduce((acc, rec) => acc + rec.TransTotal, 0).toFixed(2);
                                    recordsProcessed.forEach((rec) => {
                                        rec.NextCycleTotal = sum;

                                        if (rec['comment'] && rec['comment'].indexOf('הנחה') !== -1) {
                                            rec['TransTotal'] = Number(rec['TransTotal']) - parseFloat(rec['comment'].replace(/[^\d\.-]/g, ""));
                                        }
                                    });
                                    arr.push(...recordsProcessed);
                                }

                            } catch (exception) {
                            }
                        });

                    });
                });
            }
            return arr
        }

        function processTransactionsCurrent(data, param, typeOfCards) {
            return new Promise(async resolve => {
                const arr = [];
                try {
                    if (data && data.messageCode == 575 || (data.plasticCardData)) {
                        if (data.messageCode == 575) {
                            let data = await resolveSender({
                                urls: ['https://biz2.bankhapoalim.co.il/ServerServices/plastic-cards/transactions?accountId=' + param.bankParams + '&type=current'],
                                method: "GET",
                                body: null,
                                headers: null,
                            });
                            data = data.response[0].response;
                        }

                        console.log('Step last------ Data Cards type=current Index account: ' + param.idx + ' is: ', data);
                        try {
                            if (data && data.plasticCardData && data.plasticCardData.length) {
                                $(data.plasticCardData).each(function (i, v) {
                                    if (v.vauchers[1] !== undefined) {
                                        var vaucherDetails = v.vauchers[1].vauchersByCurrencyCodes[0].vaucherDetails;
                                        for (var x in vaucherDetails) {
                                            var vaucherDetailsList = vaucherDetails[x];
                                            if (vaucherDetailsList.length) {
                                                $(vaucherDetailsList).each(function (i1, v1) {
                                                    if (v.summary.current[1] !== undefined) {
                                                        var cardNum = v.summary.current[1].summariesByCurrencyCodes[0].summaryDetails[x].plasticCardNumberSuffix;
                                                        var nextCycleTotal = v.summary.current[1].summariesByCurrencyCodes[0].summaryDetails[x].debitAmount;
                                                        var plasticCardImageCode = v.summary.current[1].summariesByCurrencyCodes[0].summaryDetails[x].plasticCardImageCode;
                                                    } else {
                                                        var cardNum = v.summary.current[0].summariesByCurrencyCodes[0].summaryDetails[0].plasticCardNumberSuffix;
                                                        var nextCycleTotal = v.summary.current[0].summariesByCurrencyCodes[0].summaryDetails[0].debitAmount;
                                                        var plasticCardImageCode = v.summary.current[0].summariesByCurrencyCodes[0].summaryDetails[0].plasticCardImageCode;
                                                    }
                                                    var cardType = typeOfCards.length ? (typeOfCards.find((it) => it.val === plasticCardImageCode.toString()) ? typeOfCards.find((it) => it.val === plasticCardImageCode.toString()).name : '22') : '22';

                                                    var nextBillingDate = null;
                                                    if (v1.formattedDebitDate !== null) {
                                                        nextBillingDate = new Date(v1.formattedDebitDate).getFullYear() + '' + ("0" + (new Date(v1.formattedDebitDate).getMonth() + 1)).slice(-2) + '' + ("0" + (new Date(v1.formattedDebitDate).getDate())).slice(-2);
                                                    }
                                                    var totalPaymentsSum = null, currentPaymentNumSum = null;
                                                    if (v1.partyComments !== null && v1.partyComments.length > 0) {
                                                        if (v1.partyComments[0].indexOf('מתוך') !== -1) {
                                                            var textPayCard = v1.partyComments[0].split('מתוך');
                                                            currentPaymentNumSum = textPayCard[0].replace(/\D/g, "");
                                                            totalPaymentsSum = textPayCard[1].replace(/\D/g, "");
                                                        }
                                                    } else {
                                                        currentPaymentNumSum = v1.paymentNumber;
                                                        totalPaymentsSum = v1.paymentsNumber;
                                                    }
                                                    var currencyId = all.banks.core.services.getTypeCurrencyAll(v1.eventCurrencyDescription);
                                                    var ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(v1.debitCurrencyDescription);
                                                    var transTotal = v1.debitAmount;
                                                    if (v1.debitAmount == 0 && v1.originalAmount != 0) {
                                                        transTotal = v1.originalAmount;
                                                    }
                                                    if (totalPaymentsSum == 0) {
                                                        totalPaymentsSum = null;
                                                        if (currentPaymentNumSum == 0) {
                                                            currentPaymentNumSum = null;
                                                        }
                                                    }
                                                    var transCategory = null;
                                                    if (all.banks.accountDetails.isCategory) {
                                                        transCategory = (v1.economySectorDescription !== undefined && v1.economySectorDescription !== "" && v1.economySectorDescription !== null) ? v1.economySectorDescription : null;
                                                    }
                                                    var comment = "";
                                                    if (v1.partyComments !== null && v1.partyComments.length > 0) {
                                                        if (v1.partyComments[0].indexOf('הנחה') !== -1) {
                                                            comment = v1.partyComments[0];
                                                            transTotal = Number(transTotal) - parseFloat(v1.partyComments[0].replace(/[^\d\.-]/g, ""));
                                                        }
                                                    }
                                                    arr.push({
                                                        "BankNumber": 12,
                                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                                        "Token": all.banks.accountDetails.bank.token,
                                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                                        "BranchNumber": param.BranchNumber,
                                                        "AccountNumber": param.AccountNumber,
                                                        "CardNumber": cardNum,
                                                        "NextBillingDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(nextBillingDate)),
                                                        "NextCycleTotal": nextCycleTotal,
                                                        "CardStatus": null,
                                                        "TransDesc": v1.clientBusinessName,
                                                        "TransTotal": transTotal,//v1.debitAmount,
                                                        "ValueDate": v1.eventDate != 0 ? all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v1.eventDate)) : all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v1.debitDate)),
                                                        "TransCategory": transCategory,
                                                        "TotalPayments": totalPaymentsSum,
                                                        "CurrentPaymentNum": currentPaymentNumSum,
                                                        "CardType": cardType,
                                                        "indFakeDate": 0,
                                                        "original_total": v1.originalAmount,
                                                        "currency_id": currencyId,
                                                        "ind_iskat_hul": ind_iskat_hul,
                                                        "comment": comment
                                                    });
                                                })
                                            }
                                        }
                                    }
                                });
                                resolve(arr);
                            } else {
                                resolve(arr);
                            }
                        } catch (err) {
                            resolve(arr);
                        }
                    } else {
                        if (data && data.creditCardMyHomePageDetailsDataList) {
                            if (data.creditCardMyHomePageDetailsDataList.length) {
                                loadRowsForeign(data, function () {
                                    resolve(arr);
                                });
                            } else {
                                resolve(arr);
                            }
                        } else {
                            resolve(arr);
                        }
                    }

                    function loadRowsForeign(row, cb) {
                        try {
                            var arrRows = {};
                            var v = row.voucherDetailsByCardNumber;
                            if (Object.keys(v).length) {
                                for (var x in v) {
                                    var cardPlasticCardNumberPrefix = v[x].plasticCardNumberPrefix.toString(),
                                        cardNum = v[x].plasticCardNumberPrefix.toString().slice(-4),
                                        plasticCardImageCode = '',
                                        idxTry = 0;

                                    row.creditCardMyHomePageDetailsDataList.forEach(function (valueCards) {
                                        if ((cardPlasticCardNumberPrefix == valueCards.plasticCardNumberWithoutPrefix.toString()) && (idxTry == 0)) {
                                            idxTry = 1;
                                            cardNum = valueCards.plasticCardNumberSuffix;
                                            plasticCardImageCode = valueCards.plasticCardImageCode;
                                        }
                                    });
                                    var cardType = typeOfCards.length ? (typeOfCards.find((it) => it.val === plasticCardImageCode.toString()) ? typeOfCards.find((it) => it.val === plasticCardImageCode.toString()).name : '22') : '22';

                                    $(v[x].vouchersDetails).each(function (i1, v1) {
                                        if (
                                            (v1.clientBusinessName !== null)
                                            &&
                                            ((v1.eventDate !== 0 && v1.recordTypeCode !== 160) || (v1.eventDate == 0 && v1.recordTypeCode !== 160) || (v1.eventDate !== 0 && v1.recordTypeCode == 160))
                                        ) {
                                            var totalPaymentsSum = null, currentPaymentNumSum = null;
                                            if (v1.partyComments !== null && v1.partyComments.length > 0) {
                                                if (v1.partyComments[0].indexOf('מתוך') !== -1) {
                                                    var textPayCard = v1.partyComments[0].split('מתוך');
                                                    currentPaymentNumSum = textPayCard[0].replace(/\D/g, "");
                                                    totalPaymentsSum = textPayCard[1].replace(/\D/g, "");
                                                }
                                            } else {
                                                currentPaymentNumSum = v1.paymentNumber;
                                                totalPaymentsSum = v1.paymentsNumber;
                                            }

                                            var transTotal = v1.debitAmount;
                                            if (v1.debitAmount == 0 && v1.originalAmount !== 0) {
                                                transTotal = v1.originalAmount;
                                            }
                                            if (totalPaymentsSum == 0) {
                                                totalPaymentsSum = null;
                                                if (currentPaymentNumSum == 0) {
                                                    currentPaymentNumSum = null;
                                                }
                                            }

                                            var currencyId = all.banks.core.services.getTypeCurrencyAll(v1.eventCurrencyDescription);
                                            var ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(v1.debitCurrencyDescription);
                                            if (!arrRows[v1.debitDate]) {
                                                arrRows[v1.debitDate] = [];
                                            }
                                            var transCategory = null;
                                            if (all.banks.accountDetails.isCategory) {
                                                transCategory = (v1.economySectorDescription !== undefined && v1.economySectorDescription !== "" && v1.economySectorDescription !== null) ? v1.economySectorDescription : null;
                                            }
                                            var comment = "";
                                            if (v1.partyComments !== null && v1.partyComments.length > 0) {
                                                if (v1.partyComments[0].indexOf('הנחה') !== -1) {
                                                    comment = v1.partyComments[0];
                                                    transTotal = Number(transTotal) - parseFloat(v1.partyComments[0].replace(/[^\d\.-]/g, ""));
                                                }
                                            }
                                            arrRows[v1.debitDate].push({
                                                "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                "TargetId": all.banks.accountDetails.bank.targetId,
                                                "Token": all.banks.accountDetails.bank.token,
                                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                "ExporterId": all.banks.spiderConfig.spiderId,
                                                "BranchNumber": param.BranchNumber,
                                                "AccountNumber": param.AccountNumber,
                                                "CardNumber": cardNum,
                                                "NextBillingDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v1.debitDate)),
                                                "NextCycleTotal": null,
                                                "CardStatus": null,
                                                "TransDesc": v1.clientBusinessName,
                                                "TransTotal": transTotal, //v1.debitAmount,
                                                "ValueDate": v1.eventDate !== 0 ? all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v1.eventDate)) : all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v1.debitDate)),
                                                "TransCategory": transCategory,
                                                "TotalPayments": totalPaymentsSum,
                                                "CurrentPaymentNum": currentPaymentNumSum,
                                                "CardType": cardType,
                                                "indFakeDate": 0,
                                                "original_total": v1.originalAmount,
                                                "currency_id": currencyId,
                                                "ind_iskat_hul": ind_iskat_hul,
                                                "comment": comment
                                            })
                                        }

                                        if (i1 + 1 === v[x].vouchersDetails.length) {
                                            if (Object.keys(arrRows).length) {
                                                var idx = -1;
                                                for (var x1 in arrRows) {
                                                    idx += 1;
                                                    var sum = arrRows[x1].reduce(function (acc, val) {
                                                        return acc + val.TransTotal;
                                                    }, 0);
                                                    $(arrRows[x1]).each(function (i2, v2) {
                                                        v2.NextCycleTotal = Number(sum.toFixed(2));
                                                        arr.push(v2);
                                                        if ((i2 + 1 == arrRows[x1].length) && ((idx + 1) == Object.keys(arrRows).length)) {
                                                            delete v[x];
                                                            loadRowsForeign(row, cb);
                                                        }
                                                    });
                                                }
                                            } else {
                                                delete v[x];
                                                loadRowsForeign(row, cb);
                                            }
                                        }
                                    });
                                    break;
                                }
                            } else {
                                cb();
                            }
                        } catch (errs) {
                            console.log(errs)
                            cb();
                        }
                    }
                } catch (err) {
                    resolve(arr);
                }
            });
        }

        function timeoutSpace() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(true);
                }, 10000);
            });
        }

        async function parallel() {
            async function parallelSlices(idxArr) {
                console.log(('תחילת ריצת '
                    +
                    poalimAsakimNew.numberOfOperationsCards
                    +
                    ' חשבונות נוספים, אינדקס מספר: '
                    +
                    idxArr));
                const slicePos = (Number(poalimAsakimNew.numberOfOperationsCards) * idxArr);
                const argsCopy = [].concat(listOfArguments.slice((slicePos), (slicePos + Number(poalimAsakimNew.numberOfOperationsCards))).map((val, ind) => ({
                    val,
                    ind
                })));
                const result = new Array(listOfArguments.slice((slicePos), (slicePos + Number(poalimAsakimNew.numberOfOperationsCards))).length);
                const promises = new Array(Number(poalimAsakimNew.numberOfOperationsCards)).fill(Promise.resolve()); //set how many items will run parallel together

                function chainNext(p) {
                    if (argsCopy.length) {
                        const arg = argsCopy.shift();
                        return p.then(() => {
                            const operationPromise = asyncOperation(arg.val).then(r => {
                                console.log('סיום ריצת חשבון-----' + arg.ind, r);
                                result[arg.ind] = r;
                            });
                            return chainNext(operationPromise);
                        });
                    }
                    return p;
                }

                await Promise.all(promises.map(chainNext));
                console.log(('סיום ריצת '
                    +
                    Number(poalimAsakimNew.numberOfOperationsCards)
                    +
                    ' חשבונות נוספים, אינדקס מספר: '
                    +
                    idxArr), result);
                return result;
            }

            let resultArray = [];
            let listNum = 0;
            for (let idx = 0; idx < listOfArgumentsSlice; idx++) {
                const result = await parallelSlices(idx);
                resultArray = resultArray.concat(result);
                const currentNumAcc = ((idx + 1) * Number(poalimAsakimNew.numberOfOperationsCards));
                const floorNum = Math.floor(currentNumAcc / Number(poalimAsakimNew.numOfAccForRenewLoginCards))
                if (listNum !== floorNum) {
                    listNum = floorNum;
                    await all.banks.accounts.poalimAsakimNew.renewLogin();
                }
                await timeoutSpace();
            }
            return resultArray;
        }

        parallel().then(async (res) => {
            const elapsed = Date.now() - started;
            console.log(all.banks.generalVariables.allDataArrAshrai);
            console.log('Found ' + all.banks.generalVariables.allDataArrAshrai.length + ' of allDataArrAshrai at ' + (elapsed / 1000) + ' ms');
            // clearInterval(alive);
            poalimAsakimNew.loadMatahAll()
        });

    }
    poalimAsakimNew.loadMatahAll = async function () {
        const started = Date.now();

        // const alive = setInterval(() => {
        //     if (!all.banks.accounts.poalimAsakimNew.middleOfWork) {
        //         all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/ng-portals/biz/he/homepage", 'GET', null, false, false)
        //             .then(() => {
        //                 resolveCookies()
        //             }).fail(() => {
        //         });
        //     }
        // }, 20000);
        all.banks.generalVariables.allDataArr = {
            "ExporterId": all.banks.spiderConfig.spiderId,
            "BankData": [{
                "TargetId": all.banks.spiderConfig.spiderId,
                "Token": all.banks.generalVariables.branchNumber,
                "BankNumber": all.banks.accountDetails.bank.BankNumber,
                "ExtractDate": all.banks.accountDetails.bank.ExtractDate,
                "Account": []
            }]
        };

        const ARR_TRANS_DAY_TO_RUN = all.banks.accountDetails.bank.arrDDAll.filter((it) => (it.MATAH_DAY_TO_RUN > 0))
            .map((item, idx) => {
                if (!all.banks.bankPoalimAsakimManual) {
                    var dateFromMatah = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - item.MATAH_DAY_TO_RUN);
                    var dateToMatah = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                    var datebacksleshToMatah = dateToMatah.getFullYear() + '' + ("0" + (dateToMatah.getMonth() + 1)).slice(-2) + '' + ("0" + (dateToMatah.getDate())).slice(-2);
                    var datebacksleshMatah = dateFromMatah.getFullYear() + '' + ("0" + (dateFromMatah.getMonth() + 1)).slice(-2) + '' + ("0" + (dateFromMatah.getDate())).slice(-2);

                    if (item.DATE_TILL !== null) {
                        var dateSplits = item.DATE_TILL.split('/');
                        var dateTo = new Date(parseFloat(dateSplits[2]), parseFloat(dateSplits[1]) - 1, parseFloat(dateSplits[0]));
                        var dateFrom = new Date(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate() - item.TRANS_DAY_TO_RUN);
                    } else {
                        var dateFrom = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - item.TRANS_DAY_TO_RUN);
                        var dateTo = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                    }
                    all.banks.accountDetails.dateFrom = dateFrom;
                    all.banks.accountDetails.dateTo = dateTo;

                    var datebackslesh = all.banks.accountDetails.dateFrom.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2);
                    var datebacksleshTo = all.banks.accountDetails.dateTo.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2);
                } else if (all.banks.bankPoalimAsakimManual) {
                    var datebacksleshMatah = all.banks.accountDetails.dateFromMatah.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2);
                    var datebacksleshToMatah = all.banks.accountDetails.dateToMatah.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2);

                    var datebackslesh = all.banks.accountDetails.dateFrom.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2);
                    var datebacksleshTo = all.banks.accountDetails.dateTo.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2);
                }

                return Object.assign(item, {
                    idx,
                    datebackslesh: datebackslesh,
                    datebacksleshTo: datebacksleshTo,
                    datebacksleshMatah: datebacksleshMatah,
                    datebacksleshToMatah: datebacksleshToMatah,
                    bankParams: ("12-" + item.BANK_SNIF_ACCOUNT_KEY.split('-')[1] + "-" + item.BANK_SNIF_ACCOUNT_KEY.split('-')[0]),
                    BankNumber: 12,
                    AccountNumber: parseInt(item.BANK_SNIF_ACCOUNT_KEY.split('-')[0]),
                    BranchNumber: parseInt(item.BANK_SNIF_ACCOUNT_KEY.split('-')[1]),
                })
            });


        const listOfArguments = ARR_TRANS_DAY_TO_RUN;
        const listOfArgumentsSlice = (ARR_TRANS_DAY_TO_RUN.length / Number(poalimAsakimNew.numberOfOperationsMatah));

        const asyncOperation = param => {
            return new Promise(async resolve => {
                monitorActivityClass.setIntervalActivity();
                await resolveCookies();
                console.log('step 1------ Running Index account: ' + param.idx);
                console.log(all.banks.core.services.logAlertsBanks(30, JSON.stringify(all.banks.accountDetails.bank.arrDDAll[param.idx])));

                const text = "מתחיל עוש לחשבון" + " " + all.banks.accountDetails.bank.arrDDAll[param.idx].BANK_SNIF_ACCOUNT_KEY + " " + "לתאריכים" + " " + all.banks.accountDetails.bank.arrDDAll[param.idx].datebackslesh + "-" + all.banks.accountDetails.bank.arrDDAll[param.idx].datebacksleshTo;
                console.log(all.banks.core.services.logAlertsBanks(10, text));

                ////fix
                const transactions = await resolveSender({
                    urls: ["https://biz2.bankhapoalim.co.il/ServerServices/foreign-currency/transactions?accountId=" + param.bankParams + "&type=business&lang=he"],
                    method: "GET",
                    body: null,
                    headers: null,
                });
                console.log('step 2------ balanceAndCreditLimit of Index account: ' + param.idx);
                const arrAll = {
                    "ExporterId": all.banks.spiderConfig.spiderId,
                    "BankData": [{
                        "TargetId": all.banks.spiderConfig.spiderId,
                        "Token": all.banks.generalVariables.branchNumber,
                        "BankNumber": all.banks.accountDetails.bank.BankNumber,
                        "ExtractDate": all.banks.accountDetails.bank.ExtractDate,
                        "Account": []
                    }]
                }
                if (transactions && transactions.response && transactions.response.length && transactions.response[0].response) {
                    const data = transactions.response[0].response;
                    if (data && data.balancesAndLimitsDataList) {
                        let acc, accInList;
                        for (let accIdx = 0; accIdx < data.balancesAndLimitsDataList.length && !poalimAsakimNew.haltAndWaitForReload; accIdx++) {
                            accInList = data.balancesAndLimitsDataList[accIdx];
                            acc = {
                                'BankNumber': param.BankNumber,
                                'AccountNumber': param.AccountNumber,
                                'BranchNumber': param.BranchNumber,
                                'Balance': accInList.currentBalance,
                                'AccountCredit': null,
                                "BankAccountTypeId": accInList.detailedAccountTypeCode,
                                "CurrencyId": all.banks.core.services.getTypeCurrencyAll(accInList.currencySwiftCode, true),
                                "DataRow": []
                            };
                            arrAll.BankData[0].Account.push(acc);
                            await processAccount();
                        }

////fix
                        async function processAccount() {
                            var urls = "https://biz2.bankhapoalim.co.il/ServerServices/foreign-currency/transactions?accountId=" + param.bankParams
                                + "&currencyCodeList=" + accInList.currencyCode + "&detailedAccountTypeCodeList=" + accInList.detailedAccountTypeCode
                                + "&retrievalEndDate=" + param.datebacksleshToMatah
                                + "&retrievalStartDate=" + param.datebacksleshMatah
                                + "&view=details&type=business&lang=he";
                            try {
                                const balancesAndLimitsDataList = await resolveSender({
                                    urls: [urls],
                                    method: "GET",
                                    body: null,
                                    headers: null,
                                });
                                if (balancesAndLimitsDataList && balancesAndLimitsDataList.response && balancesAndLimitsDataList.response.length && balancesAndLimitsDataList.response[0].response) {
                                    const res = balancesAndLimitsDataList.response[0].response;
                                    if (res && res.balancesAndLimitsDataList) {
                                        for (let baldIdx = 0; baldIdx < res.balancesAndLimitsDataList.length; baldIdx++) {
                                            if (!res.balancesAndLimitsDataList[baldIdx].transactions
                                                || !res.balancesAndLimitsDataList[baldIdx].transactions.length) {
                                                continue;
                                            }

                                            for (let trIdx = 0; trIdx < res.balancesAndLimitsDataList[baldIdx].transactions.length; trIdx++) {
                                                await processTransaction(res.balancesAndLimitsDataList[baldIdx].transactions[trIdx]);
                                            }
                                        }
                                    }
                                }
                            } catch (e) {
                                writeLog('Foreign transactions processing failed for ' + param.bankParams
                                    + '(' + acc.currencyCode + ', ' + acc.detailedAccountTypeCode + '): ' + e);
                            }
                        }

                        async function processTransaction(v1) {
                            const row = {
                                "Asmachta": poalimAsakimNew.retrieveAsmachta(v1), // v1.referenceNumber,
                                "TransDesc": v1.activityDescription + (v1.comment ? (' ' + v1.comment) : ''),
                                "ValueDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v1.executingDate)),
                                "TransactionType": (v1.eventActivityTypeCode === 1) ? "1" : "0",
                                "TransTotal": v1.eventAmount,
                                "Balance": v1.currentBalance,
                                "IsDaily": (v1.transactionType === "TODAY") ? "1" : "0",
                                "imgs": null,
                                "DepositeTransferData": null
                            };
                            acc["DataRow"].push(row);

                            if (v1.eventDetails) {
                                if (v1.originalSystemId === 390) {
                                    return;

                                    try {
                                        const securityQuoteData = await resolveSender({
                                            urls: ["https://biz2.bankhapoalim.co.il/ServerServices/capital-market/securities/" + v1.eventDetails
                                            + "?accountId=" + param.bankParams + "&view=quote&lang=he"],
                                            method: "GET",
                                            body: null,
                                            headers: null,
                                        });

                                        if (securityQuoteData && securityQuoteData.response && securityQuoteData.response.length && securityQuoteData.response[0].response) {
                                            const resp = securityQuoteData.response[0].response;
                                            if (resp && resp.securityQuoteData) {
                                                row["TransDesc"] = row["TransDesc"] + " " + resp.securityQuoteData.securityName;
                                            }
                                        }

                                    } catch (e) {
                                        writeLog(`Transaction ${v1.referenceNumber} details load failed`);
                                    }

                                } else {
                                    row["TransDesc"] = row["TransDesc"] + " " + v1.eventDetails;
                                }
                            }
                        }
                    }
                }
                console.log('step 3------ set account params of Index account: ' + param.idx);
                if (arrAll.BankData[0].Account.DataRow) {
                    console.log('Last step ------ found ' + arrAll.BankData[0].Account.DataRow.length + ' transactionsArr of Index account: ' + param.idx);
                }
                try {
                    await all.banks.core.services.sendOshServer(arrAll, true);
                    resolve(true);
                } catch (error) {
                    resolve(true);
                }
            })
        };

        function resolveSender(item) {
            monitorActivityClass.setIntervalActivity();
            return new Promise(resolve => {
                const callWs = function () {
                    let timeOfTriedOn = 0;
                    let params = Object.assign(item, {
                        cookies: document.cookie,
                        token: poalimAsakimNew.xsrfToken,
                        numberOfOperations: item.isChecks ? poalimAsakimNew.numberOfOperationsChecks : ((item.isCheck) ? poalimAsakimNew.numberOfOperationsChecks : poalimAsakimNew.numberOfOperationsMatah),
                    })
                    if (window.navigator.platform.indexOf('Win') === -1 && !window.all.banks.vpnConnected) {
                        params['proxy'] = ('http://brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '') + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225');
                    }
                    parallelReq(params, function (output) {
                        if (output.response.some(item => item.headers && item.headers.location && ["getLogonPageIski", "Error", "exit.html"].some(urlPart => (item.headers.location).includes(urlPart)))) {
                            let err = new Error("Redirected to perhaps because of another otp session started somewhere. Terminating with error.");
                            if (item.headers.location === 'https://misc.poalim-site.co.il/Error_Pages/5/New/ErrorNew_5.html') {
                                err = new Error("Redirected to " + item.headers.location + " perhaps because the bank announces that the service is temporarily unavailable.");
                            }
                            all.banks.core.services.errorLog(err);
                            poalimAsakimNew.haltAndWaitForReload = true;
                            poalimAsakimNew.logOutNew();
                            return;
                        }

                        if (output.response.some(item => item.error !== false)) {
                            if (!poalimAsakimNew.loginRenewFun) {
                                poalimAsakimNew.loginRenewFun = true;
                                setTimeout(() => {
                                    poalimAsakimNew.loginRenewFun = false;
                                    timeOfTriedOn += 1;
                                    if (timeOfTriedOn < 10) {
                                        setTimeout(() => {
                                            callWs()
                                        }, 1000)
                                    } else {
                                        poalimAsakimNew.haltAndWaitForReload = true;
                                        poalimAsakimNew.logOutNew();
                                    }
                                    // all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/ng-portals/biz/he/homepage", 'GET', null, false, false)
                                    //     .then(() => {
                                    //         resolveCookies().then(() => {
                                    //
                                    //         });
                                    //     });
                                }, 3000)
                            }
                        } else {
                            resolve(output);
                        }
                    })
                }
                if (!poalimAsakimNew.loginRenewFun) {
                    callWs()
                } else {
                    setTimeout(() => {
                        callWs()
                    }, 4000)
                }
            });
        }

        function resolveCookies() {
            return new Promise(resolve => {
                win.cookies.getAll({}, function (cool) {
                    cool.forEach(function (v) {
                        if (!v.domain.includes('bizibox')) {
                            document.cookie = v.name + "=" + v.value + ";";
                        }
                    })
                    resolve(true);
                });
            });
        }

        function timeoutSpace() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(true);
                }, 1500);
            });
        }

        async function parallel() {
            async function parallelSlices(idxArr) {
                console.log(('תחילת ריצת '
                    +
                    poalimAsakimNew.numberOfOperationsMatah
                    +
                    ' חשבונות נוספים, אינדקס מספר: '
                    +
                    idxArr));
                const slicePos = (Number(poalimAsakimNew.numberOfOperationsMatah) * idxArr);
                const argsCopy = [].concat(listOfArguments.slice((slicePos), (slicePos + Number(poalimAsakimNew.numberOfOperationsMatah))).map((val, ind) => ({
                    val,
                    ind
                })));
                const result = new Array(listOfArguments.slice((slicePos), (slicePos + Number(poalimAsakimNew.numberOfOperationsMatah))).length);
                const promises = new Array(Number(poalimAsakimNew.numberOfOperationsMatah)).fill(Promise.resolve()); //set how many items will run parallel together

                function chainNext(p) {
                    if (argsCopy.length) {
                        const arg = argsCopy.shift();
                        return p.then(() => {
                            const operationPromise = asyncOperation(arg.val).then(r => {
                                console.log('סיום ריצת חשבון-----' + arg.ind, r);
                                result[arg.ind] = r;
                            });
                            return chainNext(operationPromise);
                        });
                    }
                    return p;
                }

                await Promise.all(promises.map(chainNext));
                console.log(('סיום ריצת '
                    +
                    Number(poalimAsakimNew.numberOfOperationsMatah)
                    +
                    ' חשבונות נוספים, אינדקס מספר: '
                    +
                    idxArr), result);
                return result;
            }

            let resultArray = [];
            let listNum = 0;
            for (let idx = 0; idx < listOfArgumentsSlice; idx++) {
                const result = await parallelSlices(idx);
                resultArray = resultArray.concat(result);

                // if (listOfArgumentsSlice > Number(poalimAsakimNew.numOfAccForRenewLoginMatah)) {
                //     await all.banks.accounts.poalimAsakimNew.renewLogin();
                // } else if (idx !== 0 && Number.isInteger(idx / Math.round(Number(poalimAsakimNew.numOfAccForRenewLoginMatah) / listOfArgumentsSlice))) {
                //     await all.banks.accounts.poalimAsakimNew.renewLogin();
                // }

                const currentNumAcc = ((idx + 1) * Number(poalimAsakimNew.numberOfOperationsMatah));
                const floorNum = Math.floor(currentNumAcc / Number(poalimAsakimNew.numOfAccForRenewLoginMatah))
                if (listNum !== floorNum) {
                    listNum = floorNum;
                    await all.banks.accounts.poalimAsakimNew.renewLogin();
                }
                await timeoutSpace();
            }
            return resultArray;
        }


        // async function parallel() {
        // 	const argsCopy = [].concat(listOfArguments.map((val, ind) => ({val, ind})));
        // 	const result = new Array(listOfArguments.length);
        // 	const promises = new Array(poalimAsakimNew.numberOfOperations).fill(Promise.resolve()); //set how many items will run parallel together
        //
        // 	function chainNext(p) {
        // 		if (argsCopy.length) {
        // 			const arg = argsCopy.shift();
        // 			return p.then(() => {
        // 				const operationPromise = asyncOperation(arg.val).then(r => {
        // 					result[arg.ind] = r;
        // 				});
        // 				return chainNext(operationPromise);
        // 			});
        // 		}
        // 		return p;
        // 	}
        //
        // 	await Promise.all(promises.map(chainNext));
        // 	return result;
        // }
        parallel().then(async (res) => {
            const elapsed = Date.now() - started;
            myEmitterLogs('Finished to collect all data Osh and Transfers of all accounts at ' + (elapsed / 1000) + 'ms');
            // clearInterval(alive);
            myEmitterLogs('Start to prepare Checks, A division of accounts types that include checks or not at all');
            poalimAsakimNew.loadDepositsNew();
        });
    };
    poalimAsakimNew.sendOshCtrl = function () {
        all.banks.core.services.sendOsh(all.banks.generalVariables.allDataArr)
            .then(function (arr) {
                myEmitterLogs(29);
                all.banks.generalVariables.numChecksDrawn = 0;
                all.banks.generalVariables.numChecksNotWithdrawn = 0;

                if (!poalimAsakimNew.newAcc) {
                    if (all.banks.accounts.poalimAsakimNew.vddVal.IND_CCARD_DATA > 0) {
                        myEmitterLogs(14);
                        all.banks.accounts.poalimAsakimNew.loadAsharaiPrev(all.banks.accounts.poalimAsakimNew.vddVal.BANK_SNIF_ACCOUNT_KEY)
                    } else if (all.banks.accounts.poalimAsakimNew.vddVal.IND_NILVIM > 0) {
                        myEmitterLogs(17);
                        all.banks.accounts.poalimAsakimNew.loadDeposits();
                    } else if (all.banks.accounts.poalimAsakimNew.vddVal.MATAH_DAY_TO_RUN > 0) {
                        myEmitterLogs(34);
                        all.banks.accounts.poalimAsakimNew.loadMatah();
                    } else {
                        if (all.banks.accountDetails.bank.arrDDAll.length > 1 && (all.banks.accounts.poalimAsakimNew.accNum + 1 < all.banks.accountDetails.bank.arrDDAll.length)) {
                            all.banks.accounts.poalimAsakimNew.accNum = all.banks.accounts.poalimAsakimNew.accNum + 1;
                            all.banks.accounts.poalimAsakimNew.loadOsh();
                        } else {
                            all.banks.accounts.poalimAsakimNew.logOut()
                        }
                    }
                } else {
                    if (all.banks.accounts.poalimAsakimNew.vddVal.IND_CCARD_DATA > 0) {
                        myEmitterLogs(14);
                        poalimAsakimNew.counterCardPrev = 0;
                        all.banks.generalVariables.allDataArrAshrai = [];
                        all.banks.accounts.poalimAsakimNew.loadAsharaiPrevNew();
                    } else if (all.banks.accounts.poalimAsakimNew.vddVal.IND_NILVIM > 0) {
                        myEmitterLogs(17);
                        all.banks.accounts.poalimAsakimNew.loadDepositsNew();
                    } else if (all.banks.accounts.poalimAsakimNew.vddVal.MATAH_DAY_TO_RUN > 0) {
                        myEmitterLogs(34);
                        all.banks.accounts.poalimAsakimNew.loadMatahNew();
                    } else {
                        if (all.banks.accountDetails.bank.arrDDAll.length > 1 && (all.banks.accounts.poalimAsakimNew.accNum + 1 < all.banks.accountDetails.bank.arrDDAll.length)) {
                            all.banks.accounts.poalimAsakimNew.accNum = all.banks.accounts.poalimAsakimNew.accNum + 1;
                            all.banks.accounts.poalimAsakimNew.loadOsh();
                        } else {
                            poalimAsakimNew.logOutNew();
                        }
                    }
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.poalimAsakimNew.sendOshCtrl()
                }
            })
    };
    poalimAsakimNew.sendChecksCtrl = function (formData) {
        all.banks.core.services.sendChecks(formData)
            .then(function (arr) {
                all.banks.generalVariables.numChecksDrawn += 1;
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.poalimAsakimNew.sendChecksCtrl(formData)
                }
            })
    };
    poalimAsakimNew.sendChecksCtrlNew = function (formData) {
        var dfd = jQuery.Deferred();

        function senderChecks() {
            all.banks.core.services.sendChecks(formData)
                .then(function (arr) {
                    if (arr.status == undefined) {
                        dfd.resolve(true);
                    } else if (arr.status !== 200) {
                        dfd.reject(true);
                    }
                    all.banks.generalVariables.numChecksDrawn = all.banks.generalVariables.numChecksDrawn + 1;
                })
                .fail(function (error, resErr) {
                    if (error == 'discard') {
                        senderChecks()
                    }
                });
        }

        senderChecks()
        return dfd.promise();
    };
    poalimAsakimNew.sendCardsCtrl = function () {
        if (poalimAsakimNew.haltAndWaitForReload === true) {
            return;
        }

        all.banks.core.services.sendCards(all.banks.generalVariables.allDataArrAshrai)
            .then(function (arr) {
                all.banks.generalVariables.allDataArrAshrai = [];
                if (all.banks.accounts.poalimAsakimNew.vddVal.IND_NILVIM > 0) {
                    if (!poalimAsakimNew.newAcc) {
                        myEmitterLogs(17);
                        all.banks.accounts.poalimAsakimNew.loadDeposits();
                    } else {
                        myEmitterLogs(17);
                        poalimAsakimNew.loadDepositsNew();
                    }
                } else if (all.banks.accounts.poalimAsakimNew.vddVal.MATAH_DAY_TO_RUN > 0) {
                    if (!poalimAsakimNew.newAcc) {
                        myEmitterLogs(34);
                        all.banks.accounts.poalimAsakimNew.loadMatah();
                    } else {
                        myEmitterLogs(34);
                        all.banks.accounts.poalimAsakimNew.loadMatahNew();
                    }
                } else {
                    all.banks.accounts.poalimAsakimNew.accNum = all.banks.accounts.poalimAsakimNew.accNum + 1;
                    all.banks.accounts.poalimAsakimNew.loadOsh();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.poalimAsakimNew.sendCardsCtrl()
                }
            })
    };
    poalimAsakimNew.sendPikdonotCtrl = function (allDataArrDeposits) {
        return new Promise(resolve => {
            if (poalimAsakimNew.haltAndWaitForReload === true) {
                return;
            }
            const callWs = function () {
                all.banks.core.services.sendPikdonot(allDataArrDeposits)
                    .then(function (arr) {
                        myEmitterLogs(21);
                        resolve(true);
                    })
                    .fail(async function (error, resErr) {
                        if (error === 'discard') {
                            callWs()
                        } else {
                            resolve(true);
                        }
                    });
            }
            callWs();
        });
    };
    poalimAsakimNew.sendLoanCtrl = function (allDataArrLoan) {
        return new Promise(resolve => {
            if (poalimAsakimNew.haltAndWaitForReload === true) {
                return;
            }
            const callWs = function () {
                all.banks.core.services.sendLoan(allDataArrLoan)
                    .then(function (arr) {
                        myEmitterLogs(19);
                        resolve(true);
                    })
                    .fail(function (error, resErr) {
                        if (error == 'discard') {
                            callWs()
                        } else {
                            resolve(true);
                        }
                    })
            }
            callWs();
        });
    };
    poalimAsakimNew.sendDueChecksCtrl = function (allDataArrDueChecks) {
        return new Promise(resolve => {
            if (poalimAsakimNew.haltAndWaitForReload === true) {
                return;
            }
            const callWs = function () {
                all.banks.core.services.sendDueChecks(allDataArrDueChecks)
                    .then(function (arr) {
                        resolve(true);
                    })
                    .fail(function (error, resErr) {
                        if (error == 'discard') {
                            callWs()
                        } else {
                            resolve(true);
                        }
                    })
            }
            callWs();
        });
    };
    poalimAsakimNew.sendStandingOrdersCtrl = function (allDataArrDueChecks) {
        return new Promise(resolve => {
            if (poalimAsakimNew.haltAndWaitForReload === true) {
                return;
            }
            const callWs = function () {
                all.banks.core.services.sendStandingOrders(allDataArrDueChecks)
                    .then(function (arr) {
                        resolve(true);
                    })
                    .fail(function (error, resErr) {
                        if (error === 'discard') {
                            callWs()
                        } else {
                            resolve(true);
                        }
                    })
            }
            callWs();
        });
    };
    poalimAsakimNew.sendMatahCtrl = function () {
//                if(poalimAsakimNew.indPoalim122 && !poalimAsakimNew.newAcc) {
//                    Object.assign(all.banks.generalVariables.allDataArr, {"OtpOld": true});
//                }
        all.banks.core.services.sendOsh(all.banks.generalVariables.allDataArr, true)
            .then(function (arr) {
                all.banks.accounts.poalimAsakimNew.accNum = all.banks.accounts.poalimAsakimNew.accNum + 1;
                all.banks.accounts.poalimAsakimNew.loadOsh();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.poalimAsakimNew.sendMatahCtrl()
                }
            })
    }
    poalimAsakimNew.getBase64FromImageUrlNew = function (urlXhrCheck, deta) {
        var dfd = jQuery.Deferred();
        poalimAsakimNew.getBase64FromImageUrlCounter += 1;
        all.banks.core.services.httpReq(urlXhrCheck, 'GET', null, false, false)
            .then(function (data) {
                poalimAsakimNew.getBase64FromImageUrlCounter = 0;
                try {
                    var arrList = [];
                    if (data !== undefined && data.list !== undefined && data.list.length > 0) {
                        $(data.list).each(function (index, v) {
                            var uuid = parseInt(v.bank) + '' + parseInt(v.branch) + '' + parseInt(v.account) + '' + parseInt(v.number) + '' + parseInt(deta.originalEventCreateDate) + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[0].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[0].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[0].AccountNumber;
                            arrList.push({
                                "Asmachta": deta.referenceNumber || v.number,
                                "CheckAccountNumber": v.account,
                                "DepositeDate": deta.originalEventCreateDate || v.transactionDate,
                                "CheckBankNumber": v.bank,
                                "CheckBranchNumber": v.branch,
                                "CheckNumber": v.number,
                                "CheckTotal": v.amount,
                                "ImageNameKey": uuid,
                                "url": v.imageFrontLink && v.imageFrontLink.length > 0 && v.imageFrontLink.indexOf('000000000000000000000.png') === -1
                                    ? [v.imageFrontLink, v.imageBackLink]
                                        .filter(lnk => lnk && !lnk.includes('000000000000000000000.png'))
                                        .map(lnk => ('https://biz2.bankhapoalim.co.il' + lnk))
                                    : undefined
                            });
                            if (data.list.length == index + 1) {
                                dfd.resolve(arrList);
                            }
                        })
                    } else {
                        all.banks.generalVariables.numChecksNotWithdrawn += 1;
                        dfd.resolve([{
                            "ImageNameKey": "x"
                        }]);
                    }
                } catch (err) {
                    all.banks.core.services.errorLog(err)
                }
            })
            .fail(function (error, resErr) {
                if (poalimAsakimNew.getBase64FromImageUrlCounter < 5) {
                    dfd.reject(null);
                } else {
                    poalimAsakimNew.getBase64FromImageUrlCounter = 0;
                    all.banks.generalVariables.numChecksNotWithdrawn += 1;
                    dfd.resolve([{
                        "ImageNameKey": "x"
                    }]);
                }
            })
        return dfd.promise();
    };
    poalimAsakimNew.loadNextOsh = function (isNewNext) {
        myEmitterLogs(31);
        var req = {
            'input_fromAgg': 'SELECT_ACC',
            'reqName': poalimAsakimNew.varGlobal.reqName,
            'transactionId': poalimAsakimNew.varGlobal.transactionId,
            'menuParam': poalimAsakimNew.varGlobal.menuParam,
            'PGcode': poalimAsakimNew.varGlobal.PGcode,
            'step': poalimAsakimNew.varGlobal.step,
            'u': poalimAsakimNew.varGlobal.u,
            'tcfo': poalimAsakimNew.varGlobal.tcfo,
            'tsfo': '0',
            'mmx': poalimAsakimNew.varGlobal.mmx,
            'fromSubMenu': poalimAsakimNew.varGlobal.fromSubMenu,
            'qwrt': poalimAsakimNew.varGlobal.qwrt,
            'mpux': poalimAsakimNew.varGlobal.mpux,
            'targetView': poalimAsakimNew.varGlobal.targetView,
            'dwx': poalimAsakimNew.varGlobal.dwx,
            'dwxReq': poalimAsakimNew.varGlobal.dwxReq,
            'dwxOp': poalimAsakimNew.varGlobal.dwxOp,
            'doc_key': poalimAsakimNew.varGlobal.doc_key,
            'callerTid': poalimAsakimNew.varGlobal.callerTid,
            'WTcomeFrom': poalimAsakimNew.varGlobal.WTcomeFrom,
            'accountIndex': all.banks.accounts.poalimAsakimNew.indDDAll(all.banks.accounts.poalimAsakimNew.vddVal.BANK_SNIF_ACCOUNT_KEY),
            'no_Bank': poalimAsakimNew.varGlobal.no_Bank,
            'no_Snif': poalimAsakimNew.varGlobal.no_Snif,
            'no_Acc': poalimAsakimNew.varGlobal.no_Acc,
            'shelav': poalimAsakimNew.varGlobal.shelav,
            'answerMe': 'no',
            'goNext': 'yes',
            'goBack': poalimAsakimNew.varGlobal.goBack,
            'PageActive': all.banks.accounts.poalimAsakimNew.indexPage,
            'lastThreeMonthActions': poalimAsakimNew.varGlobal.lastThreeMonthActions,
            'dateRangeSelect': poalimAsakimNew.varGlobal.dateRangeSelect,
            'toDateCalander': all.banks.accounts.poalimAsakimNew.vddVal.datebacksleshTo,
            'fromDateCalander': all.banks.accounts.poalimAsakimNew.vddVal.datebackslesh
        };
        if (isNewNext) {
            req.answerMe = "yes";
            req.reqName = "action";
            req.transactionId = "HomePagePoalim";
            req.goNext = "a";
        }
        all.banks.core.services.httpReq("https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc", 'POST', req, true, false)
            .then(function (res, bbb, ccc) {
                req = null;
                var $$ = all.banks.core.services.parseHtml(res);
                res = null;
                var ts = $$.find('input[name="ts"]').val();
                var u = $$.find('input[name="u"]').val();
                var dwx = $$.find('input[name="dwx"]').val();
                var tcfo = $$.find('input[name="tcfo"]').val();
                var qwrt = $$.find('input[name="qwrt"]').val();
                var tsfo = $$.find('input[name="tsfo"]').val();
                var mmx = $$.find('input[name="mmx"]').val();
                var reqName = $$.find('input[name="reqName"]').val();
                var transactionId = $$.find('input[name="transactionId"]').val();
                var menuParam = $$.find('input[name="menuParam"]').val();
                var PGcode = $$.find('input[name="PGcode"]').val();
                var step = $$.find('input[name="step"]').val();
                var fromSubMenu = $$.find('input[name="fromSubMenu"]').val();
                var mpux = $$.find('input[name="mpux"]').val();
                var targetView = $$.find('input[name="targetView"]').val();
                var dwxReq = $$.find('input[name="dwxReq"]').val();
                var dwxOp = $$.find('input[name="dwxOp"]').val();
                var doc_key = $$.find('input[name="doc_key"]').val();
                var callerTid = $$.find('input[name="callerTid"]').val();
                var WTcomeFrom = $$.find('input[name="WTcomeFrom"]').val();
                var no_Bank = $$.find('input[name="no_Bank"]').val();
                var no_Snif = $$.find('input[name="no_Snif"]').val();
                var no_Acc = $$.find('input[name="no_Acc"]').val();
                var shelav = $$.find('input[name="shelav"]').val();
                var goBack = $$.find('input[name="goBack"]').val();
                var lastThreeMonthActions = $$.find('input[name="lastThreeMonthActions"]').val();
                var dateRangeSelect = $$.find('input[name="dateRangeSelect"]').val();
                poalimAsakimNew.varGlobal = {
                    ts: ts,
                    u: u,
                    dwx: dwx,
                    tcfo: tcfo,
                    qwrt: qwrt,
                    tsfo: tsfo,
                    mmx: mmx,
                    reqName: reqName,
                    transactionId: transactionId,
                    menuParam: menuParam,
                    PGcode: PGcode,
                    step: step,
                    fromSubMenu: fromSubMenu,
                    mpux: mpux,
                    targetView: targetView,
                    dwxReq: dwxReq,
                    dwxOp: dwxOp,
                    doc_key: doc_key,
                    callerTid: callerTid,
                    WTcomeFrom: WTcomeFrom,
                    no_Bank: no_Bank,
                    no_Snif: no_Snif,
                    no_Acc: no_Acc,
                    shelav: shelav,
                    goBack: goBack,
                    lastThreeMonthActions: lastThreeMonthActions,
                    dateRangeSelect: dateRangeSelect
                };

                var expires = ccc.getResponseHeader("X-FRAME-OPTIONS");
                if (expires == null) {
                    poalimAsakimNew.setNewTime(function () {
                        poalimAsakimNew.loadNextOsh()
                    });
                    //all.banks.accounts.poalimAsakimNew.logOut();
                    $$ = null;
                } else {
                    var mytableBody = $$.find('#mytable_body');
                    var buttonAction = $$.find('input#buttonAction[btnuniqid="BtnContinue"]');
                    var len = mytableBody.find('tr').length;
                    $$ = null;
                    if (mytableBody.length > 0) {
                        var dateLastNotCollect = null;
                        if ((!buttonAction.length || (buttonAction.val().indexOf('המשך') == -1)) && all.banks.accounts.poalimAsakimNew.indexPage > 8) {
                            var rowLast = mytableBody.find('tr.TR_ROW_BANKTABLE:last')[0];
                            if (rowLast.cells[5] == undefined) {
                                rowLast = mytableBody.find('tr.TR_ROW_BANKTABLE').eq(mytableBody.find('tr.TR_ROW_BANKTABLE').length - 2)[0];
                            }
                            var datesRowLast = rowLast.cells[5].innerText.replace(/\s/g, "").replace(/,/g, '');
                            var valueDateLast;
                            if (datesRowLast.length == 5) {
                                if (all.banks.accounts.poalimAsakimNew.onlyMonthBetween.toString().length == 4) {
                                    valueDateLast = all.banks.accounts.poalimAsakimNew.onlyMonthBetween + '' + datesRowLast.split('/')[1] + '' + datesRowLast.split('/')[0];
                                } else {
                                    if (all.banks.accounts.poalimAsakimNew.onlyMonthBetween <= parseFloat(datesRowLast.split('/')[1])) {
                                        valueDateLast = (new Date().getFullYear() - 1) + '' + datesRowLast.split('/')[1] + '' + datesRowLast.split('/')[0];
                                    } else {
                                        valueDateLast = new Date().getFullYear() + '' + datesRowLast.split('/')[1] + '' + datesRowLast.split('/')[0];
                                    }
                                }
                            } else {
                                valueDateLast = '20' + datesRowLast.split('/')[2] + '' + datesRowLast.split('/')[1] + '' + datesRowLast.split('/')[0];
                            }
                            var dateFormatNow = new Date();
                            var dateNowAhora = dateFormatNow.getFullYear() + "" + ("0" + (dateFormatNow.getMonth() + 1)).slice(-2) + "" + ("0" + dateFormatNow.getDate()).slice(-2);
                            if (Number(valueDateLast) < Number(dateNowAhora)) {
                                dateLastNotCollect = valueDateLast;
                            }
                        }

                        mytableBody.find('tr').each(function (i, v) {
                            if ($(v).hasClass('TR_TOTAL')) {
                                all.banks.accounts.poalimAsakimNew.totalPeulotDays = 1;
                            }
                            if (v.cells.length == 2 && $(v).hasClass('TR_ROW_BANKTABLE')) {
                                var resultTransDescTextWithOutSpaces = '';
                                var arrSp = v.cells[0].innerText.replace(/\n|\r/g, "").split(' ');
                                $.each(arrSp, function (index, value) {
                                    if (value != "") {
                                        resultTransDescTextWithOutSpaces += value + ' ';
                                    }
                                });
                                var transDescText = resultTransDescTextWithOutSpaces.trim() + ' ' + all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow[all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length - 1].TransDesc;
                                all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow[all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length - 1].TransDesc = transDescText;
                            }
                            if (v.cells.length == 6 && $(v).hasClass('TR_ROW_BANKTABLE')) {
                                var sum = null;
                                var sumZehut = v.cells[1].innerText.replace(/\s/g, "");
                                var sumHova = v.cells[2].innerText.replace(/\s/g, "");
                                var transactionType = null;
                                if (sumZehut == '') {
                                    sum = poalimAsakimNew.returnClearSum(sumHova);
                                    transactionType = '0';
                                } else {
                                    sum = poalimAsakimNew.returnClearSum(sumZehut);
                                    transactionType = '1';
                                }

                                var datesRow = v.cells[5].innerText.replace(/\s/g, "").replace(/,/g, '');
                                var valueDate;
                                if (datesRow.length == 5) {
                                    if (all.banks.accounts.poalimAsakimNew.onlyMonthBetween.toString().length == 4) {
                                        valueDate = all.banks.accounts.poalimAsakimNew.onlyMonthBetween + '' + datesRow.split('/')[1] + '' + datesRow.split('/')[0];
                                    } else {
                                        const valDatePrevYearCandidateDate = new Date(new Date().getFullYear() - 1, datesRow.split('/')[1] - 1, datesRow.split('/')[0]);
                                        if (all.banks.accounts.poalimAsakimNew.onlyMonthBetween <= parseFloat(datesRow.split('/')[1])
                                            && valDatePrevYearCandidateDate >= all.banks.accountDetails.dateFrom) {
                                            valueDate = valDatePrevYearCandidateDate.getFullYear()
                                                + "" + ("0" + (valDatePrevYearCandidateDate.getMonth() + 1)).slice(-2)
                                                + "" + ("0" + valDatePrevYearCandidateDate.getDate()).slice(-2);
                                        } else {
                                            valueDate = new Date().getFullYear() + '' + datesRow.split('/')[1] + '' + datesRow.split('/')[0];
                                        }
                                    }
                                } else {
                                    valueDate = '20' + datesRow.split('/')[2] + '' + datesRow.split('/')[1] + '' + datesRow.split('/')[0];
                                }

                                var transDescTd = $(v.cells[4]).find('script')[0];

                                var transDesc = "";
                                var asmachta = null;
                                var checksIcon = null;
                                var scrSplitCheck = transDescTd.text.split(',');
                                if (scrSplitCheck.length > 1) {
                                    if (scrSplitCheck[4] !== undefined) {
                                        var transDesc = scrSplitCheck[4].replace(/'/g, '').slice(1);
                                        if (transDesc == "") {
                                            transDesc = scrSplitCheck[5].replace(/'/g, '').slice(1);
                                        }
                                    } else {
                                        if (scrSplitCheck[5] !== undefined) {
                                            transDesc = scrSplitCheck[5].replace(/'/g, '').slice(1);
                                        }
                                    }

                                    if (scrSplitCheck[2] !== undefined) {
                                        asmachta = scrSplitCheck[2].replace(/\D/g, "");
                                    }
                                    if (scrSplitCheck[0] !== undefined) {
                                        if (scrSplitCheck[0].replace(/\D/g, "").length && all.banks.accounts.poalimAsakimNew.vddVal.CHECKPIC_DAYS_TO_RUN > 0) {
                                            if (scrSplitCheck[9] !== undefined && scrSplitCheck[9].indexOf('ChecksImageOut') !== -1) {
                                                checksIcon = "https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=action&transactionId=ChecksImageOut&checkDate=" + scrSplitCheck[0].split('"')[1] + "&checkSum=" + parseInt(scrSplitCheck[1].replace(/\s/g, "").replace(/"/g, '')) + "&areh_apaula=" + scrSplitCheck[7].replace(/\s/g, "").replace(/'/g, '') + '' + scrSplitCheck[9].split("'")[1] + "&toDateCalander=" + all.banks.accounts.poalimAsakimNew.vddVal.datebacksleshTo + "&fromDateCalander=" + all.banks.accounts.poalimAsakimNew.vddVal.datebackslesh + "&TIUR_PAULA=237*233*247*233*249*32*250*227*247*244*228&checkAsmahta=" + scrSplitCheck[2].replace(/\s/g, "").replace(/"/g, '').replace(/\D/g, "");
                                            } else {
                                                checksIcon = "https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=action&transactionId=ChecksImage&checkDate=" + scrSplitCheck[0].split('"')[1] + "&checkSum=" + scrSplitCheck[1].replace(/\s/g, "").replace(/"/g, '') + "&areh_apaula=" + scrSplitCheck[7].replace(/\s/g, "").replace(/'/g, '') + "&toDateCalander=" + all.banks.accounts.poalimAsakimNew.vddVal.datebacksleshTo + "&fromDateCalander=" + all.banks.accounts.poalimAsakimNew.vddVal.datebackslesh + "&checkAsmahta=" + scrSplitCheck[2].replace(/\s/g, "").replace(/"/g, '').replace(/\D/g, "") + "&&pSubMenu=Shekel&fromSubMenu=Shekel&bxx=912&nsv=y&dwx=" + poalimAsakimNew.varGlobal.dwx + "&wScr=1920&hScr=1080&tcfo=" + poalimAsakimNew.varGlobal.tcfo + "&mmx=" + poalimAsakimNew.varGlobal.mmx + "&qwrt=" + poalimAsakimNew.varGlobal.qwrt + "&dtcdb=0&menuTranName=HomePagePoalim";
                                            }
                                        }
                                    }
                                } else {
                                    asmachta = v.cells[3].innerText.replace(/\D/g, "");
                                    if (asmachta == "") {
                                        asmachta = null;
                                    }
                                    eval(transDescTd.text);

                                    function writ(t) {
                                        transDesc = $(t).text().replace(/\s\s+/g, " ");
                                    }
                                }

                                if (dateLastNotCollect == null || (dateLastNotCollect !== null && dateLastNotCollect !== valueDate)) {
                                    all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.push({
                                        "Asmachta": parseFloat(asmachta),
                                        "TransDesc": transDesc,
                                        "ValueDate": valueDate,
                                        "TransactionType": transactionType,
                                        "TransTotal": poalimAsakimNew.returnClearSum(sum),
                                        "Balance": poalimAsakimNew.returnClearSum(v.cells[0].innerText),
                                        "IsDaily": all.banks.accounts.poalimAsakimNew.totalPeulotDays,
                                        "imgs": checksIcon
                                    })
                                    all.banks.generalVariables.allDataArr.BankData[0].Account[0].Balance = parseFloat(poalimAsakimNew.returnClearSum(v.cells[0].innerText));
                                }
                            }
                            if (len == i + 1) {
                                if (buttonAction.length && (buttonAction.val().indexOf('המשך') !== -1)) {
                                    all.banks.accounts.poalimAsakimNew.indexPage = all.banks.accounts.poalimAsakimNew.indexPage + 1;
                                    all.banks.accounts.poalimAsakimNew.loadNextOsh();
                                } else {
                                    var lenArr = all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow;
                                    var dateFormatNow = new Date();
                                    var dateNowAhora = dateFormatNow.getFullYear() + "" + ("0" + (dateFormatNow.getMonth() + 1)).slice(-2) + "" + ("0" + dateFormatNow.getDate()).slice(-2);
                                    var dateLastObj = lenArr[lenArr.length - 1].ValueDate;

                                    var dateFromNew2 = new Date(parseFloat(dateLastObj.substring(0, 4)), parseFloat(dateLastObj.substring(4, 6)) - 1, parseFloat(dateLastObj.substring(6, 8)));
//								dateFromNew2.setDate(dateFromNew2.getDate() - 1);
                                    var dateLastObj2 = dateFromNew2.getFullYear() + '' + ("0" + (dateFromNew2.getMonth() + 1)).slice(-2) + '' + ("0" + (dateFromNew2.getDate())).slice(-2);
                                    var datebackslesh2 = ("0" + (dateFromNew2.getDate())).slice(-2) + '/' + ("0" + (dateFromNew2.getMonth() + 1)).slice(-2) + '/' + dateFromNew2.getFullYear();

                                    if (all.banks.accounts.poalimAsakimNew.indexPage > 8 && Number(dateLastObj) < Number(dateNowAhora)) {
                                        var n = all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length - 1;
                                        for (; n > 0 && lenArr[n].ValueDate === dateLastObj; n--) {
                                        }

                                        if ((all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length - n) <= 1200) {
                                            all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.splice(n + 1);
                                        } else {
                                            dateFromNew2.setDate(dateFromNew2.getDate() + 1);
                                            datebackslesh2 = ("0" + (dateFromNew2.getDate())).slice(-2)
                                                + '/' + ("0" + (dateFromNew2.getMonth() + 1)).slice(-2)
                                                + '/' + dateFromNew2.getFullYear();
                                        }
//									for (var n = 0; n < all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length; n++) {
//										if (all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow[n].ValueDate == dateLastObj || all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow[n].ValueDate == dateLastObj2) {
//											all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.splice(n, 1);
//											n = n - 1;
//										}
//									}

                                        all.banks.accounts.poalimAsakimNew.indexPage = 1;
                                        // var dateFromNew = new Date(parseFloat(dateLastObj.substring(0, 4)), parseFloat(dateLastObj.substring(4, 6)) - 1, parseFloat(dateLastObj.substring(6, 8)));
                                        // var datebackslesh = ("0" + (dateFromNew.getDate())).slice(-2) + '/' + ("0" + (dateFromNew.getMonth() + 1)).slice(-2) + '/' + dateFromNew.getFullYear();
                                        // all.banks.accounts.poalimAsakimNew.vddVal.datebackslesh = datebackslesh;
                                        // all.banks.accounts.poalimAsakimNew.loadNextOsh(true, dateLastObj);

                                        all.banks.accounts.poalimAsakimNew.vddVal.datebackslesh = datebackslesh2;
                                        all.banks.accounts.poalimAsakimNew.loadNextOsh(true, dateLastObj2);
                                    } else {
                                        all.banks.accounts.poalimAsakimNew.loadCheck();
                                    }
                                }
                            }
                        })
                    } else {
                        if (buttonAction.length && (buttonAction.val().indexOf('המשך') !== -1)) {
                            all.banks.accounts.poalimAsakimNew.indexPage = all.banks.accounts.poalimAsakimNew.indexPage + 1;
                            all.banks.accounts.poalimAsakimNew.loadNextOsh();
                        } else {
                            var lenArr = all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow;
                            var dateFormatNow = new Date();
                            var dateNowAhora = dateFormatNow.getFullYear() + "" + ("0" + (dateFormatNow.getMonth() + 1)).slice(-2) + "" + ("0" + dateFormatNow.getDate()).slice(-2);
                            var dateLastObj = lenArr[lenArr.length - 1].ValueDate;

                            var dateFromNew2 = new Date(parseFloat(dateLastObj.substring(0, 4)), parseFloat(dateLastObj.substring(4, 6)) - 1, parseFloat(dateLastObj.substring(6, 8)));
                            dateFromNew2.setDate(dateFromNew2.getDate() - 1);
                            var dateLastObj2 = dateFromNew2.getFullYear() + '' + ("0" + (dateFromNew2.getMonth() + 1)).slice(-2) + '' + ("0" + (dateFromNew2.getDate())).slice(-2);
                            var datebackslesh2 = ("0" + (dateFromNew2.getDate())).slice(-2) + '/' + ("0" + (dateFromNew2.getMonth() + 1)).slice(-2) + '/' + dateFromNew2.getFullYear();

                            if (all.banks.accounts.poalimAsakimNew.indexPage > 8 && Number(dateLastObj) < Number(dateNowAhora)) {
                                for (var n = 0; n < all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length; n++) {
                                    if (all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow[n].ValueDate == dateLastObj || all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow[n].ValueDate == dateLastObj2) {
                                        all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.splice(n, 1);
                                        n = n - 1;
                                    }
                                }
                                all.banks.accounts.poalimAsakimNew.indexPage = 1;
                                // var dateFromNew = new Date(parseFloat(dateLastObj.substring(0, 4)), parseFloat(dateLastObj.substring(4, 6)) - 1, parseFloat(dateLastObj.substring(6, 8)));
                                // var datebackslesh = ("0" + (dateFromNew.getDate())).slice(-2) + '/' + ("0" + (dateFromNew.getMonth() + 1)).slice(-2) + '/' + dateFromNew.getFullYear();
                                all.banks.accounts.poalimAsakimNew.vddVal.datebackslesh = datebackslesh2;
                                all.banks.accounts.poalimAsakimNew.loadNextOsh(true, dateLastObj2);
                            } else {
                                all.banks.accounts.poalimAsakimNew.loadCheck();
                            }
                        }
                    }
                }
            })
            .fail(function (error, resErr, urlParam) {
                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                all.banks.core.services.errorLog(logErr)
            });
    }
    poalimAsakimNew.loadCheck = function () {
        if (all.banks.accounts.poalimAsakimNew.vddVal.CHECKPIC_DAYS_TO_RUN > 0) {
            all.banks.accounts.poalimAsakimNew.indexTwo++;
            if (all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length) {
                $(all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow).each(function (i, v) {
                    if (all.banks.accounts.poalimAsakimNew.vddVal.CHECKPIC_DAYS_TO_RUN > 0 && v.imgs !== null && Object.prototype.toString.call(v.imgs) !== '[object Array]') {
                        all.banks.core.services.httpReq(v.imgs, 'GET', null, false, false)
                            .then(function (data, bbb, ccc) {
                                var $$ = all.banks.core.services.parseHtml(data);

                                data = null;
                                var expires = ccc.getResponseHeader("X-FRAME-OPTIONS");
                                if (expires == null) {
                                    poalimAsakimNew.setNewTime(function () {
                                        poalimAsakimNew.loadCheck();
                                    });
                                    $$ = null;
                                    //	all.banks.accounts.poalimAsakimNew.logOut();
                                } else {
                                    if ($$.find('form[action="/cgi-bin/poalwwwc"]').length) {
                                        var ts = $$.find('input[name="ts"]').val();
                                        var u = $$.find('input[name="u"]').val();
                                        var dwx = $$.find('input[name="dwx"]').val();
                                        var tcfo = $$.find('input[name="tcfo"]').val();
                                        var qwrt = $$.find('input[name="qwrt"]').val();
                                        var tsfo = $$.find('input[name="tsfo"]').val();
                                        var mmx = $$.find('input[name="mmx"]').val();
                                        if (ts || u || dwx || tcfo || qwrt || tsfo || mmx) {
                                            poalimAsakimNew.varGlobal.ts = ts;
                                            poalimAsakimNew.varGlobal.u = u;
                                            poalimAsakimNew.varGlobal.dwx = dwx;
                                            poalimAsakimNew.varGlobal.tcfo = tcfo;
                                            poalimAsakimNew.varGlobal.qwrt = qwrt;
                                            poalimAsakimNew.varGlobal.tsfo = tsfo;
                                            poalimAsakimNew.varGlobal.mmx = mmx;
                                        }
                                    }

                                    var mytableBody = $$.find('#mytable_body');
                                    var frontImg = $$.find('#frontImg');
                                    var dateCheck = $$.find('#trRowTableBold > td').eq(2).find('tr').eq(4).find('td').eq(0).text().replace(/\s/g, "").split('/');
                                    if (frontImg.length) {

                                        if (frontImg.attr('src') !== undefined && frontImg.attr('src').length) {

                                            all.banks.accounts.poalimAsakimNew.indexTwo = 0;
                                            var formData = new FormData();
                                            var img = new Image();
                                            img.src = "https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il" + frontImg.attr('src');
                                            var timer = setTimeout(function (theImg) {
                                                return function () {
                                                    theImg.onerror();
                                                };
                                            }(img), 120000);
                                            monitorActivityClass.setIntervalActivity();
                                            img.onload = function () {
                                                clearTimeout(timer);

                                                var canvas = document.createElement("canvas");
                                                canvas.width = this.width;
                                                canvas.height = this.height;
                                                var ctx = canvas.getContext("2d");
                                                ctx.drawImage(this, 0, 0);
                                                var dataURL = canvas.toDataURL("image/jpeg", 0.01);
                                                var content = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                                                var uuid = parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(0).find('td').eq(0).text()) + '' + parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(1).find('td').eq(0).text()) + '' + parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(2).find('td').eq(0).text()) + '' + parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(3).find('td').eq(0).text()) + '' + dateCheck[2] + '' + dateCheck[1] + '' + dateCheck[0] + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[0].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[0].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[0].AccountNumber;
                                                var blob = new Blob([content], {
                                                    type: "text/plain"
                                                });
                                                formData.append(uuid, blob);
                                                v.imgs = [{
                                                    "Asmachta": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(3).find('td').eq(0).text()),
                                                    "CheckAccountNumber": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(2).find('td').eq(0).text()),
                                                    "DepositeDate": dateCheck[2] + '' + dateCheck[1] + '' + dateCheck[0],
                                                    "CheckBankNumber": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(0).find('td').eq(0).text()),
                                                    "CheckBranchNumber": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(1).find('td').eq(0).text()),
                                                    "CheckNumber": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(3).find('td').eq(0).text()),
                                                    "CheckTotal": poalimAsakimNew.returnClearSum($$.find('#trRowTableBold > td').eq(2).find('tr').eq(5).find('td').eq(0).text()),
                                                    "ImageNameKey": uuid
                                                }];
                                                all.banks.accounts.poalimAsakimNew.sendChecksCtrl({
                                                    formData: formData,
                                                    params: {
                                                        imagenamekey: v.imgs[0].ImageNameKey,
                                                        bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[0].BankNumber,
                                                        snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[0].BranchNumber,
                                                        accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[0].AccountNumber
                                                    }
                                                });
                                                if (all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length == i + 1) {
                                                    myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length);
                                                    all.banks.accounts.poalimAsakimNew.sendOshCtrl();
                                                    $$ = null;
                                                } else {
                                                    all.banks.accounts.poalimAsakimNew.loadCheck();
                                                    $$ = null;
                                                }
                                            };
                                            img.onerror = function () {
                                                clearTimeout(timer);

                                                v.imgs = [{
                                                    "ImageNameKey": "x"
                                                }];
                                                if (all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length == i + 1) {
                                                    myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length);
                                                    all.banks.accounts.poalimAsakimNew.sendOshCtrl();
                                                    $$ = null;
                                                } else {
                                                    all.banks.accounts.poalimAsakimNew.loadCheck();
                                                    $$ = null;
                                                }
                                            }
                                        } else {
                                            all.banks.accounts.poalimAsakimNew.indexTwo = 0;
                                            v.imgs = [{
                                                "ImageNameKey": "x"
                                            }];
                                            all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                            if (all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length == i + 1) {
                                                myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length);
                                                all.banks.accounts.poalimAsakimNew.sendOshCtrl();
                                                $$ = null;
                                            } else {
                                                all.banks.accounts.poalimAsakimNew.loadCheck();
                                                $$ = null;
                                            }
                                            // if (all.banks.accounts.poalimAsakimNew.indexTwo >= 2) {
                                            // 	all.banks.accounts.poalimAsakimNew.indexTwo = 0;
                                            // 	v.imgs = [{
                                            // 		"ImageNameKey": "x"
                                            // 	}];
                                            // 	all.banks.generalVariables.numChecksNotWithdrawn += 1;
                                            // 	if (all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length == i + 1) {
                                            // 		myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length);
                                            // 		all.banks.accounts.poalimAsakimNew.sendOshCtrl();
                                            // 		$$ = null;
                                            // 	}
                                            // 	else {
                                            // 		all.banks.accounts.poalimAsakimNew.loadCheck();
                                            // 		$$ = null;
                                            // 	}
                                            // }
                                            // else {
                                            // 	all.banks.accounts.poalimAsakimNew.loadCheck();
                                            // 	$$ = null;
                                            // }
                                        }
                                    } else {
                                        all.banks.accounts.poalimAsakimNew.indexTwo = 0;
                                        var ts = $$.find('input[name="ts"]').val();
                                        var u = $$.find('input[name="u"]').val();
                                        var dwx = $$.find('input[name="dwx"]').val();
                                        var tcfo = $$.find('input[name="tcfo"]').val();
                                        var qwrt = $$.find('input[name="qwrt"]').val();
                                        var tsfo = $$.find('input[name="tsfo"]').val();
                                        var mmx = $$.find('input[name="mmx"]').val();
                                        var dwxReq = $$.find('input[name="dwxReq"]').val();
                                        var dwxOp = $$.find('input[name="dwxOp"]').val();
                                        poalimAsakimNew.varGlobal.ts = ts;
                                        poalimAsakimNew.varGlobal.u = u;
                                        poalimAsakimNew.varGlobal.dwx = dwx;
                                        poalimAsakimNew.varGlobal.tcfo = tcfo;
                                        poalimAsakimNew.varGlobal.qwrt = qwrt;
                                        poalimAsakimNew.varGlobal.tsfo = tsfo;
                                        poalimAsakimNew.varGlobal.mmx = mmx;
                                        poalimAsakimNew.varGlobal.dwxReq = dwxReq;
                                        poalimAsakimNew.varGlobal.dwxOp = dwxOp;

                                        $.when(all.banks.accounts.poalimAsakimNew.getBase64FromImageUrl(mytableBody)).then(function (arr) {
                                            v.imgs = arr;


                                            var reqBack = {
                                                'input_fromAgg': "SELECT_ACC",
                                                'reqName': "action",
                                                'transactionId': "HomePagePoalim",
                                                'menuParam': "",
                                                'PGcode': "",
                                                'step': 1,
                                                'u': poalimAsakimNew.varGlobal.u,
                                                'tcfo': poalimAsakimNew.varGlobal.tcfo,
                                                'tsfo': poalimAsakimNew.varGlobal.tsfo,
                                                'mmx': poalimAsakimNew.varGlobal.mmx,
                                                'fromSubMenu': "Shekel",
                                                'qwrt': poalimAsakimNew.varGlobal.qwrt,
                                                'mpux': $$.find('input[name="mpux"]').val(),
                                                'targetView': $$.find('input[name="targetView"]').val(),
                                                'dwx': poalimAsakimNew.varGlobal.dwx,
                                                'dwxReq': $$.find('input[name="dwxReq"]').val(),
                                                'dwxOp': $$.find('input[name="dwxOp"]').val(),
                                                'doc_key': $$.find('input[name="doc_key"]').val(),
                                                'callerTid': $$.find('input[name="callerTid"]').val(),
                                                'WTcomeFrom': $$.find('input[name="WTcomeFrom"]').val(),
                                                'accountIndex': all.banks.accounts.poalimAsakimNew.indDDAll(all.banks.accounts.poalimAsakimNew.vddVal.BANK_SNIF_ACCOUNT_KEY),
                                                'toDateCalander': all.banks.accounts.poalimAsakimNew.vddVal.datebacksleshTo,
                                                'fromDateCalander': all.banks.accounts.poalimAsakimNew.vddVal.datebackslesh,
                                                'getCacheData': "YES"

                                            };
                                            all.banks.core.services.httpReq("https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc", 'POST', reqBack, true, false)
                                                .then(function (res, bbb, ccc) {
                                                    var $$ = all.banks.core.services.parseHtml(res);
                                                    res = null;
                                                    var ts = $$.find('input[name="ts"]').val();
                                                    var u = $$.find('input[name="u"]').val();
                                                    var dwx = $$.find('input[name="dwx"]').val();
                                                    var tcfo = $$.find('input[name="tcfo"]').val();
                                                    var qwrt = $$.find('input[name="qwrt"]').val();
                                                    var tsfo = $$.find('input[name="tsfo"]').val();
                                                    var mmx = $$.find('input[name="mmx"]').val();
                                                    var reqName = $$.find('input[name="reqName"]').val();
                                                    var transactionId = $$.find('input[name="transactionId"]').val();
                                                    var menuParam = $$.find('input[name="menuParam"]').val();
                                                    var PGcode = $$.find('input[name="PGcode"]').val();
                                                    var step = $$.find('input[name="step"]').val();
                                                    var fromSubMenu = $$.find('input[name="fromSubMenu"]').val();
                                                    var mpux = $$.find('input[name="mpux"]').val();
                                                    var targetView = $$.find('input[name="targetView"]').val();
                                                    var dwxReq = $$.find('input[name="dwxReq"]').val();
                                                    var dwxOp = $$.find('input[name="dwxOp"]').val();
                                                    var doc_key = $$.find('input[name="doc_key"]').val();
                                                    var callerTid = $$.find('input[name="callerTid"]').val();
                                                    var WTcomeFrom = $$.find('input[name="WTcomeFrom"]').val();
                                                    var no_Bank = $$.find('input[name="no_Bank"]').val();
                                                    var no_Snif = $$.find('input[name="no_Snif"]').val();
                                                    var no_Acc = $$.find('input[name="no_Acc"]').val();
                                                    var shelav = $$.find('input[name="shelav"]').val();
                                                    var goBack = $$.find('input[name="goBack"]').val();
                                                    var lastThreeMonthActions = $$.find('input[name="lastThreeMonthActions"]').val();
                                                    var dateRangeSelect = $$.find('input[name="dateRangeSelect"]').val();
                                                    poalimAsakimNew.varGlobal = {
                                                        ts: ts,
                                                        u: u,
                                                        dwx: dwx,
                                                        tcfo: tcfo,
                                                        qwrt: qwrt,
                                                        tsfo: tsfo,
                                                        mmx: mmx,
                                                        reqName: reqName,
                                                        transactionId: transactionId,
                                                        menuParam: menuParam,
                                                        PGcode: PGcode,
                                                        step: step,
                                                        fromSubMenu: fromSubMenu,
                                                        mpux: mpux,
                                                        targetView: targetView,
                                                        dwxReq: dwxReq,
                                                        dwxOp: dwxOp,
                                                        doc_key: doc_key,
                                                        callerTid: callerTid,
                                                        WTcomeFrom: WTcomeFrom,
                                                        no_Bank: no_Bank,
                                                        no_Snif: no_Snif,
                                                        no_Acc: no_Acc,
                                                        shelav: shelav,
                                                        goBack: goBack,
                                                        lastThreeMonthActions: lastThreeMonthActions,
                                                        dateRangeSelect: dateRangeSelect
                                                    };

                                                    if (all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length == i + 1) {
                                                        myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length);
                                                        all.banks.accounts.poalimAsakimNew.sendOshCtrl();
                                                        $$ = null;
                                                    } else {
                                                        all.banks.accounts.poalimAsakimNew.loadCheck();
                                                        $$ = null;
                                                    }
                                                })
                                        });
                                    }
                                }
                            })
                            .fail(function (error, resErr) {
                                v.imgs = [{
                                    "ImageNameKey": "x"
                                }];
                                if (all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length == i + 1) {
                                    myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length);
                                    all.banks.accounts.poalimAsakimNew.sendOshCtrl();
                                } else {
                                    all.banks.accounts.poalimAsakimNew.loadCheck();
                                }
                            });
                        return false;
                    } else {
                        if (all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length == i + 1) {
                            myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length);
                            all.banks.accounts.poalimAsakimNew.sendOshCtrl();
                        }
                    }
                })
            } else {
                myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length);
                all.banks.accounts.poalimAsakimNew.sendOshCtrl();
            }
        } else {
            myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length);
            all.banks.accounts.poalimAsakimNew.sendOshCtrl();
        }
    }
    poalimAsakimNew.getBase64FromImageUrl = function (mytableBody) {
        var dfd = jQuery.Deferred();
        try {
            var urlArr = [],
                arrList = [];
            if (mytableBody.length) {
                var len = mytableBody.find('tr.TR_ROW_BANKTABLE').not(':last-child').length;
                mytableBody.find('tr.TR_ROW_BANKTABLE').not(':last-child').each(function (i, v) {
                    var scriptTd = v.cells[3].textContent.split(',');
                    var urlToImg = "https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=action&transactionId=ChecksImageOut&checkDate=" + scriptTd[0].split('"')[1] + "&checkSum=" + scriptTd[1].replace(/\s/g, "").replace(/,/g, '').replace(/"/g, '') + "&areh_apaula=" + scriptTd[9].split("'));")[0].replace(/\s/g, "").replace(/'/g, "").replace(/\)/g, '').replace(/;/g, '') + "&TIUR_PAULA=233*240*229*225*249*231*236*32*247*233*249*32*244*228&checkAsmahta=" + scriptTd[2].replace(/\D/g, "") + "&pSubMenu=Shekel&fromSubMenu=Shekel&bxx=912&nsv=y&dwx=" + poalimAsakimNew.varGlobal.dwx + "&wScr=1920&hScr=1080&tcfo=" + poalimAsakimNew.varGlobal.tcfo + "&mmx=1&qwrt=" + poalimAsakimNew.varGlobal.qwrt + "&dtcdb=0&menuTranName=HomePagePoalim";
                    urlArr.push(urlToImg);
                    if (len == i + 1) {
                        loadCheckInside();
                        mytableBody = null;
                    }
                })
            } else {
                mytableBody = null;
                dfd.resolve([{
                    "ImageNameKey": "x"
                }]);
            }
            all.banks.accounts.poalimAsakimNew.indexTwoChecks = 0;

            function loadCheckInside() {
                if (urlArr.length > 0) {
                    all.banks.accounts.poalimAsakimNew.indexTwoChecks = all.banks.accounts.poalimAsakimNew.indexTwoChecks + 1;
                    $(urlArr).each(function (i, v) {
                        all.banks.core.services.httpReq(v, 'GET', null, false, false)
                            .then(function (res, bbb, ccc) {

                                var $$ = all.banks.core.services.parseHtml(res);
                                res = null;
                                var expires = ccc.getResponseHeader("X-FRAME-OPTIONS");
                                if (expires == null) {
                                    poalimAsakimNew.setNewTime(function () {
                                        loadCheckInside()
                                    });
                                    //all.banks.accounts.poalimAsakimNew.logOut();
                                    $$ = null;
                                } else {
                                    var frontImg = $$.find('#frontImg');
                                    var dateCandidate = $$.find('#trRowTableBold > td').eq(2).find('tr').eq(4).find('td').eq(0).text().replace(/\s/g, "");
                                    var dateCheck = /[\d\/]+/.test(dateCandidate) ? dateCandidate.split('/') : undefined;
                                    if (!dateCheck) {
                                        console.log("Failed to get date " + $$.text());
                                    }
                                    if (dateCheck && frontImg.attr('src') !== undefined && frontImg.attr('src').length) {
                                        all.banks.accounts.poalimAsakimNew.indexTwoChecks = 0;
                                        var formData = new FormData();
                                        var img = new Image();
                                        img.src = "https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il" + frontImg.attr('src');
                                        var timer = setTimeout(function (theImg) {
                                            return function () {
                                                theImg.onerror();
                                            };
                                        }(img), 120000);
                                        monitorActivityClass.setIntervalActivity();
                                        img.onload = function () {
                                            clearTimeout(timer);
                                            var canvas = document.createElement("canvas");
                                            canvas.width = this.width;
                                            canvas.height = this.height;
                                            var ctx = canvas.getContext("2d");
                                            ctx.drawImage(this, 0, 0);
                                            var dataURL = canvas.toDataURL("image/jpeg", 0.01);
                                            var content = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                                            var uuid = parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(0).find('td').eq(0).text()) + '' + parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(1).find('td').eq(0).text()) + '' + parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(2).find('td').eq(0).text()) + '' + parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(3).find('td').eq(0).text()) + '' + dateCheck[2] + '' + dateCheck[1] + '' + dateCheck[0] + '_' + all.banks.generalVariables.allDataArr.BankData[0].Account[0].BankNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[0].BranchNumber + '' + all.banks.generalVariables.allDataArr.BankData[0].Account[0].AccountNumber;
                                            var blob = new Blob([content], {
                                                type: "text/plain"
                                            });
                                            formData.append(uuid, blob);
                                            arrList.push({
                                                "Asmachta": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(3).find('td').eq(0).text()),
                                                "CheckAccountNumber": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(2).find('td').eq(0).text()),
                                                "DepositeDate": dateCheck[2] + '' + dateCheck[1] + '' + dateCheck[0],
                                                "CheckBankNumber": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(0).find('td').eq(0).text()),
                                                "CheckBranchNumber": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(1).find('td').eq(0).text()),
                                                "CheckNumber": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(3).find('td').eq(0).text()),
                                                "CheckTotal": poalimAsakimNew.returnClearSum($$.find('#trRowTableBold > td').eq(2).find('tr').eq(5).find('td').eq(0).text()),
                                                "ImageNameKey": uuid
                                            });
                                            all.banks.accounts.poalimAsakimNew.sendChecksCtrl({
                                                formData: formData,
                                                params: {
                                                    imagenamekey: arrList[arrList.length - 1].ImageNameKey,
                                                    bankId: all.banks.generalVariables.allDataArr.BankData[0].Account[0].BankNumber,
                                                    snifId: all.banks.generalVariables.allDataArr.BankData[0].Account[0].BranchNumber,
                                                    accountId: all.banks.generalVariables.allDataArr.BankData[0].Account[0].AccountNumber
                                                }
                                            });
                                            urlArr = urlArr.splice(1, urlArr.length - 1);
                                            loadCheckInside();
                                            $$ = null;
                                        }
                                        img.onerror = function () {
                                            clearTimeout(timer);
                                            arrList.push({
                                                "Asmachta": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(3).find('td').eq(0).text()),
                                                "CheckAccountNumber": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(2).find('td').eq(0).text()),
                                                "DepositeDate": dateCheck[2] + '' + dateCheck[1] + '' + dateCheck[0],
                                                "CheckBankNumber": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(0).find('td').eq(0).text()),
                                                "CheckBranchNumber": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(1).find('td').eq(0).text()),
                                                "CheckNumber": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(3).find('td').eq(0).text()),
                                                "CheckTotal": poalimAsakimNew.returnClearSum($$.find('#trRowTableBold > td').eq(2).find('tr').eq(5).find('td').eq(0).text()),
                                                "ImageNameKey": "x"
                                            });
                                            urlArr = urlArr.splice(1, urlArr.length - 1);
                                            loadCheckInside();
                                            $$ = null;
                                        }
                                    } else if (dateCheck) {
                                        arrList.push({
                                            "Asmachta": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(3).find('td').eq(0).text()),
                                            "CheckAccountNumber": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(2).find('td').eq(0).text()),
                                            "DepositeDate": dateCheck[2] + '' + dateCheck[1] + '' + dateCheck[0],
                                            "CheckBankNumber": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(0).find('td').eq(0).text()),
                                            "CheckBranchNumber": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(1).find('td').eq(0).text()),
                                            "CheckNumber": parseInt($$.find('#trRowTableBold > td').eq(2).find('tr').eq(3).find('td').eq(0).text()),
                                            "CheckTotal": poalimAsakimNew.returnClearSum($$.find('#trRowTableBold > td').eq(2).find('tr').eq(5).find('td').eq(0).text()),
                                            "ImageNameKey": "x"
                                        });
                                        //if (all.banks.accounts.poalimAsakimNew.indexTwoChecks >= 2) {
                                        all.banks.generalVariables.numChecksNotWithdrawn = all.banks.generalVariables.numChecksNotWithdrawn + 1;
                                        all.banks.accounts.poalimAsakimNew.indexTwoChecks = 0;
                                        urlArr = urlArr.splice(1, urlArr.length - 1);
                                        //}
                                        loadCheckInside();
                                        $$ = null;
                                    } else {
                                        all.banks.generalVariables.numChecksNotWithdrawn = all.banks.generalVariables.numChecksNotWithdrawn + 1;
                                        all.banks.accounts.poalimAsakimNew.indexTwoChecks = 0;
                                        urlArr = urlArr.splice(1, urlArr.length - 1);
                                        loadCheckInside();
                                        $$ = null;
                                    }
                                }
                            })
                            .fail(function (error, resErr) {
                                //if (all.banks.accounts.poalimAsakimNew.indexTwoChecks >= 2) {
                                all.banks.generalVariables.numChecksNotWithdrawn = all.banks.generalVariables.numChecksNotWithdrawn + 1;
                                all.banks.accounts.poalimAsakimNew.indexTwoChecks = 0;
                                urlArr = urlArr.splice(1, urlArr.length - 1);
                                //}
                                loadCheckInside();
                            });
                        return false;
                    })
                } else {
                    if (arrList.length > 0) {
                        dfd.resolve(arrList);
                        arrList = null;
                    } else {
                        dfd.resolve([{
                            "ImageNameKey": "x"
                        }]);
                    }
                }
            }
        } catch (err) {
            mytableBody = null;
            dfd.resolve([{
                "ImageNameKey": "x"
            }]);
        }
        return dfd.promise();
    };
    poalimAsakimNew.returnNumAll = function (arrAll) {
        function returnNum(arrNumbers, splits) {
            var id;
            if (splits) {
                var arrs = arrNumbers.split('');
            } else {
                var arrs = arrNumbers;
            }
            $(arrs).each(function (i, v) {
                var val = parseFloat(v);
                if (!isNaN(val)) {
                    id = i;
                    return false;
                }
            });
            return id;
        }

        var arrNumbers = returnNum(arrAll, true);
        var arrRevers = returnNum(arrAll.split('').reverse(), false);
        var sumFinish = parseFloat(arrAll.substring(arrNumbers, arrAll.length - arrRevers)) * -1;
        return sumFinish;
    };
    poalimAsakimNew.loadAsharaiPrev = function (BANK_SNIF_ACCOUNT_KEY) {
        var asrashiNumCard = [];
        all.banks.generalVariables.allDataArrAshrai = [];
        var req = {
            'input_fromAgg': "",
            'reqName': "action",
            'transactionId': "PrevCCSummary*all",
            'menuParam': "all",
            'PGcode': "",
            'step': "1",
            'u': poalimAsakimNew.varGlobal.u,
            'tcfo': poalimAsakimNew.varGlobal.tcfo,
            'tsfo': poalimAsakimNew.varGlobal.tsfo,
            'mmx': poalimAsakimNew.varGlobal.mmx,
            'fromSubMenu': "CreditCards",
            'qwrt': poalimAsakimNew.varGlobal.qwrt,
            'mpux': "",
            'targetView': "",
            'dwx': poalimAsakimNew.varGlobal.dwx,
            'dwxReq': poalimAsakimNew.varGlobal.dwxReq,
            'dwxOp': poalimAsakimNew.varGlobal.dwxOp,
            'doc_key': "",
            'callerTid': "",
            'WTcomeFrom': "",
            'accountIndex': all.banks.accounts.poalimAsakimNew.indDDAll(all.banks.accounts.poalimAsakimNew.vddVal.BANK_SNIF_ACCOUNT_KEY),
            'current_kartis': "ALL_CARDS"
        };
        //var url = "https://"+poalimAsakimNew.newAccPath+".bankhapoalim.co.il/cgi-bin/poalwwwc?ctfw=user&reqName=action&language=HE&transactionId=PrevCCSummary*all&subMenuName=CreditCards&ts=" + poalimAsakimNew.varGlobal.ts + "&tf=" + Math.random() + "&u=" + poalimAsakimNew.varGlobal.u + "&pSubMenu=Shekel&fromSubMenu=CreditCards&bxx=912&nsv=y&dwx=" + poalimAsakimNew.varGlobal.dwx + "&wScr=1920&hScr=1080&tcfo=" + poalimAsakimNew.varGlobal.tcfo + "&mmx=1&qwrt=" + poalimAsakimNew.varGlobal.qwrt + "&tsfo=" + poalimAsakimNew.varGlobal.tsfo + "&dtcdb=0&menuTranName=PrevCCSummary*all";
        all.banks.core.services.httpReq("https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc", 'POST', req, true, false)
            .then(function (res, bbb, ccc) {
                try {
                    //writeHtmlFile('loadAsharaiPrev', res);

                    req = null;
                    var $$ = all.banks.core.services.parseHtml(res);
                    res = null;
                    var ts = $$.find('input[name="ts"]').val();
                    var u = $$.find('input[name="u"]').val();
                    var dwx = $$.find('input[name="dwx"]').val();
                    var tcfo = $$.find('input[name="tcfo"]').val();
                    var qwrt = $$.find('input[name="qwrt"]').val();
                    var tsfo = $$.find('input[name="tsfo"]').val();
                    var mmx = $$.find('input[name="mmx"]').val();
                    var dwxReq = $$.find('input[name="dwxReq"]').val();
                    var dwxOp = $$.find('input[name="dwxOp"]').val();
                    poalimAsakimNew.varGlobal.ts = ts;
                    poalimAsakimNew.varGlobal.u = u;
                    poalimAsakimNew.varGlobal.dwx = dwx;
                    poalimAsakimNew.varGlobal.tcfo = tcfo;
                    poalimAsakimNew.varGlobal.qwrt = qwrt;
                    poalimAsakimNew.varGlobal.tsfo = tsfo;
                    poalimAsakimNew.varGlobal.mmx = mmx;
                    poalimAsakimNew.varGlobal.dwxReq = dwxReq;
                    poalimAsakimNew.varGlobal.dwxOp = dwxOp;

                    var expires = ccc.getResponseHeader("X-FRAME-OPTIONS");
                    if (expires == null) {
                        poalimAsakimNew.setNewTime(function () {
                            poalimAsakimNew.loadAsharaiPrev();
                        });
                        //all.banks.accounts.poalimAsakimNew.logOut()
                        $$ = null;
                    } else {
                        var indicatorDmeiKartis = 0;
                        if ($$.find('#errMfTable').length && $$.find('#errMfTable').text().indexOf("לא נתקבלו") !== -1) {
                            all.banks.accounts.poalimAsakimNew.loadNextCard();
                            $$ = null;
                        } else {
                            if (($$.find("[name='current_kartis'] > option").length > 0) && $$.find('#someDataMainTr else > table.arial12NoBold .arial12BoldBlue').length) {
                                if ($$.find('#someDataMainTr else > table.arial12NoBold .arial12BoldBlue').length) {
                                    var accDetalisArr = $$.find('#allAcountsList option:selected script').text().split('new Acc(')[1].split(")")[0].split(",");
                                    var snifNum = accDetalisArr[1].replace(/\D/g, "");
                                    var accNum = accDetalisArr[2].replace(/\D/g, "");
                                    var AccountNumber = parseInt(accNum);
                                    var BranchNumber = parseInt(snifNum);
                                    $$.find('#someDataMainTr else > table.arial12NoBold .arial12BoldBlue').each(function (i, v) {
                                        if ($(v).text().indexOf('לא התקבלו') == -1) {
                                            var groupWrap = $(this).closest('table.arial12NoBold').nextUntil("#someDataMainTr else > table.arial12NoBold");
                                            $(groupWrap).find('.MAIN_BANKTABLE').each(function (indx, va) {
                                                var nextDate = null, IndFakeDate = 1, NextTotalSum = null;
                                                var datePrevNow = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                                                var datePrevOne = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
                                                var datePrevTwo = new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1);
                                                var datePrevThree = new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1);
                                                var nextCy;
                                                var overallSumHanahaCreated = false;
                                                var vaRow = $(va);
                                                if (!vaRow.closest("t_table_chul").length) {
                                                    var yearThis;
                                                    if (vaRow.find('tr[name="summRow"]').length) {
                                                        IndFakeDate = 0;
                                                        var indIdea = 0;
                                                        nextCy = vaRow.find('tr[name="summRow"]:last td[headers="header2"]').text().split('/');
                                                        if (vaRow.find('tr.TR_BANKTABLE:last').text().indexOf("לידיעה") !== -1) {
                                                            const newCyCandidate = vaRow.find('tr.TR_BANKTABLE:last').prev().children('td[headers="header2"]').text().split('/');
                                                            if (newCyCandidate.length === 2) {
                                                                indIdea = 1;
                                                                nextCy = newCyCandidate;
                                                            }
                                                        }
                                                        if ((datePrevNow.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                            yearThis = datePrevNow.getFullYear();
                                                        }
                                                        if ((datePrevOne.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                            yearThis = datePrevOne.getFullYear();
                                                        }
                                                        if ((datePrevTwo.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                            yearThis = datePrevTwo.getFullYear();
                                                        }
                                                        nextDate = yearThis + '' + nextCy[1].replace(/\D/g, "") + '' + nextCy[0].replace(/\D/g, "");
                                                        NextTotalSum = vaRow.find('tr[name="summRow"]:last td[headers="header5"]').text().replace(/,/g, '');
                                                        if (NextTotalSum && NextTotalSum.trim().length === 0) {
                                                            NextTotalSum = '0.00';
                                                        }
                                                        if (indIdea == 1) {
                                                            NextTotalSum = vaRow.find('tr.TR_BANKTABLE').prev().children('td[headers="header5"]').text().replace(/,/g, '');
                                                        } else if (indIdea == 0 && vaRow.find('tr[name="summRow"]').length == 2) {
                                                            if (parseFloat(vaRow.find('tr[name="summRow"]:first td[headers="header5"]').text().replace(/,/g, '')) > parseFloat(NextTotalSum)) {
                                                                var hanaha = vaRow.find('tr[name="summRow"]:first td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, "");
                                                                if (hanaha.indexOf("הנחה") == -1) {
                                                                    hanaha = vaRow.find('tr[name="summRow"]:first td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "");
                                                                }
                                                                var sums = poalimAsakimNew.returnNumAll(hanaha);
                                                                if (sums.toString().indexOf('-') !== -1) {
                                                                    sums = -Math.abs(parseFloat(sums))
                                                                }

                                                                all.banks.generalVariables.allDataArrAshrai.push({
                                                                    "BankNumber": 12,
                                                                    "TargetId": all.banks.generalVariables.AccountNumber,
                                                                    "Token": all.banks.generalVariables.branchNumber,
                                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                                    "BranchNumber": BranchNumber,
                                                                    "AccountNumber": AccountNumber,
                                                                    "CardNumber": $(v).text().replace(/\D/g, ""),
                                                                    "NextBillingDate": nextDate,
                                                                    "NextCycleTotal": NextTotalSum,
                                                                    "CardStatus": null,
                                                                    "TransDesc": "הנחה",
                                                                    "TransTotal": poalimAsakimNew.returnClearSum(sums),
                                                                    "ValueDate": nextDate,
                                                                    "TransCategory": null,
                                                                    "TotalPayments": null,
                                                                    "CurrentPaymentNum": null,
                                                                    "CardType": 22,
                                                                    "indFakeDate": 0,
                                                                    "currency_id": 1,
                                                                    "original_total": poalimAsakimNew.returnClearSum(sums),
                                                                    "ind_iskat_hul": 1,
                                                                    "comment": hanaha
                                                                });
                                                                overallSumHanahaCreated = true;
                                                            }
                                                        }
                                                    } else if (vaRow.find('tr#trTotal').length) {
                                                        IndFakeDate = 0;
                                                        nextCy = vaRow.find('tr#trTotal:last td[headers="header2"]').text().split('/');
                                                        if ((datePrevNow.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                            yearThis = datePrevNow.getFullYear();
                                                        }
                                                        if ((datePrevOne.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                            yearThis = datePrevOne.getFullYear();
                                                        }
                                                        if ((datePrevTwo.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                            yearThis = datePrevTwo.getFullYear();
                                                        }
                                                        nextDate = yearThis + '' + nextCy[1].replace(/\D/g, "") + '' + nextCy[0].replace(/\D/g, "");
                                                        NextTotalSum = vaRow.find('tr#trTotal:last td[headers="header5"]').text().replace(/,/g, '');
                                                    }
                                                }

                                                if (NextTotalSum && NextTotalSum.trim().length === 0) {
                                                    NextTotalSum = '0.00';
                                                }

                                                var dataMonthlyCycle = {
                                                    'BankNumber': 12,
                                                    "BranchNumber": BranchNumber,
                                                    "AccountNumber": AccountNumber,
                                                    'NextTotal': NextTotalSum,
                                                    'CardNumber': $(v).text().replace(/\D/g, ""),
                                                    'CardType': 22,
                                                    'NextBillingDate': nextDate
                                                }
                                                asrashiNumCard.push($(v).text().replace(/\D/g, ""));
                                                var ind_iskat_hul = 1;
                                                ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(vaRow.find("tr.TR_BANKTABLE th#header5").text());

                                                var detectActionInformation;
                                                var rowOfTable = vaRow.find('tr.TR_ROW_BANKTABLE');

                                                $(rowOfTable).each(function (i1, v1) {
                                                    var varRowEach = $(v1);
                                                    if ((varRowEach.find('td[headers="header1"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") !== '') ||
                                                        (varRowEach.find('td[headers="header5"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") !== '' &&
                                                            varRowEach.attr("id") !== "trTotal" &&
                                                            varRowEach.find('td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") !== ''
                                                            && varRowEach.find('td[headers="header1"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") == '')) {
                                                        try {
                                                            indicatorDmeiKartis = 0;
                                                            if (varRowEach.prev('.TR_BANKTABLE').length && varRowEach.prev('.TR_BANKTABLE').find('td').text().indexOf('לידיעה') != -1) {
                                                                detectActionInformation = 'לידיעה בלבד';
                                                            }
                                                            var totalPaymentsSum = null, currentPaymentNumSum = null,
                                                                ifIsPayment = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").indexOf('ךותמ'),
                                                                ifIsPaymentCre = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").indexOf('םולשתטידרק'),
                                                                ifIsPaymentCreAlso = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").indexOf('םולשתריהמיארשא');

                                                            if (ifIsPayment !== -1) {
                                                                totalPaymentsSum = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").split('ךותמ')[0].replace(/\D/g, "");
                                                                currentPaymentNumSum = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").split('ךותמ')[1].replace(/\D/g, "");
                                                            }
                                                            if (ifIsPaymentCre !== -1 || ifIsPaymentCreAlso !== -1) {
                                                                totalPaymentsSum = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").split('מ')[0].replace(/\D/g, "");
                                                                currentPaymentNumSum = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").split('מ')[1].replace(/\D/g, "");
                                                            }

                                                            var valDate, yearLoop;
                                                            var currencyId = 1;

                                                            if (vaRow.closest("t_table_chul").length) {
                                                                if (varRowEach.attr("id") !== "trTotal" && varRowEach.find('td[headers="header1"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") !== "") {
                                                                    var nextTrTotal = varRowEach.next();
                                                                    if ($(nextTrTotal).attr("id") == "trTotal") {
                                                                        nextTrTotal = varRowEach.next();
                                                                    } else {
                                                                        var nextTotal = varRowEach.nextUntil("#trTotal").next();
                                                                        nextTrTotal = nextTotal.eq(nextTotal.length - 1);
                                                                        if ($(nextTrTotal).find('td[headers="header2"]').length && $(nextTrTotal).find('td[headers="header2"]').text().split('/').length > 1) {
                                                                            nextTrTotal = nextTotal.eq(nextTotal.length - 1);
                                                                        } else {
                                                                            nextTrTotal = varRowEach.next();
                                                                        }
                                                                    }

                                                                    IndFakeDate = 0;
                                                                    valDate = varRowEach.find('td[headers="header1"]').text().split('/');
                                                                    var nextCy1 = $(nextTrTotal).find('td[headers="header2"]').text().split('/');
                                                                    if (nextCy1.length == 1) {
                                                                        nextCy1 = valDate;
                                                                    }
                                                                    if ((datePrevNow.getMonth() + 1) == parseFloat(nextCy1[1].replace(/\D/g, ""))) {
                                                                        yearThis = datePrevNow.getFullYear();
                                                                    }
                                                                    if ((datePrevOne.getMonth() + 1) == parseFloat(nextCy1[1].replace(/\D/g, ""))) {
                                                                        yearThis = datePrevOne.getFullYear();
                                                                    }
                                                                    if ((datePrevTwo.getMonth() + 1) == parseFloat(nextCy1[1].replace(/\D/g, ""))) {
                                                                        yearThis = datePrevTwo.getFullYear();
                                                                    }
                                                                    nextDate = yearThis + '' + nextCy1[1].replace(/\D/g, "") + '' + nextCy1[0].replace(/\D/g, "");
                                                                    NextTotalSum = $(nextTrTotal).find('td[headers="header5"]').text().replace(/,/g, '');
                                                                    dataMonthlyCycle.NextTotal = NextTotalSum;
                                                                    dataMonthlyCycle.NextBillingDate = nextDate;
                                                                    if ((datePrevNow.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                        yearLoop = datePrevNow.getFullYear();
                                                                    }
                                                                    if ((datePrevOne.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                        yearLoop = datePrevOne.getFullYear();
                                                                    }
                                                                    if ((datePrevTwo.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                        yearLoop = datePrevTwo.getFullYear();
                                                                    }
                                                                    if (currentPaymentNumSum !== null) {
                                                                        yearLoop = new Date(parseFloat(yearThis), (parseFloat(nextCy1[1].replace(/\D/g, "")) - 1) - currentPaymentNumSum, parseFloat(nextCy1[0].replace(/\D/g, ""))).getFullYear();
                                                                    }
                                                                    if (yearLoop == undefined) {
                                                                        if ((datePrevThree.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                            yearLoop = datePrevThree.getFullYear();
                                                                        }
                                                                    }

                                                                    var textCurr = varRowEach.find('td[headers="header4"]').text();
                                                                    currencyId = all.banks.core.services.getTypeCurrencyAll(textCurr);
                                                                    var comment = "";
                                                                    if (varRowEach.find('td[headers=" header6"]').length) {
                                                                        var commentArray = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/ /g, '').trim();
                                                                    }
                                                                    var transDesc = varRowEach.find('td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, "");
                                                                    if (transDesc.indexOf("CASHBACK") !== -1) {
                                                                        comment += " CASHBACK";
                                                                    }
                                                                    if (detectActionInformation != undefined) {
                                                                        comment += detectActionInformation;
                                                                    }
                                                                    var original_total = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header4"]').text().split(" ")[0]);
                                                                    if (original_total.toString().indexOf('-') !== -1) {
                                                                        original_total = -Math.abs(parseFloat(original_total))
                                                                    }
                                                                    var transTotal = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header5"]').text());

                                                                    all.banks.generalVariables.allDataArrAshrai.push({
                                                                        "BankNumber": 12,
                                                                        "TargetId": all.banks.generalVariables.AccountNumber,
                                                                        "Token": all.banks.generalVariables.branchNumber,
                                                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                                                        "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                                        "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                                        "CardNumber": dataMonthlyCycle.CardNumber,
                                                                        "NextBillingDate": dataMonthlyCycle.NextBillingDate,
                                                                        "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                                                        "CardStatus": null,
                                                                        "TransDesc": transDesc,
                                                                        "TransTotal": poalimAsakimNew.returnClearSum(transTotal),
                                                                        "ValueDate": valDate != "" ? (yearLoop + '' + valDate[1].replace(/\D/g, "") + '' + valDate[0].replace(/\D/g, "")) : dataMonthlyCycle.NextBillingDate,
                                                                        "TransCategory": null,
                                                                        "TotalPayments": totalPaymentsSum,
                                                                        "CurrentPaymentNum": currentPaymentNumSum,
                                                                        "CardType": 22,
                                                                        "indFakeDate": IndFakeDate,
                                                                        "currency_id": currencyId,
                                                                        "original_total": original_total,
                                                                        "ind_iskat_hul": ind_iskat_hul,
                                                                        "comment": comment
                                                                    })
                                                                }
                                                            } else {
                                                                if (detectActionInformation == undefined) {
                                                                    if (varRowEach.attr("class") !== "TR_TOTAL") {
                                                                        var nextTrTotal = varRowEach.next();
                                                                        if ($(nextTrTotal).attr("class") == "TR_TOTAL") {
                                                                            nextTrTotal = varRowEach.next();
                                                                        } else {
                                                                            var nextTotal = varRowEach.nextUntil(".TR_TOTAL").next();
                                                                            nextTrTotal = nextTotal.eq(nextTotal.length - 1);
                                                                        }

                                                                        //in case of two TR_TOTAL rows one after another, take the second one
                                                                        if (nextTrTotal.next().attr("class") == "TR_TOTAL") {
                                                                            nextTrTotal = nextTrTotal.next();
                                                                        }

                                                                        IndFakeDate = 0;
                                                                        valDate = varRowEach.find('td[headers="header1"]').text().split('/');
                                                                        var nextCy1 = $(nextTrTotal).find('td[headers="header2"]').text().split('/');
                                                                        if (nextCy1.length == 1) {
                                                                            nextCy1 = valDate;
                                                                        }
                                                                        if (valDate.length < 2) {
                                                                            valDate = nextCy1;
                                                                        }
                                                                        if ((datePrevNow.getMonth() + 1) == parseFloat(nextCy1[1].replace(/\D/g, ""))) {
                                                                            yearThis = datePrevNow.getFullYear();
                                                                        }
                                                                        if ((datePrevOne.getMonth() + 1) == parseFloat(nextCy1[1].replace(/\D/g, ""))) {
                                                                            yearThis = datePrevOne.getFullYear();
                                                                        }
                                                                        if ((datePrevTwo.getMonth() + 1) == parseFloat(nextCy1[1].replace(/\D/g, ""))) {
                                                                            yearThis = datePrevTwo.getFullYear();
                                                                        }
                                                                        nextDate = yearThis + '' + nextCy1[1].replace(/\D/g, "") + '' + nextCy1[0].replace(/\D/g, "");
                                                                        NextTotalSum = $(nextTrTotal).find('td[headers="header5"]').text().replace(/,/g, '');
                                                                        if (NextTotalSum && NextTotalSum.trim().length === 0) {
                                                                            NextTotalSum = '0.00';
                                                                        }
                                                                        dataMonthlyCycle.NextTotal = NextTotalSum;
                                                                        dataMonthlyCycle.NextBillingDate = nextDate;

                                                                        if ((datePrevNow.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                            yearLoop = datePrevNow.getFullYear();
                                                                        }
                                                                        if ((datePrevOne.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                            yearLoop = datePrevOne.getFullYear();
                                                                        }
                                                                        if ((datePrevTwo.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                            yearLoop = datePrevTwo.getFullYear();
                                                                        }
                                                                        if (currentPaymentNumSum !== null) {
                                                                            yearLoop = new Date(parseFloat(yearThis), (parseFloat(nextCy1[1].replace(/\D/g, "")) - 1) - currentPaymentNumSum, parseFloat(nextCy1[0].replace(/\D/g, ""))).getFullYear();
                                                                        }
                                                                        if (yearLoop == undefined) {
                                                                            if ((datePrevThree.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                                yearLoop = datePrevThree.getFullYear();
                                                                            } else {
                                                                                yearLoop = new Date().getFullYear()

                                                                            }
                                                                        }
                                                                    } else {
                                                                        IndFakeDate = 0;
                                                                        valDate = varRowEach.find('td[headers="header1"]').text().split('/');
                                                                        if ((datePrevNow.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                            yearLoop = datePrevNow.getFullYear();
                                                                        }
                                                                        if ((datePrevOne.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                            yearLoop = datePrevOne.getFullYear();
                                                                        }
                                                                        if ((datePrevTwo.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                            yearLoop = datePrevTwo.getFullYear();
                                                                        }
                                                                        if (currentPaymentNumSum !== null) {
                                                                            yearLoop = new Date(parseFloat(yearThis), (parseFloat(nextCy[1].replace(/\D/g, "")) - 1) - currentPaymentNumSum, parseFloat(nextCy[0].replace(/\D/g, ""))).getFullYear();
                                                                        }
                                                                        if (yearLoop == undefined) {
                                                                            if ((datePrevThree.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                                yearLoop = datePrevThree.getFullYear();
                                                                            }
                                                                        }
                                                                    }
                                                                } else {
                                                                    if (varRowEach.attr("class") !== "TR_TOTAL") {
                                                                        var nextTotal = varRowEach.prevUntil(".TR_TOTAL").prev();
                                                                        var nextTrTotal = nextTotal.eq(nextTotal.length - 1);
                                                                        IndFakeDate = 0;
                                                                        valDate = varRowEach.find('td[headers="header1"]').text().split('/');
                                                                        var nextCy1 = $(nextTrTotal).find('td[headers="header2"]').text().split('/');
                                                                        if (nextCy1.length == 1) {
                                                                            nextCy1 = valDate;
                                                                        }
                                                                        if (valDate.length < 2) {
                                                                            valDate = nextCy1;
                                                                        }
                                                                        if ((datePrevNow.getMonth() + 1) == parseFloat(nextCy1[1].replace(/\D/g, ""))) {
                                                                            yearThis = datePrevNow.getFullYear();
                                                                        }
                                                                        if ((datePrevOne.getMonth() + 1) == parseFloat(nextCy1[1].replace(/\D/g, ""))) {
                                                                            yearThis = datePrevOne.getFullYear();
                                                                        }
                                                                        if ((datePrevTwo.getMonth() + 1) == parseFloat(nextCy1[1].replace(/\D/g, ""))) {
                                                                            yearThis = datePrevTwo.getFullYear();
                                                                        }
                                                                        nextDate = yearThis + '' + nextCy1[1].replace(/\D/g, "") + '' + nextCy1[0].replace(/\D/g, "");
                                                                        NextTotalSum = $(nextTrTotal).find('td[headers="header5"]').text().replace(/,/g, '');
                                                                        dataMonthlyCycle.NextTotal = NextTotalSum;
                                                                        dataMonthlyCycle.NextBillingDate = nextDate;

                                                                        if ((datePrevNow.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                            yearLoop = datePrevNow.getFullYear();
                                                                        }
                                                                        if ((datePrevOne.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                            yearLoop = datePrevOne.getFullYear();
                                                                        }
                                                                        if ((datePrevTwo.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                            yearLoop = datePrevTwo.getFullYear();
                                                                        }
                                                                        if (currentPaymentNumSum !== null) {
                                                                            yearLoop = new Date(parseFloat(yearThis), (parseFloat(nextCy1[1].replace(/\D/g, "")) - 1) - currentPaymentNumSum, parseFloat(nextCy1[0].replace(/\D/g, ""))).getFullYear();
                                                                        }
                                                                        if (yearLoop == undefined) {
                                                                            if ((datePrevThree.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                                yearLoop = datePrevThree.getFullYear();
                                                                            } else {
                                                                                yearLoop = new Date().getFullYear()

                                                                            }
                                                                        }

                                                                    } else {
                                                                        IndFakeDate = 0;
                                                                        valDate = varRowEach.find('td[headers="header1"]').text().split('/');
                                                                        if ((datePrevNow.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                            yearLoop = datePrevNow.getFullYear();
                                                                        }
                                                                        if ((datePrevOne.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                            yearLoop = datePrevOne.getFullYear();
                                                                        }
                                                                        if ((datePrevTwo.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                            yearLoop = datePrevTwo.getFullYear();
                                                                        }
                                                                        if (currentPaymentNumSum !== null) {
                                                                            yearLoop = new Date(parseFloat(yearThis), (parseFloat(nextCy[1].replace(/\D/g, "")) - 1) - currentPaymentNumSum, parseFloat(nextCy[0].replace(/\D/g, ""))).getFullYear();
                                                                        }
                                                                        if (yearLoop == undefined) {
                                                                            if ((datePrevThree.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                                yearLoop = datePrevThree.getFullYear();
                                                                            }
                                                                        }
                                                                    }
                                                                }

                                                                var comment = "";
                                                                if (varRowEach.find('td[headers=" header6"]').length) {
                                                                    var commentArray = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/ /g, '').trim();
                                                                }
                                                                var transDesc = varRowEach.find('td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, "");
                                                                if (transDesc.indexOf("CASHBACK") !== -1) {
                                                                    comment += " CASHBACK";
                                                                }
                                                                if (detectActionInformation != undefined) {
                                                                    comment += detectActionInformation;
                                                                }
                                                                var original_total = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header4"]').text().split(" ")[0]);
                                                                if (original_total.toString().indexOf('-') !== -1) {
                                                                    original_total = -Math.abs(parseFloat(original_total))
                                                                }
                                                                var transTotal = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header5"]').text());

                                                                var nextRowForecast = varRowEach.next('tr.TR_ROW_BANKTABLE');
                                                                var discountMatch;
                                                                var nextRowCommentText = nextRowForecast.find('td[headers="header6"]').text();
                                                                var nextRowSumText = nextRowForecast.find('td[headers="header4"]').text().trim();
                                                                if (!nextRowSumText
                                                                    && (nextRowCommentText.includes('הנחה') || nextRowCommentText.includes('החנה'))
                                                                    && (discountMatch = /(\d+\.\d{2})/g.exec(nextRowCommentText)) !== null) {

                                                                    if (!overallSumHanahaCreated) {
                                                                        transTotal = (transTotal - Math.abs(discountMatch[1])).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
                                                                    }
                                                                    //reverse everything but retain original discount sum
                                                                    comment += nextRowCommentText.split("").reverse().join("")
                                                                        .replace(discountMatch[1].split("").reverse().join(""), discountMatch[1]);
//																original_total -= Math.abs(parseFloat(discountMatch[1]));
//																comment += nextRowCommentText;
                                                                }

                                                                all.banks.generalVariables.allDataArrAshrai.push({
                                                                    "BankNumber": 12,
                                                                    "TargetId": all.banks.generalVariables.AccountNumber,
                                                                    "Token": all.banks.generalVariables.branchNumber,
                                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                                    "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                                    "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                                    "CardNumber": dataMonthlyCycle.CardNumber,
                                                                    "NextBillingDate": dataMonthlyCycle.NextBillingDate,
                                                                    "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                                                    "CardStatus": null,
                                                                    "TransDesc": transDesc,
                                                                    "TransTotal": transTotal,
                                                                    "ValueDate": (valDate !== "") ? (yearLoop + '' + valDate[1].replace(/\D/g, "") + '' + valDate[0].replace(/\D/g, "")) : dataMonthlyCycle.NextBillingDate,
                                                                    "TransCategory": null,
                                                                    "TotalPayments": totalPaymentsSum,
                                                                    "CurrentPaymentNum": currentPaymentNumSum,
                                                                    "CardType": 22,
                                                                    "indFakeDate": IndFakeDate,
                                                                    "currency_id": currencyId,
                                                                    "original_total": original_total,
                                                                    "ind_iskat_hul": ind_iskat_hul,
                                                                    "comment": comment
                                                                })
                                                            }
                                                        } catch (e) {
                                                            //myEmitterLogs(88);
                                                        }
                                                    } else if ((varRowEach.find('td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, "").indexOf('סה"כ עסקות') == -1)
                                                        && !vaRow.closest("t_table_chul").length &&
                                                        varRowEach.attr("id") !== "trTotal" &&
                                                        varRowEach.find('td[headers="header1"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") == ''
                                                        && varRowEach.find('td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") !== '' && detectActionInformation == undefined) {

                                                        IndFakeDate = 0;
                                                        var comment = "";
                                                        var commentArray = varRowEach.next().find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/ /g, '').trim();

                                                        //var commentArray = varRowEach.next().find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/ /g, '').trim().split('').reverse();
                                                        //if (commentArray.length) {
                                                        //	commentArray.forEach(function (v) {
                                                        //		comment += v;
                                                        //	});
                                                        //}
                                                        var original_total = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header5"]').text());
                                                        if (original_total.toString().indexOf('-') !== -1) {
                                                            original_total = -Math.abs(parseFloat(original_total))
                                                        }
                                                        var transDesc = varRowEach.find('td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, "");
                                                        if (transDesc.indexOf("CASHBACK") !== -1) {
                                                            comment += " CASHBACK";
                                                        }
                                                        if (indicatorDmeiKartis == 0) {

                                                            all.banks.generalVariables.allDataArrAshrai.push({
                                                                "BankNumber": 12,
                                                                "TargetId": all.banks.generalVariables.AccountNumber,
                                                                "Token": all.banks.generalVariables.branchNumber,
                                                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                "ExporterId": all.banks.spiderConfig.spiderId,
                                                                "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                                "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                                "CardNumber": dataMonthlyCycle.CardNumber,
                                                                "NextBillingDate": dataMonthlyCycle.NextBillingDate,
                                                                "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                                                "CardStatus": null,
                                                                "TransDesc": transDesc,
                                                                "TransTotal": poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header5"]').text()),
                                                                "ValueDate": dataMonthlyCycle.NextBillingDate,
                                                                "TransCategory": null,
                                                                "TotalPayments": null,
                                                                "CurrentPaymentNum": null,
                                                                "CardType": 22,
                                                                "indFakeDate": IndFakeDate,
                                                                "currency_id": 1,
                                                                "original_total": original_total,
                                                                "ind_iskat_hul": 1,
                                                                "comment": comment
                                                            })
                                                        }
                                                        indicatorDmeiKartis++;

                                                    } else if (!vaRow.closest("t_table_chul").length &&
                                                        varRowEach.attr("id") !== "trTotal" &&
                                                        varRowEach.find('td[headers="header1"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") == '' &&
                                                        varRowEach.find('td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") == '' &&
                                                        varRowEach.find('td[headers="header4"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") == '' &&
                                                        varRowEach.find('td[headers="header5"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") != '') {
                                                        indicatorDmeiKartis = 0;
                                                        all.banks.generalVariables.allDataArrAshrai[all.banks.generalVariables.allDataArrAshrai.length - 1].TransTotal = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header5"]').text());
                                                    }
                                                })
                                            })
                                        }
                                        if (i + 1 == $$.find('#someDataMainTr else > table.arial12NoBold .arial12BoldBlue').length) {
                                            var type = 101;
                                            var text = "מתחיל אשראי חודש קודם" + " " + asrashiNumCard;
                                            //all.banks.core.services.sendLogs(type, text);
                                            all.banks.accounts.poalimAsakimNew.loadNextCard();
                                            $$ = null;
                                        }
                                    })
                                } else {
                                    var type = 101;
                                    var text = "מתחיל אשראי חודש קודם" + " " + asrashiNumCard;
                                    //all.banks.core.services.sendLogs(type, text);
                                    all.banks.accounts.poalimAsakimNew.loadNextCard();
                                    $$ = null;
                                }
                            } else if ($$.find("[name='current_kartis'] > option").length == 1) {
                                if ($$.find('#someDataMainTr no table.MAIN_BANKTABLE').length) {
                                    var accDetalisArr = $$.find('#allAcountsList option:selected script').text().split('new Acc(')[1].split(")")[0].split(",");
                                    var snifNum = accDetalisArr[1].replace(/\D/g, "");
                                    var accNum = accDetalisArr[2].replace(/\D/g, "");
                                    var AccountNumber = parseInt(accNum);
                                    var BranchNumber = parseInt(snifNum);
                                    $$.find('#someDataMainTr no table.MAIN_BANKTABLE').each(function (indx, va) {
                                        var nextDate = null, IndFakeDate = 1, NextTotalSum = null;
                                        var datePrevNow = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                                        var datePrevOne = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
                                        var datePrevTwo = new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1);
                                        var datePrevThree = new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1);
                                        var nextCy;
                                        var vaRow = $(va);
                                        if (!vaRow.closest("t_table_chul").length) {
                                            var yearThis;
                                            if (vaRow.find('tr[name="summRow"]').length) {
                                                IndFakeDate = 0;
                                                nextCy = vaRow.find('tr[name="summRow"]:last td[headers="header2"]').text().split('/');
                                                if ((datePrevNow.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                    yearThis = datePrevNow.getFullYear();
                                                }
                                                if ((datePrevOne.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                    yearThis = datePrevOne.getFullYear();
                                                }
                                                if ((datePrevTwo.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                    yearThis = datePrevTwo.getFullYear();
                                                }
                                                nextDate = yearThis + '' + nextCy[1].replace(/\D/g, "") + '' + nextCy[0].replace(/\D/g, "");
                                                NextTotalSum = vaRow.find('tr[name="summRow"]:last td[headers="header5"]').text().replace(/,/g, '');
                                                if (vaRow.find('tr[name="summRow"]').length == 2) {
                                                    if (parseFloat(vaRow.find('tr[name="summRow"]:first td[headers="header5"]').text().replace(/,/g, '')) > parseFloat(NextTotalSum)) {
                                                        var hanaha = vaRow.find('tr[name="summRow"]:first td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, "");
                                                        if (hanaha.indexOf("הנחה") == -1) {
                                                            hanaha = vaRow.find('tr[name="summRow"]:first td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "");
                                                        }
                                                        var sums = poalimAsakimNew.returnNumAll(hanaha);
                                                        if (sums.toString().indexOf('-') !== -1) {
                                                            sums = -Math.abs(parseFloat(sums))
                                                        }
                                                        all.banks.generalVariables.allDataArrAshrai.push({
                                                            "BankNumber": 12,
                                                            "TargetId": all.banks.generalVariables.AccountNumber,
                                                            "Token": all.banks.generalVariables.branchNumber,
                                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                                            "BranchNumber": BranchNumber,
                                                            "AccountNumber": AccountNumber,
                                                            "CardNumber": $$.find("[name='current_kartis'] > option").val().slice(0, 4).replace(/\D/g, ""),
                                                            "NextBillingDate": nextDate,
                                                            "NextCycleTotal": NextTotalSum,
                                                            "CardStatus": null,
                                                            "TransDesc": "הנחה",
                                                            "TransTotal": poalimAsakimNew.returnClearSum(sums),
                                                            "ValueDate": nextDate,
                                                            "TransCategory": null,
                                                            "TotalPayments": null,
                                                            "CurrentPaymentNum": null,
                                                            "CardType": 22,
                                                            "indFakeDate": 0,
                                                            "currency_id": 1,
                                                            "original_total": poalimAsakimNew.returnClearSum(sums),
                                                            "ind_iskat_hul": 1,
                                                            "comment": hanaha
                                                        })
                                                    }
                                                }
                                            } else if (vaRow.find('tr#trTotal').length) {
                                                IndFakeDate = 0;
                                                nextCy = vaRow.find('tr#trTotal:last td[headers="header2"]').text().split('/');
                                                if ((datePrevNow.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                    yearThis = datePrevNow.getFullYear();
                                                }
                                                if ((datePrevOne.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                    yearThis = datePrevOne.getFullYear();
                                                }
                                                if ((datePrevTwo.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                    yearThis = datePrevTwo.getFullYear();
                                                }
                                                nextDate = yearThis + '' + nextCy[1].replace(/\D/g, "") + '' + nextCy[0].replace(/\D/g, "");
                                                NextTotalSum = vaRow.find('tr#trTotal:last td[headers="header5"]').text().replace(/,/g, '');
                                            }
                                        }
                                        var dataMonthlyCycle = {
                                            'BankNumber': 12,
                                            "BranchNumber": BranchNumber,
                                            "AccountNumber": AccountNumber,
                                            'NextTotal': NextTotalSum,
                                            'CardNumber': $$.find("[name='current_kartis']").val().slice(0, 4),
                                            'CardType': 22,
                                            'NextBillingDate': nextDate
                                        };
                                        asrashiNumCard.push($$.find("[name='current_kartis']").val().slice(0, 4).replace(/\D/g, ""));
                                        var ind_iskat_hul = 1;
                                        ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(vaRow.find("tr.TR_BANKTABLE th#header5").text());

                                        var detectActionInformation;
                                        var indicatorDmeiKartis = 0;
                                        vaRow.find('tr.TR_ROW_BANKTABLE').each(function (i1, v1) {
                                                var varRowEach = $(v1);

                                                // if (varRowEach.find('td[headers="header1"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") !== '')
                                                if ((varRowEach.find('td[headers="header1"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") !== '') ||
                                                    (varRowEach.find('td[headers="header5"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") !== '' &&
                                                        varRowEach.attr("id") !== "trTotal" &&
                                                        varRowEach.find('td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") !== ''
                                                        && varRowEach.find('td[headers="header1"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") == '')) {
                                                    try {

                                                        indicatorDmeiKartis = 0;

                                                        if (varRowEach.prev('.TR_BANKTABLE').length && varRowEach.prev('.TR_BANKTABLE').find('td').text().indexOf('לידיעה ') != -1) {
                                                            detectActionInformation = 'לידיעה בלבד';
                                                        }

                                                        var totalPaymentsSum = null, currentPaymentNumSum = null,
                                                            ifIsPayment = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").indexOf('ךותמ'),
                                                            ifIsPaymentCre = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").indexOf('םולשתטידרק'),
                                                            ifIsPaymentCreAlso = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").indexOf('םולשתריהמיארשא');

                                                        if (ifIsPayment !== -1) {
                                                            totalPaymentsSum = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").split('ךותמ')[0].replace(/\D/g, "");
                                                            currentPaymentNumSum = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").split('ךותמ')[1].replace(/\D/g, "");
                                                        }
                                                        if (ifIsPaymentCre !== -1 || ifIsPaymentCreAlso !== -1) {
                                                            totalPaymentsSum = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").split('מ')[0].replace(/\D/g, "");
                                                            currentPaymentNumSum = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").split('מ')[1].replace(/\D/g, "");
                                                        }


                                                        var valDate, yearLoop;
                                                        var currencyId = 1;
                                                        if (vaRow.closest("t_table_chul").length) {
                                                            if (varRowEach.attr("id") !== "trTotal") {
                                                                var nextTrTotal = varRowEach.next();
                                                                if ($(nextTrTotal).attr("id") == "trTotal") {
                                                                    nextTrTotal = varRowEach.next();
                                                                } else {
                                                                    var nextTotal = varRowEach.nextUntil("#trTotal").next();
                                                                    nextTrTotal = nextTotal.eq(nextTotal.length - 1);
                                                                }
                                                                IndFakeDate = 0;

                                                                if ($(nextTrTotal).find('td[headers="header2"]').text() != '') {
                                                                    var nextCy1 = $(nextTrTotal).find('td[headers="header2"]').text().split('/');
                                                                    if ((datePrevNow.getMonth() + 1) == parseFloat(nextCy1[1].replace(/\D/g, ""))) {
                                                                        yearThis = datePrevNow.getFullYear();
                                                                    }
                                                                    if ((datePrevOne.getMonth() + 1) == parseFloat(nextCy1[1].replace(/\D/g, ""))) {
                                                                        yearThis = datePrevOne.getFullYear();
                                                                    }
                                                                    if ((datePrevTwo.getMonth() + 1) == parseFloat(nextCy1[1].replace(/\D/g, ""))) {
                                                                        yearThis = datePrevTwo.getFullYear();
                                                                    }
                                                                    nextDate = yearThis + '' + nextCy1[1].replace(/\D/g, "") + '' + nextCy1[0].replace(/\D/g, "");
                                                                    NextTotalSum = $(nextTrTotal).find('td[headers="header5"]').text().replace(/,/g, '');
                                                                    dataMonthlyCycle.NextTotal = NextTotalSum;
                                                                    dataMonthlyCycle.NextBillingDate = nextDate;
                                                                    valDate = varRowEach.find('td[headers="header1"]').text().split('/');
                                                                    if (nextCy1.length == 1) {
                                                                        nextCy1 = valDate;
                                                                    }
                                                                    if ((datePrevNow.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                        yearLoop = datePrevNow.getFullYear();
                                                                    }
                                                                    if ((datePrevOne.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                        yearLoop = datePrevOne.getFullYear();
                                                                    }
                                                                    if ((datePrevTwo.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                        yearLoop = datePrevTwo.getFullYear();
                                                                    }
                                                                    if (currentPaymentNumSum !== null) {
                                                                        yearLoop = new Date(parseFloat(yearThis), (parseFloat(nextCy1[1].replace(/\D/g, "")) - 1) - currentPaymentNumSum, parseFloat(nextCy1[0].replace(/\D/g, ""))).getFullYear();
                                                                    }
                                                                    if (yearLoop == undefined) {
                                                                        if ((datePrevThree.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                            yearLoop = datePrevThree.getFullYear();
                                                                        }
                                                                    }

                                                                } else {
                                                                    valDate = varRowEach.find('td[headers="header1"]').text().split('/');
                                                                    if ((datePrevNow.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                        yearLoop = datePrevNow.getFullYear();
                                                                    }
                                                                    if ((datePrevOne.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                        yearLoop = datePrevOne.getFullYear();
                                                                    }
                                                                    if ((datePrevTwo.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                        yearLoop = datePrevTwo.getFullYear();
                                                                    }
                                                                    if (currentPaymentNumSum !== null) {
                                                                        yearLoop = new Date(parseFloat(yearThis), (parseFloat(nextCy[1].replace(/\D/g, "")) - 1) - currentPaymentNumSum, parseFloat(nextCy[0].replace(/\D/g, ""))).getFullYear();
                                                                    }
                                                                    if (yearLoop == undefined) {
                                                                        if ((datePrevThree.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                            yearLoop = datePrevThree.getFullYear();
                                                                        }
                                                                    }
                                                                }
                                                                var textCurr = varRowEach.find('td[headers="header4"]').text();
                                                                currencyId = all.banks.core.services.getTypeCurrencyAll(textCurr);
                                                            }
                                                        } else {
                                                            if (varRowEach.attr("class") !== "TR_TOTAL") {
                                                                var nextTrTotal = varRowEach.next();
                                                                if ($(nextTrTotal).attr("class") == "TR_TOTAL") {
                                                                    nextTrTotal = varRowEach.next();
                                                                } else {
                                                                    var nextTotal = varRowEach.nextUntil(".TR_TOTAL").next();
                                                                    nextTrTotal = nextTotal.eq(nextTotal.length - 1);
                                                                }
                                                                IndFakeDate = 0;
                                                                valDate = varRowEach.find('td[headers="header1"]').text().split('/');
                                                                var nextCy1 = $(nextTrTotal).find('td[headers="header2"]').text().split('/');
                                                                if (nextCy1 == '') {
                                                                    nextCy1 = valDate;
                                                                }
                                                                if (valDate.length < 2) {
                                                                    valDate = nextCy1;
                                                                }
                                                                if ((datePrevNow.getMonth() + 1) == parseFloat(nextCy1[1].replace(/\D/g, ""))) {
                                                                    yearThis = datePrevNow.getFullYear();
                                                                }
                                                                if ((datePrevOne.getMonth() + 1) == parseFloat(nextCy1[1].replace(/\D/g, ""))) {
                                                                    yearThis = datePrevOne.getFullYear();
                                                                }
                                                                if ((datePrevTwo.getMonth() + 1) == parseFloat(nextCy1[1].replace(/\D/g, ""))) {
                                                                    yearThis = datePrevTwo.getFullYear();
                                                                }
                                                                nextDate = yearThis + '' + nextCy1[1].replace(/\D/g, "") + '' + nextCy1[0].replace(/\D/g, "");
                                                                NextTotalSum = $(nextTrTotal).find('td[headers="header5"]').text().replace(/,/g, '');

                                                                if (NextTotalSum && NextTotalSum.trim().length === 0) {
                                                                    NextTotalSum = '0.00';
                                                                }

                                                                dataMonthlyCycle.NextTotal = NextTotalSum;
                                                                dataMonthlyCycle.NextBillingDate = nextDate;

                                                                if ((datePrevNow.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                    yearLoop = datePrevNow.getFullYear();
                                                                }
                                                                if ((datePrevOne.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                    yearLoop = datePrevOne.getFullYear();
                                                                }
                                                                if ((datePrevTwo.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                    yearLoop = datePrevTwo.getFullYear();
                                                                }
                                                                if (currentPaymentNumSum !== null) {
                                                                    yearLoop = new Date(parseFloat(yearThis), (parseFloat(nextCy1[1].replace(/\D/g, "")) - 1) - currentPaymentNumSum, parseFloat(nextCy1[0].replace(/\D/g, ""))).getFullYear();
                                                                }
                                                                if (yearLoop == undefined) {
                                                                    if ((datePrevThree.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                        yearLoop = datePrevThree.getFullYear();
                                                                    } else {
                                                                        yearLoop = new Date().getFullYear()

                                                                    }
                                                                }

                                                            } else {
                                                                IndFakeDate = 0;
                                                                valDate = varRowEach.find('td[headers="header1"]').text().split('/');
                                                                if ((datePrevNow.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                    yearLoop = datePrevNow.getFullYear();
                                                                }
                                                                if ((datePrevOne.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                    yearLoop = datePrevOne.getFullYear();
                                                                }
                                                                if ((datePrevTwo.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                    yearLoop = datePrevTwo.getFullYear();
                                                                }
                                                                if (currentPaymentNumSum !== null) {
                                                                    yearLoop = new Date(parseFloat(yearThis), (parseFloat(nextCy[1].replace(/\D/g, "")) - 1) - currentPaymentNumSum, parseFloat(nextCy[0].replace(/\D/g, ""))).getFullYear();
                                                                }
                                                                if (yearLoop == undefined) {
                                                                    if ((datePrevThree.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                                        yearLoop = datePrevThree.getFullYear();
                                                                    }
                                                                }
                                                            }

                                                        }
                                                        var comment = "";
                                                        if (varRowEach.find('td[headers="header6"]').length) {
                                                            var commentArray = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/ /g, '').trim();

                                                        }
                                                        var original_total = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header4"]').text().split(" ")[0]);
                                                        if (original_total.toString().indexOf('-') !== -1) {
                                                            original_total = -Math.abs(parseFloat(original_total))
                                                        }
                                                        var transTotal = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header5"]').text());
                                                        var transDesc = varRowEach.find('td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, "");
                                                        if (transDesc.indexOf("CASHBACK") !== -1) {
                                                            comment += " CASHBACK";
                                                        }

                                                        if (detectActionInformation != undefined) {
                                                            comment += detectActionInformation;
                                                        }

                                                        all.banks.generalVariables.allDataArrAshrai.push({
                                                            "BankNumber": 12,
                                                            "TargetId": all.banks.generalVariables.AccountNumber,
                                                            "Token": all.banks.generalVariables.branchNumber,
                                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                                            "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                            "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                            "CardNumber": dataMonthlyCycle.CardNumber,
                                                            "NextBillingDate": dataMonthlyCycle.NextBillingDate,
                                                            "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                                            "CardStatus": null,
                                                            "TransDesc": transDesc,
                                                            "TransTotal": poalimAsakimNew.returnClearSum(transTotal),
                                                            "ValueDate": valDate != '' ? (yearLoop + '' + valDate[1].replace(/\D/g, "") + '' + valDate[0].replace(/\D/g, "")) : dataMonthlyCycle.NextBillingDate,
                                                            "TransCategory": null,
                                                            "TotalPayments": totalPaymentsSum,
                                                            "CurrentPaymentNum": currentPaymentNumSum,
                                                            "CardType": 22,
                                                            "indFakeDate": IndFakeDate,
                                                            "currency_id": currencyId,
                                                            "original_total": original_total,
                                                            "ind_iskat_hul": ind_iskat_hul,
                                                            "comment": comment
                                                        })
                                                    } catch (e) {
                                                        //myEmitterLogs(88);
                                                    }
                                                } else if ((varRowEach.find('td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, "").indexOf('סה"כ עסקות') == -1) && !vaRow.closest("t_table_chul").length && varRowEach.attr("id") !== "trTotal" &&
                                                    varRowEach.find('td[headers="header1"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") == '' &&
                                                    varRowEach.find('td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") !== '' && detectActionInformation == undefined) {
                                                    IndFakeDate = 0;
                                                    var comment = "";
                                                    var commentArray = varRowEach.next().find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/ /g, '').trim();

                                                    var original_total = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header5"]').text());
                                                    if (original_total.toString().indexOf('-') !== -1) {
                                                        original_total = -Math.abs(parseFloat(original_total))
                                                    }
                                                    var transDesc = varRowEach.find('td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, "");
                                                    if (transDesc.indexOf("CASHBACK") !== -1) {
                                                        comment += " CASHBACK";
                                                    }
                                                    if (indicatorDmeiKartis == 0) {

                                                        all.banks.generalVariables.allDataArrAshrai.push({
                                                            "BankNumber": 12,
                                                            "TargetId": all.banks.generalVariables.AccountNumber,
                                                            "Token": all.banks.generalVariables.branchNumber,
                                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                                            "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                            "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                            "CardNumber": dataMonthlyCycle.CardNumber,
                                                            "NextBillingDate": dataMonthlyCycle.NextBillingDate,
                                                            "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                                            "CardStatus": null,
                                                            "TransDesc": transDesc,
                                                            "TransTotal": poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header5"]').text()),
                                                            "ValueDate": dataMonthlyCycle.NextBillingDate,
                                                            "TransCategory": null,
                                                            "TotalPayments": null,
                                                            "CurrentPaymentNum": null,
                                                            "CardType": 22,
                                                            "indFakeDate": IndFakeDate,
                                                            "currency_id": 1,
                                                            "original_total": original_total,
                                                            "ind_iskat_hul": 1,
                                                            "comment": comment
                                                        })

                                                        if (varRowEach.find('td[headers="header5"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") == '') {
                                                            indicatorDmeiKartis++;
                                                        }
                                                    }
                                                } else if (!vaRow.closest("t_table_chul").length &&
                                                    varRowEach.attr("id") !== "trTotal" &&
                                                    varRowEach.find('td[headers="header1"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") == '' &&
                                                    varRowEach.find('td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") == '' &&
                                                    varRowEach.find('td[headers="header4"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") == '' &&
                                                    varRowEach.find('td[headers="header5"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") != '') {
                                                    indicatorDmeiKartis = 0;
                                                    all.banks.generalVariables.allDataArrAshrai[all.banks.generalVariables.allDataArrAshrai.length - 1].TransTotal = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header5"]').text());
                                                }
                                            }
                                        )
                                        if (indx + 1 == $$.find('#someDataMainTr no table.MAIN_BANKTABLE').length) {
                                            all.banks.accounts.poalimAsakimNew.loadNextCard();
                                            $$ = null;
                                        }
                                    })
                                } else {
                                    var type = 101;
                                    var text = "מתחיל אשראי חודש קודם" + " " + "לא נמצאו אשראים עם נתונים";
                                    all.banks.accounts.poalimAsakimNew.loadNextCard();
                                    $$ = null;
                                }
                            } else {
                                var type = 101;
                                var text = "מתחיל אשראי חודש קודם" + " " + "לא נמצאו אשראים עם נתונים";
                                all.banks.accounts.poalimAsakimNew.loadNextCard();
                                $$ = null;
                            }
                        }
                    }
                } catch (e) {
                    all.banks.accounts.poalimAsakimNew.loadNextCard();
                    res = null;
                }
            })
            .fail(function (error, resErr, urlParam) {
                // var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                // all.banks.core.services.errorLog(logErr)
                all.banks.accounts.poalimAsakimNew.loadNextCard();
            });
    }
    poalimAsakimNew.loadAsharaiPrevNew = function (prevMonth) {
        var accDetalis = all.banks.accounts.poalimAsakimNew.vddVal.BANK_SNIF_ACCOUNT_KEY;
        var arrAcc = accDetalis.split('-');
        var urlXhr = 'https://biz2.bankhapoalim.co.il/ServerServices/plastic-cards/transactions?accountId=12-' + arrAcc[1] + '-' + arrAcc[0];
        all.banks.core.services.httpReq(urlXhr + (prevMonth ? '&statementDate=' + prevMonth : '') + '&type=previous', 'GET', null, false, false)
            // .then(poalimAsakimNew.failIfRedirectedToError)
            .then(function (data, res1, res2) {
                if (data && Array.isArray(data.plasticCardData) && data.plasticCardData.length > 0) {
                    data.plasticCardData.forEach(readCardData);
                }

                prevMonthsArr = data && Array.isArray(data.dates) && data.dates.length > 0 ? data.dates : undefined;

                function readCardData(cardData) {
                    let cardNum;
                    try {
                        const key1 = Object.keys(cardData.summary.prev)[0],
                            key2 = Object.keys(cardData.summary.prev[key1].summariesByCurrencyCodes)[0],
                            key3 = Object.keys(cardData.summary.prev[key1].summariesByCurrencyCodes[key2].summaryDetails)[0];
                        cardNum = cardData.summary.prev[key1].summariesByCurrencyCodes[key2].summaryDetails[key3].plasticCardNumberSuffix;
                    } catch (e) {
                        cardNum = cardData.plasticCardNumberWithoutPrefix.length > 9
                            ? cardData.plasticCardNumberWithoutPrefix.slice(-5, -1) : cardData.plasticCardNumberWithoutPrefix.slice(-4);
                    }

                    Object.keys(cardData.vauchers).forEach((key1) => {
                        Object.keys(cardData.vauchers[key1].vauchersByCurrencyCodes).forEach((key2) => {
                            Object.keys(cardData.vauchers[key1].vauchersByCurrencyCodes[key2].vaucherDetails).forEach((key3, key3Idx) => {
                                try {
                                    const mapKey = cardNum + '|' + key1 + '|' + key2 + '|' + key3;
                                    if (poalimAsakimNew.ashraiProcessedMap.includes(mapKey)) {
                                        writeLog(`Duplicate! ${cardNum} on ${key3} for currency ${key2} already processed. Skipping it.`);
                                        return;
                                    } else {
                                        poalimAsakimNew.ashraiProcessedMap.push(mapKey);
                                    }
                                    const rowsToProcess = cardData.vauchers[key1].vauchersByCurrencyCodes[key2].vaucherDetails[key3];
                                    if (!Array.isArray(rowsToProcess)) {
                                        writeLog(`Incorrect data. Cannot locate cardData.vauchers[${key1}].vauchersByCurrencyCodes[${key2}].vaucherDetails[${key3}]. 
                                                        Found ${Object.keys(cardData.vauchers[key1].vauchersByCurrencyCodes[key2].vaucherDetails)}`);
                                        return;
                                    }
                                    const recordsProcessed = [];

                                    rowsToProcess.forEach((row, rowIdx) => {
                                        if (!row.eventDate) {
                                            if (row.debitAmount == 0 && !row.clientBusinessName) {
                                                return;
                                            }
                                            if (row.recordTypeCode === 160) {
                                                return;
                                            }
                                            if (recordsProcessed.length > 0 && rowIdx > 0 && rowsToProcess[rowIdx - 1].recordTypeCode === row.recordTypeCode) {
                                                recordsProcessed[recordsProcessed.length - 1].TransTotal = row.debitAmount;
                                                return;
                                            }
                                        }


                                        const record = {
                                            "BankNumber": 12,
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            "BranchNumber": parseInt(arrAcc[1]),
                                            "AccountNumber": parseInt(arrAcc[0]),
                                            "CardNumber": cardNum,
                                            "NextBillingDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.debitDate)),
                                            "NextCycleTotal": null,
                                            "CardStatus": null,
                                            "TransDesc": row.clientBusinessName,
                                            "TransTotal": row.debitAmount,
                                            "ValueDate": row.eventDate != 0 ? all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.eventDate)) : all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(row.debitDate)),
                                            "TotalPayments": row.paymentsNumber > 0 ? row.paymentsNumber : null,
                                            "CurrentPaymentNum": row.paymentNumber > 0 ? row.paymentNumber : null,
                                            "CardType": "22",
                                            "indFakeDate": 0,
                                            "original_total": row.originalAmount,
                                            "currency_id": all.banks.core.services.getTypeCurrencyAll(row.eventCurrencyDescription),
                                            "ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(row.debitCurrencyDescription),
                                            "comment": Array.isArray(row.partyComments) && row.partyComments.length > 0
                                                ? row.partyComments[0] : null
                                        };

                                        if (Array.isArray(row.partyComments) && row.partyComments.length > 0) {
                                            if (row.partyComments[0].indexOf('מתוך') !== -1) {
                                                const pymntNumFromNum = row.partyComments[0].split('מתוך');
                                                if (pymntNumFromNum.length > 1) {
                                                    record['CurrentPaymentNum'] = pymntNumFromNum[0].replace(/\D/g, "");
                                                    record['TotalPayments'] = pymntNumFromNum[1].replace(/\D/g, "");
                                                }
                                            }
                                        }

                                        if (all.banks.accountDetails.isCategory && row.economySectorDescription) {
                                            record['TransCategory'] = row.economySectorDescription;
                                        }

                                        recordsProcessed.push(record);
                                    });

                                    if (recordsProcessed.length > 0) {
                                        var sum = recordsProcessed.reduce((acc, rec) => acc + rec.TransTotal, 0).toFixed(2);
                                        recordsProcessed.forEach((rec) => {
                                            rec.NextCycleTotal = sum;

                                            if (rec['comment'] && rec['comment'].indexOf('הנחה') !== -1) {
                                                rec['TransTotal'] = Number(rec['TransTotal']) - parseFloat(rec['comment'].replace(/[^\d\.-]/g, ""));
                                            }
                                        });
                                        all.banks.generalVariables.allDataArrAshrai.push(...recordsProcessed);
                                    }

                                } catch (exception) {
                                }
                            });

                        });
                    });
                }
            })
            .fail(function (error, resErr, urlParam) {
                writeLog(`loadAshrai(${prevMonth}) - request failed: ${error}`);
            })
            .always(() => {
                if (poalimAsakimNew.haltAndWaitForReload === true) {
                    return;
                }

                poalimAsakimNew.counterCardPrev++;
                if (poalimAsakimNew.counterCardPrev < all.banks.accounts.poalimAsakimNew.vddVal.IND_CCARD_DATA) {
                    let nextPrevMonth;
                    if (Array.isArray(prevMonthsArr) && poalimAsakimNew.counterCardPrev < prevMonthsArr.length) {
                        nextPrevMonth = prevMonthsArr[poalimAsakimNew.counterCardPrev].retrievalEndDate;
                    } else {
                        const tmpNow = all.banks.core.services.addMonthsToDate(new Date(), -1 * poalimAsakimNew.counterCardPrev);
                        nextPrevMonth = tmpNow.getFullYear() * 10000 + (tmpNow.getMonth() + 1) * 100;
                    }
                    poalimAsakimNew.loadAsharaiPrevNew(nextPrevMonth);
                } else {
                    poalimAsakimNew.loadDateNow();
                }
            });
    };
    poalimAsakimNew.loadDateNow = function () {
        var accDetalis = all.banks.accounts.poalimAsakimNew.vddVal.BANK_SNIF_ACCOUNT_KEY;
        var arrAcc = accDetalis.split('-');

        var urlXhr = 'https://biz2.bankhapoalim.co.il/ServerServices/plastic-cards/transactions?accountId=12-' + arrAcc[1] + '-' + arrAcc[0] + '&type=current&view=totals';
        all.banks.core.services.httpReq(urlXhr, 'GET', null, false, false)
            // .then(poalimAsakimNew.failIfRedirectedToError)
            .then(function (data, res1, res2) {
                try {
                    if (data.messageCode == 575) {
                        var urlXhr = 'https://biz2.bankhapoalim.co.il/ServerServices/plastic-cards/transactions?accountId=12' + arrAcc[1] + '-' + arrAcc[0] + '&type=current';
                        all.banks.core.services.httpReq(urlXhr, 'GET', null, false, false)
                            // .then(poalimAsakimNew.failIfRedirectedToError)
                            .then(function (data, res1, res2) {
                                try {
                                    if (data.plasticCardData && data.plasticCardData.length) {
                                        $(data.plasticCardData).each(function (i, v) {
                                            if (v.vauchers[1] !== undefined) {
                                                var vaucherDetails = v.vauchers[1].vauchersByCurrencyCodes[0].vaucherDetails;
                                                for (var x in vaucherDetails) {
                                                    var vaucherDetailsList = vaucherDetails[x];
                                                    if (vaucherDetailsList.length) {
                                                        $(vaucherDetailsList).each(function (i1, v1) {
                                                            if (v.summary.current[1] !== undefined) {
                                                                var cardNum = v.summary.current[1].summariesByCurrencyCodes[0].summaryDetails[x].plasticCardNumberSuffix;
                                                                var nextCycleTotal = v.summary.current[1].summariesByCurrencyCodes[0].summaryDetails[x].debitAmount;
                                                            } else {
                                                                var cardNum = v.summary.current[0].summariesByCurrencyCodes[0].summaryDetails[0].plasticCardNumberSuffix;
                                                                var nextCycleTotal = v.summary.current[0].summariesByCurrencyCodes[0].summaryDetails[0].debitAmount;
                                                            }

                                                            var nextBillingDate = null;
                                                            if (v1.formattedDebitDate !== null) {
                                                                nextBillingDate = new Date(v1.formattedDebitDate).getFullYear() + '' + ("0" + (new Date(v1.formattedDebitDate).getMonth() + 1)).slice(-2) + '' + ("0" + (new Date(v1.formattedDebitDate).getDate())).slice(-2);
                                                            }
                                                            var totalPaymentsSum = null, currentPaymentNumSum = null;
                                                            if (v1.partyComments !== null && v1.partyComments.length > 0) {
                                                                if (v1.partyComments[0].indexOf('מתוך') !== -1) {
                                                                    var textPayCard = v1.partyComments[0].split('מתוך');
                                                                    currentPaymentNumSum = textPayCard[0].replace(/\D/g, "");
                                                                    totalPaymentsSum = textPayCard[1].replace(/\D/g, "");
                                                                }
                                                            } else {
                                                                currentPaymentNumSum = v1.paymentNumber;
                                                                totalPaymentsSum = v1.paymentsNumber;
                                                            }
                                                            var currencyId = all.banks.core.services.getTypeCurrencyAll(v1.eventCurrencyDescription);
                                                            var ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(v1.debitCurrencyDescription);
                                                            var transTotal = v1.debitAmount;
                                                            if (v1.debitAmount == 0 && v1.originalAmount != 0) {
                                                                transTotal = v1.originalAmount;
                                                            }
                                                            if (totalPaymentsSum == 0) {
                                                                totalPaymentsSum = null;
                                                                if (currentPaymentNumSum == 0) {
                                                                    currentPaymentNumSum = null;
                                                                }
                                                            }
                                                            var transCategory = null;
                                                            if (all.banks.accountDetails.isCategory) {
                                                                transCategory = (v1.economySectorDescription !== undefined && v1.economySectorDescription !== "" && v1.economySectorDescription !== null) ? v1.economySectorDescription : null;
                                                            }
                                                            var comment = "";
                                                            if (v1.partyComments !== null && v1.partyComments.length > 0) {
                                                                if (v1.partyComments[0].indexOf('הנחה') !== -1) {
                                                                    comment = v1.partyComments[0];
                                                                    transTotal = Number(transTotal) - parseFloat(v1.partyComments[0].replace(/[^\d\.-]/g, ""));
                                                                }
                                                            }

                                                            all.banks.generalVariables.allDataArrAshrai.push({
                                                                "BankNumber": 12,
                                                                "TargetId": all.banks.accountDetails.bank.targetId,
                                                                "Token": all.banks.accountDetails.bank.token,
                                                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                "ExporterId": all.banks.spiderConfig.spiderId,
                                                                "BranchNumber": parseInt(arrAcc[1]),
                                                                "AccountNumber": parseInt(arrAcc[0]),
                                                                "CardNumber": cardNum,
                                                                "NextBillingDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(nextBillingDate)),
                                                                "NextCycleTotal": nextCycleTotal,
                                                                "CardStatus": null,
                                                                "TransDesc": v1.clientBusinessName,
                                                                "TransTotal": transTotal,//v1.debitAmount,
                                                                "ValueDate": v1.eventDate != 0 ? all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v1.eventDate)) : all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v1.debitDate)),
                                                                "TransCategory": transCategory,
                                                                "TotalPayments": totalPaymentsSum,
                                                                "CurrentPaymentNum": currentPaymentNumSum,
                                                                "CardType": "22",
                                                                "indFakeDate": 0,
                                                                "original_total": v1.originalAmount,
                                                                "currency_id": currencyId,
                                                                "ind_iskat_hul": ind_iskat_hul,
                                                                "comment": comment
                                                            });
                                                        })
                                                    }
                                                }
                                            }
                                        });
                                        poalimAsakimNew.sendCardsCtrl();
                                    } else {
                                        poalimAsakimNew.sendCardsCtrl();
                                    }
                                } catch (err) {
                                    poalimAsakimNew.sendCardsCtrl();

                                }
                            })
                            .fail(function (error, resErr, urlParam) {
                                poalimAsakimNew.sendCardsCtrl();

                            });
                    } else {
                        if (data.creditCardMyHomePageDetailsDataList) {
                            if (data.creditCardMyHomePageDetailsDataList.length) {
                                loadRowsForeign(data, function () {
                                    poalimAsakimNew.sendCardsCtrl();

                                });
                            } else {
                                poalimAsakimNew.sendCardsCtrl();
                            }
                        } else {
                            poalimAsakimNew.sendCardsCtrl();

                        }
                    }

                    function loadRowsForeign(row, cb) {
                        var arrRows = {};
                        var v = row.voucherDetailsByCardNumber;
                        if (Object.keys(v).length) {
                            for (var x in v) {
                                var cardPlasticCardNumberPrefix = v[x].plasticCardNumberPrefix.toString(),
                                    cardNum = v[x].plasticCardNumberPrefix.toString().slice(-4),
                                    idxTry = 0;

                                row.creditCardMyHomePageDetailsDataList.forEach(function (valueCards) {
                                    if ((cardPlasticCardNumberPrefix == valueCards.plasticCardNumberWithoutPrefix.toString()) && (idxTry == 0)) {
                                        idxTry = 1;
                                        cardNum = valueCards.plasticCardNumberSuffix;
                                    }
                                });

                                $(v[x].vouchersDetails).each(function (i1, v1) {
                                    if (
                                        (v1.clientBusinessName !== null)
                                        &&
                                        ((v1.eventDate !== 0 && v1.recordTypeCode !== 160) || (v1.eventDate == 0 && v1.recordTypeCode !== 160) || (v1.eventDate !== 0 && v1.recordTypeCode == 160))
                                    ) {
                                        var totalPaymentsSum = null, currentPaymentNumSum = null;
                                        if (v1.partyComments !== null && v1.partyComments.length > 0) {
                                            if (v1.partyComments[0].indexOf('מתוך') !== -1) {
                                                var textPayCard = v1.partyComments[0].split('מתוך');
                                                currentPaymentNumSum = textPayCard[0].replace(/\D/g, "");
                                                totalPaymentsSum = textPayCard[1].replace(/\D/g, "");
                                            }
                                        } else {
                                            currentPaymentNumSum = v1.paymentNumber;
                                            totalPaymentsSum = v1.paymentsNumber;
                                        }

                                        var transTotal = v1.debitAmount;
                                        if (v1.debitAmount == 0 && v1.originalAmount !== 0) {
                                            transTotal = v1.originalAmount;
                                        }
                                        if (totalPaymentsSum == 0) {
                                            totalPaymentsSum = null;
                                            if (currentPaymentNumSum == 0) {
                                                currentPaymentNumSum = null;
                                            }
                                        }

                                        var currencyId = all.banks.core.services.getTypeCurrencyAll(v1.eventCurrencyDescription);
                                        var ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(v1.debitCurrencyDescription);
                                        if (!arrRows[v1.debitDate]) {
                                            arrRows[v1.debitDate] = [];
                                        }
                                        var transCategory = null;
                                        if (all.banks.accountDetails.isCategory) {
                                            transCategory = (v1.economySectorDescription !== undefined && v1.economySectorDescription !== "" && v1.economySectorDescription !== null) ? v1.economySectorDescription : null;
                                        }
                                        var comment = "";
                                        if (v1.partyComments !== null && v1.partyComments.length > 0) {
                                            if (v1.partyComments[0].indexOf('הנחה') !== -1) {
                                                comment = v1.partyComments[0];
                                                transTotal = Number(transTotal) - parseFloat(v1.partyComments[0].replace(/[^\d\.-]/g, ""));
                                            }
                                        }

                                        arrRows[v1.debitDate].push({
                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            "BranchNumber": parseInt(arrAcc[1]),
                                            "AccountNumber": parseInt(arrAcc[0]),
                                            "CardNumber": cardNum,
                                            "NextBillingDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v1.debitDate)),
                                            "NextCycleTotal": null,
                                            "CardStatus": null,
                                            "TransDesc": v1.clientBusinessName,
                                            "TransTotal": transTotal, //v1.debitAmount,
                                            "ValueDate": v1.eventDate != 0 ? all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v1.eventDate)) : all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v1.debitDate)),
                                            "TransCategory": transCategory,
                                            "TotalPayments": totalPaymentsSum,
                                            "CurrentPaymentNum": currentPaymentNumSum,
                                            "CardType": "22",
                                            "indFakeDate": 0,
                                            "original_total": v1.originalAmount,
                                            "currency_id": currencyId,
                                            "ind_iskat_hul": ind_iskat_hul,
                                            "comment": comment
                                        })
                                    }

                                    if (i1 + 1 == v[x].vouchersDetails.length) {
                                        if (Object.keys(arrRows).length) {
                                            var idx = -1;
                                            for (var x1 in arrRows) {
                                                idx += 1;
                                                var sum = arrRows[x1].reduce(function (acc, val) {
                                                    return acc + val.TransTotal;
                                                }, 0);
                                                $(arrRows[x1]).each(function (i2, v2) {
                                                    v2.NextCycleTotal = Number(sum.toFixed(2));
                                                    all.banks.generalVariables.allDataArrAshrai.push(v2);
                                                    if ((i2 + 1 == arrRows[x1].length) && ((idx + 1) == Object.keys(arrRows).length)) {
                                                        delete v[x];
                                                        loadRowsForeign(row, cb);
                                                    }
                                                });
                                            }
                                        } else {
                                            delete v[x];
                                            loadRowsForeign(row, cb);
                                        }
                                    }
                                });
                                break;
                            }
                        } else {
                            cb();
                        }
                    }
                } catch (err) {
                    poalimAsakimNew.sendCardsCtrl();

                }
            })
            .fail(function (error, resErr, urlParam) {
                poalimAsakimNew.sendCardsCtrl();
            });
    };
    poalimAsakimNew.returnClearSum = function (text) {
        try {
            var text = text.toString();
            if (text !== undefined && text !== null) {
                var sumClear = text.replace(/[^\d\.-]/g, "");
                return sumClear;
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    }
    poalimAsakimNew.alreadyFetchedInPrevious = function (signiture) {
        if (!all.banks.generalVariables.allDataArrAshrai || all.banks.generalVariables.allDataArrAshrai.length === 0
            || !signiture || !signiture['BranchNumber'] || !signiture['AccountNumber'] || !signiture['CardNumber']
            || !signiture['NextBillingDate'] || !signiture['NextCycleTotal'] || !signiture['ValueDate']) {
            return false;
        }

        for (var idx = all.banks.generalVariables.allDataArrAshrai.length - 1; idx >= 0; idx--) {
            var cardTrans = all.banks.generalVariables.allDataArrAshrai[idx];
            if (cardTrans['CardNumber'] === signiture['CardNumber']
                && cardTrans['NextBillingDate'] === signiture['NextBillingDate']
                && cardTrans['NextCycleTotal'] === signiture['NextCycleTotal']
                && cardTrans['ValueDate'] === signiture['ValueDate']
                && cardTrans['BranchNumber'] === signiture['BranchNumber']
                && cardTrans['AccountNumber'] === signiture['AccountNumber']) {
                return true;
            }
        }
        return false;
    }
    poalimAsakimNew.loadNextCard = function () {
        var url = "https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?ctfw=user&reqName=action&language=HE&transactionId=CurrCCNewSummary*all&subMenuName=CreditCards&ts=" + poalimAsakimNew.varGlobal.ts + "&tf=" + Math.random() + "&u=" + poalimAsakimNew.varGlobal.u + "&pSubMenu=CreditCards&fromSubMenu=CreditCards&bxx=912&nsv=y&dwx=" + poalimAsakimNew.varGlobal.dwx + "&wScr=1920&hScr=1080&tcfo=" + poalimAsakimNew.varGlobal.tcfo + "&mmx=" + poalimAsakimNew.varGlobal.mmx + "&qwrt=" + poalimAsakimNew.varGlobal.qwrt + "&tsfo=" + poalimAsakimNew.varGlobal.tsfo + "&dtcdb=0&menuTranName=CurrCCNewSummary*all";
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (data, bbb, ccc) {
                var $$ = all.banks.core.services.parseHtml(data);
                data = null;
                var ts = $$.find('input[name="ts"]').val();
                var u = $$.find('input[name="u"]').val();
                var dwx = $$.find('input[name="dwx"]').val();
                var tcfo = $$.find('input[name="tcfo"]').val();
                var qwrt = $$.find('input[name="qwrt"]').val();
                var tsfo = $$.find('input[name="tsfo"]').val();
                var mmx = $$.find('input[name="mmx"]').val();
                var dwxReq = $$.find('input[name="dwxReq"]').val();
                var dwxOp = $$.find('input[name="dwxOp"]').val();
                poalimAsakimNew.varGlobal.ts = ts;
                poalimAsakimNew.varGlobal.u = u;
                poalimAsakimNew.varGlobal.dwx = dwx;
                poalimAsakimNew.varGlobal.tcfo = tcfo;
                poalimAsakimNew.varGlobal.qwrt = qwrt;
                poalimAsakimNew.varGlobal.tsfo = tsfo;
                poalimAsakimNew.varGlobal.mmx = mmx;
                poalimAsakimNew.varGlobal.dwxReq = dwxReq;
                poalimAsakimNew.varGlobal.dwxOp = dwxOp;
                var expires = ccc.getResponseHeader("X-FRAME-OPTIONS");
                if (expires == null) {

                    poalimAsakimNew.setNewTime(function () {
                        poalimAsakimNew.loadNextCard();
                    });
                    //all.banks.accounts.poalimAsakimNew.logOut();
                    $$ = null;
                } else {
                    if ($$.find('#errMfTable').length && $$.find('#errMfTable').text().indexOf("לא נתקבלו") !== -1) {
                        all.banks.accounts.poalimAsakimNew.sendCardsCtrl();
                        $$ = null;
                    } else {
                        if (($$.find("[name='current_kartis'] > option").length > 1) && $$.find('#someDataMainTr else > table.arial12NoBold .arial12BoldBlue').length) {
                            if ($$.find('#someDataMainTr else > table.arial12NoBold .arial12BoldBlue').length) {
                                var asrashiNumCardNext = [];
                                var accDetalisArr = $$.find('#allAcountsList option:selected script').text().split('new Acc(')[1].split(")")[0].split(",");
                                var snifNum = accDetalisArr[1].replace(/\D/g, "");
                                var accNum = accDetalisArr[2].replace(/\D/g, "");
                                var AccountNumber = parseInt(accNum);
                                var BranchNumber = parseInt(snifNum);
                                $$.find('#someDataMainTr else > table.arial12NoBold').each(function (i, v) {
                                    if ($(v).text() == "") {
                                        $(v).remove();
                                    }
                                });
                                $$.find('#someDataMainTr else > table.arial12NoBold .arial12BoldBlue').each(function (i, v) {
                                    if ($(v).text() !== "" && $(v).text().indexOf('לא התקבלו') == -1) {
                                        var groupWrap = $(this).closest('table.arial12NoBold').nextUntil("#someDataMainTr else > table.arial12NoBold");
                                        $(groupWrap).find('.MAIN_BANKTABLE').each(function (indx, va) {
                                            var vaRow = $(va);
                                            var datePrevNow = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
                                            var datePrevOne = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                                            var datePrevTwo = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
                                            asrashiNumCardNext.push($(v).text().replace(/\D/g, ""));
                                            //if (vaRow.closest("t_table_chul").length) {
                                            //	if (vaRow.find('tr.TR_BANKTABLE:first td').text().indexOf("בדולר") !== -1) {
                                            //
                                            //	}
                                            //	if (vaRow.find('tr.TR_BANKTABLE:first td').text().indexOf('בש"ח') !== -1) {
                                            //
                                            //	}
                                            //}
                                            if (vaRow.find('tr.TR_ROW_BANKTABLE:first td').length == 7) {
                                                var NextTotalSum = null;
                                                if (vaRow.find('tr#trTotal').length) {
                                                    NextTotalSum = vaRow.find('tr#trTotal:last td[headers="header7"]').text().replace(/,/g, '');
                                                }
                                                var dataMonthlyCycle = {
                                                    'BankNumber': 12,
                                                    "BranchNumber": BranchNumber,
                                                    "AccountNumber": AccountNumber,
                                                    'NextTotal': NextTotalSum,
                                                    'CardNumber': $(v).text().replace(/\D/g, ""),
                                                    'CardType': 22,
                                                    'NextBillingDate': null
                                                }

                                                vaRow.find('tr.TR_ROW_BANKTABLE').each(function (i1, v1) {
                                                    var varRowEach = $(v1);
                                                    if (varRowEach.find('td[headers="header1"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") !== '') {
                                                        var totalPaymentsSum = null, currentPaymentNumSum = null;
                                                        var valDate = varRowEach.find('td[headers="header1"]').text().split('/');
                                                        var NextBillingDate = varRowEach.find('td[headers="header2"]').text().split('/');
                                                        var yearLoop, yearThis;
                                                        if ((datePrevOne.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                            yearLoop = datePrevOne.getFullYear();
                                                        }
                                                        if ((datePrevTwo.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                            yearLoop = datePrevTwo.getFullYear();
                                                        }
                                                        if ((datePrevNow.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                            yearLoop = datePrevNow.getFullYear();
                                                        }


                                                        if ((datePrevOne.getMonth() + 1) == parseFloat(NextBillingDate[1].replace(/\D/g, ""))) {
                                                            yearThis = datePrevOne.getFullYear();
                                                        }
                                                        if ((datePrevTwo.getMonth() + 1) == parseFloat(NextBillingDate[1].replace(/\D/g, ""))) {
                                                            yearThis = datePrevOne.getFullYear();
                                                        }
                                                        if ((datePrevNow.getMonth() + 1) == parseFloat(NextBillingDate[1].replace(/\D/g, ""))) {
                                                            yearThis = datePrevNow.getFullYear();
                                                        }
                                                        if (yearLoop == undefined) {

                                                        }
                                                        if (yearThis == undefined) {

                                                        }
                                                        var currencyId = 1;
                                                        currencyId = all.banks.core.services.getTypeCurrencyAll(varRowEach.find('td[headers="header6"]').text());


                                                        var ind_iskat_hul = 1, transTotal, original_total = null,
                                                            comment = null;
                                                        if (vaRow.closest("t_table_chul").length) {
                                                            original_total = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header5"]').text());
                                                            if (original_total.toString().indexOf('-') !== -1) {
                                                                original_total = -Math.abs(parseFloat(original_total))
                                                            }
                                                            transTotal = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header7"]').text());
                                                            var textCurr = vaRow.find('tr.TR_BANKTABLE:first').text();
                                                            ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(textCurr);
                                                        } else {
                                                            transTotal = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header7"]').text());
                                                        }

                                                        if (i1 === 0 && poalimAsakimNew.alreadyFetchedInPrevious({
                                                            "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                            "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                            "CardNumber": dataMonthlyCycle.CardNumber,
                                                            "NextBillingDate": yearThis + '' + NextBillingDate[1].replace(/\D/g, "") + '' + NextBillingDate[0].replace(/\D/g, ""),
                                                            "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                                            "CardStatus": null,
                                                            "ValueDate": yearLoop + '' + valDate[1].replace(/\D/g, "") + '' + valDate[0].replace(/\D/g, "")
                                                        })) {
                                                            return false;
                                                        }

                                                        all.banks.generalVariables.allDataArrAshrai.push({
                                                            "BankNumber": 12,
                                                            "TargetId": all.banks.generalVariables.AccountNumber,
                                                            "Token": all.banks.generalVariables.branchNumber,
                                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                                            "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                            "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                            "CardNumber": dataMonthlyCycle.CardNumber,
                                                            "NextBillingDate": yearThis + '' + NextBillingDate[1].replace(/\D/g, "") + '' + NextBillingDate[0].replace(/\D/g, ""),
                                                            "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                                            "CardStatus": null,
                                                            "TransDesc": varRowEach.find('td[headers="header3"]').text().replace(/\n/g, "").replace(/\t/g, ""),
                                                            "TransTotal": transTotal,
                                                            "ValueDate": yearLoop + '' + valDate[1].replace(/\D/g, "") + '' + valDate[0].replace(/\D/g, ""),
                                                            "TransCategory": null,
                                                            "TotalPayments": totalPaymentsSum,
                                                            "CurrentPaymentNum": currentPaymentNumSum,
                                                            "CardType": 22,
                                                            "indFakeDate": 0,
                                                            "currency_id": currencyId,
                                                            "original_total": original_total,
                                                            "ind_iskat_hul": ind_iskat_hul,
                                                            "comment": comment
                                                        });
                                                    }
                                                })
                                            } else {
                                                var yearLoop, yearThis;
                                                var nextDate = null, IndFakeDate = 1, NextTotalSum = null;
                                                if (vaRow.find('tr[name="summRow"]').length) {
                                                    IndFakeDate = 0;
                                                    var nextCy = vaRow.find('tr[name="summRow"]:last td[headers="header2"]').text().split('/');
                                                    if ((datePrevOne.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                        yearThis = datePrevOne.getFullYear();
                                                    }
                                                    if ((datePrevTwo.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                        yearThis = datePrevTwo.getFullYear();
                                                    }
                                                    if ((datePrevNow.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                        yearThis = datePrevNow.getFullYear();
                                                    }
                                                    nextDate = yearThis + '' + nextCy[1].replace(/\D/g, "") + '' + nextCy[0].replace(/\D/g, "");
                                                    NextTotalSum = vaRow.find('tr[name="summRow"]:last td[headers="header4"]').text().replace(/,/g, '');
                                                } else if (vaRow.find('tr#trTotal').length) {
                                                    IndFakeDate = 0;
                                                    var nextCy = vaRow.find('tr#trTotal:last td[headers="header2"]').text().split('/');
                                                    if ((datePrevOne.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                        yearThis = datePrevOne.getFullYear();
                                                    }
                                                    if ((datePrevTwo.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                        yearThis = datePrevTwo.getFullYear();
                                                    }
                                                    if ((datePrevNow.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                        yearThis = datePrevNow.getFullYear();
                                                    }
                                                    nextDate = yearThis + '' + nextCy[1].replace(/\D/g, "") + '' + nextCy[0].replace(/\D/g, "");
                                                    NextTotalSum = vaRow.find('tr#trTotal:last td[headers="header4"]').text().replace(/,/g, '');
                                                }
                                                if (yearThis == undefined) {

                                                }
                                                var dataMonthlyCycle = {
                                                    'BankNumber': 12,
                                                    "BranchNumber": BranchNumber,
                                                    "AccountNumber": AccountNumber,
                                                    'NextTotal': NextTotalSum,
                                                    'CardNumber': $(v).text().replace(/\D/g, ""),
                                                    'CardType': 22,
                                                    'NextBillingDate': nextDate
                                                }

                                                vaRow.find('tr.TR_ROW_BANKTABLE').each(function (i1, v1) {
                                                    var varRowEach = $(v1);
                                                    if (varRowEach.find('td[headers="header1"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") !== '') {
                                                        var totalPaymentsSum = null, currentPaymentNumSum = null,
                                                            ifIsPayment = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").indexOf('מתוך');
                                                        if (ifIsPayment !== -1) {
                                                            totalPaymentsSum = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").split('תש')[0].replace(/\D/g, "");
                                                            currentPaymentNumSum = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").split('תש')[1].replace(/\D/g, "");
                                                        }
                                                        var valDate = varRowEach.find('td[headers="header1"]').text().split('/');
                                                        if ((datePrevOne.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                            yearLoop = datePrevOne.getFullYear();
                                                        }
                                                        if ((datePrevTwo.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                            yearLoop = datePrevTwo.getFullYear();
                                                        }
                                                        if ((datePrevNow.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                            yearLoop = datePrevNow.getFullYear();
                                                        }
                                                        if (currentPaymentNumSum !== null) {
                                                            yearLoop = new Date(parseFloat(yearThis), (parseFloat(nextCy[1].replace(/\D/g, "")) - 1) - currentPaymentNumSum, parseFloat(nextCy[0].replace(/\D/g, ""))).getFullYear();
                                                        }
                                                        if (yearLoop == undefined) {

                                                        }
                                                        var comment = "";
                                                        //var commentArray = varRowEach.next().find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/ /g, '').trim();
                                                        //var commentArray = varRowEach.next().find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/ /g, '').trim().split('').reverse();
                                                        //if (commentArray.length) {
                                                        //	commentArray.forEach(function (v) {
                                                        //		comment += v;
                                                        //	});
                                                        //}
//													var original_total = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header4"]').text());
//													if (original_total.toString().indexOf('-') !== -1) {
//														original_total = -Math.abs(parseFloat(original_total))
//													}

                                                        if (i1 === 0 && poalimAsakimNew.alreadyFetchedInPrevious({
                                                            "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                            "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                            "CardNumber": dataMonthlyCycle.CardNumber,
                                                            "NextBillingDate": dataMonthlyCycle.NextBillingDate,
                                                            "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                                            "CardStatus": null,
                                                            "ValueDate": yearLoop + '' + valDate[1].replace(/\D/g, "") + '' + valDate[0].replace(/\D/g, "")
                                                        })) {
                                                            return false;
                                                        }

                                                        all.banks.generalVariables.allDataArrAshrai.push({
                                                            "BankNumber": 12,
                                                            "TargetId": all.banks.generalVariables.AccountNumber,
                                                            "Token": all.banks.generalVariables.branchNumber,
                                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                                            "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                            "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                            "CardNumber": dataMonthlyCycle.CardNumber,
                                                            "NextBillingDate": dataMonthlyCycle.NextBillingDate,
                                                            "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                                            "CardStatus": null,
                                                            "TransDesc": varRowEach.find('td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, ""),
                                                            "TransTotal": poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header4"]').text()),
                                                            "ValueDate": yearLoop + '' + valDate[1].replace(/\D/g, "") + '' + valDate[0].replace(/\D/g, ""),
                                                            "TransCategory": null,
                                                            "TotalPayments": totalPaymentsSum,
                                                            "CurrentPaymentNum": currentPaymentNumSum,
                                                            "CardType": 22,
                                                            "indFakeDate": IndFakeDate,
                                                            "currency_id": 1,
                                                            "original_total": null,//poalimAsakimNew.returnClearSum(original_total),
                                                            "ind_iskat_hul": 1,
                                                            "comment": comment
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                    if (i + 1 == $$.find('#someDataMainTr else > table.arial12NoBold .arial12BoldBlue').length) {
                                        var type = 101;
                                        var text = "מתחיל אשראי חיובים הבאים " + " " + asrashiNumCardNext;
                                        all.banks.accounts.poalimAsakimNew.sendCardsCtrl()
                                        $$ = null;
                                    }
                                })
                            } else {
                                var type = 101;
                                var text = "מתחיל אשראי חיובים הבאים " + " " + asrashiNumCardNext;
                                all.banks.accounts.poalimAsakimNew.sendCardsCtrl()
                                $$ = null;
                            }
                        } else if ($$.find("[name='current_kartis'] > option").length == 1) {
                            if ($$.find('#someDataMainTr no table.MAIN_BANKTABLE').length) {
                                var asrashiNumCardNext = [];

                                var accDetalisArr = $$.find('#allAcountsList option:selected script').text().split('new Acc(')[1].split(")")[0].split(",");
                                var snifNum = accDetalisArr[1].replace(/\D/g, "");
                                var accNum = accDetalisArr[2].replace(/\D/g, "");
                                var AccountNumber = parseInt(accNum);
                                var BranchNumber = parseInt(snifNum);
                                $$.find('#someDataMainTr no table.MAIN_BANKTABLE').each(function (indx, va) {
                                    var vaRow = $(va);
                                    var datePrevNow = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
                                    var datePrevOne = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                                    var datePrevTwo = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
                                    asrashiNumCardNext.push($$.find("[name='current_kartis']").val().slice(0, 4));

                                    if (vaRow.find('tr.TR_ROW_BANKTABLE:first td').length == 7) {
                                        var NextTotalSum = null;
                                        if (vaRow.find('tr#trTotal').length) {
                                            NextTotalSum = vaRow.find('tr#trTotal:last td[headers="header7"]').text().replace(/,/g, '');
                                        }
                                        var dataMonthlyCycle = {
                                            'BankNumber': 12,
                                            "BranchNumber": BranchNumber,
                                            "AccountNumber": AccountNumber,
                                            'NextTotal': NextTotalSum,
                                            'CardNumber': $$.find("[name='current_kartis']").val().slice(0, 4),
                                            'CardType': 22,
                                            'NextBillingDate': null
                                        }

                                        vaRow.find('tr.TR_ROW_BANKTABLE').each(function (i1, v1) {
                                            var varRowEach = $(v1);
                                            if (varRowEach.find('td[headers="header1"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") !== '') {
                                                var totalPaymentsSum = null, currentPaymentNumSum = null;
                                                var valDate = varRowEach.find('td[headers="header1"]').text().split('/');
                                                var NextBillingDate = varRowEach.find('td[headers="header2"]').text().split('/');
                                                var yearLoop, yearThis;
                                                if ((datePrevOne.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                    yearLoop = datePrevOne.getFullYear();
                                                }
                                                if ((datePrevTwo.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                    yearLoop = datePrevTwo.getFullYear();
                                                }
                                                if ((datePrevNow.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                    yearLoop = datePrevNow.getFullYear();
                                                }


                                                if ((datePrevOne.getMonth() + 1) == parseFloat(NextBillingDate[1].replace(/\D/g, ""))) {
                                                    yearThis = datePrevOne.getFullYear();
                                                }
                                                if ((datePrevTwo.getMonth() + 1) == parseFloat(NextBillingDate[1].replace(/\D/g, ""))) {
                                                    yearThis = datePrevOne.getFullYear();
                                                }
                                                if ((datePrevNow.getMonth() + 1) == parseFloat(NextBillingDate[1].replace(/\D/g, ""))) {
                                                    yearThis = datePrevNow.getFullYear();
                                                }
                                                if (yearLoop == undefined) {

                                                }
                                                if (yearThis == undefined) {

                                                }
                                                var currencyId = 1;
                                                currencyId = all.banks.core.services.getTypeCurrencyAll(varRowEach.find('td[headers="header6"]').text());

                                                var ind_iskat_hul = 1, original_total = null, transTotal,
                                                    comment = null;
                                                if (vaRow.closest("t_table_chul").length) {
                                                    original_total = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header5"]').text());
                                                    if (original_total.toString().indexOf('-') !== -1) {
                                                        original_total = -Math.abs(parseFloat(original_total))
                                                    }
                                                    transTotal = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header7"]').text());
                                                    var textCurr = vaRow.find('tr.TR_BANKTABLE:first').text();
                                                    ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(textCurr);

                                                } else {
//												original_total = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header7"]').text());
//												if (original_total.toString().indexOf('-') !== -1) {
//													original_total = -Math.abs(parseFloat(original_total))
//												}
                                                    transTotal = poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header7"]').text());
                                                }

                                                if (i1 === 0 && poalimAsakimNew.alreadyFetchedInPrevious({
                                                    "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                    "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                    "CardNumber": dataMonthlyCycle.CardNumber,
                                                    "NextBillingDate": yearThis + '' + NextBillingDate[1].replace(/\D/g, "") + '' + NextBillingDate[0].replace(/\D/g, ""),
                                                    "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                                    "CardStatus": null,
                                                    "ValueDate": yearLoop + '' + valDate[1].replace(/\D/g, "") + '' + valDate[0].replace(/\D/g, "")
                                                })) {
                                                    return false;
                                                }

                                                all.banks.generalVariables.allDataArrAshrai.push({
                                                    "BankNumber": 12,
                                                    "TargetId": all.banks.generalVariables.AccountNumber,
                                                    "Token": all.banks.generalVariables.branchNumber,
                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                    "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                    "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                    "CardNumber": dataMonthlyCycle.CardNumber,
                                                    "NextBillingDate": yearThis + '' + NextBillingDate[1].replace(/\D/g, "") + '' + NextBillingDate[0].replace(/\D/g, ""),
                                                    "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                                    "CardStatus": null,
                                                    "TransDesc": varRowEach.find('td[headers="header3"]').text().replace(/\n/g, "").replace(/\t/g, ""),
                                                    "TransTotal": transTotal,
                                                    "ValueDate": yearLoop + '' + valDate[1].replace(/\D/g, "") + '' + valDate[0].replace(/\D/g, ""),
                                                    "TransCategory": null,
                                                    "TotalPayments": totalPaymentsSum,
                                                    "CurrentPaymentNum": currentPaymentNumSum,
                                                    "CardType": 22,
                                                    "indFakeDate": 0,
                                                    "currency_id": currencyId,
                                                    "original_total": original_total,
                                                    "ind_iskat_hul": ind_iskat_hul,
                                                    "comment": comment
                                                })
                                            }
                                        })
                                    } else {
                                        var yearLoop, yearThis;
                                        var nextDate = null, IndFakeDate = 1, NextTotalSum = null;
                                        if (vaRow.find('tr[name="summRow"]').length) {
                                            IndFakeDate = 0;
                                            var nextCy = vaRow.find('tr[name="summRow"]:last td[headers="header2"]').text().split('/');
                                            if ((datePrevOne.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                yearThis = datePrevOne.getFullYear();
                                            }
                                            if ((datePrevTwo.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                yearThis = datePrevTwo.getFullYear();
                                            }
                                            if ((datePrevNow.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                yearThis = datePrevNow.getFullYear();
                                            }

                                            nextDate = yearThis + '' + nextCy[1].replace(/\D/g, "") + '' + nextCy[0].replace(/\D/g, "");
                                            NextTotalSum = vaRow.find('tr[name="summRow"]:last td[headers="header4"]').text().replace(/,/g, '');
                                        } else if (vaRow.find('tr#trTotal').length) {
                                            IndFakeDate = 0;
                                            var nextCy = vaRow.find('tr#trTotal:last td[headers="header2"]').text().split('/');
                                            if ((datePrevOne.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                yearThis = datePrevOne.getFullYear();
                                            }
                                            if ((datePrevTwo.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                yearThis = datePrevTwo.getFullYear();
                                            }
                                            if ((datePrevNow.getMonth() + 1) == parseFloat(nextCy[1].replace(/\D/g, ""))) {
                                                yearThis = datePrevNow.getFullYear();
                                            }
                                            nextDate = yearThis + '' + nextCy[1].replace(/\D/g, "") + '' + nextCy[0].replace(/\D/g, "");
                                            NextTotalSum = vaRow.find('tr#trTotal:last td[headers="header4"]').text().replace(/,/g, '');
                                        }
                                        if (yearThis == undefined) {

                                        }
                                        var dataMonthlyCycle = {
                                            'BankNumber': 12,
                                            "BranchNumber": BranchNumber,
                                            "AccountNumber": AccountNumber,
                                            'NextTotal': NextTotalSum,
                                            'CardNumber': $$.find("[name='current_kartis']").val().slice(0, 4),
                                            'CardType': 22,
                                            'NextBillingDate': nextDate
                                        }

                                        vaRow.find('tr.TR_ROW_BANKTABLE').each(function (i1, v1) {
                                            var varRowEach = $(v1);
                                            if (varRowEach.find('td[headers="header1"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "") !== '') {
                                                var totalPaymentsSum = null, currentPaymentNumSum = null,
                                                    ifIsPayment = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").indexOf('מתוך');
                                                if (ifIsPayment !== -1) {
                                                    totalPaymentsSum = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").split('תש')[0].replace(/\D/g, "");
                                                    currentPaymentNumSum = varRowEach.find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/\s/g, "").split('תש')[1].replace(/\D/g, "");
                                                }
                                                var valDate = varRowEach.find('td[headers="header1"]').text().split('/');
                                                if ((datePrevOne.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                    yearLoop = datePrevOne.getFullYear();
                                                }
                                                if ((datePrevTwo.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                    yearLoop = datePrevTwo.getFullYear();
                                                }
                                                if ((datePrevNow.getMonth() + 1) == parseFloat(valDate[1].replace(/\D/g, ""))) {
                                                    yearLoop = datePrevNow.getFullYear();
                                                }
                                                if (currentPaymentNumSum !== null) {
                                                    yearLoop = new Date(parseFloat(yearThis), (parseFloat(nextCy[1].replace(/\D/g, "")) - 1) - currentPaymentNumSum, parseFloat(nextCy[0].replace(/\D/g, ""))).getFullYear();
                                                }
                                                if (yearLoop == undefined) {

                                                }
                                                var comment = "";
                                                var commentArray = varRowEach.next().find('td[headers="header6"]').text().replace(/\n/g, "").replace(/\t/g, "").replace(/ /g, '').trim();
                                                //if (commentArray.length) {
                                                //	commentArray.forEach(function (v) {
                                                //		comment += v;
                                                //	});
                                                //}
//											var original_total = varRowEach.find('td[headers="header4"]').text();
//											if (original_total.toString().indexOf('-') !== -1) {
//												original_total = -Math.abs(parseFloat(original_total))
//											}

                                                if (i1 === 0 && poalimAsakimNew.alreadyFetchedInPrevious({
                                                    "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                    "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                    "CardNumber": dataMonthlyCycle.CardNumber,
                                                    "NextBillingDate": dataMonthlyCycle.NextBillingDate,
                                                    "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                                    "CardStatus": null,
                                                    "ValueDate": yearLoop + '' + valDate[1].replace(/\D/g, "") + '' + valDate[0].replace(/\D/g, "")
                                                })) {
                                                    return false;
                                                }

                                                all.banks.generalVariables.allDataArrAshrai.push({
                                                    "BankNumber": 12,
                                                    "TargetId": all.banks.generalVariables.AccountNumber,
                                                    "Token": all.banks.generalVariables.branchNumber,
                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                    "BranchNumber": dataMonthlyCycle.BranchNumber,
                                                    "AccountNumber": dataMonthlyCycle.AccountNumber,
                                                    "CardNumber": dataMonthlyCycle.CardNumber,
                                                    "NextBillingDate": dataMonthlyCycle.NextBillingDate,
                                                    "NextCycleTotal": dataMonthlyCycle.NextTotal,
                                                    "CardStatus": null,
                                                    "TransDesc": varRowEach.find('td[headers="header2"]').text().replace(/\n/g, "").replace(/\t/g, ""),
                                                    "TransTotal": poalimAsakimNew.returnClearSum(varRowEach.find('td[headers="header4"]').text()),
                                                    "ValueDate": yearLoop + '' + valDate[1].replace(/\D/g, "") + '' + valDate[0].replace(/\D/g, ""),
                                                    "TransCategory": null,
                                                    "TotalPayments": totalPaymentsSum,
                                                    "CurrentPaymentNum": currentPaymentNumSum,
                                                    "CardType": 22,
                                                    "indFakeDate": IndFakeDate,
                                                    "currency_id": 1,
                                                    "original_total": null,//original_total,
                                                    "ind_iskat_hul": 1,
                                                    "comment": comment
                                                })
                                            }
                                        })
                                    }

                                    if (indx + 1 == $$.find('#someDataMainTr no table.MAIN_BANKTABLE').length) {
                                        var type = 101;
                                        var text = "מתחיל אשראי חיובים הבאים " + " " + asrashiNumCardNext;
                                        all.banks.accounts.poalimAsakimNew.sendCardsCtrl()
                                        $$ = null;
                                    }
                                })
                            } else {
                                var type = 101;
                                var text = "מתחיל אשראי חיובים הבאים  " + " " + "לא נמצאו אשראים עם נתונים";
                                //all.banks.core.services.sendLogs(type, text);
                                all.banks.accounts.poalimAsakimNew.sendCardsCtrl();
                                $$ = null;
                            }
                        } else {
                            var type = 101;
                            var text = "מתחיל אשראי חיובים הבאים  " + " " + "לא נמצאו אשראים עם נתונים";
                            //all.banks.core.services.sendLogs(type, text);
                            all.banks.accounts.poalimAsakimNew.sendCardsCtrl();
                            $$ = null;
                        }
                    }
                }
            })
            .fail(function (error, resErr, urlParam) {
                // var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                // all.banks.core.services.errorLog(logErr)
                all.banks.accounts.poalimAsakimNew.sendCardsCtrl();
            });
    }
    poalimAsakimNew.loadDeposits = function () {
        all.banks.generalVariables.allDataArrDeposits = [];
        var req = {
            'input_fromAgg': "",
            'reqName': "action",
            'transactionId': "PerutPikdonotAndPeri",
            'menuParam': "",
            'PGcode': "",
            'step': "1",
            'u': poalimAsakimNew.varGlobal.u,
            'tcfo': poalimAsakimNew.varGlobal.tcfo,
            'tsfo': poalimAsakimNew.varGlobal.tsfo,
            'mmx': poalimAsakimNew.varGlobal.mmx,
            'fromSubMenu': "Investments",
            'qwrt': poalimAsakimNew.varGlobal.qwrt,
            'mpux': "",
            'targetView': "",
            'dwx': poalimAsakimNew.varGlobal.dwx,
            'dwxReq': poalimAsakimNew.varGlobal.dwxReq,
            'dwxOp': poalimAsakimNew.varGlobal.dwxOp,
            'doc_key': "",
            'callerTid': "",
            'WTcomeFrom': "",
            'accountIndex': all.banks.accounts.poalimAsakimNew.indDDAll(all.banks.accounts.poalimAsakimNew.vddVal.BANK_SNIF_ACCOUNT_KEY)
        };
        //var url = "https://"+poalimAsakimNew.newAccPath+".bankhapoalim.co.il/cgi-bin/poalwwwc?ctfw=auto&reqName=action&language=HE&transactionId=PeryMfAll&subMenuName=Investments&ts=" + poalimAsakimNew.varGlobal.ts + "&tf=" + Math.random() + "&u=" + poalimAsakimNew.varGlobal.u + "&pSubMenu=Shekel&fromSubMenu=Investments&bxx=912&nsv=y&dwx=" + poalimAsakimNew.varGlobal.dwx + "&wScr=1920&hScr=1080&tcfo=" + poalimAsakimNew.varGlobal.tcfo + "&mmx=" + poalimAsakimNew.varGlobal.mmx + "&qwrt=" + poalimAsakimNew.varGlobal.qwrt + "&dtcdb=0&menuTranName=PeryMfAll";
        all.banks.core.services.httpReq("https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc", 'POST', req, true, false)
            .then(function (res, bbb, ccc) {

                try {
                    req = null;
                    var res = all.banks.core.services.parseHtml(res);

                    var ts = res.find('input[name="ts"]').val();
                    var u = res.find('input[name="u"]').val();
                    var dwx = res.find('input[name="dwx"]').val();
                    var tcfo = res.find('input[name="tcfo"]').val();
                    var qwrt = res.find('input[name="qwrt"]').val();
                    var tsfo = res.find('input[name="tsfo"]').val();
                    var mmx = res.find('input[name="mmx"]').val();
                    var dwxReq = res.find('input[name="dwxReq"]').val();
                    var dwxOp = res.find('input[name="dwxOp"]').val();
                    poalimAsakimNew.varGlobal.ts = ts;
                    poalimAsakimNew.varGlobal.u = u;
                    poalimAsakimNew.varGlobal.dwx = dwx;
                    poalimAsakimNew.varGlobal.tcfo = tcfo;
                    poalimAsakimNew.varGlobal.qwrt = qwrt;
                    poalimAsakimNew.varGlobal.tsfo = tsfo;
                    poalimAsakimNew.varGlobal.mmx = mmx;
                    poalimAsakimNew.varGlobal.dwxReq = dwxReq;
                    poalimAsakimNew.varGlobal.dwxOp = dwxOp;

                    var expires = ccc.getResponseHeader("X-FRAME-OPTIONS");
                    if (expires == null) {

                        poalimAsakimNew.setNewTime(function () {
                            poalimAsakimNew.loadDeposits();
                        });
                        //all.banks.accounts.poalimAsakimNew.logOut(res)
                    } else {
                        var type = 103;
                        var text = "מושך פקדונות";
                        //all.banks.core.services.sendLogs(type, text);


                        var accDetalisArr = $(res).find('#allAcountsList option:selected script').text().split('new Acc(')[1].split(")")[0].split(",");
                        var snifNum = accDetalisArr[1].replace(/\D/g, "");
                        var accNum = accDetalisArr[2].replace(/\D/g, "");
                        var AccountNumber = parseInt(accNum);
                        var BranchNumber = parseInt(snifNum);

                        if ($(res).find('#table_pery #divTable tr.TR_ROW_BANKTABLE').length) {
                            $(res).find('#table_pery #divTable tr.TR_ROW_BANKTABLE').each(function (i, v) {
                                var TypeName = null, DepositTotal = null, DepositAsTotal = null, DueDate = null,
                                    DepositDate = null, DepositExistStation = null, DepositNumber = null;
                                if ($(v).children('td').eq(9).length) {
                                    TypeName = $(v).children('td').eq(9).text();
                                }
                                if ($(v).children('td').eq(8).length) {
                                    DepositTotal = poalimAsakimNew.returnClearSum($(v).children('td').eq(8).text());
                                }
                                if ($(v).children('td').eq(3).length && $(v).children('td').eq(3).text().replace(/\s/g, "") !== '') {
                                    var DepositDateFinish = $(v).children('td').eq(3).text().replace(/\s/g, "").split('/');
                                    DepositDate = DepositDateFinish[2].replace(/\D/g, "") + '' + DepositDateFinish[1].replace(/\D/g, "") + '' + DepositDateFinish[0].replace(/\D/g, "")
                                }
                                if ($(v).children('td').eq(2).length && $(v).children('td').eq(2).text().replace(/\s/g, "") !== '') {
                                    var DueDateval = $(v).children('td').eq(2).text().replace(/\s/g, "").split('/');
                                    DueDate = DueDateval[2].replace(/\D/g, "") + '' + DueDateval[1].replace(/\D/g, "") + '' + DueDateval[0].replace(/\D/g, "")
                                }
                                if ($(v).children('td').eq(1).length) {
                                    DepositAsTotal = poalimAsakimNew.returnClearSum($(v).children('td').eq(1).text());
                                }
                                if ($(v).children('td').eq(5).length) {
                                    DepositNumber = poalimAsakimNew.returnClearSum($(v).children('td').eq(5).text());
                                }
                                all.banks.generalVariables.allDataArrDeposits.push({
                                    "BankNumber": 12,
                                    "TargetId": all.banks.generalVariables.AccountNumber,
                                    "Token": all.banks.generalVariables.branchNumber,
                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "BranchNumber": BranchNumber,
                                    "AccountNumber": AccountNumber,
                                    "TypeName": TypeName,
                                    "DepositTotal": DepositTotal,
                                    "DepositAsTotal": DepositAsTotal,
                                    "DueDate": DueDate,
                                    "DepositDate": DepositDate,
                                    "DepositExistStation": DepositExistStation,
                                    "DepositNumber": DepositNumber
                                });
                                if ($(res).find('#table_pery #divTable tr.TR_ROW_BANKTABLE').length == (i + 1)) {
                                    loadPikdonot(res)
                                }
                            })
                        } else {
                            loadPikdonot(res);
                        }

                        function loadPikdonot(res) {
                            if ($(res).find('#table_pikdonot #mytable_body tr.TR_ROW_BANKTABLE').length) {
                                $(res).find('#table_pikdonot #mytable_body tr.TR_ROW_BANKTABLE').each(function (i, v) {
                                    var TypeName = null, DepositTotal = null, DepositAsTotal = null, DueDate = null,
                                        DepositDate = null, DepositExistStation = null, DepositNumber = null;
                                    var v = $(v);
                                    if ($(v).children('td').eq(8).length) {
                                        TypeName = $(v).children('td').eq(8).text();
                                    }
                                    if ($(v).children('td').eq(7).length) {
                                        DepositTotal = poalimAsakimNew.returnClearSum($(v).children('td').eq(7).text());
                                    }
                                    if ($(v).children('td').eq(3).length && $(v).children('td').eq(3).text().replace(/\s/g, "") !== '') {
                                        var DueDateval = $(v).children('td').eq(3).text().replace(/\s/g, "").split('/');
                                        DueDate = DueDateval[2].replace(/\D/g, "") + '' + DueDateval[1].replace(/\D/g, "") + '' + DueDateval[0].replace(/\D/g, "");
                                    }
                                    if ($(v).children('td').eq(1).length) {
                                        DepositAsTotal = poalimAsakimNew.returnClearSum($(v).children('td').eq(1).text());
                                    }
                                    if ($(v).next().find('tr').not('.TR_BANKTABLE').children('td').eq(3).length) {
                                        DepositNumber = $(v).next().find('tr').not('.TR_BANKTABLE').children('td').eq(3).text().replace(/\s/g, "");
                                    }
                                    if ($(v).next().find('tr').not('.TR_BANKTABLE').children('td').eq(2).length && $(v).next().find('tr').not('.TR_BANKTABLE').children('td').eq(2).text().replace(/\s/g, "") !== '') {
                                        var DepositDateval = $(v).next().find('tr').not('.TR_BANKTABLE').children('td').eq(2).text().replace(/\s/g, "").split('/');
                                        DepositDate = DepositDateval[2].replace(/\D/g, "") + '' + DepositDateval[1].replace(/\D/g, "") + '' + DepositDateval[0].replace(/\D/g, "");
                                    }
                                    all.banks.generalVariables.allDataArrDeposits.push({
                                        "BankNumber": 12,
                                        "TargetId": all.banks.generalVariables.AccountNumber,
                                        "Token": all.banks.generalVariables.branchNumber,
                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "BranchNumber": BranchNumber,
                                        "AccountNumber": AccountNumber,
                                        "TypeName": TypeName,
                                        "DepositTotal": DepositTotal,
                                        "DepositAsTotal": DepositAsTotal,
                                        "DueDate": DueDate,
                                        "DepositDate": DepositDate,
                                        "DepositExistStation": DueDate,
                                        "DepositNumber": DepositNumber
                                    })
                                    if ($(res).find('#table_pikdonot #mytable_body tr.TR_ROW_BANKTABLE').length == (i + 1)) {
                                        all.banks.accounts.poalimAsakimNew.sendPikdonotCtrl();
                                        res = null;
                                    }
                                })
                            } else {
                                all.banks.accounts.poalimAsakimNew.sendPikdonotCtrl();
                                res = null;
                            }
                        }
                    }
                } catch (e) {
                    all.banks.accounts.poalimAsakimNew.sendPikdonotCtrl();
                    res = null;
                }
            })
            .fail(function (error, resErr, urlParam) {
                all.banks.accounts.poalimAsakimNew.sendPikdonotCtrl();
            });
    }

    poalimAsakimNew.loadDepositsNew = async function () {
        const started = Date.now();
        const ARR_TRANS_DAY_TO_RUN = all.banks.accountDetails.bank.arrDDAll.filter((it) => (it.IND_NILVIM > 0)).map((item, idx) => {
            return Object.assign(item, {
                idx,
                bankParams: ("12-" + item.BANK_SNIF_ACCOUNT_KEY.split('-')[1] + "-" + item.BANK_SNIF_ACCOUNT_KEY.split('-')[0]),
                BankNumber: 12,
                AccountNumber: parseInt(item.BANK_SNIF_ACCOUNT_KEY.split('-')[0]),
                BranchNumber: parseInt(item.BANK_SNIF_ACCOUNT_KEY.split('-')[1]),
            })
        });

        const listOfArguments = ARR_TRANS_DAY_TO_RUN;
        const listOfArgumentsSlice = (ARR_TRANS_DAY_TO_RUN.length / Number(poalimAsakimNew.numberOfOperationsNilvim));

        const asyncOperation = param => {
            return new Promise(async resolve => {
                monitorActivityClass.setIntervalActivity();
                await resolveCookies();
                console.log('step 1------ Running Index account: ' + param.idx);
                console.log(all.banks.core.services.logAlertsBanks(30, JSON.stringify(all.banks.accountDetails.bank.arrDDAll[param.idx])));

                const text = "מתחיל Deposits לחשבון" + " " + all.banks.accountDetails.bank.arrDDAll[param.idx].BANK_SNIF_ACCOUNT_KEY;
                console.log(all.banks.core.services.logAlertsBanks(10, text));


                const allDataArrDeposits = [];
                let req_savingsDeposits = false;
                try {
                    var urlXhr = "https://biz2.bankhapoalim.co.il/ServerServices/deposits-and-savings/composite?accountId=" + param.bankParams + "&view=totals";
                    let data = await resolveSender({
                        urls: [urlXhr],
                        method: "GET",
                        body: null,
                        headers: null,
                    });
                    if (data && data.response && data.response.length && data.response[0].response) {
                        data = data.response[0].response;
                        if (data && data.messageCode === undefined) {
                            var url1 = "https://biz2.bankhapoalim.co.il/ServerServices/deposits-and-savings/deposits?accountId=" + param.bankParams + "&view=details";
                            let res = await resolveSender({
                                urls: [url1],
                                method: "GET",
                                body: null,
                                headers: null,
                            });
                            if (res && res.response && res.response.length && res.response[0].response) {
                                res = res.response[0].response;
                                if (res && res.list !== undefined && res.list.length) {
                                    for (let indx = 0; indx < res.list.length; indx++) {
                                        const va = res.list[indx];
                                        for (let idx11 = 0; idx11 < va.data.length; idx11++) {
                                            const v = va.data[idx11];
                                            allDataArrDeposits.push({
                                                "TargetId": all.banks.accountDetails.bank.targetId,
                                                "Token": all.banks.accountDetails.bank.token,
                                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                "ExporterId": all.banks.spiderConfig.spiderId,
                                                'BankNumber': param.BankNumber,
                                                'AccountNumber': param.AccountNumber,
                                                'BranchNumber': param.BranchNumber,
                                                "TypeName": v.shortProductName,
                                                "DepositTotal": v.principalAmount,
                                                "DepositAsTotal": v.revaluedTotalAmount,
                                                "DueDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v.paymentDate)),
                                                "DepositDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v.agreementOpeningDate)),
                                                "DepositExistStation": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v.paymentDate)),
                                                "DepositNumber": v.depositSerialId,
                                                "DepositInterest": v.adjustedInterest
                                            });
                                        }
                                    }
                                    req_savingsDeposits = true;
                                } else {
                                    req_savingsDeposits = true;
                                }
                            }
                        }
                    }
                } catch (err) {
                    req_savingsDeposits = true;
                }

                if (req_savingsDeposits) {
                    try {
                        var urls = "https://biz2.bankhapoalim.co.il/ServerServices/deposits-and-savings/savingsDeposits?accountId=" + param.bankParams + "&view=details";
                        let data = await resolveSender({
                            urls: [urls],
                            method: "GET",
                            body: null,
                            headers: null,
                        });
                        if (data && data.response && data.response.length && data.response[0].response) {
                            data = data.response[0].response;
                            if (data && data.list !== undefined && data.list.length) {
                                $(data.list).each(function (indx, va) {
                                    $(va.data).each(function (idx, v) {
                                        allDataArrDeposits.push({
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            'BankNumber': param.BankNumber,
                                            'AccountNumber': param.AccountNumber,
                                            'BranchNumber': param.BranchNumber,
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            "TypeName": v.shortSavingDepositName,
                                            "DepositTotal": v.principalAmount,
                                            "DepositAsTotal": v.revaluedBalance,
                                            "DueDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v.agreementOpeningDate)),
                                            "DepositDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v.agreementOpeningDate)),
                                            "DepositExistStation": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v.paymentDate)),
                                            "DepositNumber": v.eventNumber,
                                            "DepositInterest": null
                                        });
                                    })
                                });
                            } else {

                            }
                        }
                    } catch (err) {

                    }
                }


                try {
                    if (allDataArrDeposits.length) {
                        console.log('Last step ------ found ' + allDataArrDeposits.length + ' Pikdonot of Index account: ' + param.idx);
                        await all.banks.core.services.sendPikdonotServer(allDataArrDeposits);
                    }
                    resolve(true);
                } catch (error) {
                    resolve(true);
                }
            })
        };

        function resolveSender(item) {
            return new Promise(resolve => {
                let timeToTry = 0;
                const callWs = function () {
                    timeToTry += 1;
                    console.log('start callWs')
                    monitorActivityClass.setIntervalActivity();
                    let params = Object.assign(item, {
                        cookies: document.cookie,
                        token: poalimAsakimNew.xsrfToken,
                        numberOfOperations: poalimAsakimNew.numberOfOperationsNilvim
                    });
                    if (window.navigator.platform.indexOf('Win') === -1 && !window.all.banks.vpnConnected) {
                        params['proxy'] = ('http://brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '') + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225');
                    }
                    parallelReq(params, function (output) {
                        console.log('got res callWs')
                        monitorActivityClass.setIntervalActivity();

                        try {
                            console.log(output.response);
                            const numOfLogsOut = output.response.filter(it => it.statusCode === 403);
                            const numOfLogsOutError = output.response.filter(it => it.error !== false);
                            // numForLogsOut += numOfLogsOut.length;
                            if (numOfLogsOut.length > 0 || (numOfLogsOutError.length && timeToTry < 2)) {
                                // numForLogsOut = 0;
                                if (numOfLogsOut.length > 0) {
                                    all.banks.accounts.poalimAsakimNew.middleOfWork = true;
                                    all.banks.accounts.poalimAsakimNew.renewLogin().then(() => {
                                        if (output.response.some(item => item.headers && item.headers.location && ["getLogonPageIski", "Error", "exit.html"].some(urlPart => (item.headers.location).includes(urlPart)))) {
                                            let err = new Error("Redirected to perhaps because of another otp session started somewhere. Terminating with error.");
                                            if (item.headers.location === 'https://misc.poalim-site.co.il/Error_Pages/5/New/ErrorNew_5.html') {
                                                err = new Error("Redirected to " + item.headers.location + " perhaps because the bank announces that the service is temporarily unavailable.");
                                            }
                                            all.banks.core.services.errorLog(err);
                                            poalimAsakimNew.haltAndWaitForReload = true;
                                            poalimAsakimNew.logOutNew();
                                            return;
                                        }
                                        callWs()
                                    });
                                } else {
                                    callWs()
                                }
                            } else {
                                if (output.response.some(item => item.headers && item.headers.location && ["getLogonPageIski", "Error", "exit.html"].some(urlPart => (item.headers.location).includes(urlPart)))) {
                                    let err = new Error("Redirected to perhaps because of another otp session started somewhere. Terminating with error.");
                                    if (item.headers.location === 'https://misc.poalim-site.co.il/Error_Pages/5/New/ErrorNew_5.html') {
                                        err = new Error("Redirected to " + item.headers.location + " perhaps because the bank announces that the service is temporarily unavailable.");
                                    }
                                    all.banks.core.services.errorLog(err);
                                    poalimAsakimNew.haltAndWaitForReload = true;
                                    myEmitterLogs('Sent data Successfully');
                                    poalimAsakimNew.logOutNew();
                                    return;
                                }
                                output.response.forEach(v => {
                                    if (v.response && typeof (v.response) === 'string' && (v.response.includes('<html') || v.response === '')) {
                                        v.response = null;
                                    }
                                });
                                output.response.filter(item => item.error !== false).forEach(v => {
                                    v.response = null;
                                });
                                resolve(output);
                            }
                        } catch (e) {
                            console.log(e);
                        } finally {

                        }
                    })
                }
                callWs()
            });
        }

        function resolveCookies() {
            return new Promise(resolve => {
                win.cookies.getAll({}, function (cool) {
                    cool.forEach(function (v) {
                        if (!v.domain.includes('bizibox')) {
                            document.cookie = v.name + "=" + v.value + ";";
                        }
                    })
                    resolve(true);
                });
            });
        }

        function timeoutSpace() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(true);
                }, 1500);
            });
        }

        async function parallel() {
            async function parallelSlices(idxArr) {
                console.log(('תחילת ריצת '
                    +
                    poalimAsakimNew.numberOfOperationsNilvim
                    +
                    ' חשבונות נוספים, אינדקס מספר: '
                    +
                    idxArr));
                const slicePos = (Number(poalimAsakimNew.numberOfOperationsNilvim) * idxArr);
                const argsCopy = [].concat(listOfArguments.slice((slicePos), (slicePos + Number(poalimAsakimNew.numberOfOperationsNilvim))).map((val, ind) => ({
                    val,
                    ind
                })));
                const result = new Array(listOfArguments.slice((slicePos), (slicePos + Number(poalimAsakimNew.numberOfOperationsNilvim))).length);
                const promises = new Array(Number(poalimAsakimNew.numberOfOperationsNilvim)).fill(Promise.resolve()); //set how many items will run parallel together

                function chainNext(p) {
                    if (argsCopy.length) {
                        const arg = argsCopy.shift();
                        return p.then(() => {
                            const operationPromise = asyncOperation(arg.val).then(r => {
                                console.log('סיום ריצת חשבון-----' + arg.ind, r);
                                result[arg.ind] = r;
                            });
                            return chainNext(operationPromise);
                        });
                    }
                    return p;
                }

                await Promise.all(promises.map(chainNext));
                console.log(('סיום ריצת '
                    +
                    Number(poalimAsakimNew.numberOfOperationsNilvim)
                    +
                    ' חשבונות נוספים, אינדקס מספר: '
                    +
                    idxArr), result);
                return result;
            }

            let resultArray = [];
            let listNum = 0;
            for (let idx = 0; idx < listOfArgumentsSlice; idx++) {
                const result = await parallelSlices(idx);
                resultArray = resultArray.concat(result);
                const currentNumAcc = ((idx + 1) * Number(poalimAsakimNew.numberOfOperationsNilvim));
                const floorNum = Math.floor(currentNumAcc / Number(poalimAsakimNew.numOfAccForRenewLoginNilvim))
                if (listNum !== floorNum) {
                    listNum = floorNum;
                    await all.banks.accounts.poalimAsakimNew.renewLogin();
                }
                await timeoutSpace();
            }
            return resultArray;
        }

        parallel().then(async (res) => {
            const elapsed = Date.now() - started;
            myEmitterLogs('Finished to collect all loadDeposits of all accounts at ' + (elapsed / 1000) + 'ms');
            all.banks.accounts.poalimAsakimNew.loadLoanNew();
        });
    }
    poalimAsakimNew.loadLoanNew = async function () {
        const started = Date.now();
        const ARR_TRANS_DAY_TO_RUN = all.banks.accountDetails.bank.arrDDAll.filter((it) => (it.IND_NILVIM > 0)).map((item, idx) => {
            return Object.assign(item, {
                idx,
                bankParams: ("12-" + item.BANK_SNIF_ACCOUNT_KEY.split('-')[1] + "-" + item.BANK_SNIF_ACCOUNT_KEY.split('-')[0]),
                BankNumber: 12,
                AccountNumber: parseInt(item.BANK_SNIF_ACCOUNT_KEY.split('-')[0]),
                BranchNumber: parseInt(item.BANK_SNIF_ACCOUNT_KEY.split('-')[1]),
            })
        });

        const listOfArguments = ARR_TRANS_DAY_TO_RUN;
        const listOfArgumentsSlice = (ARR_TRANS_DAY_TO_RUN.length / Number(poalimAsakimNew.numberOfOperationsNilvim));

        const asyncOperation = param => {
            return new Promise(async resolve => {
                monitorActivityClass.setIntervalActivity();
                await resolveCookies();
                console.log('step 1------ Running Index account: ' + param.idx);
                console.log(all.banks.core.services.logAlertsBanks(30, JSON.stringify(all.banks.accountDetails.bank.arrDDAll[param.idx])));

                const text = "מתחיל loadLoan לחשבון" + " " + all.banks.accountDetails.bank.arrDDAll[param.idx].BANK_SNIF_ACCOUNT_KEY;
                console.log(all.banks.core.services.logAlertsBanks(10, text));
                const allDataArrLoan = [];
                try {
                    var urlXhr = "https://biz2.bankhapoalim.co.il/ServerServices/credit-and-mortgage/businessLoans/loans?accountId=" + param.bankParams + "&creditCurrencyCode=-1&creditSystemSubCategory=0&dataDetailingLevelCode=1&interestTypeCode=-1&linkageMethodCode=-1&unitedCreditTypeCode=-1";
                    let data = await resolveSender({
                        urls: [urlXhr],
                        method: "GET",
                        body: null,
                        headers: null,
                    });
                    if (data && data.response && data.response.length && data.response[0].response) {
                        data = data.response[0].response;
                        if (data && data.loans && data.loans.length) {
                            for (let indx = 0; indx < data.loans.length; indx++) {
                                const v = data.loans[indx];
                                if (v.creditCurrencyCode === 1) {
                                    var url1 = "https://biz2.bankhapoalim.co.il/ServerServices/credit-and-mortgage/loans/"
                                        + v.creditSerialNumber + "?accountId=" + param.bankParams
                                        + "&creditCurrencyCode=" + v.creditCurrencyCode
                                        + "&creditLimitCode=" + data.creditLimitCode
                                        + "&detailedAccountTypeCode=" + v.detailedAccountTypeCode
                                        + "&unitedCreditTypeCode=" + v.unitedCreditTypeCode
                                        + "&lang=he&type=loan&view=business";
                                    let res = await resolveSender({
                                        urls: [url1],
                                        method: "GET",
                                        body: null,
                                        headers: null,
                                    });
                                    if (res && res.response && res.response.length && res.response[0].response) {
                                        res = res.response[0].response;
                                        allDataArrLoan.push({
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                            'BankNumber': param.BankNumber,
                                            'AccountNumber': param.AccountNumber,
                                            'BranchNumber': param.BranchNumber,
                                            "LoanName": v.creditTypeDescription,
                                            "LoanNumber": v.creditSerialNumber,
                                            "LoanIntrest": res.currentInterestPercent,
                                            "LoanFinish": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(res.loanEndDate)),
                                            "LoanTotalLeft": res.amortizationSchedulePrincipalBalance, // res.actualPrincipalBalance,
                                            "LoanDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(res.valueDate)),
                                            "PaymentsNumberLeft": res.principalPaymentsNumberBalance,
                                            "LoanOriginalTotal": v.originalLoanPrincipalAmount,
                                            "NextPaymentTotal": v.nextPaymentAmount,
                                            "LoanNextPaymentDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v.nextPaymentDate)),
                                            "LoanPigurTotal": res.messages && res.messages.length && res.messages[0]['messageCode'] && res.messages[0]['messageCode'] === 4894 ? null : res.arrearTotalAmount,
                                            "LoanType": v.unitedCreditTypeCode, // null,
                                            "NumOfPayments": res.originalPrincipalPaymentsNumber,
                                            "NumOfInterestPayments": res.originalInterestPaymentsNumber,
                                            "LastPaymentTotal": null,
                                            "GraceNextPaymentDate": null,
                                            "GraceNextPaymentTotal": null,
                                            "LoanFirstPaymentDate": null,
                                            "InterestFirstPaymentDate": null
                                        });
                                    }
                                }
                            }

                        }
                    }
                } catch (err) {

                }

                try {
                    if (allDataArrLoan.length) {
                        console.log('Last step ------ found ' + allDataArrLoan.length + ' Loans of Index account: ' + param.idx);
                        await all.banks.core.services.sendLoanServer(allDataArrLoan);
                    }
                    resolve(true);
                } catch (error) {
                    resolve(true);
                }
            })
        };

        function resolveSender(item) {
            return new Promise(resolve => {
                let timeToTry = 0;
                const callWs = function () {
                    timeToTry += 1;
                    console.log('start callWs')
                    monitorActivityClass.setIntervalActivity();

                    let params = Object.assign(item, {
                        cookies: document.cookie,
                        token: poalimAsakimNew.xsrfToken,
                        numberOfOperations: poalimAsakimNew.numberOfOperationsNilvim
                    });
                    if (window.navigator.platform.indexOf('Win') === -1 && !window.all.banks.vpnConnected) {
                        params['proxy'] = ('http://brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '') + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225');
                    }
                    parallelReq(params, function (output) {
                        console.log('got res callWs')
                        monitorActivityClass.setIntervalActivity();

                        try {
                            console.log(output.response);
                            const numOfLogsOut = output.response.filter(it => it.statusCode === 403);
                            const numOfLogsOutError = output.response.filter(it => it.error !== false);
                            // numForLogsOut += numOfLogsOut.length;
                            if (numOfLogsOut.length > 0 || (numOfLogsOutError.length && timeToTry < 2)) {
                                // numForLogsOut = 0;
                                if (numOfLogsOut.length > 0) {
                                    all.banks.accounts.poalimAsakimNew.middleOfWork = true;
                                    all.banks.accounts.poalimAsakimNew.renewLogin().then(() => {
                                        if (output.response.some(item => item.headers && item.headers.location && ["getLogonPageIski", "Error", "exit.html"].some(urlPart => (item.headers.location).includes(urlPart)))) {
                                            let err = new Error("Redirected to perhaps because of another otp session started somewhere. Terminating with error.");
                                            if (item.headers.location === 'https://misc.poalim-site.co.il/Error_Pages/5/New/ErrorNew_5.html') {
                                                err = new Error("Redirected to " + item.headers.location + " perhaps because the bank announces that the service is temporarily unavailable.");
                                            }
                                            all.banks.core.services.errorLog(err);
                                            poalimAsakimNew.haltAndWaitForReload = true;
                                            poalimAsakimNew.logOutNew();
                                            return;
                                        }
                                        callWs()
                                    });
                                } else {
                                    callWs()
                                }
                            } else {
                                if (output.response.some(item => item.headers && item.headers.location && ["getLogonPageIski", "Error", "exit.html"].some(urlPart => (item.headers.location).includes(urlPart)))) {
                                    let err = new Error("Redirected to perhaps because of another otp session started somewhere. Terminating with error.");
                                    if (item.headers.location === 'https://misc.poalim-site.co.il/Error_Pages/5/New/ErrorNew_5.html') {
                                        err = new Error("Redirected to " + item.headers.location + " perhaps because the bank announces that the service is temporarily unavailable.");
                                    }
                                    all.banks.core.services.errorLog(err);
                                    poalimAsakimNew.haltAndWaitForReload = true;
                                    myEmitterLogs('Sent data Successfully');
                                    poalimAsakimNew.logOutNew();
                                    return;
                                }
                                output.response.forEach(v => {
                                    if (v.response && typeof (v.response) === 'string' && (v.response.includes('<html') || v.response === '')) {
                                        v.response = null;
                                    }
                                });
                                output.response.filter(item => item.error !== false).forEach(v => {
                                    v.response = null;
                                });
                                resolve(output);
                            }
                        } catch (e) {
                            console.log(e);
                        } finally {

                        }
                    })
                }
                callWs()
            });
        }

        function resolveCookies() {
            return new Promise(resolve => {
                win.cookies.getAll({}, function (cool) {
                    cool.forEach(function (v) {
                        if (!v.domain.includes('bizibox')) {
                            document.cookie = v.name + "=" + v.value + ";";
                        }
                    })
                    resolve(true);
                });
            });
        }

        function timeoutSpace() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(true);
                }, 1500);
            });
        }

        async function parallel() {
            async function parallelSlices(idxArr) {
                console.log(('תחילת ריצת '
                    +
                    poalimAsakimNew.numberOfOperationsNilvim
                    +
                    ' חשבונות נוספים, אינדקס מספר: '
                    +
                    idxArr));
                const slicePos = (Number(poalimAsakimNew.numberOfOperationsNilvim) * idxArr);
                const argsCopy = [].concat(listOfArguments.slice((slicePos), (slicePos + Number(poalimAsakimNew.numberOfOperationsNilvim))).map((val, ind) => ({
                    val,
                    ind
                })));
                const result = new Array(listOfArguments.slice((slicePos), (slicePos + Number(poalimAsakimNew.numberOfOperationsNilvim))).length);
                const promises = new Array(Number(poalimAsakimNew.numberOfOperationsNilvim)).fill(Promise.resolve()); //set how many items will run parallel together

                function chainNext(p) {
                    if (argsCopy.length) {
                        const arg = argsCopy.shift();
                        return p.then(() => {
                            const operationPromise = asyncOperation(arg.val).then(r => {
                                console.log('סיום ריצת חשבון-----' + arg.ind, r);
                                result[arg.ind] = r;
                            });
                            return chainNext(operationPromise);
                        });
                    }
                    return p;
                }

                await Promise.all(promises.map(chainNext));
                console.log(('סיום ריצת '
                    +
                    Number(poalimAsakimNew.numberOfOperationsNilvim)
                    +
                    ' חשבונות נוספים, אינדקס מספר: '
                    +
                    idxArr), result);
                return result;
            }

            let resultArray = [];
            let listNum = 0;
            for (let idx = 0; idx < listOfArgumentsSlice; idx++) {
                const result = await parallelSlices(idx);
                resultArray = resultArray.concat(result);
                const currentNumAcc = ((idx + 1) * Number(poalimAsakimNew.numberOfOperationsNilvim));
                const floorNum = Math.floor(currentNumAcc / Number(poalimAsakimNew.numOfAccForRenewLoginNilvim))
                if (listNum !== floorNum) {
                    listNum = floorNum;
                    await all.banks.accounts.poalimAsakimNew.renewLogin();
                }
                await timeoutSpace();
            }
            return resultArray;
        }

        parallel().then(async (res) => {
            const elapsed = Date.now() - started;
            myEmitterLogs('Finished to collect all loadLoan of all accounts at ' + (elapsed / 1000) + 'ms');
            poalimAsakimNew.loadDueChecksNew();
        });
    }
    poalimAsakimNew.loadDueChecksNew = async function () {
        const started = Date.now();
        const ARR_TRANS_DAY_TO_RUN = all.banks.accountDetails.bank.arrDDAll.filter((it) => (it.IND_NILVIM > 0)).map((item, idx) => {
            return Object.assign(item, {
                idx,
                bankParams: ("12-" + item.BANK_SNIF_ACCOUNT_KEY.split('-')[1] + "-" + item.BANK_SNIF_ACCOUNT_KEY.split('-')[0]),
                BankNumber: 12,
                AccountNumber: parseInt(item.BANK_SNIF_ACCOUNT_KEY.split('-')[0]),
                BranchNumber: parseInt(item.BANK_SNIF_ACCOUNT_KEY.split('-')[1]),
            })
        });

        const listOfArguments = ARR_TRANS_DAY_TO_RUN;
        const listOfArgumentsSlice = (ARR_TRANS_DAY_TO_RUN.length / Number(poalimAsakimNew.numberOfOperationsNilvim));

        const asyncOperation = param => {
            return new Promise(async resolve => {
                monitorActivityClass.setIntervalActivity();
                await resolveCookies();
                console.log('step 1------ Running Index account: ' + param.idx);
                console.log(all.banks.core.services.logAlertsBanks(30, JSON.stringify(all.banks.accountDetails.bank.arrDDAll[param.idx])));

                const text = "מתחיל loadDueChecks לחשבון" + " " + all.banks.accountDetails.bank.arrDDAll[param.idx].BANK_SNIF_ACCOUNT_KEY;
                console.log(all.banks.core.services.logAlertsBanks(10, text));

                const allDataArrDueChecks = [];
                var dateBasic = new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getDate() + 1));
                var dateFrom = dateBasic.getFullYear() + '' + ("0" + (dateBasic.getMonth() + 1)).slice(-2) + ("0" + (dateBasic.getDate())).slice(-2);
                var dateToFormat = new Date(new Date().getFullYear(), new Date().getMonth() + 36, new Date().getDate());
                var dateTo = dateToFormat.getFullYear() + '' + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + ("0" + (dateToFormat.getDate())).slice(-2);
                const commonPart = {
                    'TargetId': all.banks.accountDetails.bank.targetId,
                    'Token': all.banks.accountDetails.bank.token,
                    'BankNumber': param.BankNumber,
                    'AccountNumber': param.AccountNumber,
                    'BranchNumber': param.BranchNumber,
                    'ExtractDate': new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                    'ExporterId': all.banks.spiderConfig.spiderId
                };

                try {
                    var urlXhr = "https://biz2.bankhapoalim.co.il/ServerServices/current-account/cheques?accountId=" + param.bankParams + "&endDate=" + dateTo + "&startDate=" + dateFrom + "&type=totals&view=custodyBySettedDate";
                    let data = await resolveSender({
                        urls: [urlXhr],
                        method: "GET",
                        body: null,
                        headers: null,
                    });
                    if (data && data.response && data.response.length && data.response[0].response) {
                        data = data.response[0].response;
                        let chequesPerDateList = data && Array.isArray(data.chequesPerDateList) ? data.chequesPerDateList : [];
                        for (let idx = 0; idx < chequesPerDateList.length && !poalimAsakimNew.haltAndWaitForReload; idx++) {
                            const paymentDate = chequesPerDateList[idx].paymentDate;
                            try {
                                let result = await resolveSender({
                                    urls: ["https://biz2.bankhapoalim.co.il/ServerServices/current-account/cheques?accountId=" + param.bankParams
                                    + "&paymentDate=" + paymentDate
                                    + "&type=details&view=custody"],
                                    method: "GET",
                                    body: null,
                                    headers: null,
                                });
                                if (result && result.response && result.response.length && result.response[0].response) {
                                    result = result.response[0].response;
                                    if (result && Array.isArray(result.chequeInCustodyList)) {
                                        for (let va of result.chequeInCustodyList) {
                                            allDataArrDueChecks.push(
                                                Object.assign({
                                                    "CheckNumber": va.referenceNumber,
                                                    "CheckDescription": va.eventNumber,
                                                    "DepositeDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(va.depositDate)),
                                                    "DueDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(va.paymentDate)),
                                                    "CheckTotal": va.chequeAmount,
                                                    "CheckBankNumber": va.payingBankNumber,
                                                    "CheckAccountNumber": va.payingAccountNumber,
                                                    "CheckBranchNumber": va.payingBranchNumber
                                                }, commonPart));
                                        }
                                    }

                                }
                            } catch (e) {
                                writeLog(e);
                            }
                        }
                    }
                } catch (exc) {
                    writeLog(exc);
                } finally {

                }

                try {
                    if (allDataArrDueChecks.length) {
                        console.log('Last step ------ found ' + allDataArrDueChecks.length + ' DueChecks of Index account: ' + param.idx);
                        await all.banks.core.services.sendDueChecksServer(allDataArrDueChecks);
                    }
                    resolve(true);
                } catch (error) {
                    resolve(true);
                }
            })
        };

        function resolveSender(item) {
            return new Promise(resolve => {
                let timeToTry = 0;
                const callWs = function () {
                    timeToTry += 1;
                    console.log('start callWs')
                    monitorActivityClass.setIntervalActivity();

                    let params = Object.assign(item, {
                        cookies: document.cookie,
                        token: poalimAsakimNew.xsrfToken,
                        numberOfOperations: poalimAsakimNew.numberOfOperationsNilvim
                    });
                    if (window.navigator.platform.indexOf('Win') === -1 && !window.all.banks.vpnConnected) {
                        params['proxy'] = ('http://brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '') + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225');
                    }
                    parallelReq(params, function (output) {
                        console.log('got res callWs')
                        monitorActivityClass.setIntervalActivity();

                        try {
                            console.log(output.response);
                            const numOfLogsOut = output.response.filter(it => it.statusCode === 403);
                            const numOfLogsOutError = output.response.filter(it => it.error !== false);
                            // numForLogsOut += numOfLogsOut.length;
                            if (numOfLogsOut.length > 0 || (numOfLogsOutError.length && timeToTry < 2)) {
                                // numForLogsOut = 0;
                                if (numOfLogsOut.length > 0) {
                                    all.banks.accounts.poalimAsakimNew.middleOfWork = true;
                                    all.banks.accounts.poalimAsakimNew.renewLogin().then(() => {
                                        if (output.response.some(item => item.headers && item.headers.location && ["getLogonPageIski", "Error", "exit.html"].some(urlPart => (item.headers.location).includes(urlPart)))) {
                                            let err = new Error("Redirected to perhaps because of another otp session started somewhere. Terminating with error.");
                                            if (item.headers.location === 'https://misc.poalim-site.co.il/Error_Pages/5/New/ErrorNew_5.html') {
                                                err = new Error("Redirected to " + item.headers.location + " perhaps because the bank announces that the service is temporarily unavailable.");
                                            }
                                            all.banks.core.services.errorLog(err);
                                            poalimAsakimNew.haltAndWaitForReload = true;
                                            poalimAsakimNew.logOutNew();
                                            return;
                                        }
                                        callWs()
                                    });
                                } else {
                                    callWs()
                                }
                            } else {
                                if (output.response.some(item => item.headers && item.headers.location && ["getLogonPageIski", "Error", "exit.html"].some(urlPart => (item.headers.location).includes(urlPart)))) {
                                    let err = new Error("Redirected to perhaps because of another otp session started somewhere. Terminating with error.");
                                    if (item.headers.location === 'https://misc.poalim-site.co.il/Error_Pages/5/New/ErrorNew_5.html') {
                                        err = new Error("Redirected to " + item.headers.location + " perhaps because the bank announces that the service is temporarily unavailable.");
                                    }
                                    all.banks.core.services.errorLog(err);
                                    poalimAsakimNew.haltAndWaitForReload = true;
                                    myEmitterLogs('Sent data Successfully');
                                    poalimAsakimNew.logOutNew();
                                    return;
                                }
                                output.response.forEach(v => {
                                    if (v.response && typeof (v.response) === 'string' && (v.response.includes('<html') || v.response === '')) {
                                        v.response = null;
                                    }
                                });
                                output.response.filter(item => item.error !== false).forEach(v => {
                                    v.response = null;
                                });
                                resolve(output);
                            }
                        } catch (e) {
                            console.log(e);
                        } finally {

                        }
                    })
                }
                callWs()
            });
        }

        function resolveCookies() {
            return new Promise(resolve => {
                win.cookies.getAll({}, function (cool) {
                    cool.forEach(function (v) {
                        if (!v.domain.includes('bizibox')) {
                            document.cookie = v.name + "=" + v.value + ";";
                        }
                    })
                    resolve(true);
                });
            });
        }

        function timeoutSpace() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(true);
                }, 1500);
            });
        }

        async function parallel() {
            async function parallelSlices(idxArr) {
                console.log(('תחילת ריצת '
                    +
                    poalimAsakimNew.numberOfOperationsNilvim
                    +
                    ' חשבונות נוספים, אינדקס מספר: '
                    +
                    idxArr));
                const slicePos = (Number(poalimAsakimNew.numberOfOperationsNilvim) * idxArr);
                const argsCopy = [].concat(listOfArguments.slice((slicePos), (slicePos + Number(poalimAsakimNew.numberOfOperationsNilvim))).map((val, ind) => ({
                    val,
                    ind
                })));
                const result = new Array(listOfArguments.slice((slicePos), (slicePos + Number(poalimAsakimNew.numberOfOperationsNilvim))).length);
                const promises = new Array(Number(poalimAsakimNew.numberOfOperationsNilvim)).fill(Promise.resolve()); //set how many items will run parallel together

                function chainNext(p) {
                    if (argsCopy.length) {
                        const arg = argsCopy.shift();
                        return p.then(() => {
                            const operationPromise = asyncOperation(arg.val).then(r => {
                                console.log('סיום ריצת חשבון-----' + arg.ind, r);
                                result[arg.ind] = r;
                            });
                            return chainNext(operationPromise);
                        });
                    }
                    return p;
                }

                await Promise.all(promises.map(chainNext));
                console.log(('סיום ריצת '
                    +
                    Number(poalimAsakimNew.numberOfOperationsNilvim)
                    +
                    ' חשבונות נוספים, אינדקס מספר: '
                    +
                    idxArr), result);
                return result;
            }

            let resultArray = [];
            let listNum = 0;
            for (let idx = 0; idx < listOfArgumentsSlice; idx++) {
                const result = await parallelSlices(idx);
                resultArray = resultArray.concat(result);
                const currentNumAcc = ((idx + 1) * Number(poalimAsakimNew.numberOfOperationsNilvim));
                const floorNum = Math.floor(currentNumAcc / Number(poalimAsakimNew.numOfAccForRenewLoginNilvim))
                if (listNum !== floorNum) {
                    listNum = floorNum;
                    await all.banks.accounts.poalimAsakimNew.renewLogin();
                }
                await timeoutSpace();
            }
            return resultArray;
        }

        parallel().then(async (res) => {
            const elapsed = Date.now() - started;
            myEmitterLogs('Finished to collect all loadDueChecksNew of all accounts at ' + (elapsed / 1000) + 'ms');
            poalimAsakimNew.loadStandingOrdersNew();
        });
    }
    poalimAsakimNew.loadStandingOrdersNew = async function () {
        const started = Date.now();
        const ARR_TRANS_DAY_TO_RUN = all.banks.accountDetails.bank.arrDDAll.filter((it) => (it.IND_NILVIM > 0)).map((item, idx) => {
            return Object.assign(item, {
                idx,
                bankParams: ("12-" + item.BANK_SNIF_ACCOUNT_KEY.split('-')[1] + "-" + item.BANK_SNIF_ACCOUNT_KEY.split('-')[0]),
                BankNumber: 12,
                AccountNumber: parseInt(item.BANK_SNIF_ACCOUNT_KEY.split('-')[0]),
                BranchNumber: parseInt(item.BANK_SNIF_ACCOUNT_KEY.split('-')[1]),
            })
        });

        const listOfArguments = ARR_TRANS_DAY_TO_RUN;
        const listOfArgumentsSlice = (ARR_TRANS_DAY_TO_RUN.length / Number(poalimAsakimNew.numberOfOperationsNilvim));

        const asyncOperation = param => {
            return new Promise(async resolve => {
                monitorActivityClass.setIntervalActivity();
                await resolveCookies();
                console.log('step 1------ Running Index account: ' + param.idx);
                console.log(all.banks.core.services.logAlertsBanks(30, JSON.stringify(all.banks.accountDetails.bank.arrDDAll[param.idx])));

                const text = "מתחיל loadDueChecks לחשבון" + " " + all.banks.accountDetails.bank.arrDDAll[param.idx].BANK_SNIF_ACCOUNT_KEY;
                console.log(all.banks.core.services.logAlertsBanks(10, text));


                const allDataArrStandingOrders = [];


                try {
                    let urlXhr = "https://biz2.bankhapoalim.co.il/ServerServices/current-account/standingOrders?accountId=" + param.bankParams;
                    let data = await resolveSender({
                        urls: [urlXhr],
                        method: "GET",
                        body: null,
                        headers: null,
                    });
                    if (data && data.response && data.response.length && data.response[0].response) {
                        data = data.response[0].response;
                        if (data && (typeof (data) === 'object') && data.length) {
                            $(data).each(function (indx, va) {
                                allDataArrStandingOrders.push({
                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                    "Token": all.banks.accountDetails.bank.token,
                                    'BankNumber': param.BankNumber,
                                    'AccountNumber': param.AccountNumber,
                                    'BranchNumber': param.BranchNumber,
                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "OrderName": va.standingOrderProductDescription,
                                    "OrderOpeningDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(va.updatingDate)),
                                    "OrderLastDate": null,
                                    "OrderTotal": va.standingOrderAmount,
                                    "OrderNumber": va.accountOrderId,
                                    "Asmachta": null,
                                    BankTransferNumber: va.creditedBankNumber,
                                    BranchTransferNumber: va.transferDestinationReference,
                                    AccountTransferNumber: va.transferSubDestinationReference,
                                    NamePayerTransfer: null,
                                    Type: 2
                                });
                            });

                        } else {

                        }
                    }

                } catch (err) {

                }


                try {
                    var urlXhr = "https://biz2.bankhapoalim.co.il/ServerServices/current-account/debitAuthorizations?accountId=" + param.bankParams;
                    let res = await resolveSender({
                        urls: [urlXhr],
                        method: "GET",
                        body: null,
                        headers: null,
                    });
                    if (res && res.response && res.response.length && res.response[0].response) {
                        res = res.response[0].response;
                        if (res && Array.isArray(res.debitAuthorizations) && res.debitAuthorizations.length) {
                            $(res.debitAuthorizations).each(function (indx1, va1) {
                                allDataArrStandingOrders.push({
                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                    "Token": all.banks.accountDetails.bank.token,
                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    'BankNumber': param.BankNumber,
                                    'AccountNumber': param.AccountNumber,
                                    'BranchNumber': param.BranchNumber,
                                    "OrderName": va1.institutionName,
                                    "OrderOpeningDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(va1.agreementOpeningDate)),
                                    "OrderLastDate": !va1.debitDate ? null : all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(va1.debitDate)),
                                    "OrderTotal": va1.debitAmount,
                                    "OrderNumber": va1.institutionShortSerialId,
                                    "Asmachta": null,
                                    BankTransferNumber: null,
                                    BranchTransferNumber: null,
                                    AccountTransferNumber: null,
                                    NamePayerTransfer: null,
                                    Type: 1,
                                });
                            });
                        } else {


                        }
                    }

                } catch (err) {

                }

                try {
                    if (allDataArrStandingOrders.length) {
                        console.log('Last step ------ found ' + allDataArrStandingOrders.length + ' StandingOrders of Index account: ' + param.idx);
                        await all.banks.core.services.sendStandingOrdersServer(allDataArrStandingOrders);
                    }
                    resolve(true);
                } catch (error) {
                    resolve(true);
                }
            })
        };

        function resolveSender(item) {
            return new Promise(resolve => {
                let timeToTry = 0;
                const callWs = function () {
                    timeToTry += 1;
                    console.log('start callWs')
                    monitorActivityClass.setIntervalActivity();
                    let params = Object.assign(item, {
                        cookies: document.cookie,
                        token: poalimAsakimNew.xsrfToken,
                        numberOfOperations: poalimAsakimNew.numberOfOperationsNilvim
                    });
                    if (window.navigator.platform.indexOf('Win') === -1 && !window.all.banks.vpnConnected) {
                        params['proxy'] = ('http://brd-customer-hl_c3a2c65e-zone-residential-route_err-pass_dyn-country-il-session-glob' + all.banks.accountDetails.bank.token.replace(/-/g, '') + ':h0mi0yvib3to@zproxy.lum-superproxy.io:22225');
                    }
                    parallelReq(params, function (output) {
                        console.log('got res callWs')
                        monitorActivityClass.setIntervalActivity();

                        try {
                            console.log(output.response);
                            const numOfLogsOut = output.response.filter(it => it.statusCode === 403);
                            const numOfLogsOutError = output.response.filter(it => it.error !== false);
                            // numForLogsOut += numOfLogsOut.length;
                            if (numOfLogsOut.length > 0 || (numOfLogsOutError.length && timeToTry < 2)) {
                                // numForLogsOut = 0;
                                if (numOfLogsOut.length > 0) {
                                    all.banks.accounts.poalimAsakimNew.middleOfWork = true;
                                    all.banks.accounts.poalimAsakimNew.renewLogin().then(() => {
                                        if (output.response.some(item => item.headers && item.headers.location && ["getLogonPageIski", "Error", "exit.html"].some(urlPart => (item.headers.location).includes(urlPart)))) {
                                            let err = new Error("Redirected to perhaps because of another otp session started somewhere. Terminating with error.");
                                            if (item.headers.location === 'https://misc.poalim-site.co.il/Error_Pages/5/New/ErrorNew_5.html') {
                                                err = new Error("Redirected to " + item.headers.location + " perhaps because the bank announces that the service is temporarily unavailable.");
                                            }
                                            all.banks.core.services.errorLog(err);
                                            poalimAsakimNew.haltAndWaitForReload = true;
                                            poalimAsakimNew.logOutNew();
                                            return;
                                        }
                                        callWs()
                                    });
                                } else {
                                    callWs()
                                }
                            } else {
                                if (output.response.some(item => item.headers && item.headers.location && ["getLogonPageIski", "Error", "exit.html"].some(urlPart => (item.headers.location).includes(urlPart)))) {
                                    let err = new Error("Redirected to perhaps because of another otp session started somewhere. Terminating with error.");
                                    if (item.headers.location === 'https://misc.poalim-site.co.il/Error_Pages/5/New/ErrorNew_5.html') {
                                        err = new Error("Redirected to " + item.headers.location + " perhaps because the bank announces that the service is temporarily unavailable.");
                                    }
                                    all.banks.core.services.errorLog(err);
                                    poalimAsakimNew.haltAndWaitForReload = true;
                                    myEmitterLogs('Sent data Successfully');
                                    poalimAsakimNew.logOutNew();
                                    return;
                                }
                                output.response.forEach(v => {
                                    if (v.response && typeof (v.response) === 'string' && (v.response.includes('<html') || v.response === '')) {
                                        v.response = null;
                                    }
                                });
                                output.response.filter(item => item.error !== false).forEach(v => {
                                    v.response = null;
                                });
                                resolve(output);
                            }
                        } catch (e) {
                            console.log(e);
                        } finally {

                        }
                    })
                }
                callWs()
            });
        }

        function resolveCookies() {
            return new Promise(resolve => {
                win.cookies.getAll({}, function (cool) {
                    cool.forEach(function (v) {
                        if (!v.domain.includes('bizibox')) {
                            document.cookie = v.name + "=" + v.value + ";";
                        }
                    })
                    resolve(true);
                });
            });
        }

        function timeoutSpace() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(true);
                }, 1500);
            });
        }

        async function parallel() {
            async function parallelSlices(idxArr) {
                console.log(('תחילת ריצת '
                    +
                    poalimAsakimNew.numberOfOperationsNilvim
                    +
                    ' חשבונות נוספים, אינדקס מספר: '
                    +
                    idxArr));
                const slicePos = (Number(poalimAsakimNew.numberOfOperationsNilvim) * idxArr);
                const argsCopy = [].concat(listOfArguments.slice((slicePos), (slicePos + Number(poalimAsakimNew.numberOfOperationsNilvim))).map((val, ind) => ({
                    val,
                    ind
                })));
                const result = new Array(listOfArguments.slice((slicePos), (slicePos + Number(poalimAsakimNew.numberOfOperationsNilvim))).length);
                const promises = new Array(Number(poalimAsakimNew.numberOfOperationsNilvim)).fill(Promise.resolve()); //set how many items will run parallel together

                function chainNext(p) {
                    if (argsCopy.length) {
                        const arg = argsCopy.shift();
                        return p.then(() => {
                            const operationPromise = asyncOperation(arg.val).then(r => {
                                console.log('סיום ריצת חשבון-----' + arg.ind, r);
                                result[arg.ind] = r;
                            });
                            return chainNext(operationPromise);
                        });
                    }
                    return p;
                }

                await Promise.all(promises.map(chainNext));
                console.log(('סיום ריצת '
                    +
                    Number(poalimAsakimNew.numberOfOperationsNilvim)
                    +
                    ' חשבונות נוספים, אינדקס מספר: '
                    +
                    idxArr), result);
                return result;
            }

            let resultArray = [];
            let listNum = 0;
            for (let idx = 0; idx < listOfArgumentsSlice; idx++) {
                const result = await parallelSlices(idx);
                resultArray = resultArray.concat(result);
                const currentNumAcc = ((idx + 1) * Number(poalimAsakimNew.numberOfOperationsNilvim));
                const floorNum = Math.floor(currentNumAcc / Number(poalimAsakimNew.numOfAccForRenewLoginNilvim))
                if (listNum !== floorNum) {
                    listNum = floorNum;
                    await all.banks.accounts.poalimAsakimNew.renewLogin();
                }
                await timeoutSpace();
            }
            return resultArray;
        }

        parallel().then(async (res) => {
            const elapsed = Date.now() - started;
            myEmitterLogs('Finished to collect all loadStandingOrdersNew of all accounts at ' + (elapsed / 1000) + 'ms');
            poalimAsakimNew.logOutNew();
        });
    }
    poalimAsakimNew.loadLoan = function () {
        all.banks.generalVariables.allDataArrLoan = [];
        var url = "https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?ctfw=auto&reqName=action&language=HE&transactionId=HalvaotOsh&subMenuName=Credit&ts=" + poalimAsakimNew.varGlobal.ts + "&tf=" + Math.random() + "&u=" + poalimAsakimNew.varGlobal.u + "&pSubMenu=Investments&fromSubMenu=Credit&bxx=912&nsv=y&dwx=" + poalimAsakimNew.varGlobal.dwx + "&wScr=1920&hScr=1080&tcfo=" + poalimAsakimNew.varGlobal.tcfo + "&mmx=" + poalimAsakimNew.varGlobal.mmx + "&qwrt=" + poalimAsakimNew.varGlobal.qwrt + "&dtcdb=0&menuTranName=HalvaotOsh"
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (res, bbb, ccc) {
                var expires = ccc.getResponseHeader("X-FRAME-OPTIONS");
                if (expires == null) {

                    poalimAsakimNew.setNewTime(function () {
                        poalimAsakimNew.loadLoan();
                    });
                } else {
                    try {
                        var res = all.banks.core.services.parseHtml(res);

                        var ts = res.find('input[name="ts"]').val();
                        var u = res.find('input[name="u"]').val();
                        var dwx = res.find('input[name="dwx"]').val();
                        var tcfo = res.find('input[name="tcfo"]').val();
                        var qwrt = res.find('input[name="qwrt"]').val();
                        var tsfo = res.find('input[name="tsfo"]').val();
                        var mmx = res.find('input[name="mmx"]').val();
                        var dwxReq = res.find('input[name="dwxReq"]').val();
                        var dwxOp = res.find('input[name="dwxOp"]').val();
                        var YOM_ASAKIM_MF = res.find('input[name="YOM_ASAKIM_MF"]').val();
                        var sugCredit = res.find('input[name="sugCredit"]').val();
                        var misparCredit = res.find('input[name="misparCredit"]').val();
                        var orderField = res.find('input[name="orderField"]').val();
                        var orderBy = res.find('input[name="orderBy"]').val();
                        var showselected = res.find('input[name="showselected"]').val();
                        var siduri = res.find('input[name="siduri"]').val();
                        var goNext = res.find('input[name="goNext"]').val();
                        var goBack = res.find('input[name="goBack"]').val();
                        var changedDetails = res.find('input[name="changedDetails"]').val();
                        var changedOrder = res.find('input[name="changedOrder"]').val();
                        var dontClearTrInfo = res.find('input[name="dontClearTrInfo"]').val();
                        var goBack2 = res.find('input[name="goBack2"]').val();
                        var show = res.find('input[name="show"]').val();
                        var SelectSugCredit = res.find('input[name="SelectSugCredit"]').val();
                        poalimAsakimNew.varGlobal.ts = ts;
                        poalimAsakimNew.varGlobal.u = u;
                        poalimAsakimNew.varGlobal.dwx = dwx;
                        poalimAsakimNew.varGlobal.tcfo = tcfo;
                        poalimAsakimNew.varGlobal.qwrt = qwrt;
                        poalimAsakimNew.varGlobal.tsfo = tsfo;
                        poalimAsakimNew.varGlobal.mmx = mmx;
                        poalimAsakimNew.varGlobal.dwxReq = dwxReq;
                        poalimAsakimNew.varGlobal.dwxOp = dwxOp;
                        poalimAsakimNew.varGlobal.YOM_ASAKIM_MF = YOM_ASAKIM_MF;
                        poalimAsakimNew.varGlobal.sugCredit = sugCredit;
                        poalimAsakimNew.varGlobal.misparCredit = misparCredit;
                        poalimAsakimNew.varGlobal.orderField = orderField;
                        poalimAsakimNew.varGlobal.orderBy = orderBy;
                        poalimAsakimNew.varGlobal.showselected = showselected;
                        poalimAsakimNew.varGlobal.siduri = siduri;
                        poalimAsakimNew.varGlobal.goNext = "yes";
                        poalimAsakimNew.varGlobal.goBack = goBack;
                        poalimAsakimNew.varGlobal.changedDetails = changedDetails;
                        poalimAsakimNew.varGlobal.changedOrder = changedOrder;
                        poalimAsakimNew.varGlobal.dontClearTrInfo = "yes";
                        poalimAsakimNew.varGlobal.goBack2 = goBack2;
                        poalimAsakimNew.varGlobal.show = "2";
                        poalimAsakimNew.varGlobal.SelectSugCredit = SelectSugCredit;

                        poalimAsakimNew.rowsLoan = 0;
                        poalimAsakimNew.pageActive = 1;
                        poalimAsakimNew.getNextPage = function () {
                            var req = {
                                'input_fromAgg': "",
                                'reqName': "action",
                                'transactionId': "HalvaotOsh",
                                'menuParam': "",
                                'PGcode': "",
                                'step': "1",
                                'u': poalimAsakimNew.varGlobal.u,
                                'tcfo': poalimAsakimNew.varGlobal.tcfo,
                                'tsfo': poalimAsakimNew.varGlobal.tsfo,
                                'mmx': poalimAsakimNew.varGlobal.mmx,
                                'fromSubMenu': "Credit",
                                'qwrt': poalimAsakimNew.varGlobal.qwrt,
                                'mpux': "",
                                'targetView': "",
                                'dwx': poalimAsakimNew.varGlobal.dwx,
                                'dwxReq': poalimAsakimNew.varGlobal.dwxReq,
                                'dwxOp': poalimAsakimNew.varGlobal.dwxOp,
                                'doc_key': "",
                                'callerTid': "",
                                'PageActive': poalimAsakimNew.pageActive,
                                'WTcomeFrom': "",
                                'accountIndex': all.banks.accounts.poalimAsakimNew.indDDAll(all.banks.accounts.poalimAsakimNew.vddVal.BANK_SNIF_ACCOUNT_KEY),
                                'YOM_ASAKIM_MF': poalimAsakimNew.varGlobal.YOM_ASAKIM_MF,
                                'sugCredit': poalimAsakimNew.varGlobal.sugCredit,
                                'misparCredit': poalimAsakimNew.varGlobal.misparCredit,
                                'orderField': poalimAsakimNew.varGlobal.orderField,
                                'orderBy': poalimAsakimNew.varGlobal.orderBy,
                                'showselected': poalimAsakimNew.varGlobal.showselected,
                                'siduri': poalimAsakimNew.varGlobal.siduri,
                                'goNext': poalimAsakimNew.varGlobal.goNext,
                                'goBack': poalimAsakimNew.varGlobal.goBack,
                                'changedDetails': poalimAsakimNew.varGlobal.changedDetails,
                                'changedOrder': poalimAsakimNew.varGlobal.changedOrder,
                                'dontClearTrInfo': poalimAsakimNew.varGlobal.dontClearTrInfo,
                                'goBack2': poalimAsakimNew.varGlobal.goBack2,
                                'show': poalimAsakimNew.varGlobal.show,
                                'SelectSugCredit': poalimAsakimNew.varGlobal.SelectSugCredit
                            };
                            all.banks.core.services.httpReq("https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc", 'POST', req, true, false)
                                .then(function (res) {
                                    res = all.banks.core.services.parseHtml(res);

                                    var ts = res.find('input[name="ts"]').val();
                                    var u = res.find('input[name="u"]').val();
                                    var dwx = res.find('input[name="dwx"]').val();
                                    var tcfo = res.find('input[name="tcfo"]').val();
                                    var qwrt = res.find('input[name="qwrt"]').val();
                                    var tsfo = res.find('input[name="tsfo"]').val();
                                    var mmx = res.find('input[name="mmx"]').val();
                                    var dwxReq = res.find('input[name="dwxReq"]').val();
                                    var dwxOp = res.find('input[name="dwxOp"]').val();
                                    var YOM_ASAKIM_MF = res.find('input[name="YOM_ASAKIM_MF"]').val();
                                    var sugCredit = res.find('input[name="sugCredit"]').val();
                                    var misparCredit = res.find('input[name="misparCredit"]').val();
                                    var orderField = res.find('input[name="orderField"]').val();
                                    var orderBy = res.find('input[name="orderBy"]').val();
                                    var showselected = res.find('input[name="showselected"]').val();
                                    var siduri = res.find('input[name="siduri"]').val();
                                    var goNext = res.find('input[name="goNext"]').val();
                                    var goBack = res.find('input[name="goBack"]').val();
                                    var changedDetails = res.find('input[name="changedDetails"]').val();
                                    var changedOrder = res.find('input[name="changedOrder"]').val();
                                    var dontClearTrInfo = res.find('input[name="dontClearTrInfo"]').val();
                                    var goBack2 = res.find('input[name="goBack2"]').val();
                                    var show = res.find('input[name="show"]').val();
                                    var SelectSugCredit = res.find('input[name="SelectSugCredit"]').val();
                                    poalimAsakimNew.varGlobal.ts = ts;
                                    poalimAsakimNew.varGlobal.u = u;
                                    poalimAsakimNew.varGlobal.dwx = dwx;
                                    poalimAsakimNew.varGlobal.tcfo = tcfo;
                                    poalimAsakimNew.varGlobal.qwrt = qwrt;
                                    poalimAsakimNew.varGlobal.tsfo = tsfo;
                                    poalimAsakimNew.varGlobal.mmx = mmx;
                                    poalimAsakimNew.varGlobal.dwxReq = dwxReq;
                                    poalimAsakimNew.varGlobal.dwxOp = dwxOp;
                                    poalimAsakimNew.varGlobal.YOM_ASAKIM_MF = YOM_ASAKIM_MF;
                                    poalimAsakimNew.varGlobal.sugCredit = sugCredit;
                                    poalimAsakimNew.varGlobal.misparCredit = misparCredit;
                                    poalimAsakimNew.varGlobal.orderField = orderField;
                                    poalimAsakimNew.varGlobal.orderBy = orderBy;
                                    poalimAsakimNew.varGlobal.showselected = showselected;
                                    poalimAsakimNew.varGlobal.siduri = siduri;
                                    poalimAsakimNew.varGlobal.goNext = "yes";
                                    poalimAsakimNew.varGlobal.goBack = goBack;
                                    poalimAsakimNew.varGlobal.changedDetails = changedDetails;
                                    poalimAsakimNew.varGlobal.changedOrder = changedOrder;
                                    poalimAsakimNew.varGlobal.dontClearTrInfo = "yes";
                                    poalimAsakimNew.varGlobal.goBack2 = goBack2;
                                    poalimAsakimNew.varGlobal.show = "2";
                                    poalimAsakimNew.varGlobal.SelectSugCredit = SelectSugCredit;
                                    poalimAsakimNew.process(res);
                                    res = null;
                                }).fail(function (error, resErr, urlParam) {
                                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                                all.banks.core.services.errorLog(logErr)
                            });
                        }
                        poalimAsakimNew.getPrevPageFromTable = function () {
                            var req = {
                                'input_fromAgg': "",
                                'reqName': "action",
                                'transactionId': "HalvaotOsh",
                                'menuParam': "",
                                'PGcode': "",
                                'step': "1",
                                'u': poalimAsakimNew.varGlobal.u,
                                'tcfo': poalimAsakimNew.varGlobal.tcfo,
                                'tsfo': poalimAsakimNew.varGlobal.tsfo,
                                'mmx': poalimAsakimNew.varGlobal.mmx,
                                'fromSubMenu': "Credit",
                                'qwrt': poalimAsakimNew.varGlobal.qwrt,
                                'mpux': "",
                                'targetView': "",
                                'dwx': poalimAsakimNew.varGlobal.dwx,
                                'dwxReq': poalimAsakimNew.varGlobal.dwxReq,
                                'dwxOp': poalimAsakimNew.varGlobal.dwxOp,
                                'doc_key': "",
                                'callerTid': "",
                                'PageActive': poalimAsakimNew.pageActive,
                                'WTcomeFrom': "",
                                'accountIndex': all.banks.accounts.poalimAsakimNew.indDDAll(all.banks.accounts.poalimAsakimNew.vddVal.BANK_SNIF_ACCOUNT_KEY),
                                'YOM_ASAKIM_MF': poalimAsakimNew.varGlobal.YOM_ASAKIM_MF,
                                'sugCredit': poalimAsakimNew.varGlobal.sugCredit,
                                'misparCredit': poalimAsakimNew.varGlobal.misparCredit,
                                'orderField': poalimAsakimNew.varGlobal.orderField,
                                'orderBy': poalimAsakimNew.varGlobal.orderBy,
                                'showselected': poalimAsakimNew.varGlobal.showselected,
                                'siduri': poalimAsakimNew.varGlobal.siduri,
                                'goNext': '',
                                'goBack': '',
                                'changedDetails': poalimAsakimNew.varGlobal.changedDetails,
                                'changedOrder': poalimAsakimNew.varGlobal.changedOrder,
                                'dontClearTrInfo': 'yes',
                                'goBack2': 'yes'
                            };
                            all.banks.core.services.httpReq("https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc", 'POST', req, true, false)
                                .then(function (res) {
                                    res = all.banks.core.services.parseHtml(res);

                                    var ts = res.find('input[name="ts"]').val();
                                    var u = res.find('input[name="u"]').val();
                                    var dwx = res.find('input[name="dwx"]').val();
                                    var tcfo = res.find('input[name="tcfo"]').val();
                                    var qwrt = res.find('input[name="qwrt"]').val();
                                    var tsfo = res.find('input[name="tsfo"]').val();
                                    var mmx = res.find('input[name="mmx"]').val();
                                    var dwxReq = res.find('input[name="dwxReq"]').val();
                                    var dwxOp = res.find('input[name="dwxOp"]').val();
                                    var YOM_ASAKIM_MF = res.find('input[name="YOM_ASAKIM_MF"]').val();
                                    var sugCredit = res.find('input[name="sugCredit"]').val();
                                    var misparCredit = res.find('input[name="misparCredit"]').val();
                                    var orderField = res.find('input[name="orderField"]').val();
                                    var orderBy = res.find('input[name="orderBy"]').val();
                                    var showselected = res.find('input[name="showselected"]').val();
                                    var siduri = res.find('input[name="siduri"]').val();
                                    var goNext = res.find('input[name="goNext"]').val();
                                    var goBack = res.find('input[name="goBack"]').val();
                                    var changedDetails = res.find('input[name="changedDetails"]').val();
                                    var changedOrder = res.find('input[name="changedOrder"]').val();
                                    var dontClearTrInfo = res.find('input[name="dontClearTrInfo"]').val();
                                    var goBack2 = res.find('input[name="goBack2"]').val();
                                    var show = res.find('input[name="show"]').val();
                                    var SelectSugCredit = res.find('input[name="SelectSugCredit"]').val();
                                    poalimAsakimNew.varGlobal.ts = ts;
                                    poalimAsakimNew.varGlobal.u = u;
                                    poalimAsakimNew.varGlobal.dwx = dwx;
                                    poalimAsakimNew.varGlobal.tcfo = tcfo;
                                    poalimAsakimNew.varGlobal.qwrt = qwrt;
                                    poalimAsakimNew.varGlobal.tsfo = tsfo;
                                    poalimAsakimNew.varGlobal.mmx = mmx;
                                    poalimAsakimNew.varGlobal.dwxReq = dwxReq;
                                    poalimAsakimNew.varGlobal.dwxOp = dwxOp;
                                    poalimAsakimNew.varGlobal.YOM_ASAKIM_MF = YOM_ASAKIM_MF;
                                    poalimAsakimNew.varGlobal.sugCredit = sugCredit;
                                    poalimAsakimNew.varGlobal.misparCredit = misparCredit;
                                    poalimAsakimNew.varGlobal.orderField = orderField;
                                    poalimAsakimNew.varGlobal.orderBy = orderBy;
                                    poalimAsakimNew.varGlobal.showselected = showselected;
                                    poalimAsakimNew.varGlobal.siduri = siduri;
                                    poalimAsakimNew.varGlobal.goNext = "";
                                    poalimAsakimNew.varGlobal.goBack = "";
                                    poalimAsakimNew.varGlobal.changedDetails = changedDetails;
                                    poalimAsakimNew.varGlobal.changedOrder = changedOrder;
                                    poalimAsakimNew.varGlobal.dontClearTrInfo = "yes";
                                    poalimAsakimNew.varGlobal.goBack2 = "yes";
                                    poalimAsakimNew.process(res);
                                    res = null;
                                }).fail(function (error, resErr, urlParam) {
                                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                                all.banks.core.services.errorLog(logErr)
                            });
                        }

                        poalimAsakimNew.process = function (dataRes) {
                            if (dataRes) {
                                res = dataRes;
                            }
                            var type = 104;
                            var text = "מושך הלוואות";
                            var accDetalisArr = $(res).find('#allAcountsList option:selected script').text().split('new Acc(')[1].split(")")[0].split(",");
                            var snifNum = accDetalisArr[1].replace(/\D/g, "");
                            var accNum = accDetalisArr[2].replace(/\D/g, "");
                            var AccountNumber = parseInt(accNum);
                            var BranchNumber = parseInt(snifNum);


                            function reverse(s) {
                                return s.split("").reverse().join("");
                            }

                            myEmitterLogs(21);
                            var loanRowTable = $(res).find('#someDataMainTr #someDataDivPrint tr.TR_ROW_BANKTABLE');
                            if (loanRowTable.length) {
                                loanRowTable.each(function (i, v) {
                                    if (i == poalimAsakimNew.rowsLoan) {
                                        var v = $(v);
                                        var LoanName = null, LoanNextPaymentDate = null, LoanPigurTotal = null,
                                            Next_Payment_Total = null, LoanNumber = null, LoanIntrest = null,
                                            LoanFinish = null,
                                            LoanTotalLeft = null, LoanDate = null;
                                        if ($(v).children('td').eq(11).length) {
                                            LoanName = $(v).children('td').eq(11).attr('title');
                                            if (LoanName == "") {
                                                LoanName = reverse($(v).children('td').eq(11).text());
                                            }
                                        }
                                        if ($(v).children('td').eq(10).length) {
                                            LoanNumber = $(v).children('td').eq(10).text().replace(/\s/g, "");
                                        }
                                        if ($(v).children('td').eq(7).length) {
                                            LoanIntrest = $(v).children('td').eq(7).text().replace(/\s/g, "");
                                        }
                                        if ($(v).children('td').eq(4).length && $(v).find('td').eq(4).text().replace(/\s/g, "") !== '') {
                                            var LoanFinishVal = $(v).find('td').eq(4).text().replace(/\s/g, "").split('/');
                                            LoanFinish = '20' + LoanFinishVal[2].replace(/\D/g, "") + '' + LoanFinishVal[1].replace(/\D/g, "") + '' + LoanFinishVal[0].replace(/\D/g, "");
                                        }
                                        if ($(v).children('td').eq(3).length) {
                                            LoanTotalLeft = $(v).children('td').eq(3).text().replace(/\D/g, "").replace(/,/g, '');
                                        }
                                        if ($(v).children('td').eq(5).length && $(v).find('td').eq(5).text().replace(/\s/g, "") !== '') {
                                            var LoanDateVal = $(v).children('td').eq(5).text().replace(/\s/g, "").split('/');
                                            LoanDate = '20' + LoanDateVal[2].replace(/\D/g, "") + '' + LoanDateVal[1].replace(/\D/g, "") + '' + LoanDateVal[0].replace(/\D/g, "");
                                        }
                                        if ($(v).children('td').eq(0).length && $(v).find('td').eq(0).text().replace(/\s/g, "") !== '') {
                                            var NextPaymentDate = $(v).children('td').eq(0).text().replace(/\s/g, "").split('/');
                                            LoanNextPaymentDate = '20' + NextPaymentDate[2].replace(/\D/g, "") + '' + NextPaymentDate[1].replace(/\D/g, "") + '' + NextPaymentDate[0].replace(/\D/g, "");
                                        }
                                        if ($(v).children('td').eq(6).length) {
                                            var LoanOriginalTotal = $(v).children('td').eq(6).text().replace(/\D/g, "").replace(/,/g, '');
                                        }
                                        if ($(v).children('td').eq(1).length) {
                                            Next_Payment_Total = poalimAsakimNew.returnClearSum($(v).children('td').eq(1).text());
                                        }
                                        if ($(v).find('td').eq(10).length) {
                                            LoanNumber = $(v).children('td').eq(10).text();
                                        }
                                        if ($(v).find('td').eq(2).length) {
                                            LoanPigurTotal = $(v).children('td').eq(2).text().replace(/\D/g, "").replace(/,/g, '');
                                            if (LoanPigurTotal == "") {
                                                LoanPigurTotal = null;
                                            }

                                            if (LoanPigurTotal !== null
                                                && $(v).children('td').eq(3).length
                                                && ($(v).children('td').eq(3).text().indexOf('*') >= 0)) {
                                                LoanPigurTotal = null;
                                            }
                                        }
                                        var urlPayNumLeft = "https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=action&&language=HE&transactionId=HalvaotOsh&step=2&siduri=" + $(v).attr("onclick").split(",")[0].replace(/\D/g, "") + "&misparCredit=" + $(v).attr("onclick").split(",")[1].replace(/\D/g, "") + "&orderField=eCoun&orderBy=up&PageActive=1&showselected=2&sugCredit=9999&toExcel=no";
                                        all.banks.core.services.httpReq(urlPayNumLeft, 'GET', null, false, false)
                                            .then(function (data) {
                                                var data = all.banks.core.services.parseHtml(data);
                                                var tdText = data.find("#someDataDivPrint somedata table #trBlueOnWhite12B td");
                                                const LoanNameUpdate = (reverse(tdText.eq(2).text()) + " " + tdText.eq(1).text()).trim();
                                                if (!LoanNameUpdate) {
                                                    console.log('LoanName: %s, LoanNameUpdate: %s, data: %o', LoanName, LoanNameUpdate, data);
                                                }
                                                var PaymentsNumberLeft = data.find("#Payments table.arial12NoBold").eq(0).find("tr").eq(1).find("td").eq(4).text().replace(/\D/g, "");
                                                all.banks.generalVariables.allDataArrLoan.push({
                                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                                    "Token": all.banks.accountDetails.bank.token,
                                                    "BankNumber": 12,
                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                    "BranchNumber": BranchNumber,
                                                    "AccountNumber": AccountNumber,
                                                    "LoanName": LoanNameUpdate || LoanName,
                                                    "LoanIntrest": LoanIntrest,
                                                    "LoanFinish": LoanFinish,
                                                    "LoanTotalLeft": LoanTotalLeft,
                                                    "LoanDate": LoanDate,
                                                    "LoanOriginalTotal": LoanOriginalTotal,
                                                    "NextPaymentTotal": Next_Payment_Total,
                                                    "LoanNumber": LoanNumber,
                                                    "LoanPigurTotal": LoanPigurTotal,
                                                    "LoanNextPaymentDate": LoanNextPaymentDate,
                                                    "PaymentsNumberLeft": PaymentsNumberLeft
                                                });
                                                if (loanRowTable.length == (i + 1)) {
                                                    poalimAsakimNew.rowsLoan = 0;
                                                    if (res.find('[btnuniqid="BtnContinue"]').length && res.find('[btnuniqid="BtnContinue"]').val().indexOf("המשך") !== -1) {
                                                        poalimAsakimNew.pageActive += 1;
                                                        poalimAsakimNew.getNextPage();
                                                    } else {
                                                        all.banks.accounts.poalimAsakimNew.sendLoanCtrl();
                                                        res = null;
                                                    }
                                                } else {
                                                    poalimAsakimNew.rowsLoan += 1;
                                                    if (poalimAsakimNew.pageActive > 1) {
                                                        poalimAsakimNew.getNextPage();
                                                    } else {
                                                        poalimAsakimNew.getPrevPageFromTable();
                                                    }
                                                }
                                            })
                                            .fail(function (error, resErr, urlParam) {
                                                if (loanRowTable.length == (i + 1)) {
                                                    poalimAsakimNew.rowsLoan = 0;
                                                    if (res.find('[btnuniqid="BtnContinue"]').length && res.find('[btnuniqid="BtnContinue"]').val().indexOf("המשך") !== -1) {
                                                        poalimAsakimNew.pageActive += 1;
                                                        poalimAsakimNew.getNextPage();
                                                    } else {
                                                        all.banks.accounts.poalimAsakimNew.sendLoanCtrl();
                                                        res = null;
                                                    }
                                                } else {
                                                    poalimAsakimNew.rowsLoan += 1;
                                                    if (poalimAsakimNew.pageActive > 1) {
                                                        poalimAsakimNew.getNextPage();
                                                    } else {
                                                        poalimAsakimNew.getPrevPageFromTable();
                                                    }
                                                }
                                            });
                                        return false;
                                    }
                                });
                            } else {
                                all.banks.accounts.poalimAsakimNew.sendLoanCtrl();
                                res = null;
                            }
                        }
                        poalimAsakimNew.process();
                    } catch (e) {
                        all.banks.accounts.poalimAsakimNew.sendLoanCtrl();
                        res = null;
                    }
                }

            })
            .fail(function (error, resErr, urlParam) {
                all.banks.accounts.poalimAsakimNew.sendLoanCtrl();
            });
    }

    poalimAsakimNew.loadDueChecks = function () {
        all.banks.generalVariables.allDataArrDueChecks = [];
        var url = "https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?ctfw=auto&reqName=action&language=HE&transactionId=ChekimLemishmeretPeyrut&subMenuName=Shekel&ts=" + poalimAsakimNew.varGlobal.ts + "&tf=" + Math.random() + "&u=" + poalimAsakimNew.varGlobal.u + "&pSubMenu=Shekel&fromSubMenu=Shekel&bxx=912&nsv=y&dwx=" + poalimAsakimNew.varGlobal.dwx + "&wScr=1920&hScr=1080&tcfo=" + poalimAsakimNew.varGlobal.tcfo + "&mmx=" + poalimAsakimNew.varGlobal.mmx + "&qwrt=" + poalimAsakimNew.varGlobal.qwrt + "&dtcdb=0&menuTranName=ChekimLemishmeretPeyrut";
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (response, bbb, ccc) {
                var expires = ccc.getResponseHeader("X-FRAME-OPTIONS");
                if (expires == null) {

                    poalimAsakimNew.setNewTime(function () {
                        poalimAsakimNew.loadDueChecks();
                    });
                } else {
                    try {
                        var type = 102;
                        var text = "מושך שיקים למשמרת";
                        //all.banks.core.services.sendLogs(type, text);
                        var res = all.banks.core.services.parseHtml(response);

                        var ts = res.find('input[name="ts"]').val();
                        var u = res.find('input[name="u"]').val();
                        var dwx = res.find('input[name="dwx"]').val();
                        var tcfo = res.find('input[name="tcfo"]').val();
                        var qwrt = res.find('input[name="qwrt"]').val();
                        var tsfo = res.find('input[name="tsfo"]').val();
                        var mmx = res.find('input[name="mmx"]').val();
                        var dwxReq = res.find('input[name="dwxReq"]').val();
                        var dwxOp = res.find('input[name="dwxOp"]').val();
                        var YOM_ASAKIM_MF = res.find('input[name="YOM_ASAKIM_MF"]').val();
                        var sugCredit = res.find('input[name="sugCredit"]').val();
                        var misparCredit = res.find('input[name="misparCredit"]').val();
                        poalimAsakimNew.varGlobal.ts = ts;
                        poalimAsakimNew.varGlobal.u = u;
                        poalimAsakimNew.varGlobal.dwx = dwx;
                        poalimAsakimNew.varGlobal.tcfo = tcfo;
                        poalimAsakimNew.varGlobal.qwrt = qwrt;
                        poalimAsakimNew.varGlobal.tsfo = tsfo;
                        poalimAsakimNew.varGlobal.mmx = mmx;
                        poalimAsakimNew.varGlobal.dwxReq = dwxReq;
                        poalimAsakimNew.varGlobal.dwxOp = dwxOp;
                        poalimAsakimNew.varGlobal.YOM_ASAKIM_MF = YOM_ASAKIM_MF;
                        poalimAsakimNew.varGlobal.sugCredit = sugCredit;
                        poalimAsakimNew.varGlobal.misparCredit = misparCredit;


                        var accDetalisArr = $(res).find('#allAcountsList option:selected script').text().split('new Acc(')[1].split(")")[0].split(",");
                        var snifNum = accDetalisArr[1].replace(/\D/g, "");
                        var accNum = accDetalisArr[2].replace(/\D/g, "");
                        var AccountNumber = parseInt(accNum);
                        var BranchNumber = parseInt(snifNum);

                        var rowsTable = res.find('#mytable_body tr.TR_ROW_BANKTABLE');
                        var len = rowsTable.length;
                        if (len) {
                            rowsTable.each(function (i, v) {
                                var v = $(v);
                                var CheckDescription = null,
                                    CheckTotal = null,
                                    CheckAccountNumber = null,
                                    CheckBranchNumber = null,
                                    CheckBankNumber = null,
                                    CheckNumber = null,
                                    DepositeDate = null,
                                    DueDate = null;

                                if ($(v).children('td').eq(0).length) {
                                    CheckDescription = $(v).children('td').eq(0).text();
                                }
                                if ($(v).children('td').eq(1).length) {
                                    CheckTotal = $(v).children('td').eq(1).text().replace(/,/g, '');
                                }
                                if ($(v).children('td').eq(2).length) {
                                    CheckAccountNumber = $(v).children('td').eq(2).text();
                                }
                                if ($(v).children('td').eq(3).length) {
                                    CheckBranchNumber = $(v).children('td').eq(3).text();
                                }
                                if ($(v).children('td').eq(4).length) {
                                    CheckBankNumber = $(v).children('td').eq(4).text();
                                }
                                if ($(v).children('td').eq(5).length) {
                                    CheckNumber = $(v).children('td').eq(5).text();
                                }
                                if ($(v).children('td').eq(6).length && $(v).children('td').eq(6).text() !== "") {
                                    var DepositeDateText = $(v).children('td').eq(6).text().split("/");
                                    DepositeDate = "20" + DepositeDateText[2].replace(/\D/g, "") + '' + DepositeDateText[1].replace(/\D/g, "") + '' + DepositeDateText[0].replace(/\D/g, "");
                                }
                                if ($(v).children('td').eq(8).length && $(v).children('td').eq(8).text() !== "") {
                                    var DueDateText = $(v).children('td').eq(8).text().split("/");
                                    DueDate = "20" + DueDateText[2].replace(/\D/g, "") + '' + DueDateText[1].replace(/\D/g, "") + '' + DueDateText[0].replace(/\D/g, "");
                                }
                                all.banks.generalVariables.allDataArrDueChecks.push({
                                    "BankNumber": 12,
                                    "TargetId": all.banks.generalVariables.AccountNumber,
                                    "Token": all.banks.generalVariables.branchNumber,
                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "BranchNumber": BranchNumber,
                                    "AccountNumber": AccountNumber,
                                    "CheckDescription": CheckDescription,
                                    "CheckTotal": CheckTotal,
                                    "CheckAccountNumber": CheckAccountNumber,
                                    "CheckBranchNumber": CheckBranchNumber,
                                    "CheckBankNumber": CheckBankNumber,
                                    "CheckNumber": CheckNumber,
                                    "DepositeDate": DepositeDate,
                                    "DueDate": DueDate
                                })

                                if (len == (i + 1)) {
                                    all.banks.accounts.poalimAsakimNew.sendDueChecksCtrl();
                                    res = null;
                                }
                            })
                        } else {
                            all.banks.accounts.poalimAsakimNew.sendDueChecksCtrl();
                            res = null;
                        }
                    } catch (e) {
                        all.banks.accounts.poalimAsakimNew.sendDueChecksCtrl();
                        res = null;
                    }
                }
            })
            .fail(function (error, resErr, urlParam) {
                all.banks.accounts.poalimAsakimNew.sendDueChecksCtrl();
            });
    }
    poalimAsakimNew.loadStandingOrders = function () {
        all.banks.generalVariables.allDataArrStandingOrders = [];
        var url = "https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?ctfw=auto&reqName=action&language=HE&transactionId=HoraotKevaAndDebitInst&subMenuName=DealsNew&ts=" + poalimAsakimNew.varGlobal.ts + "&tf=" + Math.random() + "&u=" + poalimAsakimNew.varGlobal.u + "&pSubMenu=DealsNew&fromSubMenu=Shekel&bxx=912&nsv=y&dwx=" + poalimAsakimNew.varGlobal.dwx + "&wScr=1920&hScr=1080&tcfo=" + poalimAsakimNew.varGlobal.tcfo + "&mmx=" + poalimAsakimNew.varGlobal.mmx + "&qwrt=" + poalimAsakimNew.varGlobal.qwrt + "&dtcdb=0&menuTranName=HoraotKevaAndDebitInst";
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (response, bbb, ccc) {
                var expires = ccc.getResponseHeader("X-FRAME-OPTIONS");
                if (expires == null) {

                    poalimAsakimNew.setNewTime(function () {
                        poalimAsakimNew.loadStandingOrders();
                    });
                } else {
                    //all.banks.core.services.sendLogs(type, text);
                    try {
                        var res = all.banks.core.services.parseHtml(response);

                        var ts = res.find('input[name="ts"]').val();
                        var u = res.find('input[name="u"]').val();
                        var dwx = res.find('input[name="dwx"]').val();
                        var tcfo = res.find('input[name="tcfo"]').val();
                        var qwrt = res.find('input[name="qwrt"]').val();
                        var tsfo = res.find('input[name="tsfo"]').val();
                        var mmx = res.find('input[name="mmx"]').val();
                        var dwxReq = res.find('input[name="dwxReq"]').val();
                        var dwxOp = res.find('input[name="dwxOp"]').val();
                        var YOM_ASAKIM_MF = res.find('input[name="YOM_ASAKIM_MF"]').val();
                        var sugCredit = res.find('input[name="sugCredit"]').val();
                        var misparCredit = res.find('input[name="misparCredit"]').val();
                        poalimAsakimNew.varGlobal.ts = ts;
                        poalimAsakimNew.varGlobal.u = u;
                        poalimAsakimNew.varGlobal.dwx = dwx;
                        poalimAsakimNew.varGlobal.tcfo = tcfo;
                        poalimAsakimNew.varGlobal.qwrt = qwrt;
                        poalimAsakimNew.varGlobal.tsfo = tsfo;
                        poalimAsakimNew.varGlobal.mmx = mmx;
                        poalimAsakimNew.varGlobal.dwxReq = dwxReq;
                        poalimAsakimNew.varGlobal.dwxOp = dwxOp;
                        poalimAsakimNew.varGlobal.YOM_ASAKIM_MF = YOM_ASAKIM_MF;
                        poalimAsakimNew.varGlobal.sugCredit = sugCredit;
                        poalimAsakimNew.varGlobal.misparCredit = misparCredit;


                        var accDetalisArr = $(res).find('#allAcountsList option:selected script').text().split('new Acc(')[1].split(")")[0].split(",");
                        var snifNum = accDetalisArr[1].replace(/\D/g, "");
                        var accNum = accDetalisArr[2].replace(/\D/g, "");
                        var AccountNumber = parseInt(accNum);
                        var BranchNumber = parseInt(snifNum);

                        function reverse(s) {
                            return s.split("").reverse().join("");
                        }

                        var rowsTable = res.find('#tbodyPaymentRights tr.TR_ROW_BANKTABLE');
                        var len = rowsTable.length;
                        if (len) {
                            rowsTable.each(function (i, v) {
                                var v = $(v);
                                var OrderName = null,
                                    OrderOpeningDate = null,
                                    OrderLastDate = null,
                                    OrderTotal = null,
                                    OrderNumber = null,
                                    Asmachta = null;

                                if ($(v).children('td').eq(5).length && $(v).children('td').eq(5).text().replace(/\s/g, "") !== "") {
                                    OrderName = reverse($(v).children('td').eq(5).text());
                                }
                                if ($(v).children('td').eq(2).length && $(v).children('td').eq(2).text().replace(/\s/g, "") !== "") {
                                    var OrderLastDateVal = $(v).children('td').eq(2).text().split("/");
                                    OrderLastDate = OrderLastDateVal[2].replace(/\D/g, "") + '' + OrderLastDateVal[1].replace(/\D/g, "") + '' + OrderLastDateVal[0].replace(/\D/g, "");
                                }
                                var rowNext = $(v).next().find("#WHITE_BANKTABLE tbody tr").eq(1).find("td");
                                if (rowNext.length) {
                                    var OrderOpeningDateVal = rowNext.eq(0).text().split("/");
                                    OrderOpeningDate = OrderOpeningDateVal[2].replace(/\D/g, "") + '' + OrderOpeningDateVal[1].replace(/\D/g, "") + '' + OrderOpeningDateVal[0].replace(/\D/g, "");
                                    if (rowNext.length == 2) {
                                        OrderNumber = rowNext.eq(1).text().replace(/\D/g, "");
                                    }
                                    if (rowNext.length == 3) {
                                        OrderNumber = rowNext.eq(2).text().replace(/\D/g, "");
                                    }
                                }
                                if ($(v).children('td').eq(1).length && $(v).children('td').eq(1).text().replace(/\s/g, "") !== "") {
                                    OrderTotal = poalimAsakimNew.returnClearSum($(v).children("td").eq(1).text());
                                }
                                all.banks.generalVariables.allDataArrStandingOrders.push({
                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                    "Token": all.banks.accountDetails.bank.token,
                                    "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "AccountNumber": AccountNumber,
                                    "BranchNumber": BranchNumber,
                                    "OrderName": OrderName,
                                    "OrderOpeningDate": OrderOpeningDate,
                                    "OrderLastDate": OrderLastDate,
                                    "OrderTotal": OrderTotal,
                                    "OrderNumber": OrderNumber,
                                    "Asmachta": null,
                                    BankTransferNumber: null,
                                    BranchTransferNumber: null,
                                    AccountTransferNumber: null,
                                    NamePayerTransfer: null,
                                    Type: 2,
                                });
                                if (len == (i + 1)) {
                                    //loadHoraotKeva();
                                    all.banks.accounts.poalimAsakimNew.sendStandingOrdersCtrl();
                                    res = null;
                                }
                            })
                        } else {
                            //loadHoraotKeva();
                            all.banks.accounts.poalimAsakimNew.sendStandingOrdersCtrl();
                            res = null;
                        }

                        function loadHoraotKeva() {
                            var rowsTableHoraotKeva = res.find('#tbodyHoraotKeva tr.TR_ROW_BANKTABLE');
                            var leng = rowsTableHoraotKeva.length;
                            if (leng) {
                                rowsTableHoraotKeva.each(function (i, v) {
                                    var v = $(v);
                                    var OrderName = null,
                                        OrderOpeningDate = null,
                                        OrderLastDate = null,
                                        OrderTotal = null,
                                        OrderNumber = null,
                                        Asmachta = null;

                                    if ($(v).children('td').eq(8).length) {
                                        OrderName = reverse($(v).children('td').eq(8).text());
                                    }

                                    if ($(v).children('td').eq(1).length) {
                                        OrderTotal = poalimAsakimNew.returnClearSum($(v).children("td").eq(1).text())
                                    }
                                    if ($(v).children('td').eq(9).length) {
                                        OrderNumber = $(v).children('td').eq(9).text();
                                    }
                                    if ($(v).children('td').eq(4).length && $(v).children('td').eq(4).text().replace(/\s/g, "") !== "") {
                                        Asmachta = $(v).children('td').eq(4).text();
                                    }
                                    all.banks.generalVariables.allDataArrStandingOrders.push({
                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                        "Token": all.banks.accountDetails.bank.token,
                                        "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "AccountNumber": AccountNumber,
                                        "BranchNumber": BranchNumber,
                                        "OrderName": OrderName,
                                        "OrderOpeningDate": OrderOpeningDate,
                                        "OrderLastDate": OrderLastDate,
                                        "OrderTotal": OrderTotal,
                                        "OrderNumber": OrderNumber,
                                        "Asmachta": Asmachta,
                                        BankTransferNumber: null,
                                        BranchTransferNumber: null,
                                        AccountTransferNumber: null,
                                        NamePayerTransfer: null,
                                        Type: 2,
                                    });
                                    if (leng == (i + 1)) {
                                        all.banks.accounts.poalimAsakimNew.sendStandingOrdersCtrl();
                                        res = null;
                                    }
                                })
                            } else {
                                all.banks.accounts.poalimAsakimNew.sendStandingOrdersCtrl();
                                res = null;
                            }
                        }
                    } catch (err) {
                        all.banks.accounts.poalimAsakimNew.sendStandingOrdersCtrl();
                        res = null;
                    }
                }
            })
            .fail(function (error, resErr, urlParam) {
                all.banks.accounts.poalimAsakimNew.sendStandingOrdersCtrl();
            });
    }

    poalimAsakimNew.reverseComment = function (comment) {
        if (comment == undefined) {
            return "";
        }
        var textCom = comment.split(" ");
        var text = [];
        textCom.forEach(function (val) {
            if (val.match(/\D/g) !== null && val.match(/[\u0590-\u05FF]/g) !== null) {
                text.unshift(val.split("").reverse().join(""));
            } else {
                text.push(val);
            }
        });
        return text.join(" ");
    };
    poalimAsakimNew.loadMatah = function () {
        all.banks.generalVariables.allDataArr = {
            "ExporterId": all.banks.spiderConfig.spiderId,
            "BankData": [{
                "TargetId": all.banks.spiderConfig.spiderId,
                "Token": all.banks.generalVariables.branchNumber,
                "BankNumber": all.banks.accountDetails.bank.BankNumber,
                "ExtractDate": all.banks.accountDetails.bank.ExtractDate,
                "Account": []
            }]
        };
        var url = "https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?ctfw=auto&reqName=action&language=HE&transactionId=ItrotMatach&subMenuName=ForeinCurrency&ts=" + poalimAsakimNew.varGlobal.ts + "&tf=" + Math.random() + "&u=" + poalimAsakimNew.varGlobal.u + "&pSubMenu=Shekel&fromSubMenu=ForeinCurrency&bxx=912&nsv=y&dwx=" + poalimAsakimNew.varGlobal.dwx + "&wScr=1920&hScr=1080&tcfo=" + poalimAsakimNew.varGlobal.tcfo + "&mmx=" + poalimAsakimNew.varGlobal.mmx + "&qwrt=" + poalimAsakimNew.varGlobal.qwrt + "&dtcdb=0&menuTranName=ItrotMatach";
        all.banks.core.services.httpReq(url, 'GET', null, false, false)
            .then(function (data, bbb, ccc) {
                var expires = ccc.getResponseHeader("X-FRAME-OPTIONS");
                if (expires == null) {

                    poalimAsakimNew.setNewTime(function () {
                        poalimAsakimNew.loadMatah();
                    });
                } else {
                    try {
                        var data = all.banks.core.services.parseHtml(data);
                        var ts = data.find('input[name="ts"]').val();
                        var u = data.find('input[name="u"]').val();
                        var dwx = data.find('input[name="dwx"]').val();
                        var tcfo = data.find('input[name="tcfo"]').val();
                        var qwrt = data.find('input[name="qwrt"]').val();
                        var tsfo = data.find('input[name="tsfo"]').val();
                        var mmx = data.find('input[name="mmx"]').val();
                        var dwxReq = data.find('input[name="dwxReq"]').val();
                        var dwxOp = data.find('input[name="dwxOp"]').val();
                        var YOM_ASAKIM_MF = data.find('input[name="YOM_ASAKIM_MF"]').val();
                        poalimAsakimNew.varGlobal.ts = ts;
                        poalimAsakimNew.varGlobal.u = u;
                        poalimAsakimNew.varGlobal.dwx = dwx;
                        poalimAsakimNew.varGlobal.tcfo = tcfo;
                        poalimAsakimNew.varGlobal.qwrt = qwrt;
                        poalimAsakimNew.varGlobal.tsfo = tsfo;
                        poalimAsakimNew.varGlobal.mmx = mmx;
                        poalimAsakimNew.varGlobal.dwxReq = dwxReq;
                        poalimAsakimNew.varGlobal.dwxOp = dwxOp;
                        poalimAsakimNew.varGlobal.YOM_ASAKIM_MF = YOM_ASAKIM_MF;
                        var req = {
                            'input_fromAgg': $(data).find('input[name="input_fromAgg"]').val(),
                            'reqName': $(data).find('input[name="reqName"]').val(),
                            'transactionId': "MatachTran",
                            'menuParam': $(data).find('input[name="menuParam"]').val(),
                            'PGcode': $(data).find('input[name="PGcode"]').val(),
                            'step': $(data).find('input[name="step"]').val(),
                            'u': poalimAsakimNew.varGlobal.u,
                            'tcfo': poalimAsakimNew.varGlobal.tcfo,
                            'tsfo': poalimAsakimNew.varGlobal.tsfo,
                            'mmx': poalimAsakimNew.varGlobal.mmx,
                            "fromSubMenu": "ForeinCurrency",
                            'qwrt': poalimAsakimNew.varGlobal.qwrt,
                            'mpux': "",
                            'targetView': "",
                            'dwx': poalimAsakimNew.varGlobal.dwx,
                            'dwxReq': poalimAsakimNew.varGlobal.dwxReq,
                            'dwxOp': poalimAsakimNew.varGlobal.dwxOp,
                            'doc_key': $(data).find('input[name="doc_key"]').val(),
                            'callerTid': $(data).find('input[name="callerTid"]').val(),
                            'WTcomeFrom': $(data).find('input[name="WTcomeFrom"]').val(),
                            'YOM_ASAKIM_MF': poalimAsakimNew.varGlobal.YOM_ASAKIM_MF,
                            'accountIndex': all.banks.accounts.poalimAsakimNew.indDDAll(all.banks.accounts.poalimAsakimNew.vddVal.BANK_SNIF_ACCOUNT_KEY),
                            'txtToDate': all.banks.accounts.poalimAsakimNew.vddVal.datebacksleshToMatah,
                            'txtFromDate': all.banks.accounts.poalimAsakimNew.vddVal.datebacksleshMatah,
                            'changeDates': 'yes',
                            'dontClearTrInfo': 'yes',
                            'currencySelected': '9999',
                            'actionSelected': '9999',
                            'SelectSugCurrency': '9999',
                            'SelectSugAction': '9999'
                        };
                        all.banks.core.services.httpReq("https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc", 'POST', req, true, false)
                            .then(function (res, bbb, ccc) {
                                var expires = ccc.getResponseHeader("X-FRAME-OPTIONS");
                                if (expires == null) {

                                    poalimAsakimNew.setNewTime(function () {
                                        poalimAsakimNew.loadMatah();
                                    });
                                } else {
                                    var res = all.banks.core.services.parseHtml(res);
                                    var ts = res.find('input[name="ts"]').val();
                                    var u = res.find('input[name="u"]').val();
                                    var dwx = res.find('input[name="dwx"]').val();
                                    var tcfo = res.find('input[name="tcfo"]').val();
                                    var qwrt = res.find('input[name="qwrt"]').val();
                                    var tsfo = res.find('input[name="tsfo"]').val();
                                    var mmx = res.find('input[name="mmx"]').val();
                                    var dwxReq = res.find('input[name="dwxReq"]').val();
                                    var dwxOp = res.find('input[name="dwxOp"]').val();
                                    var YOM_ASAKIM_MF = res.find('input[name="YOM_ASAKIM_MF"]').val();
                                    poalimAsakimNew.varGlobal.ts = ts;
                                    poalimAsakimNew.varGlobal.u = u;
                                    poalimAsakimNew.varGlobal.dwx = dwx;
                                    poalimAsakimNew.varGlobal.tcfo = tcfo;
                                    poalimAsakimNew.varGlobal.qwrt = qwrt;
                                    poalimAsakimNew.varGlobal.tsfo = tsfo;
                                    poalimAsakimNew.varGlobal.mmx = mmx;
                                    poalimAsakimNew.varGlobal.dwxReq = dwxReq;
                                    poalimAsakimNew.varGlobal.dwxOp = dwxOp;
                                    poalimAsakimNew.varGlobal.YOM_ASAKIM_MF = YOM_ASAKIM_MF;
                                    var url = "https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?ctfw=auto&reqName=action&language=HE&transactionId=ItrotMatach&subMenuName=ForeinCurrency&ts=" + poalimAsakimNew.varGlobal.ts + "&tf=" + Math.random() + "&u=" + poalimAsakimNew.varGlobal.u + "&pSubMenu=Shekel&fromSubMenu=ForeinCurrency&bxx=912&nsv=y&dwx=" + poalimAsakimNew.varGlobal.dwx + "&wScr=1920&hScr=1080&tcfo=" + poalimAsakimNew.varGlobal.tcfo + "&mmx=" + poalimAsakimNew.varGlobal.mmx + "&qwrt=" + poalimAsakimNew.varGlobal.qwrt + "&dtcdb=0&menuTranName=ItrotMatach";
                                    all.banks.core.services.httpReq(url, 'GET', null, false, false)
                                        .then(function (data, bbb, ccc) {
                                            var expires = ccc.getResponseHeader("X-FRAME-OPTIONS");
                                            if (expires == null) {

                                                poalimAsakimNew.setNewTime(function () {
                                                    poalimAsakimNew.loadMatah();
                                                });
                                            } else {
                                                var data = all.banks.core.services.parseHtml(data);
                                                var ts = data.find('input[name="ts"]').val();
                                                var u = data.find('input[name="u"]').val();
                                                var dwx = data.find('input[name="dwx"]').val();
                                                var tcfo = data.find('input[name="tcfo"]').val();
                                                var qwrt = data.find('input[name="qwrt"]').val();
                                                var tsfo = data.find('input[name="tsfo"]').val();
                                                var mmx = data.find('input[name="mmx"]').val();
                                                var dwxReq = data.find('input[name="dwxReq"]').val();
                                                var dwxOp = data.find('input[name="dwxOp"]').val();
                                                var YOM_ASAKIM_MF = data.find('input[name="YOM_ASAKIM_MF"]').val();

                                                poalimAsakimNew.varGlobal.ts = ts;
                                                poalimAsakimNew.varGlobal.u = u;
                                                poalimAsakimNew.varGlobal.dwx = dwx;
                                                poalimAsakimNew.varGlobal.tcfo = tcfo;
                                                poalimAsakimNew.varGlobal.qwrt = qwrt;
                                                poalimAsakimNew.varGlobal.tsfo = tsfo;
                                                poalimAsakimNew.varGlobal.mmx = mmx;
                                                poalimAsakimNew.varGlobal.dwxReq = dwxReq;
                                                poalimAsakimNew.varGlobal.dwxOp = dwxOp;
                                                poalimAsakimNew.varGlobal.YOM_ASAKIM_MF = YOM_ASAKIM_MF;
                                                var rowsTypes = data.find("#someDataDivPrint #tableToggleRow tr.TR_ROW_BANKTABLE");
                                                if (rowsTypes.length) {

                                                    var accDetalisArr = res.find('#allAcountsList option:selected script').text().split('new Acc(')[1].split(")")[0].split(",");
                                                    var snifNum = accDetalisArr[1].replace(/\D/g, "");
                                                    var accNum = accDetalisArr[2].replace(/\D/g, "");
                                                    var AccountNumber = parseInt(accNum);
                                                    var BranchNumber = parseInt(snifNum);

                                                    $(rowsTypes).each(function (ind, val) {
                                                        var tr = $(val);
                                                        if (tr.attr("style") == undefined && tr.attr("name") == undefined) {
                                                            var rowTextTitle = poalimAsakimNew.reverseComment(tr.children("td").eq(5).text()).replace(/\s+/g, " ");
                                                            var acc = {
                                                                'BankNumber': 12,
                                                                'AccountNumber': AccountNumber,
                                                                'BranchNumber': BranchNumber,
                                                                'Balance': poalimAsakimNew.returnClearSum(tr.children("td").eq(2).text()),//0,
                                                                'AccountCredit': null,
                                                                "BankAccountTypeId": tr.children("td").eq(6).text().replace(/\D/g, ""),
                                                                "CurrencyId": all.banks.core.services.getTypeCurrencyAll(rowTextTitle, true)
                                                            };
                                                            all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                                                            all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.generalVariables.allDataArr.BankData[0].Account.length - 1].DataRow = [];
                                                        }
                                                        if (ind + 1 == rowsTypes.length) {
                                                            getRowsmatah(res);
                                                        }
                                                    });
                                                } else {
                                                    getRowsmatah(res);
                                                }
                                            }
                                        })
                                        .fail(function (error, resErr) {
                                            getRowsmatah(res);
                                        });

                                    function getRowsmatah(res) {
                                        function reverse(s) {
                                            return s.split("").reverse().join("");
                                        }

                                        var accDetalisArr = res.find('#allAcountsList option:selected script').text().split('new Acc(')[1].split(")")[0].split(",");
                                        var snifNum = accDetalisArr[1].replace(/\D/g, "");
                                        var accNum = accDetalisArr[2].replace(/\D/g, "");
                                        var AccountNumber = parseInt(accNum);
                                        var BranchNumber = parseInt(snifNum);

                                        var rowsOfTable = res.find("#someDataDivPrint").children("table.arial12NoBold").find('algoritem[takepartfromcash="TITLE_HEB"]').next().find("tr");
                                        if (rowsOfTable.length) {
                                            var title = {};
                                            var accToAddTo = undefined;
                                            rowsOfTable.each(function (i, v) {
                                                try {
                                                    var val = $(v);
                                                    if (val.hasClass("TR_TOTAL") && !val.find("today_msg").length) {
                                                        title.isDaily = 0;
                                                        var paramSplit = val.text().split(":");
                                                        if (paramSplit.length == 3) {
                                                            var idxParam = 2;
                                                        } else if (paramSplit.length == 2) {
                                                            var idxParam = 1;
                                                        }
                                                        var rowTextTitle = poalimAsakimNew.reverseComment(paramSplit[idxParam]).replace(/\s+/g, " ");
                                                        title.bankaccounttypeId = rowTextTitle.replace(/\D/g, "");
                                                        title.currencyid = all.banks.core.services.getTypeCurrencyAll(rowTextTitle, true);

                                                        accToAddTo = all.banks.generalVariables.allDataArr.BankData[0].Account
                                                            .find(function (prevCreatedAcc) {
                                                                return prevCreatedAcc.BankAccountTypeId === title.bankaccounttypeId
                                                                    && prevCreatedAcc.CurrencyId === title.currencyid
                                                                    && prevCreatedAcc.AccountNumber === AccountNumber;
                                                            });
                                                        if (!accToAddTo) {
                                                            var acc = {
                                                                'BankNumber': 12,
                                                                'AccountNumber': AccountNumber,
                                                                'BranchNumber': BranchNumber,
                                                                'Balance': 0,
                                                                'AccountCredit': null,
                                                                "BankAccountTypeId": title.bankaccounttypeId,
                                                                "CurrencyId": title.currencyid,
                                                                "DataRow": []
                                                            };
                                                            all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
//                                                                                                    all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.generalVariables.allDataArr.BankData[0].Account.length - 1].DataRow = [];
                                                            accToAddTo = acc;
                                                        }
                                                    }
                                                    if (val.hasClass("TR_TOTAL") && val.find("today_msg").length) {
                                                        title.isDaily = 1;
                                                    }
                                                    if (val.hasClass("TR_ROW_BANKTABLE") && val.attr("name") == undefined) {
                                                        var tdTextDesc = val.children("td").eq(6).find("table tr td");
                                                        var transDesc = poalimAsakimNew.reverseComment(tdTextDesc.eq(0).text()) + " " + tdTextDesc.eq(2).text();
                                                        var desc = val.children("td").eq(0).text();
                                                        if (desc.replace(/\s+/g, "") !== "") {
                                                            transDesc += " " + poalimAsakimNew.reverseComment(desc.replace(/\s+/g, " "));
                                                        }
                                                        var valueDate = val.children("td").eq(7).text();
                                                        var sum = null;
                                                        var sumZehut = val.children("td").eq(3).text().replace(/\s/g, "");
                                                        var sumHova = val.children("td").eq(4).text().replace(/\s/g, "");
                                                        var transactionType = null;
                                                        if (sumZehut == '') {
                                                            sum = poalimAsakimNew.returnClearSum(sumHova);
                                                            transactionType = '0';
                                                        } else {
                                                            sum = poalimAsakimNew.returnClearSum(sumZehut);
                                                            transactionType = '1';
                                                        }
                                                        var balance = poalimAsakimNew.returnClearSum(val.children("td").eq(2).text());
                                                        var asmachta = val.children("td").eq(1).text().replace(/\s/g, "");

                                                        var dataRows = accToAddTo ? accToAddTo.DataRow
                                                            : all.banks.generalVariables.allDataArr.BankData[0].Account[all.banks.generalVariables.allDataArr.BankData[0].Account.length - 1].DataRow;
                                                        dataRows.push({
                                                            "Asmachta": asmachta.replace(/\D/g, ""),
                                                            "TransDesc": transDesc.replace(/\s/g, " ").trim(),
                                                            "ValueDate": valueDate.split("/")[0] + "/" + valueDate.split("/")[1] + "/20" + valueDate.split("/")[2],
                                                            "TransactionType": transactionType,
                                                            "TransTotal": poalimAsakimNew.returnClearSum(sum),
                                                            "Balance": balance,
                                                            "IsDaily": title.isDaily,
                                                            "imgs": null
                                                        });
                                                    }
                                                } catch (e) {
                                                    writeLog('Failed to process matah row: ' + e);
                                                }
                                                if (i + 1 == rowsOfTable.length) {
                                                    all.banks.accounts.poalimAsakimNew.sendMatahCtrl();
                                                    res = null;
                                                    rowsOfTable = null;
                                                }
                                            })
                                        } else {
                                            all.banks.accounts.poalimAsakimNew.sendMatahCtrl();
                                            res = null;
                                            rowsOfTable = null;
                                        }
                                    }
                                }
                            })
                            .fail(function (error, resErr) {
                                all.banks.accounts.poalimAsakimNew.sendMatahCtrl();
                            })
                    } catch (e) {
                        all.banks.accounts.poalimAsakimNew.sendMatahCtrl();
                    }
                }

            })
            .fail(function (error, resErr) {
                all.banks.accounts.poalimAsakimNew.sendMatahCtrl();
            })
    }
    poalimAsakimNew.loadMatahNew = async function () {
        all.banks.generalVariables.allDataArr = {
            "ExporterId": all.banks.spiderConfig.spiderId,
            "BankData": [{
                "TargetId": all.banks.spiderConfig.spiderId,
                "Token": all.banks.generalVariables.branchNumber,
                "BankNumber": 12,
                "ExtractDate": all.banks.accountDetails.bank.ExtractDate,
                "Account": []
            }]
        };
        var accDetalis = all.banks.accounts.poalimAsakimNew.vddVal.BANK_SNIF_ACCOUNT_KEY;
        var arrAcc = accDetalis.split('-');

        try {
            var urlXhr = "https://biz2.bankhapoalim.co.il/ServerServices/foreign-currency/transactions?accountId=12-" + arrAcc[1] + '-' + arrAcc[0]
                + "&type=business&lang=he";
            const data = await all.banks.core.services.httpReq(urlXhr, 'GET', null, false, false);
//                            .then(poalimAsakimNew.failIfRedirectedToError);

            if (data && data.messageCode == undefined && data.balancesAndLimitsDataList !== undefined && data.balancesAndLimitsDataList.length && data.currencyCode && data.currencyCode.values && data.currencyCode.values.length) {
                const currencyCodeList = data.currencyCode.values.map(it => it.currencyCode).join(',');
                const detailedAccountTypeCodeList = data.detailedAccountTypeCode.values.map(it => it.detailedAccountTypeCode).join(',');

                var urls = "https://biz2.bankhapoalim.co.il/ServerServices/foreign-currency/transactions?accountId=12-" + arrAcc[1] + '-' + arrAcc[0]
                    + "&currencyCodeList=" + currencyCodeList + "&detailedAccountTypeCodeList=" + detailedAccountTypeCodeList
                    + "&retrievalEndDate=" + all.banks.accounts.poalimAsakimNew.vddVal.datebacksleshToMatah
                    + "&retrievalStartDate=" + all.banks.accounts.poalimAsakimNew.vddVal.datebacksleshMatah
                    + "&view=details&type=business&lang=he";
                try {
                    const res = await all.banks.core.services.httpReq(urls, 'GET', null, false, false);
//                                        .then(poalimAsakimNew.failIfRedirectedToError);

                    if (res && res.balancesAndLimitsDataList) {
                        for (let indx = 0; indx < res.balancesAndLimitsDataList.length; indx++) {
                            let va = res.balancesAndLimitsDataList[indx];
                            let currentBalance = data.balancesAndLimitsDataList.find(accIt => accIt.currencyCode === va.currencyCode);
                            if (currentBalance) {
                                currentBalance = currentBalance.currentBalance
                            } else {
                                currentBalance = null;
                            }
                            all.banks.generalVariables.allDataArr.BankData[0].Account.push({
                                'BankNumber': 12,
                                "BranchNumber": parseInt(arrAcc[1]),
                                "AccountNumber": parseInt(arrAcc[0]),
                                'Balance': currentBalance,
                                'AccountCredit': null,
                                "BankAccountTypeId": va.detailedAccountTypeCode,
                                "CurrencyId": all.banks.core.services.getTypeCurrencyAll(va.currencySwiftCode, true),
                                "DataRow": []
                            });
                            if (!va.transactions || !va.transactions.length) {
                                continue;
                            }

                            for (let trIdx = 0; trIdx < va.transactions.length; trIdx++) {
                                await processTransaction(va.transactions[trIdx]);
                            }
                        }
                    }

                } catch (e) {
                    writeLog('Foreign transactions processing failed for ' + arrAcc[1] + '-' + arrAcc[0]
                        + '(' + acc.currencyCode + ', ' + acc.detailedAccountTypeCode + '): ' + e);
                }


                async function processTransaction(v1) {
                    const row = {
                        "Asmachta": poalimAsakimNew.retrieveAsmachta(v1), // v1.referenceNumber,
                        "TransDesc": v1.activityDescription + (v1.comment ? (' ' + v1.comment) : ''),
                        "ValueDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(v1.executingDate)),
                        "TransactionType": (v1.eventActivityTypeCode === 1) ? "1" : "0",
                        "TransTotal": v1.eventAmount,
                        "Balance": v1.currentBalance,
                        "IsDaily": (v1.transactionType === "TODAY") ? "1" : "0",
                        "imgs": null,
                        "DepositeTransferData": null
                    };
                    acc["DataRow"].push(row);

                    if (v1.eventDetails) {
                        if (v1.originalSystemId === 390) {
                            // TEMPORARILY disable such requests as they guaranteed to fail
                            return;

                            try {
                                const resp = await all.banks.core.services.httpReq(
                                    "https://biz2.bankhapoalim.co.il/ServerServices/capital-market/securities/" + v1.eventDetails
                                    + "?accountId=12-" + arrAcc[1] + '-' + arrAcc[0] + "&view=quote&lang=he",
                                    'GET', null, false, false);
                                if (resp && resp.securityQuoteData) {
                                    row["TransDesc"] = row["TransDesc"] + " " + resp.securityQuoteData.securityName;
                                }
                            } catch (e) {
                                writeLog(`Transaction ${v1.referenceNumber} details load failed`);
                            }

                        } else {
                            row["TransDesc"] = row["TransDesc"] + " " + v1.eventDetails;
                        }
                    }
                }
            }

            all.banks.accounts.poalimAsakimNew.sendMatahCtrl();

        } catch (exc) {
            // all.banks.core.services.errorLog(exc);
            writeLog('Foreign transactions processing failed for ' + arrAcc[1] + '-' + arrAcc[0] + exc);
        }

    }
    poalimAsakimNew.logOut = function () {
        var urls = "https://" + poalimAsakimNew.newAccPath + ".bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=Logoff&language=HE&logOffParam=999&u=i&pSubMenu=Shekel&fromSubMenu=Shekel&bxx=912&nsv=y&dwx=" + poalimAsakimNew.varGlobal.dwx + "&wScr=1920&hScr=1080&tcfo=" + poalimAsakimNew.varGlobal.tcfo + "&mmx=" + poalimAsakimNew.varGlobal.mmx + "&qwrt=" + poalimAsakimNew.varGlobal.qwrt + "&dtcdb=0&menuTranName=HomePagePoalim";
        all.banks.core.services.httpReq(urls, 'GET', null, false, false)
            .then(function (res) {
                var $$ = all.banks.core.services.parseHtml(res);
                // if ($$.text().indexOf('טנרטניאה תכרעמל תשדוחמ הסינכ') !== -1) {
                // 	debugger
                // 	all.banks.accounts.poalimAsakimNew.logOut();
                // }
                all.banks.core.services.httpReq("https://www.bankhapoalim.biz/", 'GET', null, false, false);
                try {
                    $('#filecontainerlogin').attr('src', '')
                    myEmitterLogs(4);
                } catch (err) {
                    $('#filecontainerlogin').attr('src', '')
                    myEmitterLogs(4);
                }
            })
            .fail(function (error, resErr, urlParam) {
                $('#filecontainerlogin').attr('src', '');
                myEmitterLogs(4);
            });
    };
    poalimAsakimNew.logOutNew = function () {
        all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=preLogoff&lang=he", 'GET', null, false, false)
            .then(function (res) {
                all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=Logoff&id=0", 'GET', null, false, false)
                    .then(function (res) {
                        $('#filecontainerlogin').attr('src', '');
                        clearProxy().then(() => {
                            myEmitterLogs(4);
                        });
                    })
                    .fail(function (error, resErr, urlParam) {
                        $('#filecontainerlogin').attr('src', '');
                        clearProxy().then(() => {
                            myEmitterLogs(4);
                        });
                    });
            })
            .fail(function (error, resErr, urlParam) {
                $('#filecontainerlogin').attr('src', '');
                clearProxy().then(() => {
                    myEmitterLogs(4);
                });
            });
//		all.banks.core.services.httpReq("https://biz2.bankhapoalim.co.il/biz-portalserver/logoff?portalName=biz", 'GET', null, false, false)
//		.then(function (res) {
//			$('#filecontainerlogin').attr('src', '');
//			myEmitterLogs(4);
//		})
//		.fail(function (error, resErr, urlParam) {
//			$('#filecontainerlogin').attr('src', '');
//			myEmitterLogs(4);
//		});
    };
    poalimAsakimNew.reportAccountNotAvailableAndProceed = function () {
        if (poalimAsakimNew.lastFailedAccNum !== poalimAsakimNew.accNum && !poalimAsakimNew.haltAndWaitForReload) {
            writeLog('Failed to start account ' + all.banks.accountDetails.bank.arrDDAll[all.banks.accounts.poalimAsakimNew.accNum].BANK_SNIF_ACCOUNT_KEY + ". Will retry...");
            poalimAsakimNew.lastFailedAccNum = poalimAsakimNew.accNum;
            setTimeout(function () {
                writeLog('Retrying account ' + all.banks.accountDetails.bank.arrDDAll[all.banks.accounts.poalimAsakimNew.accNum].BANK_SNIF_ACCOUNT_KEY + "...");
                all.banks.accounts.poalimAsakimNew.loadOsh();
            }, 3000);
        } else {
            const vdd = all.banks.accountDetails.bank.arrDDAll[poalimAsakimNew.accNum];
            myEmitterLogs(37, vdd.BANK_SNIF_ACCOUNT_KEY);

            if (poalimAsakimNew.haltAndWaitForReload) {
                return;
            }

            if (all.banks.accountDetails.bank.arrDDAll.length > 1 && (all.banks.accounts.poalimAsakimNew.accNum + 1 < all.banks.accountDetails.bank.arrDDAll.length)) {
                all.banks.accounts.poalimAsakimNew.accNum = all.banks.accounts.poalimAsakimNew.accNum + 1;
                all.banks.accounts.poalimAsakimNew.loadOsh();
            } else {
                if (!poalimAsakimNew.newAcc) {
                    all.banks.accounts.poalimAsakimNew.logOut();
                } else {
                    all.banks.accounts.poalimAsakimNew.logOutNew();
                }
            }
        }

    };

    poalimAsakimNew.loadOshTransactionsNew = function (v) {
        let allRowsFtched = false;
        let lastResult = null;
        all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow = [];
        myEmitterLogs(11); // get data

        loopPortions();

        function loopPortions() {
            const paramsa = {
                url: "https://biz2.bankhapoalim.co.il/ServerServices/current-account/transactions"
                    + (poalimAsakimNew.last_data_headerVal ? ("/" + poalimAsakimNew.last_data_headerVal) : "")
                    + "?accountId=" + v.bankNumber + "-" + v.branchNumber + "-" + v.accountNumber
                    + "&numItemsPerPage=999999&sortCode=2&lang=he"
                    + "&retrievalEndDate=" + all.banks.accounts.poalimAsakimNew.vddVal.datebacksleshTo
                    + "&retrievalStartDate=" + all.banks.accounts.poalimAsakimNew.vddVal.datebackslesh,
                xhrFields: {
                    withCredentials: true
                },
                method: "POST",
                type: "POST",
                data: JSON.stringify([]),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                beforeSend: function (xhr) {
                    if (poalimAsakimNew.xsrfToken) {
                        xhr.setRequestHeader('X-XSRF-TOKEN', all.banks.accounts.poalimAsakimNew.xsrfToken);
                    }
                    if (lastResult !== null && poalimAsakimNew.last_data_headerVal) {
                        xhr.setRequestHeader('data-header', poalimAsakimNew.last_data_headerVal);
                    }
                    if (lastResult !== null && poalimAsakimNew.integrity_header) {
                        xhr.setRequestHeader('integrity-header', poalimAsakimNew.integrity_header);
                    }
                }
            };
            $.ajax(paramsa)
                .done(function (data, res1, res2) {
                    const last_data_headerVal = res2.getResponseHeader('data-header');
                    allRowsFtched = !last_data_headerVal;
                    if (!allRowsFtched) {
                        poalimAsakimNew.last_data_headerVal = last_data_headerVal;
                        poalimAsakimNew.integrity_header = res2.getResponseHeader('integrity-header');
                    }

                    if (lastResult && lastResult.retrievalTransactionData
                        && data && data.retrievalTransactionData
                        && (lastResult.retrievalTransactionData.branchNumber !== data.retrievalTransactionData.branchNumber
                            || lastResult.retrievalTransactionData.accountNumber !== data.retrievalTransactionData.accountNumber)
                    ) {
                        writeLog('Something went wrong!\n'
                            + ' Got ' + JSON.stringify(data.retrievalTransactionData)
                            + ' AFTER ' + JSON.stringify(lastResult.retrievalTransactionData)
                            + '\nWill NOT process those transactions.');
                        allRowsFtched = true;
                        nextPortionOrComplete();
                        return;
                    }

                    lastResult = data;
                    doPortion();
                })
                .fail(function (error, resErr, urlParam) {
                    allRowsFtched = true;
                    nextPortionOrComplete();
                });

            function doPortion() {
                if (!lastResult || !lastResult.transactions || lastResult.transactions.length === 0) {
                    nextPortionOrComplete();
                    return;
                }

                // In case of closed account we won't get its balance in accDeta, then we take its last transaction balance value from last portion
                if (all.banks.generalVariables.allDataArr.BankData[0].Account[0].Balance === null && allRowsFtched) {
                    all.banks.generalVariables.allDataArr.BankData[0].Account[0].Balance = lastResult.transactions[lastResult.transactions.length - 1].currentBalance;
                }

                let idxToProcess = 0;
                loopPeulot();

                function moveOn() {
                    if (idxToProcess < lastResult.transactions.length) {
                        loopPeulot();
                    } else {
                        nextPortionOrComplete();
                    }
                }


                function loopPeulot() {
                    $(lastResult.transactions).each(function (indexLoop, val) {
                        if (idxToProcess === indexLoop) {
                            idxToProcess += 1;
                            var transactionTypes, isDaily;
                            if (val.eventActivityTypeCode == 1) {
                                transactionTypes = '1';
                            } else if (val.eventActivityTypeCode == 2) {
                                transactionTypes = '0';
                            }
                            if (val.transactionType == 'REGULAR') {
                                isDaily = '0';
                            } else {
                                isDaily = '1';
                            }
                            var activityDescription = val.activityDescription;
                            const hasCheckActivityType = val.details !== null
                                && (val.activityTypeCode == 493 || val.activityTypeCode == 143 || val.activityTypeCode == 183
                                    || val.activityTypeCode == 272 || val.activityTypeCode == 205 || val.activityTypeCode == 418
                                    || val.activityTypeCode == 191 || val.activityTypeCode == 485
                                    || val.activityTypeCode == 140 || val.activityTypeCode == 396);
                            const hasHaavaraActivityType = val.beneficiaryDetailsData !== null && !hasCheckActivityType
                                && (val.activityTypeCode !== 473) && val.activityDescription !== "הפ'.תיק ממסרים";
                            const hasHaavaraChainType = val.activityTypeCode === 485 && val.internalLinkCode === 13;
                            if (all.banks.accounts.poalimAsakimNew.vddVal.CHECKPIC_DAYS_TO_RUN > 0 && hasCheckActivityType) {

                                function loadChecksInside() {
                                    var urlXhrCheck = "https://biz2.bankhapoalim.co.il" + val.details + "&accountId=" + v.bankNumber + "-" + v.branchNumber + "-" + v.accountNumber;
                                    $.when(poalimAsakimNew.getBase64FromImageUrlNew(urlXhrCheck, val))
                                        .then(function (arr) {
                                            val.details = null;
                                            if (arr === null || (arr.length === 1 && arr[0].ImageNameKey === "x")) {
                                                all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.push({
                                                    "Asmachta": poalimAsakimNew.retrieveAsmachta(val), // val.referenceNumber,
                                                    "TransDesc": activityDescription + (val.comment ? (' ' + val.comment) : ''),
                                                    "ValueDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(val.eventDate)),
                                                    "TransactionType": transactionTypes,
                                                    "TransTotal": val.eventAmount,
                                                    "Balance": val.currentBalance,
                                                    "IsDaily": isDaily,
                                                    "imgs": arr
                                                });
                                                moveOn();
                                            } else {

                                                function loadChecksAll() {
                                                    $(arr).each(function (idxCheck, valCheck) {
                                                        if (valCheck.url !== undefined) {
                                                            poalimAsakimNew.getImageAndSend(valCheck.url, valCheck.ImageNameKey).then(function (res) {
                                                                if (res === false) {
                                                                    valCheck.ImageNameKey = "x";
                                                                }
                                                                delete valCheck.url;
                                                                loadChecksAll();
                                                            });
                                                            return false;
                                                        } else {
                                                            if (arr.length === idxCheck + 1) {
                                                                all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.push({
                                                                    "Asmachta": poalimAsakimNew.retrieveAsmachta(val), // val.referenceNumber,
                                                                    "TransDesc": activityDescription + (val.comment ? (' ' + val.comment) : ''),
                                                                    "ValueDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(val.eventDate)),
                                                                    "TransactionType": transactionTypes,
                                                                    "TransTotal": val.eventAmount,
                                                                    "Balance": val.currentBalance,
                                                                    "IsDaily": isDaily,
                                                                    "imgs": arr
                                                                });
                                                                moveOn();
                                                            }
                                                        }
                                                    });
                                                }

                                                loadChecksAll();
                                            }
                                        })
                                        .fail(function () {
                                            loadChecksInside();
                                        });
                                }

                                loadChecksInside();

                                return false;

                            } else {
                                const trans = {
                                    "Asmachta": poalimAsakimNew.retrieveAsmachta(val), // val.referenceNumber,
                                    "TransDesc": activityDescription + (val.comment ? (' ' + val.comment) : ''),
                                    "ValueDate": all.banks.core.services.convertDateAll(poalimAsakimNew.convertDateLocal(val.eventDate)),
                                    "TransactionType": transactionTypes,
                                    "TransTotal": val.eventAmount,
                                    "Balance": val.currentBalance,
                                    "IsDaily": isDaily,
                                    "imgs": null
                                };
                                all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.push(trans);

                                if (hasHaavaraActivityType) {
                                    var dtd = {
                                        "DepositeTransferDate": trans.ValueDate,
                                        "TransferTotal": trans.TransTotal,
                                        "BankTransferNumber": null,
                                        "BranchTransferNumber": null,
                                        "AccountTransferNumber": null,
                                        "NamePayerTransfer": ["partyHeadline", "partyName"]
                                            .filter(fldName => val.beneficiaryDetailsData[fldName] !== null)
                                            .map(fldName => val.beneficiaryDetailsData[fldName])
                                            .join(' '),
                                        "DetailsTransfer": ["messageHeadline", "messageDetail"]
                                            .filter(fldName => val.beneficiaryDetailsData[fldName] !== null)
                                            .map(fldName => val.beneficiaryDetailsData[fldName])
                                            .join(' ')
                                    };
                                    trans.DepositeTransferData = [dtd];

                                    if (val.contraBankNumber > 0) {
                                        if (val.englishActionDesc === "STANDING ORDER" && val.contraBankNumber === 912) {
                                            dtd.BankTransferNumber = 12;
                                            dtd.BranchTransferNumber = Number(val.referenceNumber.toString().substring(3, 6));
                                            dtd.AccountTransferNumber = Number(val.referenceNumber.toString().substring(6, 12));
                                        } else {
                                            dtd.BankTransferNumber = val.contraBankNumber === 912 ? 12 : val.contraBankNumber;
                                            dtd.BranchTransferNumber = val.contraBranchNumber;
                                            dtd.AccountTransferNumber = val.contraAccountNumber;
                                        }
                                    } else {
                                        var accBrchBnkRslt = /(\d{1,3})\D+(\d{1,3})\D+(\d{6,})/g.exec(dtd['DetailsTransfer']);
                                        if (accBrchBnkRslt !== null) {
                                            dtd.BankTransferNumber = accBrchBnkRslt[1];
                                            dtd.BranchTransferNumber = accBrchBnkRslt[2];
                                            dtd.AccountTransferNumber = accBrchBnkRslt[3];
                                        }
                                    }
                                } else if (hasHaavaraChainType) {
                                    loadGroupedTransfersDetails(trans);
                                    return false;
                                }

                                if (lastResult.transactions.length === indexLoop + 1) {
                                    moveOn();
                                }
                            }
                        }
                    });
                }

                function loadGroupedTransfersDetails(trans) {
//v.bankNumber + "-" + v.branchNumber + "-" + v.accountNumber

                    all.banks.core.services.httpReq(
                        'https://biz2.bankhapoalim.co.il/ServerServices/general/accounts/selectedAccount?accountId=' + [v.bankNumber, v.branchNumber, v.accountNumber].join('-') + '&view=partyRelationshipManager&lang=he',
                        'GET',
                        null,
                        false,
                        false
                    ).then(function () {
                        all.banks.core.services.httpReq(
                            'https://biz2.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=MainFrameSet&isCoExistence=yes&transactionId=GroupedTransfersDetails&frameMenuParams=sum='
                            + trans.TransTotal + ':date=' + trans.ValueDate.substring(0, 5),
                            'GET', null, false, false)
                            .then(function (res00, res01, res01) {
                                var dwrxFetch = /var\s*dwxVar\s*=\s*"(\d+)"/.exec(res00);
                                var qwrtFetch = /var\s*qwrtVar\s*=\s*"(\d+)"/.exec(res00);
                                if (dwrxFetch === null || qwrtFetch === null) {
                                    moveOn();
                                    return;
                                }

                                all.banks.core.services.httpReq(
                                    'https://biz2.bankhapoalim.co.il/cgi-bin/poalwwwc?ctfw=init&reqName=action&language=HE&transactionId=GroupedTransfersDetails&subMenuName=Shekel'
                                    + '&ts=' + qwrtFetch[1] + '&tf=' + Math.random() + '&usm=&u=i'
                                    + '&sum=' + trans.TransTotal + '&date=' + trans.ValueDate.substring(0, 5)
                                    + '&pSubMenu=null&fromSubMenu=Shekel&bxx=912&nsv=y'
                                    + '&dwx=' + dwrxFetch[1]
                                    + '&wScr=1920&hScr=1080&menuTranName=GroupedTransfersDetails$23sum$3D'
                                    + trans.TransTotal + '$26date$3D' + trans.ValueDate.substring(0, 2) + '$2F' + trans.ValueDate.substring(3, 5),
                                    'GET', null, false, false)
                                    .then(function (res10, res11, res12) {
                                        var $$ = all.banks.core.services.parseHtml(res10);
                                        var rows = $$.find('#mytable_body > tbody > tr[bgcolor]');
                                        console.log('rows -> ' + rows.length);
                                        trans.DepositeTransferData = rows.map(function (idx, el) {
                                            var tds = $(el).find("td");
                                            if (tds.length > 3) {
                                                return {
                                                    "DepositeTransferDate": trans.ValueDate,
                                                    "TransferTotal": tds.eq(0).text().replace(/[^\d\.-]/g, ""),
                                                    "BankTransferNumber": tds.eq(4).text().replace(/\D/g, ""),
                                                    "BranchTransferNumber": tds.eq(3).text().replace(/\D/g, ""),
                                                    "AccountTransferNumber": tds.eq(2).text().replace(/\D/g, ""),
                                                    "NamePayerTransfer": tds.eq(1).text().split("").reverse().join(""),
                                                    "DetailsTransfer": null
                                                };
                                            } else {
                                                return {
                                                    "DepositeTransferDate": trans.ValueDate,
                                                    "TransferTotal": tds.eq(2).text().replace(/[^\d\.-]/g, ""),
                                                    "BankTransferNumber": null,
                                                    "BranchTransferNumber": null,
                                                    "AccountTransferNumber": null,
                                                    "NamePayerTransfer": null,
                                                    "DetailsTransfer": null
                                                };
                                            }
                                        }).get();
                                    })
                                    .always(() => {
                                        moveOn();
                                    });
                            })
                            .fail(function (error00, resErr01, urlParam02) {
                                moveOn();
                            });
                    })
                        .fail(function (error00, resErr01, urlParam02) {
                            moveOn();
                        });
                }
            }
        }

        function nextPortionOrComplete() {
            if (!allRowsFtched) {
                loopPortions();
            } else {
                if (all.banks.generalVariables.allDataArr.BankData[0].Account[0].Balance === null) {
                    myEmitterLogs(37,
                        all.banks.generalVariables.allDataArr.BankData[0].Account[0].BranchNumber
                        + "-" + all.banks.generalVariables.allDataArr.BankData[0].Account[0].AccountNumber);

                    if (all.banks.accountDetails.bank.arrDDAll.length > 1
                        && (all.banks.accounts.poalimAsakimNew.accNum + 1 < all.banks.accountDetails.bank.arrDDAll.length)) {
                        all.banks.accounts.poalimAsakimNew.accNum = all.banks.accounts.poalimAsakimNew.accNum + 1;
                        all.banks.accounts.poalimAsakimNew.loadOsh();
                    } else {
                        poalimAsakimNew.logOutNew();
                    }

                } else {
                    myEmitterLogs(12, all.banks.generalVariables.allDataArr.BankData[0].Account[0].DataRow.length); //length arr
                    all.banks.accounts.poalimAsakimNew.sendOshCtrl();
                }
            }
        }

    };
    poalimAsakimNew.retrieveAsmachta = function (v) {
        if (!v || !v.referenceNumber) {
            return null;
        }

//            const branchAcc = all.banks.accounts.poalimAsakimNew.vddVal.BANK_SNIF_ACCOUNT_KEY.split('-')
//                    .reverse()
//                    .map((v, idx) => {
//                        return idx === 1 ? v.padStart(6, '0')
//                            : v;
//                    })
//                    .join('');
//
//            if (v.referenceCatenatedNumber
//                    && branchAcc === String(v.referenceNumber)) {
        if (v.referenceCatenatedNumber
            && v.englishActionDesc && v.englishActionDesc.includes("LOAN")) {
            return v.referenceCatenatedNumber;
        }

        return v.referenceNumber;
    };
    poalimAsakimNew.failIfRedirectedToError = function (response, state, status, responseURL) {
        const dfd = jQuery.Deferred();
        if (responseURL
            && ["getLogonPageIski", "Error", "exit.html"].some(urlPart => responseURL.includes(urlPart))) {
            let err = new Error("Redirected to " + responseURL + " perhaps because of another otp session started somewhere. Terminating with error.");
            if (responseURL === 'https://misc.poalim-site.co.il/Error_Pages/5/New/ErrorNew_5.html') {
                err = new Error("Redirected to " + responseURL + " perhaps because the bank announces that the service is temporarily unavailable.");
            }
            all.banks.core.services.errorLog(err);
            poalimAsakimNew.haltAndWaitForReload = true;
            dfd.reject(err, undefined, undefined, responseURL);
        } else {
            dfd.resolve(response, state, status, responseURL);
        }

        return dfd.promise();
    };

    return poalimAsakimNew;
}();


// 611,"accountNumber":222924


// activityDescription: "העב' במקבץ-נט"
// activityDescriptionIncludeValueDate: null
// activityTypeCode: 485
// beneficiaryDetailsData: null
// comment: null
// commentExistenceSwitch: 0
// contraAccountNumber: 704023
// contraAccountTypeCode: 95
// contraBankNumber: 912
// contraBranchNumber: 630
// currentBalance: 875163.45
// dataGroupCode: 9
// details: null
// differentDateIndication: "N"
// displayCreditAccountDetails: 0
// englishActionDesc: "GRP TRANS NET"
// eventActivityTypeCode: 2
// eventAmount: 6084
// eventDate: 20201210
// eventId: 0
// executingBranchNumber: 268
// expandedEventDate: "2020121000014"
// fieldDescDisplaySwitch: 0
// formattedEventDate: "2020-12-10T00:00:00.000Z"
// formattedOriginalEventCreateDate: null
// formattedValueDate: "2020-12-10T00:00:00.000Z"
// internalLinkCode: 13
// marketingOfferContext: 0
// offerActivityContext: "currentAccountTransaction_724_485"
// originalEventCreateDate: 20201210
// pfmDetails: null
// recordNumber: 16
// referenceCatenatedNumber: 12268
// referenceNumber: 2685584576350
// rejectedDataEventPertainingIndication: "N"
// serialNumber: 14
// tableNumber: 5
// textCode: 724
// transactionType: "REGULAR"
// valueDate: 20201210
