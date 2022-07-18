import { useMutation } from "react-query";
import { UserAPI, CommentAPI } from "@api/api";
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