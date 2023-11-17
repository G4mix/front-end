"use client";

import { useCreatePostContext } from "@contexts/CreatePostContext";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import styles from "./ContentLink.module.css";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";

type ContentLinkProps = {
  url: string;
};

type DataType = {
  description: string;
  title: string;
  icon: {
    url: string;
    width: number;
    height: number;
  };
};

export const ContentLink = ({ url }: ContentLinkProps) => {
  const { handleRemoveLink, handleShowMessage } = useCreatePostContext();
  const [data, setData] = useState<DataType | null>(null);
  
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
      const { data: jsonData } = await response.json();
      
      setData({
        title: jsonData.title,
        description: jsonData.description,
        icon: {
          url: jsonData.logo.url,
          width: jsonData.logo.width,
          height: jsonData.logo.height
        }
      });
  
    } catch (error) {
      handleShowMessage("Erro ao buscar informações da URL!");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (!data || !data.icon.url) return null;

  return (
    <div className={styles.link}>
      <Image
        src={data.icon.url || ""}
        width={data.icon.width}
        height={data.icon.height}
        quality={100}
        alt={`Ícone do site: ${data.title}`}
        className={styles.linkImage}
      />
      <div className={styles.linkInformations}>
        <Text size="xs" weight="medium">{data.title.slice(0, 20)}</Text>
        <Text size="xs" weight="light" align="justify">{data.description.slice(0, 90)}...</Text>
      </div>
      <Icon icon="x" className={styles.removeLink} onClick={() => handleRemoveLink(url)} />
    </div>
  );
};