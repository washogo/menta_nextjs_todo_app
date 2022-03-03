import { db } from "../firebase";
import { Progress } from "@chakra-ui/react";
import { getAuth, getRedirectResult } from "firebase/auth";
import { useRouter } from "next/router";
import { useUser } from "../src/hooks/useUser";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

const Loading = () => {
  const auth = getAuth();
  const router = useRouter();
  const { newUser, updatedUser } = useUser();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result !== null) {
          const user = result.user;
          onSnapshot(doc(db, "users", user.uid), (doc) => {
            const data = doc.data();
            if (data) {
              updatedUser({ id: user.uid, name: user.displayName });
              router.push("/mypage");
            } else {
              newUser({ id: user.uid, name: user.displayName });
              router.push("/");
            }
          });
        }
      })
      .catch((error) => {
        console.log("error");
        router.push("/signup");
      });
  }, [auth]);

  return <Progress size="lg" isIndeterminate={true} />;
};

export default Loading;
