import { Modal } from "antd";
import Link from "next/link";
import { CaretRightOutlined } from "@ant-design/icons";

import Cookies from "js-cookie";

export default function MBS({
	cate,
	MBSvisible,
	cancelDisplay,
	toggleYearChoose,
}) {
	if (cate == "alevel") {
		return (
			<Modal
				title='Trending Subjects'
				visible={MBSvisible}
				footer={null}
				zIndex={1}
				onCancel={() => cancelDisplay()}
			>
				{parseInt(Cookies.get("snapaper_server")) == 1 ||
				!Cookies.get("snapaper_server") ? (
					<div>
						<div
							className='next-cate-subjects-list'
							onClick={() => {
								toggleYearChoose("Chemistry (9701)");
							}}
						>
							<h2>Chemistry</h2>
							<p>
								All papers <CaretRightOutlined />
							</p>
						</div>
						<div
							className='next-cate-subjects-list'
							onClick={() => {
								toggleYearChoose("Physics (9702)");
							}}
						>
							<h2>Physics</h2>
							<p>
								All papers <CaretRightOutlined />
							</p>
						</div>
						<div
							className='next-cate-subjects-list'
							onClick={() => {
								toggleYearChoose("Economics (9708)");
							}}
						>
							<h2>Economics</h2>
							<p>
								All papers <CaretRightOutlined />
							</p>
						</div>
						<div
							className='next-cate-subjects-list'
							onClick={() => {
								toggleYearChoose("Mathematics (9709)");
							}}
						>
							<h2>Mathematics</h2>
							<p>
								All papers <CaretRightOutlined />
							</p>
						</div>
						<div
							className='next-cate-subjects-list'
							onClick={() => {
								toggleYearChoose("Mathematics Further (9231)");
							}}
						>
							<h2>Further Mathematics</h2>
							<p>
								All papers <CaretRightOutlined />
							</p>
						</div>
					</div>
				) : (
					<div>
						<Link
							href='/paper/alevels/xyz/Chemistry%20(9701)'
							prefetch={false}
							legacyBehavior
						>
							<div className='next-cate-subjects-list'>
								<h2>Chemistry</h2>
								<p>
									All papers <CaretRightOutlined />
								</p>
							</div>
						</Link>
						<Link
							href='/paper/alevels/xyz/Physics%20(9702)'
							prefetch={false}
							legacyBehavior
						>
							<div className='next-cate-subjects-list'>
								<h2>Physics</h2>
								<p>
									All papers <CaretRightOutlined />
								</p>
							</div>
						</Link>
						<Link
							href='/paper/alevels/xyz/Economics%20(9708)'
							prefetch={false}
							legacyBehavior
						>
							<div className='next-cate-subjects-list'>
								<h2>Economics</h2>
								<p>
									All papers <CaretRightOutlined />
								</p>
							</div>
						</Link>
						<Link
							href='/paper/alevels/xyz/Mathematics%20(9709)'
							prefetch={false}
							legacyBehavior
						>
							<div className='next-cate-subjects-list'>
								<h2>Mathematics</h2>
								<p>
									All papers <CaretRightOutlined />
								</p>
							</div>
						</Link>
						<Link
							href='/paper/alevels/xyz/Mathematics%20-%20Further%20(9231)'
							prefetch={false}
							legacyBehavior
						>
							<div className='next-cate-subjects-list'>
								<h2>Further Mathematics</h2>
								<p>
									All papers <CaretRightOutlined />
								</p>
							</div>
						</Link>
					</div>
				)}
				<div className='next-cate-subjects-list'>
					<a
						href='https://www.examsolutions.net/a-level-maths/ocr/'
						target='_blank'
					>
						<h2>Further Mathematics OCR</h2>
					</a>
					<p>
						Click title to visit website <CaretRightOutlined />
					</p>
				</div>
			</Modal>
		);
	}
	return (
		<Modal
			title='Trending Subjects'
			visible={MBSvisible}
			footer={null}
			zIndex={1}
			onCancel={() => cancelDisplay()}
		>
			{parseInt(Cookies.get("snapaper_server")) == 1 ||
			!Cookies.get("snapaper_server") ? (
				<div>
					<div
						className='next-cate-subjects-list'
						onClick={() => {
							toggleYearChoose("Chemistry (0620)");
						}}
					>
						<h2>Chemistry</h2>
						<p>
							All papers <CaretRightOutlined />
						</p>
					</div>
					<div
						className='next-cate-subjects-list'
						onClick={() => {
							toggleYearChoose("Physics (0625)");
						}}
					>
						<h2>Physics</h2>
						<p>
							All papers <CaretRightOutlined />
						</p>
					</div>
					<div
						className='next-cate-subjects-list'
						onClick={() => {
							toggleYearChoose("Economics (0455)");
						}}
					>
						<h2>Economics</h2>
						<p>
							All papers <CaretRightOutlined />
						</p>
					</div>
					<div
						className='next-cate-subjects-list'
						onClick={() => {
							toggleYearChoose("Mathematics (0580)");
						}}
					>
						<h2>Mathematics</h2>
						<p>
							All papers <CaretRightOutlined />
						</p>
					</div>
					<div
						className='next-cate-subjects-list'
						onClick={() => {
							toggleYearChoose("Mathematics Additional (0606)");
						}}
					>
						<h2>Additional Mathematics</h2>
						<p>
							All papers <CaretRightOutlined />
						</p>
					</div>
					<div
						className='next-cate-subjects-list'
						onClick={() => {
							toggleYearChoose("Global Perspectives (0457)");
						}}
					>
						<h2>Global Perspectives</h2>
						<p>
							All papers <CaretRightOutlined />
						</p>
					</div>
				</div>
			) : (
				<div>
					<Link
						href='/paper/igcse/xyz/Chemistry%20(0620)'
						prefetch={false}
						legacyBehavior
					>
						<div className='next-cate-subjects-list'>
							<h2>Chemistry</h2>
							<p>
								All papers <CaretRightOutlined />
							</p>
						</div>
					</Link>
					<Link
						href='/paper/igcse/xyz/Physics%20(0625)'
						prefetch={false}
						legacyBehavior
					>
						<div className='next-cate-subjects-list'>
							<h2>Physics</h2>
							<p>
								All papers <CaretRightOutlined />
							</p>
						</div>
					</Link>
					<Link
						href='/paper/igcse/xyz/Economics%20(0455)'
						prefetch={false}
						legacyBehavior
					>
						<div className='next-cate-subjects-list'>
							<h2>Economics</h2>
							<p>
								All papers <CaretRightOutlined />
							</p>
						</div>
					</Link>
					<Link
						href='/paper/igcse/xyz/Mathematics%20(0580)'
						prefetch={false}
						legacyBehavior
					>
						<div className='next-cate-subjects-list'>
							<h2>Mathematics</h2>
							<p>
								All papers <CaretRightOutlined />
							</p>
						</div>
					</Link>
					<Link
						href='/paper/igcse/xyz/Mathematics%20-%20Additional%20(0606)'
						prefetch={false}
						legacyBehavior
					>
						<div className='next-cate-subjects-list'>
							<h2>Additional Mathematics</h2>
							<p>
								All papers <CaretRightOutlined />
							</p>
						</div>
					</Link>
					<Link
						href='/paper/igcse/xyz/Global%20Perspectives%20(0457)'
						prefetch={false}
						legacyBehavior
					>
						<div className='next-cate-subjects-list'>
							<h2>Global Perspectives</h2>
							<p>
								All papers <CaretRightOutlined />
							</p>
						</div>
					</Link>
				</div>
			)}
		</Modal>
	);
}
