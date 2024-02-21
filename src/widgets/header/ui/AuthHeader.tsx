import { Flex } from "@chakra-ui/react";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";

const AuthHeader = () => {
  return (
    <Flex
      as="header"
      w="100%"
      justifyContent="center"
      gap="20px"
      padding="20px"
    >
      <ThemeSwitcher type="icon" />
    </Flex>
  );
};

export { AuthHeader };
