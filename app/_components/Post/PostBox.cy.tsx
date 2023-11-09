import React from "react";
import { Post } from "./index";

describe("<PostBox />", () => {
  it("Should be able to render the PostBox with an image.", () => {
    cy.mount(
      <Post
        PostSession={{
          username: "JohnDoe",
          date: "11 Out 23",
          icon: null,
          like: "100",
          comment: "0",
          chart: "30",
        }}
        PostContent={{
          title: "Good Morning!",
          text: "Today I woke up and had a nice breakfast.",
          image: null,
          video: null,
        }}
      />
    );
  });
});
