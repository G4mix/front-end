import React from "react";
import { Post } from "./index";

describe("<PostBox />", () => {
  it("Should be able to render the PostBox with an image.", () => {
    cy.mount(
      <Post
        postSession={{
          username: "JohnDoe",
          date: "11 Out 23",
          icon: null,
          like: "100",
          comment: "0",
          views: "30",
        }}
        postContent={{
          title: "Good Morning!",
          text: "Today I woke up and had a nice breakfast.",
          image: null,
          video: null,
        }}
      />
    );
  });
});
