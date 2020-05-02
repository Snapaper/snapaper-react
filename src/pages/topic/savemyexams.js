import React from "react";
import isMobile from "ismobilejs";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { notification, Skeleton, Button, Empty } from "antd";
import { ArrowLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Get } from "react-axios";
import $ from "jquery";

const openNotificationWithIcon = (type, content) => {
  notification[type]({
    message: "Notification",
    description: content,
  });
};

function downloadFile(srcUrl) {
  var $a = $("<a/>")
    .attr("href", "https://www.snapaper.com/download?filename=" + srcUrl)
    .attr("download", "");
  $a[0].click();
}

export default class Ebooks extends React.Component {
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
          <section className="next-cate-header next-topic-header">
            <div className="left">
              <div>
                <h1>Save My Exams</h1>
                <p>
                  Cambridge International General Certificate of Education
                  Advanced Level
                </p>
              </div>
            </div>
            <div className="next-cate-header-info topic-header">
              <div>
                <Button>
                  {this.state.display
                    ? this.state.subjectCount + " Items"
                    : "Unknown"}
                </Button>
                <Button type="primary" onClick={() => history.go(-1)}>
                  <ArrowLeftOutlined /> Back
                </Button>
              </div>
            </div>
          </section>
          <section>
            <div className="next-cate-subject savemyexams">
              <div
                onClick={() =>
                  this.setState({ subject: "biology", subjectDisplay: true })
                }
              >
                <h2>Biology</h2>
                <p>
                  Click to load <CaretRightOutlined />
                </p>
              </div>
              <div
                onClick={() =>
                  this.setState({ subject: "physics", subjectDisplay: true })
                }
              >
                <h2>Physics</h2>
                <p>
                  Click to load <CaretRightOutlined />
                </p>
              </div>
              <div
                onClick={() =>
                  this.setState({ subject: "chemistry", subjectDisplay: true })
                }
              >
                <h2>Chemistry</h2>
                <p>
                  Click to load <CaretRightOutlined />
                </p>
              </div>
            </div>
            {this.state.subjectDisplay ? (
              <Get
                url={
                  "https://www.snapaper.com/case/cases?cate=sme&sub=" +
                  this.state.subject
                }
                onSuccess={(response) =>
                  this.setState({
                    display: true,
                    subjectCount: response.data.length,
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
                      </div>
                    );
                  } else if (response !== null) {
                    // 请求成功展示列表
                    return (
                      <div className="next-cate-subject topic-list">
                        {response.data.map((item, index) => {
                          if (!!item.name && item.name !== "error_log") {
                            return (
                              <div
                                key={index}
                                onClick={() => {
                                  downloadFile(item.url);
                                }}
                              >
                                <h2>{item.name.replace("amp;", "")}</h2>
                                <p>
                                  <em>{item.type}</em>Click to Download{" "}
                                  <CaretRightOutlined />
                                </p>
                              </div>
                            );
                          }
                        })}
                      </div>
                    );
                  }
                  return (
                    <div>
                      <Skeleton active />
                    </div>
                  );
                }}
              </Get>
            ) : (
              ""
            )}
          </section>
        </main>
        <Footer loading={!this.state.display}></Footer>
      </div>
    );
  }
}
