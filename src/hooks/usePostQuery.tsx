import { useMutation } from "react-query";
import { UserAPI, PostAPI } from "@api/api";
import { useQueryClient } from "react-query";

export const useAddPost =()=>{
    const queryClient = useQueryClient();
    return useMutation((form:any)=>PostAPI.createPost(form),{
        onSuccess: ()=>queryClient.invalidateQueries("post")
    })
}