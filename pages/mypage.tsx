import {
  Badge,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Header } from "../src/components/atoms/Header";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type User = {
  id: string;
  name: string;
  timestamp: string;
};

const MyPage = () => {
  const [user, setUser] = useState<User>({ id: "", name: "", timestamp: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const auth = getAuth();

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
            setName(data.name);
          }
        });
      }
    });
  }, []);

  console.log(user.name);

  const onClickEdit = () => {
    setIsEdit(true);
  };

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
            <Button colorScheme="teal" onClick={onClickEdit}>
              編集する
            </Button>
          </Box>
        </Box>
      )}
      {isEdit && (
        <Box>
          <FormControl>
            <FormLabel htmlFor="name">Nick Name</FormLabel>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </Box>
      )}
    </>
  );
};

export default MyPage;
