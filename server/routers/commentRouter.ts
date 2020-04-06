import {RouterBase} from './routerBase'
import * as commentControllers from '../controllers/commentControllers'

export class CommentRouter extends RouterBase  {
    constructor(app: any) {
        super(app, '/comment')
    }

    addRouter(): void {
        this.router.get('/comment-list', commentControllers.getCommentList)
        this.router.post('/write-comment', commentControllers.writeComment)
        this.router.get('/brief-list', commentControllers.getBriefList)
        this.router.post('/write-brief', commentControllers.writeBrief)
        this.router.post('/like-for-comment', commentControllers.likeForComment)
        this.router.post('/like-for-brief', commentControllers.likeOnBrief)
    }
}