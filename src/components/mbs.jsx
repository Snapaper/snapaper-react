import { CaretRightOutlined } from "@ant-design/icons"
import { Modal } from "antd"

export default function MBS({
	cate,
	MBSvisible,
	cancelDisplay,
	toggleYearChoose,
}) {
	if (cate == "alevel") {
		return (
			<Modal
				title="Trending Subjects"
				visible={MBSvisible}
				footer={null}
				zIndex={1}
				onCancel={() => cancelDisplay()}>
				<div>
					<div
						className="next-cate-subjects-list"
						onClick={() => {
							toggleYearChoose("Chemistry (9701)")
						}}>
						<h2>Chemistry</h2>
						<p>
							All papers <CaretRightOutlined />
						</p>
					</div>
					<div
						className="next-cate-subjects-list"
						onClick={() => {
							toggleYearChoose("Physics (9702)")
						}}>
						<h2>Physics</h2>
						<p>
							All papers <CaretRightOutlined />
						</p>
					</div>
					<div
						className="next-cate-subjects-list"
						onClick={() => {
							toggleYearChoose("Economics (9708)")
						}}>
						<h2>Economics</h2>
						<p>
							All papers <CaretRightOutlined />
						</p>
					</div>
					<div
						className="next-cate-subjects-list"
						onClick={() => {
							toggleYearChoose("Mathematics (9709)")
						}}>
						<h2>Mathematics</h2>
						<p>
							All papers <CaretRightOutlined />
						</p>
					</div>
					<div
						className="next-cate-subjects-list"
						onClick={() => {
							toggleYearChoose("Mathematics Further (9231)")
						}}>
						<h2>Further Mathematics</h2>
						<p>
							All papers <CaretRightOutlined />
						</p>
					</div>
				</div>
				<div className="next-cate-subjects-list">
					<a
						href="https://www.examsolutions.net/a-level-maths/ocr/"
						target="_blank">
						<h2>Further Mathematics OCR</h2>
					</a>
					<p>
						Click title to visit website <CaretRightOutlined />
					</p>
				</div>
			</Modal>
		)
	}
	return (
		<Modal
			title="Trending Subjects"
			visible={MBSvisible}
			footer={null}
			zIndex={1}
			onCancel={() => cancelDisplay()}>
			<div>
				<div
					className="next-cate-subjects-list"
					onClick={() => {
						toggleYearChoose("Chemistry (0620)")
					}}>
					<h2>Chemistry</h2>
					<p>
						All papers <CaretRightOutlined />
					</p>
				</div>
				<div
					className="next-cate-subjects-list"
					onClick={() => {
						toggleYearChoose("Physics (0625)")
					}}>
					<h2>Physics</h2>
					<p>
						All papers <CaretRightOutlined />
					</p>
				</div>
				<div
					className="next-cate-subjects-list"
					onClick={() => {
						toggleYearChoose("Economics (0455)")
					}}>
					<h2>Economics</h2>
					<p>
						All papers <CaretRightOutlined />
					</p>
				</div>
				<div
					className="next-cate-subjects-list"
					onClick={() => {
						toggleYearChoose("Mathematics (0580)")
					}}>
					<h2>Mathematics</h2>
					<p>
						All papers <CaretRightOutlined />
					</p>
				</div>
				<div
					className="next-cate-subjects-list"
					onClick={() => {
						toggleYearChoose("Mathematics (0606)")
					}}>
					<h2>Additional Mathematics</h2>
					<p>
						All papers <CaretRightOutlined />
					</p>
				</div>
				<div
					className="next-cate-subjects-list"
					onClick={() => {
						toggleYearChoose("Global Perspectives (0457)")
					}}>
					<h2>Global Perspectives</h2>
					<p>
						All papers <CaretRightOutlined />
					</p>
				</div>
			</div>
		</Modal>
	)
}
