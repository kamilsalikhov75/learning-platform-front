import { Heading } from "@chakra-ui/react";
import { useCourses } from "entities/course";
import { CourseCard } from "features/course";

export const CoursesPage = () => {
  const { courses } = useCourses();
  return (
    <>
      <Heading>Список курсов</Heading>
      {courses?.map((course) => {
        return <CourseCard key={course._id} data={course} />;
      })}
    </>
  );
};
