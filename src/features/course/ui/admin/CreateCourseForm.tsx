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
import { createCourseSchema } from "../../model/form-schemas";
import { JobsSelect } from "features/job";
import { Job } from "entities/job";
import { createCourse } from "entities/course";
import { useNavigate } from "react-router";

interface CreateCourseFormFields {
  title: string;
  jobs: Job[];
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
  const navigate = useNavigate();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const jobs = data.jobs.map((job) => job._id);
        createCourse({ title: data.title, jobs }).then((course) => {
          navigate(`/admin/courses/${course._id}`);
        });
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
              <JobsSelect
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
