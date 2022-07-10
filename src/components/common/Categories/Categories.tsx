import React, { useEffect, useState } from 'react';
import classes from './categories.module.scss';
import { CategoryButton } from '@components/atoms';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useGetCategoryList} from 'hooks/useGetQuery';

interface IImgButtonProps {
  isSelected: boolean;
}

interface ICategory{
  categoryName : string;
  imageUrl: string;
}

interface ITextButtonProps extends IImgButtonProps {
  text: string;
}
export function Categories() {
  const [isShowTotal, setIsShowTotal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [categoryList, setCategoryList]=useState<ICategory[]>([]);

  let [searchParams, setSearchParams] = useSearchParams();
  
  const {data , isFetching} = useGetCategoryList();

  useEffect(()=>{
    if(data && data.data.header.code === 200){
      const total={
        categoryName :"전체",
        imageUrl : null,
      }
      setCategoryList([total, ...data.data.body.data]);
    }
  },[data])
 

  useEffect(() => {
    searchParams.get('cateogory') !== null
      ? setSelectedCategory(searchParams.get('cateogory') as string)
      : setSelectedCategory('전체');

    searchParams.get('isShowTotal') === "전체보기"
    ? setIsShowTotal(false)
    : setIsShowTotal(true)
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
      {categoryList.map((category: ICategory) => (
        <CategoryButton
          key={`categoryButton-${category.categoryName}`}
          type={isShowTotal ? 'big' : 'small'}
          isSelected={false}
          text={isShowTotal ? category.categoryName : undefined}
          img={
            isShowTotal ? (
              <ImgButton isSelected={selectedCategory === category.categoryName}></ImgButton>
            ) : (
              <TextButton
                isSelected={selectedCategory === category.categoryName}
                text={category.categoryName}
              ></TextButton>
            )
          }
          onClick={() =>
            setSearchParams({
              ...Object.fromEntries(searchParams),
              ['cateogory']: category.categoryName,
            })
          }
        ></CategoryButton>
      ))}
    </section>
  );
}
