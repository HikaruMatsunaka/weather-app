//ここで、型定義をオブジェクトでまとめて行う
//APIのtypeは基本的に、取得できるデータをconsole.logで参照してから追加する。

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
  title?: string;
  weatherNews?: {
    current: {
      temp: number;
      clouds: number;
      weather: [
        conditions: {
          main: string;
          icon: string;
        }
      ];
    };
    daily: [
      date: {
        dt: number;
        clouds: number;
        temp: {
          min: number;
          max: number;
        };
        weather: [
          conditions: {
            id: number;
            icon: string;
          }
        ];
      }
    ];
  };
};

export default Props;
