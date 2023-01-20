import React from 'react';
import { useRecoilState } from 'recoil';

import { ImageWithWebp } from '@components/atoms';
import { UserState } from '@store/user';
import { IApplyForm, applyForm } from '@store/mentor';
import { URL_PATTERN } from '@utils/pattern';
import { ICommonForm } from 'types/applyMentorModal';
import Style from './commonForm.module.scss';

//? image
import IMG_UserProfile from '@assets/svg/common/userProfile.svg';
import IMG_Cancel from '@assets/svg/common/cancel.svg';
import { MentorAPI } from '@api/apis/mentor';

const CommonForm: React.FC<ICommonForm> = (props) => {
  const { setIsShow, children } = props;

  //? recoil
  const [user, setUser] = useRecoilState(UserState);
  const [form, setForm] = useRecoilState<IApplyForm>(applyForm);

  const clickEventMap = {
    prev: () => setForm({ ...form, page: form.page - 1 }),
    next: () => setForm({ ...form, page: form.page + 1 }),
    end: () => setIsShow(false),
    submit: () => {
      MentorAPI.applyMentor({
        field: form.field,
        career: form.career,
        contact: form.contact,
        portfolioUrl: form.portfolioUrl,
        comment: form.comment,
      }).then((res) => {
        res.status == 200
          ? setForm({ ...form, page: form.page + 1 })
          : alert('멘토 지원 결과 대기 중 입니다.');
      });
    },
  };

  const onClick = (type: 'prev' | 'next' | 'submit' | 'end') => {
    if (form.field == '')
      return setForm({ ...form, error: '멘토 분야는 필수 항목 입니다.' });
    if (form.career == '')
      return setForm({ ...form, error: '실무 경력은 필수 항목 입니다.' });
    if (form.page == 2 && form.contact == '')
      return setForm({ ...form, error: '개인 연락처는 필수 항목 입니다.' });
    if (form.page == 2 && !URL_PATTERN(form.portfolioUrl))
      return setForm({ ...form, error: 'URL 주소 형식에 맞게 입력해주세요.' });
    if (type == 'next' && form.page == 4) return;
    clickEventMap[type]();
  };

  return (
    <div className={Style.commonWrap}>
      {form.page == 4 && (
        <h2 className={Style.resultMsg}>
          멘토 지원
          <br /> 제출이 완료되었습니다.
        </h2>
      )}
      <ImageWithWebp
        width={48}
        height={48}
        src={IMG_Cancel}
        srcSet={IMG_Cancel}
        alt="cancelBtn"
        style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
        onClick={() => setIsShow(false)}
      />
      <div className={Style.userInfoWrap}>
        <ImageWithWebp
          width={95}
          height={95}
          src={user.profileImageUrl ?? IMG_UserProfile}
          srcSet={user.profileImageUrl ?? IMG_UserProfile}
          alt="userProfile"
          style={{ borderRadius: '50%' }}
        />
        <div className={Style.nameWithEmailWrap}>
          <p className={Style.name}>{user.nickname}</p>
          <p className={Style.email}>{user.email}</p>
        </div>
        {form.page == 4 && (
          <input className={Style.input} readOnly value={form.contact} />
        )}
      </div>
      {children}
      <div className={Style.btnWrap}>
        {form.page == 2 ||
          (form.page == 3 && (
            <button className={Style.goBack} onClick={() => onClick('prev')}>
              이전으로
            </button>
          ))}
        <button
          onClick={() =>
            onClick(form.page == 3 ? 'submit' : form.page == 4 ? 'end' : 'next')
          }
        >
          {form.page == 3 ? '제출하기' : form.page == 4 ? '완료' : '다음으로'}
        </button>
      </div>
      {form.page != 4 && (
        <div className={Style.pageNumber}>{form.page} / 3</div>
      )}
    </div>
  );
};

export default CommonForm;
