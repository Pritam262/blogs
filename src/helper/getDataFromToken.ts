import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";

export const getDataFromToken = (request:NextRequest)=>{

    try {
        
       const token =  request.cookies.get("authtoken")?.value || " ";
      const decodeToken:any =  jwt.verify(token, process.env.JWT_SECRETE_KEY!);

      return decodeToken.user.id

    } catch (error:any) {
        throw new Error(error.message);
        // throw new Error("Error");
        
    }
}