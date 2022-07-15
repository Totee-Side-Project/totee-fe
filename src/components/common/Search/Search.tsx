import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { searchState } from '@store/search';
import classes from './search.module.scss';
import { Input } from '@components/atoms';
import { ReactComponent as SearchIcon } from '@assets/search-icon.svg';
import { useGetSearchPostList } from '@hooks/useGetQuery';
import {useOutsideAlerter} from '@hooks/useOutsideAlerter';

export function Search() {
  const [inputValue, setInputValue] = useState('');
  const [isOpenPreview, setIsOpenPreview]=useState(false);
  const [searchResult,setSearchResult] = useRecoilState(searchState);
  const [previewResult, setPreviewResult]=useState<any[]>();
  const inputRef= useRef(null as any);
  const {data, refetch, isFetching} = useGetSearchPostList(inputValue);
  
  useOutsideAlerter(inputRef, ()=>{setIsOpenPreview(false)})
  
  const onSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    if(inputValue.length>0){
      setIsOpenPreview(false);
      setSearchResult({
        data: data?.data?.body.data.content,
        keyword: inputValue,
      });    
    }
    else{
      setSearchResult({
        data :null,
        keyword: ''
      });
    }
  }
  
  useEffect(()=>{
    if(inputValue.length===0){
      setPreviewResult([]);
      setIsOpenPreview(false);
    } 
  },[inputValue])

  useEffect(()=>{
    if(data && data.status ===200 && data?.data?.body.data.content){
      setPreviewResult(Array.from(new Set(data.data.body.data.content.map((ct:any)=>ct.title))));
      setIsOpenPreview(true);
    }
  },[data]);


  return (
    <section className={classes.search_wrapper}>
    {!isOpenPreview
    ?
      <div className={classes.input_wrapper}>
        <form onSubmit={onSubmit}>
          <Input
            style="search"
            value={inputValue}
            type="text"
            name="search"
            id="search"
            placeholder="찾고있는 스터디의 이름 등등 뭔가.. 검색유도하는 글"
            img={<SearchIcon width={22.5} height={22.5}></SearchIcon>}
            onChange={(e) => setInputValue(e.target.value)}
          ></Input>
        </form>
      </div>
    :
      <div className={classes.input_wrapper} ref={inputRef}>
        <form onSubmit={onSubmit}>
          <Input
            style="search"
            value={inputValue}
            type="text"
            name="search"
            id="search"
            placeholder="찾고있는 스터디의 이름 등등 뭔가.. 검색유도하는 글"
            img={<SearchIcon width={22.5} height={22.5}></SearchIcon>}
            onChange={(e) => setInputValue(e.target.value)}
          ></Input>
        </form>
        {previewResult &&  previewResult.length>0 &&
        <div className={classes.preview_wrapper}>
        <ul className={classes.preview_list}>
          {previewResult?.map((result:any)=>
            <li className={classes.preview_item} onClick={()=>{
              setInputValue(result);
              setIsOpenPreview(false);
              setSearchResult({
                data: data?.data?.body.data.content,
                keyword: result,
              });
            }}>{result}</li>
          )}
        </ul>
      </div>}
      </div>
}
    </section>
  );
}
