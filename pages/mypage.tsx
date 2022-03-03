import { Badge, Box } from "@chakra-ui/react";
import { db } from "../firebase";
import {
  doc,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Header } from "../src/components/atoms/Header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useMessage } from "../src/hooks/useMessage";

type User = {
  id: string;
  name: string;
  timestamp: string;
};

const MyPage = () => {
  const [user, setUser] = useState<User>({ id: "", name: "", timestamp: "" });
  const auth = getAuth();

  const { showMessage } = useMessage();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(doc(db, "users", user.uid), (doc) => {
          const data = doc.data();
          if (data) {
            setUser({
              id: user.uid,
              name: data.name,
              timestamp: data.timestamp,
            });
          }
        });
        // const docRef = doc(db, "users", user.uid);
        // const docSnap = await getDoc(docRef);
        // if (docSnap.exists()) {
        //   const data = docSnap.data();
        //   setUser({
        //     id: user.uid,
        //     name: data.name,
        //     timestamp: data.timestamp
        //   });
        // } else {
        // }
      }
    });
  }, [auth]);

  console.log(user);

  return (
    <>
      <Header />
      {user && (
        <Box maxW="lg" borderWidth="1px" borderRadius="lg">
          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge
                borderRadius="full"
                px="4"
                colorScheme="teal"
                fontSize="md"
              >
                {user.id}
              </Badge>
            </Box>
            <Box
              mt="1"
              fontWeight="semibold"
              fontSize="50px"
              lineHeight="tight"
            >
              {user.name}
            </Box>
            <Box display="flex" mt="2" alignItems="center">
              <Box as="span" ml="2" color="gray.600" fontSize="xl">
                最終ログイン日：{user.timestamp}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default MyPage;
