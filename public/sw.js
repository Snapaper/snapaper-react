if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return a[e]||(c=new Promise(async c=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=c}else importScripts(e),c()})),c.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},c=(c,a)=>{Promise.all(c.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(c)};self.define=(c,s,t)=>{a[c]||(a[c]=Promise.resolve().then(()=>{let a={};const i={uri:location.origin+c.slice(1)};return Promise.all(s.map(c=>{switch(c){case"exports":return a;case"module":return i;default:return e(c)}})).then(e=>{const c=t(...e);return a.default||(a.default=c),a})}))}}define("./sw.js",["./workbox-e032be30"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/",revision:"iRWxDS91nvHcpHHjNCmjQ"},{url:"/_next/static/chunks/11.be48dd3767ef640495e5.js",revision:"312fff741984181dc0b6bade144f6935"},{url:"/_next/static/chunks/14.eb6034a5120d76280d8a.js",revision:"0763a8ce4ab7c6c2da5e7a88be661108"},{url:"/_next/static/chunks/15.94eee56e7c962a742ec1.js",revision:"85c310999f79afde42e5cfe81994025b"},{url:"/_next/static/chunks/16.f1a3c56b0c87fddae43e.js",revision:"ccf1ee0f5b3a653f3127b211105e0177"},{url:"/_next/static/chunks/19942d3640834379ec21ba2f546eb7266b97e6b5.272c630f0bd91c38fc6e.js",revision:"23aa558f743f0c057bc33e3c4a4e969d"},{url:"/_next/static/chunks/1d9b5ae8.a1dbc430024a15e3cbd0.js",revision:"e78abc54a602b0deac2a4380c0727895"},{url:"/_next/static/chunks/2251d382690da4329504028b34f5000af20b59e1.df037ea37ba4038da829.js",revision:"ac504bd5b826ef6b7b7e3bd378ded561"},{url:"/_next/static/chunks/31.42c9d30ca89c3268b7e6.js",revision:"89723f81486e5c918e7b8ad4e4ec637a"},{url:"/_next/static/chunks/31.42c9d30ca89c3268b7e6.js.LICENSE.txt",revision:"6fce53c7c7713ebf61712cc2929746fa"},{url:"/_next/static/chunks/32.bf31eb2567787b6d2c49.js",revision:"f782b96fe7dfc626f969da951e261a26"},{url:"/_next/static/chunks/33da0ac472a7f400f83245cc7f64e2656fe24a8a.2607b4bc0e7da8f18595.js",revision:"6bef341dc7933dab3772a2109893c698"},{url:"/_next/static/chunks/33da0ac472a7f400f83245cc7f64e2656fe24a8a.2607b4bc0e7da8f18595.js.LICENSE.txt",revision:"6fce53c7c7713ebf61712cc2929746fa"},{url:"/_next/static/chunks/3ab3480aa84cae6811a256ab047a6158436877c9.2d3df769bb39fe88728c.js",revision:"1587351edb5583eb6961d39aefa7b3f3"},{url:"/_next/static/chunks/453719f2b98d45cd6fd253175d777d0987fda5f4.b351154c1f0e058dbddb.js",revision:"1ee68abcda24800c4ef0cc946d8eb341"},{url:"/_next/static/chunks/7ff9051987ff9e5b113ef5ba0a7576fb758e6a31.de6cb2b47acc3b965247.js",revision:"f6f937f69a1d1150b0d618723ad703c0"},{url:"/_next/static/chunks/b637e9a5.8e79838c8fcb946923f4.js",revision:"e24cddae5992ec608945b1ad86d48463"},{url:"/_next/static/chunks/b637e9a5.8e79838c8fcb946923f4.js.LICENSE.txt",revision:"deef0876956c2466c93416a2df26087b"},{url:"/_next/static/chunks/ba20aaccc3813573c34bd73e128c5ec2edef9cc3.4d762990fb97dce52cf4.js",revision:"f26469cadd6c99a627d356b90bda81c7"},{url:"/_next/static/chunks/ba20aaccc3813573c34bd73e128c5ec2edef9cc3.4d762990fb97dce52cf4.js.LICENSE.txt",revision:"a16bc6da978d0d0e93239b2ef9f7d540"},{url:"/_next/static/chunks/commons.64cf55e25048cb38ae99.js",revision:"c1038343b4fa994703a4e0278f064dad"},{url:"/_next/static/chunks/commons.64cf55e25048cb38ae99.js.LICENSE.txt",revision:"81896c98bac7b5b16ab1d3790da5b937"},{url:"/_next/static/chunks/dbbc512c518223fafe484e675061fa4213a09e89.4fbe2da32b7173ae2b8c.js",revision:"c9d3f5ad8ccc2a0a9d56ccb1d8c43364"},{url:"/_next/static/chunks/df13fb45e1d6fa37e8c4f5fd4e785ff3259de495.fa4ce75d0bd5d54c0b18.js",revision:"437a602eb57c989f230f966baded17b9"},{url:"/_next/static/chunks/framework.be2f8eec1d0bd8e51815.js",revision:"ca3168102642af2b486acf947db5b052"},{url:"/_next/static/chunks/framework.be2f8eec1d0bd8e51815.js.LICENSE.txt",revision:"b8dc26024c8a5849f6ea9608ff1264e4"},{url:"/_next/static/css/2974e16af9d56cfc875d.css",revision:"3a5f8bc3818fcf7db32840fd7a48832a"},{url:"/_next/static/css/5f97ff5dd74cedee031c.css",revision:"a4fddff81b5fe6d75f955839bb577080"},{url:"/_next/static/iRWxDS91nvHcpHHjNCmjQ/_buildManifest.js",revision:"2dbe9a41f60aa1534b85f62083691d54"},{url:"/_next/static/iRWxDS91nvHcpHHjNCmjQ/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/iRWxDS91nvHcpHHjNCmjQ/pages/404.js",revision:"f64ceda09a1a0ff85902cfb7e67252bc"},{url:"/_next/static/iRWxDS91nvHcpHHjNCmjQ/pages/_app.js",revision:"37fbf741f61d93bdb19d04fb8ef8bdc5"},{url:"/_next/static/iRWxDS91nvHcpHHjNCmjQ/pages/_app.js.LICENSE.txt",revision:"bcda1cd32249233358d1702647c75e56"},{url:"/_next/static/iRWxDS91nvHcpHHjNCmjQ/pages/_error.js",revision:"091957115a9c923aab97803a4f602b68"},{url:"/_next/static/iRWxDS91nvHcpHHjNCmjQ/pages/cate/alevels.js",revision:"63784f254c909bcef7dbc1b481f83779"},{url:"/_next/static/iRWxDS91nvHcpHHjNCmjQ/pages/cate/igcse.js",revision:"495565c5e38e973c7c0116ccdefccda8"},{url:"/_next/static/iRWxDS91nvHcpHHjNCmjQ/pages/index.js",revision:"e9d5bebbb956276c82989e3994977aad"},{url:"/_next/static/iRWxDS91nvHcpHHjNCmjQ/pages/page/about.js",revision:"8569a9b1691652a28cac6c21a78335a9"},{url:"/_next/static/iRWxDS91nvHcpHHjNCmjQ/pages/paper/alevels/[subject].js",revision:"d2a8a34ffe395fd0ec9de3d45a289dd5"},{url:"/_next/static/iRWxDS91nvHcpHHjNCmjQ/pages/paper/igcse/[subject].js",revision:"f7384fcbdb0cb32ad26159caaee5c0e9"},{url:"/_next/static/iRWxDS91nvHcpHHjNCmjQ/pages/topic/ebooks.js",revision:"d58a6ed40be614cbef6f3e454c6114f9"},{url:"/_next/static/iRWxDS91nvHcpHHjNCmjQ/pages/topic/savemyexams.js",revision:"058038c2e88a30f94c6eb66da8ba4bbf"},{url:"/_next/static/runtime/main-6f6f407606c34f6ff1ab.js",revision:"0e0081bd549ee695d804408ad5d131d9"},{url:"/_next/static/runtime/polyfills-fc97da05b62aae7630a3.js",revision:"f3493691429f3a809a9aa8035c99f518"},{url:"/_next/static/runtime/webpack-449ded5713989c014875.js",revision:"c516d91f929db66603964bdf79e9fbbc"},{url:"/manifest.json",revision:"688128be216cc2f753fe641590f2fcd3"},{url:"/robots.txt",revision:"cb333937db4fdf75f29294867cd772cf"},{url:"/snapaper_logo.ico",revision:"b9f0ea4d75106cc9cfa7b5784cc402ce"},{url:"/snapaper_logo_192.png",revision:"450273fe6bacab84df97f96c1b96415a"},{url:"/snapaper_logo_512.png",revision:"0c2d07dfd53ed76aefb5d2a7120f31ca"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/use\.fontawesome\.com\/releases\/.*/i,new e.CacheFirst({cacheName:"font-awesome",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.StaleWhileRevalidate({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.StaleWhileRevalidate({cacheName:"others",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
