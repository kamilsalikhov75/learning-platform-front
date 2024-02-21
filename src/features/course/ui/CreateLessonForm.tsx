import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createLessonSchema } from "../model/form-schemas";

interface CreateLessonFormFields {
  title: string;
}

export const CreateLessonForm = () => {
  const {
    register: fieldRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLessonFormFields>({
    resolver: zodResolver(createLessonSchema),
  });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <Stack gap="16px">
        <FormControl isInvalid={errors.title !== undefined}>
          <FormLabel>Создание урока</FormLabel>
          <Input
            variant="flushed"
            placeholder="Введите название урока"
            {...fieldRegister("title")}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <Button w="100%" type="submit" marginBottom="20px" borderRadius="20px">
          Создать урок
        </Button>
      </Stack>
    </form>
  );
};
