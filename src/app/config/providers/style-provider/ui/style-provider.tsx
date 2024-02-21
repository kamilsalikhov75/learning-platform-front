import { ChakraProvider } from "@chakra-ui/react";

interface StyleProviderProps {
  children: React.ReactNode;
}

export const StyleProvider = ({ children }: StyleProviderProps) => (
  <ChakraProvider>{children}</ChakraProvider>
);
