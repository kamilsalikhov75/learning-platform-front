import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../ui/DashBoardLayout";
import { AuthLayout } from "../ui/AuthLayout";
import { LoginPage, RegisterPage } from "pages/auth";
import { HomePage } from "pages/home";
import { PrivateRoute } from "../ui/PrivateRoute";
import { ProfilePage } from "pages/profile";
import { AdminLayout } from "../ui/AdminLayout";
import {
  CoursesPage as AdminCoursesPage,
  AdminTestPage,
  HomePage as AdminHomePage,
  CoursePage as AdminCoursePage,
  LessonPage as AdminLessonPage,
  JobsPage as AdminJobsPage,
} from "pages/admin";
import { CoursePage, LessonPage } from "pages/course";

export const router = createBrowserRouter([
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "courses/:courseId",
        element: (
          <PrivateRoute>
            <CoursePage />
          </PrivateRoute>
        ),
      },
      {
        path: "lessons/:lessonId",
        element: (
          <PrivateRoute>
            <LessonPage />
          </PrivateRoute>
        ),
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <AdminHomePage />,
          },
          {
            path: "courses",
            children: [
              {
                path: "",
                element: <AdminCoursesPage />,
              },
              {
                path: ":courseId",
                element: <AdminCoursePage />,
              },
            ],
          },
          {
            path: "lessons/:lessonId",
            element: <AdminLessonPage />,
          },
          {
            path: "tests/:testId",
            element: <AdminTestPage />,
          },
          {
            path: "jobs",
            element: <AdminJobsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
