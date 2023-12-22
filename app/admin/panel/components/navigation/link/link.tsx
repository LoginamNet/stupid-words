"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import styles from "./link.module.css";

export default function NavLink({
  link,
  children,
}: {
  link: string;
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = link === segment;

  return (
    <Link
      className={`${styles.link} ${isActive && styles.active_link}`}
      href={`/admin/panel/${link}`}
    >
      {children}
    </Link>
  );
}
