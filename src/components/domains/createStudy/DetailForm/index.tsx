import { ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Line } from '@components/atoms/Line/Line';
import { Editor } from '@components/common';
import { Input } from '@components/atoms';
import type { IPostRequestDto } from '@api/post/types';

import { SubmitButton } from '../Button';
import { Idata } from '../data';
import classes from '../createStudy.module.scss';

interface DetailFormProps {
  form: IPostRequestDto;
  data: Idata;
  onChangeByInput: (e: ChangeEvent<HTMLInputElement>, key: any) => void;
  onChangeByEditor: (content: any) => void;
}
export const DetailForm = ({
  form,
  data,
  onChangeByInput,
  onChangeByEditor,
}: DetailFormProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const navigateRootOnClick = () => navigate('/');

  return (
    <section className={classes.detail_editor_container}>
      <div className={classes.title_line} />
      <div className={classes.title_text}>
        <p>개설하려는 스터디에 대해 소개해주세요.</p>
      </div>
      <Line className={classes.title_line} />
      <Input
        className={classes.title_input}
        top={<div className={classes.title_title}>제목</div>}
        type={data.detailFormElements.title[1]}
        value={form.title}
        placeholder="제목을 입력해주세요."
        onChange={(e) => onChangeByInput(e, 'title')}
      />
      <div className={classes.editor_wrap}>
        <Editor values={form} onChange={onChangeByEditor} />
        <div className={classes.button_container}>
          <SubmitButton
            className={classes.upload_button}
            form={form}
            id={Number(id)}
          />
          <button
            className={classes.cancel_button}
            onClick={navigateRootOnClick}
          >
            취소
          </button>
        </div>
      </div>
    </section>
  );
};
