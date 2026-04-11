import React, { JSX } from "react";
import styles from "./index.module.css";

interface ButtonProps {
  isDisabled?: boolean;
  children?: React.ReactNode;
  variant?: "blue" | "outline";
  clickHandler?: () => any;
}

const ButtonComponent = ({
  isDisabled,
  children,
  variant,
  clickHandler,
}: ButtonProps): JSX.Element => {
  const renderButtonContent = (children: React.ReactNode) => {
    if (isDisabled) {
      return <span className={styles.span}>{children}</span>;
    } else {
      return (
        <span className={styles.span} onClick={clickHandler}>
          {children}
        </span>
      );
    }
  };

  return (
    <div
      className={[
        styles.root,
        isDisabled ? styles.disabled : "",
        styles[variant || "default"],
      ].join(" ")}
    >
      {renderButtonContent(children)}
    </div>
  );
};

export default ButtonComponent;
