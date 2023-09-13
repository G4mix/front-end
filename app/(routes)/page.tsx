import { Checkbox } from "@components/Checkbox";
import { Button } from "@components/Button";
import styles from "./page.module.css";
import React from "react";
import { Icon } from "@components/Icon";

export default function Home() {
  return (
    <main className={styles.main}>
      <Button>Testando</Button>
      <Checkbox.Root>
        <Checkbox.Input />
        <Checkbox.IndicatorContainer>
          <Checkbox.Indicator>
            <Icon icon="check" height={16} />
          </Checkbox.Indicator>
        </Checkbox.IndicatorContainer>
      </Checkbox.Root>
    </main>
  );
}
