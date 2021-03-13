import React from "react";
import dynamic from "next/dynamic";

// 动态引入组件
const Footer = dynamic(() => import("../../components/footer"));

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <main className="ant-container">
          <div className="page-container">
            <div>
              <h3 className="uk-card-title index-cate-h3">Resource Guide</h3>
              <p>
                This image is from GCE Guide (http://www.gceguide.com)
                <br />
                <img
                  src="https://static.ouorz.com/res_guide.png"
                  width="90%"
                  height="auto"
                />
              </p>
              <br />

              <h3 className="uk-card-title index-cate-h3">Copyrights</h3>
              <p>
                All the content & names of this website are assets of owner,
                protected by law. Past papers are provided by{" "}
                <b>GCE Guide (http://www.gceguide.com)</b> or{" "}
                <b>SaveMyExams (https://www.savemyexams.co.uk)</b>
              </p>
              <p>
                Snapaper does not have a database or file storage of any kind.
                All the content are from GCE Guide (http://www.gceguide.com) or
                SaveMyExams (https://www.savemyexams.co.uk), and has not been
                changed or downloaded by Snapaper. This is a 100% non-profit
                website.
              </p>
              <br />

              <h3 className="uk-card-title index-cate-h3">Author</h3>
              <p>
                This website was developed by <b>TonyHe</b>.
                <br />
                If you found this project helpful or interesting, please
                consider{" "}
                <a href="https://www.ouorz.com/sponsor">sponsoring him</a>.
                <br />
                If you encounter any problem during the use of this website,
                please contact him through <b>Email (tony.hlp@hotmail.com)</b>
                .
                <br />
                If you have any suggestions for this website, you can contact
                him, but he will not necessarily care about you.
              </p>
              <br />

              <h3 className="uk-card-title index-cate-h3">Open source</h3>
              <p>
                Snapaper is an open-source project on Github, you are welcome to
                contribute to the development of this project
              </p>
              <a href="https://github.com/Snapaper/snapaper-react">https://github.com/Snapaper/snapaper-react</a>
            </div>
          </div>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}
