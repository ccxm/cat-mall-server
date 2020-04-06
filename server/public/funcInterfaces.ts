import {Request, Response, NextFunction} from 'express'

export interface reqFunction {
    async (req: Request, response: Response,next: NextFunction):void
}