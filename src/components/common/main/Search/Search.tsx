import React, { FormEvent, useEffect, useRef, useState } from 'react';

import { SearchInput } from '@components/atoms';
import { ReactComponent as SearchIcon } from '@assets/svg/search-icon.svg';
import { useGetSearchPostList } from '@hooks/query/useGetQuery';
import { useOutsideAlerter } from '@hooks/useOutsideAlerter';
import useDebounceInput from '@hooks/useDebounceInput';
import classes from './search.module.scss';
import { SearchPreview } from '@components/common/main/Search/SearchPreview';
import { useLocation, useNavigate } from 'react-router-dom';

export function Search() {
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [previewResult, setPreviewResult] = useState<string[]>([]);
  const inputRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounceInput(inputValue);
  useOutsideAlerter(inputRef, () => closePreview());

  const { data } = useGetSearchPostList({
    title: debouncedValue,
    size: 10,
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
    navigate(linkToUrl(inputValue, pathname));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);
  const onFocus = () => isOpenPreview && openPreview();

  return (
    <section className={classes.search_wrapper}>
      <div className={classes.input_wrapper} ref={inputRef}>
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
        {isOpenPreview && <SearchPreview previewResult={previewResult} />}
      </div>
      {/* {searchResult?.data && searchResult.keyword !== null && (
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

export const linkToUrl = (title: string, pathname: string) =>
  pathname === '/' ? `posts/all?title=${title}` : `?title=${title}`;
