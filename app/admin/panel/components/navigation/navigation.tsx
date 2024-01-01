import NavLink from "./link/link";

import styles from "./navigation.module.css";

export default async function Navigation() {
  const links = [
    { link: "actual", name: "Словарь" },
    { link: "offered", name: "Предложения" },
    { link: "addactual", name: "Добавить в словарь" },
    { link: "addoffered", name: "Добавить в предложенные" },
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
