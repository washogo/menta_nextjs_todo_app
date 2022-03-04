import { AddIcon } from "@chakra-ui/icons";
import { Flex, Heading } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Header = () => {
  const auth = getAuth();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, [auth]);

  return (
    <Flex my={10} ms={5} onClick={() => router.push("/todos")}>
      <Heading mr="auto">TODO APP</Heading>
      {isLogin && (
        <AddIcon
          w={7}
          h={7}
          my="auto"
          mr={10}
          onClick={() => router.push("/todos/create")}
        ></AddIcon>
      )}
    </Flex>
  );
};
