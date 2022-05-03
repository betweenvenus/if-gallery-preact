import { h } from "preact";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import styles from "./style.scss";
import { StateUpdater } from "preact/hooks";

export default ({ mode, setMode }: {mode: string, setMode: StateUpdater<string>}) => {
	return (
		<FormControl className={styles.formControl}>
			<InputLabel id="filter-selector">Group galleries by:</InputLabel>
			<Select
				labelId="filter-selector"
				value={mode}
				onChange={(e) =>
					setMode(e.target.value as "default" | "market" | "client")
				}
			>
				<MenuItem value={"default"} className={styles.filterSelectItem}>
					Default
				</MenuItem>
				<MenuItem value={"market"} className={styles.filterSelectItem}>
					Markets
				</MenuItem>
				<MenuItem value={"client"} className={styles.filterSelectItem}>
					List
				</MenuItem>
			</Select>
		</FormControl>
	)
}