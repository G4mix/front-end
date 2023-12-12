import { PostLoading } from "./index";
import styles from "@/app/(routes)/(feed)/_components/posts/Posts.module.css";
import React from "react";

describe("<PostLoading />", () => {
  it("It is expected to render the loading skeleton.", () => {
    cy.mount(
      <div className={styles.posts} id="posts">
        <PostLoading />
      </div>
    );
    cy.get("#posts").should("be.visible");
  });
});

export {};