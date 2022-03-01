import "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { MouseEventHandler, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
  toast,
} from "@chakra-ui/react";
import { useMessage } from "../hooks/useMessage";
import { useRouter } from "next/router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const auth = getAuth();
  const { showMessage } = useMessage();
  const router = useRouter();

  const onClickSignIn:MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        showMessage({
          title: "サクセス",
          description: "サインインしました",
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
          description: "サインインできません",
          status: "error",
          onCloseComplete: () => {
            return;
          },
        });
      });
  };

  const handleShowClick = () => setShowPassword(!showPassword);

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
        <Avatar bg="green.500" />
        <Heading color="green.400">サインイン</Heading>
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
                  <InputLeftElement pointerEvents="none" />
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
                  <InputLeftElement pointerEvents="none" color="gray.300" />
                  <Input
                    value={password}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
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
            </Stack>
          </form>
        </Box>
      </Stack>
      <Link color="green.500" href="/signup">
        新規登録しますか？
      </Link>
    </Flex>
  );
};

export default SignIn;
