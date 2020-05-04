import { BackTop } from "antd";
import { HeartFilled, GithubFilled, UserOutlined } from "@ant-design/icons";
import React from "react";
import { withRouter } from "next/router";

// useRouter 只可在 function 中调用(React Hook 特征)
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.router.route,
      loading: props.loading,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.state.loading) {
      this.state.loading = prevProps.loading;
    }
  }
  render() {
    // 根据 loading 参数调整样式
    return (
      <footer
        className={
          this.state.page == "/" || this.props.loading
            ? "footer-div"
            : "footer-div-bottom"
        }
      >
        <BackTop />
        <div className="footer-container">
          <div>
            <p>
              &copy; Copyright 2018-2020 Snapaper · Made with <HeartFilled />{" "}
              for the People of the Internet · <a href="http://www.beian.miit.gov.cn" target="_blank" className="icp">蜀ICP备16017417号-10</a>
            </p>
          </div>
          <div>
            <a href="https://github.com/Snapaper" target="_blank">
              <GithubFilled /> Open-source
            </a>{" "}
            &nbsp;{" "}
            <a href="https://www.ouorz.com" target="_blank">
              <UserOutlined /> TonyHe
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default withRouter(Footer);
