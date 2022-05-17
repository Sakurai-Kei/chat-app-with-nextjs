import React from "react";
import { LayoutProps } from "../interfaces/Components";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}
