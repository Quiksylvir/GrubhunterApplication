import { ReactNode } from "react";
import Header from "../header";

interface LayoutInterface {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutInterface) => {
  return (
    <div>
      <Header />
      <main className="latout-grid">{children}</main>
    </div>
  );
};
