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

// React Router 引入以配置
import Router from "next/router";

// Google Analytics 配置
import withAnalytics from "next-analytics";

//动态引入顶部组件
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/header"));

// React Router 配置加载进度条
Router.onRouteChangeStart = (url) => {
  NProgress.inc();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
      </Head>
      <Header></Header>
      <Component {...pageProps} />
    </>
  );
}

export default withAnalytics(Router, {
  ga: "UA-163998158-2",
})(MyApp);
