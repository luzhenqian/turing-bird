import { Button, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import bomb from "public/images/bomb.png";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={bomb} alt="error" width={400} height={400}></Image>
      <Text fontSize={"2xl"} color={"gray.50"}>
        登录失败！请检查账号或联系管理员！
      </Text>
      <div className="flex justify-center gap-8 m-8">
        <Link href={"/auth/signin"}>
          <Button bgColor={"teal"} color={"white"}>
            重新登录
          </Button>
        </Link>
        <Link href="/">
          <Button bgColor={"teal"} color={"white"}>
            返回首页
          </Button>
        </Link>
      </div>
    </div>
  );
}
