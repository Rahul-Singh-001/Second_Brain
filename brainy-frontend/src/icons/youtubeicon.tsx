import { sizeIconVariant, type IconProps } from "./sizeInteface"

export const Youtube=(props:IconProps)=>{
    return <svg xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={sizeIconVariant[props.size]}
  >
    <path d="M19.615 3.184C18.406 2.75 12 2.75 12 2.75s-6.406 0-7.615.434a2.989 2.989 0 0 0-2.184 2.184C2.75 6.406 2.75 12 2.75 12s0 5.594.451 6.632a2.989 2.989 0 0 0 2.184 2.184C6.406 21.25 12 21.25 12 21.25s6.406 0 7.615-.434a2.989 2.989 0 0 0 2.184-2.184C21.25 17.594 21.25 12 21.25 12s0-5.594-.451-6.632a2.989 2.989 0 0 0-2.184-2.184ZM10 15.5v-7l6 3.5-6 3.5Z" />
  </svg>
}