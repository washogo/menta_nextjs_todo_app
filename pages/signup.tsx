import { db } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { MouseEventHandler, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { ImGoogle3 } from "react-icons/im";
import { useRouter } from "next/router";

import { useMessage } from "../hooks/useMessage";
import { useAuthState } from "../hooks/useAuthState";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const router = useRouter();
  const { showMessage } = useMessage();
  const { GoogleProvider } = useAuthState();

  const onClickSignUp: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (password.length >= 8 && name !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const id = user.uid;
          router.push("/mypage");
          // ...
          newUser(id);
        })
        .catch((error) => {
          showMessage({
            title: "エラー",
            description: "登録できません",
            status: "error",
          });
        });
    } else if (password.length < 8) {
      showMessage({
        title: "警告",
        description: "8文字以上にしてください",
        status: "warning",
      });
    }
  };

  const newUser = async (id: string) => {
    await setDoc(doc(db, "users", id), {
      username: name,
      password: password,
    });
  };

  const onClickGoogleSignUp: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    signInWithRedirect(auth, GoogleProvider);
    router.push("/");
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick: MouseEventHandler<HTMLButtonElement> = () =>
    setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">新規登録</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <Input
                    value={name}
                    type="text"
                    placeholder="nick name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    value={email}
                    type="email"
                    placeholder="email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    value={password}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "表示" : "非表示"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={onClickSignUp}
              >
                サインアップ
              </Button>
              <Flex>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  onClick={onClickGoogleSignUp}
                >
                  <Icon as={ImGoogle3} w={6} h={6} />
                </Button>
              </Flex>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Link color="teal.500" href="/signin">
        ログインはこちら
      </Link>
    </Flex>
  );
};

export default SignUp;
