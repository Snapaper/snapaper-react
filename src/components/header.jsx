import Link from "next/link";
import Head from "next/head";
import Cookies from "js-cookie";
import { Menu, Popover, Button } from "antd";
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
    this.setState({
      serverID:
        Cookies.get("snapaper_server") &&
        parseInt(Cookies.get("snapaper_server")) !== 0
          ? Cookies.get("snapaper_server")
          : "1",
    });
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
    }
    this.setState({
      clicked: visible,
      hovered: false,
    });
  };
  render() {
    const hoverContent = <div>Click to Switch Server Node</div>;
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
          <Menu.Item className="header-ant-logo">
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
          <Menu.Item>
            <Link href="/">
              <a>Home</a>
            </Link>
          </Menu.Item>
          <SubMenu icon={<CaretDownOutlined />} title="Platform">
            <Menu.Item>
              <Link href="/">
                <a>Snapaper</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <a
                href="https://www.eugrade.com"
                target="_blank"
                rel="noreferrer"
              >
                Eugrade
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                href="https://platform.snapaper.com"
                target="_blank"
                rel="noreferrer"
              >
                Study Platform
              </a>
            </Menu.Item>
          </SubMenu>
          <SubMenu icon={<CaretDownOutlined />} title="Resources">
            <Menu.Item>
              <Link href="/topic/savemyexams">
                <a>PDF ebooks</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/page/about">
                <a>Resource Guide</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu icon={<CaretDownOutlined />} title="Support">
            <Menu.Item>
              <Link href="/page/about">
                <a>About us</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <a
                href="https://www.ouorz.com/donation"
                target="_blank"
                rel="noreferrer"
              >
                Donation
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="https://www.ouorz.com/">Blog</a>
            </Menu.Item>
          </SubMenu>
          <ul className="nav-2">
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
                  Node<b>{this.state.serverID}</b>
                </li>
              </Popover>
            </Popover>

            <li className="nav-2-icon1 next-nav-icon-2">
              <a
                href="https://shimo.im/forms/KcY8hKypp9wkrtG6/fill"
                target="_blank"
              >
                @next
              </a>
            </li>
          </ul>
        </Menu>
      </div>
    );
  }
}
