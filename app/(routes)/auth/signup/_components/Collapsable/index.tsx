"use client";


import { Icon } from "@components/Icon";
import { Text } from "@components/Text";

import React, { useCallback, useImperativeHandle, forwardRef, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import styles from "./Collapsable.module.css";

type CollapsableProps = {
  items: {
    icon: string;
    text: string;
  }[];
}

export type CollapsableHandlers = {
  collapse: () => void;
  uncollapse: () => void;
};

const Collapsable = forwardRef<CollapsableHandlers, CollapsableProps>(({ items }, ref) => {
  const [animationEnded, setAnimationEnded] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const collapse = useCallback(() => setIsCollapsed(true), []);
  const uncollapse = useCallback(() => setIsCollapsed(false), []);

  useImperativeHandle(ref, () => {
    return {
      collapse,
      uncollapse
    };
  });

  const handleAnimationStart = useCallback((e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === styles.slideDown) {
      setAnimationEnded(false);
    }
    if (e.animationName === styles.slideUp) {
      setTimeout(() => setAnimationEnded(true), 290);
    }
  }, []);

  return (
    <Collapsible.Root className={styles.root} open={isCollapsed} style={{display: !isCollapsed && animationEnded ? "none" : "block"}}>
      <Collapsible.Content className={styles.content} onAnimationStart={handleAnimationStart}>
        {items.map((item) => (
          <div className={styles.item} key={item.text}>
            <Icon
              icon={item.icon as "x" | "check"}
              className={styles.collapsableIcon}
              withoutClick
            />
            <Text size="xxs">{item.text}</Text>
          </div>
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  );
});

Collapsable.displayName= "Collapsable";

export { Collapsable };