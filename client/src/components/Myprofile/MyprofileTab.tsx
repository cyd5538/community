import { Link } from "react-router-dom";

interface MyprofileTabProp {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

interface TabItem {
  key: string;
  label: string;
  link: string;
}

const tabItems: TabItem[] = [
  { key: "myinfo", label: "내 정보", link: "/me" },
  { key: "myposts", label: "내 글 목록", link: "?profile=myposts" },
];

const MyprofileTab: React.FC<MyprofileTabProp> = ({ tab, setTab }) => {
  return (
    <ul className="flex gap-4">
      {tabItems.map((item) => (
        <li
          key={item.key}
          onClick={() => setTab(item.key)}
          className={`${tab === item.key && "bg-green-400 px-2 py-1 rounded-md text-white"} px-2 py-1 text-black cursor-pointer`}
        >
          <Link to={item.link}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MyprofileTab;
