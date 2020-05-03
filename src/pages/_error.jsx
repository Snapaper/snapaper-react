// 按需引入 AntD 组件
import { Result, Button } from "antd";

import dynamic from "next/dynamic";
import Link from "next/link";

//动态引入组件
const Header = dynamic(() => import("../components/header"));
const Footer = dynamic(() => import("../components/footer"));

function Error() {
  return (
    <div>
      <Header></Header>
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        className="ant-result-pc"
        extra={
          <Link href="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
      <Footer></Footer>
    </div>
  );
}

export default Error;
