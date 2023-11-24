"use client";

import { useMessagesContext } from "@contexts/MessagesContext";
import { Text } from "@components/Text";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./PostLinks.module.css";
import Image from "next/image";
import Link from "next/link";

type PostLinkProps = {
  children?: React.ReactNode;
  url?: string;
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

export const PostLink = ({ url="", children }: PostLinkProps) => {
  const { handleShowMessage } = useMessagesContext();
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
    <Link className={styles.link} href={url} aria-label={`Link para o site: ${data.title}`} target="_blank">
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
      {children}
    </Link>
  );
};