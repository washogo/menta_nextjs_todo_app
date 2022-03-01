import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Link href="/signin">
        <a>ログイン</a>
      </Link>
      <br/>
      <Link href="/signup">
        <a>新規登録</a>
      </Link>
      <br/>
      <Link href="/mypage">
        <a>マイページ</a>
      </Link>
    </>
  );
};

export default Home;
