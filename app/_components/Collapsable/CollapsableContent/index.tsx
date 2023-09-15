import { Content, CollapsibleContentProps } from "@radix-ui/react-collapsible";
import styles from "./CollapsableContent.module.css";

export function CollapsableContent({ ...props }: CollapsibleContentProps) {
  return <Content {...props} className={styles.content} />
}