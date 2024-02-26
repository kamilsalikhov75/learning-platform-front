import { Flex, Heading, Stack } from "@chakra-ui/react";
import { getCourse, getCourseLessons, useCourses } from "entities/course";
import { CreateLessonForm, DraggableLessons } from "features/course";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const CoursePage = () => {
  const { currentCourse } = useCourses();
  const { courseId } = useParams();

  useEffect(() => {
    if (courseId) {
      getCourse(courseId);
      getCourseLessons(courseId);
    }
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
