
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PostCard } from '../PostCard/PostCard';
import {IPostType} from 'types/post.types';
import {useGetPostListAPI} from '@hooks/useGetQuery';
import classes from './postList.module.scss';
import { ReactComponent as EllipseIcon } from '@assets/ellipse-icon.svg';
import { ReactComponent as UpIcon } from '@assets/up-icon.svg';
import { useSearchParams } from 'react-router-dom';


export function PostList() {
  const [posts, setPosts] = useState<IPostType[]>([]);
  const [selectedFilter, setSelectedFilter]=useState(0)
  const [isShowTotal, setIsShowTotal]=useState(false);
  const [categoryName, setCategoryName]=useState('전체');

  let [searchParams, setSearchParams] = useSearchParams();

  const {data, isFetching} = useGetPostListAPI(categoryName!=="전체"?categoryName: undefined);
  

  useEffect(()=>{
    if(data && !isFetching){
      console.log(data.data.body.data.content);
      setPosts(data.data.body.data.content);
    }
  },[data]);

  useEffect(()=>{
    console.log(categoryName);
  },[categoryName])


  useEffect(() => {
    searchParams.get('cateogory') !== null
      ? setCategoryName(searchParams.get('cateogory') as string)
      : setCategoryName('전체');
  }, [searchParams]);

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
        {posts.slice(0, isShowTotal? posts.length : 8).map((post:IPostType,idx:number)=>
          <PostCard 
            key={`postCard-${idx}`}
            post={post}
            />
          )}
          {/* <div className={classes.upIconWrapper}>
          <div className={classes.upIcon}>
            <div><UpIcon/></div>
          </div>
          </div> */}
      </div>
    </div>
  );
}

