import Logo from "./logo";
import styles from "./index.module.css";

const Header = () => {
  return (
    <header className={styles.root}>
      <div className="layout-grid">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
