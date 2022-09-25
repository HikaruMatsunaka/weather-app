import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Article from "../components/articles/Article";
import { Header } from "../components/header/Header";
import Nav from "../components/nav/Nav";
import MainLayout from "../layouts/MainLayout";
import styles from "../styles/Home.module.scss";

export default function Home(props) {
  console.log(props.topArticles);

  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>
      <nav>
        <Nav />
      </nav>
      <div className={styles.main}>
        <Article title="headlines" articles={props.topArticles} />
      </div>
    </MainLayout>
  );
}

//ビルドする時に、APIなど外部のデータとやり取りがある場合は、getStaticPropsを使用する。
//getStaticPropsはpagesディレクトリ以外では使用できない。
export const getStaticProps: GetStaticProps = async () => {
  //以下で、Newのトップ記事を取得する。
  const pageSize = 10;
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=e32224a608d846068fe491980dae6160`
  );
  const topJson = await topRes.json();
  const topArticles = topJson?.articles;
  //Newsを配列で取ってくる。

  return {
    props: {
      topArticles,
    },
    revalidate: 60 * 10,
  };
};
