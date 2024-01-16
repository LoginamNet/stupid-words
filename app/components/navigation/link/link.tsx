"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./link.module.css";

export default function NavLink({
  link,
  children,
}: {
  link: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = link === pathname;

  return (
    <Link
      className={`${styles.link} ${isActive && styles.active_link}`}
      href={link}
    >
      {children}
    </Link>
  );
}
