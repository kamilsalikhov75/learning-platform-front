import { Heading, Stack } from "@chakra-ui/react";
import { getRecommendedCourses, useCourses } from "entities/course";
import { CourseCard } from "features/course";
import { useEffect } from "react";

export const HomePage = () => {
  const { courses } = useCourses();

  useEffect(() => {
    getRecommendedCourses();
  }, []);

  return (
    <>
      <Heading>Рекомендованные курсы</Heading>
      <Stack>
        {courses?.map((course) => {
          return <CourseCard key={course._id} data={course} />;
        })}
      </Stack>
    </>
  );
};
