import { Heading } from "@chakra-ui/react";
import { getCourses, useCourses } from "entities/course";
import { AdminCourseCard } from "features/course";
import { useEffect } from "react";

export const CoursesPage = () => {
  const { courses } = useCourses();

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <Heading>Список курсов</Heading>
      {courses?.map((course) => {
        return <AdminCourseCard key={course._id} data={course} />;
      })}
    </>
  );
};
