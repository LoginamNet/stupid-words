import NavLink from "./link/link";

import styles from "./navigation.module.css";

export default async function Navigation() {
  const links = [
    { link: "/welcome", name: "Привет" },
    { link: "/", name: "Словечки" },
    { link: "/addword", name: "Добавить слово" },
  ];

  return (
    <nav className={styles.navigation}>
      {links.map((el, key) => (
        <div key={key}>
          <NavLink link={el.link}>{el.name}</NavLink>
        </div>
      ))}
    </nav>
  );
}
