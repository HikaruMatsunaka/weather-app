//全体のレイアウトを整える
import { Header } from "../components/Header";
import styles from "./index.module.scss";

//Reactのコンポーネント型の定義は、以下のように行う！
type LayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div>
      <Header />
      <main className={styles.main}>{children}</main>
      <h1>MainLayout</h1>
      <h1>MainLayout</h1>
    </div>
  );
};
