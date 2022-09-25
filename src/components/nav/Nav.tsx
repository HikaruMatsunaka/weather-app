//方針
//navigationの中身を配列で作る
//map関数を用いて、配置

import Link from "next/link";

const TOPICS = [
  {
    icon: "01",
    path: "/",
    title: "Top stories",
  },
  {
    icon: "02",
    path: "/topics/business",
    title: "Business",
  },
  {
    icon: "03",
    path: "/topics/technology",
    title: "Technology",
  },
  {
    icon: "04",
    path: "/topics/entertainment",
    title: "Entertainment",
  },
  {
    icon: "05",
    path: "/topics/sports",
    title: "Sports",
  },
];

const Nav: React.FC = () => (
  <section>
    <ul>
      {TOPICS.map((topic, index) => (
        <li key={index}>
          <Link href={`${topic.path}`}>
            <a>{topic.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default Nav;
