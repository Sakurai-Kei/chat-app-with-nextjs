import React from "react";
import { LayoutProps } from "../interfaces/Components";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
