import { db } from "../../../firebase";
import {
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Header } from "../../../src/components/atoms/Header";
import { Footer } from "../../../src/components/molecules/Footer";
import { Todo } from "../../../src/hooks/useTodo";
import { todosState } from "../../../src/recoilState/todosState";
import { deleteDoc, doc } from "firebase/firestore";

const Home: NextPage = () => {
  const auth = getAuth();
  const router = useRouter();
  const todos = useRecoilValue(todosState);
  const [todo, setTodo] = useState<Todo | null>(null);
  const id = router.query.id;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const todo = todos.find((todo: Todo) => todo.id === id);
        setTodo(todo);
      } else {
        router.push("/signin");
      }
    });
  }, [auth]);

  const onClickDelete = async () => {
    todo && (await deleteDoc(doc(db, "todos", todo.id)));
    router.push("/todos");
  };

  return (
    <>
      {todo !== null && (
        <Grid minHeight="100vh" w="100%" gap={5}>
          <GridItem bg="gray.100" rowSpan={1}>
            <Header />
          </GridItem>
          <Container>
            <Grid gap={5}>
              <GridItem>
                <Stack borderWidth={1} borderRadius="xl" spacing={3} p={5}>
                  <Heading>タイトル</Heading>
                  <Text borderWidth={1} p={2} shadow="md">
                    {todo.title}
                  </Text>
                  <Heading>内容</Heading>
                  <Text borderWidth={1} h={300} p={2} shadow="md">
                    {todo.content}
                  </Text>
                  <HStack spacing={3}>
                    <Button colorScheme="green" mr="auto">
                      {todo.status}
                    </Button>
                    <Button colorScheme="red" onClick={onClickDelete}>
                      削除
                    </Button>
                    <Button
                      colorScheme="orange"
                      onClick={() =>
                        router.push({
                          query: { todo: todo.id },
                          pathname: `/todos/${todo.id}/edit`,
                        })
                      }
                    >
                      編集
                    </Button>
                  </HStack>
                </Stack>
              </GridItem>
            </Grid>
          </Container>
          <GridItem bg="gray.400" rowSpan={1}>
            <Footer auth={auth} />
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default Home;
