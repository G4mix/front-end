import { InputField } from "@components/Input/InputField";
import { InputInput } from "@components/Input/InputInput";
import { InputRoot } from "@components/Input/InputRoot";
import styles from "./CreatePostTitle.module.css";
import React from "react";

type CreatePostTitleProps = {
  defaultTitle?: string;
};

export const CreatePostTitle = ({ defaultTitle }: CreatePostTitleProps) => {
  return (
    <InputRoot>
      <InputField className={styles.inputField}>
        <InputInput className={styles.input} type="text" placeholder="Título" name="post_title" defaultValue={defaultTitle} />
      </InputField>
    </InputRoot>
  );
};