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
import { useCourses } from "entities/course";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { TextEditor } from "shared/ui/TextEditor";
import { editLessonSchema } from "../model/form-schemas";

interface EditLessonFormFields {
  title: string;
  html: string;
}

export const EditLessonForm = () => {
  const { currentLesson } = useCourses();
  const { lessonId } = useParams();
  const {
    control,
    register: fieldRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<EditLessonFormFields>({
    defaultValues: { title: currentLesson?.title, html: currentLesson?.html },
    resolver: zodResolver(editLessonSchema),
  });

  useEffect(() => {
    console.log(`fetch to lesson with ${lessonId} id`);
  }, [lessonId]);

  console.log(errors);

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Stack>
          <Flex gap="16px" alignItems="center">
            <FormControl isInvalid={errors.title !== undefined}>
              <FormLabel>Название урока</FormLabel>
              <Input
                variant="flushed"
                placeholder="Введите название урока"
                {...fieldRegister("title")}
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>

            <Button type="submit">Сохранить</Button>
          </Flex>
          <FormControl isInvalid={errors.html !== undefined}>
            <Controller
              control={control}
              name="html"
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <TextEditor
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                );
              }}
            />
            <FormErrorMessage>
              {errors.html && errors.html.message}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit">Сохранить</Button>
        </Stack>
      </form>
    </>
  );
};
