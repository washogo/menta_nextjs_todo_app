import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { MouseEventHandler, useEffect, useState } from "react";
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
import { ImGoogle3 } from "react-icons/im";
import { useRouter } from "next/router";

import { useMessage } from "../src/hooks/useMessage";
import { Header } from "../src/components/atoms/Header";
import { useUser } from "../src/hooks/useUser";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const router = useRouter();
  const { showMessage } = useMessage();
  const GoogleProvider = new GoogleAuthProvider();
  const { newUser } = useUser();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        if (currentUser !== null) {
          showMessage({
            title: "警告",
            description: "ログインしています",
            status: "warning",
          });
        } else {
          return;
        }
      }
      else{
        return;
      }
    })
  }, [auth]);

  const onClickSignUp: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (password.length >= 8 && name !== "") {
      console.log("push")
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          const id = user.uid;
          newUser({ id: id, name });
          router.push("/mypage");
          // ...
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

  const onClickGoogleSignUp: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    signInWithRedirect(auth, GoogleProvider);
    router.push("/loading");
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick: MouseEventHandler<HTMLButtonElement> = () =>
    setShowPassword(!showPassword);

  return (
    <>
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
                        placeholder="Nick Name"
                        onChange={(e) => setName(e.target.value)}
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
                    disabled={!name || !email || !password}
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
      </VStack>
    </>
  );
};

export default SignUp;
