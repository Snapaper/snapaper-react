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

// React Router 配置加载进度条
Router.onRouteChangeStart = (url) => {
  NProgress.inc();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default withAnalytics(Router, {
  ga: "UA-163998158-2",
})(MyApp);
