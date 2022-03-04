import {
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Todo } from "../../hooks/useTodo";
import {
  searchState,
  selectState,
  sortState,
} from "../../recoilState/todosState";

type Props = {
  todos: Array<Todo>;
};

export const Operation = (props: Props) => {
  const setSortTodos = useSetRecoilState(sortState);
  const setSearchValue = useSetRecoilState(searchState);
  const setSelectValue = useSetRecoilState(selectState);
  const [value, setValue] = useState("");
  const { todos } = props;

  useEffect(() => {
    if (value === "1") {
      const mapTodos = todos.map((todo) => ({
        ...todo,
        updatedSeconds: Date.parse(todo.updatedAt),
      }));
      const newTodos = mapTodos.sort((a, b) => {
        if (a.updatedSeconds > b.updatedSeconds) {
          return -1;
        } else {
          return 1;
        }
      });
      setSortTodos(newTodos);
    } else if (value === "2") {
      setSortTodos([]);
    }
  }, [value]);

  const onChangeSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const onChangeSelect = (e: any) => {
    setSelectValue(e.target.value);
  }

  return (
    <HStack spacing={20} mx={10} my={5}>
      <RadioGroup onChange={setValue} value={value}>
        <Stack spacing={5} direction="row">
          <Radio colorScheme="teal.100" value="1">
            降順
          </Radio>
          <Radio colorScheme="teal.100" value="2">
            昇順
          </Radio>
        </Stack>
      </RadioGroup>
      <Input w="sm" onChange={onChangeSearch} />
      <Select w="sm" onChange={onChangeSelect} placeholder="Status">
        <option value="未完了">未完了</option>
        <option value="途中">途中</option>
        <option value="完了">完了</option>
      </Select>
    </HStack>
  );
};
