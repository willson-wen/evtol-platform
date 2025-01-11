(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[797],{1447:function(e,t,r){Promise.resolve().then(r.bind(r,6244))},6244:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return i}});var a=r(7437),s=r(2265),n=r(4033),l=r(1396),c=r.n(l);function o(){let e=(0,n.useRouter)(),[t,r]=(0,s.useState)("");return(0,a.jsx)("form",{onSubmit:r=>{r.preventDefault(),t.trim()&&e.push("/search?q=".concat(encodeURIComponent(t)))},className:"w-full max-w-2xl",children:(0,a.jsxs)("div",{className:"relative flex items-center",children:[(0,a.jsx)("input",{type:"text",value:t,onChange:e=>r(e.target.value),placeholder:"搜索eVTOL公司、产品或认证信息...",className:"w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-blue-400"}),(0,a.jsx)("button",{type:"submit",className:"absolute right-2 p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400",children:(0,a.jsx)("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})})]})})}function i(){let e=(0,n.useSearchParams)().get("q"),[t,r]=(0,s.useState)([]),[l,i]=(0,s.useState)(!1),[d,u]=(0,s.useState)("");return(0,s.useEffect)(()=>{(async()=>{if(e){i(!0),u("");try{let t=await fetch("/api/search?q=".concat(encodeURIComponent(e)));if(!t.ok)throw Error("搜索失败");let a=await t.json();r(a)}catch(e){u(e.message)}finally{i(!1)}}})()},[e]),(0,a.jsx)("main",{className:"min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8",children:(0,a.jsxs)("div",{className:"max-w-7xl mx-auto",children:[(0,a.jsx)("div",{className:"flex justify-center mb-8",children:(0,a.jsx)(o,{})}),l?(0,a.jsx)("div",{className:"text-center text-gray-600 dark:text-gray-400",children:"搜索中..."}):d?(0,a.jsx)("div",{className:"text-center text-red-600 dark:text-red-400",children:d}):0===t.length?(0,a.jsx)("div",{className:"text-center text-gray-600 dark:text-gray-400",children:e?"未找到相关结果":"请输入搜索关键词"}):(0,a.jsx)("div",{className:"grid gap-6 md:grid-cols-2 lg:grid-cols-3",children:t.map(e=>(0,a.jsxs)(c(),{href:"/company/".concat(e._id),className:"block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow",children:[(0,a.jsx)("h3",{className:"text-xl font-semibold text-gray-900 dark:text-white mb-2",children:e.name}),(0,a.jsx)("p",{className:"text-gray-600 dark:text-gray-300 mb-4 line-clamp-2",children:e.description}),(0,a.jsxs)("div",{className:"flex justify-between items-center text-sm",children:[(0,a.jsx)("span",{className:"text-gray-500 dark:text-gray-400",children:e.location}),(0,a.jsx)("span",{className:"px-3 py-1 rounded-full text-white bg-blue-600",children:e.status})]})]},e._id))})]})})}},622:function(e,t,r){"use strict";var a=r(2265),s=Symbol.for("react.element"),n=Symbol.for("react.fragment"),l=Object.prototype.hasOwnProperty,c=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function i(e,t,r){var a,n={},i=null,d=null;for(a in void 0!==r&&(i=""+r),void 0!==t.key&&(i=""+t.key),void 0!==t.ref&&(d=t.ref),t)l.call(t,a)&&!o.hasOwnProperty(a)&&(n[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps)void 0===n[a]&&(n[a]=t[a]);return{$$typeof:s,type:e,key:i,ref:d,props:n,_owner:c.current}}t.Fragment=n,t.jsx=i,t.jsxs=i},7437:function(e,t,r){"use strict";e.exports=r(622)},1396:function(e,t,r){e.exports=r(5250)},4033:function(e,t,r){e.exports=r(5313)}},function(e){e.O(0,[250,971,938,744],function(){return e(e.s=1447)}),_N_E=e.O()}]);