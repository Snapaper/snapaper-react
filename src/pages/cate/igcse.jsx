import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import isMobile from "ismobilejs";

// 动态引入组件
const Header = dynamic(() => import("../../components/header"));
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

export default class igcse extends React.Component {
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
        <Header></Header>
        <main className="ant-container">
          <section className="next-cate-header">
            <div className="left">
              <div>
                <h1>IGCSE</h1>
                <p>
                  Cambridge International General Certificate of Secondary
                  Education
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
                <Link href="/paper/igcse/Chemistry%20(0620)">
                  <div className="next-cate-subjects-list">
                    <h2>Chemistry</h2>
                    <p>
                      Click to browse all papers <CaretRightOutlined />
                    </p>
                  </div>
                </Link>
                <Link href="/paper/igcse/Physics%20(0625)">
                  <div className="next-cate-subjects-list">
                    <h2>Physics</h2>
                    <p>
                      Click to browse all papers <CaretRightOutlined />
                    </p>
                  </div>
                </Link>
                <Link href="/paper/igcse/Economics%20(0455)">
                  <div className="next-cate-subjects-list">
                    <h2>Economics</h2>
                    <p>
                      Click to browse all papers <CaretRightOutlined />
                    </p>
                  </div>
                </Link>
                <Link href="/paper/igcse/Mathematics%20(0580)">
                  <div className="next-cate-subjects-list">
                    <h2>Mathematics</h2>
                    <p>
                      Click to browse all papers <CaretRightOutlined />
                    </p>
                  </div>
                </Link>
                <Link href="/paper/igcse/Mathematics%20-%20Additional%20(0606)">
                  <div className="next-cate-subjects-list">
                    <h2>Additional Mathematics</h2>
                    <p>
                      Click to browse all papers <CaretRightOutlined />
                    </p>
                  </div>
                </Link>
                <Link href="/paper/igcse/Global%20Perspectives%20(0457)">
                  <div className="next-cate-subjects-list">
                    <h2>Global Perspectives</h2>
                    <p>
                      Click to browse all papers <CaretRightOutlined />
                    </p>
                  </div>
                </Link>
              </Modal>
            </div>
          </section>
          <section>
            <Get
              url={
                "https://www.snapaper.com/vue/cates?cate=IGCSE&node=" +
                (Cookies.get("snapaper_server")
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
                            <Link href={"/paper/igcse/" + item.name}>
                              <div key={index}>
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
        <Footer loading={!this.state.display}></Footer>
      </div>
    );
  }
}
