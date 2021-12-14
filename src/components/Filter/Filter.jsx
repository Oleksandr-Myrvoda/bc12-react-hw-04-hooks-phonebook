import styles from "./Filter.module.css";

const Filter = ({ value, onChange }) => (
  <label>
    <p className={styles.title}>Filter</p>
    <input type="text" value={value} onChange={onChange} />
  </label>
);

export default Filter;
