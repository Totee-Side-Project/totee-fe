import React, {useState} from 'react';
import classes from './commentInput.module.scss';
import { Input, Button } from '@components/atoms';
import {useAddComment} from '@hooks/useMutateQuery';

interface ICommentInputPropsType{
    postId: number;
}

export function CommentInput({postId}:ICommentInputPropsType) {
    const [inputValue, setInputValue]=useState('');

    const AddPostCommentMutate =useAddComment(postId);

    const onSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        AddPostCommentMutate.mutateAsync({
            postId:postId,
            content: inputValue
        })
        .then((res)=>res)
        .catch((err)=>err)
    }   

    return (
        <form className={classes.commentInput_wrapper} onSubmit={onSubmit}>
            <Input
                autoFocus
                value={inputValue}
                type="text"
                name="comment"
                id="comment"
                placeholder='댓글을 입력해주세요'
                onChange={(e) => setInputValue(e.target.value)}
            ></Input>
            <div className={classes.btn_wrapper}>
                <Button
                    text="취소"
                    type="button"
                    style={{
                        width: "150px",
                        backgroundColor:"#fff",
                        border: "2px solid #BFBFBF",
                        borderRadius: "10px",
                        color:"#6A6A6A",
                    }}
                    onClick={()=>setInputValue('')}
                ></Button>
                  <Button
                    text="댓글 등록"
                    type="submit"
                    style={{
                        width: "250px",
                        backgroundColor:"#568A35",
                        border: "none",
                        borderRadius: "10px",
                        color:"#fff",
                    }}
                ></Button>
            </div>
        </form>
  )
}
