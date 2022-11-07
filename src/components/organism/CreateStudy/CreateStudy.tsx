import { ChangeEvent, MouseEvent, ReactNode, useReducer } from 'react';
import { Label } from '@components/atoms/label/Label';
import { SkillSelector } from '@components/domain/SkillSelector';
import { Input } from '@components/ui/Input/Input';
import { Select } from '@components/ui/Select/Select';
import { Checkbox } from '@components/ui/Checkbox/Checkbox';
import VerticalLine from '@assets/recentLine.svg';
import DownArrow from '@assets/recentIcon.svg';
import paragraphLine from '@assets/paragraph_line.png';

import { useAddPost, useUpdatePost } from '@hooks/usePostQuery';
import { PostAPI } from '@api/api';
import { PostRequestDto } from '@api/requestType';

import { defaultForm, reducerOfStudyPost } from './reducerOfStudyPost';
import { data } from './data';
import classes from './createStudy.module.scss';

export const CreateStudy = () => {
  return (
    <div className="studypage_container">
      <DefaultForm />
    </div>
  );
};

const DefaultForm = () => {
  const [form, dispatch] = useReducer(reducerOfStudyPost, defaultForm);

  const onChangeByInput = (e: ChangeEvent<HTMLInputElement>, key: any) => {
    // 숫자만 들어오게 해야한다.
    dispatch({ type: key, payload: e.target.value });
  };

  // select를 클릭해서 onChange event가 발생하게되면 dispatch를 날리거나 useContext를 사용해주자
  const onChangeBySelect = (e: MouseEvent<HTMLElement>, key: any) => {
    const currentTarget = e.currentTarget;
    const target = e.target as HTMLElement;

    if (currentTarget === target) return;

    dispatch({ type: key, payload: target.innerText });
  };

  // 인자로 자식의 변경된 state를 넘겨받안 dispatch 하는 부분
  const onChangeByChildrenState = (data: (undefined | string)[]) => {
    dispatch({ type: 'skillList', payload: data });
  };

  const onChangeByOnlineOrOffline = (data: string) => {
    dispatch({ type: 'OnlineOrOffline', payload: data });
  };

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
      {Object.entries(data.select).map(([id, [title, type, placeholder]]) => (
        <DefaultFormElement
          key={id}
          id={id}
          title={title}
          type={type}
          placeholder={placeholder}
          value={form[id]}
          onChangeByInput={(e) => onChangeByInput(e, id)}
          onChangeBySelect={(e) => onChangeBySelect(e, id)}
          onChangeByChildrenState={onChangeByChildrenState}
          onChangeByOnlineOrOffline={onChangeByOnlineOrOffline}
        />
      ))}
      <SubmitButton form={form} />
    </section>
  );
};

interface StudySelectProps {
  id: string;
  title: string;
  type: string;
  placeholder: string;
  value: string | number | string[];
  onChangeByInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeBySelect: (e: MouseEvent<HTMLElement>) => void;
  onChangeByChildrenState: (data: (undefined | string)[]) => void;
  onChangeByOnlineOrOffline: (data: string) => void;
}

export const DefaultFormElement = ({
  id,
  title,
  type,
  placeholder,
  value,
  onChangeByInput,
  onChangeBySelect,
  onChangeByChildrenState,
  onChangeByOnlineOrOffline,
}: StudySelectProps) => {
  if (type === 'select') {
    return (
      <div className={classes.form_element_wrap}>
        <Select
          label={<Label text={title} />}
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
          leftValue={
            <img src={VerticalLine} className={classes.vertical_line} alt="|" />
          }
          value={value as string}
          placeholder={placeholder}
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
          leftValue={
            <img src={VerticalLine} className={classes.vertical_line} alt="|" />
          }
          value={value as string}
          max={15}
          min={1}
          onChange={onChangeByInput}
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
        <DefaultFormCheckbox
          top={<Label text={title} />}
          onChangeByOnlineOrOffline={onChangeByOnlineOrOffline}
        />
      </div>
    );

  return <div style={{ display: 'none' }}></div>;
};

// 어떤것을 보여줄지 넘겨주고 중간역할
const DefaultFormCheckbox = ({
  top,
  onChangeByOnlineOrOffline,
}: {
  top: ReactNode;
  onChangeByOnlineOrOffline: (data: string) => void;
}) => {
  return (
    <Checkbox
      top={top}
      options={data.checkbosOptions}
      onClick={onChangeByOnlineOrOffline}
      className={classes.checkbox_wrap}
    />
  );
};

const SubmitButton = ({ form }: { form: PostRequestDto }) => {
  // 폼 data를 mutate 해주는 것은 버튼의 역할이다.
  const addPostMutation = useAddPost(PostAPI.createPost);

  const handleClick = async () => {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, String(value)),
    );

    addPostMutation.mutateAsync(formData);
  };
  return <button onClick={handleClick}>생성하기</button>;
};
