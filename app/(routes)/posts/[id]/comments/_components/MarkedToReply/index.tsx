import { DuotoneUserIcon } from "@components/DuotoneUserIcon";
import { CommentType } from "@classes/APIManager/base/types/Models.types";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import styles from "./MarkedToReply.module.css";
import Image from "next/image";
import React from "react";

type MarkedToReplyProps = {
  handleUnmarkToReply: () => void;
  markedToReply: { commentToRes: CommentType; commentToMark: CommentType; };
};

export const MarkedToReply = ({ markedToReply, handleUnmarkToReply }: MarkedToReplyProps) => {
  if (markedToReply === null) return null;

  const { author } = markedToReply!.commentToMark;

  return (
    <div className={styles.markedToReply}>
      <div className={styles.userZone}>
        {
          author && author.user && author.user.userProfile && author.user.userProfile.icon ?
            <Image
              src={author.user.userProfile.icon}
              alt={`Imagem do usuário ${author!.displayName || author!.user!.username}`}
              className={styles.userIcon}
              width={24}
              height={24}
            />
            :
            <DuotoneUserIcon.Root>
              <DuotoneUserIcon.Circle />
              <DuotoneUserIcon.UserCircle />
            </DuotoneUserIcon.Root>
        }
        <Text size="default" weight="medium">{author!.displayName! || author!.user!.username!}</Text>
      </div>
      <Icon icon="x" onClick={handleUnmarkToReply} />
    </div>
  );
};