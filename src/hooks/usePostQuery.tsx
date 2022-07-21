import { useMutation } from "react-query";
import { UserAPI, PostAPI } from "@api/api";
import { useQueryClient } from "react-query";

export const useAddPost =()=>{
    const queryClient = useQueryClient();
    return useMutation((form:any)=>PostAPI.createPost(form),{
        onSuccess: ()=>queryClient.invalidateQueries("post")
    })
}

export const useUpdatePost =(postId:number)=>{
    const queryClient = useQueryClient();
    return useMutation((form:any)=>PostAPI.upDatePost(postId,form),{
        onSuccess: ()=>queryClient.invalidateQueries(['post', postId])
    })
}