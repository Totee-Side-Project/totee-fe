import {
  ButtonHTMLAttributes,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

interface Props extends ButtonHTMLAttributes<HTMLDivElement> {
  selected: boolean;
  setData?: Dispatch<SetStateAction<boolean>>;
}

import classes from './circle.module.scss';
// 공통으로 쓸 수 있는 방법이 머가있을까>
// css 파일은 내부적으로 가지고 있고 select를 주입받는다면 background Imge를 변경하도록 작성한다.
// out

// 내부 color만 바꿔주면 된다. 인라인으로 그냥 할까?

export const Circle = ({ selected = false, setData }: Props) => {
  // const [isSelect, setIsSelect] = useState(selected);

  // const onClick = () => setIsSelect(!isSelect);
  return (
    // <div className={classes.outer_circle} onClick={onClick}>
    <div className={classes.outer_circle}>
      <div
        className={
          selected
            ? classes.inner_circle + ' ' + classes.select
            : classes.inner_circle
        }
      ></div>
    </div>
  );
};
