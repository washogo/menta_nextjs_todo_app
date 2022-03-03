import { db } from "../../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

import { Timestamp } from "../utils/timestamp";

type Props = {
  id: string;
  name?: string | null;
};

export const useUser = () => {
  const newUser = async (props: Props) => {
    const { id, name } = props;
    const { currentTime } = Timestamp();
    const docRef = doc(db, "users", id)
    await setDoc(docRef, {
      name: name,
      timestamp: currentTime,
    });
  };
  const updatedUser = async (props: Props) => {
    const { id, name } = props;
    const { currentTime } = Timestamp();
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, {
      name: name,
      timestamp: currentTime,
    });
  };
  return { newUser, updatedUser };
};
