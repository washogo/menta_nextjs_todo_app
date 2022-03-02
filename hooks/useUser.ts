import { db } from "../firebase"
import { doc, setDoc } from "firebase/firestore";

type Props = {
  id: string;
  name?: string | null;
  email?: string;
};

export const useUser = () => {
  const newUser = async (props: Props) => {
    const { id, name, email } = props;
    await setDoc(doc(db, "users", id), {
      username: name,
      email: email,
    });
  };
  return { newUser };
}