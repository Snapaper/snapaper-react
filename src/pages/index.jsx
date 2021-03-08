import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import axios from "axios";

//动态引入组件
const Footer = dynamic(() => import("../components/footer"));

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
      display: true,
      options: [
        {
          value: "IGCSE",
          label: "IGCSE",
          isLeaf: false,
        },
        {
          value: "A Levels",
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
      .then((res) => {
        targetOption.children = [];
        // 增加到 children 数组
        res.data.cates.map((item) => {
          targetOption.children[targetOption.children.length] = {
            label: item.name,
            value: item.name,
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
      let server =
        (Cookies.get("snapaper_server") &&
        parseInt(Cookies.get("snapaper_server")) !== 0
          ? Cookies.get("snapaper_server")
          : "1") == "1"
          ? "https://papers.gceguide.com"
          : "https://papers.gceguide.xyz";

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
        code +
        "_" +
        month +
        this.state.year +
        "_" +
        this.state.type +
        "_" +
        this.state.paper +
        ".pdf";

      //导航至网址
      window.open(url, "_blank");
    } else {
      //信息不全触发提示
      openNotificationWithIcon("error", "Incomplete information");
    }
  };
  render() {
    if (this.state.display) {
      return (
        <div>
          <main className="ant-container">
            {false && (
              <section className="notice">
                <div>
                  <p>
                    Listen to our podcast to learn more about life of studying
                    abroad...
                  </p>
                  <a
                    href="https://music.163.com/#/program?id=2071267202"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Netease Music →
                  </a>
                </div>
              </section>
            )}
            <section className="next-index-section-one">
              <section
                className="next-index-card-large"
                onClick={() => {
                  this.setState({ OSvisible: true });
                }}
              >
                <img src="https://node.snapaper.com/vue/image?place=index_1" />
                <div>
                  <h1>One Step</h1>
                  <p>A nice and easy way to find a paper</p>
                </div>
              </section>
              {/* 一步弹窗 */}
              <Modal
                title="One Step"
                visible={this.state.OSvisible}
                onCancel={this.handleCancel}
                footer={false}
              >
                <Cascader
                  options={this.state.options}
                  loadData={this.loadData}
                  onChange={this.handleSubjectChange}
                  changeOnSelect
                  size="large"
                />
                <Input
                  onChange={this.handlePaperChange}
                  placeholder="Enter paper number eg.42"
                  className="next-index-os-div"
                  prefix={<NumberOutlined className="site-form-item-icon" />}
                  size="large"
                  maxLength="2"
                />
                <Select
                  className="next-index-os-div"
                  placeholder="Exam Month"
                  defaultValue={this.state.month}
                  onChange={this.handleMonthChange}
                  style={{ width: "100%" }}
                  size="large"
                >
                  <Option key="fm">February / March</Option>
                  <Option key="mj">May / June</Option>
                  <Option key="on">October / November</Option>
                </Select>
                <Input
                  onChange={this.handleYearChange}
                  placeholder="Enter year number eg.17"
                  className="next-index-os-div"
                  prefix={<CalendarOutlined className="site-form-item-icon" />}
                  size="large"
                  maxLength="2"
                />
                <Select
                  className="next-index-os-div"
                  placeholder="Type of paper"
                  defaultValue={this.state.type}
                  onChange={this.handleTypeChange}
                  style={{ width: "100%" }}
                  size="large"
                >
                  <Option key="qp">Question Paper</Option>
                  <Option key="ms">Mark Scheme</Option>
                </Select>
                <Button
                  size="large"
                  type="primary"
                  onClick={this.oneStep}
                  className="next-index-os-btn"
                >
                  Find
                </Button>
              </Modal>
              {/* 一步弹窗 */}
              <section className="next-index-section-cards">
                <Link href="/cate/igcse">
                  <div className="card">
                    <div>
                      <img src="https://node.snapaper.com/vue/image?place=index_2" />
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
                <Link href="/cate/alevels">
                  <div className="card">
                    <div>
                      <img src="https://node.snapaper.com/vue/image?place=index_3" />
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
                <Link href="/topic/ebooks">
                  <div className="card">
                    <div>
                      <img src="https://node.snapaper.com/vue/image?place=index_4" />
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
                <Link href="/topic/savemyexams">
                  <div className="card">
                    <div>
                      <img src="https://node.snapaper.com/vue/image?place=index_5" />
                    </div>
                    <div>
                      <h2>Save My Exams</h2>
                      <p>
                        Awesome practice exams from SaveMyExams (Mark Scheme
                        Only)
                      </p>
                    </div>
                  </div>
                </Link>
              </section>
            </section>
            <section className="next-index-section-two">
              <div className="next-index-card-left">
                <Link href="/page/about">
                  <div>
                    <h1>
                      About Us <InfoCircleFilled />
                    </h1>
                    <p>Learn more about Snapaper</p>
                  </div>
                </Link>
              </div>
              <div className="next-index-card-right">
                <div>
                  <a
                    href="https://www.ouorz.com/sponsor"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h1>Sponsor Us</h1>
                  </a>
                  <p>Snapaper is 100% Free to use</p>
                </div>
                <div>
                  <img src="https://node.snapaper.com/vue/image?place=index_6" />
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
