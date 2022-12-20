/* eslint-disable no-unused-vars */
import { ChangeEvent, MouseEvent } from 'react';

import { Label } from '@components/atoms/label/Label';
import { Input } from '@components/ui/Input/Input';
import { Select } from '@components/ui/Select/Select';
import { SkillSelector } from '@components/common/selector/SkillSelector';
import { Checkbox } from '@components/ui/Checkbox/Checkbox';
import VerticalLine from '@assets/svg/recentLine.svg';
import DownArrow from '@assets/svg/recentIcon.svg';
import paragraphLine from '@assets/png/paragraph_line.png';

import { data } from '../data';
import classes from '../createStudy.module.scss';

interface DefaultFormElementProps {
  id: string;
  title: string;
  type: string;
  placeholder: string;
  disabled: string;
  value: string | number | string[];
  onChangeByInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeBySelect: (e: MouseEvent<HTMLElement>) => void;
  onChangeByChildrenState: (data: (undefined | string)[]) => void;
  onChangeByCheckbox: (data: string) => void;
  onWheelWithBlur: (e: MouseEvent<HTMLInputElement>) => void;
}

export const DefaultFormElement = ({
  id,
  title,
  type,
  placeholder,
  value,
  disabled,
  onChangeByInput,
  onChangeBySelect,
  onChangeByChildrenState,
  onChangeByCheckbox,
  onWheelWithBlur,
}: DefaultFormElementProps) => {
  if (type === 'select') {
    return (
      <div className={classes.form_element_wrap}>
        <Select
          label={<Label text={title} disabled={disabled} />}
          trigger={
            <label className="recent_wrapper">
              <div className="recent_value">
                <span className="value_placeholder">
                  {!value ? placeholder : `${value}`}
                </span>
              </div>
              <img
                src={VerticalLine}
                className={classes.vertical_line}
                alt="|"
              />
              <img src={DownArrow} className="recent_icon" alt=">" />
            </label>
          }
          onChange={onChangeBySelect}
          options={data.selectOptions[id]}
          disabled={disabled}
        />
      </div>
    );
  }
  if (type === 'text') {
    return (
      <div className={classes.form_input_wrap}>
        <Input
          type="text"
          className={classes.studypage_input}
          top={title ? title : undefined}
          left={
            <img src={VerticalLine} className={classes.vertical_line} alt="|" />
          }
          value={(value as string) ?? ''}
          placeholder={placeholder}
          disabled={!disabled ? false : true}
          onChange={onChangeByInput}
        />
      </div>
    );
  }
  if (type === 'number')
    return (
      <div className={classes.form_input_wrap}>
        <Input
          type={type}
          placeholder="최소 1명 ~ 최대 15명"
          className={classes.studypage_input}
          top={<Label text={title} />}
          left={
            <img src={VerticalLine} className={classes.vertical_line} alt="|" />
          }
          value={value as string}
          max={15}
          min={1}
          onChange={onChangeByInput}
          onWheel={onWheelWithBlur}
          disabled={!disabled ? false : true}
        />
      </div>
    );

  // 다른 Input Select와 비슷한 props를 넘겨받는 multiSelector로 변경해야한다.
  if (type === 'multiSelect')
    return (
      <div className={classes.form_skill_wrap}>
        <img
          src={paragraphLine}
          className={classes.paragraph_line}
          alt="paragraph_line"
        />
        <SkillSelector
          top={
            <div className={classes.center}>
              <Label text={title} />
            </div>
          }
          initialState={value as string[]}
          onChangeArray={onChangeByChildrenState}
        />
        <img
          src={paragraphLine}
          className={classes.paragraph_line}
          alt="paragraph_line"
        />
      </div>
    );
  if (type === 'checkbox')
    return (
      <div className={classes.form_checkbox_wrap}>
        <Checkbox
          top={<Label text={title} />}
          isChecked={value as string}
          options={data.checkboxOptions}
          onClick={onChangeByCheckbox}
          className={classes.checkbox_wrap}
        />
      </div>
    );

  return null;
};
