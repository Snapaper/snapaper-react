import Head from "next/head";
// import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

// 全局样式引入
import "../styles/global.scss";

// AntD 样式引入
import "antd/dist/antd.css";

// Nprogress 进度条引入与配置
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({
	easing: "ease-in-out",
	speed: 500,
	showSpinner: false,
	trickleSpeed: 200,
	minimum: 0.2,
});

// React Router 引入以配置加载进度条
import Router from "next/router";

//引入顶部组件
import Header from "../components/header";

// React Router 配置加载进度条
Router.onRouteChangeStart = () => {
	NProgress.inc();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
	const siteUrl = "https://snapaper.com";
	const siteName = "Snapaper";
	const defaultTitle = "Snapaper | CAIE Past Papers and Study Resources";
	const defaultDescription =
		"Discover Snapaper, the ultimate tool for CAIE students worldwide to effortlessly access past papers, mock exams, and study resources for IGCSE and A-Level.";
        const defaultImage = "https://snapaper.com/api/og";

	return (
		<>
			<Head>
				{/* Essential Meta Tags */}
				<meta charSet='utf-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='language' content='English' />
				<meta name='robots' content='index, follow' />
				<meta
					name='googlebot'
					content='index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1'
				/>

				{/* Viewport and Mobile Optimization */}
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no, viewport-fit=cover'
				/>
				<meta name='theme-color' content='#1890ff' />
				<meta name='mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='default' />

				{/* Favicon and Icons */}
				<link rel='icon' href='/snapaper_logo.ico' />
				<link
					rel='shortcut icon'
					href='/snapaper_logo.ico'
					type='image/x-icon'
				/>
				<link rel='apple-touch-icon' href='/snapaper_logo_512.png' />

				{/* Performance Optimization */}
				<link rel='preconnect' href='https://static.ouorz.com' />
				<link rel='dns-prefetch' href='https://static.ouorz.com' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>

				{/* SEO Meta Tags */}
				<meta
					name='keywords'
					content='CAIE Past Papers, Past papers, Mock exams, Past exam papers, CIE past papers, IGCSE past papers, ALevel past papers, CAIE study resources, CAIE pdf textbooks, Save my exams, Cambridge International, exam preparation, study materials, A-Level, IGCSE, CAIE'
				/>
				<meta name='description' content={defaultDescription} />
                                <meta name='author' content='Tony (Lipeng) He' />
                                <link rel='canonical' href={siteUrl} />
                                <title>{defaultTitle}</title>

				{/* Open Graph / Facebook */}
				<meta property='og:type' content='website' />
				<meta property='og:url' content={siteUrl} />
				<meta property='og:title' content={defaultTitle} />
				<meta property='og:description' content={defaultDescription} />
				<meta property='og:image' content={defaultImage} />
				<meta property='og:image:width' content='1200' />
				<meta property='og:image:height' content='630' />
				<meta
					property='og:image:alt'
					content='Snapaper - CAIE Past Papers Platform'
				/>
				<meta property='og:site_name' content={siteName} />
				<meta property='og:locale' content='en_US' />

				{/* Twitter */}
				<meta property='twitter:card' content='summary_large_image' />
				<meta property='twitter:url' content={siteUrl} />
				<meta property='twitter:title' content={defaultTitle} />
				<meta property='twitter:description' content={defaultDescription} />
				<meta property='twitter:image' content={defaultImage} />
				<meta
					property='twitter:image:alt'
					content='Snapaper - CAIE Past Papers Platform'
				/>

				{/* Additional Meta Tags */}
				<meta name='format-detection' content='telephone=no' />
				<meta name='referrer' content='origin-when-cross-origin' />

				{/* Chinese Search Engines Optimization */}
				<meta name='renderer' content='webkit' />
				<meta name='force-rendering' content='webkit' />
				<meta name='applicable-device' content='pc,mobile' />
				<meta httpEquiv='Cache-Control' content='no-siteapp' />
				<meta property='og:locale:alternate' content='zh_CN' />

				{/* Structured Data - JSON-LD */}
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "EducationalOrganization",
							name: siteName,
							url: siteUrl,
							logo: defaultImage,
							description: defaultDescription,
							sameAs: ["https://status.snapaper.com"],
							serviceType: "Educational Resources",
							areaServed: "Worldwide",
							audience: {
								"@type": "EducationalAudience",
								educationalRole: "student",
							},
						}),
					}}
				/>
			</Head>
			<Header />
			<Component {...pageProps} />
                        <SpeedInsights />
                </>
        );
}

export default MyApp;
