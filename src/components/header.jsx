import React from "react";
import Link from "next/link";
import Head from "next/head";
import { Menu } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

export default class Header extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className='header-div'>
				<Head>
					<title>
						Snapaper | Past Papers and More Study Resources for Cambridge
						Examinations
					</title>
				</Head>
				<Menu
					mode='horizontal'
					items={[
						{
							label: (
								<Link href='/' legacyBehavior>
									<h3 className='nav-title'>
										<img
											src='https://static.ouorz.com/snapaper@next.png'
											className='nav-title-img'
										/>
										napaper
									</h3>
								</Link>
							),
							key: "logo",
							className: "header-ant-logo",
						},
						{
							label: <Link href='/'>Home</Link>,
							key: "home",
						},
						{
							label: "Resources",
							key: "resources",
							icon: <CaretDownOutlined />,
							children: [
								{
									label: <Link href='/topic/ebooks'>PDF ebooks</Link>,
									key: "ebooks",
								},
								{
									label: <Link href='/topic/savemyexams'>Save My Exams</Link>,
									key: "saveMyExams",
								},
								{
									label: <Link href='/page/about'>Resource Guide</Link>,
									key: "resourceGuide",
								},
							],
						},
						{
							label: "Support",
							key: "support",
							icon: <CaretDownOutlined />,
							children: [
								{
									label: (
										<a href='https://status.snapaper.com'>Service Status</a>
									),
									key: "serviceStatus",
								},
							],
						},
						{
							label: "Contribute",
							key: "contribute",
							icon: <CaretDownOutlined />,
							children: [
								{
									label: <a href='mailto:tony.hlp@hotmail.com'>Email</a>,
									key: "email",
								},
							],
						},
					]}
				/>
			</div>
		);
	}
}
