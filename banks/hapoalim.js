all.banks.accounts.hapoalim = function () {
    var hapoalim = {};
    hapoalim.loginAbroad = function () {
        hapoalim.logoutWithStatus = 25;
        hapoalim.indAcc = 0;
        hapoalim.currentAcc = null;
        hapoalim.accAsharai = 0;
        hapoalim.paramUrl = "ServerServices";
        hapoalim.getBase64FromImageUrlCounter = 0;
        hapoalim.imageScale = 0.2;
        hapoalim.ashraiProcessedMap = [];
        var hebrewChars = new RegExp("^[\u0590-\u05FF]+$");
        if (hebrewChars.test(all.banks.accountDetails.bank.password)) {
            myEmitterLogs(5);
        } else {
            //https://login.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=MainFrameSet
            $('#filecontainerlogin').attr('src', 'https://login.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=getLogonPage');
            var ifarmeSetInterval = setInterval(function () {
                var input = $('#filecontainerlogin').contents().find('#userID');
                if (!input.length) {
                    $('#filecontainerlogin').attr('src', 'https://login.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=getLogonPage')
                } else {
                    clearInterval(ifarmeSetInterval);
                }
            }, 20000);
            var waitForIFrame = setInterval(function () {
                var input = $('#filecontainerlogin').contents().find('#userID');
                if (input.length) {
                    clearInterval(waitForIFrame);
                    clearInterval(ifarmeSetInterval);
                    doneLoadFrame();
                }
            }, 200);

// 			function nextLogin(){
// debugger
// 				vsenc.randomString = function (string_length) {
// 					var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
// 					var randomstring = '';
// 					for (var i = 0; i < string_length; i++) {
// 						var rnum = Math.floor(Math.random() * chars.length);
// 						randomstring += chars.substring(rnum, rnum + 1);
// 					}
// 					return randomstring;
// 				};
// 				vsenc.EncryptRSA = function (text, public_key)
// 				{
// 					var rsa = new RSAKey();
// 					rsa.setPublic(public_key, "10001");
// 					var pass = "[ENC]" + escape(text);
// 					var rcx = "";
// 					var curr = "";
// 					for (var cxpi = 0; cxpi < pass.length; cxpi += 7) {
// 						curr = rsa.encrypt(pass.substring(cxpi, (cxpi + 7)));
// 						if (rcx != "") {
// 							rcx += "|!|"
// 						}
// 						rcx += curr
// 					}
// 					rcx += "|(!)|";
// 					return rcx;
// 				}
//
// 				vsenc.urlEncode = function (s) {
// 					return encodeURIComponent(s).replace(/\%20/g, '+').replace(/[!'()*~]/g, function (c) {
// 						return '%' + c.charCodeAt(0).toString(16);
// 					});
// 				};
// 				vsenc.vignere = function (txt, key) {
// 					var ret = '';
// 					for (var i = 0; i < txt.length; i++) {
// 						ret += String.fromCharCode(key.charCodeAt(i % key.length) ^ txt.charCodeAt(i));
// 					}
// 					return ret;
// 				};
//
//
// 				eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}};var olsa654='';return p}('B 1M;B 66=9V;B 3F=((66&9Y)==9Z);G I(a,b,c){C(a!=O)C("4q"==2P a){o.4d(a,b,c)}J C(b==O&&"a2"!=2P a){o.3n(a,1N)}J{o.3n(a,b)}}G Q(){F T I(O)}G 6x(i,x,w,j,c,n){L(--n>=0){B v=x*o[i++]+w[j]+c;c=W.1H(v/a1);w[j++]=v&a0}F c}G 6A(i,x,w,j,c,n){B 2D=x&2O,2E=x>>15;L(--n>=0){B l=o[i]&2O;B h=o[i++]>>15;B m=2E*l+h*2D;l=2D*l+((m&2O)<<15)+w[j]+(c&6G);c=(l>>>30)+(m>>>15)+2E*h+(c>>>30);w[j++]=l&6G}F c}G 6y(i,x,w,j,c,n){B 2D=x&3E,2E=x>>14;L(--n>=0){B l=o[i]&3E;B h=o[i++]>>14;B m=2E*l+h*2D;l=2D*l+((m&3E)<<14)+w[j]+c;c=(l>>28)+(m>>14)+2E*h;w[j++]=l&9M}F c}C(3F&&(3b.3X=="9L 9S 8K")){I.H.am=6A;1M=30}J C(3F&&(3b.3X!="7f")){I.H.am=6x;1M=26}J{I.H.am=6y;1M=28}I.H.M=1M;I.H.1e=((1<<1M)-1);I.H.1j=(1<<1M);B 3f=52;I.H.6t=W.2M(2,3f);I.H.3C=3f-1M;I.H.3M=2*1M-3f;B 6w="9Q";B 2U=T 1a();B 2d,1q;2d="0".1c(0);K(1q=0;1q<=9;++1q){2U[2d++]=1q}2d="a".1c(0);K(1q=10;1q<36;++1q){2U[2d++]=1q}2d="A".1c(0);K(1q=10;1q<36;++1q){2U[2d++]=1q}G 1B(n){F 6w.1r(n)}G 3N(s,i){B c=2U[s.1c(i)];F(c==O)?-1:c}G 62(r){K(B i=o.t-1;i>=0;--i){r[i]=o[i]}r.t=o.t;r.s=o.s}G 64(x){o.t=1;o.s=(x<0)?-1:0;C(x>0){o[0]=x}J C(x<-1){o[0]=x+1j}J{o.t=0}}G 1J(i){B r=Q();r.2i(i);F r}G 65(s,b){B k;C(b==16){k=4}J C(b==8){k=3}J C(b==1N){k=8}J C(b==2){k=1}J C(b==32){k=5}J C(b==4){k=2}J{o.4M(s,b);F}o.t=0;o.s=0;B i=s.P,2f=1m,1o=0;L(--i>=0){B x=(k==8)?s[i]&1s:3N(s,i);C(x<0){C(s.1r(i)=="-"){2f=25}3Z}2f=1m;C(1o==0){o[o.t++]=x}J C(1o+k>o.M){o[o.t-1]|=(x&((1<<(o.M-1o))-1))<<1o;o[o.t++]=(x>>(o.M-1o))}J o[o.t-1]|=x<<1o;1o+=k;C(1o>=o.M){1o-=o.M}}C(k==8&&(s[0]&1E)!=0){o.s=-1;C(1o>0){o[o.t-1]|=((1<<(o.M-1o))-1)<<1o}}o.1k();C(2f){I.1A.U(o,o)}}G 6d(){B c=o.s&o.1e;L(o.t>0&&o[o.t-1]==c){--o.t}}G 7l(b){C(o.s<0){F"-"+o.2W().2b(b)}B k;C(b==16){k=4}J C(b==8){k=3}J C(b==2){k=1}J C(b==32){k=5}J C(b==4){k=2}J F o.4K(b);B 35=(1<<k)-1,d,m=1m,r="",i=o.t;B p=o.M-(i*o.M)%k;C(i-->0){C(p<o.M&&(d=o[i]>>p)>0){m=25;r=1B(d)}L(i>=0){C(p<k){d=(o[i]&((1<<p)-1))<<(k-p);d|=o[--i]>>(p+=o.M-k)}J{d=(o[i]>>(p-=k))&35;C(p<=0){p+=o.M;--i}}C(d>0){m=25}C(m){r+=1B(d)}}}F m?r:"0"}G 7h(){B r=Q();I.1A.U(o,r);F r}G 7i(){F(o.s<0)?o.2W():o}G 7j(a){B r=o.s-a.s;C(r!=0){F r}B i=o.t;r=i-a.t;C(r!=0){F r}L(--i>=0){C((r=o[i]-a[i])!=0){F r}}F 0}G 34(x){B r=1,t;C((t=x>>>16)!=0){x=t;r+=16}C((t=x>>8)!=0){x=t;r+=8}C((t=x>>4)!=0){x=t;r+=4}C((t=x>>2)!=0){x=t;r+=2}C((t=x>>1)!=0){x=t;r+=1}F r}G 7n(){C(o.t<=0){F 0}F o.M*(o.t-1)+34(o[o.t-1]^(o.s&o.1e))}G 6e(n,r){B i;K(i=o.t-1;i>=0;--i){r[i+n]=o[i]}K(i=n-1;i>=0;--i){r[i]=0}r.t=o.t+n;r.s=o.s}G 6l(n,r){K(B i=n;i<o.t;++i){r[i-n]=o[i]}r.t=W.4h(o.t-n,0);r.s=o.s}G 6m(n,r){B bs=n%o.M;B 2y=o.M-bs;B bm=(1<<2y)-1;B ds=W.1H(n/o.M),c=(o.s<<bs)&o.1e,i;K(i=o.t-1;i>=0;--i){r[i+ds+1]=(o[i]>>2y)|c;c=(o[i]&bm)<<bs}K(i=ds-1;i>=0;--i){r[i]=0}r[ds]=c;r.t=o.t+ds+1;r.s=o.s;r.1k()}G 6n(n,r){r.s=o.s;B ds=W.1H(n/o.M);C(ds>=o.t){r.t=0;F}B bs=n%o.M;B 2y=o.M-bs;B bm=(1<<bs)-1;r[0]=o[ds]>>bs;K(B i=ds+1;i<o.t;++i){r[i-ds-1]|=(o[i]&bm)<<2y;r[i-ds]=o[i]>>bs}C(bs>0){r[o.t-ds-1]|=(o.s&bm)<<2y}r.t=o.t-ds;r.1k()}G 6O(a,r){B i=0,c=0,m=W.2g(a.t,o.t);L(i<m){c+=o[i]-a[i];r[i++]=c&o.1e;c>>=o.M}C(a.t<o.t){c-=a.s;L(i<o.t){c+=o[i];r[i++]=c&o.1e;c>>=o.M}c+=o.s}J{c+=o.s;L(i<a.t){c-=a[i];r[i++]=c&o.1e;c>>=o.M}c-=a.s}r.s=(c<0)?-1:0;C(c<-1){r[i++]=o.1j+c}J C(c>0){r[i++]=c}r.t=i;r.1k()}G 6k(a,r){B x=o.1K(),y=a.1K();B i=x.t;r.t=i+y.t;L(--i>=0){r[i]=0}K(i=0;i<y.t;++i){r[i+x.t]=x.am(0,y[i],r,i,0,x.t)}r.s=0;r.1k();C(o.s!=a.s){I.1A.U(r,r)}}G 6j(r){B x=o.1K();B i=r.t=2*x.t;L(--i>=0){r[i]=0}K(i=0;i<x.t-1;++i){B c=x.am(i,x[i],r,2*i,0,1);C((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1))>=x.1j){r[i+x.t]-=x.1j;r[i+x.t+1]=1}}C(r.t>0){r[r.t-1]+=x.am(i,x[i],r,2*i,0,1)}r.s=0;r.1k()}G 6f(m,q,r){B 2a=m.1K();C(2a.t<=0){F}B 3e=o.1K();C(3e.t<2a.t){C(q!=O)q.2i(0);C(r!=O)o.1L(r);F}C(r==O){r=Q()}B y=Q(),4a=o.s,6B=m.s;B 2x=o.M-34(2a[2a.t-1]);C(2x>0){2a.2n(2x,y);3e.2n(2x,r)}J{2a.1L(y);3e.1L(r)}B 1G=y.t;B 3j=y[1G-1];C(3j==0){F}B 3D=3j*(1<<o.3C)+((1G>1)?y[1G-2]>>o.3M:0);B d1=o.6t/3D,d2=(1<<o.3C)/3D,e=1<<o.3M;B i=r.t,j=i-1G,t=(q==O)?Q():q;y.2h(j,t);C(r.X(t)>=0){r[r.t++]=1;r.U(t,r)}I.1w.2h(1G,t);t.U(y,y);L(y.t<1G){y[y.t++]=0}L(--j>=0){B 3k=(r[--i]==3j)?o.1e:W.1H(r[i]*d1+(r[i-1]+e)*d2);C((r[i]+=y.am(0,3k,r,j,0,1G))<3k){y.2h(j,t);r.U(t,r);L(r[i]<--3k){r.U(t,r)}}}C(q!=O){r.2N(1G,q);C(4a!=6B){I.1A.U(q,q)}}r.t=1G;r.1k();C(2x>0)r.1g(2x,r);C(4a<0){I.1A.U(r,r)}}G 7m(a){B r=Q();o.1K().1I(a,O,r);C(o.s<0&&r.X(I.1A)>0){a.U(r,r)}F r}G 1R(m){o.m=m}G 6K(x){C(x.s<0||x.X(o.m)>=0){F x.2w(o.m)}J F x}G 6L(x){F x}G 6M(x){x.1I(o.m,O,x)}G 6I(x,y,r){x.2k(y,r);o.1z(r)}G 6D(x,r){x.2L(r);o.1z(r)}1R.H.2j=6K;1R.H.2t=6L;1R.H.1z=6M;1R.H.27=6I;1R.H.1C=6D;G 6h(){C(o.t<1){F 0}B x=o[0];C((x&1)==0){F 0}B y=x&3;y=(y*(2-(x&2S)*y))&2S;y=(y*(2-(x&1s)*y))&1s;y=(y*(2-(((x&3o)*y)&3o)))&3o;y=(y*(2-x*y%o.1j))%o.1j;F(y>0)?o.1j-y:-y}G 1V(m){o.m=m;o.46=m.6g();o.3Y=o.46&2O;o.6F=o.46>>15;o.6q=(1<<(m.M-15))-1;o.6E=2*m.t}G 6a(x){B r=Q();x.1K().2h(o.m.t,r);r.1I(o.m,O,r);C(x.s<0&&r.X(I.1A)>0){o.m.U(r,r)}F r}G 6b(x){B r=Q();x.1L(r);o.1z(r);F r}G 6c(x){L(x.t<=o.6E){x[x.t++]=0}K(B i=0;i<o.m.t;++i){B j=x[i]&2O;B 6p=(j*o.3Y+(((j*o.6F+(x[i]>>15)*o.3Y)&o.6q)<<15))&x.1e;j=i+o.m.t;x[j]+=o.m.am(0,6p,x,i,0,o.m.t);L(x[j]>=x.1j){x[j]-=x.1j;x[++j]++}}x.1k();x.2N(o.m.t,x);C(x.X(o.m)>=0){x.U(o.m,x)}}G 60(x,r){x.2L(r);o.1z(r)}G 68(x,y,r){x.2k(y,r);o.1z(r)}1V.H.2j=6a;1V.H.2t=6b;1V.H.1z=6c;1V.H.27=68;1V.H.1C=60;G 6i(){F((o.t>0)?(o[0]&1):o.s)==0}G 6N(e,z){C(e>8S||e<1){F I.1w}B r=Q(),Y=Q(),g=z.2j(o),i=34(e)-1;g.1L(r);L(--i>=0){z.1C(r,Y);C((e&(1<<i))>0){z.27(Y,g,r)}J{B t=r;r=Y;Y=t}}F z.2t(r)}G 7k(e,m){B z;C(e<1N||m.1i()){z=T 1R(m)}J{z=T 1V(m)}F o.3P(e,z)}I.H.1L=62;I.H.2i=64;I.H.3n=65;I.H.1k=6d;I.H.2h=6e;I.H.2N=6l;I.H.2n=6m;I.H.1g=6n;I.H.U=6O;I.H.2k=6k;I.H.2L=6j;I.H.1I=6f;I.H.6g=6h;I.H.1i=6i;I.H.3P=6N;I.H.2b=7l;I.H.2W=7h;I.H.1K=7i;I.H.X=7j;I.H.2V=7n;I.H.2w=7m;I.H.4j=7k;I.1A=1J(0);I.1w=1J(1);G 39(1S,r){F T I(1S,r)}G 9g(s,n){B 1f="";B i=0;L(i+n<s.P){1f+=s.3T(i,i+n)+"\\n";i+=n}F 1f+s.3T(i,s.P)}G 9f(b){C(b<4b){F"0"+b.2b(16)}J{F b.2b(16)}}G 7p(s,n){B ba=T 1a();B i=s.P-1;L(i>=0&&n>0){B c=s.1c(i--);C(c<2z){ba[--n]=c}J C((c>69)&&(c<99)){ba[--n]=(c&63)|2z;ba[--n]=(c>>6)|5m}J{ba[--n]=(c&63)|2z;ba[--n]=((c>>6)&63)|2z;ba[--n]=(c>>12)|74}}ba[--n]=0;B 7g=T 3Q();B x=T 1a();L(n>2){x[0]=0;L(x[0]==0){7g.45(x)}ba[--n]=x[0]}ba[--n]=2;ba[--n]=0;F T I(ba)}G 1X(){o.n=O;o.e=0;o.d=O;o.p=O;o.q=O;o.6J=O;o.6C=O;o.6u=O}G 6W(N,E){C(N!=O&&E!=O&&N.P>0&&E.P>0){o.n=39(N,16);o.e=4f(E,16)}}G 6V(x){F x.4j(o.e,o.n)}G 6X(7o){B m=7p(7o,(o.n.2V()+7)>>3);C(m==O){F O}B c=o.7e(m);C(c==O){F O}B h=c.2b(16);C((h.P&1)==0){F h}J{F"0"+h}}1X.H.7e=6V;1X.H.98=6W;1X.H.5u=6X;B 2R;B 1n;B 1d;G 6Y(x){1n[1d++]^=x&1y;1n[1d++]^=(x>>8)&1y;1n[1d++]^=(x>>16)&1y;1n[1d++]^=(x>>24)&1y;C(1d>=3c){1d-=3c}}G 6Q(){6Y(T 5b().58())}C(1n==O){1n=T 1a();1d=0;B t;C(3b.3X=="7f"&&3b.96<"5"&&6U.6T){B z=6U.6T.6P(32);K(t=0;t<z.P;++t){1n[1d++]=z.1c(t)&1y}}L(1d<3c){t=W.1H(9a*W.6P());1n[1d++]=t>>>8;1n[1d++]=t&1y}1d=0}G 6R(){C(2R==O){6Q();2R=7c();2R.6Z(1n);K(1d=0;1d<1n.P;++1d){1n[1d]=0}1d=0}F 2R.7a()}G 6S(ba){B i;K(i=0;i<ba.P;++i){ba[i]=6R()}}G 3Q(){}3Q.H.45=6S;G 3a(){o.i=0;o.j=0;o.S=T 1a()}G 70(1l){B i,j,t;K(i=0;i<1N;++i){o.S[i]=i}j=0;K(i=0;i<1N;++i){j=(j+o.S[i]+1l[i%1l.P])&1y;t=o.S[i];o.S[i]=o.S[j];o.S[j]=t}o.i=0;o.j=0}G 7b(){B t;o.i=(o.i+1)&1y;o.j=(o.j+o.S[o.i])&1y;t=o.S[o.i];o.S[o.i]=o.S[o.j];o.S[o.j]=t;F o.S[(t+o.S[o.i])&1y]}3a.H.6Z=70;3a.H.7a=7b;G 7c(){F T 3a()}B 3c=1N;B 78="5D+/";B 7d="=";G 77(s){B 1f="";B i;B k=0;B 1T;K(i=0;i<s.P;++i){C(s.1r(i)==7d){9d}v=78.2Z(s.1r(i));C(v<0){3Z}C(k==0){1f+=1B(v>>2);1T=v&3;k=1}J C(k==1){1f+=1B((1T<<2)|(v>>4));1T=v&2S;k=2}J C(k==2){1f+=1B(1T);1f+=1B(v>>2);1T=v&3;k=3}J{1f+=1B((1T<<2)|(v>>4));1f+=1B(v&2S);k=0}}C(k==1){1f+=1B(1T<<2)}F 1f}G 9c(s){B h=77(s);B i;B a=T 1a();K(i=0;2*i<h.P;++i){a[i]=4f(h.3T(2*i,2*i+2),16)}F a}B V={};V.3L=G(72,w){B 1b=4;B 2F=w.P/1b-1;B Z=[[],[],[],[]];K(B i=0;i<16;i++){Z[i%4][W.1H(i/4)]=72[i]}Z=V.3u(Z,w,0,1b);K(B 3h=1;3h<2F;3h++){Z=V.3O(Z,1b);Z=V.3R(Z,1b);Z=V.4P(Z,1b);Z=V.3u(Z,w,3h,1b)}Z=V.3O(Z,1b);Z=V.3R(Z,1b);Z=V.3u(Z,w,2F,1b);B 3W=T 1a(16);K(B i=0;i<16;i++){3W[i]=Z[i%4][W.1H(i/4)]}F 3W};V.4c=G(1l){B 1b=4;B 1P=1l.P/4;B 2F=1P+6;B w=T 1a(1b*(2F+1));B 1Q=T 1a(4);K(B i=0;i<1P;i++){B r=[1l[4*i],1l[4*i+1],1l[4*i+2],1l[4*i+3]];w[i]=r}K(B i=1P;i<(1b*(2F+1));i++){w[i]=T 1a(4);K(B t=0;t<4;t++){1Q[t]=w[i-1][t]}C(i%1P==0){1Q=V.44(V.4w(1Q));K(B t=0;t<4;t++){1Q[t]^=V.5r[i/1P][t]}}J C(1P>6&&i%1P==4){1Q=V.44(1Q)}K(B t=0;t<4;t++){w[i][t]=w[i-1P][t]^1Q[t]}}F w};V.3O=G(s,1b){K(B r=0;r<4;r++){K(B c=0;c<1b;c++){s[r][c]=V.40[s[r][c]]}}F s};V.3R=G(s,1b){B t=T 1a(4);K(B r=1;r<4;r++){K(B c=0;c<4;c++){t[c]=s[r][(c+r)%1b]}K(B c=0;c<4;c++){s[r][c]=t[c]}}F s};V.4P=G(s,1b){K(B c=0;c<4;c++){B a=T 1a(4);B b=T 1a(4);K(B i=0;i<4;i++){a[i]=s[i][c];b[i]=s[i][c]&1E?s[i][c]<<1^9e:s[i][c]<<1}s[0][c]=b[0]^a[1]^b[1]^a[2]^a[3];s[1][c]=a[0]^b[1]^a[2]^b[2]^a[3];s[2][c]=a[0]^a[1]^b[2]^a[3]^b[3];s[3][c]=a[0]^b[0]^a[1]^a[2]^b[3]}F s};V.3u=G(Z,w,4I,1b){K(B r=0;r<4;r++){K(B c=0;c<1b;c++){Z[r][c]^=w[4I*4+c][r]}}F Z};V.44=G(w){K(B i=0;i<4;i++){w[i]=V.40[w[i]]}F w};V.4w=G(w){B 4D=w[0];K(B i=0;i<3;i++){w[i]=w[i+1]}w[3]=4D;F w};V.40=[9n,9o,9l,9k,9h,9i,9j,95,8R,5q,8T,8Q,8P,8L,8M,8N,8O,8U,8V,91,92,93,90,8Z,8W,8X,8Y,9p,9q,9R,9P,5S,9O,9T,9W,9X,5w,1D,9K,9J,9w,9x,9y,9v,9u,9r,9s,9t,5n,9z,9A,9G,9H,9I,9F,9E,9B,9C,1E,9D,a3,8F,7z,7v,7C,7E,7W,7Q,5x,7O,7Y,7V,7S,7t,7w,7x,7I,7y,7r,7u,7U,7X,R,7H,5t,7G,7T,7M,7N,7L,7K,7J,7P,7Z,7R,7F,80,7D,7s,7q,7B,7A,8J,8w,8x,8y,5p,8v,8u,8q,8r,8s,8t,8z,3q,8A,8G,8H,8I,81,8E,8B,8C,8D,4b,1s,8p,8o,8a,8b,8c,88,87,82,84,85,86,8d,8e,8l,8m,8n,8k,8j,8f,8g,8h,8i,94,as,co,cp,cq,cr,cn,cm,ci,ch,cj,ck,5T,cl,ct,cu,cC,cD,cE,cF,cB,cA,cw,cv,cx,cy,cz,cg,cf,bX,bW,a4,bZ,c0,bV,bU,bQ,bP,bR,bS,bT,c1,c2,5o,ca,cb,cd,ce,cH,c8,c4,c3,c5,c6,c7,5V,cG,cV,dp,dx,dn,di,dm,dk,dl,dj,do,dg,df,dh,dv,dw,du,dq,dr,dt,dd,cR,cQ,cS,cT,de,cU,cP,cO,cJ,cI,cK,cL,cN,cM,cW,cX,d9,d8,da,db,dc,d7,d6,cZ,cY,d0,5E,d3,d5,d4,c9];V.5r=[[R,R,R,R],[5q,R,R,R],[5p,R,R,R],[5n,R,R,R],[5o,R,R,R],[4b,R,R,R],[5t,R,R,R],[3q,R,R,R],[1E,R,R,R],[5x,R,R,R],[5w,R,R,R]];B 5v={};5v.5u=G(2A,2G,2J){B 2B=16;C(!(2J==2z||2J==5m||2J==1N)){F\'\'}2A=2T.2X(2A);2G=2T.2X(2G);B 3p=2J/8;B 3r=T 1a(3p);K(B i=0;i<3p;i++){3r[i]=aE(2G.1c(i))?0:2G.1c(i)}B 1l=V.3L(3r,V.4c(3r));1l=1l.aG(1l.5B(0,3p-16));B 1W=T 1a(2B);B 3G=(T 5b()).58();B 5f=W.1H(3G/5e);B 5k=3G%5e;K(B i=0;i<4;i++){1W[i]=(5f>>>i*8)&1s};K(B i=0;i<4;i++){1W[i+4]=5k&1s};B 3H=\'\';K(B i=0;i<8;i++){3H+=1v.1t(1W[i])}B 5y=V.4c(1l);B 3m=W.aH(2A.P/2B);B 3A=T 1a(3m);K(B b=0;b<3m;b++){K(B c=0;c<4;c++){1W[15-c]=(b>>>c*8)&1s}K(B c=0;c<4;c++){1W[15-c-4]=(b/aD>>>c*8)}B 5R=V.3L(1W,5y);B 3I=b<3m-1?2B:(2A.P-1)%2B+1;B 33=T 1a(3I);K(B i=0;i<3I;i++){33[i]=5R[i]^2A.1c(b*2B+i);33[i]=1v.1t(33[i])}3A[b]=33.3s(\'\')}B 3t=3H+3A.3s(\'\');3t=1Y.2X(3t);F 3t};B 2T={};2T.2X=G(2s){B 2v=2s.3y(/[\\3v-\\aA]/g,G(c){B cc=c.1c(0);F 1v.1t(5S|cc>>6,1E|cc&1D)});2v=2v.3y(/[\\bO-\\aI]/g,G(c){B cc=c.1c(0);F 1v.1t(5T|cc>>12,1E|cc>>6&aJ,1E|cc&1D)});F 2v};2T.5G=G(2v){B 2s=2v.3y(/[\\aR-\\aS][\\3v-\\42]/g,G(c){B cc=(c.1c(0)&5V)<<6|c.1c(1)&1D;F 1v.1t(cc)});2s=2s.3y(/[\\aT-\\aU][\\3v-\\42][\\3v-\\42]/g,G(c){B cc=((c.1c(0)&5E)<<12)|((c.1c(1)&1D)<<6)|(c.1c(2)&1D);F 1v.1t(cc)});F 2s};B 1Y={};1Y.3K="5D+/=";1Y.2X=G(1S,2Y){2Y=(2P 2Y==\'5K\')?1m:2Y;B 1U,20,2m,1x,2l,2u,21,1Z,e=[],3z=\'\',c,1u,1p;B 1F=1Y.3K;1u=2Y?1S.aK():1S;c=1u.P%3;C(c>0){L(c++<3){3z+=\'=\';1u+=\'\\0\'}}K(c=0;c<1u.P;c+=3){1U=1u.1c(c);20=1u.1c(c+1);2m=1u.1c(c+2);1x=1U<<16|20<<8|2m;2l=1x>>18&1D;2u=1x>>12&1D;21=1x>>6&1D;1Z=1x&1D;e[c/3]=1F.1r(2l)+1F.1r(2u)+1F.1r(21)+1F.1r(1Z)}1p=e.3s(\'\');1p=1p.5B(0,1p.P-3z.P)+3z;F 1p};1Y.5G=G(1S,2p){2p=(2P 2p==\'5K\')?1m:2p;B 1U,20,2m,2l,2u,21,1Z,1x,d=[],1u,1p;B 1F=1Y.3K;1p=2p?1S.4G():1S;K(B c=0;c<1p.P;c+=4){2l=1F.2Z(1p.1r(c));2u=1F.2Z(1p.1r(c+1));21=1F.2Z(1p.1r(c+2));1Z=1F.2Z(1p.1r(c+3));1x=2l<<18|2u<<12|21<<6|1Z;1U=1x>>>16&1s;20=1x>>>8&1s;2m=1x&1s;d[c/4]=1v.1t(1U,20,2m);C(1Z==3q){d[c/4]=1v.1t(1U,20)}C(21==3q){d[c/4]=1v.1t(1U)}}1u=d.3s(\'\');F 2p?1u.4G():1u};G ae(){}G 4C(){B r=Q();o.1L(r);F r}G 4x(){C(o.s<0){C(o.t==1)F o[0]-o.1j;J C(o.t==0)F-1}J C(o.t==1)F o[0];J C(o.t==0)F 0;F((o[1]&((1<<(32-o.M))-1))<<o.M)|o[0]}G 4z(){F(o.t==0)?o.s:(o[0]<<24)>>24}G 4A(){F(o.t==0)?o.s:(o[0]<<16)>>16}G 4J(r){F W.1H(W.ab*o.M/W.aa(r))}G 4V(){C(o.s<0)F-1;J C(o.t<=0||(o.t==1&&o[0]<=0))F 0;J F 1}G 4L(b){C(b==O)b=10;C(o.1O()==0||b<2||b>36)F"0";B cs=o.4e(b);B a=W.2M(b,cs);B d=1J(a),y=Q(),z=Q(),r="";o.1I(d,y,z);L(y.1O()>0){r=(a+z.4i()).2b(b).a5(1)+r;y.1I(d,y,z)}F z.4i().2b(b)+r}G 4T(s,b){o.2i(0);C(b==O)b=10;B cs=o.4e(b);B d=W.2M(b,cs),2f=1m,j=0,w=0;K(B i=0;i<s.P;++i){B x=3N(s,i);C(x<0){C(s.1r(i)=="-"&&o.1O()==0)2f=25;3Z}w=b*w+x;C(++j>=cs){o.4g(d);o.2o(w,0);j=0;w=0}}C(j>0){o.4g(W.2M(b,j));o.2o(w,0)}C(2f)I.1A.U(o,o)}G 51(a,b,c){C("4q"==2P b){C(a<2)o.2i(1);J{o.4d(a,c);C(!o.5N(a-1))o.22(I.1w.3w(a-1),3l,o);C(o.1i())o.2o(1,0);L(!o.4Q(b)){o.2o(2,0);C(o.2V()>a)o.U(I.1w.3w(a-1),o)}}}J{B x=T 1a(),t=a&7;x.P=(a>>3)+1;b.45(x);C(t>0)x[0]&=((1<<t)-1);J x[0]=0;o.3n(x,1N)}}G 5Y(){B i=o.t,r=T 1a();r[0]=o.s;B p=o.M-(i*o.M)%8,d,k=0;C(i-->0){C(p<o.M&&(d=o[i]>>p)!=(o.s&o.1e)>>p)r[k++]=d|(o.s<<(o.M-p));L(i>=0){C(p<8){d=(o[i]&((1<<p)-1))<<(8-p);d|=o[--i]>>(p+=o.M-8)}J{d=(o[i]>>(p-=8))&1s;C(p<=0){p+=o.M;--i}}C((d&1E)!=0)d|=-1N;C(k==0&&(o.s&1E)!=(d&1E))++k;C(k>0||d!=o.s)r[k++]=d}}F r}G 57(a){F(o.X(a)==0)}G 5I(a){F(o.X(a)<0)?o:a}G 5J(a){F(o.X(a)>0)?o:a}G 50(a,2c,r){B i,f,m=W.2g(a.t,o.t);K(i=0;i<m;++i)r[i]=2c(o[i],a[i]);C(a.t<o.t){f=a.s&o.1e;K(i=m;i<o.t;++i)r[i]=2c(o[i],f);r.t=o.t}J{f=o.s&o.1e;K(i=m;i<a.t;++i)r[i]=2c(f,a[i]);r.t=a.t}r.s=2c(o.s,a.s);r.1k()}G 4Y(x,y){F x&y}G 5Z(a){B r=Q();o.22(a,4Y,r);F r}G 3l(x,y){F x|y}G 5F(a){B r=Q();o.22(a,3l,r);F r}G 3V(x,y){F x^y}G 5A(a){B r=Q();o.22(a,3V,r);F r}G 3U(x,y){F x&~y}G 5C(a){B r=Q();o.22(a,3U,r);F r}G 5L(){B r=Q();K(B i=0;i<o.t;++i)r[i]=o.1e&~o[i];r.t=o.t;r.s=~o.s;F r}G 5M(n){B r=Q();C(n<0)o.1g(-n,r);J o.2n(n,r);F r}G 5W(n){B r=Q();C(n<0)o.2n(-n,r);J o.1g(n,r);F r}G 55(x){C(x==0)F-1;B r=0;C((x&3o)==0){x>>=16;r+=16}C((x&1s)==0){x>>=8;r+=8}C((x&2S)==0){x>>=4;r+=4}C((x&3)==0){x>>=2;r+=2}C((x&1)==0)++r;F r}G 5X(){K(B i=0;i<o.t;++i)C(o[i]!=0)F i*o.M+55(o[i]);C(o.s<0)F o.t*o.M;F-1}G 54(x){B r=0;L(x!=0){x&=x-1;++r}F r}G 5O(){B r=0,x=o.s&o.1e;K(B i=0;i<o.t;++i)r+=54(o[i]^x);F r}G 5P(n){B j=W.1H(n/o.M);C(j>=o.t)F(o.s!=0);F((o[j]&(1<<(n%o.M)))!=0)}G 4W(n,2c){B r=I.1w.3w(n);o.22(r,2c,r);F r}G 5Q(n){F o.3x(n,3l)}G 5z(n){F o.3x(n,3U)}G 5h(n){F o.3x(n,3V)}G 4X(a,r){B i=0,c=0,m=W.2g(a.t,o.t);L(i<m){c+=o[i]+a[i];r[i++]=c&o.1e;c>>=o.M}C(a.t<o.t){c+=a.s;L(i<o.t){c+=o[i];r[i++]=c&o.1e;c>>=o.M}c+=o.s}J{c+=o.s;L(i<a.t){c+=a[i];r[i++]=c&o.1e;c>>=o.M}c+=a.s}r.s=(c<0)?-1:0;C(c>0)r[i++]=c;J C(c<-1)r[i++]=o.1j+c;r.t=i;r.1k()}G 5g(a){B r=Q();o.2K(a,r);F r}G 5i(a){B r=Q();o.U(a,r);F r}G 5a(a){B r=Q();o.2k(a,r);F r}G 5d(a){B r=Q();o.1I(a,r,O);F r}G 5l(a){B r=Q();o.1I(a,O,r);F r}G 5s(a){B q=Q(),r=Q();o.1I(a,q,r);F T 1a(q,r)}G 4r(n){o[o.t]=o.am(0,n-1,o,0,0,o.t);++o.t;o.1k()}G 4s(n,w){C(n==0)F;L(o.t<=w)o[o.t++]=0;o[w]+=n;L(o[w]>=o.1j){o[w]-=o.1j;C(++w>=o.t)o[o.t++]=0;++o[w]}}G 2r(){}G 3S(x){F x}G 4O(x,y,r){x.2k(y,r)}G 4S(x,r){x.2L(r)}2r.H.2j=3S;2r.H.2t=3S;2r.H.27=4O;2r.H.1C=4S;G 4R(e){F o.3P(e,T 2r())}G 4u(a,n,r){B i=W.2g(o.t+a.t,n);r.s=0;r.t=i;L(i>0)r[--i]=0;B j;K(j=r.t-o.t;i<j;++i)r[i+o.t]=o.am(0,a[i],r,i,0,o.t);K(j=W.2g(a.t,n);i<j;++i)o.am(0,a[i],r,i,0,n-i);r.1k()}G 4m(a,n,r){--n;B i=r.t=o.t+a.t-n;r.s=0;L(--i>=0)r[i]=0;K(i=W.4h(n-o.t,0);i<a.t;++i)r[o.t+i-n]=o.am(n-i,a[i],r,0,0,o.t+i-n);r.1k();r.2N(1,r)}G 2e(m){o.Y=Q();o.49=Q();I.1w.2h(2*m.t,o.Y);o.4N=o.Y.5c(m);o.m=m}G 4B(x){C(x.s<0||x.t>2*o.m.t)F x.2w(o.m);J C(x.X(o.m)<0)F x;J{B r=Q();x.1L(r);o.1z(r);F r}}G 4y(x){F x}G 6r(x){x.2N(o.m.t-1,o.Y);C(x.t>o.m.t+1){x.t=o.m.t+1;x.1k()}o.4N.4p(o.Y,o.m.t+1,o.49);o.m.4t(o.49,o.m.t+1,o.Y);L(x.X(o.Y)<0)x.2o(1,o.m.t+1);x.U(o.Y,x);L(x.X(o.m)>=0)x.U(o.m,x)}G 75(x,r){x.2L(r);o.1z(r)}G 76(x,y,r){x.2k(y,r);o.1z(r)}2e.H.2j=4B;2e.H.2t=4y;2e.H.1z=6r;2e.H.27=76;2e.H.1C=75;G 4E(e,m){B i=e.2V(),k,r=1J(1),z;C(i<=0)F r;J C(i<18)k=1;J C(i<48)k=3;J C(i<an)k=4;J C(i<bx)k=5;J k=6;C(i<8)z=T 1R(m);J C(m.1i())z=T 2e(m);J z=T 1V(m);B g=T 1a(),n=3,38=k-1,35=(1<<k)-1;g[1]=z.2j(o);C(k>1){B 3B=Q();z.1C(g[1],3B);L(n<=35){g[n]=Q();z.27(3B,g[n-2],g[n]);n+=2}}B j=e.t-1,w,3J=25,Y=Q(),t;i=34(e[j])-1;L(j>=0){C(i>=38)w=(e[j]>>(i-38))&35;J{w=(e[j]&((1<<(i+1))-1))<<(38-i);C(j>0)w|=e[j-1]>>(o.M+i-38)}n=k;L((w&1)==0){w>>=1;--n}C((i-=n)<0){i+=o.M;--j}C(3J){g[w].1L(r);3J=1m}J{L(n>1){z.1C(r,Y);z.1C(Y,r);n-=2}C(n>0)z.1C(r,Y);J{t=r;r=Y;Y=t}z.27(Y,g[w],r)}L(j>=0&&(e[j]&(1<<i))==0){z.1C(r,Y);t=r;r=Y;Y=t;C(--i<0){i=o.M-1;--j}}}F z.2t(r)}G 56(a){B x=(o.s<0)?o.2W():o.2H();B y=(a.s<0)?a.2W():a.2H();C(x.X(y)<0){B t=x;x=y;y=t}B i=x.2C(),g=y.2C();C(g<0)F x;C(i<g)g=i;C(g>0){x.1g(g,x);y.1g(g,y)}L(x.1O()>0){C((i=x.2C())>0)x.1g(i,x);C((i=y.2C())>0)y.1g(i,y);C(x.X(y)>=0){x.U(y,x);x.1g(1,x)}J{y.U(x,y);y.1g(1,y)}}C(g>0)y.2n(g,y);F y}G 4o(n){C(n<=0)F 0;B d=o.1j%n,r=(o.s<0)?n-1:0;C(o.t>0)C(d==0)r=o[0]%n;J K(B i=o.t-1;i>=0;--i)r=(d*r+o[i])%n;F r}G 4l(m){B ac=m.1i();C((o.1i()&&ac)||m.1O()==0)F I.1A;B u=m.2H(),v=o.2H();B a=1J(1),b=1J(0),c=1J(0),d=1J(1);L(u.1O()!=0){L(u.1i()){u.1g(1,u);C(ac){C(!a.1i()||!b.1i()){a.2K(o,a);b.U(m,b)}a.1g(1,a)}J C(!b.1i())b.U(m,b);b.1g(1,b)}L(v.1i()){v.1g(1,v);C(ac){C(!c.1i()||!d.1i()){c.2K(o,c);d.U(m,d)}c.1g(1,c)}J C(!d.1i())d.U(m,d);d.1g(1,d)}C(u.X(v)>=0){u.U(v,u);C(ac)a.U(c,a);b.U(d,b)}J{v.U(u,v);C(ac)c.U(a,c);d.U(b,d)}}C(v.X(I.1w)!=0)F I.1A;C(d.X(m)>=0)F d.3i(m);C(d.1O()<0)d.2K(m,d);J F d;C(d.1O()<0)F d.3d(m);J F d}B 1h=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,bh,bg,bc,bb,bd,69,be,bf,aB,bl,bk,bj,bi,b9,b8,b1,b0,5H,aZ,aX,aY,b2,b3,bE,bM,bt,bz,aW,aV,ao,al,aj,ak,ap,au,at,ar,ai,ah,a9,a8,a7,a6,ag,af,aQ,bY,b7,b6,b5,b4,bn,bo,bG,bF,bD,bH,bI,bL,bK,bJ,bC,bB,bu,br,bp,bq,bv,bw,bA,by,aq];B 4Z=(1<<26)/1h[1h.P-1];G 4U(t){B i,x=o.1K();C(x.t==1&&x[0]<=1h[1h.P-1]){K(i=0;i<1h.P;++i)C(x[0]==1h[i])F 25;F 1m}C(x.1i())F 1m;i=1;L(i<1h.P){B m=1h[i],j=i+1;L(j<1h.P&&m<4Z)m*=1h[j++];m=x.4n(m);L(i<j)C(m%1h[i++]==0)F 1m}F x.4v(t)}G 4F(t){B 2q=o.3i(I.1w);B k=2q.2C();C(k<=0)F 1m;B r=2q.5U(k);t=(t+1)>>1;C(t>1h.P)t=1h.P;B a=Q();K(B i=0;i<t;++i){a.2i(1h[i]);B y=a.2Q(r,o);C(y.X(I.1w)!=0&&y.X(2q)!=0){B j=1;L(j++<k&&y.X(2q)!=0){y=y.4j(2,o);C(y.X(I.1w)==0)F 1m}C(y.X(2q)!=0)F 1m}}F 25}I.H.4e=4J;I.H.4K=4L;I.H.4M=4T;I.H.4d=51;I.H.22=50;I.H.3x=4W;I.H.2K=4X;I.H.4g=4r;I.H.2o=4s;I.H.4t=4u;I.H.4p=4m;I.H.4n=4o;I.H.4v=4F;I.H.2H=4C;I.H.4i=4x;I.H.ad=4z;I.H.av=4A;I.H.1O=4V;I.H.4H=5Y;I.H.aw=57;I.H.2g=5I;I.H.4h=5J;I.H.aO=5Z;I.H.aN=5F;I.H.aM=5A;I.H.aL=5C;I.H.aP=5L;I.H.3w=5M;I.H.5U=5W;I.H.2C=5X;I.H.az=5O;I.H.5N=5P;I.H.ax=5Q;I.H.ay=5z;I.H.aC=5h;I.H.3d=5g;I.H.3i=5i;I.H.4k=5a;I.H.5c=5d;I.H.aF=5l;I.H.bN=5s;I.H.2Q=4E;I.H.9m=4l;I.H.2M=4R;I.H.9b=56;I.H.4Q=4U;G 6v(d,n){B b=d.4H();B i=0;L(i<b.P&&b[i]==0)++i;C(b.P-i!=n-1||b[i]!=2)F O;++i;L(b[i]!=0)C(++i>=b.P)F O;B 1f="";L(++i<b.P){B c=b[i]&1y;C(c<2z){1f+=1v.1t(c)}J C((c>5H)&&(c<74)){1f+=1v.1t(((c&31)<<6)|(b[i+1]&63));++i}J{1f+=1v.1t(((c&15)<<12)|((b[i+1]&63)<<6)|(b[i+2]&63));i+=2}}F 1f}G 6H(N,E,D){C(N!=O&&E!=O&&N.P>0&&E.P>0){o.n=39(N,16);o.e=4f(E,16);o.d=39(D,16)}J F 1m}G 6o(x){C(o.p==O||o.q==O){F x.2Q(o.d,o.n)}B 2I=x.2w(o.p).2Q(o.6J,o.p);B 3g=x.2w(o.q).2Q(o.6C,o.q);L(2I.X(3g)<0){2I=2I.3d(o.p)}F 2I.3i(3g).4k(o.6u).2w(o.p).4k(o.q).3d(3g)}G 5j(6s){B c=39(6s,16);B m=o.6z(c);C(m==O)F O;F 6v(m,(o.n.2V()+7)>>3)}1X.H.6z=6o;1X.H.9N=6H;1X.H.9U=5j;',62,840,'||||||||||||||||||||||||this|||||||||||||var|if|||return|function|prototype|BigInteger|else|for|while|DB||null|length|nbi|0x00||new|subTo|Aes|Math|compareTo|r2|state|||||||||||Array|Nb|charCodeAt|rng_pptr|DM|ret|rShiftTo|lowprimes|isEven|DV|clamp|key|false|rng_pool|sh|coded|vv|charAt|0xff|fromCharCode|plain|String|ONE|bits|255|reduce|ZERO|int2char|sqrTo|0x3f|0x80|b64|ys|floor|divRemTo|nbv|abs|copyTo|dbits|256|signum|Nk|temp|Classic|str|slop|o1|Montgomery|counterBlock|RSAKey|Base64|h4|o2|h3|bitwiseTo|||true||mulTo|||pm|toString|op|rr|Barrett|mi|min|dlShiftTo|fromInt|convert|multiplyTo|h1|o3|lShiftTo|dAddOffset|utf8decode|n1|NullExp|strUni|revert|h2|strUtf|mod|nsh|cbs|128|plaintext|blockSize|getLowestSetBit|xl|xh|Nr|password|clone|xp|nBits|addTo|squareTo|pow|drShiftTo|0x7fff|typeof|modPow|rng_state|0xf|Utf8|BI_RC|bitLength|negate|encode|utf8encode|indexOf||||cipherChar|nbits|km|||k1|parseBigInt|Arcfour|navigator|rng_psize|add|pt|BI_FP|xq|round|subtract|y0|qd|op_or|blockCount|fromString|0xffff|nBytes|0x40|pwBytes|join|ciphertext|AddRoundKey|u0080|shiftLeft|changeBit|replace|pad|ciphertxt|g2|F1|yt|0x3fff|j_lm|nonce|ctrTxt|blockLength|is1|code|Cipher|F2|intAt|SubBytes|exp|SecureRandom|ShiftRows|nNop|substring|op_andnot|op_xor|output|appName|mpl|continue|Sbox||u00bf||SubWord|nextBytes|mp|||q3|ts|0x10|KeyExpansion|fromNumber|chunkSize|parseInt|dMultiply|max|intValue|modPowInt|multiply|bnModInverse|bnpMultiplyUpperTo|modInt|bnpModInt|multiplyUpperTo|number|bnpDMultiply|bnpDAddOffset|multiplyLowerTo|bnpMultiplyLowerTo|millerRabin|RotWord|bnIntValue|barrettRevert|bnByteValue|bnShortValue|barrettConvert|bnClone|tmp|bnModPow|bnpMillerRabin|decodeUTF8|toByteArray|rnd|bnpChunkSize|toRadix|bnpToRadix|fromRadix|mu|nMulTo|MixColumns|isProbablePrime|bnPow|nSqrTo|bnpFromRadix|bnIsProbablePrime|bnSigNum|bnpChangeBit|bnpAddTo|op_and|lplim|bnpBitwiseTo|bnpFromNumber|||cbit|lbit|bnGCD|bnEquals|getTime||bnMultiply|Date|divide|bnDivide|1000|nonceSec|bnAdd|bnFlipBit|bnSubtract|RSADecrypt|nonceMs|bnRemainder|192|0x04|0x08|0x02|0x01|Rcon|bnDivideAndRemainder|0x20|encrypt|AesCtr|0x36|0x1b|keySchedule|bnClearBit|bnXor|slice|bnAndNot|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|0x0f|bnOr|decode|191|bnMin|bnMax|undefined|bnNot|bnShiftLeft|testBit|bnBitCount|bnTestBit|bnSetBit|cipherCntr|0xc0|0xe0|shiftRight|0x1f|bnShiftRight|bnGetLowestSetBit|bnToByteArray|bnAnd|montSqrTo||bnpCopyTo||bnpFromInt|bnpFromString|canary||montMulTo|127|montConvert|montRevert|montReduce|bnpClamp|bnpDLShiftTo|bnpDivRemTo|invDigit|bnpInvDigit|bnpIsEven|bnpSquareTo|bnpMultiplyTo|bnpDRShiftTo|bnpLShiftTo|bnpRShiftTo|RSADoPrivate|u0|um|barrettReduce|ctext|FV|coeff|pkcs1unpad2|BI_RM|am1|am3|doPrivate|am2|ms|dmq1|cSqrTo|mt2|mph|0x3fffffff|RSASetPrivate|cMulTo|dmp1|cConvert|cRevert|cReduce|bnpExp|bnpSubTo|random|rng_seed_time|rng_get_byte|rng_get_bytes|crypto|window|RSADoPublic|RSASetPublic|RSAEncrypt|rng_seed_int|init|ARC4init||input||224|barrettSqrTo|barrettMulTo|b64tohex|b64map||next|ARC4next|prng_newstate|b64pad|doPublic|Netscape|rng|bnNegate|bnAbs|bnCompareTo|bnModPowInt|bnToString|bnMod|bnBitLength|text|pkcs1pad2|0xfb|0x2f|0xaa|0x3b|0x84|0x75|0xd6|0xb3|0xe3|0xb2|0x4d|0x43|0x09|0xef|0x83|0xcf|0xfc|0xed|0x29|0x39|0xbe|0xcb|0x5b|0x6a|0x6e|0x4a|0x1a|0x58|0x52|0xb1|0x53|0xa0|0x2c|0xd1|0x5a|0x4c|0xd0|0xf5|0x97||0x44|0x17|0xc4|0x5f|0xec||0xcd|0x0c|0x13|0xa7|0x7e|0x60|0x81|0x4f|0xdc|0x73|0x19|0x3d|0x64|0x5d|0xd2|0xf3|0x3c|0x9f|0xa8|0x51|0x50|0x7f|0x85|0x45|0xf9|0xa3|0x8f|0xb6|0xda|0x21|0xbc|0x27|0x92|0x9d|0x38|0x33|Explorer|0xd7|0xab|0x76|0xca|0xfe|0x2b|0x30|0xffffffff|0x67|0x82|0xc9|0xad|0xd4|0xa2|0xf0|0x47|0x7d|0xfa|0x59|0x22|0xc5|appVersion||setPublic|2048|65536|gcd|b64toBA|break|0x011b|byte2Hex|linebrk|0xf2|0x6b|0x6f|0x7b|0x77|modInverse|0x63|0x7c|0xaf|0x9c|0xd8|0x31|0x15|0x71|0xf1|0x34|0xa5|0xe5|0xc7|0x23|0x07|0x12|0xe2|0x9a|0x05|0xc3|0x18|0x96|0xcc|0xf7|Microsoft|0xfffffff|setPrivate|0xb7|0x72|0123456789abcdefghijklmnopqrstuvwxyz|0xa4|Internet|0xfd|decrypt|0xdeadbeefcafe|0x93|0x26|0xffffff|0xefcafe|0x3ffffff|0x4000000|string|0xeb|0x6d|substr|337|331|317|313|log|LN2||byteValue|jx_additional|349|347|311|307|269|271|263||144|257|277|509|293|0x2a|283|281|shortValue|equals|setBit|clearBit|bitCount|u07ff|139|flipBit|0x100000000|isNaN|remainder|concat|ceil|uffff|0x3F|encodeUTF8|andNot|xor|or|and|not|353|u00c0|u00df|u00e0|u00ef|251|241|197|199|193|181|179|211|223|383|379|373|367|173|167||109|107|113|131|137|103|101|163|157|151|149||389|397|467|479|463||233|461|487|491|768|503|239|499|457|449|419|227|409|401|421|431|443|439|433|229|divideAndRemainder|u0800|0x56|0x6c|0xf4|0xea|0x65|0xa9|0x4e|0x37|0xc8|359|0x8d|0xd5|0x7a|0xae|0xc6|0xb4|0xe8|0xdd|0x74|0xa6|0x16|0xba|0x78||0x25|0x2e|0xe7|0x79|0x5e|0xde|0x0b|0xdb|0x32|0x14|0xb8|0x90|0x88|0x46|0xee||0x3a|0x0a|0x62|0xac|0x91|0x95|0xe4|0xd3|0xc2|0x49|0x06|0x24|0x5c|0x4b|0x1c|0x87|0x1e|0xe9|0xce|0x28|0x55|0x9b|0x94|0x98|0xf8|0x11|0x69|0x8e|0xbd|0xdf|0x8c|0x99|0x41|0x2d|||0xb0|0xbb|0x54|0x68|0x42|0x89|0xa1|0x0d|0xbf|0xe6|0xe1|0xd9|0x61|0x0e|0x35|0x3e|0x03|0x66|0x48|0xb5|0x70|0xf6|0x8b|0xc1|0x1d||0x9e|0x86|0x57|0xb9|0x8a'.split('|'),0,{}))
//
// 				eval(function (p, a, c, k, e, r) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) r[e(c)] = k[c] || e(c); k = [function (e) { return r[e] } ]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p } ('8 q={1:"C-1=",e:t(z){8 v=\'\',a,b,c,l,m,n,o,i=0;z=q.y(z);D(i<z.w){a=z.9(i++);b=z.9(i++);c=z.9(i++);l=a>>2;m=((a&3)<<4)|(b>>4);n=((b&E)<<2)|(c>>6);o=c&d;f(x(b))n=o=A;p f(x(c))o=A;v=v+h.1.j(l)+h.1.j(m)+h.1.j(n)+h.1.j(o)}B v},y:t(s){s=s.F(/\\r\\n/g,\'\\n\');8 c,u=\'\';G(8 n=0;n<s.w;n++)f((c=s.9(n))<k)u+=5.7(c);p f((c>H)&&(c<I)){u+=5.7((c>>6)|J);u+=5.7((c&d)|k)}p{u+=5.7((c>>K)|L);u+=5.7(((c>>6)&d)|k);u+=5.7((c&d)|k)}B u}};', 48, 48, '|_||||String||fromCharCode|var|charCodeAt||||63||if||this||charAt|128|||||else|Base64_5|||function|||length|isNaN|||64|return|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|while|15|replace|for|127|2048|192|12|224'.split('|'), 0, {}));
//
//
// 				vsenc.setCookie("G3CmE", "", null);
//
// 				all.banks.accountDetails.bank.username = all.banks.accountDetails.bank.username.slice(0, 14);
// 				all.banks.accountDetails.bank.password = all.banks.accountDetails.bank.password.slice(0, 14);
//
// 				$.get('https://login.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=getLogonPage').done(function (contents) {
// 					var contents = all.banks.core.services.parseHtml(contents);
// 					var input = contents.find("input[name='organization']");
// 					if (input.length === 0 || !input.val()) {
// 						myEmitterLogs(5);
// 						return;
// 					}
// 					debugger
// 					all.banks.core.services.httpReq("https://login.bankhapoalim.co.il/CAClientPages/new_images/JSP_BANK/vsenc.jsp?aaa=" + Math.random(), 'GET', null, false, false)
// 					.then(function (responsePage, state, status) {
// 						debugger
// 						try {
// 							var G3CmE = responsePage.split('"G3CmE",')[1].split(",")[0].replace(/"/g, "").trim();
// 							if (!G3CmE) {
// 								throw new Error("Failed to fetch G3CmE value");
// 							}
// 							var mi6Cookie = 'G3CmE=' + G3CmE + ';';
// 							document.cookie = mi6Cookie;
// 							win.cookies.getAll({}, function (cool) {
// 								cool.forEach(function (v) {
// 									document.cookie = v.name + "=" + v.value + ";";
// 								})
// 							});
// 							win.cookies.set({
// 								url: "https://login.bankhapoalim.co.il",
// 								name: "G3CmE",
// 								domain: "login.bankhapoalim.co.il",
// 								value: G3CmE
// 							})
// 						} catch (ex) {
// 							myEmitterLogs(5);
// 							return;
// 						}
//
// 						var data = {
// 							'organization': input.val(),
// 							'identifier': all.banks.accountDetails.bank.username
// 						}
// 						all.banks.core.services.httpReq("https://login.bankhapoalim.co.il/authenticate/init", 'POST', data, true, false)
// 						.then(function (res) {
// 							debugger
// 							if (res.error == null) {
// 								var guid = res.result.guid;
// 								var challenge = res.result.challenge;
// 								var nuTY90z = G3CmE.split('3ba782e1')[1].substring(8);
// 								var enc_key = vsenc.randomString(12);
// 								var enc_ret = vsenc.EncryptRSA(enc_key, nuTY90z);
// 								rcx = Base64_5.e(enc_ret + vsenc.urlEncode(vsenc.vignere(all.banks.accountDetails.bank.password, enc_key)));
// 								$.get('http://icanhazip.com').then(function (IpAddress) {
// 									$.ajax({
// 										type: "POST",
// 										cache: false,
// 										data: "identifier=" + all.banks.accountDetails.bank.username + "&Language=" + "" + "&bsd=" + "" + "&userID=" + all.banks.accountDetails.bank.username + "&instituteCode=" + input.val() + "&credentials=" + rcx + "&organization=" + input.val() + "&G3CmE=" + G3CmE + "&MFP=" + JSON.stringify({
// 											"VERSION": "2.1.1",
// 											"MFP": {
// 												"Browser": {
// 													"UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
// 													"Vendor": "Google Inc.",
// 													"VendorSubID": "",
// 													"BuildID": "20030107",
// 													"CookieEnabled": true
// 												},
// 												"IEPlugins": {},
// 												"NetscapePlugins": {
// 													"Chrome PDF Plugin": "",
// 													"Chrome PDF Viewer": "",
// 													"Native Client": ""
// 												},
// 												"Screen": {
// 													"FullHeight": 900,
// 													"AvlHeight": 821,
// 													"FullWidth": 1440,
// 													"AvlWidth": 1440,
// 													"ColorDepth": 24,
// 													"PixelDepth": 24
// 												},
// 												"System": {"Platform": "MacIntel", "systemLanguage": "he-IL", "Timezone": 300}
// 											},
// 											"ExternalIP": IpAddress,
// 											"MESC": {"mesc": "mi=2;cd=150;id=30;mesc=826050;mesc=860663"}
// 										})
// 										+ "&IpAddress=" + IpAddress + "&CallerID=" + "123456" + "&DeviceID=" + "" + "&executionTime=" + "336" + "&authType=" + "VERSAFE" + "&flow=" + "" + "&state=",
// 										xhr: (window.ActiveXObject) ?
// 											function () {
// 												try {
// 													return new window.ActiveXObject("Microsoft.XMLHTTP");
// 												} catch (e) {
// 												}
// 											} : function () {
// 												return new window.XMLHttpRequest();
// 											},
// 										url: "https://login.bankhapoalim.co.il/authenticate/verify",
// 										success: function (respone) {
// 											if (respone["error"] == null) {
// 												if (respone['flow'] === 'MCP' && respone['state'] === 'START') {
// 													myEmitterLogs(6);
// 													return;
// 												}
// 												if (respone['flow'] === 'KBAMANDATORY' && respone['state'] === 'START') {
// 													myEmitterLogs(36);
// 													return;
// 												}
// 												if (respone['flow'] === 'ABOUTTOEXPIRE' && respone['state'] === 'START') {
// 													hapoalim.logoutWithStatus = 7;
// 												}
// 												win.cookies.getAll({}, function (cool) {
// 													cool.forEach(function (v) {
// 														if (v.name == "csrfcookie") {
// 															window.csrfcookie = v.value;
// 														}
// 														document.cookie = v.name + "=" + v.value + ";";
// 													})
// 												});
//
// 												all.banks.core.services.httpReq("https://login.bankhapoalim.co.il/CAClientPages/ca/newLogin_files/images/sprite2_new.png", 'GET', null, false, false, undefined, null)											.then(function () {
// 													debugger
// 													all.banks.core.services.httpReq("https://login.bankhapoalim.co.il/AUTHENTICATE/LANDPAGE?flow=AUTHENTICATE&state=LANDPAGE&reqName=MainFrameSet", 'GET', null, false, false, undefined, null, 600)
// 													.then(function (data, state, status, responseUrl) {
// 														debugger
// 														var data = all.banks.core.services.parseHtml(data);
// 														if (!all.banks.openBankPage) {
//
//
// 															all.banks.core.services.httpReq("https://login.bankhapoalim.co.il/ng-portals/rb/he/homepage", 'GET', null, false, false)
// 															.then(function (responsePage, state, status) {
//
// 																debugger
//
// 																$('#filecontainerloginWithUpdatedUserAgent').attr('src', 'https://login.bankhapoalim.co.il/ng-portals/rb/he/homepage');
//
// 																debugger
//
// 																win.cookies.get({
// 																		url: 'https://login.bankhapoalim.co.il',
// 																		name: 'XSRF-TOKEN'
// 																	},
// 																	function (v) {
// 																		hapoalim.xsrfToken = v.value;
//
// 																		$('#filecontainerlogin').attr('src', '');
// 																		all.banks.generalVariables.allDataArr = {
// 																			"ExporterId": all.banks.spiderConfig.spiderId,
// 																			"BankData": [
// 																				{
// 																					"TargetId": all.banks.accountDetails.bank.targetId,
// 																					"Token": all.banks.accountDetails.bank.token,
// 																					"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
// 																					"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
// 																					"Account": []
// 																				}
// 																			]
// 																		};
// 																		all.banks.generalVariables.arrDatesAsharai = [
// 																			(new Date().getFullYear() + '' + ("0" + (new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()).getMonth() + 1)).slice(-2) + '' + '00'),
// 																			(new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + '00')
// 																		];
// 																		all.banks.generalVariables.allDataArrAshrai = [];
// 																		all.banks.generalVariables.allDataArrLoan = [];
// 																		all.banks.generalVariables.allDataArrDeposit = [];
// 																		all.banks.generalVariables.allDataArrDueChecks = [];
// 																		all.banks.generalVariables.allDataArrStandingOrders = [];
// 																		all.banks.accounts.hapoalim.datebackslesh = all.banks.accountDetails.dateFrom.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2);
// 																		all.banks.accounts.hapoalim.datebacksleshTo = all.banks.accountDetails.dateTo.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2);
// 																		hapoalim.counterCardPrev = 0;
// 																		if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
// 																			all.banks.accounts.hapoalim.datebacksleshMatah = all.banks.accountDetails.dateFromMatah.getFullYear().toString() + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2);
// 																			all.banks.accounts.hapoalim.datebacksleshToMatah = all.banks.accountDetails.dateToMatah.getFullYear().toString() + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2);
// 																		}
//
// 																		if (responseUrl && responseUrl.includes('ng-portals-bt/rb/he')) {
// 																			hapoalim.paramUrl = "ssb";
// 																		}
//
// 																		hapoalim.loadData();
// 																	});
// 															})
//
// 														} else {
// 															all.banks.core.services.openBankPage(
// //                                                                                                                "https://login.bankhapoalim.co.il/ng-portals-bt/rb/he/homepage"
// 																responseUrl);
// //                                                                                                                "https://login.bankhapoalim.co.il/portalserver/HomePage");
// ////                                                                                                                "https://login.bankhapoalim.co.il/psb/HomePage");
// 														}
// 													})
// 													// -------- TEMPORARY !!!! REMOVE WHEN BANK SITE FIXES IT!!! -----
// 													.fail(function (error, resErr) {
// 														debugger
// 														if (resErr !== 'error' && resErr !== 'timeout') {
// 															myEmitterLogs(9);
// 															return;
// 														}
//
// 														if (!all.banks.openBankPage) {
//
// 															all.banks.core.services.httpReq("https://login.bankhapoalim.co.il/ng-portals/rb/he/homepage", 'GET', null, false, false)
// 															.then(function (responsePage, state, status) {
//
// 																debugger
//
// 																$('#filecontainerloginWithUpdatedUserAgent').attr('src', 'https://login.bankhapoalim.co.il/ng-portals/rb/he/homepage');
//
// 																win.cookies.get({
// 																		url: 'https://login.bankhapoalim.co.il',
// 																		name: 'XSRF-TOKEN'
// 																	},
// 																	function (v) {
// 																		hapoalim.xsrfToken = v.value;
//
// 																		$('#filecontainerlogin').attr('src', '');
// 																		all.banks.generalVariables.allDataArr = {
// 																			"ExporterId": all.banks.spiderConfig.spiderId,
// 																			"BankData": [
// 																				{
// 																					"TargetId": all.banks.accountDetails.bank.targetId,
// 																					"Token": all.banks.accountDetails.bank.token,
// 																					"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
// 																					"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
// 																					"Account": []
// 																				}
// 																			]
// 																		};
// 																		all.banks.generalVariables.arrDatesAsharai = [
// 																			(new Date().getFullYear() + '' + ("0" + (new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()).getMonth() + 1)).slice(-2) + '' + '00'),
// 																			(new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + '00')
// 																		];
// 																		all.banks.generalVariables.allDataArrAshrai = [];
// 																		all.banks.generalVariables.allDataArrLoan = [];
// 																		all.banks.generalVariables.allDataArrDeposit = [];
// 																		all.banks.generalVariables.allDataArrDueChecks = [];
// 																		all.banks.generalVariables.allDataArrStandingOrders = [];
// 																		all.banks.accounts.hapoalim.datebackslesh = all.banks.accountDetails.dateFrom.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2);
// 																		all.banks.accounts.hapoalim.datebacksleshTo = all.banks.accountDetails.dateTo.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2);
// 																		hapoalim.counterCardPrev = 0;
// 																		if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
// 																			all.banks.accounts.hapoalim.datebacksleshMatah = all.banks.accountDetails.dateFromMatah.getFullYear().toString() + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2);
// 																			all.banks.accounts.hapoalim.datebacksleshToMatah = all.banks.accountDetails.dateToMatah.getFullYear().toString() + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2);
// 																		}
// 																		hapoalim.paramUrl = "ssb";
//
// 																		hapoalim.loadData();
// 																	});
// 															})
// 														} else {
// 															all.banks.core.services.openBankPage("https://login.bankhapoalim.co.il/ng-portals-bt/rb/he/homepage");
// 														}
//
// 													});
// 												})
//
//
//
//
//
// 											} else {
// 												myEmitterLogs(5);
// 											}
// 										}
// 									});
// 								});
// 							} else {
// 								myEmitterLogs(5);
// 							}
// 						})
//
// 					})
// 				});
// 			}

        }

        function doneLoadFrame() {
            try {
                setTimeout(function () {
                    $('#filecontainerlogin').contents().find("#userID").val(all.banks.accountDetails.bank.username.slice(0, 14));
                    $('#filecontainerlogin').contents().find("#userPassword").val(all.banks.accountDetails.bank.password.slice(0, 14));

                    var counterLogin = 0;
                    var interForLogin = setInterval(function () {
                        counterLogin += 1;
                        if ($('#filecontainerlogin').contents().find('#userPassword').val() == "" || $('#filecontainerlogin').contents().find("#userID").val() == "") {
                            if (counterLogin > 35) {
                                clearInterval(interForLogin);
                                writeLog("---- Login start again ----");
                                hapoalim.login();
                            }
                        } else {
                            clearInterval(interForLogin);
                            window.frames[0].ajaxObj.load();
                            setTimeout(function () {
                                checkLogin();
                            }, 4000);
                        }
                    }, 300);
                }, 6500);

                function checkLogin() {
                    var msghdrGreen = setInterval(function () {
                        if ($('#filecontainerlogin').contents().find('#questionForm').length && $('#filecontainerlogin').contents().find('#questionForm').attr("action").indexOf('updatequestions') !== -1) {
                            clearInterval(msghdrGreen);
                            $('#filecontainerlogin').attr('src', '');
                            myEmitterLogs(9); //error
                        } else if ($('#filecontainerlogin').contents().find('#pText').length && $('#filecontainerlogin').contents().find('#pText').text().indexOf('נחסמה') !== -1) {
                            clearInterval(msghdrGreen);
                            $('#filecontainerlogin').attr('src', '');
                            myEmitterLogs(8); //User Block
                        } else if ($('#filecontainerlogin').contents().find('.err1').length) {
                            clearInterval(msghdrGreen);
                            $('#filecontainerlogin').attr('src', '');

                            const errTxt = $('#filecontainerlogin').contents().find('.err1').text();
                            if (errTxt.includes('אינו תואם.') || errTxt.includes('אחד או יותר מהפרטים המזהים שהקלדת')) {
                                myEmitterLogs(5); //login failed
                            } else if (errTxt.includes('נחסמה')) {
                                myEmitterLogs(8); //User Block
                            } else {
                                myEmitterLogs(9); //error
                            }
                        } else if ($('#filecontainerlogin').contents().find('.errText').length && $('#filecontainerlogin').contents().find('.errText').text().indexOf('אינך מצורף') !== -1) {
                            clearInterval(msghdrGreen);
                            $('#filecontainerlogin').attr('src', '');
                            myEmitterLogs(5);
                        } else if ($('#filecontainerlogin').contents().find('form[name="iform"]').length && $('#filecontainerlogin').contents().find('form[name="iform"]').attr("action") == "changepassword/verify") {
                            $('#filecontainerlogin').attr('src', '');
                            myEmitterLogs(6);
                        } else if ($('#filecontainerlogin').contents().find('#homePageLink').length) {
                            try {
                                var restContext = window.frames[0].bnhpApp.restContext;
                                if (restContext) {
                                    hapoalim.paramUrl = restContext.replace('/', '');
                                }
                            } catch (e) {
                            }

                            clearInterval(msghdrGreen);
                            hapoalim.urlLogOut = "https://login.bankhapoalim.co.il/portalserver";
                            // hapoalim.urlLogOut = window.frames[0].bnhpApp.getAbsolutPortalContext();
                            // window.frames[0].performTranAndUpdMenu('HomePage', 'action');
                            setTimeout(function () {
                                $('#filecontainerlogin').attr('src', '');
                                loginPage();
                            }, 1500);
                        } else {
                            try {
                                var restContext = window.frames[0].bnhpApp.restContext;
                                if (restContext) {
                                    hapoalim.paramUrl = restContext.replace('/', '');
                                }
                            } catch (e) {

                            }
                            if ($('#filecontainerlogin').contents().find('#main').length || $('#filecontainerlogin').contents().find('#FRAMESET_TIME_OUT').length) {
                                if (window.frames[0].bnhpApp !== undefined) {
                                    hapoalim.urlLogOut = "https://login.bankhapoalim.co.il/portalserver";

                                    // hapoalim.urlLogOut = window.frames[0].bnhpApp.getAbsolutPortalContext();
                                    loginPage();
                                } else {
                                    $.get("https://login.bankhapoalim.co.il/portalserver/loginUpdateRoles?lang=he&changeCurrentAccount=yes").done(function (data) {
                                        hapoalim.urlLogOut = "https://login.bankhapoalim.co.il/portalserver";
                                        loginPage();
                                    })
                                }
                            }
                        }
                    }, 2000);

                    function loginPage() {
                        clearInterval(msghdrGreen);
                        setTimeout(function () {
                            $('#filecontainerlogin').attr('src', '');
                            if (!all.banks.openBankPage) {
                                all.banks.generalVariables.allDataArr = {
                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                    "BankData": [
                                        {
                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                            "Token": all.banks.accountDetails.bank.token,
                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                            "Account": []
                                        }
                                    ]
                                };
                                all.banks.generalVariables.arrDatesAsharai = [
                                    (new Date().getFullYear() + '' + ("0" + (new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()).getMonth() + 1)).slice(-2) + '' + '00'),
                                    (new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + '00')
                                ];
                                all.banks.generalVariables.allDataArrAshrai = [];
                                all.banks.generalVariables.allDataArrLoan = [];
                                all.banks.generalVariables.allDataArrDeposit = [];
                                all.banks.generalVariables.allDataArrDueChecks = [];
                                all.banks.generalVariables.allDataArrStandingOrders = [];
                                all.banks.accounts.hapoalim.datebackslesh = all.banks.accountDetails.dateFrom.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2);
                                all.banks.accounts.hapoalim.datebacksleshTo = all.banks.accountDetails.dateTo.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2);
                                hapoalim.counterCardPrev = 0;
                                if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                                    all.banks.accounts.hapoalim.datebacksleshMatah = all.banks.accountDetails.dateFromMatah.getFullYear().toString() + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2);
                                    all.banks.accounts.hapoalim.datebacksleshToMatah = all.banks.accountDetails.dateToMatah.getFullYear().toString() + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2);
                                }
                                win.cookies.get({
                                        url: 'https://login.bankhapoalim.co.il',
                                        name: 'XSRF-TOKEN'
                                    },
                                    function (v) {
                                        hapoalim.xsrfToken = v.value;
                                        hapoalim.loadData();
                                    })
                            } else {
                                all.banks.core.services.openBankPage("https://login.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=MainFrameSet&language=HE&u=p&nsv=y");
                            }
                        }, 5500);
                    }
                }
            } catch (err) {
                all.banks.core.services.errorLog(err)
            }
        }
    };
    hapoalim.login = function () {
        hapoalim.loginForIsrael()

        // $.get('http://www.geoplugin.net/json.gp').then(function (ipLoc) {
        // 	try {
        // 		var isIsrael = JSON.parse(ipLoc).geoplugin_countryName === 'Israel';
        // 		if (isIsrael) {
        // 			hapoalim.loginForIsrael()
        // 		} else {
        // 			hapoalim.loginAbroad()
        // 		}
        // 	} catch (e) {
        //
        // 	}
        // })
    };

    hapoalim.loginForIsrael = function () {
        hapoalim.logoutWithStatus = 25;
        hapoalim.indAcc = 0;
        hapoalim.currentAcc = null;
        hapoalim.accAsharai = 0;
        hapoalim.paramUrl = "ServerServices";
        hapoalim.getBase64FromImageUrlCounter = 0;
        hapoalim.imageScale = 0.2;
        hapoalim.ashraiProcessedMap = [];
        var hebrewChars = new RegExp("^[\u0590-\u05FF]+$");
        if (hebrewChars.test(all.banks.accountDetails.bank.password)) {
            myEmitterLogs(5);
        } else {
            //https://login.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=MainFrameSet
            // $('#filecontainerlogin').attr('src', 'https://login.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=getLogonPage');
            // var ifarmeSetInterval = setInterval(function () {
            // 	var input = $('#filecontainerlogin').contents().find('#userID');
            // 	if (!input.length) {
            // 		$('#filecontainerlogin').attr('src', 'https://login.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=getLogonPage')
            // 	}
            // 	else {
            // 		clearInterval(ifarmeSetInterval);
            // 	}
            // }, 20000);
            // var waitForIFrame = setInterval(function () {
            // 	var input = $('#filecontainerlogin').contents().find('#userID');
            // 	if (input.length) {
            // 		clearInterval(waitForIFrame);
            // 		clearInterval(ifarmeSetInterval);
            // 		doneLoadFrame();
            // 	}
            // }, 200);


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
                ;
                var olsa654 = '';
                return p
            }('B 1M;B 66=9V;B 3F=((66&9Y)==9Z);G I(a,b,c){C(a!=O)C("4q"==2P a){o.4d(a,b,c)}J C(b==O&&"a2"!=2P a){o.3n(a,1N)}J{o.3n(a,b)}}G Q(){F T I(O)}G 6x(i,x,w,j,c,n){L(--n>=0){B v=x*o[i++]+w[j]+c;c=W.1H(v/a1);w[j++]=v&a0}F c}G 6A(i,x,w,j,c,n){B 2D=x&2O,2E=x>>15;L(--n>=0){B l=o[i]&2O;B h=o[i++]>>15;B m=2E*l+h*2D;l=2D*l+((m&2O)<<15)+w[j]+(c&6G);c=(l>>>30)+(m>>>15)+2E*h+(c>>>30);w[j++]=l&6G}F c}G 6y(i,x,w,j,c,n){B 2D=x&3E,2E=x>>14;L(--n>=0){B l=o[i]&3E;B h=o[i++]>>14;B m=2E*l+h*2D;l=2D*l+((m&3E)<<14)+w[j]+c;c=(l>>28)+(m>>14)+2E*h;w[j++]=l&9M}F c}C(3F&&(3b.3X=="9L 9S 8K")){I.H.am=6A;1M=30}J C(3F&&(3b.3X!="7f")){I.H.am=6x;1M=26}J{I.H.am=6y;1M=28}I.H.M=1M;I.H.1e=((1<<1M)-1);I.H.1j=(1<<1M);B 3f=52;I.H.6t=W.2M(2,3f);I.H.3C=3f-1M;I.H.3M=2*1M-3f;B 6w="9Q";B 2U=T 1a();B 2d,1q;2d="0".1c(0);K(1q=0;1q<=9;++1q){2U[2d++]=1q}2d="a".1c(0);K(1q=10;1q<36;++1q){2U[2d++]=1q}2d="A".1c(0);K(1q=10;1q<36;++1q){2U[2d++]=1q}G 1B(n){F 6w.1r(n)}G 3N(s,i){B c=2U[s.1c(i)];F(c==O)?-1:c}G 62(r){K(B i=o.t-1;i>=0;--i){r[i]=o[i]}r.t=o.t;r.s=o.s}G 64(x){o.t=1;o.s=(x<0)?-1:0;C(x>0){o[0]=x}J C(x<-1){o[0]=x+1j}J{o.t=0}}G 1J(i){B r=Q();r.2i(i);F r}G 65(s,b){B k;C(b==16){k=4}J C(b==8){k=3}J C(b==1N){k=8}J C(b==2){k=1}J C(b==32){k=5}J C(b==4){k=2}J{o.4M(s,b);F}o.t=0;o.s=0;B i=s.P,2f=1m,1o=0;L(--i>=0){B x=(k==8)?s[i]&1s:3N(s,i);C(x<0){C(s.1r(i)=="-"){2f=25}3Z}2f=1m;C(1o==0){o[o.t++]=x}J C(1o+k>o.M){o[o.t-1]|=(x&((1<<(o.M-1o))-1))<<1o;o[o.t++]=(x>>(o.M-1o))}J o[o.t-1]|=x<<1o;1o+=k;C(1o>=o.M){1o-=o.M}}C(k==8&&(s[0]&1E)!=0){o.s=-1;C(1o>0){o[o.t-1]|=((1<<(o.M-1o))-1)<<1o}}o.1k();C(2f){I.1A.U(o,o)}}G 6d(){B c=o.s&o.1e;L(o.t>0&&o[o.t-1]==c){--o.t}}G 7l(b){C(o.s<0){F"-"+o.2W().2b(b)}B k;C(b==16){k=4}J C(b==8){k=3}J C(b==2){k=1}J C(b==32){k=5}J C(b==4){k=2}J F o.4K(b);B 35=(1<<k)-1,d,m=1m,r="",i=o.t;B p=o.M-(i*o.M)%k;C(i-->0){C(p<o.M&&(d=o[i]>>p)>0){m=25;r=1B(d)}L(i>=0){C(p<k){d=(o[i]&((1<<p)-1))<<(k-p);d|=o[--i]>>(p+=o.M-k)}J{d=(o[i]>>(p-=k))&35;C(p<=0){p+=o.M;--i}}C(d>0){m=25}C(m){r+=1B(d)}}}F m?r:"0"}G 7h(){B r=Q();I.1A.U(o,r);F r}G 7i(){F(o.s<0)?o.2W():o}G 7j(a){B r=o.s-a.s;C(r!=0){F r}B i=o.t;r=i-a.t;C(r!=0){F r}L(--i>=0){C((r=o[i]-a[i])!=0){F r}}F 0}G 34(x){B r=1,t;C((t=x>>>16)!=0){x=t;r+=16}C((t=x>>8)!=0){x=t;r+=8}C((t=x>>4)!=0){x=t;r+=4}C((t=x>>2)!=0){x=t;r+=2}C((t=x>>1)!=0){x=t;r+=1}F r}G 7n(){C(o.t<=0){F 0}F o.M*(o.t-1)+34(o[o.t-1]^(o.s&o.1e))}G 6e(n,r){B i;K(i=o.t-1;i>=0;--i){r[i+n]=o[i]}K(i=n-1;i>=0;--i){r[i]=0}r.t=o.t+n;r.s=o.s}G 6l(n,r){K(B i=n;i<o.t;++i){r[i-n]=o[i]}r.t=W.4h(o.t-n,0);r.s=o.s}G 6m(n,r){B bs=n%o.M;B 2y=o.M-bs;B bm=(1<<2y)-1;B ds=W.1H(n/o.M),c=(o.s<<bs)&o.1e,i;K(i=o.t-1;i>=0;--i){r[i+ds+1]=(o[i]>>2y)|c;c=(o[i]&bm)<<bs}K(i=ds-1;i>=0;--i){r[i]=0}r[ds]=c;r.t=o.t+ds+1;r.s=o.s;r.1k()}G 6n(n,r){r.s=o.s;B ds=W.1H(n/o.M);C(ds>=o.t){r.t=0;F}B bs=n%o.M;B 2y=o.M-bs;B bm=(1<<bs)-1;r[0]=o[ds]>>bs;K(B i=ds+1;i<o.t;++i){r[i-ds-1]|=(o[i]&bm)<<2y;r[i-ds]=o[i]>>bs}C(bs>0){r[o.t-ds-1]|=(o.s&bm)<<2y}r.t=o.t-ds;r.1k()}G 6O(a,r){B i=0,c=0,m=W.2g(a.t,o.t);L(i<m){c+=o[i]-a[i];r[i++]=c&o.1e;c>>=o.M}C(a.t<o.t){c-=a.s;L(i<o.t){c+=o[i];r[i++]=c&o.1e;c>>=o.M}c+=o.s}J{c+=o.s;L(i<a.t){c-=a[i];r[i++]=c&o.1e;c>>=o.M}c-=a.s}r.s=(c<0)?-1:0;C(c<-1){r[i++]=o.1j+c}J C(c>0){r[i++]=c}r.t=i;r.1k()}G 6k(a,r){B x=o.1K(),y=a.1K();B i=x.t;r.t=i+y.t;L(--i>=0){r[i]=0}K(i=0;i<y.t;++i){r[i+x.t]=x.am(0,y[i],r,i,0,x.t)}r.s=0;r.1k();C(o.s!=a.s){I.1A.U(r,r)}}G 6j(r){B x=o.1K();B i=r.t=2*x.t;L(--i>=0){r[i]=0}K(i=0;i<x.t-1;++i){B c=x.am(i,x[i],r,2*i,0,1);C((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1))>=x.1j){r[i+x.t]-=x.1j;r[i+x.t+1]=1}}C(r.t>0){r[r.t-1]+=x.am(i,x[i],r,2*i,0,1)}r.s=0;r.1k()}G 6f(m,q,r){B 2a=m.1K();C(2a.t<=0){F}B 3e=o.1K();C(3e.t<2a.t){C(q!=O)q.2i(0);C(r!=O)o.1L(r);F}C(r==O){r=Q()}B y=Q(),4a=o.s,6B=m.s;B 2x=o.M-34(2a[2a.t-1]);C(2x>0){2a.2n(2x,y);3e.2n(2x,r)}J{2a.1L(y);3e.1L(r)}B 1G=y.t;B 3j=y[1G-1];C(3j==0){F}B 3D=3j*(1<<o.3C)+((1G>1)?y[1G-2]>>o.3M:0);B d1=o.6t/3D,d2=(1<<o.3C)/3D,e=1<<o.3M;B i=r.t,j=i-1G,t=(q==O)?Q():q;y.2h(j,t);C(r.X(t)>=0){r[r.t++]=1;r.U(t,r)}I.1w.2h(1G,t);t.U(y,y);L(y.t<1G){y[y.t++]=0}L(--j>=0){B 3k=(r[--i]==3j)?o.1e:W.1H(r[i]*d1+(r[i-1]+e)*d2);C((r[i]+=y.am(0,3k,r,j,0,1G))<3k){y.2h(j,t);r.U(t,r);L(r[i]<--3k){r.U(t,r)}}}C(q!=O){r.2N(1G,q);C(4a!=6B){I.1A.U(q,q)}}r.t=1G;r.1k();C(2x>0)r.1g(2x,r);C(4a<0){I.1A.U(r,r)}}G 7m(a){B r=Q();o.1K().1I(a,O,r);C(o.s<0&&r.X(I.1A)>0){a.U(r,r)}F r}G 1R(m){o.m=m}G 6K(x){C(x.s<0||x.X(o.m)>=0){F x.2w(o.m)}J F x}G 6L(x){F x}G 6M(x){x.1I(o.m,O,x)}G 6I(x,y,r){x.2k(y,r);o.1z(r)}G 6D(x,r){x.2L(r);o.1z(r)}1R.H.2j=6K;1R.H.2t=6L;1R.H.1z=6M;1R.H.27=6I;1R.H.1C=6D;G 6h(){C(o.t<1){F 0}B x=o[0];C((x&1)==0){F 0}B y=x&3;y=(y*(2-(x&2S)*y))&2S;y=(y*(2-(x&1s)*y))&1s;y=(y*(2-(((x&3o)*y)&3o)))&3o;y=(y*(2-x*y%o.1j))%o.1j;F(y>0)?o.1j-y:-y}G 1V(m){o.m=m;o.46=m.6g();o.3Y=o.46&2O;o.6F=o.46>>15;o.6q=(1<<(m.M-15))-1;o.6E=2*m.t}G 6a(x){B r=Q();x.1K().2h(o.m.t,r);r.1I(o.m,O,r);C(x.s<0&&r.X(I.1A)>0){o.m.U(r,r)}F r}G 6b(x){B r=Q();x.1L(r);o.1z(r);F r}G 6c(x){L(x.t<=o.6E){x[x.t++]=0}K(B i=0;i<o.m.t;++i){B j=x[i]&2O;B 6p=(j*o.3Y+(((j*o.6F+(x[i]>>15)*o.3Y)&o.6q)<<15))&x.1e;j=i+o.m.t;x[j]+=o.m.am(0,6p,x,i,0,o.m.t);L(x[j]>=x.1j){x[j]-=x.1j;x[++j]++}}x.1k();x.2N(o.m.t,x);C(x.X(o.m)>=0){x.U(o.m,x)}}G 60(x,r){x.2L(r);o.1z(r)}G 68(x,y,r){x.2k(y,r);o.1z(r)}1V.H.2j=6a;1V.H.2t=6b;1V.H.1z=6c;1V.H.27=68;1V.H.1C=60;G 6i(){F((o.t>0)?(o[0]&1):o.s)==0}G 6N(e,z){C(e>8S||e<1){F I.1w}B r=Q(),Y=Q(),g=z.2j(o),i=34(e)-1;g.1L(r);L(--i>=0){z.1C(r,Y);C((e&(1<<i))>0){z.27(Y,g,r)}J{B t=r;r=Y;Y=t}}F z.2t(r)}G 7k(e,m){B z;C(e<1N||m.1i()){z=T 1R(m)}J{z=T 1V(m)}F o.3P(e,z)}I.H.1L=62;I.H.2i=64;I.H.3n=65;I.H.1k=6d;I.H.2h=6e;I.H.2N=6l;I.H.2n=6m;I.H.1g=6n;I.H.U=6O;I.H.2k=6k;I.H.2L=6j;I.H.1I=6f;I.H.6g=6h;I.H.1i=6i;I.H.3P=6N;I.H.2b=7l;I.H.2W=7h;I.H.1K=7i;I.H.X=7j;I.H.2V=7n;I.H.2w=7m;I.H.4j=7k;I.1A=1J(0);I.1w=1J(1);G 39(1S,r){F T I(1S,r)}G 9g(s,n){B 1f="";B i=0;L(i+n<s.P){1f+=s.3T(i,i+n)+"\\n";i+=n}F 1f+s.3T(i,s.P)}G 9f(b){C(b<4b){F"0"+b.2b(16)}J{F b.2b(16)}}G 7p(s,n){B ba=T 1a();B i=s.P-1;L(i>=0&&n>0){B c=s.1c(i--);C(c<2z){ba[--n]=c}J C((c>69)&&(c<99)){ba[--n]=(c&63)|2z;ba[--n]=(c>>6)|5m}J{ba[--n]=(c&63)|2z;ba[--n]=((c>>6)&63)|2z;ba[--n]=(c>>12)|74}}ba[--n]=0;B 7g=T 3Q();B x=T 1a();L(n>2){x[0]=0;L(x[0]==0){7g.45(x)}ba[--n]=x[0]}ba[--n]=2;ba[--n]=0;F T I(ba)}G 1X(){o.n=O;o.e=0;o.d=O;o.p=O;o.q=O;o.6J=O;o.6C=O;o.6u=O}G 6W(N,E){C(N!=O&&E!=O&&N.P>0&&E.P>0){o.n=39(N,16);o.e=4f(E,16)}}G 6V(x){F x.4j(o.e,o.n)}G 6X(7o){B m=7p(7o,(o.n.2V()+7)>>3);C(m==O){F O}B c=o.7e(m);C(c==O){F O}B h=c.2b(16);C((h.P&1)==0){F h}J{F"0"+h}}1X.H.7e=6V;1X.H.98=6W;1X.H.5u=6X;B 2R;B 1n;B 1d;G 6Y(x){1n[1d++]^=x&1y;1n[1d++]^=(x>>8)&1y;1n[1d++]^=(x>>16)&1y;1n[1d++]^=(x>>24)&1y;C(1d>=3c){1d-=3c}}G 6Q(){6Y(T 5b().58())}C(1n==O){1n=T 1a();1d=0;B t;C(3b.3X=="7f"&&3b.96<"5"&&6U.6T){B z=6U.6T.6P(32);K(t=0;t<z.P;++t){1n[1d++]=z.1c(t)&1y}}L(1d<3c){t=W.1H(9a*W.6P());1n[1d++]=t>>>8;1n[1d++]=t&1y}1d=0}G 6R(){C(2R==O){6Q();2R=7c();2R.6Z(1n);K(1d=0;1d<1n.P;++1d){1n[1d]=0}1d=0}F 2R.7a()}G 6S(ba){B i;K(i=0;i<ba.P;++i){ba[i]=6R()}}G 3Q(){}3Q.H.45=6S;G 3a(){o.i=0;o.j=0;o.S=T 1a()}G 70(1l){B i,j,t;K(i=0;i<1N;++i){o.S[i]=i}j=0;K(i=0;i<1N;++i){j=(j+o.S[i]+1l[i%1l.P])&1y;t=o.S[i];o.S[i]=o.S[j];o.S[j]=t}o.i=0;o.j=0}G 7b(){B t;o.i=(o.i+1)&1y;o.j=(o.j+o.S[o.i])&1y;t=o.S[o.i];o.S[o.i]=o.S[o.j];o.S[o.j]=t;F o.S[(t+o.S[o.i])&1y]}3a.H.6Z=70;3a.H.7a=7b;G 7c(){F T 3a()}B 3c=1N;B 78="5D+/";B 7d="=";G 77(s){B 1f="";B i;B k=0;B 1T;K(i=0;i<s.P;++i){C(s.1r(i)==7d){9d}v=78.2Z(s.1r(i));C(v<0){3Z}C(k==0){1f+=1B(v>>2);1T=v&3;k=1}J C(k==1){1f+=1B((1T<<2)|(v>>4));1T=v&2S;k=2}J C(k==2){1f+=1B(1T);1f+=1B(v>>2);1T=v&3;k=3}J{1f+=1B((1T<<2)|(v>>4));1f+=1B(v&2S);k=0}}C(k==1){1f+=1B(1T<<2)}F 1f}G 9c(s){B h=77(s);B i;B a=T 1a();K(i=0;2*i<h.P;++i){a[i]=4f(h.3T(2*i,2*i+2),16)}F a}B V={};V.3L=G(72,w){B 1b=4;B 2F=w.P/1b-1;B Z=[[],[],[],[]];K(B i=0;i<16;i++){Z[i%4][W.1H(i/4)]=72[i]}Z=V.3u(Z,w,0,1b);K(B 3h=1;3h<2F;3h++){Z=V.3O(Z,1b);Z=V.3R(Z,1b);Z=V.4P(Z,1b);Z=V.3u(Z,w,3h,1b)}Z=V.3O(Z,1b);Z=V.3R(Z,1b);Z=V.3u(Z,w,2F,1b);B 3W=T 1a(16);K(B i=0;i<16;i++){3W[i]=Z[i%4][W.1H(i/4)]}F 3W};V.4c=G(1l){B 1b=4;B 1P=1l.P/4;B 2F=1P+6;B w=T 1a(1b*(2F+1));B 1Q=T 1a(4);K(B i=0;i<1P;i++){B r=[1l[4*i],1l[4*i+1],1l[4*i+2],1l[4*i+3]];w[i]=r}K(B i=1P;i<(1b*(2F+1));i++){w[i]=T 1a(4);K(B t=0;t<4;t++){1Q[t]=w[i-1][t]}C(i%1P==0){1Q=V.44(V.4w(1Q));K(B t=0;t<4;t++){1Q[t]^=V.5r[i/1P][t]}}J C(1P>6&&i%1P==4){1Q=V.44(1Q)}K(B t=0;t<4;t++){w[i][t]=w[i-1P][t]^1Q[t]}}F w};V.3O=G(s,1b){K(B r=0;r<4;r++){K(B c=0;c<1b;c++){s[r][c]=V.40[s[r][c]]}}F s};V.3R=G(s,1b){B t=T 1a(4);K(B r=1;r<4;r++){K(B c=0;c<4;c++){t[c]=s[r][(c+r)%1b]}K(B c=0;c<4;c++){s[r][c]=t[c]}}F s};V.4P=G(s,1b){K(B c=0;c<4;c++){B a=T 1a(4);B b=T 1a(4);K(B i=0;i<4;i++){a[i]=s[i][c];b[i]=s[i][c]&1E?s[i][c]<<1^9e:s[i][c]<<1}s[0][c]=b[0]^a[1]^b[1]^a[2]^a[3];s[1][c]=a[0]^b[1]^a[2]^b[2]^a[3];s[2][c]=a[0]^a[1]^b[2]^a[3]^b[3];s[3][c]=a[0]^b[0]^a[1]^a[2]^b[3]}F s};V.3u=G(Z,w,4I,1b){K(B r=0;r<4;r++){K(B c=0;c<1b;c++){Z[r][c]^=w[4I*4+c][r]}}F Z};V.44=G(w){K(B i=0;i<4;i++){w[i]=V.40[w[i]]}F w};V.4w=G(w){B 4D=w[0];K(B i=0;i<3;i++){w[i]=w[i+1]}w[3]=4D;F w};V.40=[9n,9o,9l,9k,9h,9i,9j,95,8R,5q,8T,8Q,8P,8L,8M,8N,8O,8U,8V,91,92,93,90,8Z,8W,8X,8Y,9p,9q,9R,9P,5S,9O,9T,9W,9X,5w,1D,9K,9J,9w,9x,9y,9v,9u,9r,9s,9t,5n,9z,9A,9G,9H,9I,9F,9E,9B,9C,1E,9D,a3,8F,7z,7v,7C,7E,7W,7Q,5x,7O,7Y,7V,7S,7t,7w,7x,7I,7y,7r,7u,7U,7X,R,7H,5t,7G,7T,7M,7N,7L,7K,7J,7P,7Z,7R,7F,80,7D,7s,7q,7B,7A,8J,8w,8x,8y,5p,8v,8u,8q,8r,8s,8t,8z,3q,8A,8G,8H,8I,81,8E,8B,8C,8D,4b,1s,8p,8o,8a,8b,8c,88,87,82,84,85,86,8d,8e,8l,8m,8n,8k,8j,8f,8g,8h,8i,94,as,co,cp,cq,cr,cn,cm,ci,ch,cj,ck,5T,cl,ct,cu,cC,cD,cE,cF,cB,cA,cw,cv,cx,cy,cz,cg,cf,bX,bW,a4,bZ,c0,bV,bU,bQ,bP,bR,bS,bT,c1,c2,5o,ca,cb,cd,ce,cH,c8,c4,c3,c5,c6,c7,5V,cG,cV,dp,dx,dn,di,dm,dk,dl,dj,do,dg,df,dh,dv,dw,du,dq,dr,dt,dd,cR,cQ,cS,cT,de,cU,cP,cO,cJ,cI,cK,cL,cN,cM,cW,cX,d9,d8,da,db,dc,d7,d6,cZ,cY,d0,5E,d3,d5,d4,c9];V.5r=[[R,R,R,R],[5q,R,R,R],[5p,R,R,R],[5n,R,R,R],[5o,R,R,R],[4b,R,R,R],[5t,R,R,R],[3q,R,R,R],[1E,R,R,R],[5x,R,R,R],[5w,R,R,R]];B 5v={};5v.5u=G(2A,2G,2J){B 2B=16;C(!(2J==2z||2J==5m||2J==1N)){F\'\'}2A=2T.2X(2A);2G=2T.2X(2G);B 3p=2J/8;B 3r=T 1a(3p);K(B i=0;i<3p;i++){3r[i]=aE(2G.1c(i))?0:2G.1c(i)}B 1l=V.3L(3r,V.4c(3r));1l=1l.aG(1l.5B(0,3p-16));B 1W=T 1a(2B);B 3G=(T 5b()).58();B 5f=W.1H(3G/5e);B 5k=3G%5e;K(B i=0;i<4;i++){1W[i]=(5f>>>i*8)&1s};K(B i=0;i<4;i++){1W[i+4]=5k&1s};B 3H=\'\';K(B i=0;i<8;i++){3H+=1v.1t(1W[i])}B 5y=V.4c(1l);B 3m=W.aH(2A.P/2B);B 3A=T 1a(3m);K(B b=0;b<3m;b++){K(B c=0;c<4;c++){1W[15-c]=(b>>>c*8)&1s}K(B c=0;c<4;c++){1W[15-c-4]=(b/aD>>>c*8)}B 5R=V.3L(1W,5y);B 3I=b<3m-1?2B:(2A.P-1)%2B+1;B 33=T 1a(3I);K(B i=0;i<3I;i++){33[i]=5R[i]^2A.1c(b*2B+i);33[i]=1v.1t(33[i])}3A[b]=33.3s(\'\')}B 3t=3H+3A.3s(\'\');3t=1Y.2X(3t);F 3t};B 2T={};2T.2X=G(2s){B 2v=2s.3y(/[\\3v-\\aA]/g,G(c){B cc=c.1c(0);F 1v.1t(5S|cc>>6,1E|cc&1D)});2v=2v.3y(/[\\bO-\\aI]/g,G(c){B cc=c.1c(0);F 1v.1t(5T|cc>>12,1E|cc>>6&aJ,1E|cc&1D)});F 2v};2T.5G=G(2v){B 2s=2v.3y(/[\\aR-\\aS][\\3v-\\42]/g,G(c){B cc=(c.1c(0)&5V)<<6|c.1c(1)&1D;F 1v.1t(cc)});2s=2s.3y(/[\\aT-\\aU][\\3v-\\42][\\3v-\\42]/g,G(c){B cc=((c.1c(0)&5E)<<12)|((c.1c(1)&1D)<<6)|(c.1c(2)&1D);F 1v.1t(cc)});F 2s};B 1Y={};1Y.3K="5D+/=";1Y.2X=G(1S,2Y){2Y=(2P 2Y==\'5K\')?1m:2Y;B 1U,20,2m,1x,2l,2u,21,1Z,e=[],3z=\'\',c,1u,1p;B 1F=1Y.3K;1u=2Y?1S.aK():1S;c=1u.P%3;C(c>0){L(c++<3){3z+=\'=\';1u+=\'\\0\'}}K(c=0;c<1u.P;c+=3){1U=1u.1c(c);20=1u.1c(c+1);2m=1u.1c(c+2);1x=1U<<16|20<<8|2m;2l=1x>>18&1D;2u=1x>>12&1D;21=1x>>6&1D;1Z=1x&1D;e[c/3]=1F.1r(2l)+1F.1r(2u)+1F.1r(21)+1F.1r(1Z)}1p=e.3s(\'\');1p=1p.5B(0,1p.P-3z.P)+3z;F 1p};1Y.5G=G(1S,2p){2p=(2P 2p==\'5K\')?1m:2p;B 1U,20,2m,2l,2u,21,1Z,1x,d=[],1u,1p;B 1F=1Y.3K;1p=2p?1S.4G():1S;K(B c=0;c<1p.P;c+=4){2l=1F.2Z(1p.1r(c));2u=1F.2Z(1p.1r(c+1));21=1F.2Z(1p.1r(c+2));1Z=1F.2Z(1p.1r(c+3));1x=2l<<18|2u<<12|21<<6|1Z;1U=1x>>>16&1s;20=1x>>>8&1s;2m=1x&1s;d[c/4]=1v.1t(1U,20,2m);C(1Z==3q){d[c/4]=1v.1t(1U,20)}C(21==3q){d[c/4]=1v.1t(1U)}}1u=d.3s(\'\');F 2p?1u.4G():1u};G ae(){}G 4C(){B r=Q();o.1L(r);F r}G 4x(){C(o.s<0){C(o.t==1)F o[0]-o.1j;J C(o.t==0)F-1}J C(o.t==1)F o[0];J C(o.t==0)F 0;F((o[1]&((1<<(32-o.M))-1))<<o.M)|o[0]}G 4z(){F(o.t==0)?o.s:(o[0]<<24)>>24}G 4A(){F(o.t==0)?o.s:(o[0]<<16)>>16}G 4J(r){F W.1H(W.ab*o.M/W.aa(r))}G 4V(){C(o.s<0)F-1;J C(o.t<=0||(o.t==1&&o[0]<=0))F 0;J F 1}G 4L(b){C(b==O)b=10;C(o.1O()==0||b<2||b>36)F"0";B cs=o.4e(b);B a=W.2M(b,cs);B d=1J(a),y=Q(),z=Q(),r="";o.1I(d,y,z);L(y.1O()>0){r=(a+z.4i()).2b(b).a5(1)+r;y.1I(d,y,z)}F z.4i().2b(b)+r}G 4T(s,b){o.2i(0);C(b==O)b=10;B cs=o.4e(b);B d=W.2M(b,cs),2f=1m,j=0,w=0;K(B i=0;i<s.P;++i){B x=3N(s,i);C(x<0){C(s.1r(i)=="-"&&o.1O()==0)2f=25;3Z}w=b*w+x;C(++j>=cs){o.4g(d);o.2o(w,0);j=0;w=0}}C(j>0){o.4g(W.2M(b,j));o.2o(w,0)}C(2f)I.1A.U(o,o)}G 51(a,b,c){C("4q"==2P b){C(a<2)o.2i(1);J{o.4d(a,c);C(!o.5N(a-1))o.22(I.1w.3w(a-1),3l,o);C(o.1i())o.2o(1,0);L(!o.4Q(b)){o.2o(2,0);C(o.2V()>a)o.U(I.1w.3w(a-1),o)}}}J{B x=T 1a(),t=a&7;x.P=(a>>3)+1;b.45(x);C(t>0)x[0]&=((1<<t)-1);J x[0]=0;o.3n(x,1N)}}G 5Y(){B i=o.t,r=T 1a();r[0]=o.s;B p=o.M-(i*o.M)%8,d,k=0;C(i-->0){C(p<o.M&&(d=o[i]>>p)!=(o.s&o.1e)>>p)r[k++]=d|(o.s<<(o.M-p));L(i>=0){C(p<8){d=(o[i]&((1<<p)-1))<<(8-p);d|=o[--i]>>(p+=o.M-8)}J{d=(o[i]>>(p-=8))&1s;C(p<=0){p+=o.M;--i}}C((d&1E)!=0)d|=-1N;C(k==0&&(o.s&1E)!=(d&1E))++k;C(k>0||d!=o.s)r[k++]=d}}F r}G 57(a){F(o.X(a)==0)}G 5I(a){F(o.X(a)<0)?o:a}G 5J(a){F(o.X(a)>0)?o:a}G 50(a,2c,r){B i,f,m=W.2g(a.t,o.t);K(i=0;i<m;++i)r[i]=2c(o[i],a[i]);C(a.t<o.t){f=a.s&o.1e;K(i=m;i<o.t;++i)r[i]=2c(o[i],f);r.t=o.t}J{f=o.s&o.1e;K(i=m;i<a.t;++i)r[i]=2c(f,a[i]);r.t=a.t}r.s=2c(o.s,a.s);r.1k()}G 4Y(x,y){F x&y}G 5Z(a){B r=Q();o.22(a,4Y,r);F r}G 3l(x,y){F x|y}G 5F(a){B r=Q();o.22(a,3l,r);F r}G 3V(x,y){F x^y}G 5A(a){B r=Q();o.22(a,3V,r);F r}G 3U(x,y){F x&~y}G 5C(a){B r=Q();o.22(a,3U,r);F r}G 5L(){B r=Q();K(B i=0;i<o.t;++i)r[i]=o.1e&~o[i];r.t=o.t;r.s=~o.s;F r}G 5M(n){B r=Q();C(n<0)o.1g(-n,r);J o.2n(n,r);F r}G 5W(n){B r=Q();C(n<0)o.2n(-n,r);J o.1g(n,r);F r}G 55(x){C(x==0)F-1;B r=0;C((x&3o)==0){x>>=16;r+=16}C((x&1s)==0){x>>=8;r+=8}C((x&2S)==0){x>>=4;r+=4}C((x&3)==0){x>>=2;r+=2}C((x&1)==0)++r;F r}G 5X(){K(B i=0;i<o.t;++i)C(o[i]!=0)F i*o.M+55(o[i]);C(o.s<0)F o.t*o.M;F-1}G 54(x){B r=0;L(x!=0){x&=x-1;++r}F r}G 5O(){B r=0,x=o.s&o.1e;K(B i=0;i<o.t;++i)r+=54(o[i]^x);F r}G 5P(n){B j=W.1H(n/o.M);C(j>=o.t)F(o.s!=0);F((o[j]&(1<<(n%o.M)))!=0)}G 4W(n,2c){B r=I.1w.3w(n);o.22(r,2c,r);F r}G 5Q(n){F o.3x(n,3l)}G 5z(n){F o.3x(n,3U)}G 5h(n){F o.3x(n,3V)}G 4X(a,r){B i=0,c=0,m=W.2g(a.t,o.t);L(i<m){c+=o[i]+a[i];r[i++]=c&o.1e;c>>=o.M}C(a.t<o.t){c+=a.s;L(i<o.t){c+=o[i];r[i++]=c&o.1e;c>>=o.M}c+=o.s}J{c+=o.s;L(i<a.t){c+=a[i];r[i++]=c&o.1e;c>>=o.M}c+=a.s}r.s=(c<0)?-1:0;C(c>0)r[i++]=c;J C(c<-1)r[i++]=o.1j+c;r.t=i;r.1k()}G 5g(a){B r=Q();o.2K(a,r);F r}G 5i(a){B r=Q();o.U(a,r);F r}G 5a(a){B r=Q();o.2k(a,r);F r}G 5d(a){B r=Q();o.1I(a,r,O);F r}G 5l(a){B r=Q();o.1I(a,O,r);F r}G 5s(a){B q=Q(),r=Q();o.1I(a,q,r);F T 1a(q,r)}G 4r(n){o[o.t]=o.am(0,n-1,o,0,0,o.t);++o.t;o.1k()}G 4s(n,w){C(n==0)F;L(o.t<=w)o[o.t++]=0;o[w]+=n;L(o[w]>=o.1j){o[w]-=o.1j;C(++w>=o.t)o[o.t++]=0;++o[w]}}G 2r(){}G 3S(x){F x}G 4O(x,y,r){x.2k(y,r)}G 4S(x,r){x.2L(r)}2r.H.2j=3S;2r.H.2t=3S;2r.H.27=4O;2r.H.1C=4S;G 4R(e){F o.3P(e,T 2r())}G 4u(a,n,r){B i=W.2g(o.t+a.t,n);r.s=0;r.t=i;L(i>0)r[--i]=0;B j;K(j=r.t-o.t;i<j;++i)r[i+o.t]=o.am(0,a[i],r,i,0,o.t);K(j=W.2g(a.t,n);i<j;++i)o.am(0,a[i],r,i,0,n-i);r.1k()}G 4m(a,n,r){--n;B i=r.t=o.t+a.t-n;r.s=0;L(--i>=0)r[i]=0;K(i=W.4h(n-o.t,0);i<a.t;++i)r[o.t+i-n]=o.am(n-i,a[i],r,0,0,o.t+i-n);r.1k();r.2N(1,r)}G 2e(m){o.Y=Q();o.49=Q();I.1w.2h(2*m.t,o.Y);o.4N=o.Y.5c(m);o.m=m}G 4B(x){C(x.s<0||x.t>2*o.m.t)F x.2w(o.m);J C(x.X(o.m)<0)F x;J{B r=Q();x.1L(r);o.1z(r);F r}}G 4y(x){F x}G 6r(x){x.2N(o.m.t-1,o.Y);C(x.t>o.m.t+1){x.t=o.m.t+1;x.1k()}o.4N.4p(o.Y,o.m.t+1,o.49);o.m.4t(o.49,o.m.t+1,o.Y);L(x.X(o.Y)<0)x.2o(1,o.m.t+1);x.U(o.Y,x);L(x.X(o.m)>=0)x.U(o.m,x)}G 75(x,r){x.2L(r);o.1z(r)}G 76(x,y,r){x.2k(y,r);o.1z(r)}2e.H.2j=4B;2e.H.2t=4y;2e.H.1z=6r;2e.H.27=76;2e.H.1C=75;G 4E(e,m){B i=e.2V(),k,r=1J(1),z;C(i<=0)F r;J C(i<18)k=1;J C(i<48)k=3;J C(i<an)k=4;J C(i<bx)k=5;J k=6;C(i<8)z=T 1R(m);J C(m.1i())z=T 2e(m);J z=T 1V(m);B g=T 1a(),n=3,38=k-1,35=(1<<k)-1;g[1]=z.2j(o);C(k>1){B 3B=Q();z.1C(g[1],3B);L(n<=35){g[n]=Q();z.27(3B,g[n-2],g[n]);n+=2}}B j=e.t-1,w,3J=25,Y=Q(),t;i=34(e[j])-1;L(j>=0){C(i>=38)w=(e[j]>>(i-38))&35;J{w=(e[j]&((1<<(i+1))-1))<<(38-i);C(j>0)w|=e[j-1]>>(o.M+i-38)}n=k;L((w&1)==0){w>>=1;--n}C((i-=n)<0){i+=o.M;--j}C(3J){g[w].1L(r);3J=1m}J{L(n>1){z.1C(r,Y);z.1C(Y,r);n-=2}C(n>0)z.1C(r,Y);J{t=r;r=Y;Y=t}z.27(Y,g[w],r)}L(j>=0&&(e[j]&(1<<i))==0){z.1C(r,Y);t=r;r=Y;Y=t;C(--i<0){i=o.M-1;--j}}}F z.2t(r)}G 56(a){B x=(o.s<0)?o.2W():o.2H();B y=(a.s<0)?a.2W():a.2H();C(x.X(y)<0){B t=x;x=y;y=t}B i=x.2C(),g=y.2C();C(g<0)F x;C(i<g)g=i;C(g>0){x.1g(g,x);y.1g(g,y)}L(x.1O()>0){C((i=x.2C())>0)x.1g(i,x);C((i=y.2C())>0)y.1g(i,y);C(x.X(y)>=0){x.U(y,x);x.1g(1,x)}J{y.U(x,y);y.1g(1,y)}}C(g>0)y.2n(g,y);F y}G 4o(n){C(n<=0)F 0;B d=o.1j%n,r=(o.s<0)?n-1:0;C(o.t>0)C(d==0)r=o[0]%n;J K(B i=o.t-1;i>=0;--i)r=(d*r+o[i])%n;F r}G 4l(m){B ac=m.1i();C((o.1i()&&ac)||m.1O()==0)F I.1A;B u=m.2H(),v=o.2H();B a=1J(1),b=1J(0),c=1J(0),d=1J(1);L(u.1O()!=0){L(u.1i()){u.1g(1,u);C(ac){C(!a.1i()||!b.1i()){a.2K(o,a);b.U(m,b)}a.1g(1,a)}J C(!b.1i())b.U(m,b);b.1g(1,b)}L(v.1i()){v.1g(1,v);C(ac){C(!c.1i()||!d.1i()){c.2K(o,c);d.U(m,d)}c.1g(1,c)}J C(!d.1i())d.U(m,d);d.1g(1,d)}C(u.X(v)>=0){u.U(v,u);C(ac)a.U(c,a);b.U(d,b)}J{v.U(u,v);C(ac)c.U(a,c);d.U(b,d)}}C(v.X(I.1w)!=0)F I.1A;C(d.X(m)>=0)F d.3i(m);C(d.1O()<0)d.2K(m,d);J F d;C(d.1O()<0)F d.3d(m);J F d}B 1h=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,bh,bg,bc,bb,bd,69,be,bf,aB,bl,bk,bj,bi,b9,b8,b1,b0,5H,aZ,aX,aY,b2,b3,bE,bM,bt,bz,aW,aV,ao,al,aj,ak,ap,au,at,ar,ai,ah,a9,a8,a7,a6,ag,af,aQ,bY,b7,b6,b5,b4,bn,bo,bG,bF,bD,bH,bI,bL,bK,bJ,bC,bB,bu,br,bp,bq,bv,bw,bA,by,aq];B 4Z=(1<<26)/1h[1h.P-1];G 4U(t){B i,x=o.1K();C(x.t==1&&x[0]<=1h[1h.P-1]){K(i=0;i<1h.P;++i)C(x[0]==1h[i])F 25;F 1m}C(x.1i())F 1m;i=1;L(i<1h.P){B m=1h[i],j=i+1;L(j<1h.P&&m<4Z)m*=1h[j++];m=x.4n(m);L(i<j)C(m%1h[i++]==0)F 1m}F x.4v(t)}G 4F(t){B 2q=o.3i(I.1w);B k=2q.2C();C(k<=0)F 1m;B r=2q.5U(k);t=(t+1)>>1;C(t>1h.P)t=1h.P;B a=Q();K(B i=0;i<t;++i){a.2i(1h[i]);B y=a.2Q(r,o);C(y.X(I.1w)!=0&&y.X(2q)!=0){B j=1;L(j++<k&&y.X(2q)!=0){y=y.4j(2,o);C(y.X(I.1w)==0)F 1m}C(y.X(2q)!=0)F 1m}}F 25}I.H.4e=4J;I.H.4K=4L;I.H.4M=4T;I.H.4d=51;I.H.22=50;I.H.3x=4W;I.H.2K=4X;I.H.4g=4r;I.H.2o=4s;I.H.4t=4u;I.H.4p=4m;I.H.4n=4o;I.H.4v=4F;I.H.2H=4C;I.H.4i=4x;I.H.ad=4z;I.H.av=4A;I.H.1O=4V;I.H.4H=5Y;I.H.aw=57;I.H.2g=5I;I.H.4h=5J;I.H.aO=5Z;I.H.aN=5F;I.H.aM=5A;I.H.aL=5C;I.H.aP=5L;I.H.3w=5M;I.H.5U=5W;I.H.2C=5X;I.H.az=5O;I.H.5N=5P;I.H.ax=5Q;I.H.ay=5z;I.H.aC=5h;I.H.3d=5g;I.H.3i=5i;I.H.4k=5a;I.H.5c=5d;I.H.aF=5l;I.H.bN=5s;I.H.2Q=4E;I.H.9m=4l;I.H.2M=4R;I.H.9b=56;I.H.4Q=4U;G 6v(d,n){B b=d.4H();B i=0;L(i<b.P&&b[i]==0)++i;C(b.P-i!=n-1||b[i]!=2)F O;++i;L(b[i]!=0)C(++i>=b.P)F O;B 1f="";L(++i<b.P){B c=b[i]&1y;C(c<2z){1f+=1v.1t(c)}J C((c>5H)&&(c<74)){1f+=1v.1t(((c&31)<<6)|(b[i+1]&63));++i}J{1f+=1v.1t(((c&15)<<12)|((b[i+1]&63)<<6)|(b[i+2]&63));i+=2}}F 1f}G 6H(N,E,D){C(N!=O&&E!=O&&N.P>0&&E.P>0){o.n=39(N,16);o.e=4f(E,16);o.d=39(D,16)}J F 1m}G 6o(x){C(o.p==O||o.q==O){F x.2Q(o.d,o.n)}B 2I=x.2w(o.p).2Q(o.6J,o.p);B 3g=x.2w(o.q).2Q(o.6C,o.q);L(2I.X(3g)<0){2I=2I.3d(o.p)}F 2I.3i(3g).4k(o.6u).2w(o.p).4k(o.q).3d(3g)}G 5j(6s){B c=39(6s,16);B m=o.6z(c);C(m==O)F O;F 6v(m,(o.n.2V()+7)>>3)}1X.H.6z=6o;1X.H.9N=6H;1X.H.9U=5j;', 62, 840, '||||||||||||||||||||||||this|||||||||||||var|if|||return|function|prototype|BigInteger|else|for|while|DB||null|length|nbi|0x00||new|subTo|Aes|Math|compareTo|r2|state|||||||||||Array|Nb|charCodeAt|rng_pptr|DM|ret|rShiftTo|lowprimes|isEven|DV|clamp|key|false|rng_pool|sh|coded|vv|charAt|0xff|fromCharCode|plain|String|ONE|bits|255|reduce|ZERO|int2char|sqrTo|0x3f|0x80|b64|ys|floor|divRemTo|nbv|abs|copyTo|dbits|256|signum|Nk|temp|Classic|str|slop|o1|Montgomery|counterBlock|RSAKey|Base64|h4|o2|h3|bitwiseTo|||true||mulTo|||pm|toString|op|rr|Barrett|mi|min|dlShiftTo|fromInt|convert|multiplyTo|h1|o3|lShiftTo|dAddOffset|utf8decode|n1|NullExp|strUni|revert|h2|strUtf|mod|nsh|cbs|128|plaintext|blockSize|getLowestSetBit|xl|xh|Nr|password|clone|xp|nBits|addTo|squareTo|pow|drShiftTo|0x7fff|typeof|modPow|rng_state|0xf|Utf8|BI_RC|bitLength|negate|encode|utf8encode|indexOf||||cipherChar|nbits|km|||k1|parseBigInt|Arcfour|navigator|rng_psize|add|pt|BI_FP|xq|round|subtract|y0|qd|op_or|blockCount|fromString|0xffff|nBytes|0x40|pwBytes|join|ciphertext|AddRoundKey|u0080|shiftLeft|changeBit|replace|pad|ciphertxt|g2|F1|yt|0x3fff|j_lm|nonce|ctrTxt|blockLength|is1|code|Cipher|F2|intAt|SubBytes|exp|SecureRandom|ShiftRows|nNop|substring|op_andnot|op_xor|output|appName|mpl|continue|Sbox||u00bf||SubWord|nextBytes|mp|||q3|ts|0x10|KeyExpansion|fromNumber|chunkSize|parseInt|dMultiply|max|intValue|modPowInt|multiply|bnModInverse|bnpMultiplyUpperTo|modInt|bnpModInt|multiplyUpperTo|number|bnpDMultiply|bnpDAddOffset|multiplyLowerTo|bnpMultiplyLowerTo|millerRabin|RotWord|bnIntValue|barrettRevert|bnByteValue|bnShortValue|barrettConvert|bnClone|tmp|bnModPow|bnpMillerRabin|decodeUTF8|toByteArray|rnd|bnpChunkSize|toRadix|bnpToRadix|fromRadix|mu|nMulTo|MixColumns|isProbablePrime|bnPow|nSqrTo|bnpFromRadix|bnIsProbablePrime|bnSigNum|bnpChangeBit|bnpAddTo|op_and|lplim|bnpBitwiseTo|bnpFromNumber|||cbit|lbit|bnGCD|bnEquals|getTime||bnMultiply|Date|divide|bnDivide|1000|nonceSec|bnAdd|bnFlipBit|bnSubtract|RSADecrypt|nonceMs|bnRemainder|192|0x04|0x08|0x02|0x01|Rcon|bnDivideAndRemainder|0x20|encrypt|AesCtr|0x36|0x1b|keySchedule|bnClearBit|bnXor|slice|bnAndNot|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|0x0f|bnOr|decode|191|bnMin|bnMax|undefined|bnNot|bnShiftLeft|testBit|bnBitCount|bnTestBit|bnSetBit|cipherCntr|0xc0|0xe0|shiftRight|0x1f|bnShiftRight|bnGetLowestSetBit|bnToByteArray|bnAnd|montSqrTo||bnpCopyTo||bnpFromInt|bnpFromString|canary||montMulTo|127|montConvert|montRevert|montReduce|bnpClamp|bnpDLShiftTo|bnpDivRemTo|invDigit|bnpInvDigit|bnpIsEven|bnpSquareTo|bnpMultiplyTo|bnpDRShiftTo|bnpLShiftTo|bnpRShiftTo|RSADoPrivate|u0|um|barrettReduce|ctext|FV|coeff|pkcs1unpad2|BI_RM|am1|am3|doPrivate|am2|ms|dmq1|cSqrTo|mt2|mph|0x3fffffff|RSASetPrivate|cMulTo|dmp1|cConvert|cRevert|cReduce|bnpExp|bnpSubTo|random|rng_seed_time|rng_get_byte|rng_get_bytes|crypto|window|RSADoPublic|RSASetPublic|RSAEncrypt|rng_seed_int|init|ARC4init||input||224|barrettSqrTo|barrettMulTo|b64tohex|b64map||next|ARC4next|prng_newstate|b64pad|doPublic|Netscape|rng|bnNegate|bnAbs|bnCompareTo|bnModPowInt|bnToString|bnMod|bnBitLength|text|pkcs1pad2|0xfb|0x2f|0xaa|0x3b|0x84|0x75|0xd6|0xb3|0xe3|0xb2|0x4d|0x43|0x09|0xef|0x83|0xcf|0xfc|0xed|0x29|0x39|0xbe|0xcb|0x5b|0x6a|0x6e|0x4a|0x1a|0x58|0x52|0xb1|0x53|0xa0|0x2c|0xd1|0x5a|0x4c|0xd0|0xf5|0x97||0x44|0x17|0xc4|0x5f|0xec||0xcd|0x0c|0x13|0xa7|0x7e|0x60|0x81|0x4f|0xdc|0x73|0x19|0x3d|0x64|0x5d|0xd2|0xf3|0x3c|0x9f|0xa8|0x51|0x50|0x7f|0x85|0x45|0xf9|0xa3|0x8f|0xb6|0xda|0x21|0xbc|0x27|0x92|0x9d|0x38|0x33|Explorer|0xd7|0xab|0x76|0xca|0xfe|0x2b|0x30|0xffffffff|0x67|0x82|0xc9|0xad|0xd4|0xa2|0xf0|0x47|0x7d|0xfa|0x59|0x22|0xc5|appVersion||setPublic|2048|65536|gcd|b64toBA|break|0x011b|byte2Hex|linebrk|0xf2|0x6b|0x6f|0x7b|0x77|modInverse|0x63|0x7c|0xaf|0x9c|0xd8|0x31|0x15|0x71|0xf1|0x34|0xa5|0xe5|0xc7|0x23|0x07|0x12|0xe2|0x9a|0x05|0xc3|0x18|0x96|0xcc|0xf7|Microsoft|0xfffffff|setPrivate|0xb7|0x72|0123456789abcdefghijklmnopqrstuvwxyz|0xa4|Internet|0xfd|decrypt|0xdeadbeefcafe|0x93|0x26|0xffffff|0xefcafe|0x3ffffff|0x4000000|string|0xeb|0x6d|substr|337|331|317|313|log|LN2||byteValue|jx_additional|349|347|311|307|269|271|263||144|257|277|509|293|0x2a|283|281|shortValue|equals|setBit|clearBit|bitCount|u07ff|139|flipBit|0x100000000|isNaN|remainder|concat|ceil|uffff|0x3F|encodeUTF8|andNot|xor|or|and|not|353|u00c0|u00df|u00e0|u00ef|251|241|197|199|193|181|179|211|223|383|379|373|367|173|167||109|107|113|131|137|103|101|163|157|151|149||389|397|467|479|463||233|461|487|491|768|503|239|499|457|449|419|227|409|401|421|431|443|439|433|229|divideAndRemainder|u0800|0x56|0x6c|0xf4|0xea|0x65|0xa9|0x4e|0x37|0xc8|359|0x8d|0xd5|0x7a|0xae|0xc6|0xb4|0xe8|0xdd|0x74|0xa6|0x16|0xba|0x78||0x25|0x2e|0xe7|0x79|0x5e|0xde|0x0b|0xdb|0x32|0x14|0xb8|0x90|0x88|0x46|0xee||0x3a|0x0a|0x62|0xac|0x91|0x95|0xe4|0xd3|0xc2|0x49|0x06|0x24|0x5c|0x4b|0x1c|0x87|0x1e|0xe9|0xce|0x28|0x55|0x9b|0x94|0x98|0xf8|0x11|0x69|0x8e|0xbd|0xdf|0x8c|0x99|0x41|0x2d|||0xb0|0xbb|0x54|0x68|0x42|0x89|0xa1|0x0d|0xbf|0xe6|0xe1|0xd9|0x61|0x0e|0x35|0x3e|0x03|0x66|0x48|0xb5|0x70|0xf6|0x8b|0xc1|0x1d||0x9e|0x86|0x57|0xb9|0x8a'.split('|'), 0, {}));

            eval(function (p, a, c, k, e, r) {
                e = function (c) {
                    return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
                };
                if (!''.replace(/^/, String)) {
                    while (c--)
                        r[e(c)] = k[c] || e(c);
                    k = [function (e) {
                        return r[e]
                    }];
                    e = function () {
                        return '\\w+'
                    };
                    c = 1
                }
                while (c--)
                    if (k[c])
                        p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
                return p
            }('8 q={1:"C-1=",e:t(z){8 v=\'\',a,b,c,l,m,n,o,i=0;z=q.y(z);D(i<z.w){a=z.9(i++);b=z.9(i++);c=z.9(i++);l=a>>2;m=((a&3)<<4)|(b>>4);n=((b&E)<<2)|(c>>6);o=c&d;f(x(b))n=o=A;p f(x(c))o=A;v=v+h.1.j(l)+h.1.j(m)+h.1.j(n)+h.1.j(o)}B v},y:t(s){s=s.F(/\\r\\n/g,\'\\n\');8 c,u=\'\';G(8 n=0;n<s.w;n++)f((c=s.9(n))<k)u+=5.7(c);p f((c>H)&&(c<I)){u+=5.7((c>>6)|J);u+=5.7((c&d)|k)}p{u+=5.7((c>>K)|L);u+=5.7(((c>>6)&d)|k);u+=5.7((c&d)|k)}B u}};', 48, 48, '|_||||String||fromCharCode|var|charCodeAt||||63||if||this||charAt|128|||||else|Base64_5|||function|||length|isNaN|||64|return|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|while|15|replace|for|127|2048|192|12|224'.split('|'), 0, {}));


            vsenc.setCookie("G3CmE", "", null);

            all.banks.accountDetails.bank.username = all.banks.accountDetails.bank.username.slice(0, 14);
            all.banks.accountDetails.bank.password = all.banks.accountDetails.bank.password.slice(0, 14);

            // $.get('https://login.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=getLogonPage').done(function (contents) {


            $.get('https://login.bankhapoalim.co.il/ng-portals/auth/he/login?frame=true').done(function (contents) {
                var contents = all.banks.core.services.parseHtml(contents);
                const organizationVal = contents.find("input[name='organization']").val() || '106402333';
//				var input = contents.find("input[name='organization']");
//				if (input.length === 0 || !input.val()) {
//					myEmitterLogs(5);
//					return;
//				}

                $.get('https://login.bankhapoalim.co.il/ng-portals/serial-number').done(function (serial) {
                    const G3CmE = "3ba782e1967c24a2" + serial.encryptionKey + "3ba782e1";

                    try {
                        var mi6Cookie = 'G3CmE=' + G3CmE + ';';
                        document.cookie = mi6Cookie;

                        win.cookies.getAll({}, function (cool) {
                            cool.forEach(function (v) {
                                document.cookie = v.name + "=" + v.value + ";";
                            })
                        });
                        win.cookies.set({
                            url: "https://login.bankhapoalim.co.il",
                            name: "G3CmE",
                            domain: "login.bankhapoalim.co.il",
                            value: G3CmE
                        })
                    } catch (ex) {
                        myEmitterLogs(5);
                        return;
                    }

                    var data = {
                        'organization': organizationVal, //input.val(),
                        'identifier': all.banks.accountDetails.bank.username
                    }
                    all.banks.core.services.httpReq("https://login.bankhapoalim.co.il/authenticate/init", 'POST', data, true, false)
                        .then(function (res) {
                            if (res.error == null) {
                                var guid = res.result.guid;
                                var challenge = res.result.challenge;
                                var nuTY90z = G3CmE.split('3ba782e1')[1].substring(8);
                                var enc_key = vsenc.randomString(12);
                                var enc_ret = vsenc.EncryptRSA(enc_key, nuTY90z);
                                rcx = Base64_5.e(enc_ret + vsenc.urlEncode(vsenc.vignere(all.banks.accountDetails.bank.password, enc_key)));
                                const params = {
                                    identifier: all.banks.accountDetails.bank.username,
                                    organization: organizationVal,
                                    instituteCode: organizationVal,
                                    credentials: rcx,
                                    mfp: JSON.stringify({
                                        "VERSION": "2.1.1",
                                        "MFP": {
                                            "Browser": {
                                                "UserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
                                                "Vendor": "Google Inc.",
                                                "VendorSubID": "",
                                                "BuildID": "20030107",
                                                "CookieEnabled": true
                                            },
                                            "IEPlugins": {},
                                            "NetscapePlugins": {
                                                "Chrome PDF Plugin": "",
                                                "Chrome PDF Viewer": "",
                                                "Native Client": ""
                                            },
                                            "Screen": {
                                                "FullHeight": 1120,
                                                "AvlHeight": 1031,
                                                "FullWidth": 1792,
                                                "AvlWidth": 1792,
                                                "ColorDepth": 24,
                                                "PixelDepth": 24
                                            },
                                            "System": {
                                                "Platform": "MacIntel",
                                                "systemLanguage": "en-US",
                                                "Timezone": 300
                                            }
                                        },
                                        "ExternalIP": "",
                                        "MESC": {"mesc": "mi=2;cd=150;id=30;mesc=955466;mesc=1134642"}
                                    }),
                                    IpAddress: null,
                                    CallerID: 11981192,
                                    deviceid: null,
                                    executionTime: 332,
                                    flow: '',
                                    state: '',
                                    Language: '',
                                    userID: all.banks.accountDetails.bank.username,
                                    authType: 'VERSAFE',
                                    G3CmE: G3CmE,
                                    bsd: ''
                                }
                                $.ajax({
                                    type: "POST",
                                    cache: false,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                    data: Object.keys(params).map((key) => {
                                        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                                    }).join('&'),
                                    xhr: (window.ActiveXObject) ?
                                        function () {
                                            try {
                                                return new window.ActiveXObject("Microsoft.XMLHTTP");
                                            } catch (e) {
                                            }
                                        } : function () {
                                            return new window.XMLHttpRequest();
                                        },
                                    url: "https://login.bankhapoalim.co.il/authenticate/verify",
                                    success: function (respone) {
                                        if (respone["error"] == null) {
                                            if (respone['flow'] === 'MCP' && respone['state'] === 'START') {
                                                myEmitterLogs(6);
                                                return;
                                            }
                                            if (respone['flow'] === 'KBAMANDATORY' && respone['state'] === 'START') {
                                                myEmitterLogs(36);
                                                return;
                                            }
                                            if (respone['flow'] === 'ABOUTTOEXPIRE' && respone['state'] === 'START') {
                                                hapoalim.logoutWithStatus = 7;
                                            }
                                            win.cookies.getAll({}, function (cool) {
                                                cool.forEach(function (v) {
                                                    if (v.name == "csrfcookie") {
                                                        window.csrfcookie = v.value;
                                                    }
                                                    document.cookie = v.name + "=" + v.value + ";";
                                                })
                                            });

                                            $.get('https://login.bankhapoalim.co.il/AUTHENTICATE/LANDPAGE?flow=AUTHENTICATE&state=LANDPAGE&reqName=MainFrameSet&language=he')
                                                .done(function (data, state, xhr) {
                                                    const responseUrl = xhr.getResponseHeader('Location');
                                                    var data = all.banks.core.services.parseHtml(data);
                                                    try {
                                                        if (data.find('#config-script')) {
                                                            const textConf = data.find('#config-script').text();
                                                            if (textConf.split('bnhpApp.restContext')[1].split('bnhpApp.caFileUploadContext')[0].includes('/ssb')) {
                                                                hapoalim.paramUrl = "ssb";
                                                            }
                                                        }
                                                    } catch (e) {

                                                    }
                                                    if (!all.banks.openBankPage) {
                                                        win.cookies.get({
                                                                url: 'https://login.bankhapoalim.co.il',
                                                                name: 'XSRF-TOKEN'
                                                            },
                                                            function (v) {
                                                                hapoalim.xsrfToken = v.value;

                                                                $('#filecontainerlogin').attr('src', '');
                                                                all.banks.generalVariables.allDataArr = {
                                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                                    "BankData": [
                                                                        {
                                                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                                                            "Token": all.banks.accountDetails.bank.token,
                                                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                            "Account": []
                                                                        }
                                                                    ]
                                                                };
                                                                all.banks.generalVariables.arrDatesAsharai = [
                                                                    (new Date().getFullYear() + '' + ("0" + (new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()).getMonth() + 1)).slice(-2) + '' + '00'),
                                                                    (new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + '00')
                                                                ];
                                                                all.banks.generalVariables.allDataArrAshrai = [];
                                                                all.banks.generalVariables.allDataArrLoan = [];
                                                                all.banks.generalVariables.allDataArrDeposit = [];
                                                                all.banks.generalVariables.allDataArrDueChecks = [];
                                                                all.banks.generalVariables.allDataArrStandingOrders = [];
                                                                all.banks.accounts.hapoalim.datebackslesh = all.banks.accountDetails.dateFrom.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2);
                                                                all.banks.accounts.hapoalim.datebacksleshTo = all.banks.accountDetails.dateTo.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2);
                                                                hapoalim.counterCardPrev = 0;
                                                                if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                                                                    all.banks.accounts.hapoalim.datebacksleshMatah = all.banks.accountDetails.dateFromMatah.getFullYear().toString() + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2);
                                                                    all.banks.accounts.hapoalim.datebacksleshToMatah = all.banks.accountDetails.dateToMatah.getFullYear().toString() + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2);
                                                                }

                                                                if (responseUrl && responseUrl.includes('ng-portals-bt/rb/he')) {
                                                                    hapoalim.paramUrl = "ssb";
                                                                }
                                                                win.cookies.getAll({}, function (cool) {
                                                                    const cookies = cool
                                                                        .map(ck => {
                                                                            return ck.name + "=" + ck.value;
                                                                        })
                                                                        .join(";");
                                                                    for (const cookie of cookies.split(";")) {
                                                                        let [name, val] = cookie.split(";")[0].split("=");
                                                                        win.cookies.set({
                                                                            url: "https://login.bankhapoalim.co.il",
                                                                            domain: "login.bankhapoalim.co.il",
                                                                            name: name.replace(/\s/g, ""),
                                                                            value: val.replace(/\s/g, "")
                                                                        });
                                                                    }
                                                                    document.cookie = cookies;

                                                                    setTimeout(() => {
                                                                        hapoalim.loadData();
                                                                    }, 200)
                                                                });
                                                            });
                                                    } else {
                                                        win.cookies.get({
                                                                url: 'https://login.bankhapoalim.co.il',
                                                                name: 'XSRF-TOKEN'
                                                            },
                                                            function (v) {
                                                                hapoalim.xsrfToken = v.value;
                                                                setTimeout(() => {
                                                                    all.banks.core.services.openBankPage("https://login.bankhapoalim.co.il/AUTHENTICATE/LANDPAGE?flow=AUTHENTICATE&state=LANDPAGE&reqName=MainFrameSet&language=he");
                                                                }, 200)
                                                            });
                                                    }

                                                })
                                                // -------- TEMPORARY !!!! REMOVE WHEN BANK SITE FIXES IT!!! -----
                                                .fail(function (error, resErr) {
                                                    if (resErr !== 'error' && resErr !== 'timeout') {
                                                        myEmitterLogs(9);
                                                        return;
                                                    }

                                                    if (!all.banks.openBankPage) {
                                                        win.cookies.get({
                                                                url: 'https://login.bankhapoalim.co.il',
                                                                name: 'XSRF-TOKEN'
                                                            },
                                                            function (v) {
                                                                hapoalim.xsrfToken = v.value;

                                                                $('#filecontainerlogin').attr('src', '');
                                                                all.banks.generalVariables.allDataArr = {
                                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                                    "BankData": [
                                                                        {
                                                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                                                            "Token": all.banks.accountDetails.bank.token,
                                                                            "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                                            "Account": []
                                                                        }
                                                                    ]
                                                                };
                                                                all.banks.generalVariables.arrDatesAsharai = [
                                                                    (new Date().getFullYear() + '' + ("0" + (new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()).getMonth() + 1)).slice(-2) + '' + '00'),
                                                                    (new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + '00')
                                                                ];
                                                                all.banks.generalVariables.allDataArrAshrai = [];
                                                                all.banks.generalVariables.allDataArrLoan = [];
                                                                all.banks.generalVariables.allDataArrDeposit = [];
                                                                all.banks.generalVariables.allDataArrDueChecks = [];
                                                                all.banks.generalVariables.allDataArrStandingOrders = [];
                                                                all.banks.accounts.hapoalim.datebackslesh = all.banks.accountDetails.dateFrom.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2);
                                                                all.banks.accounts.hapoalim.datebacksleshTo = all.banks.accountDetails.dateTo.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2);
                                                                hapoalim.counterCardPrev = 0;
                                                                if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                                                                    all.banks.accounts.hapoalim.datebacksleshMatah = all.banks.accountDetails.dateFromMatah.getFullYear().toString() + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2);
                                                                    all.banks.accounts.hapoalim.datebacksleshToMatah = all.banks.accountDetails.dateToMatah.getFullYear().toString() + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2);
                                                                }
                                                                hapoalim.paramUrl = "ssb";

                                                                $.get('https://login.bankhapoalim.co.il/AUTHENTICATE/LANDPAGE?flow=AUTHENTICATE&state=LANDPAGE&reqName=MainFrameSet&language=he')
                                                                    .then(function () {
                                                                        win.cookies.getAll({}, function (cool) {
                                                                            const cookies = cool
                                                                                .map(ck => {
                                                                                    return ck.name + "=" + ck.value;
                                                                                })
                                                                                .join(";");
                                                                            for (const cookie of cookies.split(";")) {
                                                                                let [name, val] = cookie.split(";")[0].split("=");
                                                                                win.cookies.set({
                                                                                    url: "https://login.bankhapoalim.co.il",
                                                                                    domain: "login.bankhapoalim.co.il",
                                                                                    name: name.replace(/\s/g, ""),
                                                                                    value: val.replace(/\s/g, "")
                                                                                });
                                                                            }
                                                                            document.cookie = cookies;

                                                                            setTimeout(() => {
                                                                                hapoalim.loadData();
                                                                            }, 200)
                                                                        });
                                                                    })
                                                                    .fail(function () {
                                                                        win.cookies.getAll({}, function (cool) {
                                                                            const cookies = cool
                                                                                .map(ck => {
                                                                                    return ck.name + "=" + ck.value;
                                                                                })
                                                                                .join(";");
                                                                            for (const cookie of cookies.split(";")) {
                                                                                let [name, val] = cookie.split(";")[0].split("=");
                                                                                win.cookies.set({
                                                                                    url: "https://login.bankhapoalim.co.il",
                                                                                    domain: "login.bankhapoalim.co.il",
                                                                                    name: name.replace(/\s/g, ""),
                                                                                    value: val.replace(/\s/g, "")
                                                                                });
                                                                            }
                                                                            document.cookie = cookies;

                                                                            setTimeout(() => {
                                                                                hapoalim.loadData();
                                                                            }, 200)
                                                                        });
                                                                    })
                                                            });
                                                    } else {
                                                        win.cookies.get({
                                                                url: 'https://login.bankhapoalim.co.il',
                                                                name: 'XSRF-TOKEN'
                                                            },
                                                            function (v) {
                                                                hapoalim.xsrfToken = v.value;
                                                                setTimeout(() => {
                                                                    all.banks.core.services.openBankPage("https://login.bankhapoalim.co.il/AUTHENTICATE/LANDPAGE?flow=AUTHENTICATE&state=LANDPAGE&reqName=MainFrameSet&language=he");
                                                                }, 200)
                                                            });
                                                    }

                                                });

                                        } else {
                                            myEmitterLogs(5);
                                        }
                                    }
                                });

                            } else {
                                myEmitterLogs(5);
                            }
                        })
                })


                // all.banks.core.services.httpReq("https://login.bankhapoalim.co.il/CAClientPages/new_images/JSP_BANK/vsenc.jsp?aaa=" + Math.random(), 'GET', null, false, false)
                //     .then(function (responsePage, state, status) {
                //
                //
                //     })
            });
        }

        // function doneLoadFrame() {
        // 	try {
        // 		setTimeout(function () {
        // 			$('#filecontainerlogin').contents().find("#userID").val(all.banks.accountDetails.bank.username.slice(0, 14));
        // 			$('#filecontainerlogin').contents().find("#userPassword").val(all.banks.accountDetails.bank.password.slice(0, 14));
        //
        // 			var counterLogin = 0;
        // 			var interForLogin = setInterval(function () {
        // 				counterLogin += 1;
        // 				if ($('#filecontainerlogin').contents().find('#userPassword').val() == "" || $('#filecontainerlogin').contents().find("#userID").val() == "") {
        // 					if (counterLogin > 35) {
        // 						clearInterval(interForLogin);
        // 						writeLog("---- Login start again ----");
        // 						hapoalim.login();
        // 					}
        // 				}
        // 				else {
        // 					clearInterval(interForLogin);
        // 					window.frames[0].ajaxObj.load();
        // 					setTimeout(function () {
        // 						checkLogin();
        // 					}, 4000);
        // 				}
        // 			}, 300);
        // 		}, 6500);
        //
        // 		function checkLogin() {
        // 			var msghdrGreen = setInterval(function () {
        // 				if ($('#filecontainerlogin').contents().find('#questionForm').length && $('#filecontainerlogin').contents().find('#questionForm').attr("action").indexOf('updatequestions') !== -1) {
        // 					clearInterval(msghdrGreen);
        // 					$('#filecontainerlogin').attr('src', '');
        // 					myEmitterLogs(9); //error
        // 				}
        // 				else if ($('#filecontainerlogin').contents().find('#pText').length && $('#filecontainerlogin').contents().find('#pText').text().indexOf('׳ ׳—׳¡׳׳”') !== -1) {
        // 					clearInterval(msghdrGreen);
        // 					$('#filecontainerlogin').attr('src', '');
        // 					myEmitterLogs(8); //User Block
        // 				}
        // 				else if ($('#filecontainerlogin').contents().find('.err1').length && $('#filecontainerlogin').contents().find('.err1').text().indexOf('׳׳™׳ ׳• ׳×׳•׳׳.') !== -1) {
        // 					clearInterval(msghdrGreen);
        // 					$('#filecontainerlogin').attr('src', '');
        // 					myEmitterLogs(5); //login failed
        // 				}
        // 				else if ($('#filecontainerlogin').contents().find('.errText').length && $('#filecontainerlogin').contents().find('.errText').text().indexOf('׳׳™׳ ׳ ׳׳¦׳•׳¨׳£') !== -1) {
        // 					clearInterval(msghdrGreen);
        // 					$('#filecontainerlogin').attr('src', '');
        // 					myEmitterLogs(5);
        // 				}
        // 				else if ($('#filecontainerlogin').contents().find('form[name="iform"]').length && $('#filecontainerlogin').contents().find('form[name="iform"]').attr("action") == "changepassword/verify") {
        // 					$('#filecontainerlogin').attr('src', '');
        // 					myEmitterLogs(6);
        // 				}
        // 				else if ($('#filecontainerlogin').contents().find('#homePageLink').length) {
        // 					clearInterval(msghdrGreen);
        // 					hapoalim.urlLogOut = window.frames[0].bnhpApp.getAbsolutPortalContext();
        // 					window.frames[0].performTranAndUpdMenu('HomePage', 'action');
        // 					setTimeout(function () {
        // 						$('#filecontainerlogin').attr('src', '');
        // 						loginPage();
        // 					}, 1500);
        // 				}
        // 				else {
        // 					if ($('#filecontainerlogin').contents().find('#main').length || $('#filecontainerlogin').contents().find('#FRAMESET_TIME_OUT').length) {
        // 						if (window.frames[0].bnhpApp !== undefined) {
        // 							hapoalim.urlLogOut = window.frames[0].bnhpApp.getAbsolutPortalContext();
        // 							loginPage();
        // 						}
        // 						else {
        // 							$.get("https://login.bankhapoalim.co.il/portalserver/loginUpdateRoles?lang=he&changeCurrentAccount=yes").done(function (data) {
        // 								hapoalim.urlLogOut = "https://login.bankhapoalim.co.il/portalserver";
        // 								loginPage();
        // 							})
        // 						}
        // 					}
        // 				}
        // 			}, 2000);
        //
        // 			function loginPage() {
        // 				clearInterval(msghdrGreen);
        // 				setTimeout(function () {
        // 					$('#filecontainerlogin').attr('src', '');
        // 					if (!all.banks.openBankPage) {
        // 						all.banks.generalVariables.allDataArr = {
        // 							"ExporterId": all.banks.spiderConfig.spiderId,
        // 							"BankData": [
        // 								{
        // 									"TargetId": all.banks.accountDetails.bank.targetId,
        // 									"Token": all.banks.accountDetails.bank.token,
        // 									"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
        // 									"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
        // 									"Account": []
        // 								}
        // 							]
        // 						};
        // 						all.banks.generalVariables.arrDatesAsharai = [
        // 							(new Date().getFullYear() + '' + ("0" + (new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()).getMonth() + 1)).slice(-2) + '' + '00'),
        // 							(new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + '00')
        // 						];
        // 						all.banks.generalVariables.allDataArrAshrai = [];
        // 						all.banks.generalVariables.allDataArrLoan = [];
        // 						all.banks.generalVariables.allDataArrDeposit = [];
        // 						all.banks.generalVariables.allDataArrDueChecks = [];
        // 						all.banks.generalVariables.allDataArrStandingOrders = [];
        // 						all.banks.accounts.hapoalim.datebackslesh = all.banks.accountDetails.dateFrom.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateFrom.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateFrom.getDate())).slice(-2);
        // 						all.banks.accounts.hapoalim.datebacksleshTo = all.banks.accountDetails.dateTo.getFullYear() + '' + ("0" + (all.banks.accountDetails.dateTo.getMonth() + 1)).slice(-2) + '' + ("0" + (all.banks.accountDetails.dateTo.getDate())).slice(-2);
        // 						hapoalim.counterCardPrev = 0;
        // 						if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
        // 							all.banks.accounts.hapoalim.datebacksleshMatah = all.banks.accountDetails.dateFromMatah.getFullYear().toString() + ("0" + (all.banks.accountDetails.dateFromMatah.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateFromMatah.getDate())).slice(-2);
        // 							all.banks.accounts.hapoalim.datebacksleshToMatah = all.banks.accountDetails.dateToMatah.getFullYear().toString() + ("0" + (all.banks.accountDetails.dateToMatah.getMonth() + 1)).slice(-2) + ("0" + (all.banks.accountDetails.dateToMatah.getDate())).slice(-2);
        // 						}
        // 						hapoalim.loadData();
        // 					}
        // 					else {
        // 						all.banks.core.services.openBankPage("https://login.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=MainFrameSet&language=HE&u=p&nsv=y");
        // 					}
        // 				}, 5500);
        // 			}
        // 		}
        // 	}
        // 	catch (err) {
        // 		all.banks.core.services.errorLog(err)
        // 	}
        // }
    };

    hapoalim.convertDateLocal = function (dateLocal) {
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
    hapoalim.sendOshCtrl = function (matah) {
        all.banks.core.services.sendOsh(all.banks.generalVariables.allDataArr, matah)
            .then(function (arr) {
                if (!matah) {
                    myEmitterLogs(29);
                    all.banks.generalVariables.numChecksDrawn = 0;
                    all.banks.generalVariables.numChecksNotWithdrawn = 0;
                    hapoalim.accAsharai = 0;
                    hapoalim.indAcc = 0;
                    hapoalim.currentAcc = null;
                    if (all.banks.accountDetails.ccardMonth > 0) {
                        myEmitterLogs(14);
                        hapoalim.setAccAsharai()
                    } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                        myEmitterLogs(21);
                        hapoalim.loadLoan()
                    } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                        myEmitterLogs(34);
                        all.banks.generalVariables.allDataArr.BankData[0].Account = [];
                        hapoalim.loadMatah();
                    } else {
                        all.banks.accounts.hapoalim.logOut();
                    }
                } else {
                    all.banks.accounts.hapoalim.logOut();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.hapoalim.sendOshCtrl(matah);
                }
            })
    };
    hapoalim.sendChecksCtrl = function (formData) {
        var dfd = jQuery.Deferred();
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
                    all.banks.accounts.hapoalim.sendChecksCtrl(formData)
                }
            });
        return dfd.promise();
    };
    hapoalim.sendCardsCtrl = function () {
        all.banks.core.services.sendCards(all.banks.generalVariables.allDataArrAshrai)
            .then(function (arr) {
                if (all.banks.accountDetails.IND_NILVIM > 0) {
                    hapoalim.accAsharai = 0;
                    hapoalim.indAcc = 0;
                    hapoalim.currentAcc = null;
                    myEmitterLogs(21);
                    hapoalim.loadLoan();
                } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    myEmitterLogs(34);
                    all.banks.generalVariables.allDataArr.BankData[0].Account = [];
                    hapoalim.loadMatah();
                } else {
                    all.banks.accounts.hapoalim.logOut();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.hapoalim.sendCardsCtrl()
                }
            });
    };
    hapoalim.sendLoanCtrl = function () {
        all.banks.core.services.sendLoan(all.banks.generalVariables.allDataArrLoan)
            .then(function (arr) {
                hapoalim.indAcc = 0;
                hapoalim.currentAcc = null;
                myEmitterLogs(17);
                all.banks.accounts.hapoalim.loadDeposit();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    all.banks.accounts.hapoalim.sendLoanCtrl()
                }
            })
    };
    hapoalim.sendDepositCtrl = function () {
        all.banks.core.services.sendPikdonot(all.banks.generalVariables.allDataArrDeposit)
            .then(function (arr) {
                hapoalim.indAcc = 0;
                hapoalim.currentAcc = null;
                myEmitterLogs(19);
                hapoalim.loadDueChecks();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    hapoalim.sendDepositCtrl()
                }
            });
    };
    hapoalim.sendDueChecksCtrl = function () {
        all.banks.core.services.sendDueChecks(all.banks.generalVariables.allDataArrDueChecks)
            .then(function (arr) {
                hapoalim.indAcc = 0;
                hapoalim.currentAcc = null;
                myEmitterLogs(24);
                hapoalim.loadStandingOrders();
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    hapoalim.sendDueChecksCtrl()
                }
            });
    };
    hapoalim.sendStandingOrdersCtrl = function () {
        all.banks.core.services.sendStandingOrders(all.banks.generalVariables.allDataArrStandingOrders)
            .then(function (arr) {
                hapoalim.indAcc = 0;
                hapoalim.currentAcc = null;
                if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                    all.banks.generalVariables.allDataArr.BankData[0].Account = [];
                    myEmitterLogs(34);
                    hapoalim.loadMatah();
                } else {
                    hapoalim.logOut();
                }
            })
            .fail(function (error, resErr) {
                if (error == 'discard') {
                    hapoalim.sendStandingOrdersCtrl()
                }
            })
    };
    hapoalim.loadData = function () {
        var urlXhr = "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl + "/general/accounts";
        all.banks.core.services.httpReq(urlXhr, 'GET', null, false, false)
            .then(function (data, state, status, responseUrl) {
                if (typeof (data) == "object") {
                    try {
                        if ($(data).find('#userID').length > 0) {
                            myEmitterLogs(5); //login failed
                        } else {
                            if (responseUrl.includes('ssb')) {
                                hapoalim.paramUrl = "ssb";
                            }
                            all.banks.accounts.hapoalim.account = data;
                            if (all.banks.accountDetails.deleted_account_ids.length) {
                                all.banks.accounts.hapoalim.account = all.banks.accounts.hapoalim.account.filter(item => !(all.banks.accountDetails.deleted_account_ids.some(it => (item.accountNumber.toString()).includes(it.toString()))))
                            }
                            if (all.banks.accounts.hapoalim.account.length > 0) {
                                if (all.banks.accountDetails.days > 0) {
                                    hapoalim.loadAcc();
                                } else if (all.banks.accountDetails.ccardMonth > 0) {
                                    myEmitterLogs(14);
                                    hapoalim.setAccAsharai();
                                } else if (all.banks.accountDetails.IND_NILVIM > 0) {
                                    myEmitterLogs(21);
                                    hapoalim.loadLoan();
                                } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                                    all.banks.generalVariables.allDataArr.BankData[0].Account = [];
                                    myEmitterLogs(34);
                                    hapoalim.loadMatah();
                                } else {
                                    hapoalim.logOut();
                                }
                            } else {
                                myEmitterLogs(5); //login failed
                            }
                        }
                    } catch (err) {
                        all.banks.core.services.errorLog(err);
                    }
                } else {
                    hapoalim.paramUrl = "ssb";
                    hapoalim.loadData();
                }
            })
            .fail(function (error, resErr, urlParam) {
                if (hapoalim.paramUrl === "ssb") {
                    all.banks.core.services.errorLog(`url: ${urlParam}, status: ${error.status}`);
                } else {
                    hapoalim.paramUrl = "ssb";
                    hapoalim.loadData();
                }
//			hapoalim.paramUrl = "ssb";
//			hapoalim.loadData();
            });
    };
    hapoalim.loadAcc = function () {
        try {
            $(all.banks.accounts.hapoalim.account).each(function (ind, v) {
                if (ind == hapoalim.indAcc) {
                    hapoalim.currentAcc = {
                        'BankNumber': v.bankNumber,
                        'AccountNumber': v.accountNumber,
                        'BranchNumber': v.branchNumber
                    }
                    myEmitterLogs(10, hapoalim.currentAcc.AccountNumber); //change Acc
//					all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                    $.when(hapoalim.accDeta(v))
                        .then(function (data) {
                            if ((data instanceof Error) || data === false) {
//                                if (data == false) {
//                                    hapoalim.currentAcc.DataRow = [];
//                                    all.banks.generalVariables.allDataArr.BankData[0].Account.push(hapoalim.currentAcc);
//                                } else if (data instanceof Error) {
                                myEmitterLogs(37, v.bankNumber + '-' + v.branchNumber + '-' + v.accountNumber);
//                                }

                                if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                    hapoalim.indAcc = 0;
                                    hapoalim.currentAcc = null;
                                    hapoalim.getSendCheqs();
                                } else {
                                    hapoalim.indAcc = hapoalim.indAcc + 1;
                                    hapoalim.loadAcc();
                                }
                            } else {
                                all.banks.generalVariables.allDataArr.BankData[0].Account.push(hapoalim.currentAcc);
                                hapoalim.loadAllData(v);
                            }
                        });
                    return false;
                }
            });
        } catch (err) {
            all.banks.core.services.errorLog(err)
        }
    };
    hapoalim.accDeta = function (v) {
        var dfd = jQuery.Deferred();
        try {
            var urlXhr = "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl + "/current-account/composite/balanceAndCreditLimit?accountId=" + v.bankNumber + "-" + v.branchNumber + "-" + v.accountNumber + "&view=details";
            all.banks.core.services.httpReq(urlXhr, 'GET', null, false, false)
                .then(function (data, res1, res2) {
                    try {
                        if ($(data).find('h2').text().includes('אינו זמין') && hapoalim.paramUrl !== "ssb") {
                            // hapoalim.paramUrl = "ssb";
                            // $.when(hapoalim.accDeta(v)).then((rslt) => dfd.resolve(rslt));
                            hapoalim.currentAcc.Balance = null;
                            hapoalim.currentAcc.AccountCredit = null;
                            dfd.resolve(true);
                        } else {
                            hapoalim.currentAcc.Balance = data.currentBalance;
                            hapoalim.currentAcc.AccountCredit = data.currentAccountLimitsAmount;
                            dfd.resolve(true);
                        }
                    } catch (err) {
                        if (res2.status == 204 || res2.status == 302) {
                            hapoalim.currentAcc.Balance = null;
                            hapoalim.currentAcc.AccountCredit = null;
                            dfd.resolve(true);
                        } else {
                            dfd.resolve(err);
//						all.banks.core.services.errorLog(err)
                        }
                    }
                })
                .fail(function (error, resErr, urlParam) {
                    hapoalim.currentAcc.Balance = null;
                    hapoalim.currentAcc.AccountCredit = null;
                    dfd.resolve(true);

                    // if (hapoalim.paramUrl !== "ssb") {
                    //     hapoalim.paramUrl = "ssb";
                    //     $.when(hapoalim.accDeta(v)).then((rslt) => dfd.resolve(rslt));
                    // } else {
                    //     var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                    //     dfd.resolve(new Error(logErr));
                    //     // all.banks.core.services.errorLog(logErr)
                    // }
                });
        } catch (err) {
            dfd.resolve(err);
//			all.banks.core.services.errorLog(err);
        }
        return dfd.promise();
    };
    hapoalim.loadLoan = function () {
        $(all.banks.accounts.hapoalim.account).each(function (ind, val) {
            if (ind == hapoalim.indAcc) {
                var urlXhr = "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl + "/credit-and-mortgage/loans?accountId=" + all.banks.accounts.hapoalim.account[hapoalim.indAcc].bankNumber + '-' + all.banks.accounts.hapoalim.account[hapoalim.indAcc].branchNumber + '-' + all.banks.accounts.hapoalim.account[hapoalim.indAcc].accountNumber;
                all.banks.core.services.httpReq(urlXhr, 'GET', null, false, false)
                    .then(function (data, res1, res2) {
                        try {
                            if ($(data).find('h2').text().includes('אינו זמין') && hapoalim.paramUrl !== "ssb") {
                                hapoalim.paramUrl = "ssb";
                                hapoalim.loadLoan();
                                return
                            }
                            var indLoans = 0;

                            function loadLoans() {
                                $(data.data).each(function (i, v) {
                                    if (i == indLoans) {
                                        indLoans += 1;
                                        var url1 = "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl + "/credit-and-mortgage/loans/" + v.creditSerialNumber + "?accountId=" + all.banks.accounts.hapoalim.account[hapoalim.indAcc].bankNumber + "-" + data.branchNumber + "-" + data.accountNumber + "&unitedCreditTypeCode=" + v.unitedCreditTypeCode;
                                        all.banks.core.services.httpReq(url1, 'GET', null, false, false)
                                            .then(function (res) {
                                                all.banks.generalVariables.allDataArrLoan.push({
                                                    "TargetId": all.banks.accountDetails.bank.targetId,
                                                    "Token": all.banks.accountDetails.bank.token,
                                                    "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                    "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                    "ExporterId": all.banks.spiderConfig.spiderId,
                                                    "BranchNumber": data.branchNumber,
                                                    "AccountNumber": data.accountNumber,
                                                    "LoanName": v.creditTypeDescription,
                                                    "LoanNumber": v.creditSerialNumber,
                                                    "LoanIntrest": res.currentInterestPercent,
                                                    "LoanFinish": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(res.loanEndDate)),
                                                    "LoanTotalLeft": res.actualPrincipalBalance,
                                                    "LoanDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(res.valueDate)),
                                                    "PaymentsNumberLeft": res.principalPaymentsNumberBalance,
                                                    "LoanOriginalTotal": v.originalLoanPrincipalAmount,
                                                    "NextPaymentTotal": v.nextPaymentAmount,
                                                    "LoanNextPaymentDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(v.nextPaymentDate)),
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
                                                if (data.data.length == i + 1) {
                                                    if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                                        hapoalim.indAcc = 0;
                                                        hapoalim.currentAcc = null;
                                                        hapoalim.sendLoanCtrl();
                                                    } else {
                                                        hapoalim.indAcc = hapoalim.indAcc + 1;
                                                        hapoalim.loadLoan();
                                                    }
                                                } else {
                                                    loadLoans();
                                                }
                                            })
                                            .fail(function (error, resErr, urlParam) {
                                                if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                                    hapoalim.indAcc = 0;
                                                    hapoalim.currentAcc = null;
                                                    hapoalim.sendLoanCtrl()
                                                } else {
                                                    hapoalim.indAcc = hapoalim.indAcc + 1;
                                                    hapoalim.loadLoan()
                                                }
                                            });
                                        return false;
                                    }
                                });
                            }

                            loadLoans();
                        } catch (err) {
                            if (res2.status == 204) {
                                if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                    hapoalim.indAcc = 0;
                                    hapoalim.currentAcc = null;
                                    hapoalim.sendLoanCtrl();
                                } else {
                                    hapoalim.indAcc = hapoalim.indAcc + 1;
                                    hapoalim.loadLoan();
                                }
                            } else {
                                all.banks.core.services.errorLog(err)
                            }
                        }
                    })
                    .fail(function (error, resErr, urlParam) {
                        if (hapoalim.paramUrl !== "ssb") {
                            hapoalim.paramUrl = "ssb";
                            hapoalim.loadLoan();
                            return
                        } else {
                            if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                hapoalim.indAcc = 0;
                                hapoalim.currentAcc = null;
                                hapoalim.sendLoanCtrl();
                            } else {
                                hapoalim.indAcc = hapoalim.indAcc + 1;
                                hapoalim.loadLoan();
                            }
                        }

                    });
                return false;
            }
        });
    };
    hapoalim.loadDeposit = function () {
        $(all.banks.accounts.hapoalim.account).each(function (ind, val) {
            if (ind == hapoalim.indAcc) {
                var urlXhr = "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl + "/deposits-and-savings/composite?accountId=" + val.bankNumber + '-' + val.branchNumber + '-' + val.accountNumber + "&view=totals";
                all.banks.core.services.httpReq(urlXhr, 'GET', null, false, false)
                    .then(function (data, res1, res2) {
                        try {
                            if (data.messageCode == undefined) {
                                function loadSavingsDeposits() {
                                    var urls = "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl + "/deposits-and-savings/savingsDeposits?accountId=" + val.bankNumber + '-' + val.branchNumber + '-' + val.accountNumber + "&view=details";
                                    all.banks.core.services.httpReq(urls, 'GET', null, false, false)
                                        .then(function (data) {
                                            if (data && data.list !== undefined && data.list.length) {
                                                $(data.list).each(function (indx, va) {
                                                    $(va.data).each(function (idx, v) {
                                                        all.banks.generalVariables.allDataArrDeposit.push({
                                                            "TargetId": all.banks.accountDetails.bank.targetId,
                                                            "Token": all.banks.accountDetails.bank.token,
                                                            "BankNumber": val.bankNumber,
                                                            "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                            "ExporterId": all.banks.spiderConfig.spiderId,
                                                            "AccountNumber": val.accountNumber,
                                                            "BranchNumber": val.branchNumber,
                                                            "TypeName": v.shortSavingDepositName,
                                                            "DepositTotal": v.principalAmount,
                                                            "DepositAsTotal": v.revaluedBalance,
                                                            "DueDate": null, // all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(v.agreementOpeningDate)),
                                                            "DepositDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(v.agreementOpeningDate)),
                                                            "DepositExistStation": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(v.paymentDate)),
                                                            "DepositNumber": v.eventNumber,
                                                            "DepositInterest": null
                                                        });
                                                    })
                                                    if (data.list.length == indx + 1) {
                                                        if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                                            hapoalim.indAcc = 0;
                                                            hapoalim.currentAcc = null;
                                                            hapoalim.sendDepositCtrl();
                                                        } else {
                                                            hapoalim.indAcc = hapoalim.indAcc + 1;
                                                            hapoalim.loadDeposit();
                                                        }
                                                    }
                                                });
                                            } else {
                                                if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                                    hapoalim.indAcc = 0;
                                                    hapoalim.currentAcc = null;
                                                    hapoalim.sendDepositCtrl();
                                                } else {
                                                    hapoalim.indAcc = hapoalim.indAcc + 1;
                                                    hapoalim.loadDeposit();
                                                }
                                            }
                                        })
                                        .fail(function (error, resErr, urlParam) {
                                            if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                                hapoalim.indAcc = 0;
                                                hapoalim.currentAcc = null;
                                                hapoalim.sendDepositCtrl();
                                            } else {
                                                hapoalim.indAcc = hapoalim.indAcc + 1;
                                                hapoalim.loadDeposit();
                                            }
                                        });
                                };

                                var url1 = "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl + "/deposits-and-savings/deposits?accountId=" + val.bankNumber + '-' + val.branchNumber + '-' + val.accountNumber + "&view=details";
                                all.banks.core.services.httpReq(url1, 'GET', null, false, false)
                                    .then(function (res, res1, res2) {
                                        if (res2.status !== 204 && res.list !== undefined && res.list.length) {
                                            $(res.list).each(function (indx, va) {
                                                $(va.data).each(function (idx, v) {
                                                    all.banks.generalVariables.allDataArrDeposit.push({
                                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                                        "Token": all.banks.accountDetails.bank.token,
                                                        "BankNumber": val.bankNumber,
                                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                                        "AccountNumber": val.accountNumber,
                                                        "BranchNumber": val.branchNumber,
                                                        "TypeName": v.shortProductName,
                                                        "DepositTotal": v.principalAmount,
                                                        "DepositAsTotal": v.revaluedTotalAmount,
                                                        "DueDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(v.paymentDate)),
                                                        "DepositDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(v.startExitDate)),
                                                        "DepositExistStation": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(v.paymentDate)),
                                                        "DepositNumber": v.depositSerialId,
                                                        "DepositInterest": v.adjustedInterest
                                                    });
                                                })
                                                if (res.list.length == indx + 1) {
                                                    loadSavingsDeposits();
                                                }
                                            });
                                        } else {
                                            loadSavingsDeposits();
                                        }
                                    })
                                    .fail(function (error, resErr, urlParam) {
                                        loadSavingsDeposits();
                                    });
                            } else {
                                if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                    hapoalim.indAcc = 0;
                                    hapoalim.currentAcc = null;
                                    hapoalim.sendDepositCtrl()
                                } else {
                                    hapoalim.indAcc = hapoalim.indAcc + 1;
                                    hapoalim.loadDeposit()
                                }
                            }
                        } catch (err) {
                            if (res2.status == 204) {
                                if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                    hapoalim.indAcc = 0;
                                    hapoalim.currentAcc = null;
                                    hapoalim.sendDepositCtrl();
                                } else {
                                    hapoalim.indAcc = hapoalim.indAcc + 1;
                                    hapoalim.loadDeposit();
                                }
                            } else {
                                all.banks.core.services.errorLog(err);
                            }
                        }
                    })
                    .fail(function (error, resErr, urlParam) {
                        if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                            hapoalim.indAcc = 0;
                            hapoalim.currentAcc = null;
                            hapoalim.sendDepositCtrl();
                        } else {
                            hapoalim.indAcc = hapoalim.indAcc + 1;
                            hapoalim.loadDeposit();
                        }
                    });
                return false;
            }
        })
    };
    hapoalim.loadDueChecks = function () {
        var dateBasic = new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getDate() + 1));
        var dateFrom = dateBasic.getFullYear() + '' + ("0" + (dateBasic.getMonth() + 1)).slice(-2) + ("0" + (dateBasic.getDate())).slice(-2);
        var dateToFormat = new Date(new Date().getFullYear(), new Date().getMonth() + 36, new Date().getDate());
        var dateTo = dateToFormat.getFullYear() + '' + ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + ("0" + (dateToFormat.getDate())).slice(-2);
        $(all.banks.accounts.hapoalim.account).each(function (ind, val) {
            if (ind == hapoalim.indAcc) {
                var urlXhr = "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl + "/current-account/cheques?accountId=" + val.bankNumber + '-' + val.branchNumber + '-' + val.accountNumber + "&endDate=" + dateTo + "&startDate=" + dateFrom + "&type=details&view=custody";
                all.banks.core.services.httpReq(urlXhr, 'GET', null, false, false)
                    .then(function (data, res1, res2) {
                        try {
                            if (data.chequeInCustodyList !== undefined) {
                                $(data.chequeInCustodyList).each(function (indx, va) {
                                    all.banks.generalVariables.allDataArrDueChecks.push({
                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                        "Token": all.banks.accountDetails.bank.token,
                                        "BankNumber": val.bankNumber,
                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "AccountNumber": val.accountNumber,
                                        "BranchNumber": val.branchNumber,
                                        "CheckNumber": va.referenceNumber,
                                        "CheckDescription": va.eventNumber,
                                        "DepositeDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(va.depositDate)),
                                        "DueDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(va.paymentDate)),
                                        "CheckTotal": va.chequeAmount,
                                        "CheckBankNumber": va.payingBankNumber,
                                        "CheckAccountNumber": va.payingAccountNumber,
                                        "CheckBranchNumber": va.payingBranchNumber
                                    });
                                    if (data.chequeInCustodyList.length == indx + 1) {
                                        if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                            hapoalim.indAcc = 0;
                                            hapoalim.currentAcc = null;
                                            hapoalim.sendDueChecksCtrl();
                                        } else {
                                            hapoalim.indAcc = hapoalim.indAcc + 1;
                                            hapoalim.loadDueChecks();
                                        }
                                    }
                                });
                            } else {
                                if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                    hapoalim.indAcc = 0;
                                    hapoalim.currentAcc = null;
                                    hapoalim.sendDueChecksCtrl();
                                } else {
                                    hapoalim.indAcc = hapoalim.indAcc + 1;
                                    hapoalim.loadDueChecks();
                                }
                            }
                        } catch (err) {
                            if (res2.status == 204) {
                                if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                    hapoalim.indAcc = 0;
                                    hapoalim.currentAcc = null;
                                    hapoalim.sendDueChecksCtrl();
                                } else {
                                    hapoalim.indAcc = hapoalim.indAcc + 1;
                                    hapoalim.loadDueChecks();
                                }
                            } else {
                                all.banks.core.services.errorLog(err)
                            }
                        }
                    })
                    .fail(function (error, resErr, urlParam) {
                        if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                            hapoalim.indAcc = 0;
                            hapoalim.currentAcc = null;
                            hapoalim.sendDueChecksCtrl();
                        } else {
                            hapoalim.indAcc = hapoalim.indAcc + 1;
                            hapoalim.loadDueChecks();
                        }
                    });
                return false;
            }
        })
    };
    hapoalim.loadStandingOrders = function () {
        $(all.banks.accounts.hapoalim.account).each(function (ind, val) {
            if (ind == hapoalim.indAcc) {
                var urlXhr = "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl + "/current-account/standingOrders?accountId=" + val.bankNumber + '-' + val.branchNumber + '-' + val.accountNumber;
                all.banks.core.services.httpReq(urlXhr, 'GET', null, false, false)
                    .then(function (data, res1, res2) {
                        try {
                            function loadDebitAuthorizations() {
                                var urlXhr = "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl + "/current-account/debitAuthorizations?accountId=" + val.bankNumber + '-' + val.branchNumber + '-' + val.accountNumber;
                                all.banks.core.services.httpReq(urlXhr, 'GET', null, false, false)
                                    .then(function (res, res1, res2) {
                                        try {
                                            if (res.debitAuthorizations.length) {
                                                $(res.debitAuthorizations).each(function (indx1, va1) {
                                                    all.banks.generalVariables.allDataArrStandingOrders.push({
                                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                                        "Token": all.banks.accountDetails.bank.token,
                                                        "BankNumber": val.bankNumber,
                                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                                        "AccountNumber": val.accountNumber,
                                                        "BranchNumber": val.branchNumber,
                                                        "OrderName": va1.institutionName,
                                                        "OrderOpeningDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(va1.agreementOpeningDate)),
                                                        "OrderLastDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(va1.debitDate)),
                                                        "OrderTotal": va1.debitAmount,
                                                        "OrderNumber": va1.institutionShortSerialId,
                                                        "Asmachta": null,
                                                        BankTransferNumber: null,
                                                        BranchTransferNumber: null,
                                                        AccountTransferNumber: null,
                                                        NamePayerTransfer: null,
                                                        Type: 1,
                                                    });
                                                    if (res.debitAuthorizations.length == indx1 + 1) {
                                                        if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                                            hapoalim.indAcc = 0;
                                                            hapoalim.currentAcc = null;
                                                            hapoalim.sendStandingOrdersCtrl();
                                                        } else {
                                                            hapoalim.indAcc = hapoalim.indAcc + 1;
                                                            hapoalim.loadStandingOrders();
                                                        }
                                                    }
                                                });
                                            } else {
                                                if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                                    hapoalim.indAcc = 0;
                                                    hapoalim.currentAcc = null;
                                                    hapoalim.sendStandingOrdersCtrl();
                                                } else {
                                                    hapoalim.indAcc = hapoalim.indAcc + 1;
                                                    hapoalim.loadStandingOrders();
                                                }
                                            }
                                        } catch (err) {
                                            if (res2.status == 204) {
                                                if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                                    hapoalim.indAcc = 0;
                                                    hapoalim.currentAcc = null;
                                                    hapoalim.sendStandingOrdersCtrl();
                                                } else {
                                                    hapoalim.indAcc = hapoalim.indAcc + 1;
                                                    hapoalim.loadStandingOrders();
                                                }
                                            } else {
                                                all.banks.core.services.errorLog(err)
                                            }
                                        }
                                    })
                                    .fail(function (error, resErr) {
                                        if (error.status == 418) {
                                            writeLog(urlXhr + ": " + "אין נתונים זמינים");
                                        } else {
                                            writeLog(urlXhr + ": " + error.status + " " + resErr);
                                        }
                                        if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                            hapoalim.indAcc = 0;
                                            hapoalim.currentAcc = null;
                                            hapoalim.sendStandingOrdersCtrl();
                                        } else {
                                            hapoalim.indAcc = hapoalim.indAcc + 1;
                                            hapoalim.loadStandingOrders();
                                        }
                                    });
                            }

                            if (data.length) {
                                $(data).each(function (indx, va) {
                                    all.banks.generalVariables.allDataArrStandingOrders.push({
                                        "TargetId": all.banks.accountDetails.bank.targetId,
                                        "Token": all.banks.accountDetails.bank.token,
                                        "BankNumber": val.bankNumber,
                                        "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                        "ExporterId": all.banks.spiderConfig.spiderId,
                                        "AccountNumber": val.accountNumber,
                                        "BranchNumber": val.branchNumber,
                                        "OrderName": va.standingOrderProductDescription,
                                        "OrderOpeningDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(va.updatingDate)),
                                        "OrderLastDate": null,
                                        "OrderTotal": va.standingOrderAmount,
                                        "OrderNumber": va.accountOrderId,
                                        "Asmachta": null,
                                        BankTransferNumber: va.creditedBankNumber,
                                        BranchTransferNumber: va.transferDestinationReference,
                                        AccountTransferNumber: va.transferSubDestinationReference,
                                        NamePayerTransfer: null,
                                        Type: 2,
                                    });
                                    if (data.length == indx + 1) {
                                        loadDebitAuthorizations()
                                    }
                                });
                            } else {
                                if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                    hapoalim.indAcc = 0;
                                    hapoalim.currentAcc = null;
                                    hapoalim.sendStandingOrdersCtrl();
                                } else {
                                    hapoalim.indAcc = hapoalim.indAcc + 1;
                                    hapoalim.loadStandingOrders();
                                }
                            }
                        } catch (err) {
                            if (res2.status == 204) {
                                //if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                                //	hapoalim.indAcc = 0;
                                //	hapoalim.sendStandingOrdersCtrl();
                                //}
                                //else {
                                //	hapoalim.indAcc = hapoalim.indAcc + 1;
                                //	hapoalim.loadStandingOrders();
                                //}
                                loadDebitAuthorizations();
                            } else {
                                all.banks.core.services.errorLog(err);
                            }
                        }
                    })
                    .fail(function (error, resErr, urlParam) {
                        if (ind + 1 == all.banks.accounts.hapoalim.account.length) {
                            hapoalim.indAcc = 0;
                            hapoalim.currentAcc = null;
                            hapoalim.sendStandingOrdersCtrl();
                        } else {
                            hapoalim.indAcc = hapoalim.indAcc + 1;
                            hapoalim.loadStandingOrders();
                        }
                    });
                return false;
            }
        })
    };
    hapoalim.loadAllData = function (v) {

        let allRowsFtched = false;
        let lastResult = null;
        hapoalim.currentAcc.DataRow = [];
        myEmitterLogs(11); // get data

        loopPortions();


        function loopPortions() {
            let fullDataRows = {};
            let eventsStatusDataList = null;

            async function getAllOshData() {
                let dateFromFormat = all.banks.accounts.hapoalim.datebackslesh;

                try {
                    const params_signatures = {
                        url: "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl
                            + "/current-account/signatures/events"
                            + (hapoalim.last_data_headerVal ? ("/" + hapoalim.last_data_headerVal) : "")
                            + "?accountId=" + v.bankNumber + "-" + v.branchNumber + "-" + v.accountNumber
                            + "&limit=500&offset=0&handlingEventRetrievalSwitch=2&lang=he"
                            + "&endDate=" + all.banks.accounts.hapoalim.datebacksleshTo + "&startDate=" + dateFromFormat,
                        xhrFields: {
                            withCredentials: true
                        },
                        method: "GET",
                        type: "GET",
                        beforeSend: function (xhr) {
                            if (hapoalim.xsrfToken) {
                                xhr.setRequestHeader('X-XSRF-TOKEN', all.banks.accounts.hapoalim.xsrfToken);
                            }
                            if (lastResult !== null && hapoalim.last_data_headerVal) {
                                xhr.setRequestHeader('data-header', hapoalim.last_data_headerVal);
                            }
                            if (lastResult !== null && hapoalim.integrity_header) {
                                xhr.setRequestHeader('integrity-header', hapoalim.integrity_header);
                            }
                        }
                    };
                    eventsStatusDataList = await $.ajax(params_signatures);
                    console.log(eventsStatusDataList)
                    if (eventsStatusDataList && eventsStatusDataList.eventsStatusDataList && eventsStatusDataList.eventsStatusDataList.length) {
                        eventsStatusDataList = eventsStatusDataList.eventsStatusDataList;
                    } else {
                        eventsStatusDataList = null;
                    }
                } catch (err) {
                    console.log(err);
                }

                // if (hapoalim.currentAcc.Balance === null) {
                //     const dateFromBalanceNull = new Date();
                //     dateFromBalanceNull.setMonth(dateFromBalanceNull.getMonth() - 2);
                //     dateFromFormat = dateFromBalanceNull.getFullYear() + '' + ("0" + (dateFromBalanceNull.getMonth() + 1)).slice(-2) + '' + ("0" + (dateFromBalanceNull.getDate())).slice(-2);
                // }
                const paramsa = {
                    url: "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl
                        + "/current-account/transactions"
                        + (hapoalim.last_data_headerVal ? ("/" + hapoalim.last_data_headerVal) : "")
                        + "?accountId=" + v.bankNumber + "-" + v.branchNumber + "-" + v.accountNumber
                        + "&numItemsPerPage=150&sortCode=2&lang=he"
                        + "&retrievalEndDate=" + all.banks.accounts.hapoalim.datebacksleshTo + "&retrievalStartDate=" + dateFromFormat,
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
                        if (hapoalim.xsrfToken) {
                            xhr.setRequestHeader('X-XSRF-TOKEN', all.banks.accounts.hapoalim.xsrfToken);
                        }
                        if (lastResult !== null && hapoalim.last_data_headerVal) {
                            xhr.setRequestHeader('data-header', hapoalim.last_data_headerVal);
                        }
                        if (lastResult !== null && hapoalim.integrity_header) {
                            xhr.setRequestHeader('integrity-header', hapoalim.integrity_header);
                        }
                    }
                };
                $.ajax(paramsa)
                    .done(function (data, res1, res2) {
                        if (res2.status === 204) {
                            const paramsa2 = {
                                url: "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl
                                    + "/current-account/transactions"
                                    + (hapoalim.last_data_headerVal ? ("/" + hapoalim.last_data_headerVal) : "")
                                    + "?accountId=" + v.bankNumber + "-" + v.branchNumber + "-" + v.accountNumber
                                    + "&numItemsPerPage=150&sortCode=1&lang=he",
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
                                    if (hapoalim.xsrfToken) {
                                        xhr.setRequestHeader('X-XSRF-TOKEN', all.banks.accounts.hapoalim.xsrfToken);
                                    }
                                    if (lastResult !== null && hapoalim.last_data_headerVal) {
                                        xhr.setRequestHeader('data-header', hapoalim.last_data_headerVal);
                                    }
                                    if (lastResult !== null && hapoalim.integrity_header) {
                                        xhr.setRequestHeader('integrity-header', hapoalim.integrity_header);
                                    }
                                }
                            };
                            $.ajax(paramsa2)
                                .done(function (data, res1, res2) {
                                    runOshTable(res2, data)
                                })
                                .fail(function (error, resErr, urlParam) {
                                    allRowsFtched = true;
                                    nextPortionOrComplete();
                                });
                        } else {
                            if (data && data.transactions && data.transactions.length === 510 || (fullDataRows && fullDataRows.transactions)) {
                                if (fullDataRows && fullDataRows.transactions) {
                                    fullDataRows.transactions = fullDataRows.transactions.concat(data.transactions)
                                } else {
                                    fullDataRows = data;
                                }
                            }

                            // if(!hapoalim.last_data_headerVal && data && data.transactions && data.transactions.length === 510){
                            //
                            // }else{
                            //     if (data && data.transactions) {
                            //         if (fullDataRows && fullDataRows.transactions) {
                            //             fullDataRows.transactions = fullDataRows.transactions.concat(data.transactions)
                            //         } else {
                            //             fullDataRows = data;
                            //         }
                            //     }
                            // }
                            lastResult = (fullDataRows && fullDataRows.transactions) ? fullDataRows : data;
                            if (data && data.transactions && data.transactions.length === 510) {
                                let last_data_headerVal = res2.getResponseHeader('data-header');
                                if (last_data_headerVal) {
                                    hapoalim.last_data_headerVal = last_data_headerVal;
                                }
                                let last_integrity_header = res2.getResponseHeader('integrity-header');
                                if (last_integrity_header) {
                                    hapoalim.integrity_header = last_integrity_header;
                                }
                                getAllOshData()
                            } else {

                                data = lastResult;
                                runOshTable(res2, data)
                            }
                        }

                        function runOshTable(res2, data) {
                            const last_data_headerVal = res2.getResponseHeader('data-header');
                            allRowsFtched = !last_data_headerVal;
                            if (!allRowsFtched) {
                                hapoalim.last_data_headerVal = last_data_headerVal;
                                hapoalim.integrity_header = res2.getResponseHeader('integrity-header');
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
                        }
                    })
                    .fail(function (error, resErr, urlParam) {
                        allRowsFtched = true;
                        nextPortionOrComplete();
                    });
            }

            getAllOshData()


            function doPortion() {
                if (!lastResult || !lastResult.transactions || lastResult.transactions.length === 0) {
                    nextPortionOrComplete();
                    return;
                }

//                lastResult.transactions.sort(function (a, b) {
//                    return (a.expandedEventDate > b.expandedEventDate) ? 1 : -1;
//                });
                // In case of closed account we won't get its balance in accDeta, then we take its last transaction balance value from last portion
                if (hapoalim.currentAcc.Balance === null && allRowsFtched) {
                    hapoalim.currentAcc.Balance = lastResult.transactions[lastResult.transactions.length - 1].currentBalance;
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
                                && (val.activityTypeCode !== 473);
                            // commented as part of https://bizibox.atlassian.net/browse/SPI-1703
                            // && val.activityDescription !== "הפ'.תיק ממסרים";

                            const hasHaavaraChainType = val.activityTypeCode === 485 && val.internalLinkCode === 13;
                            if (all.banks.accountDetails.checks == true && hasCheckActivityType) {

                                function loadChecksInside() {
                                    var urlXhrCheck = "https://login.bankhapoalim.co.il" + val.details + "&accountId=" + v.bankNumber + "-" + v.branchNumber + "-" + v.accountNumber;
                                    $.when(hapoalim.getBase64FromImageUrl(urlXhrCheck, val))
                                        .then(function (arr) {
                                            val.details = null;
                                            hapoalim.currentAcc.DataRow.push({
                                                "Asmachta": hapoalim.retrieveAsmachta(val), // val.referenceNumber,
                                                "TransDesc": activityDescription + (val.comment ? (' ' + val.comment) : ''),
                                                "ValueDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(val.eventDate)),
                                                "TransactionType": transactionTypes,
                                                "TransTotal": val.eventAmount,
                                                "Balance": val.currentBalance,
                                                "IsDaily": isDaily,
                                                "imgs": arr
                                            });
                                            moveOn();
                                        })
                                        .fail(function () {
                                            loadChecksInside();
                                        });
                                }

                                loadChecksInside();

                                return false;

                            } else {
                                const trans = {
                                    "Asmachta": hapoalim.retrieveAsmachta(val), // val.referenceNumber,
                                    "TransDesc": activityDescription + (val.comment ? (' ' + val.comment) : ''),
                                    "ValueDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(val.eventDate)),
                                    "TransactionType": transactionTypes,
                                    "TransTotal": val.eventAmount,
                                    "Balance": val.currentBalance,
                                    "IsDaily": isDaily,
                                    "imgs": null
                                };
                                hapoalim.currentAcc.DataRow.push(trans);

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
                                        } else if (val.activityDescription === "הפ'.תיק ממסרים") { // added as part of https://bizibox.atlassian.net/browse/SPI-1703
                                            const thisAcc = all.banks.generalVariables.allDataArr.BankData[0].Account[0];
                                            dtd.BankTransferNumber = thisAcc.BankNumber
                                            dtd.BranchTransferNumber = thisAcc.BankNumber;
                                            dtd.AccountTransferNumber = thisAcc.AccountNumber;
                                        }
                                    }
                                } else if (hasHaavaraChainType && eventsStatusDataList) {
                                    const foundHaavara = eventsStatusDataList.find(it => (val.eventAmount === it.eventAmount && val.eventDate === it.eventCreateDate));
                                    if (foundHaavara) {
                                        const params_signatures_collections = {
                                            url: "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl
                                                + "/current-account/transfers/collections/signatures"
                                                + (hapoalim.last_data_headerVal ? ("/" + hapoalim.last_data_headerVal) : "")
                                                + "?accountId=" + v.bankNumber + "-" + v.branchNumber + "-" + v.accountNumber
                                                + "&offset=0&limit=500&eventId=" + foundHaavara.eventId + "&actionCode=0&processId=0&messageSwitch=0&lang=he",
                                            xhrFields: {
                                                withCredentials: true
                                            },
                                            method: "GET",
                                            type: "GET",
                                            beforeSend: function (xhr) {
                                                if (hapoalim.xsrfToken) {
                                                    xhr.setRequestHeader('X-XSRF-TOKEN', all.banks.accounts.hapoalim.xsrfToken);
                                                }
                                                if (lastResult !== null && hapoalim.last_data_headerVal) {
                                                    xhr.setRequestHeader('data-header', hapoalim.last_data_headerVal);
                                                }
                                                if (lastResult !== null && hapoalim.integrity_header) {
                                                    xhr.setRequestHeader('integrity-header', hapoalim.integrity_header);
                                                }
                                            }
                                        };
                                        $.ajax(params_signatures_collections)
                                            .done(function (data, res1, res2) {
                                                trans.DepositeTransferData = [];
                                                if (data && data.beneficiariesList && data.beneficiariesList.length) {
                                                    data.beneficiariesList.forEach((beneficiaryItem) => {
                                                        trans.DepositeTransferData.push({
                                                            "DepositeTransferDate": trans.ValueDate,
                                                            "TransferTotal": beneficiaryItem.deliveryAmount,
                                                            "BankTransferNumber": beneficiaryItem.creditedBankNumber,
                                                            "BranchTransferNumber": beneficiaryItem.creditedBranchNumber,
                                                            "AccountTransferNumber": beneficiaryItem.creditedAccountNumber,
                                                            "NamePayerTransfer": beneficiaryItem.beneficiaryName,
                                                            "DetailsTransfer": beneficiaryItem.bankName
                                                        });
                                                    })
                                                }
                                                moveOn();
                                            })
                                            .fail(function (error, resErr, urlParam) {
                                                moveOn();
                                            });
                                    } else {
                                        moveOn();
                                    }
                                    // loadGroupedTransfersDetails(trans);
                                    return false;
                                }

                                if (lastResult.transactions.length === indexLoop + 1) {
                                    nextPortionOrComplete();
                                }
                            }
                        }
                    });
                }

                function loadGroupedTransfersDetails(trans) {

                    // all.banks.core.services.httpReq(
                    //     'https://biz2.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=changeCoExistenceCurrentAccount&changeCurrentAccount=yes&selectedAccount='
                    //     + [hapoalim.currentAcc['BankNumber'], hapoalim.currentAcc['BranchNumber'], hapoalim.currentAcc['AccountNumber']].join('-'),
                    //     'POST', {}, false, false)

                    all.banks.core.services.httpReq(
                        'https://biz2.bankhapoalim.co.il/ServerServices/general/accounts/selectedAccount?accountId=' + [hapoalim.currentAcc['BankNumber'], hapoalim.currentAcc['BranchNumber'], hapoalim.currentAcc['AccountNumber']].join('-') + '&view=partyRelationshipManager&lang=he',
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
                                        var rows = $$.find('#mytable_body > tbody > tr');
                                        console.log('rows -> ' + rows.length);
                                        trans.DepositeTransferData = rows.map(function (idx, el) {
                                            var tds = $(el).find("td");
                                            return {
                                                "DepositeTransferDate": trans.ValueDate,
                                                "TransferTotal": tds.eq(0).text().replace(/[^\d\.-]/g, ""),
                                                "BankTransferNumber": tds.eq(4).text().replace(/\D/g, ""),
                                                "BranchTransferNumber": tds.eq(3).text().replace(/\D/g, ""),
                                                "AccountTransferNumber": tds.eq(2).text().replace(/\D/g, ""),
                                                "NamePayerTransfer": tds.eq(1).text().split("").reverse().join(""),
                                                "DetailsTransfer": null
                                            };
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
                if (hapoalim.currentAcc.Balance === null) {
                    myEmitterLogs(37, v.branchNumber + '-' + v.accountNumber);
                    all.banks.generalVariables.allDataArr.BankData[0].Account.pop();
                } else {
                    myEmitterLogs(12, hapoalim.currentAcc.DataRow.length); //length arr
                }

                if (hapoalim.indAcc + 1 === all.banks.accounts.hapoalim.account.length) {
                    hapoalim.indAcc = 0;
                    hapoalim.currentAcc = null;
                    hapoalim.getSendCheqs();
                } else {
                    hapoalim.indAcc = hapoalim.indAcc + 1;
                    hapoalim.loadAcc();
                }
            }
        }

        // var urlXhr = "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl + "/current-account/transactions?accountId=" + v.bankNumber + "-" + v.branchNumber + "-" + v.accountNumber + "&numItemsPerPage=999999&retrievalEndDate=" + all.banks.accounts.hapoalim.datebacksleshTo + "&retrievalStartDate=" + all.banks.accounts.hapoalim.datebackslesh;
        // var paramsa = {
        //     url: urlXhr,
        //     xhrFields: {
        //         withCredentials: true
        //     },
        //     method: "POST",
        //     type: "POST",
        //     data: JSON.stringify([]),
        //     headers: {
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json;charset=UTF-8'
        //     },
        //     beforeSend: function (xhr) {
        //         if (hapoalim.xsrfToken) {
        //             xhr.setRequestHeader('X-XSRF-TOKEN', all.banks.accounts.hapoalim.xsrfToken);
        //         }
        //     }
        // };
        // $.ajax(paramsa)
        //         .done(function (data, res1, res2) {
        //         	debugger
        //         }).fail(function(){
        //         	debugger
        // })
//                    try {
//                        myEmitterLogs(11); // get data
//                        if (data.transactions.length == 0) {
//                            hapoalim.currentAcc.DataRow = [];
//                            myEmitterLogs(12, hapoalim.currentAcc.DataRow.length); //length arr
//                            if (hapoalim.indAcc + 1 == all.banks.accounts.hapoalim.account.length) {
//                                hapoalim.indAcc = 0;
//                                hapoalim.currentAcc = null;
//                                hapoalim.getSendCheqs()
//                            } else {
//                                hapoalim.indAcc = hapoalim.indAcc + 1;
//                                hapoalim.loadAcc()
//                            }
//                        } else {
//                            hapoalim.currentAcc.DataRow = [];
//                            var idxLoop = 0;
//                            var transactions = data.transactions.sort(function (a, b) {
//                                return (a.expandedEventDate > b.expandedEventDate) ? 1 : -1;
//                            });
//                            data.transactions = transactions;
//
//                            // In case of closed account we won't get its balance in accDeta, then we take its last transaction balance value
//                            if (hapoalim.currentAcc.Balance === null) {
//                                hapoalim.currentAcc.Balance = data.transactions[data.transactions.length - 1].currentBalance;
//                            }
//
//                            function loopPeulot() {
//                                $(data.transactions).each(function (indexLoop, val) {
//                                    if (idxLoop == indexLoop) {
//                                        idxLoop += 1;
//                                        var transactionTypes, isDaily;
//                                        if (val.eventActivityTypeCode == 1) {
//                                            transactionTypes = '1';
//                                        } else if (val.eventActivityTypeCode == 2) {
//                                            transactionTypes = '0';
//                                        }
//                                        if (val.transactionType == 'REGULAR') {
//                                            isDaily = '0';
//                                        } else {
//                                            isDaily = '1';
//                                        }
//                                        var activityDescription = val.activityDescription;
////								if (val.beneficiaryDetailsData !== null) {
////									var partyHeadline = "";
////									if (val.beneficiaryDetailsData.partyHeadline !== null) {
////										partyHeadline = val.beneficiaryDetailsData.partyHeadline;
////									}
////									var partyName = "";
////									if (val.beneficiaryDetailsData.partyName !== null) {
////										partyName = val.beneficiaryDetailsData.partyName;
////									}
////									var messageHeadline = "";
////									if (val.beneficiaryDetailsData.messageHeadline !== null) {
////										messageHeadline = val.beneficiaryDetailsData.messageHeadline;
////									}
////									var messageDetail = "";
////									if (val.beneficiaryDetailsData.messageDetail !== null) {
////										messageDetail = val.beneficiaryDetailsData.messageDetail.replace(/\s\s+/g, ' ');
////									}
////									activityDescription = partyHeadline + ' ' + partyName + ', ' + messageHeadline + ' ' + messageDetail + ', ' + activityDescription;
////								}
//                                        const hasCheckActivityType = val.details !== null
//                                                && (val.activityTypeCode == 493 || val.activityTypeCode == 143 || val.activityTypeCode == 183
//                                                        || val.activityTypeCode == 272 || val.activityTypeCode == 205
//                                                        || val.activityTypeCode == 191 || val.activityTypeCode == 485
//                                                        || val.activityTypeCode == 140 || val.activityTypeCode == 396);
//                                        const hasHaavaraActivityType = val.beneficiaryDetailsData !== null && !hasCheckActivityType
//                                                && (val.activityTypeCode !== 473) && val.activityDescription !== "הפ'.תיק ממסרים";
//                                        const hasHaavaraChainType = val.activityTypeCode === 485 && val.internalLinkCode === 13;
//                                        if (all.banks.accountDetails.checks == true && hasCheckActivityType) {
//                                            function loadChecksInside() {
//                                                var urlXhrCheck = "https://login.bankhapoalim.co.il" + val.details + "&accountId=" + v.bankNumber + "-" + v.branchNumber + "-" + v.accountNumber;
//                                                $.when(hapoalim.getBase64FromImageUrl(urlXhrCheck, val))
//                                                        .then(function (arr) {
//                                                            val.details = null;
//                                                            hapoalim.currentAcc.DataRow.push({
//                                                                "Asmachta": val.referenceNumber,
//                                                                "TransDesc": activityDescription,
//                                                                "ValueDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(val.eventDate)),
//                                                                "TransactionType": transactionTypes,
//                                                                "TransTotal": val.eventAmount,
//                                                                "Balance": val.currentBalance,
//                                                                "IsDaily": isDaily,
//                                                                "imgs": arr
//                                                            });
//                                                            if (data.transactions.length == indexLoop + 1) {
//                                                                myEmitterLogs(12, hapoalim.currentAcc.DataRow.length); //length arr
//                                                                if (hapoalim.indAcc + 1 == all.banks.accounts.hapoalim.account.length) {
//                                                                    hapoalim.indAcc = 0;
//                                                                    hapoalim.currentAcc = null;
//                                                                    hapoalim.getSendCheqs();
//                                                                } else {
//                                                                    hapoalim.indAcc = hapoalim.indAcc + 1;
//                                                                    hapoalim.loadAcc();
//                                                                }
//                                                            } else {
//                                                                loopPeulot();
//                                                            }
//                                                        })
//                                                        .fail(function () {
//                                                            loadChecksInside()
//                                                        })
//                                            }
//
//                                            loadChecksInside();
//                                            return false;
//                                        } else {
//                                            const trans = {
//                                                "Asmachta": val.referenceNumber,
//                                                "TransDesc": activityDescription,
//                                                "ValueDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(val.eventDate)),
//                                                "TransactionType": transactionTypes,
//                                                "TransTotal": val.eventAmount,
//                                                "Balance": val.currentBalance,
//                                                "IsDaily": isDaily,
//                                                "imgs": null
//                                            };
//                                            hapoalim.currentAcc.DataRow.push(trans);
//
//                                            if (hasHaavaraActivityType) {
//                                                var dtd = {
//                                                    "DepositeTransferDate": trans.ValueDate,
//                                                    "TransferTotal": trans.TransTotal,
//                                                    "BankTransferNumber": null,
//                                                    "BranchTransferNumber": null,
//                                                    "AccountTransferNumber": null,
//                                                    "NamePayerTransfer": ["partyHeadline", "partyName"]
//                                                            .filter(fldName => val.beneficiaryDetailsData[fldName] !== null)
//                                                            .map(fldName => val.beneficiaryDetailsData[fldName])
//                                                            .join(' '),
//                                                    "DetailsTransfer": ["messageHeadline", "messageDetail"]
//                                                            .filter(fldName => val.beneficiaryDetailsData[fldName] !== null)
//                                                            .map(fldName => val.beneficiaryDetailsData[fldName])
//                                                            .join(' ')
//                                                };
//                                                trans.DepositeTransferData = [dtd];
//
//                                                if (val.contraBankNumber > 0 && val.contraBankNumber !== 912) {
//                                                    dtd.BankTransferNumber = val.contraBankNumber;
//                                                    dtd.BranchTransferNumber = val.contraBranchNumber;
//                                                    dtd.AccountTransferNumber = val.contraAccountNumber;
//                                                } else {
//                                                    var accBrchBnkRslt = /(\d{1,3})\D+(\d{1,3})\D+(\d{6,})/g.exec(dtd['DetailsTransfer']);
//                                                    if (accBrchBnkRslt !== null) {
//                                                        dtd.BankTransferNumber = accBrchBnkRslt[1];
//                                                        dtd.BranchTransferNumber = accBrchBnkRslt[2];
//                                                        dtd.AccountTransferNumber = accBrchBnkRslt[3];
//                                                    }
//                                                }
//                                            } else if (hasHaavaraChainType) {
//                                                loadGroupedTransfersDetails(trans);
//                                                return false;
//                                            }
//
//                                            if (data.transactions.length == indexLoop + 1) {
//                                                myEmitterLogs(12, hapoalim.currentAcc.DataRow.length); //length arr
//                                                if (hapoalim.indAcc + 1 == all.banks.accounts.hapoalim.account.length) {
//                                                    hapoalim.indAcc = 0;
//                                                    hapoalim.currentAcc = null;
//                                                    hapoalim.getSendCheqs();
//                                                } else {
//                                                    hapoalim.indAcc = hapoalim.indAcc + 1;
//                                                    hapoalim.loadAcc();
//                                                }
//                                            }
//                                        }
//                                    }
//                                })
//                            }
//
//                            function loadGroupedTransfersDetails(trans) {
//                                function moveOn() {
//                                    if (data.transactions.length == idxLoop + 1) {
//                                        myEmitterLogs(12, hapoalim.currentAcc.DataRow.length); //length arr
//                                        if (hapoalim.indAcc + 1 == all.banks.accounts.hapoalim.account.length) {
//                                            hapoalim.indAcc = 0;
//                                            hapoalim.currentAcc = null;
//                                            hapoalim.getSendCheqs();
//                                        } else {
//                                            hapoalim.indAcc = hapoalim.indAcc + 1;
//                                            hapoalim.loadAcc();
//                                        }
//                                    } else {
//                                        loopPeulot();
//                                    }
//                                }
//                                ;
/////dataaaa
//                                all.banks.core.services.httpReq(
//                                        'https://biz2.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=changeCoExistenceCurrentAccount&changeCurrentAccount=yes&selectedAccount='
//                                        + [hapoalim.currentAcc['BankNumber'], hapoalim.currentAcc['BranchNumber'], hapoalim.currentAcc['AccountNumber']].join('-'),
//                                        'POST', {}, false, false)
//                                        .then(function () {
//                                            all.banks.core.services.httpReq(
//                                                    'https://biz2.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=MainFrameSet&isCoExistence=yes&transactionId=GroupedTransfersDetails&frameMenuParams=sum='
//                                                    + trans.TransTotal + ':date=' + trans.ValueDate.substring(0, 5),
//                                                    'GET', null, false, false)
//                                                    .then(function (res00, res01, res01) {
//                                                        var dwrxFetch = /var\s*dwxVar\s*=\s*"(\d+)"/.exec(res00);
//                                                        var qwrtFetch = /var\s*qwrtVar\s*=\s*"(\d+)"/.exec(res00);
//                                                        if (dwrxFetch === null || qwrtFetch === null) {
//                                                            moveOn();
//                                                            return;
//                                                        }
//
//                                                        all.banks.core.services.httpReq(
//                                                                'https://biz2.bankhapoalim.co.il/cgi-bin/poalwwwc?ctfw=init&reqName=action&language=HE&transactionId=GroupedTransfersDetails&subMenuName=Shekel'
//                                                                + '&ts=' + qwrtFetch[1] + '&tf=' + Math.random() + '&usm=&u=i'
//                                                                + '&sum=' + trans.TransTotal + '&date=' + trans.ValueDate.substring(0, 5)
//                                                                + '&pSubMenu=null&fromSubMenu=Shekel&bxx=912&nsv=y'
//                                                                + '&dwx=' + dwrxFetch[1]
//                                                                + '&wScr=1920&hScr=1080&menuTranName=GroupedTransfersDetails$23sum$3D'
//                                                                + trans.TransTotal + '$26date$3D' + trans.ValueDate.substring(0, 2) + '$2F' + trans.ValueDate.substring(3, 5),
//                                                                'GET', null, false, false)
//                                                                .then(function (res10, res11, res12) {
//                                                                    //                                                                                                                            console.log(res10);
//                                                                    var $$ = all.banks.core.services.parseHtml(res10);
//                                                                    var rows = $$.find('#mytable_body > tbody > tr');
//                                                                    console.log('rows -> ' + rows.length);
//                                                                    trans.DepositeTransferData = rows.map(function (idx, el) {
//                                                                        var tds = $(el).find("td");
//                                                                        return {
//                                                                            "DepositeTransferDate": trans.ValueDate,
//                                                                            "TransferTotal": tds.eq(0).text().replace(/[^\d\.-]/g, ""),
//                                                                            "BankTransferNumber": tds.eq(4).text().replace(/\D/g, ""),
//                                                                            "BranchTransferNumber": tds.eq(3).text().replace(/\D/g, ""),
//                                                                            "AccountTransferNumber": tds.eq(2).text().replace(/\D/g, ""),
//                                                                            "NamePayerTransfer": tds.eq(1).text().split("").reverse().join(""),
//                                                                            "DetailsTransfer": null
//                                                                        };
//                                                                    }).get();
//                                                                }).always(() => {
//                                                            moveOn();
//                                                        });
//                                                    }).fail(function (error00, resErr01, urlParam02) {
//                                                moveOn();
//                                            });
//                                        }).fail(function (error00, resErr01, urlParam02) {
//                                    moveOn();
//                                });
//                            }
//
//                            loopPeulot();
//                        }
//                    } catch (err) {
//                        if (res2.status == 204) {
//                            hapoalim.currentAcc.DataRow = [];
//                            myEmitterLogs(12, hapoalim.currentAcc.DataRow.length); //length arr
//                            if (hapoalim.indAcc + 1 == all.banks.accounts.hapoalim.account.length) {
//                                hapoalim.indAcc = 0;
//                                hapoalim.currentAcc = null;
//                                hapoalim.getSendCheqs();
//                            } else {
//                                hapoalim.indAcc = hapoalim.indAcc + 1;
//                                hapoalim.loadAcc();
//                            }
//                        } else {
//                            all.banks.core.services.errorLog(err)
//                        }
//                    }
//                })
//                .fail(function (error, resErr, urlParam) {
//                    hapoalim.currentAcc.DataRow = [];
//                    myEmitterLogs(12, hapoalim.currentAcc.DataRow.length); //length arr
//                    if (hapoalim.indAcc + 1 == all.banks.accounts.hapoalim.account.length) {
//                        hapoalim.indAcc = 0;
//                        hapoalim.currentAcc = null;
//                        hapoalim.getSendCheqs();
//                    } else {
//                        hapoalim.indAcc = hapoalim.indAcc + 1;
//                        hapoalim.loadAcc();
//                    }
//                });
//        //all.banks.core.services.httpReq(urlXhr, 'GET', null, false, false)
    };
    hapoalim.getBase64FromImageUrl = function (urlXhrCheck, deta) {
        var dfd = jQuery.Deferred();
        hapoalim.getBase64FromImageUrlCounter += 1;
        all.banks.core.services.httpReq(urlXhrCheck, 'GET', null, false, false)
            .then(function (data) {
                hapoalim.getBase64FromImageUrlCounter = 0;
                try {
                    var arrList = [];
                    if (data !== undefined && data.list !== undefined && data.list.length > 0) {
                        $(data.list).each(function (index, v) {
                            var uuid = parseInt(v.bank) + '' + parseInt(v.branch) + '' + parseInt(v.account) + '' + parseInt(v.number) + '' + parseInt(deta.originalEventCreateDate)
                                + '_' + hapoalim.currentAcc.BankNumber + '' + hapoalim.currentAcc.BranchNumber + '' + hapoalim.currentAcc.AccountNumber;
                            arrList.push({
                                "Asmachta": deta.referenceNumber,
                                "CheckAccountNumber": v.account,
                                "DepositeDate": deta.originalEventCreateDate,
                                "CheckBankNumber": v.bank,
                                "CheckBranchNumber": v.branch,
                                "CheckNumber": v.number,
                                "CheckTotal": v.amount,
                                "ImageNameKey": uuid,
//                                    "url": v.imageFrontLink && v.imageFrontLink.length > 0 && v.imageFrontLink.indexOf('000000000000000000000.png') === -1
//                                            ? 'https://login.bankhapoalim.co.il' + v.imageFrontLink : undefined
                                "url": v.imageFrontLink && v.imageFrontLink.length > 0 && v.imageFrontLink.indexOf('000000000000000000000.png') === -1
                                    ? [v.imageFrontLink, v.imageBackLink]
                                        .filter(lnk => lnk && !lnk.includes('000000000000000000000.png'))
                                        .map(lnk => 'https://login.bankhapoalim.co.il' + lnk)
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
                if (hapoalim.getBase64FromImageUrlCounter < 5) {
                    dfd.reject(null);
                } else {
                    hapoalim.getBase64FromImageUrlCounter = 0;
                    all.banks.generalVariables.numChecksNotWithdrawn += 1;
                    dfd.resolve([{
                        "ImageNameKey": "x"
                    }]);
                }
            })
        return dfd.promise();
    };
    hapoalim.getImageAndSend = function (url, uuid, valu, valueOfParent) {
        var dfd = jQuery.Deferred();
        var indexCheckTry = 0;

        function sendAndGetCheck(url, uuid, valu) {
            var formData = new FormData();
            var img = new Image();
            img.src = url;
            img.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.width = this.width;
                canvas.height = this.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);
                var dataURL = canvas.toDataURL("image/jpeg");
                var content = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                var blob = new Blob([content], {
                    type: "text/plain"
                });
                formData.append(uuid, blob);
                all.banks.accounts.hapoalim.sendChecksCtrl({
                    formData: formData,
                    params: {
                        imagenamekey: uuid,
                        bankId: valueOfParent.BankNumber,
                        snifId: valueOfParent.BranchNumber,
                        accountId: valueOfParent.AccountNumber
                    }
                })
                    .then(function (arr) {
                        dfd.resolve(true);
                    })
                    .fail(function (error, resErr) {
                        dfd.resolve(false);
                    })
            }
            img.onerror = function () {
                if (indexCheckTry < 3) {
                    indexCheckTry += 1;
                    sendAndGetCheck(url, uuid, valu);
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

            return canvas.toDataURL("image/jpeg", hapoalim.imageScale)
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

//                fs.writeFile('./Output/image.jpg', new Buffer(mergedImagesData, 'base64'));

                var formData = new FormData();
                var blob = new Blob([mergedImagesData], {
                    type: "text/plain"
                });
                formData.append(uuid, blob);
                hapoalim.sendChecksCtrl({
                    formData: formData,
                    params: {
                        imagenamekey: uuid,
                        bankId: valueOfParent.BankNumber,
                        snifId: valueOfParent.BranchNumber,
                        accountId: valueOfParent.AccountNumber
                    }
                })
                    .then(function (arr) {
                        dfd.resolve(true);
                    })
                    .fail(function (error, resErr) {
                        dfd.resolve(false);
                    });
            });
        } else {
            // Handle single image (without back side image provided) as previously
            sendAndGetCheck((Array.isArray(url) ? url[0] : url), uuid, valu);
        }

//        sendAndGetCheck(url, uuid);
        return dfd.promise();
    };
    hapoalim.getSendCheqs = async function () {
        try {
            if (all.banks.accountDetails.checks == true) {
                var i, leng = all.banks.generalVariables.allDataArr.BankData[0].Account.length;
                for (i = 0; i < leng; i++) {
                    var v = all.banks.generalVariables.allDataArr.BankData[0].Account[i];
                    if (v.DataRow.length) {
                        var i1, leng1 = v.DataRow.length;
                        for (i1 = 0; i1 < leng1; i1++) {
                            var value = v.DataRow[i1];
                            if (value.imgs !== null) {
                                var i2, leng2 = value.imgs.length;
                                for (i2 = 0; i2 < leng2; i2++) {
                                    var valu = value.imgs[i2];
                                    if (valu.url !== undefined) {
                                        var res = await hapoalim.getImageAndSend(valu.url, valu.ImageNameKey, valu, v);
                                        if (res == false) {
                                            if (value.imgs.length > 1) {
                                                value.imgs[i2].ImageNameKey = "x";
                                            } else {
                                                value.imgs[i2] = {
                                                    "ImageNameKey": "x"
                                                };
                                            }
                                        }
                                        delete value.imgs[i2].url;
                                    }
                                }
                            }
                        }
                    }
                }
                hapoalim.sendOshCtrl();
            } else {
                hapoalim.sendOshCtrl();
            }
        } catch (err) {
            all.banks.core.services.errorLog(err)
        }
    };
    hapoalim.setAccAsharai = function () {
        hapoalim.counterCardPrev = 0;
//        hapoalim.ashraiProcessedMap = [];
        hapoalim.loadAshrai();
    };
//	hapoalim.loadAshrai = function (prevMonth) {
//		var urlXhr = 'https://login.bankhapoalim.co.il/' + hapoalim.paramUrl
//			+ '/plastic-cards/transactions?accountId=' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].bankNumber + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].branchNumber + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].accountNumber;
//
//		console.log(`loadAshrai(${prevMonth})`);
//		let prevMonthsArr;
//
//		all.banks.core.services.httpReq(urlXhr + (prevMonth ? '&statementDate=' + prevMonth : '') + '&type=previous', 'GET', null, false, false)
//		.then(function (data, res1, res2) {
//			if (Array.isArray(data.plasticCardData) && data.plasticCardData.length > 0) {
//				data.plasticCardData.forEach(readCardData);
//			}
//
//			prevMonthsArr = Array.isArray(data.dates) && data.dates.length > 0 ? data.dates : undefined;
//
//			function readCardData(cardData) {
////				Object.keys(cardData.summary.prev).forEach((key1) => {
////					Object.keys(cardData.summary.prev[key1].summariesByCurrencyCodes).forEach((key2) => {
////						Object.keys(cardData.summary.prev[key1].summariesByCurrencyCodes[key2].summaryDetails).forEach((key3, key3Idx) => {
////							try {
////								const cardNum = cardData.summary.prev[key1].summariesByCurrencyCodes[key2].summaryDetails[key3].plasticCardNumberSuffix;
////								const rowsToProcess = cardData.vauchers[key1].vauchersByCurrencyCodes[key2].vaucherDetails[key3]
////									|| cardData.vauchers[key1].vauchersByCurrencyCodes[key2].vaucherDetails[
////										Object.keys(cardData.vauchers[key1].vauchersByCurrencyCodes[key2].vaucherDetails)[key3Idx]];
////								if (!Array.isArray(rowsToProcess)) {
////									writeLog(`Incorrect data. Cannot locate cardData.vauchers[${key1}].vauchersByCurrencyCodes[${key2}].vaucherDetails[${key3}].
////                                                        Found ${Object.keys(cardData.vauchers[key1].vauchersByCurrencyCodes[key2].vaucherDetails)}`);
////									return;
////								}
//				let cardNum;
//				try {
//					const key1 = Object.keys(cardData.summary.prev)[0],
//						key2 = Object.keys(cardData.summary.prev[key1].summariesByCurrencyCodes)[0],
//						key3 = Object.keys(cardData.summary.prev[key1].summariesByCurrencyCodes[key2].summaryDetails)[0];
//					cardNum = cardData.summary.prev[key1].summariesByCurrencyCodes[key2].summaryDetails[key3].plasticCardNumberSuffix;
//				} catch (e) {
//					cardNum = cardData.plasticCardNumberWithoutPrefix.length > 9
//						? cardData.plasticCardNumberWithoutPrefix.slice(-5, -1) : cardData.plasticCardNumberWithoutPrefix.slice(-4);
//				}
//
//				Object.keys(cardData.vauchers).forEach((key1) => {
//					Object.keys(cardData.vauchers[key1].vauchersByCurrencyCodes).forEach((key2) => {
//						Object.keys(cardData.vauchers[key1].vauchersByCurrencyCodes[key2].vaucherDetails).forEach((key3, key3Idx) => {
//							try {
//								const mapKey = cardNum + '|' + key1 + '|' + key2 + '|' + key3;
//								if (hapoalim.ashraiProcessedMap.includes(mapKey)) {
//									writeLog(`Duplicate! ${cardNum} on ${key3} for currency ${key2} already processed. Skipping it.`);
//									return;
//								} else {
//									hapoalim.ashraiProcessedMap.push(mapKey);
//								}
//								const rowsToProcess = cardData.vauchers[key1].vauchersByCurrencyCodes[key2].vaucherDetails[key3];
//								if (!Array.isArray(rowsToProcess)) {
//									writeLog(`Incorrect data. Cannot locate cardData.vauchers[${key1}].vauchersByCurrencyCodes[${key2}].vaucherDetails[${key3}].
//                                                        Found ${Object.keys(cardData.vauchers[key1].vauchersByCurrencyCodes[key2].vaucherDetails)}`);
//									return;
//								}
//								const recordsProcessed = [];
//
//								rowsToProcess.forEach((row, rowIdx) => {
//									if (!row.eventDate) {
//										if (row.debitAmount == 0 && !row.clientBusinessName) {
//											return;
//										}
//										if (row.recordTypeCode === 160) {
//											return;
//										}
//										if (recordsProcessed.length > 0 && rowIdx > 0 && rowsToProcess[rowIdx - 1].recordTypeCode === row.recordTypeCode) {
//											recordsProcessed[recordsProcessed.length - 1].TransTotal = row.debitAmount;
//											return;
//										}
//									}
//
//									const record = {
//										"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
//										"TargetId": all.banks.accountDetails.bank.targetId,
//										"Token": all.banks.accountDetails.bank.token,
//										"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
//										"ExporterId": all.banks.spiderConfig.spiderId,
//										"BranchNumber": all.banks.accounts.hapoalim.account[hapoalim.accAsharai].branchNumber,
//										"AccountNumber": all.banks.accounts.hapoalim.account[hapoalim.accAsharai].accountNumber,
//										"CardNumber": cardNum,
//										"NextBillingDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(row.debitDate)),
//										"NextCycleTotal": null,
//										"TransDesc": row.clientBusinessName,
//										"TransTotal": row.debitAmount,
//										"ValueDate": row.eventDate != 0 ? all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(row.eventDate)) : all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(row.debitDate)),
//										"TotalPayments": row.paymentsNumber > 0 ? row.paymentsNumber : null,
//										"CurrentPaymentNum": row.paymentNumber > 0 ? row.paymentNumber : null,
//										"CardType": "22",
//										"indFakeDate": 0,
//										"original_total": row.originalAmount,
//										"currency_id": all.banks.core.services.getTypeCurrencyAll(row.eventCurrencyDescription),
//										"ind_iskat_hul": all.banks.core.services.getTypeCurrencyAll(row.debitCurrencyDescription),
//										"comment": Array.isArray(row.partyComments) && row.partyComments.length > 0
//											? row.partyComments[0] : null
//									};
//
//									if (Array.isArray(row.partyComments) && row.partyComments.length > 0) {
//										if (row.partyComments[0].indexOf('מתוך') !== -1) {
//											const pymntNumFromNum = row.partyComments[0].split('מתוך');
//											if (pymntNumFromNum.length > 1) {
//												record['CurrentPaymentNum'] = pymntNumFromNum[0].replace(/\D/g, "");
//												record['TotalPayments'] = pymntNumFromNum[1].replace(/\D/g, "");
//											}
//										} else if (row.partyComments[0].indexOf('הנחה') !== -1) {
//											record['TransTotal'] = Number(record['TransTotal']) - parseFloat(row.partyComments[0].replace(/[^\d\.-]/g, ""));
//										}
//									}
//
//									if (all.banks.accountDetails.isCategory && row.economySectorDescription) {
//										record['TransCategory'] = row.economySectorDescription;
//									}
//
//									recordsProcessed.push(record);
//								});
//
//								if (recordsProcessed.length > 0) {
//									var sum = recordsProcessed.reduce((acc, rec) => acc + rec.TransTotal, 0).toFixed(2);
//									recordsProcessed.forEach((rec) => {
//										rec.NextCycleTotal = sum;
//									});
//									all.banks.generalVariables.allDataArrAshrai.push(...recordsProcessed);
//								}
//
//							} catch (exception) {
//							}
//						});
//					});
//				});
//			}
//		})
//		.fail(function (error, resErr, urlParam) {
//			writeLog(`loadAshrai(${prevMonth}) - request failed: ${error}`)
//		})
//		.always((dataOrError) => {
//			if (dataOrError && dataOrError.status > 400 && hapoalim.paramUrl !== "ssb") {
//				hapoalim.paramUrl = "ssb";
//				hapoalim.loadAshrai(prevMonth);
//				return;
//			}
//
//			hapoalim.counterCardPrev++;
//			if (hapoalim.counterCardPrev < all.banks.accountDetails.ccardMonth) {
//				let nextPrevMonth;
//				if (prevMonthsArr instanceof Array && hapoalim.counterCardPrev < prevMonthsArr.length) {
//					nextPrevMonth = prevMonthsArr[hapoalim.counterCardPrev].retrievalEndDate;
//				} else {
//					const tmpNow = all.banks.core.services.addMonthsToDate(new Date(), -1 * hapoalim.counterCardPrev);
//					nextPrevMonth = tmpNow.getFullYear() * 10000 + (tmpNow.getMonth() + 1) * 100;
//				}
//				hapoalim.loadAshrai(nextPrevMonth);
//			} else {
//				hapoalim.loadDateNow();
//			}
//		});
//	};
//	hapoalim.loadDateNow = function () {
//		var urlXhr = 'https://login.bankhapoalim.co.il/' + hapoalim.paramUrl + '/plastic-cards/transactions?accountId=' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].bankNumber + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].branchNumber + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].accountNumber + '&type=current&view=totals';
//		all.banks.core.services.httpReq(urlXhr, 'GET', null, false, false)
//		.then(function (data, res1, res2) {
//			try {
//				if (data.messageCode == 575) {
//					var urlXhr = 'https://login.bankhapoalim.co.il/' + hapoalim.paramUrl + '/plastic-cards/transactions?accountId=' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].bankNumber + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].branchNumber + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].accountNumber + '&type=current';
//					all.banks.core.services.httpReq(urlXhr, 'GET', null, false, false)
//					.then(function (data, res1, res2) {
//						try {
//							if (data.plasticCardData && data.plasticCardData.length) {
//								$(data.plasticCardData).each(function (i, v) {
//									if (v.vauchers[1] !== undefined) {
//										var vaucherDetails = v.vauchers[1].vauchersByCurrencyCodes[0].vaucherDetails;
//										for (var x in vaucherDetails) {
//											var vaucherDetailsList = vaucherDetails[x];
//											if (vaucherDetailsList.length) {
//												$(vaucherDetailsList).each(function (i1, v1) {
//													if (v.summary.current[1] !== undefined) {
//														var cardNum = v.summary.current[1].summariesByCurrencyCodes[0].summaryDetails[x].plasticCardNumberSuffix;
//														var nextCycleTotal = v.summary.current[1].summariesByCurrencyCodes[0].summaryDetails[x].debitAmount;
//													} else {
//														var cardNum = v.summary.current[0].summariesByCurrencyCodes[0].summaryDetails[0].plasticCardNumberSuffix;
//														var nextCycleTotal = v.summary.current[0].summariesByCurrencyCodes[0].summaryDetails[0].debitAmount;
//													}
//
//													var nextBillingDate = null;
//													if (v1.formattedDebitDate !== null) {
//														nextBillingDate = new Date(v1.formattedDebitDate).getFullYear() + '' + ("0" + (new Date(v1.formattedDebitDate).getMonth() + 1)).slice(-2) + '' + ("0" + (new Date(v1.formattedDebitDate).getDate())).slice(-2);
//													}
//													var totalPaymentsSum = null, currentPaymentNumSum = null;
//													if (v1.partyComments !== null && v1.partyComments.length > 0) {
//														if (v1.partyComments[0].indexOf('מתוך') !== -1) {
//															var textPayCard = v1.partyComments[0].split('מתוך');
//															currentPaymentNumSum = textPayCard[0].replace(/\D/g, "");
//															totalPaymentsSum = textPayCard[1].replace(/\D/g, "");
//														}
//													} else {
//														currentPaymentNumSum = v1.paymentNumber;
//														totalPaymentsSum = v1.paymentsNumber;
//													}
//													var currencyId = all.banks.core.services.getTypeCurrencyAll(v1.eventCurrencyDescription);
//													var ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(v1.debitCurrencyDescription);
//													var transTotal = v1.debitAmount;
//													if (v1.debitAmount == 0 && v1.originalAmount != 0) {
//														transTotal = v1.originalAmount;
//													}
//													if (totalPaymentsSum == 0) {
//														totalPaymentsSum = null;
//														if (currentPaymentNumSum == 0) {
//															currentPaymentNumSum = null;
//														}
//													}
//													var transCategory = null;
//													if (all.banks.accountDetails.isCategory) {
//														transCategory = (v1.economySectorDescription !== undefined && v1.economySectorDescription !== "" && v1.economySectorDescription !== null) ? v1.economySectorDescription : null;
//													}
//													var comment = "";
//													if (v1.partyComments !== null && v1.partyComments.length > 0) {
//														if (v1.partyComments[0].indexOf('הנחה') !== -1) {
//															comment = v1.partyComments[0];
//															transTotal = Number(transTotal) - parseFloat(v1.partyComments[0].replace(/[^\d\.-]/g, ""));
//														}
//													}
//													all.banks.generalVariables.allDataArrAshrai.push({
//														"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
//														"TargetId": all.banks.accountDetails.bank.targetId,
//														"Token": all.banks.accountDetails.bank.token,
//														"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
//														"ExporterId": all.banks.spiderConfig.spiderId,
//														"BranchNumber": all.banks.accounts.hapoalim.account[hapoalim.accAsharai].branchNumber,
//														"AccountNumber": all.banks.accounts.hapoalim.account[hapoalim.accAsharai].accountNumber,
//														"CardNumber": cardNum,
//														"NextBillingDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(nextBillingDate)),
//														"NextCycleTotal": nextCycleTotal,
//														"TransDesc": v1.clientBusinessName,
//														"TransTotal": transTotal, //v1.debitAmount,
//														"ValueDate": v1.eventDate != 0 ? all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(v1.eventDate)) : all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(v1.debitDate)),
//														"TransCategory": transCategory,
//														"TotalPayments": totalPaymentsSum,
//														"CurrentPaymentNum": currentPaymentNumSum,
//														"CardType": "22",
//														"indFakeDate": 0,
//														"original_total": v1.originalAmount,
//														"currency_id": currencyId,
//														"ind_iskat_hul": ind_iskat_hul,
//														"comment": comment
//													});
//												})
//											}
//										}
//									}
//								});
//								if (hapoalim.accAsharai < all.banks.accounts.hapoalim.account.length - 1) {
//									hapoalim.accAsharai = hapoalim.accAsharai + 1;
//									hapoalim.setAccAsharai();
//								} else {
//									hapoalim.sendCardsCtrl();
//								}
//							} else {
//								if (hapoalim.accAsharai < all.banks.accounts.hapoalim.account.length - 1) {
//									hapoalim.accAsharai = hapoalim.accAsharai + 1;
//									hapoalim.setAccAsharai()
//								} else {
//									hapoalim.sendCardsCtrl();
//								}
//							}
//						} catch (err) {
//							if (res2.status == 204) {
//								if (hapoalim.accAsharai < all.banks.accounts.hapoalim.account.length - 1) {
//									hapoalim.accAsharai = hapoalim.accAsharai + 1;
//									hapoalim.setAccAsharai()
//								} else {
//									hapoalim.sendCardsCtrl();
//								}
//							} else {
//								if (hapoalim.accAsharai < all.banks.accounts.hapoalim.account.length - 1) {
//									hapoalim.accAsharai = hapoalim.accAsharai + 1;
//									hapoalim.setAccAsharai()
//								} else {
//									hapoalim.sendCardsCtrl();
//								}
//							}
//						}
//					})
//					.fail(function (error, resErr, urlParam) {
//						if (hapoalim.accAsharai < all.banks.accounts.hapoalim.account.length - 1) {
//							hapoalim.accAsharai = hapoalim.accAsharai + 1;
//							hapoalim.setAccAsharai()
//						} else {
//							hapoalim.sendCardsCtrl();
//						}
//					});
//				} else {
//					if (data.creditCardMyHomePageDetailsDataList) {
//						if (data.creditCardMyHomePageDetailsDataList.length) {
//							loadRowsForeign(data, function () {
//								if (hapoalim.accAsharai < all.banks.accounts.hapoalim.account.length - 1) {
//									hapoalim.accAsharai = hapoalim.accAsharai + 1;
//									hapoalim.setAccAsharai()
//								} else {
//									hapoalim.sendCardsCtrl();
//								}
//							});
//						} else {
//							if (hapoalim.accAsharai < all.banks.accounts.hapoalim.account.length - 1) {
//								hapoalim.accAsharai = hapoalim.accAsharai + 1;
//								hapoalim.setAccAsharai()
//							} else {
//								hapoalim.sendCardsCtrl();
//							}
//						}
//					} else {
//						if (hapoalim.accAsharai < all.banks.accounts.hapoalim.account.length - 1) {
//							hapoalim.accAsharai = hapoalim.accAsharai + 1;
//							hapoalim.setAccAsharai()
//						} else {
//							hapoalim.sendCardsCtrl();
//						}
//					}
//				}
//
//				function loadRowsForeign(row, cb) {
//					var arrRows = {};
//					var v = row.voucherDetailsByCardNumber;
//					if (Object.keys(v).length) {
//						for (var x in v) {
//							var cardPlasticCardNumberPrefix = v[x].plasticCardNumberPrefix.toString(),
//								cardNum = v[x].plasticCardNumberPrefix.toString().slice(-4),
//								idxTry = 0;
//
//							row.creditCardMyHomePageDetailsDataList.forEach(function (valueCards) {
//								if ((cardPlasticCardNumberPrefix == valueCards.plasticCardNumberWithoutPrefix.toString()) && (idxTry == 0)) {
//									idxTry = 1;
//									cardNum = valueCards.plasticCardNumberSuffix;
//								}
//							});
//
//							$(v[x].vouchersDetails).each(function (i1, v1) {
//								if (
//									(v1.clientBusinessName !== null)
//									&&
//									((v1.eventDate !== 0 && v1.recordTypeCode !== 160) || (v1.eventDate == 0 && v1.recordTypeCode !== 160) || (v1.eventDate !== 0 && v1.recordTypeCode == 160))
//								) {
//									var totalPaymentsSum = null, currentPaymentNumSum = null;
//									if (v1.partyComments !== null && v1.partyComments.length > 0) {
//										if (v1.partyComments[0].indexOf('מתוך') !== -1) {
//											var textPayCard = v1.partyComments[0].split('מתוך');
//											currentPaymentNumSum = textPayCard[0].replace(/\D/g, "");
//											totalPaymentsSum = textPayCard[1].replace(/\D/g, "");
//										}
//									} else {
//										currentPaymentNumSum = v1.paymentNumber;
//										totalPaymentsSum = v1.paymentsNumber;
//									}
//
//									var transTotal = v1.debitAmount;
//									if (v1.debitAmount == 0 && v1.originalAmount !== 0) {
//										transTotal = v1.originalAmount;
//									}
//									if (totalPaymentsSum == 0) {
//										totalPaymentsSum = null;
//										if (currentPaymentNumSum == 0) {
//											currentPaymentNumSum = null;
//										}
//									}
//
//									var currencyId = all.banks.core.services.getTypeCurrencyAll(v1.eventCurrencyDescription);
//									var ind_iskat_hul = all.banks.core.services.getTypeCurrencyAll(v1.debitCurrencyDescription);
//									if (!arrRows[v1.debitDate]) {
//										arrRows[v1.debitDate] = [];
//									}
//									var transCategory = null;
//									if (all.banks.accountDetails.isCategory) {
//										transCategory = (v1.economySectorDescription !== undefined && v1.economySectorDescription !== "" && v1.economySectorDescription !== null) ? v1.economySectorDescription : null;
//									}
//									var comment = "";
//									if (v1.partyComments !== null && v1.partyComments.length > 0) {
//										if (v1.partyComments[0].indexOf('הנחה') !== -1) {
//											comment = v1.partyComments[0];
//											transTotal = Number(transTotal) - parseFloat(v1.partyComments[0].replace(/[^\d\.-]/g, ""));
//										}
//									}
//									arrRows[v1.debitDate].push({
//										"BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
//										"TargetId": all.banks.accountDetails.bank.targetId,
//										"Token": all.banks.accountDetails.bank.token,
//										"ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '' + ("0" + (new Date().getDate())).slice(-2) + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
//										"ExporterId": all.banks.spiderConfig.spiderId,
//										"BranchNumber": all.banks.accounts.hapoalim.account[hapoalim.accAsharai].branchNumber,
//										"AccountNumber": all.banks.accounts.hapoalim.account[hapoalim.accAsharai].accountNumber,
//										"CardNumber": cardNum,
//										"NextBillingDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(v1.debitDate)),
//										"NextCycleTotal": null,
//										"TransDesc": v1.clientBusinessName,
//										"TransTotal": transTotal, //v1.debitAmount,
//										"ValueDate": v1.eventDate != 0 ? all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(v1.eventDate)) : all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(v1.debitDate)),
//										"TransCategory": transCategory,
//										"TotalPayments": totalPaymentsSum,
//										"CurrentPaymentNum": currentPaymentNumSum,
//										"CardType": "22",
//										"indFakeDate": 0,
//										"original_total": v1.originalAmount,
//										"currency_id": currencyId,
//										"ind_iskat_hul": ind_iskat_hul,
//										"comment": comment
//									})
//								}
//
//								if (i1 + 1 == v[x].vouchersDetails.length) {
//									if (Object.keys(arrRows).length) {
//										var idx = -1;
//										for (var x1 in arrRows) {
//											idx += 1;
//											var sum = arrRows[x1].reduce(function (acc, val) {
//												return acc + val.TransTotal;
//											}, 0);
//											$(arrRows[x1]).each(function (i2, v2) {
//												v2.NextCycleTotal = Number(sum.toFixed(2));
//												all.banks.generalVariables.allDataArrAshrai.push(v2);
//												if ((i2 + 1 == arrRows[x1].length) && ((idx + 1) == Object.keys(arrRows).length)) {
//													delete v[x];
//													loadRowsForeign(row, cb);
//												}
//											});
//										}
//									} else {
//										delete v[x];
//										loadRowsForeign(row, cb);
//									}
//								}
//							});
//							break;
//						}
//					} else {
//						cb();
//					}
//				}
//			} catch (err) {
//				if (res2.status == 204) {
//					if (hapoalim.accAsharai < all.banks.accounts.hapoalim.account.length - 1) {
//						hapoalim.accAsharai = hapoalim.accAsharai + 1;
//						hapoalim.setAccAsharai()
//					} else {
//						hapoalim.sendCardsCtrl();
//					}
//				} else {
//					if (hapoalim.accAsharai < all.banks.accounts.hapoalim.account.length - 1) {
//						hapoalim.accAsharai = hapoalim.accAsharai + 1;
//						hapoalim.setAccAsharai()
//					} else {
//						hapoalim.sendCardsCtrl();
//					}
//				}
//			}
//		})
//		.fail(function (error, resErr, urlParam) {
//			if (hapoalim.accAsharai < all.banks.accounts.hapoalim.account.length - 1) {
//				hapoalim.accAsharai = hapoalim.accAsharai + 1;
//				hapoalim.setAccAsharai()
//			} else {
//				hapoalim.sendCardsCtrl();
//			}
//		});
//	};
    hapoalim.loadMatah = async function () {
        for (let ind = 0; ind < all.banks.accounts.hapoalim.account.length; ind++) {
            let val = all.banks.accounts.hapoalim.account[ind];
            try {
                var urlXhr = "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl + "/foreign-currency/transactions?type=business&lang=he&accountId=" + val.bankNumber + '-' + val.branchNumber + '-' + val.accountNumber;
                let [data, res1, res2] = await all.banks.core.services.httpReqResolveArray(urlXhr, 'GET', null, false, false)
                if (res2.status == 204) {

                } else {
                    try {
                        if (data.messageCode == undefined && data.balancesAndLimitsDataList !== undefined && data.balancesAndLimitsDataList.length && data.currencyCode && data.currencyCode.values && data.currencyCode.values.length) {
                            const currencyCodeList = data.currencyCode.values.map(it => it.currencyCode).join(',');
                            const detailedAccountTypeCodeList = data.detailedAccountTypeCode.values.map(it => it.detailedAccountTypeCode).join(',');

                            try {
                                var urls = "https://login.bankhapoalim.co.il/" + hapoalim.paramUrl + "/foreign-currency/transactions?accountId=" + val.bankNumber + '-' + val.branchNumber + '-' + val.accountNumber + "&currencyCodeList=" + currencyCodeList + "&detailedAccountTypeCodeList=" + detailedAccountTypeCodeList + "&retrievalEndDate=" + all.banks.accounts.hapoalim.datebacksleshToMatah + "&retrievalStartDate=" + all.banks.accounts.hapoalim.datebacksleshMatah + "&view=details&type=business&lang=he";
                                let [res] = await all.banks.core.services.httpReqResolveArray(urls, 'GET', null, false, false)
                                if (res.balancesAndLimitsDataList !== undefined && data.balancesAndLimitsDataList.length) {
                                    for (let indx = 0; indx < res.balancesAndLimitsDataList.length; indx++) {
                                        let va = res.balancesAndLimitsDataList[indx];
                                        let currentBalance = data.balancesAndLimitsDataList.find(accIt => accIt.currencyCode === va.currencyCode);
                                        if (currentBalance) {
                                            currentBalance = currentBalance.currentBalance
                                        } else {
                                            currentBalance = null;
                                        }
                                        var acc = {
                                            'BankNumber': parseInt(all.banks.accountDetails.bank.BankNumber),
                                            'AccountNumber': val.accountNumber,
                                            'BranchNumber': val.branchNumber,
                                            'Balance': currentBalance,
                                            'AccountCredit': null,
                                            "BankAccountTypeId": va.detailedAccountTypeCode,
                                            "CurrencyId": all.banks.core.services.getTypeCurrencyAll(va.currencySwiftCode, true)
                                        };
                                        all.banks.generalVariables.allDataArr.BankData[0].Account.push(acc);
                                        acc.DataRow = [];
                                        if (va.transactions.length) {
                                            for (let idx1 = 0; idx1 < va.transactions.length; idx1++) {
                                                let v1 = va.transactions[idx1];
                                                var eventDetails = "";
                                                if (v1.eventDetails !== undefined && v1.eventDetails !== null) {
                                                    if (v1.originalSystemId == 390) {
                                                        try {
                                                            let [response, t1, t2] = await all.banks.core.services.httpReqResolveArray("https://login.bankhapoalim.co.il" + v1.urlAddress + "&lang=he&accountId=" + val.bankNumber + '-' + val.branchNumber + '-' + val.accountNumber, 'GET', null, false, false)
                                                            if (t2.status !== 204 && response.securityQuoteData !== null && response.securityQuoteData !== undefined && response !== undefined) {
                                                                eventDetails = " " + response.securityQuoteData.securityName;
                                                            }
                                                            acc.DataRow.push({
                                                                "Asmachta": hapoalim.retrieveAsmachta(v1), // v1.referenceNumber,
                                                                "TransDesc": v1.activityDescription + eventDetails + (v1.comment ? (' ' + v1.comment) : ''),
                                                                "ValueDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(v1.executingDate)),
                                                                "TransactionType": (v1.eventActivityTypeCode == 1) ? "1" : "0",
                                                                "TransTotal": v1.eventAmount,
                                                                "Balance": v1.currentBalance,
                                                                "IsDaily": (v1.transactionType == "TODAY") ? "1" : "0",
                                                                "imgs": null,
                                                                "DepositeTransferData": null
                                                            });
                                                        } catch (errorInside) {
                                                            acc.DataRow.push({
                                                                "Asmachta": hapoalim.retrieveAsmachta(v1), // v1.referenceNumber,
                                                                "TransDesc": v1.activityDescription + (v1.comment ? (' ' + v1.comment) : ''),
                                                                "ValueDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(v1.executingDate)),
                                                                "TransactionType": (v1.eventActivityTypeCode == 1) ? "1" : "0",
                                                                "TransTotal": v1.eventAmount,
                                                                "Balance": v1.currentBalance,
                                                                "IsDaily": (v1.transactionType == "TODAY") ? "1" : "0",
                                                                "imgs": null,
                                                                "DepositeTransferData": null
                                                            });
                                                        }
                                                        // va.transactions.splice(0, 1);
                                                        // if (va.transactions.length == 0) {
                                                        //     res.balancesAndLimitsDataList.splice(0, 1);
                                                        //     if (res.balancesAndLimitsDataList.length == 0) {
                                                        //         data.balancesAndLimitsDataList.splice(0, 1);
                                                        //         if (data.balancesAndLimitsDataList.length == 0) {
                                                        //
                                                        //         } else {
                                                        //
                                                        //         }
                                                        //     }
                                                        // } else {
                                                        //
                                                        // }
                                                    } else {
                                                        eventDetails = " " + v1.eventDetails;
                                                        acc.DataRow.push({
                                                            "Asmachta": hapoalim.retrieveAsmachta(v1), // v1.referenceNumber,
                                                            "TransDesc": v1.activityDescription + eventDetails + (v1.comment ? (' ' + v1.comment) : ''),
                                                            "ValueDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(v1.executingDate)),
                                                            "TransactionType": (v1.eventActivityTypeCode == 1) ? "1" : "0",
                                                            "TransTotal": v1.eventAmount,
                                                            "Balance": v1.currentBalance,
                                                            "IsDaily": (v1.transactionType == "TODAY") ? "1" : "0",
                                                            "imgs": null,
                                                            "DepositeTransferData": null
                                                        });
                                                        // va.transactions.splice(0, 1);
                                                        // if (va.transactions.length == 0) {
                                                        //     res.balancesAndLimitsDataList.splice(0, 1);
                                                        //     if (res.balancesAndLimitsDataList.length == 0) {
                                                        //         data.balancesAndLimitsDataList.splice(0, 1);
                                                        //         if (data.balancesAndLimitsDataList.length == 0) {
                                                        //
                                                        //         } else {
                                                        //
                                                        //         }
                                                        //     }
                                                        // }
                                                    }
                                                } else {
                                                    acc.DataRow.push({
                                                        "Asmachta": hapoalim.retrieveAsmachta(v1), // v1.referenceNumber,
                                                        "TransDesc": v1.activityDescription + eventDetails + (v1.comment ? (' ' + v1.comment) : ''),
                                                        "ValueDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(v1.executingDate)),
                                                        "TransactionType": (v1.eventActivityTypeCode == 1) ? "1" : "0",
                                                        "TransTotal": v1.eventAmount,
                                                        "Balance": v1.currentBalance,
                                                        "IsDaily": (v1.transactionType == "TODAY") ? "1" : "0",
                                                        "imgs": null,
                                                        "DepositeTransferData": null
                                                    });
                                                    // va.transactions.splice(0, 1);
                                                    // if (va.transactions.length == 0) {
                                                    //     res.balancesAndLimitsDataList.splice(0, 1);
                                                    //     if (res.balancesAndLimitsDataList.length == 0) {
                                                    //         data.balancesAndLimitsDataList.splice(0, 1);
                                                    //         if (data.balancesAndLimitsDataList.length == 0) {
                                                    //
                                                    //         } else {
                                                    //
                                                    //         }
                                                    //     }
                                                    // }
                                                }
                                            }

                                        } else {
                                            // res.balancesAndLimitsDataList.splice(0, 1);
                                            // if (res.balancesAndLimitsDataList.length == 0) {
                                            //     data.balancesAndLimitsDataList.splice(0, 1);
                                            //     if (data.balancesAndLimitsDataList.length == 0) {
                                            //
                                            //     } else {
                                            //
                                            //     }
                                            // }
                                        }

                                    }

                                } else {
                                    // data.balancesAndLimitsDataList.splice(0, 1);
                                    // if (data.balancesAndLimitsDataList.length == 0) {
                                    //
                                    // } else {
                                    //
                                    // }
                                }
                            } catch ([error, resErr, urlParam]) {
                                // data.balancesAndLimitsDataList.splice(0, 1);
                                // if (data.balancesAndLimitsDataList.length == 0) {
                                //
                                // } else {
                                //
                                // }
                            }

                        } else {

                        }


                    } catch (err) {

                    }
                }

            } catch ([error, resErr, urlParam]) {
                if (error.status > 400 && hapoalim.paramUrl !== "ssb") {
                    hapoalim.paramUrl = "ssb";
                    // hapoalim.loadMatah();

                }
                if (error.status == 204) {

                } else {
                    // all.banks.core.services.errorLog(error);
                }
            }
        }

        hapoalim.indAcc = 0;
        hapoalim.currentAcc = null;
        hapoalim.sendOshCtrl(true);
    };
    hapoalim.logOut = function () {
        var urlXhr = "https://login.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=preLogoff&lang=he";
        all.banks.core.services.httpReq(urlXhr, 'GET', null, false, false)
            .then(function (res) {
                try {
                    all.banks.core.services.httpReq("https://login.bankhapoalim.co.il/cgi-bin/poalwwwc?reqName=Logoff&id=0", 'GET', null, false, false)
                        .then(function (res) {
                            monitorVpn.killVpn(function () {
                                $('#filecontainerlogin').attr('src', '');
                                myEmitterLogs(hapoalim.logoutWithStatus);
                            });
                        })
                        .fail(function (error, resErr, urlParam) {
                            monitorVpn.killVpn(function () {
                                $('#filecontainerlogin').attr('src', '');
                                myEmitterLogs(hapoalim.logoutWithStatus);
                                var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                                writeLog(logErr); // all.banks.core.services.errorLog(logErr);
                            });
                        });
                } catch (err) {
                    monitorVpn.killVpn(function () {
                        $('#filecontainerlogin').attr('src', '');
                        myEmitterLogs(hapoalim.logoutWithStatus);
                        writeLog(err); // all.banks.core.services.errorLog(err)
                    });
                }
            })
            .fail(function (error, resErr, urlParam) {
                monitorVpn.killVpn(function () {
                    myEmitterLogs(hapoalim.logoutWithStatus);
                    var logErr = "restUrl: " + urlParam + ", status: " + error.status;
                    writeLog(logErr); // all.banks.core.services.errorLog(logErr)
                });
            });
    };

    hapoalim.retrieveAsmachta = function (v) {
        if (!v || !v.referenceNumber) {
            return null;
        }
//        if (v.referenceCatenatedNumber
//                && (String(all.banks.accounts.hapoalim.account[hapoalim.indAcc].branchNumber)
//                        + String(all.banks.accounts.hapoalim.account[hapoalim.indAcc].accountNumber).padStart(6, '0')
//                            === String(v.referenceNumber))) {
        if (v.referenceCatenatedNumber
            && v.englishActionDesc && v.englishActionDesc.includes("LOAN")) {
            return v.referenceCatenatedNumber;
        }

        return v.referenceNumber;
    };

    hapoalim.recordsProcessedEloan = [];
    hapoalim.loadAshrai = async function () {

        let accountCardsResp, cardIdx, rowIdx;
        let sameCurr = true;
        let recordsProcessed = [];

        await doCurrent();
        await doPrevious();

//        if (hapoalim.accAsharai < all.banks.accounts.hapoalim.account.length - 1) {
//            hapoalim.accAsharai = hapoalim.accAsharai + 1;
//            hapoalim.setAccAsharai();
//        } else {
//            hapoalim.sendCardsCtrl();
//        }
        if (hapoalim.accAsharai < all.banks.accounts.hapoalim.account.length - 1) {
            hapoalim.accAsharai = hapoalim.accAsharai + 1;
            hapoalim.setAccAsharai();
        } else {
            if (all.banks.spiderConfig.sendToServerApi.indexOf('eloan.co.il') !== -1 && hapoalim.recordsProcessedEloan.length > 0) {
                await send(hapoalim.recordsProcessedEloan);
            }
            if (all.banks.accountDetails.IND_NILVIM > 0) {
                hapoalim.accAsharai = 0;
                hapoalim.indAcc = 0;
                hapoalim.currentAcc = null;
                myEmitterLogs(21);
                hapoalim.loadLoan();
            } else if (all.banks.accountDetails.MATAH_DAY_TO_RUN > 0) {
                myEmitterLogs(34);
                all.banks.generalVariables.allDataArr.BankData[0].Account = [];
                hapoalim.loadMatah();
            } else {
                all.banks.accounts.hapoalim.logOut();
            }
        }

        async function doCurrent() {
            try {
                const resp = await all.banks.core.services.httpReq('https://login.bankhapoalim.co.il/' + hapoalim.paramUrl + '/cards/transactions-totals'
                    + '?accountId=' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].bankNumber
                    + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].branchNumber
                    + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].accountNumber
                    + '&transactionsType=current&lang=he',
                    'GET', null, false, false);
                if (resp && Array.isArray(resp.cards)) {
                    accountCardsResp = resp.cards;
                    for (cardIdx = 0; cardIdx < accountCardsResp.length; cardIdx++) {
                        const nationalTransactionsTotal = Array.isArray(accountCardsResp[cardIdx].cardBookedBalances.nationalTransactionsTotal) ? accountCardsResp[cardIdx].cardBookedBalances.nationalTransactionsTotal : [];
                        // const nationalTransactionsTotalArr = nationalTransactionsTotal.concat(internationalTransactionsTotalNis);
                        const internationalTransactionsTotalNis = Array.isArray(accountCardsResp[cardIdx].cardBookedBalances.internationalTransactionsTotal) ? accountCardsResp[cardIdx].cardBookedBalances.internationalTransactionsTotal.filter(it => it.eventCurrencyDescription === 'NIS' && it.currentAmount !== 0) : [];
                        sameCurr = true
                        //!!internationalTransactionsTotalNis.length;
                        recordsProcessed = [];
                        if (accountCardsResp[cardIdx].cardIdentification.cardSuffix !== "") {
                            // if (accountCardsResp[cardIdx].cardIdentification.cardSuffix === "2224") {
                            //     debugger
                            // }
                            for (rowIdx = 0; rowIdx < nationalTransactionsTotal.length; rowIdx++) {
                                const rowItem = nationalTransactionsTotal[rowIdx];
                                if (rowItem.debitDate !== "0") {
                                    await doCardCycle(rowItem.debitDate,
                                        'current',
                                        encodeURI(rowItem.eventCurrencyDescription),
                                        1);
                                }
                            }
                            for (rowIdx = 0; rowIdx < internationalTransactionsTotalNis.length; rowIdx++) {
                                const rowItem = internationalTransactionsTotalNis[rowIdx];
                                if (rowItem.debitDate !== "0") {
                                    await doCardCycle(rowItem.debitDate,
                                        'current',
                                        encodeURI(rowItem.eventCurrencyDescription),
                                        2, (internationalTransactionsTotalNis.length === rowIdx + 1));
                                }
                            }

                            sameCurr = true;
                            // recordsProcessed = [];
                            const internationalTransactionsTotal = Array.isArray(accountCardsResp[cardIdx].cardBookedBalances.internationalTransactionsTotal) ? accountCardsResp[cardIdx].cardBookedBalances.internationalTransactionsTotal.filter(it => it.eventCurrencyDescription !== 'NIS' && it.currentAmount !== 0) : [];
                            for (rowIdx = 0; rowIdx < internationalTransactionsTotal.length; rowIdx++) {
                                const rowItem = internationalTransactionsTotal[rowIdx];
                                if (rowItem.debitDate !== "0") {
                                    await doCardCycle(rowItem.debitDate,
                                        'current',
                                        encodeURI(rowItem.eventCurrencyDescription),
                                        2);
                                }
                            }
                            if (recordsProcessed.length > 0) {
                                if (all.banks.spiderConfig.sendToServerApi.indexOf('eloan.co.il') === -1) {
                                    await send(recordsProcessed);
                                }
                            }
                        }

                    }
                }

            } catch
                (e) {
                writeLog(e.stack);
            }
        }

        async function doPrevious() {
            try {
                const resp = await all.banks.core.services.httpReq('https://login.bankhapoalim.co.il/' + hapoalim.paramUrl + '/cards/transactions-totals'
                    + '?accountId=' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].bankNumber
                    + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].branchNumber
                    + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].accountNumber
                    + '&transactionsType=previous&lang=he',
                    'GET', null, false, false);
                // if (resp && Array.isArray(resp.cards)) {
                //     accountCardsResp = resp.cards;
                //
                //     for (cardIdx = 0; cardIdx < accountCardsResp.length; cardIdx++) {
                //         for (let cycleIdx = 0; cycleIdx < all.banks.accountDetails.ccardMonth; cycleIdx++) {
                //             if(resp.debitDateList[cycleIdx].debitMonth !== "0"){
                //                 await doCardCycle(resp.debitDateList[cycleIdx].debitMonth, 'previous');
                //             }
                //         }
                //     }
                // }
                if (resp && Array.isArray(resp.debitDateList)) {
                    for (let cycleIdx = 0; cycleIdx < all.banks.accountDetails.ccardMonth && cycleIdx < resp.debitDateList.length; cycleIdx++) {

                        try {
                            const respByMonth = await all.banks.core.services.httpReq('https://login.bankhapoalim.co.il/' + hapoalim.paramUrl + '/cards/transactions-totals'
                                + '?accountId=12'
                                + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].branchNumber
                                + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].accountNumber
                                + '&statementDate=' + resp.debitDateList[cycleIdx].debitMonth
                                + '&transactionsType=previous&lang=he',
                                'GET', null, false, false);

                            if (respByMonth && Array.isArray(respByMonth.cards)) {
                                accountCardsResp = respByMonth.cards;
                                for (cardIdx = 0; cardIdx < accountCardsResp.length; cardIdx++) {
//                                if (accountCardsResp[cardIdx].cardBookedBalances)
                                    if (resp.debitDateList[cycleIdx].debitMonth !== "0") {
                                        await doCardCycle(resp.debitDateList[cycleIdx].debitMonth, 'previous', false, 1);
                                    }
                                }
                            } else if (respByMonth) {
                                var $$ = all.banks.core.services.parseHtml(respByMonth);
                                var error = $$.find('title').text().includes('שגיאה');

                                if (error) {

                                    const respByMonth = await all.banks.core.services.httpReq('https://login.bankhapoalim.co.il/' + hapoalim.paramUrl + '/cards/transactions-totals'
                                        + '?accountId=12'
                                        + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].branchNumber
                                        + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].accountNumber
                                        + '&statementDate=' + resp.debitDateList[cycleIdx].debitMonth
                                        + '&transactionsType=previous&lang=he',
                                        'GET', null, false, false);
                                    if (respByMonth && Array.isArray(respByMonth.cards)) {
                                        accountCardsResp = respByMonth.cards;
                                        for (cardIdx = 0; cardIdx < accountCardsResp.length; cardIdx++) {
//                                if (accountCardsResp[cardIdx].cardBookedBalances)
                                            if (resp.debitDateList[cycleIdx].debitMonth !== "0") {
                                                await doCardCycle(resp.debitDateList[cycleIdx].debitMonth, 'previous', false, 1);
                                            }
                                        }
                                    }
                                }
                            }
                        } catch (e) {

                            const respByMonth = await all.banks.core.services.httpReq('https://login.bankhapoalim.co.il/ssb/cards/transactions-totals'
                                + '?accountId=12'
                                + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].branchNumber
                                + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].accountNumber
                                + '&statementDate=' + resp.debitDateList[cycleIdx].debitMonth
                                + '&transactionsType=previous&lang=he',
                                'GET', null, false, false);
                            if (respByMonth && Array.isArray(respByMonth.cards)) {
                                accountCardsResp = respByMonth.cards;
                                for (cardIdx = 0; cardIdx < accountCardsResp.length; cardIdx++) {
//                                if (accountCardsResp[cardIdx].cardBookedBalances)
                                    if (resp.debitDateList[cycleIdx].debitMonth !== "0") {
                                        await doCardCycle(resp.debitDateList[cycleIdx].debitMonth, 'previous', false, 1);
                                    }
                                }
                            }
                        }


                    }
                } else if (resp && Array.isArray(resp.cards) && resp.cards.length) {
                    accountCardsResp = resp.cards;
                    for (cardIdx = 0; cardIdx < accountCardsResp.length; cardIdx++) {
                        for (let cycleIdx = 0; cycleIdx < all.banks.accountDetails.ccardMonth; cycleIdx++) {
                            if (resp.debitDateList[cycleIdx].debitMonth !== "0") {
                                await doCardCycle(resp.debitDateList[cycleIdx].debitMonth, 'previous', false, 1);
                            }
                        }
                    }
                }

            } catch (e) {
                writeLog(e.stack);
            }
        }

        async function doCardCycle(cycleDate, transactionsType, eventCurrencyDescription, debitEventOrigin, isLast) {
            const card = accountCardsResp[cardIdx];
            if (transactionsType === 'previous') {
                recordsProcessed = [];
            }

            writeLog('Processing cycle ' + transactionsType + ' ' + cycleDate
                + ' for card ' + card.cardIdentification.cardSuffix + '...');

            try {
                let resp;
                try {
                    resp = await all.banks.core.services.httpReq('https://login.bankhapoalim.co.il/' + hapoalim.paramUrl + '/cards/transactions'
                        + '?accountId=' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].bankNumber
                        + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].branchNumber
                        + '-' + all.banks.accounts.hapoalim.account[hapoalim.accAsharai].accountNumber
                        + '&cardSuffix=' + card.cardIdentification.cardSuffix
                        + '&cardIssuingSPCode=' + card.cardIdentification.cardIssuingSPCode
                        + '&cardIdServiceProvider=' + card.cardIdentification.cardIdServiceProvider
                        + '&transactionsType=' + transactionsType
                        + '&totalInd=1&debitEventOrigin=' + debitEventOrigin + '&offset=0&limit=9999&lang=he'
                        + '&debitDate=' + cycleDate
                        + '&eventCurrencyDescription=' + (!!eventCurrencyDescription ? eventCurrencyDescription : 'null'),
                        'GET', null, false, false);

                } catch (e) {

                }

                if (resp && resp.card) {
                    const cardType = all.banks.core.services.getTypeCard(resp.card.cardIdentification.cardVendorProductName ? resp.card.cardIdentification.cardVendorProductName : '')
                    let transDescSave = false;
                    if (all.banks.spiderConfig.sendToServerApi.indexOf('eloan.co.il') !== -1) {
                        recordsProcessed = [];
                    }

                    (transactionsType === 'previous' ? [resp.card.nationalTransactions, resp.card.internationalTransactions] : [resp.card[debitEventOrigin === 2 ? 'internationalTransactions' : 'nationalTransactions']])
                        .filter(candidate => Array.isArray(candidate))
                        .forEach(trnsGrs => {
                        // && trnsGr.transactionsTotal.debitDate === cycleDate
                            trnsGrs
                                .filter(trnsGr => Array.isArray(trnsGr.transactionsDetails))
                                .forEach(trnsGr => {
                                    const cycleTotal = transactionsType === 'current'
                                        ? trnsGr.transactionsTotal.currentAmount
                                        : trnsGr.transactionsTotal.previousAmount;
                                    trnsGr.transactionsDetails
                                        .filter(row => (!!row.eventDate && row.eventDate !== '0') || (!!row.debitDate && row.debitDate !== '0'))
                                        .forEach(row => {
                                            if (row.merchantDetails.merchantName !== null) {
                                                transDescSave = false;
                                            } else if (row.merchantDetails.merchantName === null && !transDescSave) {
                                                transDescSave = recordsProcessed[recordsProcessed.length - 1].TransDesc + ' - ';
                                            }
                                            const record = {
                                                "BankNumber": parseInt(all.banks.accountDetails.bank.BankNumber),
                                                "TargetId": all.banks.accountDetails.bank.targetId,
                                                "Token": all.banks.accountDetails.bank.token,
                                                "ExtractDate": new Date().getFullYear() + '' + ("0" + (new Date().getMonth() + 1)).slice(-2)
                                                    + '' + ("0" + (new Date().getDate())).slice(-2)
                                                    + '' + ("0" + (new Date().getHours())).slice(-2) + '' + ("0" + (new Date().getMinutes())).slice(-2),
                                                "ExporterId": all.banks.spiderConfig.spiderId,
                                                "BranchNumber": all.banks.accounts.hapoalim.account[hapoalim.accAsharai].branchNumber,
                                                "AccountNumber": all.banks.accounts.hapoalim.account[hapoalim.accAsharai].accountNumber,
                                                "CardNumber": card.cardIdentification.cardSuffix,
                                                "NextBillingDate": all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(row.debitDate)),
                                                "NextCycleTotal": cycleTotal,
                                                "CardStatus": null,
                                                "TransDesc": (transDescSave) ? (transDescSave + row.comment) : row.merchantDetails.merchantName,
                                                "TransTotal": row.currencyAmount.amount,
                                                "ValueDate": row.eventDate != 0
                                                    ? all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(row.eventDate))
                                                    : all.banks.core.services.convertDateAll(hapoalim.convertDateLocal(row.debitDate)),
                                                "TotalPayments": row.paymentsNumber > 0 ? row.paymentsNumber : null,
                                                "CurrentPaymentNum": row.paymentNumber > 0 ? row.paymentNumber : null,
                                                "CardType": cardType,
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
                                });
                        });
                    if (recordsProcessed.length > 0) {
                        if (all.banks.spiderConfig.sendToServerApi.indexOf('eloan.co.il') !== -1) {
                            hapoalim.recordsProcessedEloan.push(...recordsProcessed)
                        } else {
                            if (transactionsType === 'previous') {
                                await send(recordsProcessed);
                            }
                            // if (!sameCurr || isLast) {
                            //     await send(recordsProcessed);
                            // }
                        }
//                  all.banks.generalVariables.allDataArrAshrai.push(...recordsProcessed);
                    }
                    writeLog('Processing cycle ' + transactionsType + ' ' + cycleDate
                        + ' for card ' + card.cardIdentification.cardSuffix + '...'
                        + ' Got ' + recordsProcessed.length);
                } else {
                    writeLog('Processing cycle ' + transactionsType + ' ' + cycleDate
                        + ' for card ' + card.cardIdentification.cardSuffix + '...'
                        + ' Got nothing');
                }
            } catch (e) {
                console.error(e);
            } finally {
                console.log('We do cleanup here');
                writeLog('Processing cycle ' + transactionsType + ' ' + cycleDate
                    + ' for card ' + card.cardIdentification.cardSuffix + '...'
                    + ' Got nothing');
            }
        }

        async function send(cycleResults) {
            try {
                await all.banks.core.services.sendCards(cycleResults)
            } catch (error) {
                if (error === 'discard') {
                    send(cycleResults);
                }
            }
        }
    };

    return hapoalim;
}();
