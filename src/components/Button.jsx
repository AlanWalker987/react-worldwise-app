import styles from "./Button.module.css";
function Button({ onclick, children, type }) {
  return (
    <button onClick={onclick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
