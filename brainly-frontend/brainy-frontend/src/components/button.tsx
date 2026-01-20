import type { ReactElement } from "react";

type variantTypes="primary" | "secondary";
type sizetypes= "sm" | "lg" | "md";
interface Buttonprops{
    variant:variantTypes;
    size: sizetypes ;
    text:string |ReactElement,
    startIcon?:any;
    endIcon?:any;
    onClick?:()=>void;
}
const VariantStyles={
    "primary":"bg-purple-950 text-white hover:bg-purple-900  transition-all duration-500 ease-in-out",
    "secondary":"bg-purple-300 text-purple-900 hover:bg-purple-400  transition-all duration-500 ease-in-out"
}
const SizeStyles={
    "sm":"px-2 py-1 text-sm",
    "md":"py-2 px-4 text-lg",
    "lg":"py-3 px-6 text-xl"
}
const defaultStyles= "rounded-md"

export const Button=(props :Buttonprops)=>{
   return <button onClick={props.onClick} className={`${VariantStyles[props.variant]} ${defaultStyles} ${SizeStyles[props.size]}`}>
    <div className="flex  items-center justify-center gap-2 whitespace-nowrap leading-none">
    {props.startIcon && (
        <span className="flex-shrink-0 text-current">
           {props.startIcon}
        </span>
    )}

    {props.text && (
        <span className="font-medium">
            {props.text}
        </span>
    )}

    {props.endIcon && (
        <span className="flex-shrink-0 text-current">
            {props.endIcon}
        </span>
    )}
    </div>
</button>
}