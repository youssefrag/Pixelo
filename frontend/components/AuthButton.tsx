"use client";

import { ReactNode } from "react";

import clsx from "clsx";

interface AuthButtonProps {
  variant: "login" | "register";
  children: ReactNode;
}

export default function AuthButton({ variant, children }: AuthButtonProps) {
  const base = "text-sm font-medium py-3 px-4 rounded-full";

  const styles = {
    login: "border border-[#E9EAEB]",
    register: "bg-[#000] text-white",
  };

  return <button className={clsx(base, styles[variant])}>{children}</button>;
}
