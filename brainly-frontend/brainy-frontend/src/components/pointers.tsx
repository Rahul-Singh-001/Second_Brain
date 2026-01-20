import type { ReactElement } from "react";
import { Twittericon } from "../icons/twittericon";
import { Youtube } from "../icons/youtubeicon";
import { Article } from "../icons/article";
import { Link } from "../icons/link";
import { Hash } from "../icons/hash";
import { Globe } from "../icons/globe";

type User = {
  id: number;
  title: string;
  image: ReactElement;
};
type UsersListProps = {
  open: boolean;
};

export default function UsersList({open}: UsersListProps) {
  const users: User[] = [
    { id: 1, title: "All Content", image: <Globe size='lg'/> },
    { id: 2, title: "Tweet", image: <Twittericon size='lg'/> },
    { id: 3, title: "Videos", image: <Youtube size='lg'/> },
    { id: 4, title: "Documents", image: <Article size='lg'/> },
    { id: 5, title: "Links", image: <Link size='lg'/> },
    { id: 6, title: "Tags", image: <Hash size='lg'/> },
  ];

  return (
    <div className="flex flex-col ">
      {users.map((user) => (
        <div key={user.id} className={`flex  items-center p-4 hover:bg-gray-400 transition-all duration-500 rounded  ${
    open ? "space-x-4" : "justify-center" }`}>
          <div className="">{user.image}</div>
          {open && <div className=" ">{user.title}</div>}
          
        </div>
      ))}
    </div>
  );
}
