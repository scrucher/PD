import { Request, Response } from "express";

async function VerifyelRequestElement(className:any,req:Request)
{
  try {

    let array = Object.keys(className.rawAttributes);
    let arr = Object.values(req.body);
    console.log({"hello": arr});
    for (let value of arr){
      console.log(value);
      //@ts-ignore
      if (value == '' || value == null || value == undefined){
        console.log({"hello":value});
        return false
      }
     }
    for(let key in req.body){
      if(!array.includes(key) && key !== "_csrf"){
          return false;
      }
    }
    return true;
  } catch (error) {
      console.log(error);
      return false;
  }
}

export default VerifyelRequestElement;
