import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { createCourseSchema } from "../model/form-schemas";
import { Select } from "chakra-react-select";

interface CreateCourseFormFields {
  title: string;
  jobs: string[];
}

export const CreateCourseForm = () => {
  const {
    control,
    register: fieldRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCourseFormFields>({
    resolver: zodResolver(createCourseSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <Stack gap="16px">
        <FormControl isInvalid={errors.title !== undefined}>
          <FormLabel>Название курса</FormLabel>
          <Input
            variant="flushed"
            placeholder="Введите название курса"
            {...fieldRegister("title")}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.jobs !== undefined}>
          <FormLabel>Для кого предназначен курс?</FormLabel>
          <Controller
            control={control}
            name="jobs"
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                isMulti
                onBlur={onBlur}
                variant="flushed"
                placeholder="Выберите должности"
                onChange={onChange}
                value={value}
              />
            )}
          />
          <FormErrorMessage>
            {errors.jobs && errors.jobs.message}
          </FormErrorMessage>
        </FormControl>
        <Button w="100%" type="submit" marginBottom="20px" borderRadius="20px">
          Создать курс
        </Button>
      </Stack>
    </form>
  );
};
