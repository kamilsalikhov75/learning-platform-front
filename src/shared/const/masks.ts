import { maskitoPhoneOptionsGenerator } from "@maskito/phone";
import metadata from "libphonenumber-js/min/metadata";

export const phoneMaskOptions = maskitoPhoneOptionsGenerator({
  countryIsoCode: "RU",
  metadata,
});
