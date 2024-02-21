import { useMaskito } from "@maskito/react";

import { Input, InputProps, forwardRef } from "@chakra-ui/react";
import { phoneMaskOptions } from "shared/const/masks";

export interface PhoneInputProps extends InputProps {}

export const PhoneInput = forwardRef(({ ...props }: PhoneInputProps, ref) => {
  const maskedInputRef = useMaskito({ options: phoneMaskOptions });

  return (
    <div ref={maskedInputRef}>
      <Input ref={ref} {...props} />
    </div>
  );
});
