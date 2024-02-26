import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import type { Course } from "entities/course";
import { Link } from "react-router-dom";

export interface CourseCardProps {
  data: Course;
}

export const CourseCard = ({ data }: CourseCardProps) => {
  const { _id, title } = data;
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="20px">
      <SimpleGrid
        minChildWidth="120px"
        spacing="40px"
        alignItems="center"
        gap="16px"
      >
        <Heading as="h6" size="sm">
          {title}
        </Heading>
        <Button as={Link} to={`/courses/${_id}`}>
          Перейти
        </Button>
      </SimpleGrid>
    </Box>
  );
};
