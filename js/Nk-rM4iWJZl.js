if (self.CavalryLogger) { CavalryLogger.start_js(["3TyePo3"]); }

__d("CometLruCache",["recoverableViolation"],(function(a,b,c,d,e,f,g){"use strict";var h=function(){function a(a){this.$1=a,a<=0&&c("recoverableViolation")("CometLruCache: Unable to create instance of cache with zero or negative capacity.","CometLruCache"),this.$2=new Map()}var b=a.prototype;b.set=function(a,b){this.$2["delete"](a);this.$2.set(a,b);if(this.$2.size>this.$1){a=this.$2.keys().next();a.done||this.$2["delete"](a.value)}};b.get=function(a){var b=this.$2.get(a);b!=null&&(this.$2["delete"](a),this.$2.set(a,b));return b};b.has=function(a){return this.$2.has(a)};b["delete"]=function(a){this.$2["delete"](a)};b.size=function(){return this.$2.size};b.capacity=function(){return this.$1-this.$2.size};b.clear=function(){this.$2.clear()};return a}();function a(a){return new h(a)}g.create=a}),98);
__d("ConstUriUtils",["CometLruCache","FBLogger","PHPQuerySerializer","PHPQuerySerializerNoEncoding","URIRFC3986","URISchemes","UriNeedRawQuerySVConfig","gkx","recoverableViolation"],(function(a,b,c,d,e,f,g){"use strict";var h=d("CometLruCache").create(5e3),i=new RegExp("(^|\\.)facebook\\.com$","i"),j=new RegExp("^(?:[^/]*:|[\\x00-\\x1f]*/[\\x00-\\x1f]*/)"),k=new RegExp("[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]"),l=c("UriNeedRawQuerySVConfig").uris.map(function(a){return{domain:a,valid:r(a)}}),m=[];function n(a,b){var d={};if(a!=null)for(var a=a.entries(),e=Array.isArray(a),f=0,a=e?a:a[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var g;if(e){if(f>=a.length)break;g=a[f++]}else{f=a.next();if(f.done)break;g=f.value}g=g;d[g[0]]=g[1]}else c("FBLogger")("ConstUri").warn("Passed a null query map in, this means poor client side flow coverage or client/server boundary type issue.");return b.serialize(d)}function o(a,b,e){var f=d("PHPQuerySerializer");if(["http","https"].includes(b)&&p(a)){if(c("gkx")("176")&&a.includes("doubleclick.net")&&e!=null&&!e.startsWith("http"))return f;f=d("PHPQuerySerializerNoEncoding")}return f}function p(a){return a!=null&&l.some(function(b){return b.valid&&q(a,b.domain)})}function q(a,b){if(b===""||a==="")return!1;if(a.endsWith(b)){b=a.length-b.length-1;if(b===-1||a[b]===".")return!0}return!1}function r(a){return!k.test(a)}function s(a,b){var c=b.protocol!=null&&b.protocol!==""?b.protocol:a.getProtocol();c=b.domain!=null?o(b.domain,c):a.getSerializer();c={domain:a.getDomain(),fragment:a.getFragment(),fragmentSeparator:a.hasFragmentSeparator(),isGeneric:a.isGeneric(),originalRawQuery:a.getOriginalRawQuery(),path:a.getPath(),port:a.getPort(),protocol:a.getProtocol(),queryParams:a.getQueryParams(),serializer:c,subdomain:a.getSubdomain()};a=babelHelpers["extends"]({},c,b);c=b.queryParams!=null&&b.queryParams.size!==0;return x.getUribyObject(a,c)}function t(a,b,c,d){c===void 0&&(c=!1);var e=a.protocol!==""?a.protocol+":"+(a.isGeneric?"":"//"):"",f=a.domain!==""?a.domain:"",g=a.port!==""?":"+a.port:"",h=a.path!==""?a.path:e!==""||f!==""||g!==""?"/":"";c=u(f,a.originalRawQuery,a.queryParams,b,c,(b=d)!=null?b:a.serializer);d=c.length>0?"?":"";b=a.fragment!==""?"#"+a.fragment:"";a=a.fragment===""&&a.fragmentSeparator?"#":"";return""+e+f+g+h+d+c+a+b}function u(a,b,c,d,e,f){e===void 0&&(e=!1);if(!d&&(e||p(a))){return(d=b)!=null?d:""}return n(c,f)}function v(a){var b=a.trim();b=d("URIRFC3986").parse(b)||{fragment:null,host:null,isGenericURI:!1,query:null,scheme:null,userinfo:null};var c=b.host||"",e=c.split(".");e=e.length>=3?e[0]:"";var f=o(c,b.scheme||"",b.query),g=f.deserialize(b.query||"")||{};g=new Map(Object.entries(g));g=w({domain:c,fragment:b.fragment||"",fragmentSeparator:b.fragment==="",isGeneric:b.isGenericURI,originalRawQuery:b.query,path:b.path||"",port:b.port!=null?String(b.port):"",protocol:(b.scheme||"").toLowerCase(),queryParams:g,serializer:f,subdomain:e,userInfo:(c=b==null?void 0:b.userinfo)!=null?c:""},a);return g}function w(a,b){var c={components:babelHelpers["extends"]({},a),error:"",valid:!0},e=c.components;if(!d("URISchemes").isAllowed(a.protocol)){c.valid=!1;c.error='The URI protocol "'+String(a.protocol)+'" is not allowed.';return c}if(!r(a.domain||"")){c.valid=!1;c.error="This is an unsafe domain "+String(a.domain);return c}e.port=a.port!=null&&String(a.port)||"";if(Boolean(a.userInfo)){c.valid=!1;c.error="Invalid URI: (userinfo is not allowed in a URI "+String(a.userInfo)+")";return c}a=b!=null&&b!==""?b:t(e,!1);if(e.domain===""&&e.path.indexOf("\\")!==-1){c.valid=!1;c.error="Invalid URI: (no domain but multiple back-slashes "+a+")";return c}if(!e.protocol&&j.test(a)){c.valid=!1;c.error="Invalid URI: (unsafe protocol-relative URI "+a+")";return c}if(e.domain!==""&&e.path!==""&&!e.path.startsWith("/")){c.valid=!1;c.error="Invalid URI: (domain and pathwhere path lacks leading slash "+a+")";return c}return c}var x=function(){function a(a){this.queryParams=new Map(),this.domain=a.domain,this.fragment=a.fragment,this.fragmentSeparator=Boolean(a.fragmentSeparator),this.isGenericProtocol=Boolean(a.isGeneric),this.path=a.path,this.originalRawQuery=a.originalRawQuery,this.port=a.port,this.protocol=a.protocol,this.queryParams=a.queryParams,this.serializer=a.serializer,this.subdomain=a.subdomain}var b=a.prototype;b.addQueryParam=function(a,b){if(Boolean(a)){var c=this.getQueryParams();c.set(a,b);return s(this,{queryParams:c})}return this};b.addQueryParams=function(a){if(a.size>0){var b=this.getQueryParams();a.forEach(function(a,c){b.set(c,a)});return s(this,{queryParams:b})}return this};b.addQueryParamString=function(a){if(Boolean(a)){a=a.startsWith("?")?a.slice(1):a;var b=this.getQueryParams();a.split("&").map(function(a){a=a.split("=");var c=a[0];a=a[1];b.set(c,a)});return s(this,{queryParams:b})}return this};b.addTrailingSlash=function(){var a=this.getPath();return a.length>0&&a[a.length-1]!=="/"?this.setPath(a+"/"):this};b.getDomain=function(){return this.domain};b.getFragment=function(){return this.fragment};b.getOrigin=function(){var a=this.getPort();return this.getProtocol()+"://"+this.getDomain()+(a?":"+a:"")};b.getOriginalRawQuery=function(){return this.originalRawQuery};b.getPath=function(){return this.path};b.getPort=function(){return this.port};b.getProtocol=function(){return this.protocol.toLowerCase()};b.getQualifiedUri=function(){if(!this.getDomain()){var b=String(window.location.href);b=b.slice(0,b.indexOf("/",b.indexOf(":")+3));return a.getUri(b+this.toString())}return this};b.getQueryParam=function(a){a=this.queryParams.get(a);if(typeof a==="string")return a;else{a=JSON.stringify(a);return a==null?a:JSON.parse(a)}};b.getQueryData=function(){return Object.fromEntries(this.getQueryParams())};b.getQueryParams=function(){return new Map(JSON.parse(JSON.stringify(Array.from(this.queryParams))))};b.getQueryString=function(a){a===void 0&&(a=!1);return u(this.domain,this.originalRawQuery,this.queryParams,!1,a,this.serializer)};b.getRegisteredDomain=function(){if(!this.getDomain())return"";if(!this.isFacebookUri())return null;var a=this.getDomain().split("."),b=a.indexOf("facebook");b===-1&&(b=a.indexOf("workplace"));return a.slice(b).join(".")};b.getSerializer=function(){return this.serializer};b.getSubdomain=function(){return this.subdomain};b.getUnqualifiedUri=function(){if(this.getDomain()){var b=this.toString();return a.getUri(b.slice(b.indexOf("/",b.indexOf(":")+3)))}return this};a.getUri=function(b){b=b.trim();var d=h.get(b);if(d==null){var e=v(b);if(e.valid)d=new a(e.components),h.set(b,d);else{c("recoverableViolation")(e.error,"ConstUri");return null}}return d};a.getUribyObject=function(b,d){var e=t(b,d),f=h.get(e);if(f==null){d&&(b.originalRawQuery=n(b.queryParams,b.serializer));d=w(b);if(d.valid)f=new a(d.components),h.set(e,f);else{c("recoverableViolation")(d.error,"ConstUri");return null}}return f};b.hasFragmentSeparator=function(){return this.fragmentSeparator};b.isEmpty=function(){return!(this.getPath()||this.getProtocol()||this.getDomain()||this.getPort()||this.queryParams.size>0||this.getFragment())};b.isFacebookUri=function(){var a=this.toString();if(a==="")return!1;return!this.getDomain()&&!this.getProtocol()?!0:["https","http"].indexOf(this.getProtocol())!==-1&&i.test(this.getDomain())};b.isGeneric=function(){return this.isGenericProtocol};b.isSameOrigin=function(a){if(this.getProtocol()&&this.getProtocol()!==a.getProtocol())return!1;if(this.getDomain()&&this.getDomain()!==a.getDomain())return!1;if(this.getPort()&&this.getPort()!==a.getPort())return!1;return this.toString()===""||a.toString()===""?!1:!0};b.isSubdomainOfDomain=function(b){var c=a.getUri(b);return c!=null&&q(this.domain,b)};b.isSecure=function(){return this.getProtocol()==="https"};b.removeQueryParams=function(a){if(Array.isArray(a)&&a.length>0){var b=this.getQueryParams();a.map(function(a){return b["delete"](a)});return s(this,{queryParams:b})}return this};b.removeQueryParam=function(a){if(Boolean(a)){var b=this.getQueryParams();b["delete"](a);return s(this,{queryParams:b})}return this};b.replaceQueryParam=function(a,b){if(Boolean(a)){var c=this.getQueryParams();c.set(a,b);return s(this,{queryParams:c})}return this};b.replaceQueryParams=function(a){return s(this,{queryParams:a})};b.replaceQueryParamString=function(a){if(a!=null){a=a.startsWith("?")?a.slice(1):a;var b=this.getQueryParams();a.split("&").map(function(a){a=a.split("=");var c=a[0];a=a[1];b.set(c,a)});return s(this,{queryParams:b})}return this};b.setDomain=function(a){if(Boolean(a)){var b=a.split(".");b=b.length>=3?b[0]:"";return s(this,{domain:a,subdomain:b})}return this};b.setFragment=function(a){return a==="#"?s(this,{fragment:"",fragmentSeparator:!0}):s(this,{fragment:a,fragmentSeparator:a!==""})};b.setPath=function(a){return a!=null?s(this,{path:a}):this};b.setPort=function(a){return Boolean(a)?s(this,{port:a}):this};b.setProtocol=function(a){return Boolean(a)?s(this,{protocol:a}):this};b.setSecure=function(a){return this.setProtocol(a?"https":"http")};b.setSubDomain=function(a){if(Boolean(a)){var b=this.domain.split(".");b.length>=3?b[0]=a:b.unshift(a);return s(this,{domain:b.join("."),subdomain:a})}return this};b.stripTrailingSlash=function(){return this.setPath(this.getPath().replace(/\/$/,""))};a.$1=function(a){a=a;for(var b=0;b<m.length;b++){var c=m[b];a=c(a)}return a};b.$2=function(b,c){c===void 0&&(c=!1);return t({domain:a.$1(this.domain),fragment:this.fragment,fragmentSeparator:this.fragmentSeparator,isGeneric:this.isGenericProtocol,originalRawQuery:this.originalRawQuery,path:this.path,port:this.port,protocol:this.protocol,queryParams:this.queryParams,serializer:b,subdomain:this.subdomain,userInfo:""},!1,c)};b.toStringRawQuery=function(){this.rawStringValue==null&&(this.rawStringValue=this.$2(d("PHPQuerySerializerNoEncoding")));return this.rawStringValue};b.toString=function(){this.stringValue==null&&(this.stringValue=this.$2(this.serializer));return this.stringValue};b.toStringPreserveQuery=function(){return this.$2(this.serializer,!0)};a.isValidUri=function(b){var c=h.get(b);if(c!=null)return!0;c=v(b);if(c.valid){h.set(b,new a(c.components));return!0}return!1};return a}();function a(a){if(a instanceof x)return a;else return null}function b(a){m.push(a)}e=x.getUri;f=x.isValidUri;g.isSubdomainOfDomain=q;g.isConstUri=a;g.registerDomainFilter=b;g.getUri=e;g.isValidUri=f}),98);
__d("HostnameRewriter",["ConstUriUtils","Env","URI","isFacebookURI","lowerFacebookDomain"],(function(a,b,c,d,e,f,g){var h=function(a){return String(a).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")},i=null,j=null,k=new RegExp("facebook\\.com$"),l=new RegExp("^www\\.(|.*\\.)facebook\\.com$"),m=null,n="facebook.com",o=null,p=new RegExp("fbcdn\\.net$"),q=new RegExp("^www\\."),r=new RegExp("(^|\\.)(facebook\\.com|workplace\\.com)$","i");function s(){i=null;var a="(^|\\.)";m=a+h(n)+"$";j=null}function t(){if(m==null)return null;if(i)return i;i=new RegExp(m,"i");return i}function u(){if(j)return j;j=new RegExp("(^|\\.)("+h(n)+"|facebook\\.com)$","i");return j}function v(a){if(u().test(a)&&n!=null)return a.replace(k,n);else if(o!=null&&a!==null)return a.replace(p,o);return a}function w(a){return l.test(a)?a.replace(q,"web."):a}function x(a){return function(b){b=new(c("URI"))(b);b.setDomain(a(b.getDomain()));return b}}function y(a,b){n=a,o=b,s(),c("isFacebookURI").setRegex(t()),c("URI").registerFilter(x(v)),d("ConstUriUtils").registerDomainFilter(v),c("lowerFacebookDomain").setDomain(n)}function a(a,b){n=a,c("URI").registerFilter(x(w))}function b(){var a=c("Env").hostnameRewriterConfig;if(a==null)return;switch(a.site){case"onion":y(a.inboundName,a.cdnDomainName);break}}function e(){c("isFacebookURI").setRegex(r)}g.registerFacebookOverTorFilters=y;g.registerInternetDotOrgFilters=a;g.maybeRegisterFilters=b;g.treatWorkplaceAsFacebookURI=e}),98);
__d("LitestandClassicPlaceHolders",[],(function(a,b,c,d,e,f){var g={};function a(a,b){g[a]=b}function b(a){var b=g[a],c=b==null?void 0:b.parentNode;b!=null&&c!=null&&c.removeChild(b);delete g[a]}f.register=a;f.destroy=b}),66);
__d("setInterval",["cr:896461"],(function(a,b,c,d,e,f,g){g["default"]=b("cr:896461")}),98);
__d("SchedulerFeatureFlags",["gkx"],(function(a,b,c,d,e,f,g){a=!0;b=!1;d=c("gkx")("1099893");e=!0;f=c("gkx")("1951072");g.enableSchedulerDebugging=a;g.enableIsInputPending=b;g.enableProfiling=d;g.enableMessageLoopImplementation=e;g.enableSetImmediate=f}),98);
__d("Scheduler-dev.classic",["SchedulerFeatureFlags"],(function(a,b,c,d,e,f){"use strict"}),null);
__d("Scheduler-profiling.classic",["SchedulerFeatureFlags"],(function(b,c,d,e,f,g){"use strict";var h=c("SchedulerFeatureFlags").enableIsInputPending,i=c("SchedulerFeatureFlags").enableSchedulerDebugging,j=c("SchedulerFeatureFlags").enableProfiling;function k(b,c){var d=b.length;b.push(c);a:for(;0<d;){var e=d-1>>>1,f=b[e];if(0<n(f,c))b[e]=c,b[d]=f,d=e;else break a}}function l(b){return 0===b.length?null:b[0]}function m(b){if(0===b.length)return null;var c=b[0],d=b.pop();if(d!==c){b[0]=d;a:for(var e=0,f=b.length,g=f>>>1;e<g;){var h=2*(e+1)-1,i=b[h],j=h+1,k=b[j];if(0>n(i,d))j<f&&0>n(k,i)?(b[e]=k,b[j]=d,e=j):(b[e]=i,b[h]=d,e=h);else if(j<f&&0>n(k,d))b[e]=k,b[j]=d,e=j;else break a}}return c}function n(b,c){var d=b.sortIndex-c.sortIndex;return 0!==d?d:b.id-c.id}var o=0,p=0,q=0,r=null,s=null,t=0;function u(b){if(null!==s){var c=t;t+=b.length;if(t+1>q){q*=2;if(524288<q){v();return}var d=new Int32Array(4*q);d.set(s);r=d.buffer;s=d}s.set(b,c)}}function b(){q=131072,r=new ArrayBuffer(4*q),s=new Int32Array(r),t=0}function v(){var b=r;q=0;s=r=null;t=0;return b}if("object"===typeof performance&&"function"===typeof performance.now){var w=performance;g.unstable_now=function(){return w.now()}}else{var x=Date,y=x.now();g.unstable_now=function(){return x.now()-y}}var z=[],A=[],B=1,C=!1;d=null;var D=3,E=!1,F=!1,G=!1,H="function"===typeof setTimeout?setTimeout:null,I="function"===typeof clearTimeout?clearTimeout:null,J="undefined"!==typeof setImmediate?setImmediate:null;function K(b){for(var c=l(A);null!==c;){if(null===c.callback)m(A);else if(c.startTime<=b)m(A),c.sortIndex=c.expirationTime,k(z,c),j&&(j&&null!==s&&u([1,1e3*b,c.id,c.priorityLevel]),c.isQueued=!0);else break;c=l(A)}}function L(b){G=!1;K(b);if(!F)if(null!==l(z))F=!0,Y(M);else{var c=l(A);null!==c&&Z(L,c.startTime-b)}}function M(c,b){j&&j&&null!==s&&u([8,1e3*b,p]);F=!1;G&&(G=!1,I(Q),Q=-1);E=!0;var e=D;try{if(j)try{return N(c,b)}catch(b){if(null!==d){var f=g.unstable_now();j&&null!==s&&u([3,1e3*f,d.id]);d.isQueued=!1}throw b}else return N(c,b)}finally{d=null,D=e,E=!1,j&&(c=g.unstable_now(),j&&(p++,null!==s&&u([7,1e3*c,p])))}}function N(c,b){K(b);for(d=l(z);!(null===d||i&&C||d.expirationTime>b&&(!c||U()));){var e=d.callback;if("function"===typeof e){d.callback=null;D=d.priorityLevel;var f=d.expirationTime<=b;if(j){var h=d;j&&(o++,null!==s&&u([5,1e3*b,h.id,o]))}e=e(f);b=g.unstable_now();"function"===typeof e?(d.callback=e,j&&j&&null!==s&&u([6,1e3*b,d.id,o])):(j&&(j&&null!==s&&u([2,1e3*b,d.id]),d.isQueued=!1),d===l(z)&&m(z));K(b)}else m(z);d=l(z)}if(null!==d)return!0;c=l(A);null!==c&&Z(L,c.startTime-b);return!1}var O=!1,P=null,Q=-1,R=5,S=0,T=!1;function U(){if(h&&void 0!==navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending){var b=navigator.scheduling,c=g.unstable_now();return c>=S?T||b.isInputPending()?!0:300<=c-(S-R):!1}return g.unstable_now()>=S}function V(){if(null!==P){var b=g.unstable_now();S=b+R;var c=!0;try{c=P(!0,b)}finally{c?W():(O=!1,P=null)}}else O=!1;T=!1}var W;if("function"===typeof J)W=function(){J(V)};else if("undefined"!==typeof MessageChannel){e=new MessageChannel();var X=e.port2;e.port1.onmessage=V;W=function(){X.postMessage(null)}}else W=function(){H(V,0)};function Y(b){P=b,O||(O=!0,W())}function Z(b,c){Q=H(function(){b(g.unstable_now())},c)}f=j?{startLoggingProfilingEvents:b,stopLoggingProfilingEvents:v}:null;g.unstable_IdlePriority=5;g.unstable_ImmediatePriority=1;g.unstable_LowPriority=4;g.unstable_NormalPriority=3;g.unstable_Profiling=f;g.unstable_UserBlockingPriority=2;g.unstable_cancelCallback=function(b){if(j&&b.isQueued){var c=g.unstable_now();j&&null!==s&&u([4,1e3*c,b.id]);b.isQueued=!1}b.callback=null};g.unstable_continueExecution=function(){C=!1,F||E||(F=!0,Y(M))};g.unstable_forceFrameRate=function(b){0>b||125<b?!1:R=0<b?Math.floor(1e3/b):5};g.unstable_getCurrentPriorityLevel=function(){return D};g.unstable_getFirstCallbackNode=function(){return l(z)};g.unstable_next=function(b){switch(D){case 1:case 2:case 3:var c=3;break;default:c=D}var d=D;D=c;try{return b()}finally{D=d}};g.unstable_pauseExecution=function(){C=!0};g.unstable_requestPaint=function(){h&&void 0!==navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&(T=!0)};g.unstable_runWithPriority=function(b,c){switch(b){case 1:case 2:case 3:case 4:case 5:break;default:b=3}var d=D;D=b;try{return c()}finally{D=d}};g.unstable_scheduleCallback=function(b,c,d){var e=g.unstable_now();"object"===typeof d&&null!==d?(d=d.delay,d="number"===typeof d&&0<d?e+d:e):d=e;switch(b){case 1:var f=-1;break;case 2:f=250;break;case 5:f=1073741823;break;case 4:f=1e4;break;default:f=5e3}f=d+f;b={id:B++,callback:c,priorityLevel:b,startTime:d,expirationTime:f,sortIndex:-1};j&&(b.isQueued=!1);d>e?(b.sortIndex=d,k(A,b),null===l(z)&&b===l(A)&&(G?(I(Q),Q=-1):G=!0,Z(L,d-e))):(b.sortIndex=f,k(z,b),j&&(j&&null!==s&&u([1,1e3*e,b.id,b.priorityLevel]),b.isQueued=!0),F||E||(F=!0,Y(M)));return b};g.unstable_shouldYield=U;g.unstable_wrapCallback=function(b){var c=D;return function(){var d=D;D=c;try{return b.apply(this,arguments)}finally{D=d}}}}),null);
__d("SchedulerFb-Internals_DO_NOT_USE",["Scheduler-dev.classic","Scheduler-profiling.classic","ifRequireable","requestAnimationFramePolyfill"],(function(a,b,c,d,e,f){"use strict";a.requestAnimationFrame===void 0&&(a.requestAnimationFrame=b("requestAnimationFramePolyfill"));var g;g=b("Scheduler-profiling.classic");e.exports={unstable_ImmediatePriority:g.unstable_ImmediatePriority,unstable_UserBlockingPriority:g.unstable_UserBlockingPriority,unstable_NormalPriority:g.unstable_NormalPriority,unstable_LowPriority:g.unstable_LowPriority,unstable_IdlePriority:g.unstable_IdlePriority,unstable_getCurrentPriorityLevel:g.unstable_getCurrentPriorityLevel,unstable_runWithPriority:g.unstable_runWithPriority,unstable_now:g.unstable_now,unstable_scheduleCallback:function(a,c,d){var e=b("ifRequireable")("TimeSlice",function(a){return a.guard(c,"unstable_scheduleCallback",{propagationType:a.PropagationType.CONTINUATION,registerCallStack:!0})},function(){return c});a=g.unstable_scheduleCallback(a,e,d);return a},unstable_cancelCallback:function(a){return g.unstable_cancelCallback(a)},unstable_wrapCallback:function(a){var c=b("ifRequireable")("TimeSlice",function(b){return b.guard(a,"unstable_wrapCallback",{propagationType:b.PropagationType.CONTINUATION,registerCallStack:!0})},function(){return a});return g.unstable_wrapCallback(c)},unstable_pauseExecution:function(){return g.unstable_pauseExecution()},unstable_continueExecution:function(){return g.unstable_continueExecution()},unstable_shouldYield:g.unstable_shouldYield,unstable_requestPaint:g.unstable_requestPaint,unstable_forceFrameRate:g.unstable_forceFrameRate,unstable_Profiling:g.unstable_Profiling}}),null);
__d("scheduler",["SchedulerFb-Internals_DO_NOT_USE"],(function(a,b,c,d,e,f){"use strict";e.exports=b("SchedulerFb-Internals_DO_NOT_USE")}),null);
__d("cancelAnimationFramePolyfill",[],(function(a,b,c,d,e,f){b=a.__fbNativeCancelAnimationFrame||a.cancelAnimationFrame||a.webkitCancelAnimationFrame||a.mozCancelAnimationFrame||a.oCancelAnimationFrame||a.msCancelAnimationFrame||a.clearTimeout;c=b;f["default"]=c}),66);
__d("cancelAnimationFrame",["cancelAnimationFramePolyfill"],(function(a,b,c,d,e,f,g){function a(a){c("cancelAnimationFramePolyfill")(a)}g["default"]=a}),98);
__d("requestAnimationFrame",["TimeSlice","TimerStorage","requestAnimationFrameAcrossTransitions"],(function(a,b,c,d,e,f,g){function a(a){function b(b){c("TimerStorage").unset(c("TimerStorage").ANIMATION_FRAME,d),a(b)}c("TimeSlice").copyGuardForWrapper(a,b);b.__originalCallback=a;var d=c("requestAnimationFrameAcrossTransitions")(b);c("TimerStorage").set(c("TimerStorage").ANIMATION_FRAME,d);return d}g["default"]=a}),98);
__d("replaceNativeTimer",["cancelAnimationFrame","clearInterval","clearTimeout","requestAnimationFrame","scheduler","setInterval","setTimeout"],(function(a,b,c,d,e,f){!b("scheduler");a.__fbNativeSetTimeout=a.setTimeout;a.__fbNativeClearTimeout=a.clearTimeout;a.__fbNativeSetInterval=a.setInterval;a.__fbNativeClearInterval=a.clearInterval;a.__fbNativeRequestAnimationFrame=a.requestAnimationFrame;a.__fbNativeCancelAnimationFrame=a.cancelAnimationFrame;b("setTimeout").nativeBackup=a.setTimeout;b("clearTimeout").nativeBackup=a.clearTimeout;b("setInterval").nativeBackup=a.setInterval;b("clearInterval").nativeBackup=a.clearInterval;b("requestAnimationFrame").nativeBackup=a.requestAnimationFrame;b("cancelAnimationFrame").nativeBackup=a.cancelAnimationFrame;a.setTimeout=b("setTimeout");a.clearTimeout=b("clearTimeout");a.setInterval=b("setInterval");a.clearInterval=b("clearInterval");a.requestAnimationFrame=b("requestAnimationFrame");a.cancelAnimationFrame=b("cancelAnimationFrame");function c(){}e.exports=c}),null);
__d("setIntervalBlue",["TimerStorage","setIntervalAcrossTransitions"],(function(a,b,c,d,e,f,g){function a(a,b){for(var d=arguments.length,e=new Array(d>2?d-2:0),f=2;f<d;f++)e[f-2]=arguments[f];var g=c("setIntervalAcrossTransitions").apply(void 0,[a,b].concat(e));c("TimerStorage").set(c("TimerStorage").INTERVAL,g);return g}g["default"]=a}),98);