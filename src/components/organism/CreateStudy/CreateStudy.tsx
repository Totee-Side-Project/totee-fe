import { ChangeEvent, MouseEvent } from 'react';
import { useReducer } from 'react';

import { PostRequestDto } from '@api/requestType';

import { defaultForm, reducerOfStudyPost } from './reducerOfStudyPost';
import { data } from './data';
import { DefaultForm } from './DefaultForm';
import { DetailForm } from './DetailForm';
import classes from './createStudy.module.scss';

export const CreateStudy = ({
  initialData,
}: {
  initialData?: PostRequestDto;
}) => {
  const [form, dispatch] = useReducer(
    reducerOfStudyPost,
    !initialData ? defaultForm : initialData,
  );

  const onChangeByInput = (e: ChangeEvent<HTMLInputElement>, id: any) => {
    const { value, type, max } = e.target;
    if (type === 'number' && Number(value) > Number(max)) {
      alert(`${max}명 이하만 입력가능해요`);
      return;
    }
    dispatch({ type: id, payload: value });
  };
  const onChangeBySelect = (e: MouseEvent<HTMLElement>, id: any) => {
    const currentTarget = e.currentTarget;
    const target = e.target as HTMLElement;

    if (currentTarget === target) return;

    dispatch({ type: id, payload: target.innerText });
  };
  const onWheelWithBlur = (e: MouseEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };
  // 인자로 자식의 변경된 state를 넘겨받안 setState해주는 부분
  const onChangeByChildrenState = (data: (undefined | string)[]) => {
    dispatch({ type: 'skillList', payload: data });
  };
  const onChangeByCheckbox = (data: string) => {
    dispatch({ type: 'onlineOrOffline', payload: data });
  };
  const onChangeByEditor = (content: any) => {
    dispatch({ type: 'content', payload: content });
  };
  const onResetValueByDisabled = () => {
    dispatch({ type: 'region', payload: '' });
    dispatch({ type: 'detailedRegion', payload: '' });
  };

  return (
    <div className={classes.studypage_container}>
      <DefaultForm
        form={form}
        onChangeByInput={onChangeByInput}
        onChangeBySelect={onChangeBySelect}
        onChangeByChildrenState={onChangeByChildrenState}
        onChangeByCheckbox={onChangeByCheckbox}
        onResetValueByDisabled={onResetValueByDisabled}
        onWheelWithBlur={onWheelWithBlur}
      />
      <DetailForm
        form={form}
        data={data}
        onChangeByInput={onChangeByInput}
        onChangeByEditor={onChangeByEditor}
      />
    </div>
  );
};
