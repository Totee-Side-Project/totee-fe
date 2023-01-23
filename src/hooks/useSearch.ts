// 어떤 걸 search 할 것인가

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { linkToUrl } from '@components/atoms/Search';
import {
  useGetSearchMentoringList,
  useGetSearchPostList,
} from '@hooks/query/useGetQuery';
import useDebounceInput from '@hooks/useDebounceInput';
import { useOutsideAlerter } from '@hooks/useOutsideAlerter';

export const SEARCH_PAGE_SIZE = 5;
const DESC = 'desc';

export const useSearch = () => {
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [postsPreviewResult, setPostsPreviewResult] = useState<string[]>([]);
  const [mentoringPreviewResult, setMentoringPreviewResult] = useState<
    string[]
  >([]);
  const searchFormWrapRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounceInput(inputValue);
  useOutsideAlerter(searchFormWrapRef, () => closePreview());

  const { data: searchPostList } = useGetSearchPostList({
    keyword: debouncedValue,
    size: SEARCH_PAGE_SIZE,
    sort: [DESC],
    page: 0,
  });

  const { data: searchMentoringList } = useGetSearchMentoringList({
    keyword: debouncedValue,
    size: SEARCH_PAGE_SIZE,
    sort: [DESC],
    page: 0,
  });

  useEffect(() => {
    if (searchPostList?.content) {
      setPostsPreviewResult([
        ...new Set(searchPostList?.content.map(({ title }) => title)),
      ]);
    }
  }, [searchPostList?.content]);

  useEffect(() => {
    if (searchMentoringList?.content) {
      setMentoringPreviewResult([
        ...new Set(searchMentoringList?.content.map(({ title }) => title)),
      ]);
    }
  }, [searchMentoringList?.content]);

  useEffect(() => {
    if (!inputValue) return closePreview();
    if (!postsPreviewResult.length) return closePreview();

    openPreview();
  }, [inputValue, postsPreviewResult]);

  const openPreview = () => setIsOpenPreview(true);
  const closePreview = () => setIsOpenPreview(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setInputValue('');
    navigate(linkToUrl(inputValue, pathname));
    // TODO: page Params를 0으로 초기화해줘야한다.
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);
  const onFocus = () => isOpenPreview && openPreview();

  return {
    searchFormWrapRef,
    onSubmit,
    inputValue,
    isOpenPreview,
    onChange,
    onFocus,
  };
};
