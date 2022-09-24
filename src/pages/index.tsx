import Head from "next/head";
import Image from "next/image";
import Article from "../components/articles/Article";
import { Header } from "../components/header/Header";
import MainLayout from "../layouts/MainLayout";
import styles from "../styles/Home.module.scss";

export default function Home(props) {
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>
      <div className={styles.main}>
        <Article title="headlines" articles={props.topArticles}></Article>
      </div>
    </MainLayout>
  );
}

export const getStaticProps = async () => {
  // NewsAPIのトップ記事の情報を取得
  const pageSize = 10;
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=あなたのNewsAPIのAPIKey`
  );
  const topJson = await topRes.json();
  const topArticles = topJson?.articles;

  return {
    props: {
      topArticles,
    },
    revalidate: 60 * 10,
  };
};
