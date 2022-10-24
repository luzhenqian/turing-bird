import { Text } from "@chakra-ui/react";
import Image from "next/image";
import logo from "public/images/logo.png";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function SignInLayout({ children }: Props) {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-900">
      <header className="flex items-center justify-center w-full">
        <div className="max-w-[1200px] min-w-[900px] flex items-center justify-between py-2 gap-2">
          <Link href="/">
            <Image src={logo} alt="logo" width={48} height={48} />
          </Link>
          <Text fontSize={"xl"} fontWeight={"bold"} color="gray.50">
            图灵鸟社区
          </Text>
        </div>
      </header>

      <main className="flex items-center justify-center flex-1">
        {children}
      </main>
    </div>
  );
}
