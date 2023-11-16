import { InputField } from "@components/Input/InputField";
import { InputInput } from "@components/Input/InputInput";
import { InputRoot } from "@components/Input/InputRoot";
import styles from "./CreatePostTitle.module.css";
import React from "react";

export const CreatePostTitle = () => {
  return (
    <InputRoot>
      <InputField className={styles.inputField}>
        <InputInput className={styles.input} type="text" placeholder="Título" name="post_title" />
      </InputField>
    </InputRoot>
  );
};