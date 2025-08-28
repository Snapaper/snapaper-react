import dynamic from "next/dynamic"
import React from "react"

// 动态引入组件
const Footer = dynamic(() => import("../../components/footer"))

export default class About extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return (
			<div>
				<main className="ant-container">
					<div className="page-container">
						<div>
							<h3 className="uk-card-title index-cate-h3">Resource Guide</h3>
							<p>
								Image from PapaCambridge (https://pastpapers.papacambridge.com):
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
								Content & names in this website are assets of owners, protected
								by law. Past papers are sourced from{" "}
								<b>PapaCambridge (https://pastpapers.papacambridge.com)</b> and{" "}
								<b>SaveMyExams (https://www.savemyexams.co.uk)</b>
							</p>
							<p>
								This is a 100% non-profitable website. Snapaper does maintain a
								database or data storage of any kind. All the content are
								provided by PapaCambridge (https://pastpapers.papacambridge.com)
								and SaveMyExams (https://www.savemyexams.co.uk). They have not
								been changed or downloaded by Snapaper.
							</p>
							<br />

							<h3 className="uk-card-title index-cate-h3">Author</h3>
							<p>
								Snapaper is a project originally developed by <b>Tony He</b>, it
								is however no longer actively maintained.
								<br />
								If you found this project helpful, please consider{" "}
								<a href="https://www.ouorz.com/sponsor">sponsoring him</a> and
								his other open-source work.
								<br />
								If you encountered any issue during the use of this website,
								please contact him through <b>Email (tony.hlp@hotmail.com)</b>
								.
								<br />
								Should you have any suggestions or concerns for this website,
								please also use Email to reach out to him.
							</p>
							<br />

							<h3 className="uk-card-title index-cate-h3">Open source</h3>
							<p>
								Snapaper is an open-source project, the source code (both
								front-end and back-end) is publicly accessible on Github. You
								are welcomed to contribute to the development of this project.
								But be aware that this is a legcay project and is not actively
								maintained.
							</p>
							<a href="https://github.com/Snapaper/snapaper-react">
								https://github.com/Snapaper/snapaper-react
							</a>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		)
	}
}
