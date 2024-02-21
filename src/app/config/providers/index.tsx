import { StyleProvider } from "./style-provider/ui/style-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return <StyleProvider>{children}</StyleProvider>;
};
