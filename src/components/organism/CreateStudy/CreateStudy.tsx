import type { ChangeEvent, MouseEvent, ReactNode } from 'react';
import type { Idata } from './data';
import { useReducer } from 'react';
import { Label } from '@components/atoms/label/Label';
import { SkillSelector } from '@components/domain/SkillSelector';
import { Input } from '@components/ui/Input/Input';
import { Select } from '@components/ui/Select/Select';
import { Checkbox } from '@components/ui/Checkbox/Checkbox';
import { Editor } from '@components/common';
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
  const [form, dispatch] = useReducer(reducerOfStudyPost, defaultForm);

  // 숫자만 들어오게 해야한다.
  const onChangeByInput = (e: ChangeEvent<HTMLInputElement>, id: any) => {
    dispatch({ type: id, payload: e.target.value });
  };
  // select를 클릭해서 onChange event가 발생하게되면 dispatch를 날리거나 useContext를 사용해주자
  const onChangeBySelect = (e: MouseEvent<HTMLElement>, id: any) => {
    const currentTarget = e.currentTarget;
    const target = e.target as HTMLElement;

    if (currentTarget === target) return;

    dispatch({ type: id, payload: target.innerText });
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

  return (
    <div className="studypage_container">
      <DefaultForm
        form={form}
        onChangeByInput={onChangeByInput}
        onChangeBySelect={onChangeBySelect}
        onChangeByChildrenState={onChangeByChildrenState}
        onChangeByCheckbox={onChangeByCheckbox}
      />
      <DetailForm
        form={form}
        data={data}
        onChangeByInput={onChangeByInput}
        onChangeByEditor={onChangeByEditor}
      />
      {/* <SubmitButton /> */}
      {/* <ResetButton /> */}
    </div>
  );
};

interface DefaultFormProps {
  form: PostRequestDto;
  onChangeByInput: (e: ChangeEvent<HTMLInputElement>, key: any) => void;
  onChangeBySelect: (e: MouseEvent<HTMLElement>, key: any) => void;
  onChangeByChildrenState: (data: (undefined | string)[]) => void;
  onChangeByCheckbox: (data: string) => void;
}
const DefaultForm = ({
  form,
  onChangeByInput,
  onChangeBySelect,
  onChangeByChildrenState,
  onChangeByCheckbox,
}: DefaultFormProps) => {
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
      {Object.entries(data.defaultFormElements).map(
        ([id, [title, type, placeholder]]) => (
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
            onChangeByCheckbox={onChangeByCheckbox}
          />
        ),
      )}
      {/* <SubmitButton className={form={form} /> */}
    </section>
  );
};

interface DefaultFormElementProps {
  id: string;
  title: string;
  type: string;
  placeholder: string;
  value: string | number | string[];
  onChangeByInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeBySelect: (e: MouseEvent<HTMLElement>) => void;
  onChangeByChildrenState: (data: (undefined | string)[]) => void;
  onChangeByCheckbox: (data: string) => void;
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
  onChangeByCheckbox,
}: DefaultFormElementProps) => {
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
          onChangeByCheckbox={onChangeByCheckbox}
        />
      </div>
    );

  return <div style={{ display: 'none' }}></div>;
};

// 어떤것을 보여줄지 넘겨주고 중간역할
const DefaultFormCheckbox = ({
  top,
  onChangeByCheckbox,
}: {
  top: ReactNode;
  onChangeByCheckbox: (data: string) => void;
}) => {
  return (
    <Checkbox
      top={top}
      options={data.checkboxOptions}
      onClick={onChangeByCheckbox}
      className={classes.checkbox_wrap}
    />
  );
};

const SubmitButton = ({
  className,
  form,
}: {
  className: string;
  form: PostRequestDto;
}) => {
  // 폼 data를 mutate 해주는 것은 버튼의 역할이다.
  const addPostMutation = useAddPost(PostAPI.createPost);

  const handleClick = async () => {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, String(value)),
    );

    addPostMutation.mutateAsync(formData);
  };
  return (
    <button className={className} onClick={handleClick}>
      글 올리기
    </button>
  );
};

interface DetailFormProps {
  children?: ReactNode;
  form: PostRequestDto;
  data: Idata;
  onChangeByInput: (e: ChangeEvent<HTMLInputElement>, key: any) => void;
  onChangeByEditor: (content: any) => void;
}
const DetailForm = ({
  children,
  form,
  data,
  onChangeByInput,
  onChangeByEditor,
}: DetailFormProps) => {
  return (
    <>
      <div className="category_title_text">
        <span>개설하려는 스터디에 대해 소개해주세요.</span>
      </div>
      <div className="category_title_line"></div>
      <Input
        className="title_input"
        top={<div className="title_title">제목</div>}
        leftValue={undefined}
        type={data.detailFormElements.title[1]}
        value={form.title}
        placeholder="제목을 입력해주세요."
        onChange={(e) => onChangeByInput(e, 'title')}
      />
      <Editor values={form} onChange={onChangeByEditor} />
      <div className="button_container">
        <SubmitButton className={'upload_button'} form={form} />
        {/* <button
          className="upload_button"
          type="submit"
          // onClick={onClickUploadButton}
        > */}
        {/* <span>글 올리기</span> */}
        {/* {type === 'create' ? (
            <span>글 올리기</span>
          ) : (
            <span>글 수정하기</span>
          )} */}
        {/* </button> */}
        <button className="cancel_button" onClick={() => {}}>
          취소-동작x
        </button>
      </div>
    </>
  );
};
