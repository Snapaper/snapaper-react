import Head from "next/head";

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

// Vercel Analytics 配置
import { Analytics } from "@vercel/analytics/react";

//动态引入顶部组件
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/header"));

// React Router 配置加载进度条
Router.onRouteChangeStart = () => {
	NProgress.inc();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name='viewport' content='viewport-fit=cover' />
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'
				/>
				<link
					rel='Shortcut Icon'
					href='https://static.ouorz.com/snapaper@next_logo.ico'
					type='image/x-icon'
				/>
				<meta
					name='keywords'
					content='CAIE past papers,CAIE,past papers,IGCSE,ALevel,OLevel,pastpapers,snapaper,snap,papers,exam papers,mock exams,past exam papers,Cambridge, May/June, October/November, February/March, Winter session, Summer session'
				/>
				<meta
					name='description'
					content='The fastest way to find and download CAIE past papers and relevant study resources'
				/>
			</Head>
			<Header />
			<Component {...pageProps} />
			<Analytics />
		</>
	);
}

export default MyApp;
