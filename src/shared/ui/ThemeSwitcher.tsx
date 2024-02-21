import { Button, IconButton, Switch, useColorMode } from "@chakra-ui/react";
import { FC } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
interface ThemeSwitcherProps {
  width?: string;
  type?: "button" | "switch" | "icon";
}
const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { width, type = "button" } = props;
  switch (type) {
    case "button":
      return (
        <Button onClick={toggleColorMode} width={width}>
          Сменить тему
        </Button>
      );
    case "switch":
      return <Switch onChange={toggleColorMode} width={width} />;
    case "icon":
      return (
        <IconButton
          isRound={true}
          aria-label={"Сменить тему"}
          icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
          onClick={toggleColorMode}
          width={width}
        />
      );
  }
};

export { ThemeSwitcher };
