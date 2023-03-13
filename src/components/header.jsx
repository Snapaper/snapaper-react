import React from "react";
import Link from "next/link";
import Head from "next/head";
import Cookies from "js-cookie";
import { Menu, Popover, Button, notification } from "antd";
import { CaretDownOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

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
				<Menu mode='horizontal'>
					<Menu.Item key='logo' className='header-ant-logo'>
						<Link href='/' legacyBehavior>
							<h3 className='nav-title'>
								<img
									src='https://static.ouorz.com/snapaper@next.png'
									className='nav-title-img'
								/>
								napaper
							</h3>
						</Link>
					</Menu.Item>
					<Menu.Item key='home'>
						<Link href='/'>Home</Link>
					</Menu.Item>
					<SubMenu
						key='Resources'
						icon={<CaretDownOutlined />}
						title='Resources'
					>
						<Menu.Item key='pdfebooks'>
							<Link href='/topic/ebooks'>PDF ebooks</Link>
						</Menu.Item>
						<Menu.Item key='sme'>
							<Link href='/topic/savemyexams'>Save My Exams</Link>
						</Menu.Item>
						<Menu.Item key='resourceguide'>
							<Link href='/page/about'>Resource Guide</Link>
						</Menu.Item>
					</SubMenu>
					<SubMenu key='support' icon={<CaretDownOutlined />} title='Support'>
						<Menu.Item key='status'>
							<a href='https://status.snapaper.com'>Service Status</a>
						</Menu.Item>
					</SubMenu>
					<SubMenu
						key='contribute'
						icon={<CaretDownOutlined />}
						title='Contribute'
					>
						<Menu.Item key='email'>
							<a href='mailto:tony.hlp@hotmail.com'>Email</a>
						</Menu.Item>
					</SubMenu>
					<Menu.Item className='nav-2'>
						<a
							className='nav-2-icon1 next-nav-icon-1'
							href='mailto:tony.hlp@hotmail.com'
							target='_blank'
							rel='noreferrer'
						>
							Feedback
						</a>
					</Menu.Item>
				</Menu>
			</div>
		);
	}
}
