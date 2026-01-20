// import { useEffect, useRef } from "react";

import { CrossIcon } from "../icons/crossicon";
import { Menu } from "../icons/menu";
import UsersList from "./pointers";
type sideProps = {
  open: boolean;
  onClose: () => void;
};

export const Sidebar = ({ open, onClose }: sideProps) => {
  return (
    <>
      <div className={`h-screen border-r border-border bg-background  ${open? "w-64":"w-14"} `}>
          <div className={`h-16 flex items-center px-4 border-b ${open?"justify-between":"justify-center"} `}>
             {open &&  <span className="text-2xl font-semibold tracking-widest text-muted-foreground"> MENU </span>}
             
             <div onClick={onClose}  className="border border-border hover:bg-muted focus:outline-none cursor-pointer hover:text-indigo-600 p-1 rounded-full">
              
              {open ?<CrossIcon size="lg"/>:<Menu size="lg"/>}</div>

          </div>

     
        <UsersList open={open}/>
      </div>
    </>
  );
};
