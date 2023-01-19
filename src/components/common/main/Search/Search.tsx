import { SearchInput } from '@components/atoms';
import { ReactComponent as SearchIcon } from '@assets/svg/search-icon.svg';
import classes from './search.module.scss';
import { useSearch } from '@hooks/useSearch';
import { POSTS_URL_PARAMS } from '@hooks/usePostsSearchParams';

export function Search() {
  const {
    searchFormWrapRef,
    onSubmit,
    inputValue,
    isOpenPreview,
    onChange,
    onFocus,
  } = useSearch();

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
    </section>
  );
}

export const linkToUrl = (keyword: string, pathname: string) =>
  pathname === '/'
    ? `posts/all?${POSTS_URL_PARAMS.KEYWORD}=${keyword}`
    : `?${POSTS_URL_PARAMS.KEYWORD}=${keyword}`;
