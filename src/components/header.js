import Link from "next/link";
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
      serverID: Cookies.get("snapaper_server")
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
        <Menu mode="horizontal">
          <Menu.Item className="header-ant-logo">
            <Link href="/">
              <h3 className="nav-title">
                <img
                  src="https://static.ouorz.com/snapaper@next.png"
                  className="nav-title-img"
                />
                napaper
              </h3>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/">Home</Link>
          </Menu.Item>
          <SubMenu icon={<CaretDownOutlined />} title="Platform">
            <Menu.Item>
              <Link href="/">
                <a>Snapaper</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <a href="https://www.eugrade.com">Eugrade</a>
            </Menu.Item>
            <Menu.Item>
              <a href="https://platform.snapaper.com">Study Platform</a>
            </Menu.Item>
          </SubMenu>
          <SubMenu icon={<CaretDownOutlined />} title="Resources">
            <Menu.Item>
              <a href="https://www.snapaper.com/case/?cate=ebooks">
                PDF ebooks
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="https://www.snapaper.com/case/?cate=cdrom">
                CD Resources
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="https://www.snapaper.com/about">Resource Guide</a>
            </Menu.Item>
          </SubMenu>
          <SubMenu icon={<CaretDownOutlined />} title="Support">
            <Menu.Item>
              <a href="https://www.snapaper.com/about" target="_blank">
                About us
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="https://www.ouorz.com/donation" target="_blank">
                Donation
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="https://www.ouorz.com/" target="_blank">
                Blog
              </a>
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
                  <div style={{ "text-align": "center" }}>
                    {clickContent}
                    <Button
                      size="small"
                      onClick={this.hide}
                      style={{ "margin-top": "5px" }}
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
              <a href="https://www.snapaper.com/about">@next</a>
            </li>
          </ul>
        </Menu>
      </div>
    );
  }
}
