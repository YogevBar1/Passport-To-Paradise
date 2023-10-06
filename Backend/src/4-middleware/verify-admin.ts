import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

// verify token validity
function verifyAdmin(request: Request , response: Response, next: NextFunction): void{

    // Authorization: "Bearer the-token"
    const authorizationHeader = request.header("authorization");

    // Extract the token
    const token = authorizationHeader?.substring(7);

    // Verify token
    cyber.verifyAdmin(token);

    next();
}

export default verifyAdmin;