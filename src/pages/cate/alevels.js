import Link from "next/link";
import React from "react";
import isMobile from "ismobilejs";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { notification, Skeleton, Button, Modal, Empty } from "antd";
import {
  ArrowLeftOutlined,
  FireOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { Get } from "react-axios";
import Cookies from "js-cookie";

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
        <Header></Header>
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
                <Button>{ this.state.display ? this.state.subjectCount + ' Subjects' : 'Loading...'}</Button>
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
              <Link href="/paper/alevels/Chemistry%20(9701)">
                <div className="next-cate-subjects-list">
                  <h2>Chemistry</h2>
                  <p>
                    Click to browse all papers <CaretRightOutlined />
                  </p>
                </div>
                </Link>
                <Link href="/paper/alevels/Physics%20(9702)">
                <div className="next-cate-subjects-list">
                  <h2>Physics</h2>
                  <p>
                    Click to browse all papers <CaretRightOutlined />
                  </p>
                </div>
                </Link>
                <Link href="/paper/alevels/Economics%20(9708)">
                <div className="next-cate-subjects-list">
                  <h2>Economics</h2>
                  <p>
                    Click to browse all papers <CaretRightOutlined />
                  </p>
                </div>
                </Link>
                <Link href="/paper/alevels/Mathematics%20(9709)">
                <div className="next-cate-subjects-list">
                  <h2>Mathematics</h2>
                  <p>
                    Click to browse all papers <CaretRightOutlined />
                  </p>
                </div>
                </Link>
                <Link href="/paper/alevels/Mathematics%20-%20Further%20(9231)">
                <div className="next-cate-subjects-list">
                  <h2>Further Mathematics</h2>
                  <p>
                    Click to browse all papers <CaretRightOutlined />
                  </p>
                </div>
                </Link>
                <div className="next-cate-subjects-list">
                  <a href="https://www.examsolutions.net/a-level-maths/ocr/" target="_blank"><h2>Further Mathematics OCR</h2></a>
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
                "https://www.snapaper.com/vue/cates?cate=A%20Levels&node=" +
                (Cookies.get("snapaper_server")
                  ? Cookies.get("snapaper_server")
                  : "1")
              }
              onSuccess={(response) =>
                this.setState({
                  display: true,
                  subjectCount: response.data.count
                })
              }
              onLoading={() =>
                this.setState({
                  display: false
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
                        if (!!item.name && item.name !== 'error_log') {
                          return (
                            <Link href={'/paper/alevels/'+item.name}>
                            <div key={index}>
                              <h2>{item.name.replace("amp;", "")}</h2>
                              <p>Click to browse all papers <CaretRightOutlined /></p>
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
