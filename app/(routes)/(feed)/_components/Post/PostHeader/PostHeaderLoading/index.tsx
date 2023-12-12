import { DuotoneUserIcon } from "@components/DuotoneUserIcon";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import headerStyles from "../PostHeader.module.css";
import React from "react";

export const PostHeaderLoading = () => {
  return (
    <div className={headerStyles.postHeader}>
      <div className={headerStyles.postUser}>
        <DuotoneUserIcon.Root>
          <DuotoneUserIcon.Circle loading />
          <DuotoneUserIcon.UserCircle />
        </DuotoneUserIcon.Root>
        <Text size="sm" loading asChild>
          <h5>username</h5>
        </Text>
        <Text size="xs" weight="thin" loading>· 1 jan. 23</Text>
      </div>
      <Icon icon="ellipsis-h" width={16} height={16} withoutClick loading />
    </div>
  );
};