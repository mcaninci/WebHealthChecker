export const  strToHes=function (hesstr){
   if(hesstr && hesstr.length==10)
    return hesstr.substr(0,4)+"-"+ hesstr.substr(4,4)+"-"+hesstr.substr(8,2);
    else return hesstr;

}