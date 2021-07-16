import { h, ComponentChildren } from "preact";
import styles from "./style.scss";

export default ({ children }: {children: ComponentChildren}) => {
	return (
		<article className={styles.filterContainer}>
			{children}
		</article>
	)
}