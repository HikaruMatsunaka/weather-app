//動的ルートを作る(Dynamic Routerを実装する)
//fallbackとISRについて：https://zenn.dev/yuki_yuki/articles/5de2acf83b4770

import Head from "next/head";
import { useRouter } from "next/router";
import Article from "../../components/articles/Article";
import Nav from "../../components/nav/Nav";
import MainLayout from "../../layouts/MainLayout";
import styles from "../../styles/Home.module.scss";

function Topic(props) {
  const router = useRouter();
  if (router.isFallback) {
    //isFallbackは定義したpath以外のアクセスがあった場合にどのような処理をするか決める
    //以下のコードは、生成した静的ファイルを返すまで、ローディング画面を表示する。
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <Head>
        <title>Simple News - {props.title.toUpperCase()}</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main} style={{ marginRight: "10%" }}>
          <Article title={props.title} articles={props.topicArticles} />
        </div>
      </div>
    </MainLayout>
  );
}

//以下はbuild時のみ実行される。
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const topicRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&category=${params.id}&country=jp&apiKey=e32224a608d846068fe491980dae6160`
  );
  const topicJson = await topicRes.json();
  const topicArticles = await topicJson.articles;

  const title = params.id;

  return {
    props: { topicArticles, title },
    revalidate: 60 * 10,
  };
}

export default Topic;
