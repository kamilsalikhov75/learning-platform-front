import { Flex, Heading } from "@chakra-ui/react";

export interface QuestionOptionProps {
  option: string;
  setAnswer?: (answer: string) => void;
  answer: string;
  editable?: boolean;
}

export const QuestionOption = ({
  option,
  answer,
  setAnswer,
  editable,
}: QuestionOptionProps) => {
  const toggleAnswer = () => {
    if (editable && setAnswer) {
      if (option === answer) {
        setAnswer("");
      } else {
        setAnswer(option);
      }
    }
  };
  return (
    <Flex
      onClick={editable ? toggleAnswer : undefined}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="20px"
      background={option === answer ? "green" : "transparent"}
    >
      <Heading as="h6" size="sm">
        {option}
      </Heading>
    </Flex>
  );
};
