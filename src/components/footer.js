import { HeartFilled, GithubFilled, UserOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router'

// useRouter 只可在 function 中调用(React Hook 特征)
function Footer({ children, href }) {
  const router = useRouter();
  return (
    <footer
      className={router.route == "/" ? "footer-div" : "footer-div-bottom"}
    >
      <div className="footer-container">
        <div>
          <p>
            &copy; Copyright 2018-2020 Snapaper · Made with <HeartFilled /> for
            the People of the Internet · 蜀ICP备16017417号-10
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

export default Footer;
