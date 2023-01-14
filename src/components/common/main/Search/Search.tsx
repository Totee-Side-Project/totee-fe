import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { searchState } from '@store/search';
import { SearchInput } from '@components/atoms';
import { ReactComponent as SearchIcon } from '@assets/svg/search-icon.svg';
import { useGetSearchPostList } from '@hooks/query/useGetQuery';
import { useOutsideAlerter } from '@hooks/useOutsideAlerter';
import useDebounceInput from '@hooks/useDebounceInput';

import { SearchPreview } from './SearchPreview';
import classes from './search.module.scss';

export function Search() {
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  // const [searchResult, setSearchResult] = useRecoilState(searchState);
  const [previewResult, setPreviewResult] = useState<any[]>([]);
  const resetSearchResult = useResetRecoilState(searchState);
  const inputRef = useRef<HTMLDivElement>(null);

  const { inputValue, setInputValue } = useDebounceInput('');
  const { data } = useGetSearchPostList(inputValue);
  const isPreviewResult = previewResult.length > 0 ? true : false;

  const openPreview = () => setIsOpenPreview(true);
  const closePreview = () => setIsOpenPreview(false);

  useOutsideAlerter(inputRef, () => closePreview());

  useEffect(() => {
    if (inputValue.length === 0) {
      // setPreviewResult([]);
      closePreview();
    }
  }, [inputValue]);

  useEffect(() => {
    if (data?.data?.body.data.content.length) {
      setPreviewResult([
        ...new Set(data.data.body.data.content.map((ct: any) => ct.title)),
      ]);
      openPreview();
      return;
    }

    closePreview();
  }, [data?.data?.body.data.content]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closePreview();
    // Todo: 이 부분이 어떤 역할을 하는지 판단해서 작업
    // if (inputValue.length > 0) {
    //   setSearchResult({
    //     data: data?.data?.body.data.content,
    //     keyword: inputValue,
    //   });
    //   return;
    // }
    resetSearchResult();
  };

  const onClickPreview = (resultText: string) => {
    setInputValue(resultText);
    closePreview();

    // Todo: 이 부분이 어떤 역할을 하는지 판단해서 작업
    // Todo: navigate 해주어야 할 것 같다.

    // setSearchResult({
    //   data: data?.data?.body.data.content,
    //   keyword: resultText,
    // });
  };

  const onFocus = () => {
    if (isPreviewResult) openPreview();
  };

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
        {isOpenPreview && (
          <SearchPreview
            previewResult={previewResult}
            onClick={onClickPreview}
          />
        )}
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
