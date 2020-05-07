import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import isMobile from "ismobilejs";
import config from "../../config";

// 动态引入组件
const Footer = dynamic(() => import("../../components/footer"));

// 引入 AntD 组件
import { notification, Skeleton, Button, Modal, Empty } from "antd";
import {
  ArrowLeftOutlined,
  FireOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";

// 引入 axios 模块
import { Get } from "react-axios";

// 引入 Cookies 获取模块
import Cookies from "js-cookie";

// 提示触发函数
const openNotificationWithIcon = (type, content) => {
  notification[type]({
    message: "Notification",
    description: content,
  });
};

export default class Alevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      MBSvisible: false,
      subjectCount: 0,
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
        <main className="ant-container">
          <section className="next-cate-header">
            <div className="left">
              <div>
                <h1>A Levels</h1>
                <p>
                  Cambridge International General Certificate of Education
                  Advanced Level
                </p>
              </div>
              <div className="next-cate-header-badge">
                <div>
                  <p className="title">Board</p>
                  <p className="source">
                    <img src="https://static.ouorz.com/QQ20200114-203749@2x.png" />{" "}
                    CAIE
                  </p>
                </div>
                <div>
                  <p className="title">Source</p>
                  <p className="source">
                    <img src="https://static.ouorz.com/logo_gceguide.png" /> GCE
                    Guide
                  </p>
                </div>
              </div>
            </div>
            <div className="next-cate-header-info">
              <div>
                <Button>
                  {this.state.display
                    ? this.state.subjectCount + " Subjects"
                    : "Loading..."}
                </Button>
                <Button type="primary" onClick={() => history.go(-1)}>
                  <ArrowLeftOutlined /> Back
                </Button>
              </div>
              <div onClick={() => this.setState({ MBSvisible: true })}>
                <h2>
                  <FireOutlined /> Most Browsed Subjects
                </h2>
                <p>Click to expand list of most browsed subjects</p>
              </div>
              <Modal
                title="Most Browsed Subjects"
                visible={this.state.MBSvisible}
                footer={null}
                onCancel={() => this.setState({ MBSvisible: false })}
              >
                <Link href="/paper/alevels/Chemistry%20(9701)" prefetch={false}>
                  <div className="next-cate-subjects-list">
                    <h2>Chemistry</h2>
                    <p>
                      Click to browse all papers <CaretRightOutlined />
                    </p>
                  </div>
                </Link>
                <Link href="/paper/alevels/Physics%20(9702)" prefetch={false}>
                  <div className="next-cate-subjects-list">
                    <h2>Physics</h2>
                    <p>
                      Click to browse all papers <CaretRightOutlined />
                    </p>
                  </div>
                </Link>
                <Link href="/paper/alevels/Economics%20(9708)" prefetch={false}>
                  <div className="next-cate-subjects-list">
                    <h2>Economics</h2>
                    <p>
                      Click to browse all papers <CaretRightOutlined />
                    </p>
                  </div>
                </Link>
                <Link
                  href="/paper/alevels/Mathematics%20(9709)"
                  prefetch={false}
                >
                  <div className="next-cate-subjects-list">
                    <h2>Mathematics</h2>
                    <p>
                      Click to browse all papers <CaretRightOutlined />
                    </p>
                  </div>
                </Link>
                <Link
                  href="/paper/alevels/Mathematics%20-%20Further%20(9231)"
                  prefetch={false}
                >
                  <div className="next-cate-subjects-list">
                    <h2>Further Mathematics</h2>
                    <p>
                      Click to browse all papers <CaretRightOutlined />
                    </p>
                  </div>
                </Link>
                <div className="next-cate-subjects-list">
                  <a
                    href="https://www.examsolutions.net/a-level-maths/ocr/"
                    target="_blank"
                  >
                    <h2>Further Mathematics OCR</h2>
                  </a>
                  <p>
                    Click title to visit website <CaretRightOutlined />
                  </p>
                </div>
              </Modal>
            </div>
          </section>
          <section>
            <Get
              url={
                config.apiUrl.cates.alevel +
                (Cookies.get("snapaper_server") &&
                parseInt(Cookies.get("snapaper_server")) !== 0
                  ? Cookies.get("snapaper_server")
                  : "1")
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
                    "Request error, please report to TonyHe"
                  );
                  return (
                    <div className="next-cate-error">
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
                    <div className="next-cate-subject">
                      {response.data.cates.map((item, index) => {
                        if (!!item.name && item.name !== "error_log") {
                          return (
                            <Link
                              href={
                                "/paper/alevels/" +
                                item.name.replace("amp;", "")
                              }
                              prefetch={false}
                              key={index}
                            >
                              <div>
                                <h2>{item.name.replace("amp;", "")}</h2>
                                <p>
                                  Click to browse all papers{" "}
                                  <CaretRightOutlined />
                                </p>
                              </div>
                            </Link>
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
        <Footer></Footer>
      </div>
    );
  }
}
