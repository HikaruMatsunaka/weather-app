import styles from "./header.module.scss";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <div>
      <section className={styles.container}>
        <header className={styles.header}>
          <div className={styles.header_icon}>
            <Image
              src="/image/bars-solid.svg"
              alt="menu icon"
              //loading属性は、遅延読み込みの有無を指定できる。eagerがしない(すぐにロード)、lazyがする。
              loading="eager"
              width={32}
              height={32}
            ></Image>
          </div>
        </header>
        <h1 style={{ letterSpacing: "1px", textAlign: "left" }}>
          <Link href="/">
            <a>
              <span style={{ fontWeight: 250 }}>Simple</span>
              <span style={{ fontWeight: 100 }}>News</span>
            </a>
          </Link>
        </h1>
      </section>
    </div>
  );
};
