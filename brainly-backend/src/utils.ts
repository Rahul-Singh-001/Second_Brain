export function Random(len :number){
    const  s="qwertyuiopasdfghjklzxcvbnm1234567890";
    let ans="";
    let length=s.length
    for (let i=0;i<len;i++){
        ans+=s[Math.floor(Math.random()*length)]
    }
    return ans;
}