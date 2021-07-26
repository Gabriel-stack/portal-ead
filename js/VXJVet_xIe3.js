if (self.CavalryLogger) { CavalryLogger.start_js(["dtYLsbq"]); }

__d("WebPixelRatio",["SiteData"],(function(a,b,c,d,e,f,g){function a(){return c("SiteData").pr!=null&&c("SiteData").pr>0?c("SiteData").pr:window.devicePixelRatio||1}g.get=a}),98);
__d("createQPLEvent_DO_NOT_USE",[],(function(a,b,c,d,e,f){"use strict";function a(a,b){return{config:b,markerId:a}}f["default"]=a}),66);
__d("createLegacyQPLEvent_DO_NOT_USE",["QuickLogConfig","createQPLEvent_DO_NOT_USE"],(function(a,b,c,d,e,f,g){"use strict";function a(a){var b=c("QuickLogConfig").qpl_events[a];return c("createQPLEvent_DO_NOT_USE")(a,{r:b==null?void 0:b.sampleRate,m:(a=b==null?void 0:b.samplingMethod)!=null?a:1})}g["default"]=a}),98);