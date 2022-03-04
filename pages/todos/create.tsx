import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
} from "@chakra-ui/react";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../src/components/atoms/Header";
import { Footer } from "../../src/components/molecules/Footer";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { ActiveButton } from "../../src/components/atoms/ActiveButton";
import { Timestamp } from "../../src/utils/timestamp";

const Create = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const { currentTime } = Timestamp();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return;
      } else {
        router.push("/signin");
      }
    });
  }, [auth]);

  const onClickSaved = async() => {
    if(currentUser === null) {
      router.push("/signin");
    } else {
      await addDoc(collection(db, "todos"), {
        userId: currentUser.uid,
        title,
        content,
        status,
        createdAt: currentTime,
        updatedAt: currentTime,
      })
      setTitle("")
      setContent("")
      setStatus("")
    }
  }

  return (
    <Grid minHeight="100vh" w="100%" gap={5}>
      <GridItem bg="gray.100" rowSpan={1}>
        <Header />
      </GridItem>
      <Container>
        <Grid gap={5}>
          <GridItem>
            <FormControl>
              <FormLabel htmlFor="title" fontSize="2xl">
                TITLE
              </FormLabel>
              <Input
                h={50}
                id="title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel htmlFor="content" fontSize="2xl">
                CONTENT
              </FormLabel>
              <Input
                h={200}
                id="content"
                type="text"
                verticalAlign="top"
                as="textarea"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <Select
              placeholder="status"
              fontWeight="bold"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              value={status}
            >
              <option value="完了">完了</option>
              <option value="途中">途中</option>
              <option value="未完了">未完了</option>
            </Select>
          </GridItem>
          <GridItem>
            <Flex justifyContent="end">
              <ActiveButton me={1} onClick={onClickSaved}>
                保存
              </ActiveButton>
              <Button colorScheme="gray" variant="outline">
                戻る
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
      <GridItem bg="gray.400" rowSpan={1}>
        <Footer auth={auth} />
      </GridItem>
    </Grid>
  );
};

export default Create;
