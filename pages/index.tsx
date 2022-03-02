import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMessage } from "../hooks/useMessage";
import { useUser } from "../hooks/useUser";

const Home: NextPage = () => {
  const { showMessage } = useMessage();
  const router = useRouter();
  const { newUser } = useUser();

  useEffect(() => {
    // const auth = getAuth();
    // getRedirectResult(auth)
    //   .then((result: any) => {
    //     const user = result.user;
    //     newUser({ id: user.uid, name: user.displayName });
    //   })
    //   .catch((error) => {
    //     showMessage({
    //       title: "エラー",
    //       description: "ログインできません",
    //       status: "error",
    //       onCloseComplete: () => {
    //         router.push("/signup");
    //       },
    //     });
    //   });
  }, []);

  return (
    <>
      <Link href="/signin">
        <a>ログイン</a>
      </Link>
      <br />
      <Link href="/signup">
        <a>新規登録</a>
      </Link>
      <br />
      <Link href="/mypage">
        <a>マイページ</a>
      </Link>
    </>
  );
};

export default Home;
