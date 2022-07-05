import React, { useState } from 'react';
import classes from './search.module.scss';
import { Input } from '@components/atoms';
import { ReactComponent as SearchIcon } from '@assets/search-icon.svg';

export function Search() {
  const [inputValue, setInputValue] = useState('');
  return (
    <section className={classes.search_wrapper}>
      <div className={classes.input_wrapper}>
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
      </div>
    </section>
  );
}
