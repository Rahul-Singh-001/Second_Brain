
import { useState } from "react";


import type { Content } from "@/store/content";
import { FileText, Image, Link2, MessageCircle, Video } from "lucide-react";

interface Cardprops{
    content :Content
    onDelete:(id:string)=>void
    onShare:()=> void;
}
interface LinkPreview {
    url: string
    title:string
    description?: string
    image?:string
    type:"youtube" | "twitter" | "generic" | "image"
    domain:string
}
const typeIcons:Record<string, React.ComponentType<any>>={
   tweet: MessageCircle,
   video: Video ,
   document: FileText,
   link: Link2,
   image: Image,
   project_ideas: FileText,
   article: FileText,
   note: FileText,
};
export const Card :React.FC<Cardprops>=({
    content,
    onDelete,
    onShare
})=>{
    const Icon =typeIcons[content.type.toLowerCase()]||FileText
    const [linkPreview,setLinkpreview]=useState<LinkPreview | null>(null)
      const [imageError, setImageError] = useState(false);

      //Generate link preview data
    const generateLinkPreview =(url:string): LinkPreview => {
        const domain=new URL(url).hostname
        // YouTube URL patterns (improved regex)
        const youtubeRegex =/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const youtubeMatch=url.match(youtubeRegex)
        if(youtubeMatch){
            const videoId=youtubeMatch[1]
            return {
                url,
                title:"YouTube Video",
                description:"Click to watch on YouTube",
                // Use high quality thumbnail, fallback to maxresdefault
                image:`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                type:"youtube",
                domain:"YouTube"
            }
        }
        // Twitter/X URL patterns
        const twitterRegex=/(?:twitter\.com|x\.com)\/(\w+)\/status\/(\d+)/
        const twitterMatch=url.match(twitterRegex)
        if(twitterMatch){
            const [username] =twitterMatch
            return {
                url,
                title:`post by @${username}`,
                description:"view on X(twitter)",
                type:"twitter",
                domain:"X (Twitter)"
            }
        }
        //Image URL patterns
            const imageRegex = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
    if (imageRegex.test(url)) {
      return {
        url,
        title: "Image",
        description: "Click to view full size",
        image: url,
        type: "image",
        domain,
      };
    }

    // Generic URL
    return {
      url,
      title: domain.replace("www.", ""),
      description: "Visit website",
      type: "generic",
      domain: domain.replace("www.", ""),
    };
  }
  const renderBody =()=>{
    if(typeof content.body === "string"){
        return(
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                {content.body}
            </p>
        )
    }else if(Array.isArray(content.body)){
        return(
            <ul className="list-disc list-inside text-gray-300 space-y-1">
                {content.body.slice(0,3).map((item,idx)=>(
                  <li key={idx} className="line-clamp-1">
                     {item}
                  </li>
                ))}
                {content.body.length >3 && (
                    <li className="text-gray-400">
                        ...and {content.body.length-3}more
                    </li>
                )}
            </ul>
        )
    }
    return null
  }
   return(
     <div className=""
   )
}
 