import React from "react";
import dynamic from "next/dynamic";

// 动态引入组件
const Header = dynamic(() => import("../../components/header"));
const Footer = dynamic(() => import("../../components/footer"));


export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header></Header>
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
                All Contents & names of this website are assets of owner,
                protected by law and powered by
                <b>
                  GCE Guide (http://www.gceguide.com) or SaveMyExams
                  (https://www.savemyexams.co.uk)
                </b>
              </p>
              <br />

              <h3 className="uk-card-title index-cate-h3">Technical details</h3>
              <p>
                This website (https://www.snapaper.com) does not have a
                database. All content data comes from GCE Guide
                (http://www.gceguide.com) or SaveMyExams
                (https://www.savemyexams.co.uk). All requests are obtained from
                the GCE Guide (http://www.gceguide.com) or SaveMyExams
                (https://www.savemyexams.co.uk) website. All the content has not
                been changed or downloaded. This website is based on the GCE
                Guide (http://www.gceguide.com) or SaveMyExams
                (https://www.savemyexams.co.uk) to provide a convenient download
                extension. This is 100% a non-profit website
              </p>
              <br />

              <h3 className="uk-card-title index-cate-h3">Author</h3>
              <p>
                This website was developed by <b>TonyHe</b>. Welcome to donate
                him through <b>Alipay (13408697095)</b>. If you encounter
                unexpected difficulties during the use of this website, please
                contact him through <b>QQ (36624065)</b>. If you have
                suggestions for this website, you can contact him, but he will
                not necessarily care about you. The source code of this website
                has been open sourced on Github, welcome to
                Star/Fork/Watch/Issue <br/>
                <a href="https://github.com/Snapaper" target="_blank">https://github.com/Snapaper</a>
              </p>
              <br />

              <h3 className="uk-card-title index-cate-h3">Change Logs</h3>
              <p>
                <b>V0.18</b>
                <br />
                1.Rebuilt using Vue.js
                <br />
                <br />
                <br />
                <b>@next</b>
                <br />
                1.Rebuilt using React.js + Next.js
                <br />
                <br />
                <br />
              </p>
            </div>
          </div>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}
