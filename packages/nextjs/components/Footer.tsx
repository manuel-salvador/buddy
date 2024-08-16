"use client";

import { usePathname } from "next/navigation";
import { cn } from "~~/utils";

export default function Footer() {
  const pathname = usePathname();
  return <div className={cn(pathname === "/debug" && "hidden")}>Footer {pathname}</div>;
}
