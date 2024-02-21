import { Flex, Heading, Stack } from "@chakra-ui/react";
import { useCourses } from "entities/course";
import { CreateLessonForm, DraggableLessons } from "features/course";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const CoursePage = () => {
  const { currentCourse } = useCourses();
  const { courseId } = useParams();

  useEffect(() => {
    console.log(`fetch to course with ${courseId} id`);
  }, [courseId]);

  return (
    <>
      <Flex gap="16px">
        <Heading as="h3" size="lg">
          {currentCourse?.title}
        </Heading>
      </Flex>
      <CreateLessonForm />
      <Stack>
        <Heading as="h4" size="md">
          Уроки
        </Heading>
        <DraggableLessons />
      </Stack>
    </>
  );
};
