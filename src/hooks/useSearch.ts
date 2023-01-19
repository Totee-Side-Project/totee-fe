// 어떤 걸 search 할 것인가

import { linkToUrl } from '@components/common';
import { useGetSearchPostList } from '@hooks/query/useGetQuery';
import useDebounceInput from '@hooks/useDebounceInput';
import { useOutsideAlerter } from '@hooks/useOutsideAlerter';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useSearch = () => {
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [previewResult, setPreviewResult] = useState<string[]>([]);
  const searchFormWrapRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounceInput(inputValue);
  useOutsideAlerter(searchFormWrapRef, () => closePreview());

  const { data } = useGetSearchPostList({
    keyword: debouncedValue,
    size: 10,
    sort: '',
    page: 0,
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

  return {
    searchFormWrapRef,
    onSubmit,
    inputValue,
    isOpenPreview,
    onChange,
    onFocus,
  };
};
