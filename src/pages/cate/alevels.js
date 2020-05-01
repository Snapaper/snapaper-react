import Link from "next/link";
import React from "react";
import isMobile from "ismobilejs";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { notification, Skeleton } from "antd";
import { Get } from "react-axios";

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
          <Get
            url="https://www.snapaper.com/vue/cates?cate=A%20Levels"
            onSuccess={() =>
              this.setState({
                display: true,
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
                  <div>
                    Something bad happened: {error.message}{" "}
                    <button
                      onClick={() => onReload({ params: { reload: true } })}
                    >
                      Retry
                    </button>
                  </div>
                );
              } else if (isLoading) {
                return (
                  <div>
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                  </div>
                );
              } else if (response !== null) {
                return (
                  <div>
                    {response.data.cates.map((item, index) => {
                      if (!!item.name) {
                        return (
                          <div key={index}>{item.name.replace("amp;", "")}</div>
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
                  <Skeleton active />
                </div>
              );
            }}
          </Get>
        </main>
        <Footer loading={!this.state.display}></Footer>
      </div>
    );
  }
}
