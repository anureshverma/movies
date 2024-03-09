
import { Request, Response, } from 'express';

export const roleCheck = (req: Request, res: Response, next: Function) => {
    console.log(":::req?.query.", req?.query)
    console.log(":::req?.query.", req?.query)
    console.log(":::req?.query.", req?.query)
    console.log(":::req?.query.", req?.query)
    const role = req?.query?.role;
    if (!role || role != 'admin') {
        throw new Error('Role should be admin')
    }
    next()
}