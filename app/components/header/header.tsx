import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/welcome">Welcome</Link>
      <Link href="/">Words</Link>
    </header>
  );
}
