import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SearchInput } from '@components/atoms';
import { ReactComponent as SearchIcon } from '@assets/svg/search-icon.svg';
import { useGetSearchPostList } from '@hooks/query/useGetQuery';
import { useOutsideAlerter } from '@hooks/useOutsideAlerter';
import useDebounceInput from '@hooks/useDebounceInput';
import { POSTS_URL_PARAMS } from 'pages/PostsPage';
import classes from './search.module.scss';

export function Search() {
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [previewResult, setPreviewResult] = useState<string[]>([]);
  const searchFormWrapRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounceInput(inputValue);
  useOutsideAlerter(searchFormWrapRef, () => closePreview());

  const { data } = useGetSearchPostList({
    keyword: debouncedValue,
    size: 10,
    sortOption: '',
  });

  useEffect(() => {
    if (data?.content) {
      setPreviewResult([...new Set(data?.content.map(({ title }) => title))]);
    }
  }, [data?.content]);

  useEffect(() => {
    if (!inputValue) return closePreview();
    if (!previewResult.length) return closePreview();

    openPreview();
  }, [inputValue, previewResult]);

  const openPreview = () => setIsOpenPreview(true);
  const closePreview = () => setIsOpenPreview(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setInputValue('');
    navigate(linkToUrl(inputValue, pathname));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);
  const onFocus = () => isOpenPreview && openPreview();

  return (
    <section className={classes.search_wrapper}>
      <div className={classes.input_wrapper} ref={searchFormWrapRef}>
        <form onSubmit={onSubmit}>
          <SearchInput
            style="search"
            value={inputValue}
            type="text"
            name="search"
            id="search"
            placeholder="찾고있는 스터디의 이름 등등 뭔가.. 검색유도하는 글"
            img={<SearchIcon width={25} height={25}></SearchIcon>}
            isPreview={isOpenPreview}
            onChange={onChange}
            onFocus={onFocus}
          />
        </form>
        {/* 
          TODO: 추천검색어 기능을 정확히 지원할 때 기능추가 후 렌더링해주어야함
        {isOpenPreview && (
          <SearchPreview
            closePreview={closePreview}
            previewResult={previewResult}
          />
        )} */}
      </div>
      {/* 
        TODO: 검색결과 갯수를 알려주는 UI 작업
      {searchResult?.data && searchResult.keyword !== null && (
        <div className={classes.searchResult}>
          <div>
            &quot; {searchResult.keyword} &quot; 에 대한 검색 결과{' '}
            <span>{searchResult.data.length}</span> 개
          </div>
        </div>
      )} */}
    </section>
  );
}

export const linkToUrl = (keyword: string, pathname: string) =>
  pathname === '/'
    ? `posts/all?${POSTS_URL_PARAMS.KEYWORD}=${keyword}`
    : `?${POSTS_URL_PARAMS.KEYWORD}=${keyword}`;
