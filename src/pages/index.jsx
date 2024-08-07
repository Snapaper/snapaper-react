import Link from "next/link";
import Image from "next/image";
import React from "react";
import axios from "axios";
import imagePlacerHolder from "../utilities/image-placeholder";
import Footer from "../components/footer";

// 引入 AntD 图标
import {
	InfoCircleFilled,
	CalendarOutlined,
	NumberOutlined,
} from "@ant-design/icons";

// 按需引入 AntD 组件
import { Input, Modal, Select, Button, notification, Cascader } from "antd";

// 使用 Select 的衍生组件 Option
const { Option } = Select;

// 引入 Cookies 获取模块
import Cookies from "js-cookie";
import { formatSubjectNameURL } from "../utilities/url-formatter";

// 配置提示触发函数
const openNotificationWithIcon = (type, content) => {
	notification[type]({
		message: "Notification",
		description: content,
	});
};

export default class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			OSvisible: false,
			cate: "alevel",
			subject: "",
			month: "fm",
			type: "qp",
			paper: "",
			year: "",
			oneStepLoading: false,
			display: true,
			options: [
				{
					value: "cambridge-IGCSE",
					label: "IGCSE",
					isLeaf: false,
				},
				{
					value: "a-levels",
					// value: "A-Level", // ppco
					label: "A Levels",
					isLeaf: false,
				},
			],
		};
	}
	handleCancel = (e) => {
		this.setState({
			OSvisible: false,
		});
	};
	handleMonthChange = (value) => {
		this.setState({ month: value });
	};
	handleTypeChange = (value) => {
		this.setState({ type: value });
	};
	handlePaperChange = (e) => {
		this.setState({ paper: e.target.value });
	};
	handleYearChange = (e) => {
		this.setState({ year: e.target.value });
	};
	handleSubjectChange = (value) => {
		this.setState({ subject: value });
	};
	loadData = async (selectedOptions) => {
		const targetOption = selectedOptions[selectedOptions.length - 1];
		targetOption.loading = true;

		// 请求 API 数据
		await axios
			.get(
				"https://node.snapaper.com/api/cates/" +
					targetOption.value +
					"/" +
					(Cookies.get("snapaper_server") &&
					parseInt(Cookies.get("snapaper_server")) !== 0
						? Cookies.get("snapaper_server")
						: "1")
			)
			// .get("http://node.snapaper.com/api/cates/ppco/" + targetOption.value)
			.then((res) => {
				targetOption.children = [];
				// 增加到 children 数组
				res.data.cates.map((item) => {
					targetOption.children[targetOption.children.length] = {
						label: item.name,
						value: formatSubjectNameURL(item.name),
					};
				});
				targetOption.loading = false;
			});
		// 更新选项
		this.setState({
			options: [...this.state.options],
		});
	};

	// 一步功能
	oneStep = () => {
		if (
			!!this.state.month &&
			!!this.state.subject.length &&
			!!this.state.year &&
			!!this.state.type &&
			!!this.state.paper
		) {
			// 获取服务器地址
			let server = "https://papers.gceguide.cc";
			// const server = "https://cie.fraft.cn/obj/Fetch/redir";

			// 获取月份
			switch (this.state.month) {
				case "fm":
					var month = "m";
					break;
				case "mj":
					var month = "s";
					break;
				case "on":
					var month = "w";
					break;
			}

			// 获取学科代码
			let code = this.state.subject[1]
				.split("(")[1]
				.substr(0, this.state.subject[1].split("(")[1].length - 1);

			// 获取网址
			let url =
				server +
				"/" +
				this.state.subject[0] +
				"/" +
				this.state.subject[1] +
				"/" +
				(2000 + parseInt(this.state.year)) +
				"/" +
				code +
				"_" +
				month +
				this.state.year +
				"_" +
				this.state.type +
				"_" +
				this.state.paper +
				".pdf";

			this.setState({
				oneStepLoading: true,
			});

			fetch(`https://cors.ouorz.com/?url=${encodeURIComponent(url)}`)
				.then((res) => {
					if (res.status === 200) {
						//导航至网址
						window.open(url, "_blank");
					} else {
						openNotificationWithIcon(
							"error",
							<>
								Paper not found, please try again later. <br />
								<a href={url} target='_blank'>
									Open anyway →
								</a>
							</>
						);
					}
					this.setState({
						oneStepLoading: false,
					});
				})
				.catch(() => {
					openNotificationWithIcon(
						"error",
						<>
							Paper not found, please try again later. <br />
							<a href={url} target='_blank'>
								Open anyway →
							</a>
						</>
					);
					this.setState({
						oneStepLoading: false,
					});
				});
		} else {
			//信息不全触发提示
			openNotificationWithIcon("error", "Incomplete information");
		}
	};
	render() {
		if (this.state.display) {
			return (
				<div>
					<main className='ant-container'>
						<section className='notice'>
							<div>
								<p style={{ "font-spacing": "2px" }}>
									Discover Snapaper, the ultimate tool for CAIE students
									worldwide to effortlessly access past papers. Consider
									supporting us through:
								</p>
								<div className='notice_actions'>
									<a
										href='https://github.com/sponsors/ttttonyhe'
										target='_blank'
										rel='noreferrer'
									>
										Github Sponsors →
									</a>
								</div>
							</div>
						</section>

						<section className='next-index-section-one'>
							<section
								className='next-index-card-large'
								onClick={() => {
									this.setState({ OSvisible: true });
								}}
							>
								<Image
									src='https://static.ouorz.com/onestep.jpeg'
									width={400}
									height={260}
									placeholder={imagePlacerHolder}
									alt='One Step'
								/>
								<div>
									<h1>One Step</h1>
									<p>The fastest and easiest way to find a paper</p>
								</div>
							</section>
							{/* 一步弹窗 */}
							<Modal
								title='One Step'
								visible={this.state.OSvisible}
								onCancel={this.handleCancel}
								footer={false}
							>
								<Cascader
									options={this.state.options}
									loadData={this.loadData}
									onChange={this.handleSubjectChange}
									changeOnSelect
									size='large'
									className='next-index-os-cascader'
									placeholder='Please select a subject'
								/>
								<Input
									onChange={this.handlePaperChange}
									placeholder='Enter paper number eg.42'
									className='next-index-os-div'
									prefix={<NumberOutlined className='site-form-item-icon' />}
									size='large'
									maxLength='2'
								/>
								<Select
									className='next-index-os-div'
									placeholder='Exam Month'
									defaultValue={this.state.month}
									onChange={this.handleMonthChange}
									style={{ width: "100%" }}
									size='large'
								>
									<Option key='fm'>February / March</Option>
									<Option key='mj'>May / June</Option>
									<Option key='on'>October / November</Option>
								</Select>
								<Input
									onChange={this.handleYearChange}
									placeholder='Enter year number eg.17'
									className='next-index-os-div'
									prefix={<CalendarOutlined className='site-form-item-icon' />}
									size='large'
									maxLength='2'
								/>
								<Select
									className='next-index-os-div'
									placeholder='Type of paper'
									defaultValue={this.state.type}
									onChange={this.handleTypeChange}
									style={{ width: "100%" }}
									size='large'
								>
									<Option key='qp'>Question Paper</Option>
									<Option key='ms'>Mark Scheme</Option>
								</Select>
								<Button
									size='large'
									type='primary'
									onClick={this.oneStep}
									className='next-index-os-btn'
									loading={this.state.oneStepLoading}
								>
									Find
								</Button>
							</Modal>
							{/* 一步弹窗 */}
							<section className='next-index-section-cards'>
								<Link href='/cate/igcse' legacyBehavior>
									<div className='card'>
										<div>
											<Image
												src='https://static.ouorz.com/igcse.jpeg'
												width={48}
												height={48}
												placeholder={imagePlacerHolder}
												alt='IGCSE'
											/>
										</div>
										<div>
											<h2>IGCSE</h2>
											<p>
												Cambridge International General Certificate of Secondary
												Education
											</p>
										</div>
									</div>
								</Link>
								<Link href='/cate/alevels' legacyBehavior>
									<div className='card'>
										<div>
											<Image
												src='https://static.ouorz.com/alevel.jpeg'
												width={48}
												height={48}
												placeholder={imagePlacerHolder}
												alt='A Levels'
											/>
										</div>
										<div>
											<h2>A Levels</h2>
											<p>
												Cambridge International General Certificate of Education
												Advanced Level
											</p>
										</div>
									</div>
								</Link>
								<Link href='/topic/ebooks' legacyBehavior>
									<div className='card'>
										<div>
											<Image
												src='https://static.ouorz.com/ebooks.jpeg'
												width={48}
												height={48}
												placeholder={imagePlacerHolder}
												alt='PDF eBooks'
											/>
										</div>
										<div>
											<h2>PDF eBooks</h2>
											<p>
												Cambridge International Curriculum PDF electronic
												textbooks
											</p>
										</div>
									</div>
								</Link>
								<Link href='/topic/savemyexams' legacyBehavior>
									<div className='card'>
										<div>
											<Image
												src='https://static.ouorz.com/sme.jpeg'
												width={48}
												height={48}
												placeholder={imagePlacerHolder}
												alt='Save My Exams'
											/>
										</div>
										<div>
											<h2>Save My Exams</h2>
											<p>Practice exam mark schemes</p>
										</div>
									</div>
								</Link>
							</section>
						</section>
						<section className='next-index-section-two'>
							<div className='next-index-card-left'>
								<Link href='/page/about' legacyBehavior>
									<div>
										<h1 className='about-us-text'>
											<InfoCircleFilled /> About Us
										</h1>
										<p>Learn more about Snapaper and its author</p>
									</div>
								</Link>
							</div>
							<div
								className='next-index-card-right'
								onClick={() => {
									window.location.href = "https://www.ouorz.com/sponsor";
								}}
							>
								<div>
									<a
										href='https://www.ouorz.com/sponsor'
										target='_blank'
										rel='noreferrer'
									>
										<h1>Sponsor Us</h1>
									</a>
									<p>Support the development of Snapaper</p>
								</div>
								<div>
									<Image
										src='https://static.ouorz.com/sponsor.jpeg'
										width={150}
										height={150}
										placeholder={imagePlacerHolder}
										alt='Sponsor Us'
									/>
								</div>
							</div>
						</section>
					</main>
					<Footer></Footer>
				</div>
			);
		}
	}
}
