import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Header } from "../src/components/atoms/Header";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Footer } from "../src/components/molecules/Footer";
import { useRouter } from "next/router";
import { ActiveButton } from "../src/components/atoms/ActiveButton";

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
  const router = useRouter();

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
      } else {
        router.push("/signin");
      }
    });
  }, [auth]);

  const onClickEdit = () => {
    setIsEdit(true);
  };

  const onClickChangeName = async () => {
    const docRef = doc(db, "users", user.id);
    await updateDoc(docRef, {
      name: name,
    });
    setIsEdit(false);
  };

  return (
    <Grid h="100vh" w="100%" gap={10}>
      <GridItem bg="gray.100" rowSpan={1}>
        <Header />
      </GridItem>
      <GridItem rowSpan={10}>
        <Container>
          {user && (
            <Box maxW="lg" borderWidth="1px" borderRadius="lg">
              <Box p={6}>
                <Box display="flex" alignItems="baseline">
                  <Badge
                    borderRadius="full"
                    px={4}
                    colorScheme="teal"
                    fontSize="md"
                  >
                    {user.id}
                  </Badge>
                </Box>
                <Box
                  mt={1}
                  fontWeight="semibold"
                  fontSize="50px"
                  lineHeight="tight"
                >
                  {user.name}
                </Box>
                <Box display="flex" mt={2} alignItems="center">
                  <Box as="span" ml={2} color="gray.600" fontSize="xl">
                    最終ログイン日：{user.timestamp}
                  </Box>
                </Box>
                <Box mt={2} textAlign="end">
                  <Button colorScheme="teal" onClick={onClickEdit}>
                    編集する
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
          {isEdit && (
            <Box mt={5} w="50%" borderWidth="1px" borderRadius="lg">
              <FormControl p={6}>
                <FormLabel htmlFor="name" fontSize="xl">
                  Nick Name
                </FormLabel>
                <InputGroup>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
                <Flex justifyContent="end" mt={2}>
                  <ActiveButton
                    onClick={onClickChangeName}
                    me={1}
                    disabled={!name}
                  >
                    編集
                  </ActiveButton>
                  <Button
                    colorScheme="gray"
                    variant="outline"
                    onClick={() => setIsEdit(false)}
                  >
                    戻す
                  </Button>
                </Flex>
              </FormControl>
            </Box>
          )}
        </Container>
      </GridItem>
      <GridItem bg="gray.400" rowSpan={1}>
        <Footer auth={auth} />
      </GridItem>
    </Grid>
  );
};

export default MyPage;
