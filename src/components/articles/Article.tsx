//方針
//1. rticleの部分をコンポーネント化する
//2. APIで取ってくるデータをtypeで定義する
//3. コンポーネントの型定義をして、関数の中身を書いていく

import moment from "moment";
import style from "./article.module.scss";
import Image from "next/image";
import Props from "../types";

//コンポーネントのpropsに型注釈をつけておく
//一貫して管理したいので、types.tsを作る
// type Props = {
//   articles?: [
//     article: {
//       author: string;
//       title: string;
//       publishedAt: string;
//       url: string;
//       urlToImage: string;
//     }
//   ];
//   title?: string;
// };

//React.FCは、関数をReactのコンポーネントに型定義できる。
//<型>を後ろにつけることでコンポーネントのpropsに型を付けれる
export const Article: React.FC<Props> = ({ articles, title }) => {
  return (
    <section>
      <div>
        {/**このchartAtとかtoUpperCaseって何や？ */}
        <h1>{title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}</h1>
      </div>
      {articles.map((article, index) => {
        // ||はOR演算子で、どちらかがtrueならtrueを返す。
        //【三項演算子】条件:真の場合:負の場合
        //演算子一覧はこれ：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators
        const time =
          moment(article.publishedAt || moment.now())
            .fromNow()
            .slice(0, 1) == "a"
            ? 1
            : moment(article.publishedAt || moment.now())
                .fromNow()
                .slice(0, 1);
        return (
          <a
            href={article.url}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
          >
            <article className={style.article_main}>
              <div className={style.article_title}>
                <p>{article.title}</p>
                <p className={style.article_time}>{time}</p>
              </div>
              {article.urlToImage && (
                //<img>じゃなくて、nextの<Img>を使えって出てくるけど無視してオッケー！
                <img
                  key={index}
                  src={article.urlToImage}
                  alt={`${article.title}image`}
                  width={40}
                  height={40}
                />
              )}
            </article>
          </a>
        );
      })}
    </section>
  );
};

export default Article;
