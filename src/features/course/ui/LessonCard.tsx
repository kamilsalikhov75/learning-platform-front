import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import { useAuth } from "entities/auth";
import type { Lesson } from "entities/course";
import { Link } from "react-router-dom";

export interface LessonCardProps {
  data: Lesson;
}

export const LessonCard = ({ data }: LessonCardProps) => {
  const { _id, title } = data;
  const { user } = useAuth();
  const isFinished = user?.finishedLessons.includes(_id);

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="20px">
      <SimpleGrid
        minChildWidth="120px"
        spacing="40px"
        alignItems="center"
        gap="16px"
      >
        <Heading as="h6" size="sm" gap="8px">
          {title} {isFinished && <CheckCircleIcon color="green" />}
        </Heading>
        <Button as={Link} to={`/lessons/${_id}`}>
          Перейти
        </Button>
      </SimpleGrid>
    </Box>
  );
};
