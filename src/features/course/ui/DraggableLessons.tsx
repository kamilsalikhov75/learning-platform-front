import { setCourseLessons, useCourses } from "entities/course";
import { LessonCard } from "./LessonCard";
import { AnimatePresence, Reorder } from "framer-motion";

export const DraggableLessons = () => {
  const { currentCourse } = useCourses();
  console.log(currentCourse?.lessons);

  return (
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
  );
};
