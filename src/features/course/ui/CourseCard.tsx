import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Course } from "entities/course";
import { Link } from "react-router-dom";

export interface CourseCard {
  data: Course;
}

export const CourseCard = ({ data }: CourseCard) => {
  const { title, jobs, _id, lessons } = data;
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
        <Stack>
          <Text>Должности:</Text>
          <Flex gap="4px" flexWrap="wrap">
            {jobs.map((job) => {
              return <Badge key={job.title}>{job.title}</Badge>;
            })}
          </Flex>
        </Stack>
        <Text>Уроков: {lessons.length}</Text>
        <Stack>
          <Text>Действия:</Text>
          <Stack direction="row">
            <Button colorScheme="red">Удалить</Button>
            <Button as={Link} to={`/admin/courses/${_id}`}>
              Редактировать
            </Button>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Box>
  );
};
