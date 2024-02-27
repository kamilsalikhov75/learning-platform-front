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
import { createQuestionSchema } from "../../model/form-schemas";
import { createQuestion, useCourses } from "entities/course";
import { useEffect, useState } from "react";
import { QuestionOption } from "./QuestionOption";

interface CreateQuestionFormFields {
  title: string;
  options: string[];
  answer: string;
}

export const CreateQuestionForm = () => {
  const {
    register: fieldRegister,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CreateQuestionFormFields>({
    resolver: zodResolver(createQuestionSchema),
  });
  const { currentTest } = useCourses();
  const [variant, setVariant] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    setValue("options", options);
  }, [setValue, options]);

  useEffect(() => {
    setValue("answer", answer);
  }, [setValue, answer]);

  const resetForm = () => {
    reset();
    setAnswer("");
    setOptions([]);
    setVariant("");
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (currentTest?._id) {
          createQuestion({
            question: data,
            testId: currentTest?._id,
          });
          resetForm();
        }
      })}
    >
      <Stack gap="16px">
        <FormControl isInvalid={errors.title !== undefined}>
          <FormLabel>Создание вопроса</FormLabel>
          <Input
            variant="flushed"
            placeholder="Введите вопрос"
            {...fieldRegister("title")}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <Stack>
          <Stack direction="row">
            <Input
              variant="flushed"
              placeholder="Вариант ответа"
              value={variant}
              onChange={(event) => {
                setVariant(event.target.value);
              }}
            />
            <Button
              onClick={() => {
                if (variant) {
                  if (options.includes(variant)) {
                    return;
                  }

                  setOptions([...options, variant]);
                }
              }}
              w="100%"
            >
              Добавить вариант ответа
            </Button>
          </Stack>
          {options?.map((option) => {
            return (
              <QuestionOption
                editable
                answer={answer}
                setAnswer={setAnswer}
                option={option}
                key={option}
              />
            );
          })}
        </Stack>

        <Button w="100%" type="submit" marginBottom="20px" borderRadius="20px">
          Создать вопрос
        </Button>
      </Stack>
    </form>
  );
};
