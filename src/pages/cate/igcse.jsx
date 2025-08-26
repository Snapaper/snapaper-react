import Link from "next/link";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import isMobile from "ismobilejs";
import config from "../../config";
import MBS from "../../components/mbs";
import imagePlacerHolder from "../../utilities/image-placeholder";

// 动态引入组件
const Footer = dynamic(() => import("../../components/footer"));

// 引入 AntD 组件
import { notification, Skeleton, Button, Modal, Empty } from "antd";
import { ArrowLeftOutlined, FireOutlined, CaretRightOutlined } from "@ant-design/icons";

// 引入 axios 模块
import { Get } from "react-axios";

// 引入 Cookies 获取模块
import Cookies from "js-cookie";
import { formatSubjectNameURL } from "../../utilities/url-formatter";

// 提示触发函数
const openNotificationWithIcon = (type, content) => {
	notification[type]({
		message: "Notification",
		description: content,
	});
};

export default class igcse extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: false,
			MBSvisible: false,
			subjectCount: 0,
			YCvisible: false,
			YCsubject: "",
		};
	}
	componentDidMount() {
		this.setState({
			isMobile: isMobile(window.navigator).any,
		});
	}
	render() {
		return (
			<div>
				<main className='ant-container'>
					<section className='next-cate-header'>
						<div className='left'>
							<div>
								<h1>IGCSE</h1>
								<p>
									Cambridge International General Certificate of Secondary Education
								</p>
							</div>
							<div className='next-cate-header-badge'>
								<div>
									<p className='title'>Board</p>
									<p className='source'>
										<Image
											src='https://static.ouorz.com/QQ20200114-203749@2x.png'
											width={21}
											height={21}
											placeholder='blur'
											blurDataURL={imagePlacerHolder}
											alt='CAIE'
										/>{" "}
										CAIE
									</p>
								</div>
								<div>
									<p className='title'>Source</p>
									<p className='source'>
										<Image
											src='https://static.ouorz.com/papacambridge.png'
											width={21}
											height={21}
											placeholder='blur'
											blurDataURL={imagePlacerHolder}
											alt='PapaCambridge'
										/>{" "}
										PapaCambridge
									</p>
								</div>
							</div>
						</div>
						<div className='next-cate-header-info'>
							<div>
								<Button>
									{this.state.display
										? this.state.subjectCount + " Subjects"
										: "Loading..."}
								</Button>
								<Button type='primary' onClick={() => history.go(-1)}>
									<ArrowLeftOutlined /> Back
								</Button>
							</div>
							<div onClick={() => this.setState({ MBSvisible: true })}>
								<h2>
									<FireOutlined /> Trending Subjects
								</h2>
								<p>Click to expand list of most browsed subjects</p>
							</div>
							<MBS
								cate='igcse'
								MBSvisible={this.state.MBSvisible}
								cancelDisplay={() => {
									this.setState({ MBSvisible: false });
								}}
								toggleYearChoose={(subject) => {
									this.setState({
										YCsubject: formatSubjectNameURL(subject),
										YCvisible: true,
									});
								}}
							/>
							<Modal
								title='Exam Years'
								visible={this.state.YCvisible}
								footer={null}
								zIndex={2}
								onCancel={() => this.setState({ YCvisible: false })}
							>
								<Get url={config.apiUrl.years.igcse + this.state.YCsubject}>
									{(error, response, isLoading) => {
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
												<div className='next-cate-years'>
													{response.data.years.map((item, index) => {
														return (
															<Link
																href={
																	"/paper/igcse/ppca/" +
																	// "/paper/igcse/com/" +
																	// "/paper/igcse/ppco/" +
																	item.name +
																	"/" +
																	this.state.YCsubject
																}
																prefetch={false}
																key={index}
																legacyBehavior
															>
																<div>
																	<h2>{item.name}</h2>
																	<CaretRightOutlined />
																</div>
															</Link>
														);
													})}
													{/* {response.data.years.length == 0 && (
														<Link
															href={"/paper/igcse/com/all/" + this.state.YCsubject}
															prefetch={false}
															legacyBehavior
														>
															<div>
																<h2>All years</h2>
																<CaretRightOutlined />
															</div>
														</Link>
													)} */}
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
							</Modal>
						</div>
					</section>
					<section>
						<Get
							url={
								config.apiUrl.cates.igcse
								// +
								// (Cookies.get("snapaper_server") &&
								// parseInt(Cookies.get("snapaper_server")) !== 0
								// 	? Cookies.get("snapaper_server")
								// 	: "1")
								// config.apiUrl.cates.igcse
							}
							onSuccess={(response) =>
								this.setState({
									display: true,
									subjectCount: response.data.count,
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
										<div className='next-cate-subject'>
											{response.data.cates.map((item, index) => {
												if (!!item.name && item.name !== "error_log") {
													if (
														parseInt(Cookies.get("snapaper_server")) == 1 ||
														!Cookies.get("snapaper_server")
													) {
														return (
															<div
																onClick={() => {
																	this.setState({
																		YCsubject: formatSubjectNameURL(item.name),
																		YCvisible: true,
																	});
																}}
															>
																<h2>{item.name.replace("amp;", "")}</h2>
																<p>
																	Choose an Exam Year <CaretRightOutlined />
																</p>
															</div>
														);
													} else {
														return (
															<Link
																href={
																	"/paper/igcse/xyz/" + item.name.replace("amp;", "")
																}
																prefetch={false}
																key={index}
																legacyBehavior
															>
																<div key={index}>
																	<h2>{item.name.replace("amp;", "")}</h2>
																	<p>
																		All papers <CaretRightOutlined />
																	</p>
																</div>
															</Link>
														);
													}
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
				<Footer></Footer>
			</div>
		);
	}
}
