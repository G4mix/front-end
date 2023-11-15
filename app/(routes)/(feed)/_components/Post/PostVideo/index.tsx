import React from "react";

type PostVideoProps = {
  src: string;
};

export const PostVideo = ({ src }: PostVideoProps) => {
  return (
    <video width="380" height="200" controls>
      <source src={src} type="video/mp4" />
      Seu navegador não suporta o elemento de vídeo.
    </video>
  );
};