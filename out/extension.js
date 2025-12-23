"use strict";var vr=Object.create;var H=Object.defineProperty;var _r=Object.getOwnPropertyDescriptor;var br=Object.getOwnPropertyNames;var yr=Object.getPrototypeOf,wr=Object.prototype.hasOwnProperty;var d=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports),kr=(e,r)=>{for(var t in r)H(e,t,{get:r[t],enumerable:!0})},we=(e,r,t,l)=>{if(r&&typeof r=="object"||typeof r=="function")for(let i of br(r))!wr.call(e,i)&&i!==t&&H(e,i,{get:()=>r[i],enumerable:!(l=_r(r,i))||l.enumerable});return e};var D=(e,r,t)=>(t=e!=null?vr(yr(e)):{},we(r||!e||!e.__esModule?H(t,"default",{value:e,enumerable:!0}):t,e)),Pr=e=>we(H({},"__esModule",{value:!0}),e);var m=d(h=>{"use strict";h.__esModule=!0;h.extend=Pe;h.indexOf=Or;h.escapeExpression=Mr;h.isEmpty=Fr;h.createFrame=Rr;h.blockParams=Tr;h.appendContextPath=qr;var Er={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},xr=/[&<>"'`=]/g,Ar=/[&<>"'`=]/;function Cr(e){return Er[e]}function Pe(e){for(var r=1;r<arguments.length;r++)for(var t in arguments[r])Object.prototype.hasOwnProperty.call(arguments[r],t)&&(e[t]=arguments[r][t]);return e}var ne=Object.prototype.toString;h.toString=ne;var te=function(r){return typeof r=="function"};te(/x/)&&(h.isFunction=te=function(e){return typeof e=="function"&&ne.call(e)==="[object Function]"});h.isFunction=te;var Ee=Array.isArray||function(e){return e&&typeof e=="object"?ne.call(e)==="[object Array]":!1};h.isArray=Ee;function Or(e,r){for(var t=0,l=e.length;t<l;t++)if(e[t]===r)return t;return-1}function Mr(e){if(typeof e!="string"){if(e&&e.toHTML)return e.toHTML();if(e==null)return"";if(!e)return e+"";e=""+e}return Ar.test(e)?e.replace(xr,Cr):e}function Fr(e){return!e&&e!==0?!0:!!(Ee(e)&&e.length===0)}function Rr(e){var r=Pe({},e);return r._parent=e,r}function Tr(e,r){return e.path=r,e}function qr(e,r){return(e?e+".":"")+r}});var P=d((B,xe)=>{"use strict";B.__esModule=!0;var ae=["description","fileName","lineNumber","endLineNumber","message","name","number","stack"];function ie(e,r){var t=r&&r.loc,l=void 0,i=void 0,s=void 0,o=void 0;t&&(l=t.start.line,i=t.end.line,s=t.start.column,o=t.end.column,e+=" - "+l+":"+s);for(var n=Error.prototype.constructor.call(this,e),a=0;a<ae.length;a++)this[ae[a]]=n[ae[a]];Error.captureStackTrace&&Error.captureStackTrace(this,ie);try{t&&(this.lineNumber=l,this.endLineNumber=i,Object.defineProperty?(Object.defineProperty(this,"column",{value:s,enumerable:!0}),Object.defineProperty(this,"endColumn",{value:o,enumerable:!0})):(this.column=s,this.endColumn=o))}catch{}}ie.prototype=new Error;B.default=ie;xe.exports=B.default});var Ce=d((N,Ae)=>{"use strict";N.__esModule=!0;var oe=m();N.default=function(e){e.registerHelper("blockHelperMissing",function(r,t){var l=t.inverse,i=t.fn;if(r===!0)return i(this);if(r===!1||r==null)return l(this);if(oe.isArray(r))return r.length>0?(t.ids&&(t.ids=[t.name]),e.helpers.each(r,t)):l(this);if(t.data&&t.ids){var s=oe.createFrame(t.data);s.contextPath=oe.appendContextPath(t.data.contextPath,t.name),t={data:s}}return i(r,t)})};Ae.exports=N.default});var Me=d((S,Oe)=>{"use strict";S.__esModule=!0;function Ir(e){return e&&e.__esModule?e:{default:e}}var F=m(),Lr=P(),Hr=Ir(Lr);S.default=function(e){e.registerHelper("each",function(r,t){if(!t)throw new Hr.default("Must pass iterator to #each");var l=t.fn,i=t.inverse,s=0,o="",n=void 0,a=void 0;t.data&&t.ids&&(a=F.appendContextPath(t.data.contextPath,t.ids[0])+"."),F.isFunction(r)&&(r=r.call(this)),t.data&&(n=F.createFrame(t.data));function u(g,L,mr){n&&(n.key=g,n.index=L,n.first=L===0,n.last=!!mr,a&&(n.contextPath=a+g)),o=o+l(r[g],{data:n,blockParams:F.blockParams([r[g],g],[a+g,null])})}if(r&&typeof r=="object")if(F.isArray(r))for(var c=r.length;s<c;s++)s in r&&u(s,s,s===r.length-1);else if(typeof Symbol=="function"&&r[Symbol.iterator]){for(var f=[],p=r[Symbol.iterator](),b=p.next();!b.done;b=p.next())f.push(b.value);r=f;for(var c=r.length;s<c;s++)u(s,s,s===r.length-1)}else(function(){var g=void 0;Object.keys(r).forEach(function(L){g!==void 0&&u(g,s-1),g=L,s++}),g!==void 0&&u(g,s-1,!0)})();return s===0&&(o=i(this)),o})};Oe.exports=S.default});var Re=d((V,Fe)=>{"use strict";V.__esModule=!0;function Dr(e){return e&&e.__esModule?e:{default:e}}var Br=P(),Nr=Dr(Br);V.default=function(e){e.registerHelper("helperMissing",function(){if(arguments.length!==1)throw new Nr.default('Missing helper: "'+arguments[arguments.length-1].name+'"')})};Fe.exports=V.default});var Le=d((G,Ie)=>{"use strict";G.__esModule=!0;function Sr(e){return e&&e.__esModule?e:{default:e}}var Te=m(),Vr=P(),qe=Sr(Vr);G.default=function(e){e.registerHelper("if",function(r,t){if(arguments.length!=2)throw new qe.default("#if requires exactly one argument");return Te.isFunction(r)&&(r=r.call(this)),!t.hash.includeZero&&!r||Te.isEmpty(r)?t.inverse(this):t.fn(this)}),e.registerHelper("unless",function(r,t){if(arguments.length!=2)throw new qe.default("#unless requires exactly one argument");return e.helpers.if.call(this,r,{fn:t.inverse,inverse:t.fn,hash:t.hash})})};Ie.exports=G.default});var De=d((K,He)=>{"use strict";K.__esModule=!0;K.default=function(e){e.registerHelper("log",function(){for(var r=[void 0],t=arguments[arguments.length-1],l=0;l<arguments.length-1;l++)r.push(arguments[l]);var i=1;t.hash.level!=null?i=t.hash.level:t.data&&t.data.level!=null&&(i=t.data.level),r[0]=i,e.log.apply(e,r)})};He.exports=K.default});var Ne=d((U,Be)=>{"use strict";U.__esModule=!0;U.default=function(e){e.registerHelper("lookup",function(r,t,l){return r&&l.lookupProperty(r,t)})};Be.exports=U.default});var Ve=d((W,Se)=>{"use strict";W.__esModule=!0;function Gr(e){return e&&e.__esModule?e:{default:e}}var R=m(),Kr=P(),Ur=Gr(Kr);W.default=function(e){e.registerHelper("with",function(r,t){if(arguments.length!=2)throw new Ur.default("#with requires exactly one argument");R.isFunction(r)&&(r=r.call(this));var l=t.fn;if(R.isEmpty(r))return t.inverse(this);var i=t.data;return t.data&&t.ids&&(i=R.createFrame(t.data),i.contextPath=R.appendContextPath(t.data.contextPath,t.ids[0])),l(r,{data:i,blockParams:R.blockParams([r],[i&&i.contextPath])})})};Se.exports=W.default});var le=d(Y=>{"use strict";Y.__esModule=!0;Y.registerDefaultHelpers=it;Y.moveHelperToHooks=ot;function x(e){return e&&e.__esModule?e:{default:e}}var Wr=Ce(),Yr=x(Wr),Jr=Me(),jr=x(Jr),zr=Re(),$r=x(zr),Qr=Le(),Zr=x(Qr),Xr=De(),et=x(Xr),rt=Ne(),tt=x(rt),nt=Ve(),at=x(nt);function it(e){Yr.default(e),jr.default(e),$r.default(e),Zr.default(e),et.default(e),tt.default(e),at.default(e)}function ot(e,r,t){e.helpers[r]&&(e.hooks[r]=e.helpers[r],t||delete e.helpers[r])}});var Ke=d((J,Ge)=>{"use strict";J.__esModule=!0;var lt=m();J.default=function(e){e.registerDecorator("inline",function(r,t,l,i){var s=r;return t.partials||(t.partials={},s=function(o,n){var a=l.partials;l.partials=lt.extend({},a,t.partials);var u=r(o,n);return l.partials=a,u}),t.partials[i.args[0]]=i.fn,s})};Ge.exports=J.default});var Ue=d(se=>{"use strict";se.__esModule=!0;se.registerDefaultDecorators=dt;function st(e){return e&&e.__esModule?e:{default:e}}var ut=Ke(),ct=st(ut);function dt(e){ct.default(e)}});var ue=d((j,We)=>{"use strict";j.__esModule=!0;var ft=m(),C={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(r){if(typeof r=="string"){var t=ft.indexOf(C.methodMap,r.toLowerCase());t>=0?r=t:r=parseInt(r,10)}return r},log:function(r){if(r=C.lookupLevel(r),typeof console<"u"&&C.lookupLevel(C.level)<=r){var t=C.methodMap[r];console[t]||(t="log");for(var l=arguments.length,i=Array(l>1?l-1:0),s=1;s<l;s++)i[s-1]=arguments[s];console[t].apply(console,i)}}};j.default=C;We.exports=j.default});var Ye=d(ce=>{"use strict";ce.__esModule=!0;ce.createNewLookupObject=ht;var pt=m();function ht(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];return pt.extend.apply(void 0,[Object.create(null)].concat(r))}});var de=d(T=>{"use strict";T.__esModule=!0;T.createProtoAccessControl=_t;T.resultIsAllowed=bt;T.resetLoggedProperties=wt;function gt(e){return e&&e.__esModule?e:{default:e}}var Je=Ye(),mt=ue(),vt=gt(mt),z=Object.create(null);function _t(e){var r=Object.create(null);r.constructor=!1,r.__defineGetter__=!1,r.__defineSetter__=!1,r.__lookupGetter__=!1;var t=Object.create(null);return t.__proto__=!1,{properties:{whitelist:Je.createNewLookupObject(t,e.allowedProtoProperties),defaultValue:e.allowProtoPropertiesByDefault},methods:{whitelist:Je.createNewLookupObject(r,e.allowedProtoMethods),defaultValue:e.allowProtoMethodsByDefault}}}function bt(e,r,t){return je(typeof e=="function"?r.methods:r.properties,t)}function je(e,r){return e.whitelist[r]!==void 0?e.whitelist[r]===!0:e.defaultValue!==void 0?e.defaultValue:(yt(r),!1)}function yt(e){z[e]!==!0&&(z[e]=!0,vt.default.log("error",'Handlebars: Access has been denied to resolve the property "'+e+`" because it is not an "own property" of its parent.
You can add a runtime option to disable the check or this warning:
See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details`))}function wt(){Object.keys(z).forEach(function(e){delete z[e]})}});var ge=d(_=>{"use strict";_.__esModule=!0;_.HandlebarsEnvironment=he;function ze(e){return e&&e.__esModule?e:{default:e}}var A=m(),kt=P(),fe=ze(kt),Pt=le(),Et=Ue(),xt=ue(),$=ze(xt),At=de(),Ct="4.7.8";_.VERSION=Ct;var Ot=8;_.COMPILER_REVISION=Ot;var Mt=7;_.LAST_COMPATIBLE_COMPILER_REVISION=Mt;var Ft={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0 <4.3.0",8:">= 4.3.0"};_.REVISION_CHANGES=Ft;var pe="[object Object]";function he(e,r,t){this.helpers=e||{},this.partials=r||{},this.decorators=t||{},Pt.registerDefaultHelpers(this),Et.registerDefaultDecorators(this)}he.prototype={constructor:he,logger:$.default,log:$.default.log,registerHelper:function(r,t){if(A.toString.call(r)===pe){if(t)throw new fe.default("Arg not supported with multiple helpers");A.extend(this.helpers,r)}else this.helpers[r]=t},unregisterHelper:function(r){delete this.helpers[r]},registerPartial:function(r,t){if(A.toString.call(r)===pe)A.extend(this.partials,r);else{if(typeof t>"u")throw new fe.default('Attempting to register a partial called "'+r+'" as undefined');this.partials[r]=t}},unregisterPartial:function(r){delete this.partials[r]},registerDecorator:function(r,t){if(A.toString.call(r)===pe){if(t)throw new fe.default("Arg not supported with multiple decorators");A.extend(this.decorators,r)}else this.decorators[r]=t},unregisterDecorator:function(r){delete this.decorators[r]},resetLoggedPropertyAccesses:function(){At.resetLoggedProperties()}};var Rt=$.default.log;_.log=Rt;_.createFrame=A.createFrame;_.logger=$.default});var Qe=d((Q,$e)=>{"use strict";Q.__esModule=!0;function me(e){this.string=e}me.prototype.toString=me.prototype.toHTML=function(){return""+this.string};Q.default=me;$e.exports=Q.default});var Ze=d(ve=>{"use strict";ve.__esModule=!0;ve.wrapHelper=Tt;function Tt(e,r){if(typeof e!="function")return e;var t=function(){var i=arguments[arguments.length-1];return arguments[arguments.length-1]=r(i),e.apply(this,arguments)};return t}});var nr=d(E=>{"use strict";E.__esModule=!0;E.checkRevision=Bt;E.template=Nt;E.wrapProgram=Z;E.resolvePartial=St;E.invokePartial=Vt;E.noop=rr;function qt(e){return e&&e.__esModule?e:{default:e}}function It(e){if(e&&e.__esModule)return e;var r={};if(e!=null)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}var Lt=m(),y=It(Lt),Ht=P(),w=qt(Ht),k=ge(),Xe=le(),Dt=Ze(),er=de();function Bt(e){var r=e&&e[0]||1,t=k.COMPILER_REVISION;if(!(r>=k.LAST_COMPATIBLE_COMPILER_REVISION&&r<=k.COMPILER_REVISION))if(r<k.LAST_COMPATIBLE_COMPILER_REVISION){var l=k.REVISION_CHANGES[t],i=k.REVISION_CHANGES[r];throw new w.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+l+") or downgrade your runtime to an older version ("+i+").")}else throw new w.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+e[1]+").")}function Nt(e,r){if(!r)throw new w.default("No environment passed to template");if(!e||!e.main)throw new w.default("Unknown template object: "+typeof e);e.main.decorator=e.main_d,r.VM.checkRevision(e.compiler);var t=e.compiler&&e.compiler[0]===7;function l(o,n,a){a.hash&&(n=y.extend({},n,a.hash),a.ids&&(a.ids[0]=!0)),o=r.VM.resolvePartial.call(this,o,n,a);var u=y.extend({},a,{hooks:this.hooks,protoAccessControl:this.protoAccessControl}),c=r.VM.invokePartial.call(this,o,n,u);if(c==null&&r.compile&&(a.partials[a.name]=r.compile(o,e.compilerOptions,r),c=a.partials[a.name](n,u)),c!=null){if(a.indent){for(var f=c.split(`
`),p=0,b=f.length;p<b&&!(!f[p]&&p+1===b);p++)f[p]=a.indent+f[p];c=f.join(`
`)}return c}else throw new w.default("The partial "+a.name+" could not be compiled when running in runtime-only mode")}var i={strict:function(n,a,u){if(!n||!(a in n))throw new w.default('"'+a+'" not defined in '+n,{loc:u});return i.lookupProperty(n,a)},lookupProperty:function(n,a){var u=n[a];if(u==null||Object.prototype.hasOwnProperty.call(n,a)||er.resultIsAllowed(u,i.protoAccessControl,a))return u},lookup:function(n,a){for(var u=n.length,c=0;c<u;c++){var f=n[c]&&i.lookupProperty(n[c],a);if(f!=null)return n[c][a]}},lambda:function(n,a){return typeof n=="function"?n.call(a):n},escapeExpression:y.escapeExpression,invokePartial:l,fn:function(n){var a=e[n];return a.decorator=e[n+"_d"],a},programs:[],program:function(n,a,u,c,f){var p=this.programs[n],b=this.fn(n);return a||f||c||u?p=Z(this,n,b,a,u,c,f):p||(p=this.programs[n]=Z(this,n,b)),p},data:function(n,a){for(;n&&a--;)n=n._parent;return n},mergeIfNeeded:function(n,a){var u=n||a;return n&&a&&n!==a&&(u=y.extend({},a,n)),u},nullContext:Object.seal({}),noop:r.VM.noop,compilerInfo:e.compiler};function s(o){var n=arguments.length<=1||arguments[1]===void 0?{}:arguments[1],a=n.data;s._setup(n),!n.partial&&e.useData&&(a=Gt(o,a));var u=void 0,c=e.useBlockParams?[]:void 0;e.useDepths&&(n.depths?u=o!=n.depths[0]?[o].concat(n.depths):n.depths:u=[o]);function f(p){return""+e.main(i,p,i.helpers,i.partials,a,c,u)}return f=tr(e.main,f,i,n.depths||[],a,c),f(o,n)}return s.isTop=!0,s._setup=function(o){if(o.partial)i.protoAccessControl=o.protoAccessControl,i.helpers=o.helpers,i.partials=o.partials,i.decorators=o.decorators,i.hooks=o.hooks;else{var n=y.extend({},r.helpers,o.helpers);Kt(n,i),i.helpers=n,e.usePartial&&(i.partials=i.mergeIfNeeded(o.partials,r.partials)),(e.usePartial||e.useDecorators)&&(i.decorators=y.extend({},r.decorators,o.decorators)),i.hooks={},i.protoAccessControl=er.createProtoAccessControl(o);var a=o.allowCallsToHelperMissing||t;Xe.moveHelperToHooks(i,"helperMissing",a),Xe.moveHelperToHooks(i,"blockHelperMissing",a)}},s._child=function(o,n,a,u){if(e.useBlockParams&&!a)throw new w.default("must pass block params");if(e.useDepths&&!u)throw new w.default("must pass parent depths");return Z(i,o,e[o],n,0,a,u)},s}function Z(e,r,t,l,i,s,o){function n(a){var u=arguments.length<=1||arguments[1]===void 0?{}:arguments[1],c=o;return o&&a!=o[0]&&!(a===e.nullContext&&o[0]===null)&&(c=[a].concat(o)),t(e,a,e.helpers,e.partials,u.data||l,s&&[u.blockParams].concat(s),c)}return n=tr(t,n,e,o,l,s),n.program=r,n.depth=o?o.length:0,n.blockParams=i||0,n}function St(e,r,t){return e?!e.call&&!t.name&&(t.name=e,e=t.partials[e]):t.name==="@partial-block"?e=t.data["partial-block"]:e=t.partials[t.name],e}function Vt(e,r,t){var l=t.data&&t.data["partial-block"];t.partial=!0,t.ids&&(t.data.contextPath=t.ids[0]||t.data.contextPath);var i=void 0;if(t.fn&&t.fn!==rr&&(function(){t.data=k.createFrame(t.data);var s=t.fn;i=t.data["partial-block"]=function(n){var a=arguments.length<=1||arguments[1]===void 0?{}:arguments[1];return a.data=k.createFrame(a.data),a.data["partial-block"]=l,s(n,a)},s.partials&&(t.partials=y.extend({},t.partials,s.partials))})(),e===void 0&&i&&(e=i),e===void 0)throw new w.default("The partial "+t.name+" could not be found");if(e instanceof Function)return e(r,t)}function rr(){return""}function Gt(e,r){return(!r||!("root"in r))&&(r=r?k.createFrame(r):{},r.root=e),r}function tr(e,r,t,l,i,s){if(e.decorator){var o={};r=e.decorator(r,o,t,l&&l[0],i,s,l),y.extend(r,o)}return r}function Kt(e,r){Object.keys(e).forEach(function(t){var l=e[t];e[t]=Ut(l,r)})}function Ut(e,r){var t=r.lookupProperty;return Dt.wrapHelper(e,function(l){return y.extend({lookupProperty:t},l)})}});var ir=d((X,ar)=>{"use strict";X.__esModule=!0;X.default=function(e){(function(){typeof globalThis!="object"&&(Object.prototype.__defineGetter__("__magic__",function(){return this}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__)})();var r=globalThis.Handlebars;e.noConflict=function(){return globalThis.Handlebars===e&&(globalThis.Handlebars=r),e}};ar.exports=X.default});var cr=d((ee,ur)=>{"use strict";ee.__esModule=!0;function be(e){return e&&e.__esModule?e:{default:e}}function ye(e){if(e&&e.__esModule)return e;var r={};if(e!=null)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}var Wt=ge(),or=ye(Wt),Yt=Qe(),Jt=be(Yt),jt=P(),zt=be(jt),$t=m(),_e=ye($t),Qt=nr(),lr=ye(Qt),Zt=ir(),Xt=be(Zt);function sr(){var e=new or.HandlebarsEnvironment;return _e.extend(e,or),e.SafeString=Jt.default,e.Exception=zt.default,e.Utils=_e,e.escapeExpression=_e.escapeExpression,e.VM=lr,e.template=function(r){return lr.template(r,e)},e}var q=sr();q.create=sr;Xt.default(q);q.default=q;ee.default=q;ur.exports=ee.default});var fr=d((Fn,dr)=>{dr.exports=cr().default});var bn={};kr(bn,{UNGROUPED_KEY:()=>I,activate:()=>mn,deactivate:()=>vn});module.exports=Pr(bn);var v=D(require("vscode")),gr=D(require("fs"));var M=D(require("jsonc-parser"));function ke(e){let r=[],t=0,l=0,i=null;M.visit(e,{onArrayBegin(){t++},onArrayEnd(){t--},onObjectBegin(o){l++,t===1&&l===1&&(i=o)},onObjectEnd(o,n){if(t===1&&l===1&&i!==null){let a=i,u=o+n,c=e.slice(a,u),f=M.parse(c);r.push({type:"object",value:f,offset:a}),i=null}l--},onComment(o,n){if(t===1&&l===0){let a=e.slice(o,o+n);r.push({type:"comment",value:a,offset:o})}}});let s=M.parse(e);if(!Array.isArray(s))throw new Error("Top-level JSONC value must be an array.");return r.sort((o,n)=>o.offset-n.offset),r.map(({offset:o,...n})=>n)}var O=D(fr());O.registerHelper({});O.registerPartial({});var pr=O.template({1:function(e,r,t,l,i){var s,o=e.lambda,n=e.escapeExpression,a=e.lookupProperty||function(u,c){if(Object.prototype.hasOwnProperty.call(u,c))return u[c]};return`        <div class="kb-group-container">
          <h4 class="kb-title" style="background-color: `+n(o(r!=null?a(r,"color"):r,r))+`88;">
            `+n(o(r!=null?a(r,"title"):r,r))+`
          </h4>
          <table class="kb-table">
            <tbody>
`+((s=a(t,"each").call(r??(e.nullContext||{}),r!=null?a(r,"items"):r,{name:"each",hash:{},fn:e.program(2,i,0),inverse:e.noop,data:i,loc:{start:{line:138,column:14},end:{line:143,column:23}}}))!=null?s:"")+`            </tbody>
          </table>
        </div>
`},2:function(e,r,t,l,i){var s=e.lambda,o=e.escapeExpression,n=e.lookupProperty||function(a,u){if(Object.prototype.hasOwnProperty.call(a,u))return a[u]};return`                <tr>
                  <td class="kb-cell left-cell">`+o(s(r!=null?n(r,"desc"):r,r))+`</td>
                  <td class="kb-cell right-cell">`+o(s(r!=null?n(r,"key"):r,r))+`</td>
                </tr>
`},compiler:[8,">= 4.3.0"],main:function(e,r,t,l,i){var s,o=e.lookupProperty||function(n,a){if(Object.prototype.hasOwnProperty.call(n,a))return n[a]};return`<html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Keybindings</title>
    <style>
      :root {
        --table-border: color-mix(
          in srgb,
          var(--vscode-editor-foreground) 20%,
          black
        );
        --table-alternate: color-mix(
          in srgb,
          var(--vscode-editor-background) 99%,
          white
        );
      }

      body {
        font-family:
          -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
          sans-serif;
        background-color: var(--vscode-editor-background);
        color: var(--vscode-editor-foreground);
        padding: 20px;
      }

      h1 {
        color: var(--vscode-editor-foreground);
      }

      h4 {
        margin: 0;
      }

      .kb-group-container {
        background-color: var(--vscode-panel-background);
        position: relative;
        flex: 1 1 100%;
        padding: 0;
        break-inside: avoid;
      }

      .cheatsheet {
        column-gap: 16px;
      }

      .kb-title {
        width: 100%;
        box-sizing: border-box;
        font-weight: bold;
        padding-top: 0.6rem;
        padding-bottom: 0.6rem;
        padding-left: 1rem;
        padding-right: 1rem;
        font-size: 0.9rem;
      }

      .kb-entry {
        display: flex;
        justify-content: space-between;
      }

      table.kb-table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid var(--table-border) !important;
        break-inside: avoid;
        margin-bottom: 16px;
        width: 100%;
      }

      table.kb-table th,
      table.kb-table td {
        border: 1px solid var(--table-border);
        padding: 10px;
      }

      table.kb-table tr:not(:last-child) td,
      table.kb-table tr:not(:last-child) th {
        border-bottom: 1px solid var(--table-border);
      }

      table.kb-table tbody tr:nth-child(even) {
        background-color: var(--table-alternate);
      }

      .right-cell {
        text-align: right;
      }

      tr:nth-child(even) td.right-cell {
        border-left: 1px solid var(--table-alternate);
      }
      tr:nth-child(even) td.left-cell {
        border-right: 1px solid var(--table-alternate);
      }

      tr:nth-child(odd) td.left-cell {
        border-right: 1px solid var(--vscode-panel-background);
      }
      tr:nth-child(odd) td.right-cell {
        border-left: 1px solid var(--vscode-panel-background);
      }

      @media (max-width: 599px) {
        .cheatsheet {
          column-count: 1;
        }
      }

      @media (min-width: 600px) and (max-width: 899px) {
        .cheatsheet {
          column-count: 2;
        }
      }

      @media (min-width: 900px) {
        .cheatsheet {
          column-count: 3;
        }
      }
    </style>
  </head>

  <body>
    <h1>Keybindings Cheatsheet</h1>
    <div class="cheatsheet">
`+((s=o(t,"each").call(r??(e.nullContext||{}),r!=null?o(r,"groups"):r,{name:"each",hash:{},fn:e.program(1,i,0),inverse:e.noop,data:i,loc:{start:{line:131,column:6},end:{line:147,column:15}}}))!=null?s:"")+`    </div>
  </body>

</html>`},useData:!0});var re=(u=>(u.Random="RANDOM",u.Red="RED",u.Orange="ORANGE",u.Yellow="YELLOW",u.Green="GREEN",u.Blue="BLUE",u.Violet="VIOLET",u.Gray="GRAY",u.Catppuccin="CATPPUCCIN",u))(re||{});var en=["#FF595E","#00B4D8","#F72585","#FF9F1C","#7209B7","#FF6F61","#3A0CA3","#3FBF7F","#FFBA08","#0096C7"],rn=["#4A001F","#8B0010","#FF0033","#5A0A00","#A30021","#7F0037","#D10000","#390009","#E20E5A","#B30000"],tn=["#552100","#FF4300","#A63F00","#7A1E00","#FF6A00","#4A1E05","#D14F00","#FF3D14","#6B2600","#FF5A22"],nn=["#4A4000","#FFDD00","#A68A00","#665C00","#FFC400","#3A3200","#E6B800","#C2A300","#7A6C00","#FFB700"],an=["#003F1A","#00FF66","#006B3C","#00994D","#00CC88","#004221","#00A86B","#002D17","#00E673","#007A29"],on=["#001F5C","#0077FF","#003366","#0050A1","#1A00FF","#002040","#0090FF","#003C8F","#000D33","#0055FF"],ln=["#3C0066","#B300FF","#4F006B","#7E00D6","#250035","#8A00B3","#5A007F","#C000FF","#34004A","#9C00CC"],sn=["#000000","#0A0A0F","#141414","#1C1C22","#232323","#2B2B34","#111118","#1A1A20","#202027","#33333A"],un=["#d20f39","#179299","#8839ef","#40a02b","#ea76cb","#fe640b","#04a5e5","#e64553","#1e66f5","#df8e1d"],cn={RANDOM:en,RED:rn,ORANGE:tn,YELLOW:nn,GREEN:an,BLUE:on,VIOLET:ln,GRAY:sn,CATPPUCCIN:un};function hr(e,r){let t=cn[r],l=Array.from(e.entries()).filter(([i,s])=>s.length!==0).map(([i,s],o)=>({title:i===I?"Misc":i,color:t[o%t.length],items:s.map(({desc:n,key:a})=>({desc:n??"No description provided",key:a}))}));return pr({groups:l})}var I="_ungrouped_",dn=e=>e.indexOf("//")===-1?"":e.slice(e.indexOf("//")+2).trimStart(),fn=e=>Object.values(re).includes(e);async function pn(e){return e||v.window.showInputBox({prompt:"Path to keybindings.json",placeHolder:"/abs/path/to/keybindings.json",validateInput:r=>r.trim()?r.startsWith("/")?null:"Paht must be absolute":"Path cannot be empty"})}async function hn(e){let r=e?.toUpperCase();if(r&&fn(r))return r;let t=Object.values(re).map(i=>({label:i.charAt(0).toUpperCase()+i.slice(1).toLowerCase(),value:i}));return(await v.window.showQuickPick(t,{placeHolder:"Select a theme"}))?.value}function gn(e){let r=new Map;r.set(I,[]);for(let t of e){if(t.type==="comment"){let l=dn(t.value);r.has(l)||r.set(l,[])}if(t.type==="object"){let l=Array.from(r.keys()),i=l.length>0?l[l.length-1]:I;r.get(i).push({desc:t.value.desc,key:t.value.key})}}return r}function mn(e){let r=v.commands.registerCommand("keybindingsCheatsheet.showCheatsheet",async t=>{let l=await pn(t?.keymapsConfigPath);if(!l)return;let i=await hn(t?.theme);if(i)try{let s=gr.readFileSync(l,"utf8"),o=v.window.createWebviewPanel("keybindingsMarkdownView","Keybindings Cheatsheet",v.ViewColumn.One,{enableScripts:!1}),n=s.slice(s.indexOf("["),s.lastIndexOf("]")+1),a=ke(n),u=gn(a);o.webview.html=hr(u,i)}catch(s){_n(s,l)}});e.subscriptions.push(r)}function vn(){}function _n(e,r){if(e instanceof Error&&"code"in e)switch(e.code){case"ENOENT":v.window.showErrorMessage(`Keybindings file not found:
${r}`);return;case"EACCES":v.window.showErrorMessage(`Permission denied reading:
${r}`);return}v.window.showErrorMessage("Failed to read keybindings.json"),console.error(e)}0&&(module.exports={UNGROUPED_KEY,activate,deactivate});
