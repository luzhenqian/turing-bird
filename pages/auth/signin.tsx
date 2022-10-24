import { Button } from "@chakra-ui/react";
import { GithubIcon } from "components/icons";
import { Provider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import summerLandscape from "public/images/summer_landscape.png";

let icons = new Map();
icons.set("github", <GithubIcon w={6} h={6} />);

export default function SignIn({ providers }: { providers: Provider[] }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <Image src={summerLandscape} alt="error" width={400} height={400}></Image>
      <div className="ml-40">
        {Object.values(providers).map((provider) => (
          <Button
            key={provider.name}
            bgColor={"teal"}
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: router.query.callbackUrl as string,
              })
            }
            leftIcon={icons.get(provider.id)}
          >
            {provider.name} 登录
          </Button>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
