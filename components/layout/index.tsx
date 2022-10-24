import {
  Avatar,
  Button,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { MessageIcon, SearchIcon } from "components/icons";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import logo from "public/images/logo.png";
import { useRouter } from "next/router";
import Link from "next/link";
import SignInLayout from "./signin";

type Props = {
  children: React.ReactNode;
};

const useSignInLayoutPages = ["/auth/signin", "/auth/error"];

export default function Layout({ children }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  if (useSignInLayoutPages.some((url) => router.pathname.includes(url))) {
    return <SignInLayout>{children}</SignInLayout>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="flex items-center justify-center w-full bg-white">
        <div className="max-w-[1200px] min-w-[900px] flex items-center justify-between p-2 gap-2">
          <Link href="/">
            <Image src={logo} alt="logo" width={48} height={48} />
          </Link>
          <div className="flex items-center gap-4">
            <InputGroup size="md">
              <Input pr="4.5rem" type={"text"} placeholder="搜索" />
              <InputRightElement width="4.5rem">
                <SearchIcon
                  className="cursor-pointer"
                  color="black"
                  fontSize={"2xl"}
                />
              </InputRightElement>
            </InputGroup>
            <Button bgColor={"teal"} color={"white"} px={8}>
              写文章
            </Button>
            <Button bgColor={"teal"} color={"white"} px={8}>
              创作中心
            </Button>
            <Button bgColor={"teal"} color={"white"} px={8}>
              管理中心
            </Button>
            <MessageIcon fontSize={"4xl"} className={"cursor-pointer"} />
            {session ? (
              <Menu isLazy placement="bottom">
                <MenuButton>
                  <Avatar
                    name="A"
                    w={12}
                    h={12}
                    src={session?.user?.image as string}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => router.push("/settings/profile")}>
                    个人资料
                  </MenuItem>
                  <MenuItem onClick={() => router.push("/settings/account")}>
                    账号设置
                  </MenuItem>
                  <MenuItem onClick={() => signOut()}>退出</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                bgColor={"teal"}
                color={"white"}
                px={8}
                onClick={() => signIn()}
              >
                登录
              </Button>
            )}
          </div>
        </div>
      </header>
      <Divider />
      <main className="max-w-[1200px] min-w-[900px]">{children}</main>
    </div>
  );
}
