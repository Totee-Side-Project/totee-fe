import { ImageWithWebp } from '@components/atoms';
import Style from './dropdown.module.scss';
import { useEffect, useState } from 'react';

//? image
import IMG_ArrowDown from '@assets/svg/common/arrowDown.svg';

interface IDropDown {
  items: string[];
  defValue?: string;
  onChange?: (value: string) => void;
  errorMsg?: string;
}

const DropDown: React.FC<IDropDown> = (props) => {
  const { items, defValue, errorMsg, onChange } = props;
  //? state
  const [showDropBox, setShowDropBox] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    defValue && setSelectId(defValue);
  }, [defValue]);

  useEffect(() => {
    onChange && onChange(selectId);
    setError('');
  }, [selectId]);

  useEffect(() => {
    // console.log(errorMsg);
    errorMsg && setError(errorMsg);
  }, [errorMsg]);

  return (
    <div className={Style.wrap} onClick={() => setShowDropBox(!showDropBox)}>
      {!selectId ? '선택 안함' : selectId}
      <ImageWithWebp
        className={Style.image}
        width={26}
        height={20}
        src={IMG_ArrowDown}
        srcSet={IMG_ArrowDown}
        alt="arrowDown"
      />
      <div className={`${Style.dropBox} ${!showDropBox && Style.hide}`}>
        {items.map((item) => (
          <p onClick={() => setSelectId(item)}>{item}</p>
        ))}
      </div>
      <span className={Style.error}>{error}</span>
    </div>
  );
};

export default DropDown;
