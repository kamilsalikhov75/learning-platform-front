import "react-quill/dist/quill.snow.css";

import type { ReactQuillProps } from "react-quill";
import ReactQuill from "react-quill";

export interface TextEditorProps extends ReactQuillProps {}

export const TextEditor = (props: TextEditorProps) => {
  return <ReactQuill {...props} />;
};
