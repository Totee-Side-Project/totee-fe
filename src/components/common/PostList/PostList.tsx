
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PostCard } from '../PostCard/PostCard';
import {IPostType} from 'types/post.types';
import {useGetPostListAPI} from '@hooks/useGetQuery';
import classes from './postList.module.scss';
import { ReactComponent as EllipseIcon } from '@assets/ellipse-icon.svg';

export function PostList() {
  const [posts, setPosts] = useState<IPostType[]>([]);
  const [selectedFilter, setSelectedFilter]=useState(0)
  const [isShowTotal, setIsShowTotal]=useState(false);

  const {data, isFetching} = useGetPostListAPI();

  useEffect(()=>{
    if(data && !isFetching){
      setPosts(data.data.body.data.content);
    }
  },[data])

  return (
    <div className={classes.postListContainer}>
      <div className={classes.postListContainerHeader}>
        {!isShowTotal
          ? <span onClick={()=>setIsShowTotal(true)}>전체보기 &gt;</span>
          : <ul className={classes.filterList}>
            {["최신순", "댓글많은순", "좋아요 순"].map((item:string, idx:number)=>
              <li 
                onClick={()=>setSelectedFilter(idx)}
                key={`filter-${idx}`}
              >
                  <EllipseIcon fill={selectedFilter===idx? "#568A35":"#A0AEC0"}/>
                  <span className={selectedFilter===idx? classes.selected:''}>{item}</span>
              </li>
            )}
            </ul>
        }
      </div>
      <div className={classes.postWrapper}>
        {posts.map((post:IPostType,idx:number)=>
          <PostCard 
            key={`postCard-${idx}`}
            post={post}
            />
          )}
      </div>
    </div>
  );
}

