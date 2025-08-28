if (!self.define) {
	const e = (e) => {
			"require" !== e && (e += ".js")
			let s = Promise.resolve()
			return (
				a[e] ||
					(s = new Promise(async (s) => {
						if ("document" in self) {
							const a = document.createElement("script")
							;((a.src = e), document.head.appendChild(a), (a.onload = s))
						} else (importScripts(e), s())
					})),
				s.then(() => {
					if (!a[e]) throw new Error(`Module ${e} didn’t register its module`)
					return a[e]
				})
			)
		},
		s = (s, a) => {
			Promise.all(s.map(e)).then((e) => a(1 === e.length ? e[0] : e))
		},
		a = { require: Promise.resolve(s) }
	self.define = (s, c, r) => {
		a[s] ||
			(a[s] = Promise.resolve().then(() => {
				let a = {}
				const t = { uri: location.origin + s.slice(1) }
				return Promise.all(
					c.map((s) => {
						switch (s) {
							case "exports":
								return a
							case "module":
								return t
							default:
								return e(s)
						}
					})
				).then((e) => {
					const s = r(...e)
					return (a.default || (a.default = s), a)
				})
			}))
	}
}
define("./sw.js", ["./workbox-1eab381b"], function (e) {
	"use strict"
	;(importScripts(),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{
					url: "/_next/static/2Yry-UH3X6Jzfoe4ku87H/_buildManifest.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/2Yry-UH3X6Jzfoe4ku87H/_ssgManifest.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/11.a6363261e3819ced8cf3.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/14.8f6195c2a44ea32ac360.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/15.74370b4aadb0641c4c44.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/16.63123d8fa1fceb2ec1ba.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/2a3e31044b6d3197c6e6b5eed8c1e657257f51e0.0a4e3a092e4debf27206.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/33.8c2f95de43945d304b75.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/34.d377fa2e214b11835aa6.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/35.ae2c1eeec2f94bb50c66.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/46408940fe09778cbd9087e3993d3c39b58b577e.36d3f8f1c69b0dcf60b6.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/54e3b5a1c2e8a17dcf37249850c6a5e7a4ba623c.50f6a301be86dcd47aa9.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/5db8ac9014e007303e66936dc2fac6cf4a8387a7.6d3c35a58a85649c0979.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/5eec9076b7122a47bb63baa280245b3614395d2a.e7702cd5a926690c3d38.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/64eabceb4a8223e09df23436e02268a2e445890f.347840e3676821cbbe97.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/6c342a35.093638bde8598decefe4.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/b0b83dec77a286c83f66d8a24b0e559e6fccc842.ba1d3b8f66ea8fa32c73.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/b637e9a5.2f67a461990272ca3ce6.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/commons.f4d5a04401c01ea20205.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/ef9e01208811b920fb9167cb293fb1592cc1176c.aa7bab2e81ad2e3cdb51.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/f95a26d339f2b9286effe1e77b2b44cfa65f3752.e6bdd86f98453737fd92.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/framework.36e5d30ecc6dc4b81c51.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/main-e1228502faa397376029.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/pages/404-f7259eb189d09bcc6194.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/pages/_app-7ca23adc0cc14436ea11.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/pages/_error-eb75ccf1f4f71eb712c7.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/pages/cate/alevels-4661752a37536d479d96.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/pages/cate/igcse-4b86853244dc89a76828.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/pages/index-a69be492aa3303a22f18.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/pages/page/about-d8a7c1bca0d7c10e2194.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/pages/paper/alevels/com/%5Byear%5D/%5Bsubject%5D-7628b20c3aa1a6753eff.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/pages/paper/alevels/xyz/%5Bsubject%5D-2dac0faa87eb182bb64a.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/pages/paper/igcse/com/%5Byear%5D/%5Bsubject%5D-6cabefeb490df9a51d5c.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/pages/paper/igcse/xyz/%5Bsubject%5D-4a4aeb41acb550b1c026.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/pages/topic/ebooks-77c0da9d6d902b3e1fb0.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/pages/topic/savemyexams-ed76df9abfe8e29cec7e.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/polyfills-06fdb0ed61579ab066e5.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/chunks/webpack-9184f4a4c6b5f51eb912.js",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/css/92b0be21226cac4604e5.css",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{
					url: "/_next/static/css/e05138eddc8e6c4fb980.css",
					revision: "2Yry-UH3X6Jzfoe4ku87H",
				},
				{ url: "/manifest.json", revision: "ecc7782367ae554bfbe3af927f4495f5" },
				{ url: "/robots.txt", revision: "fa1ded1ed7c11438a9b0385b1e112850" },
				{
					url: "/snapaper_logo.ico",
					revision: "a31c56473b186db3586430066edf65a9",
				},
				{
					url: "/snapaper_logo_192.png",
					revision: "17edbd161f991c842f991f654cdaed29",
				},
				{
					url: "/snapaper_logo_512.png",
					revision: "fdcdce4b78d4f84db32b527a86dba43e",
				},
			],
			{ ignoreURLParametersMatching: [] }
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute(
			"/",
			new e.NetworkFirst({
				cacheName: "start-url",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 1,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
			new e.CacheFirst({
				cacheName: "google-fonts",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 4,
						maxAgeSeconds: 31536e3,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-font-assets",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 4,
						maxAgeSeconds: 604800,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-image-assets",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 64,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:js)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-js-assets",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:css|less)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-style-assets",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new e.NetworkFirst({
				cacheName: "static-data-assets",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\/api\/.*$/i,
			new e.NetworkFirst({
				cacheName: "apis",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 16,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/.*/i,
			new e.NetworkFirst({
				cacheName: "others",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0,
					}),
				],
			}),
			"GET"
		))
})
