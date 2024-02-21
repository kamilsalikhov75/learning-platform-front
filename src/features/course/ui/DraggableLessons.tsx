import { setCourseLessons, useCourses } from "entities/course";
import { LessonCard } from "./LessonCard";
import { AnimatePresence, Reorder } from "framer-motion";
import { Button, Flex, Text } from "@chakra-ui/react";

export const DraggableLessons = () => {
  const { currentCourse } = useCourses();

  return (
    <>
      <Flex alignItems="center" gap="4px">
        <Text fontSize="lg">
          Чтобы изменить порядок уроков перетаскивай блоки на нужное место
        </Text>
        <Button>Сохранить</Button>
      </Flex>
      <Reorder.Group
        as="div"
        axis="y"
        values={currentCourse?.lessons || []}
        onReorder={setCourseLessons}
      >
        <AnimatePresence>
          {currentCourse?.lessons.map((lesson) => {
            return <LessonCard key={lesson._id} data={lesson} />;
          })}
        </AnimatePresence>
      </Reorder.Group>
    </>
  );
};
