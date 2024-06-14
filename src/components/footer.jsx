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
		};
	}
	render() {
		// 根据 loading 参数调整样式
		return (
			<footer
				className={
					this.state.page == "/topic/savemyexams"
						? "footer-div footer-div-bottom"
						: "footer-div"
				}
			>
				<BackTop />
				<div className='footer-container'>
					<div>
						<p>
							&copy; Copyright 2018-{new Date().getFullYear()} Snapaper · Made
							with <HeartFilled /> for the People of the Internet
						</p>
					</div>
					<div>
						<a
							href='https://github.com/Snapaper'
							target='_blank'
							rel='noreferrer'
						>
							<GithubFilled /> OSS
						</a>
					</div>
				</div>
			</footer>
		);
	}
}

export default withRouter(Footer);
