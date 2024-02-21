import { Heading } from "@chakra-ui/react";
import { CreateCourseForm } from "features/course";

export const HomePage = () => {
  return (
    <>
      <Heading as="h4" size="md">
        Создание курса
      </Heading>
      <CreateCourseForm />
    </>
  );
};
