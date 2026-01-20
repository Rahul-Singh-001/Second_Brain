
import { Deleteicon } from "../icons/deleteicon"
import { Shareicon } from "../icons/shareicon"
import { Youtube } from "../icons/youtubeicon";
import { Article } from "../icons/article";
import { Twittericon } from "../icons/twittericon";
type imagetype= "youtube" | "article" | "twitter"
interface Cardprops{
    headerimage: imagetype,
    HeadingText: string,
    content:string,
}
interface DefaultIconsProps {
 content?: string;
}
const iconmap={
    youtube:<Youtube size='lg'/> ,
    article:<Article size='lg'/>,
    twitter:<Twittericon size='lg'/>
}
const DefaultIcons =({content}:DefaultIconsProps)=> (
  <div className=" flex m-2 gap-2 text-gray-500">
    <a href={content} target="_blank">
  <Shareicon size='lg'/> 
  </a>
  <Deleteicon size='lg' />
  </div>
);
export const Card=(props:Cardprops)=>{
 return <div className="border border-slate-200 bg-white p-2 my-8 ml-7  w-80 h-80 overflow-y-auto overflow-x-hidden rounded-md shadow-xl" >
    <div className="flex ">
        <div className="my-2 mx-1">
           {iconmap[props.headerimage]}
        </div>
        <div className="w-44 m-1 text-xl  flex items-center ">
           {props.HeadingText}
        </div>
        <span>
            <DefaultIcons />
        </span>
    </div>
    <div className="pt-4">
        {props.headerimage==="youtube"&& <iframe className="w-full px-2 rounded"
         src={props.content.replace("watch","embed").replace("?v=","/")}
         title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
         referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        }
        {props.headerimage==="twitter" && <blockquote className="twitter-tweet items-shrink p-2">
         <a href={props.content.replace("x.com","twitter.com")}></a>
           </blockquote>}
    </div>
 </div>

 
}