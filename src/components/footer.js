import { HeartFilled, GithubFilled, UserOutlined } from "@ant-design/icons";

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-div">
        <div className="footer-container">
          <div>
            <p>
              &copy; Copyright 2018-2020 Snapaper · Made with <HeartFilled />{" "}
              for the People of the Internet · 蜀ICP备16017417号-10
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
