import { PostCommands } from "./PostCommands";
import { PostHeader } from "./PostHeader";
import { PostImage } from "./PostImage";
import { PostVideo } from "./PostVideo";
import { PostMain } from "./PostMain";
import { PostRoot } from "./PostRoot";
import React from "react";

interface PostProps {
  postSession: {
    username: string | null;
    date: string | null;
    icon: string | null;
    like: string | null;
    comment: string | null;
    views: string | null;
  };
  postContent: {
    title: string | null;
    text: string | null;
    image: string | null;
    video: string | null;
  };
}

export const Post = ({ postSession, postContent }: PostProps) => {
  return (
    <PostRoot>
      <PostHeader date={postSession.date} username={postSession.username} />
      { postContent.image && (<PostImage image={postContent.image} />) }
      { postContent.video && (<PostVideo src={postContent.image ?? ""} />) }
      <PostMain title={postContent.title} text={postContent.text} />
      <PostCommands like={postSession.like} comment={postSession.comment} views={postSession.views} />
    </PostRoot>
  );
}
