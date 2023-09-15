import { Root, CollapsibleProps } from "@radix-ui/react-collapsible";
import styles from "./CollapsableRoot.module.css"

export function CollapsableRoot({ ...props }: CollapsibleProps) {
  return <Root {...props} className={styles.root} />
}