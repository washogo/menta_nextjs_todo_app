import {
  Grid,
  GridItem,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Header } from "../../src/components/atoms/Header";
import { Footer } from "../../src/components/molecules/Footer";
import { useEffect, useState } from "react";
import {
  searchState,
  selectState,
  sortState,
  todosState,
} from "../../src/recoilState/todosState";
import { useRecoilState, useRecoilValue } from "recoil";
import { Todo } from "../../src/types/TodoType";
import { Operation } from "../../src/components/organisms/Operation";

const Home: NextPage = () => {
  const [todos, setTodos] = useRecoilState<Array<Todo>>(todosState);
  const sortTodos = useRecoilValue<Array<Todo>>(sortState);
  const [sortedTodos, setSortedTodos] = useState<Array<Todo>>([]);

  const searchValue = useRecoilValue(searchState);
  const [searchedTodos, setSearchedTodos] = useState<Array<Todo>>([]);

  const selectValue = useRecoilValue(selectState);
  const [selectedTodos, setSelectedTodos] = useState<Array<Todo>>([]);

  const [isSorted, setIsSorted] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(db, "todos"),
          where("userId", "==", user.uid)
        );
        getDocs(q).then((snapshot) => {
          const arr = snapshot.docs.map((doc) => ({
            id: doc.id,
            userId: doc.data().userId,
            title: doc.data().title,
            content: doc.data().content,
            status: doc.data().status,
            createdAt: doc.data().createdAt,
            updatedAt: doc.data().updatedAt,
          }));
          setTodos(arr);
        });
      } else {
        router.push("/signin");
      }
    });
  }, [auth]);

  useEffect(() => {
    if (sortTodos.length > 0) {
      setIsSorted(true);
      setSortedTodos(sortTodos);
    } else {
      setIsSorted(false);
      setSortedTodos([]);
    }
  }, [sortTodos]);

  useEffect(() => {
    if (searchValue) {
      setIsSearched(true);
      const newTodos = todos.filter(
        (todo) => todo.title.indexOf(searchValue) > -1
      );
      setSearchedTodos(newTodos);
    } else {
      setIsSearched(false);
    }
  }, [searchValue]);

  useEffect(() => {
    if (selectValue !== "") {
      setIsSelected(true);
      const newTodos = todos.filter((todo) => todo.status === selectValue);
      setSelectedTodos(newTodos);
    } else {
      setIsSelected(false);
    }
  }, [selectValue]);

  return (
    <>
      <Grid h="100vh">
        <GridItem bg="gray.100" rowSpan={1}>
          <Header />
        </GridItem>
        <GridItem rowSpan={1}>
          <Operation todos={todos} />
        </GridItem>
        <GridItem rowSpan={10}>
          <Table size="lg">
            <Thead bg="teal.200">
              <Tr>
                <Th></Th>
                <Th>表題</Th>
                <Th>状態</Th>
                <Th>作成日</Th>
                <Th>更新日</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isSelected
                ? selectedTodos.map((todo, index) => (
                    <Tr key={todo.id}>
                      <Td
                        _hover={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            query: { id: todo.id },
                            pathname: `/todos/${todo.id}`,
                          })
                        }
                      >
                        {index + 1}
                      </Td>
                      <Td>{todo.title}</Td>
                      <Td>{todo.status}</Td>
                      <Td>{todo.createdAt}</Td>
                      <Td>{todo.updatedAt}</Td>
                    </Tr>
                  ))
                : isSearched
                ? searchedTodos.map((todo, index) => (
                    <Tr key={todo.id}>
                      <Td
                        _hover={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            query: { id: todo.id },
                            pathname: `/todos/${todo.id}`,
                          })
                        }
                      >
                        {index + 1}
                      </Td>
                      <Td>{todo.title}</Td>
                      <Td>{todo.status}</Td>
                      <Td>{todo.createdAt}</Td>
                      <Td>{todo.updatedAt}</Td>
                    </Tr>
                  ))
                : isSorted
                ? sortedTodos.map((todo, index) => (
                    <Tr key={todo.id}>
                      <Td
                        _hover={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            query: { id: todo.id },
                            pathname: `/todos/${todo.id}`,
                          })
                        }
                      >
                        {index + 1}
                      </Td>
                      <Td>{todo.title}</Td>
                      <Td>{todo.status}</Td>
                      <Td>{todo.createdAt}</Td>
                      <Td>{todo.updatedAt}</Td>
                    </Tr>
                  ))
                : todos.map((todo, index) => (
                    <Tr key={todo.id}>
                      <Td
                        _hover={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push({
                            query: { id: todo.id },
                            pathname: `/todos/${todo.id}`,
                          })
                        }
                      >
                        {index + 1}
                      </Td>
                      <Td>{todo.title}</Td>
                      <Td>{todo.status}</Td>
                      <Td>{todo.createdAt}</Td>
                      <Td>{todo.updatedAt}</Td>
                    </Tr>
                  ))}
            </Tbody>
          </Table>
        </GridItem>
        <GridItem bg="gray.400" rowSpan={1}>
          <Footer auth={auth} />
        </GridItem>
      </Grid>
    </>
  );
};

export default Home;
