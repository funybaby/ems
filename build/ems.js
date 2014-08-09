/*csd*//**
 *
 * emsjs v1.2.1
 * 作者：侯锋
 * 邮箱：admin@xhou.net
 * 网站：http://houfeng.net , http://houfeng.net/ems
 *
 * emsjs 是一个符合 AMD 规范的浏览器端 JavaScript 模块加载器，兼容所有主流浏览器。
 *
 **/
(function(I){function x(S){return(S===null)||(typeof S==="undefined");}function w(S){return(S instanceof Array)||(S&&S.length&&S[0]);}function n(V,S){if(!V||!S){return;}if(w(V)){var W=V.length;for(var T=0;T<W;T++){if(x(V[T])){continue;}var X=S.call(V[T],T,V[T]);if(!x(X)){return X;}}}else{for(var U in V){if(x(V[U])){continue;}var Y=S.call(V[U],U,V[U]);if(!x(Y)){return Y;}}}}function O(S,T){return S&&T&&S.indexOf(T)===0;}function i(S,T){return S&&T&&S.indexOf(T)>-1;}function L(S,T,U){if(x(S)){return S;}return S.replace(new RegExp(T,"g"),U);}function f(S){setTimeout(S,0);}function R(S){if(x(S)){return[];}if((typeof S)=="string"){S=[S];}return S;}function K(S){return S.replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g,"\n").replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g,"\n");}function C(V){V=V.replace(/\/\*[\w\W]*?\*\//gm,";").replace(/^\/\/.*/gi,";");V=K(V);var S=[];var U=/require\s*\(\s*[\"|\'](.+?)[\"|\']\s*\)\s*[;|,|\n|\}|\{|\[|\]|\.]/gm;var T=null;while(T=U.exec(V)){if(T&&T[1]&&!i(T[1],'"')&&!i(T[1],"'")){S.push(T[1]);}}return S;}function k(T){var S=document.createElement("script");S.src=T;S.async=true;S.defer=true;S.type="text/javascript";return S;}function l(T){var S=document.createElement("link");S.href=T;S.type="text/css";S.rel="stylesheet";return S;}function t(){return document.getElementsByTagName("script");}function r(){var S=t();return n(S,function(){return this.getAttribute("data-main");});}function q(){var S=t();return n(S,function(){if(this.readyState==="interactive"){return this;}});}var o=null;function d(S){if(!o){o=document.getElementsByTagName("head");o=o&&o[0]?o[0]:document.body;o=o||o.parent;}o.appendChild(S);}function g(S,U,T){if(S.addEventListener){S.addEventListener(U,T);}else{if(S.attachEvent){S.attachEvent("on"+U,T);}}}function h(S,T){if(!S||!T){return;}if((typeof HTMLLinkElement!=="undefined")&&(S instanceof HTMLLinkElement)){T.apply(S,[{}]);return;}var U=S.attachEvent?"readystatechange":"load";g(S,U,function(){var V=S.readyState||"loaded";if(V=="loaded"||V=="interactive"||V=="complete"){T.apply(S,arguments||[]);}});}var D=I.maxLoadTime=15000;var H=I.options={};var p=I.extension=".js";var c=I.alias={};var J=I.packages={};var G=I.modules={"require":{id:"require",loaded:true,executed:true,exports:"require"},"exports":{id:"exports",loaded:true,executed:true,exports:"exports"},"module":{id:"module",loaded:true,executed:true,exports:"module"}};I.config=function(S){if(S===null){return H;}S=S||{};S.alias=S.alias||S.paths||{};n(S.alias,function(T,U){c[T]=U;});S.packages=S.packages||[];n(S.packages,function(T,U){U.name=U.name||T;J[U.name]=U;});p=p||S.extension;H=S;};function y(S){return(S=="require"||S=="exports"||S=="module");}function Q(U){if(O(U,"http://")||O(U,"https://")||O(U,"file://")){return true;}else{var S=/^\S+?:\//ig;var T=/^\S+?:\\/ig;return S.test(U)||T.test(U);}}function P(S){return O(S,"/")||O(S,"\\");}function b(V,T){if(x(V)||x(T)||Q(V)||P(V)||y(V)){return V;}V=L(V,"\\\\","/");T=L(T,"\\\\","/");T=T.split("?")[0].split("#")[0];var S=T.substring(0,T.lastIndexOf("/"));var X=V.split("#")[0].split("/");var W=V.split("#")[1];var U=S.length>0?S.split("/"):[];n(X,function(Y,Z){if(Z==".."){U.pop();}else{if(Z=="."){}else{U.push(Z);}}});return U.join("/")+(W?"#"+W:"");}function M(S,T,U){if(x(S)||x(T)){return S;}var W=S.split("!");var V=[];n(W,function(X,Y){var Z=c[Y]||Y;Z=v(Z);Z=b(Z,T);if(!U){Z=u(Z);}V.push(Z);});return V.join("!");}function u(T){if(y(T)){return T;}var S=T.substring(T.lastIndexOf("/")+1,T.length);if(!x(T)&&!x(S)&&T!==""&&!i(T,"?")&&!i(T,"#")&&S!==""&&!i(S,".")){T+=(p||".js");}return T;}function v(V){var S=V.indexOf("/");if(S<0){S=V.length;}var T=V.substr(0,S);var U=V.substr(S+1,V.length);n(J,function(W,X){if(T==X.name){T=X.location||T;U=U||X.main||"";if(T[T.length-1]=="/"){T=T.substring(0,T.lastIndexOf("/"));}if(U[0]=="/"){U=U.substring(1,U.length);}V=T+"/"+U;}});return V;}function m(U,T){T=T||location.href;U=R(U);var S=[];n(U,function(W,V){var X=M(V,T);S.push(X);});return S;}function e(T,S){T.deps=S.deps;T.factory=S.factory;T.factoryDeps=S.factoryDeps;S=null;return T;}function N(U,S){var T=G[U];if(!T){return;}T.loading=true;e(T,S);T.load(T.deps,function(){T.imports=arguments||[];f(function(){T.load(T.factoryDeps,function(){f(function(){T.execute=function(){if(T.executed||x(T.factory)){return T.exports;}var Y=T.imports;var V=[];for(var W=0;W<Y.length;W++){if(Y[W].id=="require"){V.push(T.require);}else{if(Y[W].id=="exports"){V.push(T.exports);}else{if(Y[W].id=="module"){V.push(T);}else{Y[W].execute();V.push(Y[W].exports);}}}}V.push(T.require);V.push(T.exports);V.push(T);T.imports=V;var X=T.factory.apply(T,T.imports);T.exports=X||T.exports;T.executed=true;return T.exports;};n(T.loadCallbacks,function(W,V){V(T);});if(I.onLoad){I.onLoad(T);}T.loaded=true;T.loadCallbacks=null;if(T.timer){clearTimeout(T.timer);}});});});});}function a(U,S){if(x(G[U])){G[U]=new E(U);}var T=G[U];if((T.loading||T.loaded)&&S){S(T);return T;}if(!x(T.loadCallbacks)){T.loadCallbacks.push(S);return;}T.loadCallbacks=[];T.loadCallbacks.push(S);T.element=i(U,".css")?l(U):k(U);h(T.element,function(){if(!T.loaded&&!T.loading){var V=z.shift()||{};N(U,V);}});T.timer=setTimeout(function(){console.error("加载 "+U+" 超时,可能存在无法处理的循环依赖或其它未知问题.");},D);d(T.element);}function A(X,S){if(!i(X,"!")){return a(X,S);}else{var W=X.lastIndexOf("!");var V=X.substring(0,W);var U=X.substring(W+1);var T=G[U];if(T&&T.loaded){if(S){S(T);}return T;}return A(V,function(Z){if(!Z||!Z.load){return;}var Y=function(ab){T={exports:ab,executed:true,loaded:true};if(S){S(ab);}};Y.fromText=Y;Y.error=Y;var aa=G[V];Z.load(U,aa.require,Y,I.config());});}}I.load=function(U,T,S){var X=m(U,S);var V=[];var W=0;if(X&&X.length>0){n(X,function(Y,Z){A(Z,function(){W+=1;if(W<X.length){return;}V=s(X)||V;if(T){T.apply(V,V);}});});}else{if(T){T.apply(V,V);}}return V;};I.unload=function(T,S){var U=m(T,S);n(U,function(V,X){var W=G[X];if(W){W.element.parentNode.removeChild(W.element);W.exports=null;W.loading=null;W.deps=null;W.factory=null;W.factoryDeps=null;W.element=null;W.loaded=null;W.id=null;W=null;}});};function F(T){var S=[];n(T,function(U,V){if(!V.executed&&V.execute){V.execute();}S.push(V.exports);});return S;}I.require=function(U,T,S){var W=I.load(U,function(){var X=F(arguments);if(T){T.apply(X,X);}},S);var V=F(W);return V&&V.length==1?V[0]:V;};function s(T){var S=[];n(T,function(U,X){var W=X.split("!")[1]||X||"";var V=G[W];if(V){S.push(V);}});return S;}function E(U){var T=this;var S=T.uri=T.id=U||"/";T.resovleUri=function(V,W,X){return M(V,W||S,X);};T.require=function(W,V){return I.require(W,V,U);};T.load=function(W,V){return I.load(W,V,U);};T.unrequire=function(V){return I.unload(V,U);};T.require.toUrl=T.require.resovleUri=function(V,W,X){return T.resovleUri(V,W,X);};T.require.defined=function(V){return G[V].loaded;};T.require.specified=function(V){return G[V].loaded||!x(G[V].loadCallbacks);};this.exports={};this.factory=null;this.deps=null;this.factoryDeps=null;this.loaded=false;}var z=[];function j(U,S,T){var V=null;if(S&&T){V={"id":U,"deps":S,"factory":T};}else{if(U&&S){V={"deps":U,"factory":S};}else{if(U&&T){V={"deps":S,"factory":T};}else{if(U){V={"factory":U};}}}}return V;}I.define=function(X,U,V){var T=j(X,U,V);if(T){if(typeof T.factory!="function"){var Z=T.factory;T.factory=function(){return Z;};}var S=T.factory.toString();var W=C(S);if(W&&W.length>0){T.factoryDeps=W;}var Y=q();if(Y){var aa=Y.getAttribute("src");N(aa,T);}else{z.push(T);}}};I.resovleUri=function(T,S){return M(T,S||location.href);};if(window){window.define=I.define;}var B=r();if(!x(B)&&B!==""){I.require(B);}I.define.amd=I.define.emd=I.define.eamd={};})(this.ems={});