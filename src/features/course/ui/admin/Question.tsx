import { Button, Heading, Stack } from "@chakra-ui/react";
import {
  Question as IQuestion,
  deleteQuestion,
  useCourses,
} from "entities/course";
import { QuestionOption } from "./QuestionOption";

export interface QuestionProps {
  question: IQuestion;
}

export const Question = ({ question }: QuestionProps) => {
  const { currentTest } = useCourses();

  const onQuestionDelete = () => {
    if (currentTest) {
      deleteQuestion({
        questionId: question._id,
        testId: currentTest?._id,
      });
    }
  };

  return (
    <Stack>
      <Heading as="h5" size="md">
        {question.title} <Button onClick={onQuestionDelete}>Удалить</Button>
      </Heading>
      <Stack>
        {question.options.map((option) => {
          return (
            <QuestionOption
              key={option}
              answer={question.answer}
              option={option}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
