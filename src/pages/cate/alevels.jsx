import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import isMobile from "ismobilejs";
import config from "../../config";
import MBS from "../../components/mbs";

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
                <p>Click to see the list of most browsed subjects</p>
              </div>
              <MBS
                cate="alevel"
                MBSvisible={this.state.MBSvisible}
                cancelDisplay={() => {
                  this.setState({ MBSvisible: false });
                }}
                toggleYearChoose={(subject) => {
                  this.setState({
                    YCsubject: subject.replace("amp;", ""),
                    YCvisible: true,
                  });
                }}
              />
              <Modal
                title="Exam Years"
                visible={this.state.YCvisible}
                footer={null}
                zIndex={2}
                onCancel={() => this.setState({ YCvisible: false })}
              >
                <Get url={config.apiUrl.years.alevel + this.state.YCsubject}>
                  {(error, response, isLoading) => {
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
                        <div className="next-cate-years">
                          {response.data.years.map((item, index) => {
                            return (
                              <Link
                                href={
                                  "/paper/alevels/com/" +
                                  item.name +
                                  "/" +
                                  this.state.YCsubject
                                }
                                prefetch={false}
                                key={index}
                              >
                                <div>
                                  <h2>{item.name}</h2>
                                  <CaretRightOutlined />
                                </div>
                              </Link>
                            );
                          })}
                          {response.data.years.length == 0 && (
                            <Link
                              href={
                                "/paper/alevels/com/all/" + this.state.YCsubject
                              }
                              prefetch={false}
                            >
                              <div>
                                <h2>All years</h2>
                                <CaretRightOutlined />
                              </div>
                            </Link>
                          )}
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
                          if (
                            parseInt(Cookies.get("snapaper_server")) == 1 ||
                            !Cookies.get("snapaper_server")
                          ) {
                            return (
                              <div
                                onClick={() => {
                                  this.setState({
                                    YCsubject: item.name.replace("amp;", ""),
                                    YCvisible: true,
                                  });
                                }}
                              >
                                <h2>{item.name.replace("amp;", "")}</h2>
                                <p>
                                  Click to browse papers <CaretRightOutlined />
                                </p>
                              </div>
                            );
                          } else {
                            return (
                              <Link
                                href={
                                  "/paper/alevels/xyz/" +
                                  item.name.replace("amp;", "")
                                }
                                prefetch={false}
                                key={index}
                              >
                                <div>
                                  <h2>{item.name.replace("amp;", "")}</h2>
                                  <p>
                                    Click to browse papers{" "}
                                    <CaretRightOutlined />
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
