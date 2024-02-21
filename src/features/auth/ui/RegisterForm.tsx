import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PhoneInput } from "shared/ui/PhoneInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../model/form-schemas";
import { Sex } from "entities/auth";

interface RegisterFormFields {
  firstName: string;
  lastName: string;
  surName: string;
  sex: Sex;
  job: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

export const RegisterForm = () => {
  const {
    register: fieldRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
  });

  console.log(fieldRegister("job"));

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      style={{ width: "100%", maxWidth: "500px" }}
    >
      <FormLabel marginBottom="50px">
        <Heading>Регистрация</Heading>
      </FormLabel>
      <Stack gap="16px">
        <FormControl isInvalid={errors.lastName !== undefined}>
          <Input
            variant="flushed"
            placeholder="Фамилия"
            {...fieldRegister("lastName")}
          />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.firstName !== undefined}>
          <Input
            variant="flushed"
            placeholder="Имя"
            {...fieldRegister("firstName")}
          />
          <FormErrorMessage>
            {errors.firstName && errors.firstName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.surName !== undefined}>
          <Input
            variant="flushed"
            placeholder="Отчество"
            {...fieldRegister("surName")}
          />
          <FormErrorMessage>
            {errors.surName && errors.surName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.sex !== undefined}>
          <FormLabel>Ваш пол</FormLabel>
          <RadioGroup>
            <Stack direction="row">
              <Radio {...fieldRegister("sex")} value={Sex.Male}>
                Мужской
              </Radio>
              <Radio {...fieldRegister("sex")} value={Sex.Female}>
                Женский
              </Radio>
            </Stack>
          </RadioGroup>
          <FormErrorMessage>
            {errors.sex && errors.sex.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.job !== undefined}>
          <FormLabel>Ваша должность</FormLabel>
          <Select placeholder="Выберите должность" {...fieldRegister("job")}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <FormErrorMessage>
            {errors.job && errors.job.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.phone !== undefined}>
          <PhoneInput
            variant="flushed"
            placeholder="Номер телефона"
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
            type="password"
            {...fieldRegister("password")}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.passwordConfirm !== undefined}>
          <Input
            variant="flushed"
            placeholder="Повторите пароль"
            type="password"
            {...fieldRegister("passwordConfirm")}
          />
          <FormErrorMessage>
            {errors.passwordConfirm && errors.passwordConfirm.message}
          </FormErrorMessage>
        </FormControl>
        <Button w="100%" type="submit" borderRadius="20px">
          Зарегистрироваться
        </Button>
        <Button borderRadius="20px" as={Link} to={"/auth/login"} w="100%">
          Авторизация
        </Button>
      </Stack>
    </form>
  );
};
