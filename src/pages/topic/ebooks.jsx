import React from "react";
import dynamic from "next/dynamic";

//动态引入组件
const Footer = dynamic(() => import("../../components/footer"));

// 引入 AntD 资源
import { notification, Skeleton, Button, Empty } from "antd";
import { ArrowLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

// 引入 axios 进行 HTTP 请求
import { Get } from "react-axios";

// 配置提示触发函数
const openNotificationWithIcon = (type, content) => {
	notification[type]({
		message: "Notification",
		description: content,
	});
};

// 在线预览
function liveView(url) {
	window.open(
		url,
		"_blank",
		"top=0,left=100,width=700,height=750,scrollbars=no,toolbar=no, menubar=no, location=no, status=no"
	).location;
}

export default class Ebooks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: false,
			MBSvisible: false,
			subjectCount: 0,
		};
	}
	render() {
		return (
			<div>
				<main className='ant-container'>
					<section className='next-cate-header next-topic-header'>
						<div className='left'>
							<div>
								<h1>PDF eBooks</h1>
								<p>
									Cambridge International General Certificate of Education
									Advanced Level (not up-to-date)
								</p>
							</div>
						</div>
						<div className='next-cate-header-info topic-header'>
							<div>
								<Button>
									{this.state.display
										? this.state.subjectCount + " Items"
										: "Loading..."}
								</Button>
								<Button type='primary' onClick={() => history.go(-1)}>
									<ArrowLeftOutlined /> Back
								</Button>
							</div>
						</div>
					</section>
					<section>
						<Get
							url={
								"https://files.snapaper.com/case/cases?cate=ebooks&sub=A%20Levels"
							}
							onSuccess={(response) =>
								this.setState({
									display: true,
									subjectCount: response.data.length,
								})
							}
							onLoading={() =>
								this.setState({
									display: false,
								})
							}
						>
							{(error, response, isLoading, onReload) => {
								if (error) {
									openNotificationWithIcon(
										"error",
										"An error has occurred, please use Support > Service Status to check Snapaper service status, and send an email to Tony for support."
									);
									return (
										<div className='next-cate-error'>
											<Empty description={false} />
											<p>{error.message}</p>
										</div>
									);
								} else if (isLoading) {
									return (
										<div>
											<Skeleton active />
											<Skeleton active />
										</div>
									);
								} else if (response !== null) {
									// 请求成功展示列表
									return (
										<div className='next-cate-subject topic-list'>
											{response.data.map((item, index) => {
												if (!!item.name && item.name !== "error_log") {
													return (
														<div
															key={index}
															onClick={() => {
																liveView(item.url);
															}}
														>
															<h2>{item.name.replace("amp;", "")}</h2>
															<p>
																<em>{item.type}</em>Click to View{" "}
																<CaretRightOutlined />
															</p>
														</div>
													);
												}
											})}
										</div>
									);
								}
								return (
									<div>
										<Skeleton active />
										<Skeleton active />
									</div>
								);
							}}
						</Get>
					</section>
				</main>
				<Footer loading={!this.state.display}></Footer>
			</div>
		);
	}
}
