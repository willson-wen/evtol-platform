exports.id=338,exports.ids=[338],exports.modules={44249:e=>{"use strict";/*! @license DOMPurify 3.2.3 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.3/LICENSE */let{entries:t,setPrototypeOf:n,isFrozen:r,getPrototypeOf:o,getOwnPropertyDescriptor:i}=Object,{freeze:a,seal:l,create:c}=Object,{apply:s,construct:u}="undefined"!=typeof Reflect&&Reflect;a||(a=function(e){return e}),l||(l=function(e){return e}),s||(s=function(e,t,n){return e.apply(t,n)}),u||(u=function(e,t){return new e(...t)});let m=N(Array.prototype.forEach),p=N(Array.prototype.pop),f=N(Array.prototype.push),d=N(String.prototype.toLowerCase),h=N(String.prototype.toString),g=N(String.prototype.match),y=N(String.prototype.replace),T=N(String.prototype.indexOf),E=N(String.prototype.trim),_=N(Object.prototype.hasOwnProperty),b=N(RegExp.prototype.test),A=(X=TypeError,function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return u(X,t)});function N(e){return function(t){for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return s(e,t,r)}}function S(e,t){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:d;n&&n(e,null);let i=t.length;for(;i--;){let n=t[i];if("string"==typeof n){let e=o(n);e!==n&&(r(t)||(t[i]=e),n=e)}e[n]=!0}return e}function O(e){let n=c(null);for(let[r,o]of t(e))_(e,r)&&(Array.isArray(o)?n[r]=function(e){for(let t=0;t<e.length;t++)_(e,t)||(e[t]=null);return e}(o):o&&"object"==typeof o&&o.constructor===Object?n[r]=O(o):n[r]=o);return n}function w(e,t){for(;null!==e;){let n=i(e,t);if(n){if(n.get)return N(n.get);if("function"==typeof n.value)return N(n.value)}e=o(e)}return function(){return null}}let v=a(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),R=a(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),D=a(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),L=a(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),C=a(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),k=a(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),x=a(["#text"]),M=a(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),I=a(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),P=a(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),U=a(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),z=l(/\{\{[\w\W]*|[\w\W]*\}\}/gm),H=l(/<%[\w\W]*|[\w\W]*%>/gm),F=l(/\$\{[\w\W]*}/gm),j=l(/^data-[\-\w.\u00B7-\uFFFF]+$/),W=l(/^aria-[\-\w]+$/),G=l(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),B=l(/^(?:\w+script|data):/i),Y=l(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),q=l(/^html$/i);var X,$=Object.freeze({__proto__:null,ARIA_ATTR:W,ATTR_WHITESPACE:Y,CUSTOM_ELEMENT:l(/^[a-z][.\w]*(-[.\w]+)+$/i),DATA_ATTR:j,DOCTYPE_NAME:q,ERB_EXPR:H,IS_ALLOWED_URI:G,IS_SCRIPT_OR_DATA:B,MUSTACHE_EXPR:z,TMPLIT_EXPR:F});let K={element:1,text:3,progressingInstruction:7,comment:8,document:9},V=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let n=null,r="data-tt-policy-suffix";t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Z=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};var J=function e(){let n,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,o=t=>e(t);if(o.version="3.2.3",o.removed=[],!r||!r.document||r.document.nodeType!==K.document)return o.isSupported=!1,o;let{document:i}=r,l=i,s=l.currentScript,{DocumentFragment:u,HTMLTemplateElement:N,Node:z,Element:H,NodeFilter:F,NamedNodeMap:j=r.NamedNodeMap||r.MozNamedAttrMap,HTMLFormElement:W,DOMParser:B,trustedTypes:Y}=r,X=H.prototype,J=w(X,"cloneNode"),Q=w(X,"remove"),ee=w(X,"nextSibling"),et=w(X,"childNodes"),en=w(X,"parentNode");if("function"==typeof N){let e=i.createElement("template");e.content&&e.content.ownerDocument&&(i=e.content.ownerDocument)}let er="",{implementation:eo,createNodeIterator:ei,createDocumentFragment:ea,getElementsByTagName:el}=i,{importNode:ec}=l,es=Z();o.isSupported="function"==typeof t&&"function"==typeof en&&eo&&void 0!==eo.createHTMLDocument;let{MUSTACHE_EXPR:eu,ERB_EXPR:em,TMPLIT_EXPR:ep,DATA_ATTR:ef,ARIA_ATTR:ed,IS_SCRIPT_OR_DATA:eh,ATTR_WHITESPACE:eg,CUSTOM_ELEMENT:ey}=$,{IS_ALLOWED_URI:eT}=$,eE=null,e_=S({},[...v,...R,...D,...C,...x]),eb=null,eA=S({},[...M,...I,...P,...U]),eN=Object.seal(c(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),eS=null,eO=null,ew=!0,ev=!0,eR=!1,eD=!0,eL=!1,eC=!0,ek=!1,ex=!1,eM=!1,eI=!1,eP=!1,eU=!1,ez=!0,eH=!1,eF=!0,ej=!1,eW={},eG=null,eB=S({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),eY=null,eq=S({},["audio","video","img","source","image","track"]),eX=null,e$=S({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),eK="http://www.w3.org/1998/Math/MathML",eV="http://www.w3.org/2000/svg",eZ="http://www.w3.org/1999/xhtml",eJ=eZ,eQ=!1,e0=null,e1=S({},[eK,eV,eZ],h),e2=S({},["mi","mo","mn","ms","mtext"]),e3=S({},["annotation-xml"]),e9=S({},["title","style","font","a","script"]),e8=null,e4=["application/xhtml+xml","text/html"],e7=null,e5=null,e6=i.createElement("form"),te=function(e){return e instanceof RegExp||e instanceof Function},tt=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!e5||e5!==e){if(e&&"object"==typeof e||(e={}),e=O(e),e7="application/xhtml+xml"===(e8=-1===e4.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE)?h:d,eE=_(e,"ALLOWED_TAGS")?S({},e.ALLOWED_TAGS,e7):e_,eb=_(e,"ALLOWED_ATTR")?S({},e.ALLOWED_ATTR,e7):eA,e0=_(e,"ALLOWED_NAMESPACES")?S({},e.ALLOWED_NAMESPACES,h):e1,eX=_(e,"ADD_URI_SAFE_ATTR")?S(O(e$),e.ADD_URI_SAFE_ATTR,e7):e$,eY=_(e,"ADD_DATA_URI_TAGS")?S(O(eq),e.ADD_DATA_URI_TAGS,e7):eq,eG=_(e,"FORBID_CONTENTS")?S({},e.FORBID_CONTENTS,e7):eB,eS=_(e,"FORBID_TAGS")?S({},e.FORBID_TAGS,e7):{},eO=_(e,"FORBID_ATTR")?S({},e.FORBID_ATTR,e7):{},eW=!!_(e,"USE_PROFILES")&&e.USE_PROFILES,ew=!1!==e.ALLOW_ARIA_ATTR,ev=!1!==e.ALLOW_DATA_ATTR,eR=e.ALLOW_UNKNOWN_PROTOCOLS||!1,eD=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,eL=e.SAFE_FOR_TEMPLATES||!1,eC=!1!==e.SAFE_FOR_XML,ek=e.WHOLE_DOCUMENT||!1,eI=e.RETURN_DOM||!1,eP=e.RETURN_DOM_FRAGMENT||!1,eU=e.RETURN_TRUSTED_TYPE||!1,eM=e.FORCE_BODY||!1,ez=!1!==e.SANITIZE_DOM,eH=e.SANITIZE_NAMED_PROPS||!1,eF=!1!==e.KEEP_CONTENT,ej=e.IN_PLACE||!1,eT=e.ALLOWED_URI_REGEXP||G,eJ=e.NAMESPACE||eZ,e2=e.MATHML_TEXT_INTEGRATION_POINTS||e2,e3=e.HTML_INTEGRATION_POINTS||e3,eN=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&te(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(eN.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&te(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(eN.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(eN.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),eL&&(ev=!1),eP&&(eI=!0),eW&&(eE=S({},x),eb=[],!0===eW.html&&(S(eE,v),S(eb,M)),!0===eW.svg&&(S(eE,R),S(eb,I),S(eb,U)),!0===eW.svgFilters&&(S(eE,D),S(eb,I),S(eb,U)),!0===eW.mathMl&&(S(eE,C),S(eb,P),S(eb,U))),e.ADD_TAGS&&(eE===e_&&(eE=O(eE)),S(eE,e.ADD_TAGS,e7)),e.ADD_ATTR&&(eb===eA&&(eb=O(eb)),S(eb,e.ADD_ATTR,e7)),e.ADD_URI_SAFE_ATTR&&S(eX,e.ADD_URI_SAFE_ATTR,e7),e.FORBID_CONTENTS&&(eG===eB&&(eG=O(eG)),S(eG,e.FORBID_CONTENTS,e7)),eF&&(eE["#text"]=!0),ek&&S(eE,["html","head","body"]),eE.table&&(S(eE,["tbody"]),delete eS.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw A('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw A('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');er=(n=e.TRUSTED_TYPES_POLICY).createHTML("")}else void 0===n&&(n=V(Y,s)),null!==n&&"string"==typeof er&&(er=n.createHTML(""));a&&a(e),e5=e}},tn=S({},[...R,...D,...L]),tr=S({},[...C,...k]),to=function(e){let t=en(e);t&&t.tagName||(t={namespaceURI:eJ,tagName:"template"});let n=d(e.tagName),r=d(t.tagName);return!!e0[e.namespaceURI]&&(e.namespaceURI===eV?t.namespaceURI===eZ?"svg"===n:t.namespaceURI===eK?"svg"===n&&("annotation-xml"===r||e2[r]):!!tn[n]:e.namespaceURI===eK?t.namespaceURI===eZ?"math"===n:t.namespaceURI===eV?"math"===n&&e3[r]:!!tr[n]:e.namespaceURI===eZ?(t.namespaceURI!==eV||!!e3[r])&&(t.namespaceURI!==eK||!!e2[r])&&!tr[n]&&(e9[n]||!tn[n]):"application/xhtml+xml"===e8&&!!e0[e.namespaceURI])},ti=function(e){f(o.removed,{element:e});try{en(e).removeChild(e)}catch(t){Q(e)}},ta=function(e,t){try{f(o.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){f(o.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e){if(eI||eP)try{ti(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}}},tl=function(e){let t=null,r=null;if(eM)e="<remove></remove>"+e;else{let t=g(e,/^[\r\n\t ]+/);r=t&&t[0]}"application/xhtml+xml"===e8&&eJ===eZ&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");let o=n?n.createHTML(e):e;if(eJ===eZ)try{t=new B().parseFromString(o,e8)}catch(e){}if(!t||!t.documentElement){t=eo.createDocument(eJ,"template",null);try{t.documentElement.innerHTML=eQ?er:o}catch(e){}}let a=t.body||t.documentElement;return(e&&r&&a.insertBefore(i.createTextNode(r),a.childNodes[0]||null),eJ===eZ)?el.call(t,ek?"html":"body")[0]:ek?t.documentElement:a},tc=function(e){return ei.call(e.ownerDocument||e,e,F.SHOW_ELEMENT|F.SHOW_COMMENT|F.SHOW_TEXT|F.SHOW_PROCESSING_INSTRUCTION|F.SHOW_CDATA_SECTION,null)},ts=function(e){return e instanceof W&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||!(e.attributes instanceof j)||"function"!=typeof e.removeAttribute||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes)},tu=function(e){return"function"==typeof z&&e instanceof z};function tm(e,t,n){m(e,e=>{e.call(o,t,n,e5)})}let tp=function(e){let t=null;if(tm(es.beforeSanitizeElements,e,null),ts(e))return ti(e),!0;let n=e7(e.nodeName);if(tm(es.uponSanitizeElement,e,{tagName:n,allowedTags:eE}),e.hasChildNodes()&&!tu(e.firstElementChild)&&b(/<[/\w]/g,e.innerHTML)&&b(/<[/\w]/g,e.textContent)||e.nodeType===K.progressingInstruction||eC&&e.nodeType===K.comment&&b(/<[/\w]/g,e.data))return ti(e),!0;if(!eE[n]||eS[n]){if(!eS[n]&&td(n)&&(eN.tagNameCheck instanceof RegExp&&b(eN.tagNameCheck,n)||eN.tagNameCheck instanceof Function&&eN.tagNameCheck(n)))return!1;if(eF&&!eG[n]){let t=en(e)||e.parentNode,n=et(e)||e.childNodes;if(n&&t){let r=n.length;for(let o=r-1;o>=0;--o){let r=J(n[o],!0);r.__removalCount=(e.__removalCount||0)+1,t.insertBefore(r,ee(e))}}}return ti(e),!0}return e instanceof H&&!to(e)||("noscript"===n||"noembed"===n||"noframes"===n)&&b(/<\/no(script|embed|frames)/i,e.innerHTML)?(ti(e),!0):(eL&&e.nodeType===K.text&&(t=e.textContent,m([eu,em,ep],e=>{t=y(t,e," ")}),e.textContent!==t&&(f(o.removed,{element:e.cloneNode()}),e.textContent=t)),tm(es.afterSanitizeElements,e,null),!1)},tf=function(e,t,n){if(ez&&("id"===t||"name"===t)&&(n in i||n in e6))return!1;if(ev&&!eO[t]&&b(ef,t));else if(ew&&b(ed,t));else if(!eb[t]||eO[t]){if(!(td(e)&&(eN.tagNameCheck instanceof RegExp&&b(eN.tagNameCheck,e)||eN.tagNameCheck instanceof Function&&eN.tagNameCheck(e))&&(eN.attributeNameCheck instanceof RegExp&&b(eN.attributeNameCheck,t)||eN.attributeNameCheck instanceof Function&&eN.attributeNameCheck(t))||"is"===t&&eN.allowCustomizedBuiltInElements&&(eN.tagNameCheck instanceof RegExp&&b(eN.tagNameCheck,n)||eN.tagNameCheck instanceof Function&&eN.tagNameCheck(n))))return!1}else if(eX[t]);else if(b(eT,y(n,eg,"")));else if(("src"===t||"xlink:href"===t||"href"===t)&&"script"!==e&&0===T(n,"data:")&&eY[e]);else if(eR&&!b(eh,y(n,eg,"")));else if(n)return!1;return!0},td=function(e){return"annotation-xml"!==e&&g(e,ey)},th=function(e){tm(es.beforeSanitizeAttributes,e,null);let{attributes:t}=e;if(!t||ts(e))return;let r={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:eb,forceKeepAttr:void 0},i=t.length;for(;i--;){let{name:a,namespaceURI:l,value:c}=t[i],s=e7(a),u="value"===a?c:E(c);if(r.attrName=s,r.attrValue=u,r.keepAttr=!0,r.forceKeepAttr=void 0,tm(es.uponSanitizeAttribute,e,r),u=r.attrValue,eH&&("id"===s||"name"===s)&&(ta(a,e),u="user-content-"+u),eC&&b(/((--!?|])>)|<\/(style|title)/i,u)){ta(a,e);continue}if(r.forceKeepAttr||(ta(a,e),!r.keepAttr))continue;if(!eD&&b(/\/>/i,u)){ta(a,e);continue}eL&&m([eu,em,ep],e=>{u=y(u,e," ")});let f=e7(e.nodeName);if(tf(f,s,u)){if(n&&"object"==typeof Y&&"function"==typeof Y.getAttributeType){if(l);else switch(Y.getAttributeType(f,s)){case"TrustedHTML":u=n.createHTML(u);break;case"TrustedScriptURL":u=n.createScriptURL(u)}}try{l?e.setAttributeNS(l,a,u):e.setAttribute(a,u),ts(e)?ti(e):p(o.removed)}catch(e){}}}tm(es.afterSanitizeAttributes,e,null)},tg=function e(t){let n=null,r=tc(t);for(tm(es.beforeSanitizeShadowDOM,t,null);n=r.nextNode();)tm(es.uponSanitizeShadowNode,n,null),tp(n),th(n),n.content instanceof u&&e(n.content);tm(es.afterSanitizeShadowDOM,t,null)};return o.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=null,i=null,a=null,c=null;if((eQ=!e)&&(e="<!-->"),"string"!=typeof e&&!tu(e)){if("function"==typeof e.toString){if("string"!=typeof(e=e.toString()))throw A("dirty is not a string, aborting")}else throw A("toString is not a function")}if(!o.isSupported)return e;if(ex||tt(t),o.removed=[],"string"==typeof e&&(ej=!1),ej){if(e.nodeName){let t=e7(e.nodeName);if(!eE[t]||eS[t])throw A("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof z)(i=(r=tl("<!---->")).ownerDocument.importNode(e,!0)).nodeType===K.element&&"BODY"===i.nodeName?r=i:"HTML"===i.nodeName?r=i:r.appendChild(i);else{if(!eI&&!eL&&!ek&&-1===e.indexOf("<"))return n&&eU?n.createHTML(e):e;if(!(r=tl(e)))return eI?null:eU?er:""}r&&eM&&ti(r.firstChild);let s=tc(ej?e:r);for(;a=s.nextNode();)tp(a),th(a),a.content instanceof u&&tg(a.content);if(ej)return e;if(eI){if(eP)for(c=ea.call(r.ownerDocument);r.firstChild;)c.appendChild(r.firstChild);else c=r;return(eb.shadowroot||eb.shadowrootmode)&&(c=ec.call(l,c,!0)),c}let p=ek?r.outerHTML:r.innerHTML;return ek&&eE["!doctype"]&&r.ownerDocument&&r.ownerDocument.doctype&&r.ownerDocument.doctype.name&&b(q,r.ownerDocument.doctype.name)&&(p="<!DOCTYPE "+r.ownerDocument.doctype.name+">\n"+p),eL&&m([eu,em,ep],e=>{p=y(p,e," ")}),n&&eU?n.createHTML(p):p},o.setConfig=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};tt(e),ex=!0},o.clearConfig=function(){e5=null,ex=!1},o.isValidAttribute=function(e,t,n){return e5||tt({}),tf(e7(e),e7(t),n)},o.addHook=function(e,t){"function"==typeof t&&f(es[e],t)},o.removeHook=function(e){return p(es[e])},o.removeHooks=function(e){es[e]=[]},o.removeAllHooks=function(){es=Z()},o}();e.exports=J},87709:(e,t,n)=>{function r(e){return e&&e.default||e}e.exports=global.DOMPurify=global.DOMPurify||function(){let e=r(n(44249)),{JSDOM:t}=r(n(98860)),{window:o}=new t("<!DOCTYPE html>");return e(o)}()},77381:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0})},81355:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={};Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i.default}});var o=n(77381);Object.keys(o).forEach(function(e){!("default"===e||"__esModule"===e||Object.prototype.hasOwnProperty.call(r,e))&&(e in t&&t[e]===o[e]||Object.defineProperty(t,e,{enumerable:!0,get:function(){return o[e]}}))});var i=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=a(t);if(n&&n.has(e))return n.get(e);var r={__proto__:null},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if("default"!==i&&({}).hasOwnProperty.call(e,i)){var l=o?Object.getOwnPropertyDescriptor(e,i):null;l&&(l.get||l.set)?Object.defineProperty(r,i,l):r[i]=e[i]}return r.default=e,n&&n.set(e,r),r}(n(49605));function a(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(a=function(e){return e?n:t})(e)}Object.keys(i).forEach(function(e){!("default"===e||"__esModule"===e||Object.prototype.hasOwnProperty.call(r,e))&&(e in t&&t[e]===i[e]||Object.defineProperty(t,e,{enumerable:!0,get:function(){return i[e]}}))})}};