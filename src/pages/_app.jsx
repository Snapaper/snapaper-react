import Head from "next/head";
// import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

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
					content='Past papers, mock exams, past exam papers, CAIE past papers, CIE past papers, IGCSE past papers, ALevel past papers, CAIE study resources, CAIE pdf textbooks, Save my exams'
				/>
				<meta
					name='description'
					content='Discover Snapaper, the ultimate tool for CAIE students worldwide to effortlessly access past papers.'
				/>
			</Head>
			<Header />
			<Component {...pageProps} />
			<Analytics />
		</>
	);
}

export default MyApp;
