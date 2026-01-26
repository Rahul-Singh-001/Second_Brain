import { useEffect, useState, type ReactElement } from "react";
import React from "react";
import { Twittericon } from "../icons/twittericon";
import { Youtube } from "../icons/youtubeicon";
import { Article } from "../icons/article";
import { Link } from "../icons/link";
import { Hash } from "../icons/hash";
import { Globe } from "../icons/globe";
import { useContentStore } from "@/store/content";
import { cn } from "@/lib/utils";

type User = {
  id: number;
  label: string
  value:string
  image: ReactElement;
};
type UsersListProps = {
  open: boolean;
};

export const SidebarList: React.FC<UsersListProps> = ({ open }) => {
  const SideList: User [] = [
  { id: 1, label: "All", value: "all", image: <Globe size="lg" /> },
  { id: 2, label: "Tweet", value: "tweet", image: <Twittericon size="lg" /> },
  { id: 3, label: "Videos", value: "video", image: <Youtube size="lg" /> },
  { id: 4, label: "Documents", value: "document", image: <Article size="lg" /> },
  { id: 5, label: "Links", value: "link", image: <Link size="lg" /> },
  { id: 6, label: "Tags", value: "tags", image: <Hash size="lg" /> },
  ];
  const [showText, setShowText] = useState(open);
   const { selectedType, filterByType } = useContentStore();

  useEffect(() => {
    if (open) {
      // wait for sidebar animation, then show text
      const t = setTimeout(() => setShowText(true), 500);
      return () => clearTimeout(t);
    } else {
      // hide immediately when closing
      setShowText(false);
    }
  }, [open]);

  return (
   <nav className="space-y-1">
        {SideList.map((item) => {
          const isActive = selectedType === item.value;

          return (
            <button
              key={item.id}
              onClick={() => filterByType(item.value)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors",
                isActive && "bg-muted text-indigo-600 dark:text-indigo-400"
              )}
            >
             {item.image}
            {showText && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>
  );
}
