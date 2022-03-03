import "../firebase";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
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
  VStack,
} from "@chakra-ui/react";

import { useMessage } from "../src/hooks/useMessage";
import { useRouter } from "next/router";
import { ImGoogle3 } from "react-icons/im";
import { Header } from "../src/components/atoms/Header";
import { useUser } from "../src/hooks/useUser";

const SignIn = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const auth = getAuth();
  const { showMessage } = useMessage();
  const router = useRouter();
  const GoogleProvider = new GoogleAuthProvider();
  const { logInUser} = useUser();

  const onClickSignIn: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user.uid !== id) {
            signOut(auth).then(() => {
              showMessage({
                title: "エラー",
                description: "正しいidを入力してください",
                status: "error",
              });
            });
            return;
          }
          logInUser({ id: user.uid });
          showMessage({
            title: "サクセス",
            description: "ログインしました",
            status: "success",
            onCloseComplete: () => {
              router.push("/mypage");
            },
          });
          // ...
        })
        .catch((error) => {
          showMessage({
            title: "エラー",
            description: "ログインできません",
            status: "error",
          });
        });
    });
  };

  const onClickGoogleSignIn: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    signInWithRedirect(auth, GoogleProvider);
    router.push("/loading");
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <VStack alignItems="left" backgroundColor="gray.200">
      <Header />
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="green.500" />
          <Heading color="green.400">ログイン</Heading>
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
                      value={id}
                      type="text"
                      placeholder="Id"
                      onChange={(e) => setId(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      value={email}
                      type="email"
                      placeholder="Email Address"
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
                        {showPassword ? "非表示" : "表示"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="green"
                  width="full"
                  onClick={onClickSignIn}
                >
                  ログイン
                </Button>
                <Flex>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="green"
                    width="full"
                    onClick={onClickGoogleSignIn}
                  >
                    <Icon as={ImGoogle3} w={6} h={6} />
                  </Button>
                </Flex>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Link color="green.500" href="/signup">
          新規登録はこちら
        </Link>
      </Flex>
    </VStack>
  );
};

export default SignIn;
