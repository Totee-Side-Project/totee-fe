import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchState } from '@store/search';
import classes from './search.module.scss';
import { SearchInput } from '@components/atoms';
import { ReactComponent as SearchIcon } from '@assets/svg/search-icon.svg';
import { useGetSearchPostList } from '@hooks/query/useGetQuery';
import { useOutsideAlerter } from '@hooks/useOutsideAlerter';
import useDebounceInput from '@hooks/useDebounceInput';

export function Search() {
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [searchResult, setSearchResult] = useRecoilState(searchState);
  const [previewResult, setPreviewResult] = useState<any[]>();
  const inputRef = useRef(null as any);

  const { inputValue, setInputValue } = useDebounceInput('');

  const { data, refetch, isFetching } = useGetSearchPostList(inputValue);

  useOutsideAlerter(inputRef, () => {
    setIsOpenPreview(false);
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpenPreview(false);
    if (inputValue.length > 0) {
      setSearchResult({
        data: data?.data?.body.data.content,
        keyword: inputValue as string,
      });
    } else {
      setSearchResult({
        data: null,
        keyword: null,
      });
    }
  };

  useEffect(() => {
    if (inputValue.length === 0) {
      setPreviewResult([]);
      setIsOpenPreview(false);
    }
  }, [inputValue]);

  useEffect(() => {
    if (data && data.status === 200 && data?.data?.body.data.content) {
      setPreviewResult(
        Array.from(
          new Set(data.data.body.data.content.map((ct: any) => ct.title)),
        ),
      );
      setIsOpenPreview(true);
    }
  }, [data]);

  return (
    <section className={classes.search_wrapper}>
      {!isOpenPreview ? (
        <div className={classes.input_wrapper}>
          <form onSubmit={onSubmit}>
            <SearchInput
              style="search"
              value={inputValue}
              type="text"
              name="search"
              id="search"
              placeholder="찾고있는 스터디의 이름 등등 뭔가.. 검색유도하는 글"
              img={<SearchIcon width={25} height={25}></SearchIcon>}
              onChange={(e) => setInputValue(e.target.value)}
            ></SearchInput>
          </form>
        </div>
      ) : (
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
              onChange={(e) => setInputValue(e.target.value)}
            ></SearchInput>
          </form>
          {previewResult && previewResult.length > 0 && (
            <div className={classes.preview_wrapper}>
              <ul className={classes.preview_list}>
                {previewResult?.map((result: any, idx: number) => (
                  <li
                    key={`preview-${idx}`}
                    className={classes.preview_item}
                    onClick={() => {
                      setInputValue(result);
                      setIsOpenPreview(false);
                      setSearchResult({
                        data: data?.data?.body.data.content,
                        keyword: result,
                      });
                    }}
                  >
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {searchResult && searchResult.data && searchResult.keyword !== null && (
        <div className={classes.searchResult}>
          <div>
            &quot; {searchResult.keyword} &quot; 에 대한 검색 결과{' '}
            <span>{searchResult.data.length}</span> 개
          </div>
        </div>
      )}
    </section>
  );
}
