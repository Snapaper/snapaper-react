import Link from "next/link";
import React, { useState } from "react";
import isMobile from "ismobilejs";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import {
  notification,
  Skeleton,
  Button,
  Modal,
  Empty,
  Table,
  Radio,
  Tag,
  Progress,
  Popover,
} from "antd";
import {
  ArrowLeftOutlined,
  FireOutlined,
  CaretRightOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Get } from "react-axios";
import Cookies from "js-cookie";
import { withRouter } from "next/router";
import $ from "jquery";

const openNotificationWithIcon = (type, content) => {
  notification[type]({
    message: "Notification",
    description: content,
  });
};

var paperData = {};
var selectedPapers = [];
var downloadProgress = {
  done: 0,
  all: 100,
};
var noDownloadNow = true;
var stillNeedDownloadlist = [];

/* 下载、预览交互函数 */
function downloadFile(srcUrl) {
  var $a = $("<a/>")
    .attr("href", "https://www.snapaper.com/download?filename=" + srcUrl)
    .attr("download", "");
  $a[0].click();
}

function liveView(url) {
  window.open(
    url,
    "_blank",
    "top=0,left=100,width=700,height=750,scrollbars=no,toolbar=no, menubar=no, location=no, status=no"
  ).location;
}

// 下载列表
function downloadList() {
  noDownloadNow = false;
  let keys = selectedPapers;
  let length = keys.length;
  let number = 0;
  let ListDownload = function () {
    if (number >= length) {
      window.clearInterval(interval);
      number = 0;
      downloadProgress.done = 0;
      noDownloadNow = true;
      window.outter.setState({ progress: 0, downloadVisible: false });

      // 同步下载模式
      if (
        window.outter.state.downloadMode == "2" &&
        stillNeedDownloadlist.length
      ) {
        let list = stillNeedDownloadlist;
        console.log(stillNeedDownloadlist);
        let i = 0;
        let download = function () {
          if (i >= list.length) {
            i = 0;
            stillNeedDownloadlist = [];
            window.clearInterval(intervalStill);
          } else {
            downloadFile(list[i]);
            i++;
          }
        };
        window.intervalStill = setInterval(download, 3000);
      }
    } else {
      downloadFile(paperData[keys[number] - 1].url);

      if (paperData[keys[number] - 1].name.indexOf("qp") > -1) {
        stillNeedDownloadlist[stillNeedDownloadlist.length] = paperData[
          keys[number] - 1
        ].url.replace("qp", "ms");
      } else if (paperData[keys[number] - 1].name.indexOf("ms") > -1) {
        stillNeedDownloadlist[stillNeedDownloadlist.length] = paperData[
          keys[number] - 1
        ].url.replace("ms", "qp");
      }

      number += 1;
      downloadProgress.done = Math.floor((number / length) * 100);
      window.outter.setState({ progress: downloadProgress.done });
    }
  };
  window.interval = setInterval(ListDownload, 3000);
}

// 下载全部
function downloadAll() {
  noDownloadNow = false;
  let keys = paperData;
  let length = keys.length;
  let number = 0;
  let ListDownload = function () {
    if (number == length) {
      window.clearInterval(interval);
      number = 0;
      downloadProgress.done = 0;
      noDownloadNow = true;
      window.outter.setState({ progress: 0, downloadVisible: false });
    } else {
      downloadFile(paperData[number].url);
      number += 1;
      downloadProgress.done = ((number / length) * 100).toFixed(2);
      // 调用类内部暴露出的 outter
      window.outter.setState({ progress: downloadProgress.done });
    }
  };
  window.interval = setInterval(ListDownload, 3000);
}
/* 下载、预览交互函数 */

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 250,
    ellipsis: true,
  },
  {
    title: "Link",
    dataIndex: "url",
    key: "url",
    width: 100,
    render: (link) => <a href={link}>Link</a>,
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    width: 100,
  },
  {
    title: "Info",
    dataIndex: "info",
    width: 250,
    render: (info) => (
      <span>
        {info.map((info) => {
          switch (info) {
            case "Mark Scheme":
              var color = "blue";
              break;
            case "Question Paper":
              var color = "green";
              break;
            case "Examiner Report":
              var color = "orange";
              break;
            case "Confidential Instruction":
              var color = "cyan";
              break;
            case "Grade thresholds":
              var color = "magenta";
              break;
            case "Specimen Paper":
              var color = "purple";
              break;
            default:
              var color = "red";
              break;
          }
          return (
            <Tag color={color} key={info}>
              {info.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <Button
          type="default"
          className="next-paper-live-btn"
          onClick={() => {
            liveView(record.url);
          }}
        >
          Live View
        </Button>
        <Button
          type="primary"
          onClick={() => {
            downloadFile(record.url);
          }}
        >
          Download
        </Button>
        <Button
          style={{ marginLeft: "10px" }}
          disabled={
            record.name.indexOf("ms") > -1 || record.name.indexOf("qp") > -1
              ? false
              : true
          }
          onClick={() => {
            if (record.name.indexOf("ms") > -1) {
              liveView(record.url.replace("ms", "qp"));
            } else {
              liveView(record.url.replace("qp", "ms"));
            }
          }}
        >
          {record.name.indexOf("ms") > -1 ? "Question Paper" : "Mark Scheme"}
        </Button>
      </span>
    ),
  },
];

const rowSelection = {
  onChange: (selectedRowKeys) => {
    selectedPapers = selectedRowKeys;
  },
};

const Papertable = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  return (
    <Table
      rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}
      columns={columns}
      dataSource={paperData}
      pagination={{ position: ["topLeft", "bottomRight"] }}
      bordered
    />
  );
};

class AlevelSubject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      MBSvisible: false,
      subjectCount: 0,
      downloadVisible: false,
      downloadMode: Cookies.get("snapaper_download"),
    };
  }
  componentDidMount() {
    this.setState({
      isMobile: isMobile(window.navigator).any,
      progress: downloadProgress.done,
    });
    // 暴露内部 this 给外部
    window.outter = this;
  }
  doDownloadList() {
    if (selectedPapers.length) {
      this.setState({ downloadVisible: true });
      downloadList();
    } else {
      openNotificationWithIcon("error", "None of the papers are selected");
    }
  }
  doDownloadAll() {
    if (paperData.length) {
      this.setState({ downloadVisible: true });
      downloadAll();
    } else {
      openNotificationWithIcon("error", "No papers are available to download");
    }
  }
  render() {
    return (
      <div>
        <Header></Header>
        <main className="ant-container">
          <section className="next-cate-header paper-header">
            <div className="left">
              <div>
                <h1>
                  {this.props.router.query.subject
                    ? this.props.router.query.subject
                    : "A Levels"}
                </h1>
                <p>
                  Cambridge International General Certificate of Education
                  Advanced Level
                </p>
              </div>
              <div className="next-cate-header-badge">
                <div>
                  <p className="title">Exam</p>
                  <p className="source">
                    <img src="https://static.ouorz.com/QQ20200114-203749@2x.png" />{" "}
                    A Levels
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
            <div className="next-paper-header-info">
              <div>
                <Button>
                  {this.state.display
                    ? this.state.subjectCount + " Papers"
                    : "Loading..."}
                </Button>
                <Button type="primary" onClick={() => history.go(-1)}>
                  <ArrowLeftOutlined /> Back
                </Button>
              </div>
              <div className="downloading">
                <Popover
                  placement="bottom"
                  content={
                    <div>
                      <p style={{ marginBottom: "5px" }}>
                        <Button
                          type={
                            this.state.downloadMode == "1" ||
                            !this.state.downloadMode
                              ? "primary"
                              : ""
                          }
                          onClick={() => {
                            Cookies.set("snapaper_download", "1");
                            this.setState({ downloadMode: "1" });
                          }}
                        >
                          {this.state.downloadMode == "1" ||
                          !this.state.downloadMode ? (
                            <CheckCircleOutlined />
                          ) : (
                            ""
                          )}
                          One at a time
                        </Button>
                      </p>
                      <p tyle={{ marginBottom: "0px" }}>
                        <Button
                          type={this.state.downloadMode == "2" ? "primary" : ""}
                          onClick={() => {
                            Cookies.set("snapaper_download", "2");
                            this.setState({ downloadMode: "2" });
                          }}
                        >
                          {this.state.downloadMode == "2" ? (
                            <CheckCircleOutlined />
                          ) : (
                            ""
                          )}
                          MS + QP
                        </Button>
                      </p>
                    </div>
                  }
                  title="Select Downloading Mode"
                  trigger="hover"
                >
                  <div className="left">Downloading Mode</div>
                </Popover>
                <div className="right">
                  <div onClick={() => this.doDownloadList()}>Download List</div>
                  <div onClick={() => this.doDownloadAll()}>Download All</div>
                </div>
              </div>
              <Modal
                title="Downloading Papers"
                visible={this.state.downloadVisible}
                onCancel={() => {
                  if (noDownloadNow) {
                    this.setState({ downloadVisible: false });
                  } else {
                    this.setState({ downloadVisible: true });
                  }
                }}
                footer={false}
              >
                <div className="next-paper-download-info">
                  <h2>Download is in progress</h2>
                  <p>Please wait for the downloading process to complete</p>
                </div>
                <Progress
                  percent={this.state.progress}
                  status={this.state.progress == 100 ? "success" : "active"}
                />
              </Modal>
            </div>
          </section>
          {this.props.router.query.subject ? (
            this.state.isMobile ? (
              <Get
                url={
                  "https://www.snapaper.com/vue/papers?cate=A%20Levels&sub=" +
                  this.props.router.query.subject +
                  "&node=" +
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
                    paperData = response.data.papers;
                    // 请求成功展示列表
                    return (
                      <div className="next-cate-subject">
                        {response.data.papers.map((item, index) => {
                          if (!!item.name && item.name !== "error_log") {
                            return (
                              <div key={index}>
                                <a href={item.url} target="_blank">
                                  <h2>{item.name.replace("amp;", "")}</h2>
                                </a>
                                <p>
                                  <a href={item.url} target="_blank">
                                    Click to download <CaretRightOutlined />
                                  </a>
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
                      <Skeleton active />
                    </div>
                  );
                }}
              </Get>
            ) : (
              <Get
                url={
                  "https://www.snapaper.com/vue/papers?cate=A%20Levels&sub=" +
                  this.props.router.query.subject +
                  "&node=" +
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
                    paperData = response.data.papers;
                    // 请求成功展示列表
                    return (
                      <div className="next-paper-papers">
                        <Papertable></Papertable>
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
            )
          ) : (
            <div>
              <Skeleton active />
              <Skeleton active />
            </div>
          )}
        </main>
        <Footer loading={!this.state.display}></Footer>
      </div>
    );
  }
}

export default withRouter(AlevelSubject);
