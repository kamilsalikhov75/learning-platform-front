import { Center, Flex } from "@chakra-ui/react";
import { useAuth } from "entities/auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthHeader } from "widgets/header";

export const AuthLayout = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  });

  return (
    <Flex w="100vw" h="100vh" flexDirection="column" p="0 10px">
      <AuthHeader />
      <Center justifyContent="center" alignItems="center" h="100%">
        <Outlet />
      </Center>
    </Flex>
  );
};
