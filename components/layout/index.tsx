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

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col items-center">
      <header className="max-w-[1200px] min-w-[900px] flex items-center justify-between p-2 gap-2">
        <Image src={logo} alt="logo" width={48} height={48} />
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
      </header>
      <Divider />
      <main className="max-w-[1200px] min-w-[900px]">{children}</main>
    </div>
  );
}
