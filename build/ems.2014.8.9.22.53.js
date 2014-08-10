/*csd*/(function(H){function x(Q){return(Q===null)||(typeof Q==="undefined");}function w(Q){return(Q instanceof Array)||(Q&&Q.length&&Q[0]);}function n(T,Q){if(!T||!Q){return;}if(w(T)){var U=T.length;for(var R=0;R<U;R++){if(x(T[R])){continue;}var V=Q.call(T[R],R,T[R]);if(!x(V)){return V;}}}else{for(var S in T){if(x(T[S])){continue;}var W=Q.call(T[S],S,T[S]);if(!x(W)){return W;}}}}function M(Q,R){return Q&&R&&Q.indexOf(R)===0;}function i(Q,R){return Q&&R&&Q.indexOf(R)>-1;}function J(Q,R,S){if(x(Q)){return Q;}return Q.replace(new RegExp(R,"g"),S);}function f(Q){setTimeout(Q,0);}function P(Q){if(x(Q)){return[];}if((typeof Q)=="string"){Q=[Q];}return Q;}function C(T){T=T.replace(/\/\*[\w\W]*?\*\//gm,";").replace(/^\/\/.*/gi,";");var Q=[];var S=/require\s*\(\s*[\"|\'](.+?)[\"|\']\s*\)\s*[;|,|\n|\}|\{|\[|\]|\.]/gm;var R=null;while(R=S.exec(T)){if(R&&R[1]&&!i(R[1],'"')&&!i(R[1],"'")){Q.push(R[1]);}}return Q;}function k(R){var Q=document.createElement("script");Q.src=R;Q.async=true;Q.defer=true;Q.type="text/javascript";return Q;}function l(R){var Q=document.createElement("link");Q.href=R;Q.type="text/css";Q.rel="stylesheet";return Q;}function t(){return document.getElementsByTagName("script");}function r(){var Q=t();return n(Q,function(){return this.getAttribute("data-main");});}function q(){var Q=t();return n(Q,function(){if(this.readyState==="interactive"){return this;}});}var o=null;function d(Q){if(!o){o=document.getElementsByTagName("head");o=o&&o[0]?o[0]:document.body;o=o||o.parent;}o.appendChild(Q);}function g(Q,S,R){if(Q.addEventListener){Q.addEventListener(S,R);}else{if(Q.attachEvent){Q.attachEvent("on"+S,R);}}}function h(Q,R){if(!Q||!R){return;}if((typeof HTMLLinkElement!=="undefined")&&(Q instanceof HTMLLinkElement)){R.apply(Q,[{}]);return;}var S=Q.attachEvent?"readystatechange":"load";g(Q,S,function(){var T=Q.readyState||"loaded";if(T=="loaded"||T=="interactive"||T=="complete"){R.apply(Q,arguments||[]);}});}var D=H.maxLoadTime=15000;var G=H.options={};var p=H.extension=".js";var c=H.alias={};var I=H.packages={};var F=H.modules={"require":{loaded:true,executed:true,exports:"require"},"exports":{loaded:true,executed:true,exports:"exports"},"module":{loaded:true,executed:true,exports:"module"}};H.config=function(Q){if(Q===null){return G;}Q=Q||{};Q.alias=Q.alias||Q.paths||{};n(Q.alias,function(R,S){c[R]=S;});Q.packages=Q.packages||[];n(Q.packages,function(R,S){S.name=S.name||R;I[S.name]=S;});p=p||Q.extension;G=Q;};function y(Q){return(Q=="require"||Q=="exports"||Q=="module");}function O(S){if(M(S,"http://")||M(S,"https://")||M(S,"file://")){return true;}else{var Q=/^\S+?:\//ig;var R=/^\S+?:\\/ig;return Q.test(S)||R.test(S);}}function N(Q){return M(Q,"/")||M(Q,"\\");}function b(T,R){if(x(T)||x(R)||O(T)||N(T)||y(T)){return T;}T=J(T,"\\\\","/");R=J(R,"\\\\","/");R=R.split("?")[0].split("#")[0];var Q=R.substring(0,R.lastIndexOf("/"));var V=T.split("#")[0].split("/");var U=T.split("#")[1];var S=Q.length>0?Q.split("/"):[];n(V,function(W,X){if(X==".."){S.pop();}else{if(X=="."){}else{S.push(X);}}});return S.join("/")+(U?"#"+U:"");}function K(Q,R,S){if(x(Q)||x(R)){return Q;}var U=Q.split("!");var T=[];n(U,function(V,W){var X=c[W]||W;X=v(X);X=b(X,R);if(!S){X=u(X);}T.push(X);});return T.join("!");}function u(R){if(y(R)){return R;}var Q=R.substring(R.lastIndexOf("/")+1,R.length);if(!x(R)&&!x(Q)&&R!==""&&!i(R,"?")&&!i(R,"#")&&Q!==""&&!i(Q,".")){R+=(p||".js");}return R;}function v(T){var Q=T.indexOf("/");if(Q<0){Q=T.length;}var R=T.substr(0,Q);var S=T.substr(Q+1,T.length);n(I,function(U,V){if(R==V.name){R=V.location||R;S=S||V.main||"";if(R[R.length-1]=="/"){R=R.substring(0,R.lastIndexOf("/"));}if(S[0]=="/"){S=S.substring(1,S.length);}T=R+"/"+S;}});return T;}function m(S,R){R=R||location.href;S=P(S);var Q=[];n(S,function(U,T){var V=K(T,R);Q.push(V);});return Q;}function e(R,Q){R.deps=Q.deps;R.factory=Q.factory;R.factoryDeps=Q.factoryDeps;Q=null;return R;}function L(S,Q){var R=F[S];if(!R){return;}R.loading=true;e(R,Q);R.require(R.deps,function(){R.imports=arguments||[];f(function(){R.require(R.factoryDeps,function(){f(function(){var V=R.imports;var T=[];for(var U=0;U<V.length;U++){if(V[U]=="require"){V[U]=R.require;}if(V[U]=="exports"){V[U]=R.exports;}if(V[U]=="module"){V[U]=R;}T.push(V[U]);}T.push(R.require);T.push(R.exports);T.push(R);R.imports=T;R.execute=function(){if(R.executed||x(R.factory)){return R.exports;}var W=R.factory.apply(R,R.imports);R.exports=W||R.exports;R.executed=true;return R.exports;};R.execute();n(R.loadCallbacks,function(X,W){W(R.exports);});if(H.onLoad){H.onLoad(R);}R.loaded=true;R.loadCallbacks=null;if(R.timer){clearTimeout(R.timer);}});});});});}function a(S,Q){if(x(F[S])){F[S]=new E(S);}var R=F[S];if(R.loaded&&Q){Q(R.exports);return R.exports;}if(!x(R.loadCallbacks)){R.loadCallbacks.push(Q);return;}R.loadCallbacks=[];R.loadCallbacks.push(Q);R.element=i(S,".css")?l(S):k(S);h(R.element,function(){if(!R.loaded&&!R.loading){var T=z.shift()||{};L(S,T);}});R.timer=setTimeout(function(){console.error("加载 "+S+" 超时,可能存在无法处理的循环依赖或其它未知问题.");},D);d(R.element);}function A(V,Q){if(!i(V,"!")){return a(V,Q);}else{var U=V.lastIndexOf("!");var T=V.substring(0,U);var S=V.substring(U+1);var R=F[S];if(R&&R.loaded){if(Q){Q(R.exports);}return R.exports;}return A(T,function(X){if(!X||!X.load){return;}var W=function(Z){R={exports:Z,loaded:true};if(Q){Q(Z);}};W.fromText=W;W.error=W;var Y=F[T];X.load(S,Y.require,W,H.config());});}}H.load=function(S,R,Q){var V=m(S,Q);var T=[];var U=0;if(V&&V.length>0){n(V,function(W,X){A(X,function(){U+=1;if(U<V.length){return;}T=s(V)||T;if(R){R.apply(T,T);}});});}else{if(R){R.apply(T,T);}}return T&&T.length==1?T[0]:T;};H.unload=function(R,Q){var S=m(R,Q);n(S,function(T,V){var U=F[V];if(U){U.element.parentNode.removeChild(U.element);U.exports=null;U.loading=null;U.deps=null;U.factory=null;U.factoryDeps=null;U.element=null;U.loaded=null;U.id=null;U=null;}});};function s(R){var Q=[];n(R,function(S,V){var U=V.split("!")[1]||V||"";var T=F[U];if(T){Q.push(T.exports);}});return Q;}function E(S){var R=this;var Q=R.uri=R.id=S||"/";R.resovleUri=function(T,U,V){return K(T,U||Q,V);};R.require=function(U,T){return H.load(U,T,S);};R.unrequire=function(T){return H.unload(T,S);};R.require.toUrl=R.require.resovleUri=function(T,U,V){return R.resovleUri(T,U,V);};R.require.defined=function(T){return F[T].loaded;};R.require.specified=function(T){return F[T].loaded||!x(F[T].loadCallbacks);};this.exports={};this.factory=null;this.deps=null;this.factoryDeps=null;this.loaded=false;}var z=[];function j(S,Q,R){var T=null;if(Q&&R){T={"id":S,"deps":Q,"factory":R};}else{if(S&&Q){T={"deps":S,"factory":Q};}else{if(S&&R){T={"deps":Q,"factory":R};}else{if(S){T={"factory":S};}}}}return T;}H.define=function(V,S,T){var R=j(V,S,T);if(R){if(typeof R.factory!="function"){var X=R.factory;R.factory=function(){return X;};}var Q=R.factory.toString();var U=C(Q);if(U&&U.length>0){R.factoryDeps=U;}var W=q();if(W){var Y=W.getAttribute("src");L(Y,R);}else{z.push(R);}}};H.resovleUri=function(R,Q){return K(R,Q||location.href);};if(window){window.define=H.define;}var B=r();if(!x(B)&&B!==""){H.load(B);}H.define.amd=H.define.emd=H.define.eamd={};})(this.ems={});