export interface IGetComment {
    goodsId: string
    pageSize: number
    curPage: number
}

export interface IGetCommentRes {
    totalCommentNum: number  // 评论的总数量
    curPage: number
    commentList: Array<object>
}

export interface ILikeComment {
    goodsId: string
    userId: string
    commentId: string
    commentListId: string
    likeState: string
}

export interface IUserLikeComment {
    commentId: string
    commentListId: string
    likeState: string
}

export interface ICommentNum {
	likeNum: number
	unLikeNum: number
}