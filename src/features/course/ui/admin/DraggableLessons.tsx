import {
  setCourseLessons,
  updateLessonsOrder,
  useCourses,
} from "entities/course";
import { AdminLessonCard } from "./LessonCard";
import { AnimatePresence, Reorder } from "framer-motion";
import { Button, Flex, Text } from "@chakra-ui/react";

export const DraggableLessons = () => {
  const { lessons } = useCourses();

  return (
    <>
      <Flex alignItems="center" gap="4px">
        <Text fontSize="lg">
          Чтобы изменить порядок уроков перетаскивай блоки на нужное место
        </Text>
        <Button
          onClick={() => {
            if (lessons) {
              updateLessonsOrder({ lessons });
            }
          }}
        >
          Сохранить порядок
        </Button>
      </Flex>
      <Reorder.Group
        as="div"
        axis="y"
        values={lessons || []}
        onReorder={setCourseLessons}
      >
        <AnimatePresence>
          {lessons?.map((lesson) => {
            return <AdminLessonCard key={lesson._id} data={lesson} />;
          })}
        </AnimatePresence>
      </Reorder.Group>
    </>
  );
};
