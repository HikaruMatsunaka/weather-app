import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Article from "../components/articles/Article";
import { Header } from "../components/header/Header";
import Nav from "../components/nav/Nav";
import PickupArticle from "../components/pickup-article/PickUpArticle";
import Weather from "../components/weather/Weather";
import MainLayout from "../layouts/MainLayout";
import styles from "../styles/Home.module.scss";

export default function Home(props) {
  console.log(process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY);
  console.log(process.env.NEXT_PUBLIC_NEWS_API_KEY);

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
      <div className={styles.aside}>
        {/* <Weather weatherNews={props.weatherNews} /> */}
        <PickupArticle articles={props.pickupArticles} />
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
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  );
  const topJson = await topRes.json();
  const topArticles = topJson?.articles;
  //Newsを配列で取ってくる。

  //OpenWeatherMapの天気の情報を取得
  //経緯度を指定
  const lat = 35.4122;
  const lon = 139.413;
  const exclude = "hourly,minutely";
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=${exclude}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}
`
  );
  const weatherJson = await weatherRes.json();
  const weatherNews = weatherJson;

  // NewsAPIのピックアップ記事の情報を取得
  const keyword = "software";
  const sortBy = "popularity";
  const pickupPageSize = 5;
  const pickupRes = await fetch(
    `https://newsapi.org/v2/everything?q=${keyword}&language=jp&sortBy=${sortBy}&pageSize=${pickupPageSize}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  );
  const pickupJson = await pickupRes.json();
  const pickupArticles = pickupJson?.articles;

  return {
    props: {
      topArticles,
      weatherNews,
      pickupArticles,
    },
    revalidate: 60 * 10,
  };
};
