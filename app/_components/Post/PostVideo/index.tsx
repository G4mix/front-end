import React from "react";

interface VideoProps {
  src: string;
}

export function PostVideo({ src }: VideoProps) {
  return (
    <video width="380" height="200" controls>
      <source src={src} type="video/mp4" />
      Seu navegador não suporta o elemento de vídeo.
    </video>
  );
}