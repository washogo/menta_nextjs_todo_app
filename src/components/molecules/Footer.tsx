import {
  Flex,
  Link,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

type Props = {
  auth: any
}

export const Footer = (props: Props) => {
  const router = useRouter();
  const { auth } = props;

  const onClickSignOut = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    signOut(auth).then(() => {
      router.push("/signin")
    })
  }

  return (
    <Flex my={10} justifyContent="space-around">
      <Link href="/mypage" cursor="pointer">
        マイページ
      </Link>
      <Link href="/todos" cursor="pointer">
        TODOページ
      </Link>
      <Link href="/mypage" cursor="pointer" onClick={onClickSignOut}>
        ログアウト
      </Link>
    </Flex>
  );
};
