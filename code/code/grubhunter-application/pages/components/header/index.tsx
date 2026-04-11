import Logo from "./logo";
import AuthElement from "./auth-element";
import styles from "./index.module.css";

const Header = () => {
  return (
    <header className={styles.root}>
      <div className="layout-grid">
        <Logo />
        <AuthElement />
      </div>
    </header>
  );
};

export default Header;
