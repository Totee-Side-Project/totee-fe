import { useMutation } from "react-query";
import { UserAPI } from "@api/api";
import { useQueryClient } from "react-query";

export const useAddUserInfo =()=>{
    const queryClient = useQueryClient();
    return useMutation((form:any)=>UserAPI.updateUserInfo(form),{
        onSuccess: ()=>queryClient.invalidateQueries("user")
    })
}