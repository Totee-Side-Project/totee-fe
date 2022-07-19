import { useMutation } from "react-query";
import { UserAPI, CommentAPI, ReplyAPI } from "@api/api";
import { useQueryClient } from "react-query";

export const useAddUserInfo =()=>{
    const queryClient = useQueryClient();
    return useMutation((form:any)=>UserAPI.updateUserInfo(form),{
        onSuccess: ()=>queryClient.invalidateQueries("user")
    })
}

export const useAddComment =(postId:number)=>{
    const queryClient = useQueryClient();
    return useMutation((form:any)=>CommentAPI.createComment(form),{
        onSuccess: ()=>queryClient.invalidateQueries(["post", postId])
    })
}

export const useUpdateComment =(postId:number, commentId:number)=>{
    const queryClient = useQueryClient();
    return useMutation((form:any)=>CommentAPI.updateComment(commentId, form),{
        onSuccess: ()=>queryClient.invalidateQueries(["post", postId])
    })
}

export const useDeleteComment =(postId:number, commentId:number)=>{
    const queryClient = useQueryClient();
    return useMutation(()=>CommentAPI.deleteComment(commentId),{
        onSuccess: ()=>queryClient.invalidateQueries(["post", postId])
    })
}


export const useAddReply =(postId:number)=>{
    const queryClient = useQueryClient();
    return useMutation((form:any)=>ReplyAPI.createReply(form),{
        onSuccess: ()=>{
            console.log(postId);
            queryClient.invalidateQueries(["post", postId])
        }
    })
}

export const useUpdateReply =(postId:number, replyId:number)=>{
    const queryClient = useQueryClient();
    return useMutation((form:any)=>ReplyAPI.updateReply(replyId, form),{
        onSuccess: ()=>queryClient.invalidateQueries(["post", postId])
    })
}

export const useDeleteReply =(postId:number, replyId:number)=>{
    const queryClient = useQueryClient();
    return useMutation(()=>ReplyAPI.deleteReply(replyId),{
        onSuccess: ()=>queryClient.invalidateQueries(["post", postId])
    })
}