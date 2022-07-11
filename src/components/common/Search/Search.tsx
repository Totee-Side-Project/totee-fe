import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { searchState } from '@store/search';
import classes from './search.module.scss';
import { Input } from '@components/atoms';
import { ReactComponent as SearchIcon } from '@assets/search-icon.svg';
import {useGetSearchPostList} from '@hooks/useGetQuery';

export function Search() {
  const [inputValue, setInputValue] = useState('');
  const [searchResult,setSearchResult] = useRecoilState(searchState);

  const {data, refetch, isFetching} = useGetSearchPostList(inputValue);

  const onSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    refetch();
  }

  useEffect(()=>{
    if(data?.data?.body.data.content){
      setSearchResult(data.data.body.data.content);
    }
  },[data])

  return (
    <section className={classes.search_wrapper}>
      <div className={classes.input_wrapper}>
        <form onSubmit={onSubmit}>
          <Input
            style="search"
            value={inputValue}
            type="text"
            name="search"
            id="search"
            placeholder="찾고있는 스터디의 이름 등등 뭔가.. 검색유도하는 글"
            img={<SearchIcon></SearchIcon>}
            onChange={(e) => setInputValue(e.target.value)}
          ></Input>
        </form>
      </div>
    </section>
  );
}
