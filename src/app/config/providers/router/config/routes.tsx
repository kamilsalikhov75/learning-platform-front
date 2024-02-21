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
  TestsPage as AdminTestsPage,
  HomePage as AdminHomePage,
  CoursePage as AdminCoursePage,
  LessonPage as AdminLessonPage,
} from "pages/admin";

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
            path: "tests",
            element: <AdminTestsPage />,
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
