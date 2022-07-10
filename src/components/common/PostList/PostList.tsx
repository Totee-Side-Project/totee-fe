
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
  const [selectedFilter, setSelectedFilter]=useState('최신순');
  const [isShowTotal, setIsShowTotal]=useState(false);
  const [categoryName, setCategoryName]=useState('전체');

  let [searchParams, setSearchParams] = useSearchParams();

  const {data, isFetching} = useGetPostListAPI(categoryName);
  
  useEffect(()=>{
    if(data && !isFetching && data.data.body.data.content){
      setPosts(sortingData(data.data.body.data.content));
    }
  },[data]);

  useEffect(() => {
    searchParams.get('cateogory') !== null
      ? setCategoryName(searchParams.get('cateogory') as string)
      : setCategoryName('전체');

    searchParams.get('filter') !== null && setSelectedFilter(searchParams.get('filter') as string);
  }, [searchParams]);

  useEffect(()=>{
    if(posts){
      setPosts([...sortingData(posts)]);
    }
  },[selectedFilter])

  useEffect(()=>{
    setSearchParams({
      ...Object.fromEntries(searchParams),
      ['isShowTotal']: isShowTotal? "전체보기":"일부보기"
    })
  },[isShowTotal])


  const sortingData=(data:IPostType[]) : IPostType[]=>{
    let newData=data;
    console.log(selectedFilter);
    switch(selectedFilter){
      case "최신순":  newData.sort((a,b)=> + new Date(b.createdAt)- + new Date(a.createdAt)); break;
      case "댓글많은순": newData.sort((a,b)=>  b.commentNum- a.commentNum); break;
      case "좋아요순":  newData.sort((a,b)=>b.likeNum - a.likeNum); break;
    } 
  
    return newData;
  }

  return (
    <div className={classes.postListContainer}>
      <div className={classes.postListContainerHeader}>
        {!isShowTotal
          ? <span onClick={()=>setIsShowTotal(true)}>전체보기 &gt;</span>
          : <ul className={classes.filterList}>
            {["최신순", "댓글많은순", "좋아요순"].map((item:string, idx:number)=>
              <li 
                onClick={()=> setSearchParams({
                  ...Object.fromEntries(searchParams),
                  ['filter']: item,
                })}
                key={`filter-${idx}`}
              >
                  <EllipseIcon fill={selectedFilter===item? "#568A35":"#A0AEC0"}/>
                  <span className={selectedFilter===item? classes.selected:''}>{item}</span>
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

