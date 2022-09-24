//全体のレイアウトを整える
import { Header } from "../components/header/Header";
import styles from "./mainlayout.module.scss";

//Reactのコンポーネント型の定義は、以下のように行う！
type LayoutProps = {
  children: React.ReactNode;
};

//関数にJSX.Elementの型注釈をつけるときは、関数名ではなく()の後に書く
const MainLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default MainLayout;
