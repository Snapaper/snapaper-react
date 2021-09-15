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
    this.state = {
      clicked: false,
      hovered: false,
    };
  }
  componentDidMount() {
    const serverID = Cookies.get("snapaper_server") &&
      parseInt(Cookies.get("snapaper_server")) !== 0
      ? Cookies.get("snapaper_server")
      : "1";
    this.setState({
      serverID
    });
    if (serverID === "2") {
      notification["info"]({
        duration: 0,
        message: "Consider using Node 1",
        description: (
          <p style={{ marginBottom: "0px" }}>
            We have made lots of improvements to Node 1, now it has more papers
            and a better classification system. Try it out now! Suggestions?{" "}
            <a
              href="mailto:tony.hlp@hotmail.com"
              target="_blank"
              rel="noreferrer"
            >
              Reach out.
            </a>
          </p>
        ),
      });
    }
  }
  hide = () => {
    this.setState({
      clicked: false,
      hovered: false,
    });
  };

  handleHoverChange = (visible) => {
    this.setState({
      hovered: visible,
      clicked: false,
    });
  };

  handleClickChange = (visible) => {
    if (visible == true) {
      switch (this.state.serverID) {
        case "1":
          Cookies.set("snapaper_server", "2");
          this.setState({ serverID: "2" });
          break;
        case "2":
          Cookies.set("snapaper_server", "1");
          this.setState({ serverID: "1" });
          break;
        default:
          Cookies.set("snapaper_server", "1");
          this.setState({ serverID: "1" });
          break;
      }
      location.reload();
    }
    this.setState({
      clicked: visible,
      hovered: false,
    });
  };
  render() {
    const hoverContent = <div>Click to Switch Content Source</div>;
    const clickContent = (
      <div>
        <CheckCircleOutlined /> Success
      </div>
    );
    return (
      <div className="header-div">
        <Head>
          <title>
            Snapaper | Past Papers and More Study Resources for Cambridge
            Examinations
          </title>
          <link
            rel="Shortcut Icon"
            href="https://static.ouorz.com/snapaper@next_logo.ico"
            type="image/x-icon"
          ></link>
          <meta
            name="keywords"
            content="IGCSE,ALevel,OLevel,pastpapers,snapaper,snap"
          ></meta>
          <meta
            name="description"
            content="An Integrated Platform of Past-papers and More Study Resources"
          ></meta>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
        </Head>
        <Menu mode="horizontal">
          <Menu.Item key="logo" className="header-ant-logo">
            <Link href="/">
              <a>
                <h3 className="nav-title">
                  <img
                    src="https://static.ouorz.com/snapaper@next.png"
                    className="nav-title-img"
                  />
                  napaper
                </h3>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="home">
            <Link href="/">
              <a>Home</a>
            </Link>
          </Menu.Item>
          <SubMenu key="Resources" icon={<CaretDownOutlined />} title="Resources">
            <Menu.Item key="pdfebooks">
              <Link href="/topic/ebooks">
                <a>PDF ebooks</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="sme">
              <Link href="/topic/savemyexams">
                <a>Save My Exams</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="resourceguide">
              <Link href="/page/about">
                <a>Resource Guide</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="support" icon={<CaretDownOutlined />} title="Support">
            <Menu.Item key="blog">
              <a href="https://www.ouorz.com/">Blog</a>
            </Menu.Item>
            <Menu.Item key="sponsor">
              <a
                href="https://www.ouorz.com/sponsor"
                target="_blank"
                rel="noreferrer"
              >
                Sponsor
              </a>
            </Menu.Item>
            <Menu.Item key="email">
              <a href="mailto:tony.hlp@hotmail.com">Email</a>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="other" icon={<CaretDownOutlined />} title="Other">
            <Menu.Item key="snapod">
              <a
                href="https://www.snapodcast.com"
                target="_blank"
                rel="noreferrer"
              >
                Snapod
              </a>
            </Menu.Item>
          </SubMenu>
          <Menu.Item className="nav-2">
            <Popover
              style={{ width: 500 }}
              content={hoverContent}
              trigger="hover"
              visible={this.state.hovered}
              onVisibleChange={this.handleHoverChange}
              placement="bottom"
            >
              <Popover
                content={
                  <div style={{ textAlign: "center" }}>
                    {clickContent}
                    <Button
                      size="small"
                      onClick={this.hide}
                      style={{ marginTop: "5px" }}
                    >
                      Close
                    </Button>
                  </div>
                }
                trigger="click"
                visible={this.state.clicked}
                onVisibleChange={this.handleClickChange}
              >
                <li className="nav-2-icon1 next-nav-icon-1">
                  Node<b>{this.state.serverID ? this.state.serverID : "1"}</b>
                </li>
              </Popover>
            </Popover>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
