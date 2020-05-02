import Link from "next/link";
import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import {
  InfoCircleFilled,
  FieldNumberOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { Input, Tooltip, Modal, Select, Button, notification } from "antd";

const { Option } = Select;

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
  handleSubjectChange = (e) => {
    this.setState({ subject: e.target.value });
  };
  oneStep = () => {
    if (
      !!this.state.month &&
      !!this.state.subject &&
      !!this.state.year &&
      !!this.state.type &&
      !!this.state.paper
    ) {
      // 获取服务器
      let server = "https://cie.fraft.org/";
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
      // 获取网址
      let url =
        server +
        this.state.subject +
        "_" +
        month +
        this.state.year +
        "_" +
        this.state.type +
        "_" +
        this.state.paper +
        ".pdf";
      window.location.href = url;
    } else {
      openNotificationWithIcon("error", "Incomplete information");
    }
  };
  render() {
    return (
      <div>
        <Header></Header>
        <main className="ant-container">
          <section className="next-index-section-one">
            <section
              className="next-index-card-large"
              onClick={() => {
                this.setState({ OSvisible: true });
              }}
            >
              <img src="https://static.ouorz.com/feature-component-actionsheet-icon.png" />
              <div>
                <h1>One Step</h1>
                <p>A nice and easy way to find a paper</p>
              </div>
            </section>
            <Modal
              title="One Step"
              visible={this.state.OSvisible}
              onCancel={this.handleCancel}
              footer={false}
            >
              <Input
                onChange={this.handleSubjectChange}
                placeholder="Enter subject Code"
                className="next-index-os-div"
                size="large"
                prefix={<FieldNumberOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="eg.9701 from 9701/43/O/N/16">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
              />
              <Input
                onChange={this.handlePaperChange}
                placeholder="Enter paper number"
                className="next-index-os-div"
                prefix={<NumberOutlined className="site-form-item-icon" />}
                size="large"
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
                placeholder="Enter year number"
                className="next-index-os-div"
                prefix={<CalendarOutlined className="site-form-item-icon" />}
                size="large"
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
            <section className="next-index-section-cards">
              <Link href="/cate/igcse">
                <div className="card">
                  <div>
                    <img src="https://static.ouorz.com/ribbon.png" />
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
                    <img src="https://static.ouorz.com/school.png" />
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
                    <img src="https://static.ouorz.com/library-icon.png" />
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
                    <img src="https://static.ouorz.com/shapes.png" />
                  </div>
                  <div>
                    <h2>Save My Exams</h2>
                    <p>
                      Awesome practice exams from SaveMyExams website (Mark
                      Scheme Only)
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
                  <p>
                    Everything about the Snapaper platform and the ones behind
                    it
                  </p>
                </div>
              </Link>
            </div>
            <div className="next-index-card-right">
              <div>
                <a href="https://www.ouorz.com/donation">
                  <h1>Donation</h1>
                </a>
                <p>Snapaper is alway going to be powered by Love</p>
              </div>
              <div>
                <img src="https://static.ouorz.com/donation.jpg" />
              </div>
            </div>
          </section>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}
