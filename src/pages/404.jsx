// 按需引入 AntD 组件
import { Result, Button } from "antd"
import dynamic from "next/dynamic"
import Link from "next/link"

//动态引入组件
const Footer = dynamic(() => import("../components/footer"))

export default function Custom404() {
	return (
		<div>
			<Result
				status="404"
				title="404"
				subTitle="Sorry, this page does not exist."
				className="ant-result-pc"
				extra={
					<Link href="/" legacyBehavior>
						<Button type="primary">Back to Home</Button>
					</Link>
				}
			/>
			<Footer></Footer>
		</div>
	)
}
