import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PhoneInput } from "shared/ui/PhoneInput";
import { loginSchema } from "../model/form-schemas";
import { login } from "entities/auth";

interface LoginFormFields {
  phone: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register: fieldRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        login({ username: data.phone, password: data.password });
      })}
      style={{ width: "100%", maxWidth: "500px" }}
    >
      <FormLabel marginBottom="50px">
        <Heading>Авторизация</Heading>
      </FormLabel>
      <FormControl isInvalid={errors.phone !== undefined}>
        <PhoneInput
          variant="flushed"
          placeholder="Номер телефона"
          marginBottom="20px"
          {...fieldRegister("phone")}
        />
        <FormErrorMessage>
          {errors.phone && errors.phone.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password !== undefined}>
        <Input
          variant="flushed"
          placeholder="Пароль"
          marginBottom="20px"
          type="password"
          {...fieldRegister("password")}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button w="100%" type="submit" marginBottom="20px" borderRadius="20px">
        Войти
      </Button>
      <Button borderRadius="20px" as={Link} to={"/auth/register"} w="100%">
        Регистрация
      </Button>
    </form>
  );
};
