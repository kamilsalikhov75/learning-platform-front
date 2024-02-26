import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createJobSchema } from "../model/formSchemas";
import { useEffect } from "react";
import { createJob, getJobs } from "entities/job";

interface CreateJobFormFields {
  title: string;
}

export const CreateJobForm = () => {
  const {
    register: fieldRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateJobFormFields>({
    resolver: zodResolver(createJobSchema),
  });

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        createJob(data);
      })}
    >
      <Stack>
        <Flex gap="16px" alignItems="center">
          <FormControl isInvalid={errors.title !== undefined}>
            <FormLabel>Название должности</FormLabel>
            <Input
              variant="flushed"
              placeholder="Введите название должности"
              {...fieldRegister("title")}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>

        <Button type="submit">Создать должность</Button>
      </Stack>
    </form>
  );
};
