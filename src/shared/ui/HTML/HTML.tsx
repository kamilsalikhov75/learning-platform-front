import styles from "./HTML.module.scss";

export interface HTMLProps {
  html: string;
}

export const HTML = ({ html }: HTMLProps) => {
  return (
    <div
      className={styles.wrapper}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
