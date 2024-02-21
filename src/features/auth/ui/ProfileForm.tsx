import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { PhoneInput } from "shared/ui/PhoneInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../model/form-schemas";
import { Sex, updateMe, useAuth } from "entities/auth";
import { useEffect, useId } from "react";
import { Job } from "entities/job";
import { JobsSelect } from "features/job";
interface ProfileFormFields {
  firstName: string;
  lastName: string;
  surName: string;
  sex: Sex;
  job: Job;
  phone: string;
  password: string;
}

export const ProfileForm = () => {
  const formId = useId();
  const { user } = useAuth();
  const {
    control,
    register: fieldRegister,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormFields>({
    defaultValues: { ...user },
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  return (
    <form
      id={formId}
      onSubmit={handleSubmit((data) => {
        updateMe({ ...data, job: data.job._id });
      })}
    >
      <Stack gap="16px">
        <FormLabel marginBottom="50px">
          <Heading as="h2" size="lg">
            Профиль
          </Heading>
        </FormLabel>
        <Grid templateColumns="repeat(3, 1fr)" gap="20px" alignItems="center">
          <FormControl isInvalid={errors.lastName !== undefined}>
            <FormLabel>Фамилия</FormLabel>

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
            <FormLabel>Имя</FormLabel>
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
            <FormLabel>Отчество</FormLabel>
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
            <Controller
              control={control}
              name="sex"
              render={({ field: { onChange, onBlur, value } }) => (
                <RadioGroup value={value} onChange={onChange} onBlur={onBlur}>
                  <Stack direction="row">
                    <Radio value={Sex.Male}>Мужской</Radio>
                    <Radio value={Sex.Female}>Женский</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />

            <FormErrorMessage>
              {errors.sex && errors.sex.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.job !== undefined}>
            <FormLabel>Ваша должность</FormLabel>
            <Controller
              control={control}
              name="job"
              render={({ field: { onChange, onBlur, value } }) => (
                <JobsSelect
                  defaultValue={value}
                  onBlur={onBlur}
                  variant="flushed"
                  placeholder="Выберите должность"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <FormErrorMessage>
              {errors.job && errors.job.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.phone !== undefined}>
            <FormLabel>Номер телефона</FormLabel>
            <PhoneInput
              variant="flushed"
              placeholder="Номер телефона"
              {...fieldRegister("phone")}
            />
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>
        </Grid>
        <Button form={formId} type="submit">
          Сохранить
        </Button>
      </Stack>
    </form>
  );
};
