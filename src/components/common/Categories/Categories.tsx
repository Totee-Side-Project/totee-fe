import React, { useEffect, useState } from 'react';
import classes from './categories.module.scss';
import { CategoryButton } from '@components/atoms';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

interface IImgButtonProps {
  isSelected: boolean;
}

interface ITextButtonProps extends IImgButtonProps {
  text: string;
}
export function Categories() {
  const [isShowTotal, setIsShowTotal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  let [searchParams, setSearchParams] = useSearchParams();

  const categories = {
    전체: 'total',
    스터디: 'study',
    멘토멘티: 'mentoMentee',
    프로젝트: 'project',
    동아리: 'team',
  };

  useEffect(() => {
    searchParams.get('cateogory') !== null
      ? setSelectedCategory(searchParams.get('cateogory') as string)
      : setSelectedCategory('전체');
  }, [searchParams]);

  const ImgButton = ({ isSelected }: IImgButtonProps) => (
    <div
      className={classNames(
        classes.imgButton,
        isSelected ? classes.selected : '',
      )}
    ></div>
  );

  const TextButton = ({ isSelected, text }: ITextButtonProps) => (
    <div
      className={classNames(
        classes.textButton,
        isSelected ? classes.selected : '',
      )}
    >
      {text}
    </div>
  );

  return (
    <section className={classes.categories_wrapper}>
      {Object.keys(categories).map((name: string) => (
        <CategoryButton
          key={`categoryButton-${name}`}
          type={isShowTotal ? 'big' : 'small'}
          isSelected={false}
          text={isShowTotal ? name : undefined}
          img={
            isShowTotal ? (
              <ImgButton isSelected={selectedCategory === name}></ImgButton>
            ) : (
              <TextButton
                isSelected={selectedCategory === name}
                text={name}
              ></TextButton>
            )
          }
          onClick={() =>
            setSearchParams({
              ...searchParams,
              ['cateogory']: name,
            })
          }
        ></CategoryButton>
      ))}
    </section>
  );
}
