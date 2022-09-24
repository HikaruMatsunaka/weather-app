//ここで、型定義をオブジェクトでまとめて行う

type Props = {
  articles?: [
    article: {
      author: string;
      title: string;
      publishedAt: string;
      url: string;
      urlToImage: string;
    }
  ];
};

export default Props;
