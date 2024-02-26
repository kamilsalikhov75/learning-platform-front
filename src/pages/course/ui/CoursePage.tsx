import { Heading, Stack } from "@chakra-ui/react";
import { getCourse, getCourseLessons, useCourses } from "entities/course";
import { LessonCard } from "features/course";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const CoursePage = () => {
  const { courseId } = useParams();
  const { currentCourse, lessons } = useCourses();

  useEffect(() => {
    if (courseId) {
      getCourse(courseId);
      getCourseLessons(courseId);
    }
  }, [courseId]);

  return (
    <>
      <Heading>{currentCourse?.title}</Heading>
      <Stack>
        {lessons?.map((lesson) => {
          return <LessonCard key={lesson._id} data={lesson} />;
        })}
      </Stack>
    </>
  );
};
