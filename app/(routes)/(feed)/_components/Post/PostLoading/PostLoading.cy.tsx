import { PostLoading } from "./index";
import styles from "@/app/(routes)/(feed)/_components/posts/Posts.module.css";
import React from "react";

describe("<PostLoading />", () => {
  it("It is expected to render the loading skeleton.", () => {
    cy.mount(
      <div className={styles.posts}>
        <PostLoading />
      </div>
    );
  });
});

export {};