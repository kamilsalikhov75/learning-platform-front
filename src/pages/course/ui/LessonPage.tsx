import { Button, Heading, Stack } from "@chakra-ui/react";
import { updateMe, useAuth } from "entities/auth";
import {
  getCourse,
  getCourseLessons,
  getLesson,
  useCourses,
} from "entities/course";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { HTML } from "shared/ui/HTML";

export const LessonPage = () => {
  const { lessonId } = useParams();
  const { user } = useAuth();
  const { currentLesson, lessons, currentCourse } = useCourses();
  const currentLessonIndex = lessons?.findIndex((lesson) => {
    return lesson._id === currentLesson?._id;
  });

  const isFirstLesson = currentLessonIndex === 0;
  const isLastLesson = lessons && currentLessonIndex === lessons?.length - 1;

  const isFinished = lessonId && user?.finishedLessons.includes(lessonId);

  useEffect(() => {
    if (lessonId) {
      getLesson(lessonId);
    }
  }, [lessonId]);

  useEffect(() => {
    if (!lessons && currentLesson) {
      getCourseLessons(currentLesson?.course);
    }
  }, [lessons, currentLesson]);

  useEffect(() => {
    if (!currentCourse && currentLesson) {
      getCourse(currentLesson?.course);
    }
  }, [currentCourse, currentLesson]);

  const finishLesson = () => {
    if (isFinished) {
      return;
    }

    if (user?.finishedLessons && currentLesson) {
      updateMe({
        finishedLessons: [...user.finishedLessons, currentLesson._id],
      });
    } else if (currentLesson) {
      updateMe({
        finishedLessons: [currentLesson._id],
      });
    }
  };

  return (
    <>
      <Heading>{currentLesson?.title}</Heading>
      {currentLesson?.html && <HTML html={currentLesson?.html} />}
      <Stack direction="row">
        {lessons &&
          currentLessonIndex !== undefined &&
          currentLessonIndex >= 0 && (
            <>
              {!isFirstLesson && (
                <Button
                  to={`/lessons/${lessons[currentLessonIndex - 1]._id}`}
                  as={Link}
                >
                  Назад
                </Button>
              )}
              {!isLastLesson && (
                <Button
                  to={`/lessons/${lessons[currentLessonIndex + 1]._id}`}
                  as={Link}
                  onClick={finishLesson}
                >
                  Вперед
                </Button>
              )}
              {isLastLesson && (
                <Button
                  onClick={finishLesson}
                  to={`/tests/${currentCourse?.test}`}
                  as={Link}
                >
                  Перейти к тесту
                </Button>
              )}
            </>
          )}
      </Stack>
    </>
  );
};
