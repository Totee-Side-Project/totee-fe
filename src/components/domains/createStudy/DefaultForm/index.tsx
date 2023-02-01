/* eslint-disable no-unused-vars */
import type { ChangeEvent, MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import paragraphLine from '@assets/png/paragraph_line.png';
import { data } from '../data';
import { DefaultFormElement } from '../FormElements';
// import { DefaultFormElement } from '../FormElements';
import classes from '../createStudy.module.scss';
import { PostRequestDto } from '@api/post/types';

interface DefaultFormProps {
  form: PostRequestDto;
  onChangeByInput: (e: ChangeEvent<HTMLInputElement>, key: any) => void;
  onChangeBySelect: (e: MouseEvent<HTMLElement>, key: any) => void;
  onChangeByChildrenState: (data: (undefined | string)[]) => void;
  onChangeByCheckbox: (data: string) => void;
  onResetValueByDisabled: () => void;
  onWheelWithBlur: (e: MouseEvent<HTMLInputElement>) => void;
}
export const DefaultForm = ({
  form,
  onChangeByInput,
  onChangeBySelect,
  onChangeByChildrenState,
  onChangeByCheckbox,
  onResetValueByDisabled,
  onWheelWithBlur,
}: DefaultFormProps) => {
  const [formElements, setFormElements] = useState(data.defaultFormElements);
  useEffect(() => {
    if (form.onlineOrOffline === '온라인') {
      setFormElements(data.defaultFormElementsWithOnline);
      return onResetValueByDisabled();
    }
    return setFormElements(data.defaultFormElements);
  }, [form.onlineOrOffline]);

  return (
    <section>
      <div className={classes.study_form_header}>
        <h1>스터디 개설하기</h1>
        <p>개설하려는 스터디의 정보를 입력해 주세요.</p>
        <img
          src={paragraphLine}
          className={classes.paragraph_line}
          alt="paragraph_line"
        />
      </div>
      {Object.entries(formElements).map(
        ([id, [title, type, placeholder, disabled]]) => (
          <DefaultFormElement
            key={id}
            id={id}
            title={title}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            value={form[id]}
            onChangeByInput={(e) => onChangeByInput(e, id)}
            onChangeBySelect={(e) => onChangeBySelect(e, id)}
            onChangeByChildrenState={onChangeByChildrenState}
            onChangeByCheckbox={onChangeByCheckbox}
            onWheelWithBlur={onWheelWithBlur}
          />
        ),
      )}
    </section>
  );
};
