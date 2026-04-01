import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import logo from "@/public/assets/logo.svg";

const Logo = () => {
  return (
    <div className={styles.root}>
      <Link href="/">
        <Image src={logo} alt="app logo" fill={true} loading="lazy" />
      </Link>
    </div>
  );
};

export default Logo;
