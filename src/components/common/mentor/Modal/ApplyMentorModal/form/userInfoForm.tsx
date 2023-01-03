import { applyForm } from '@store/mentor';
import { URL_PATTERN } from '@utils/pattern';
import { useRecoilState } from 'recoil';
import Style from './userInfoForm.module.scss';

const UserInfoForm = () => {
  //? recoil
  const [form, setForm] = useRecoilState(applyForm);

  return (
    <div className={Style.userInfoWrap}>
      <div className={Style.titleWithInputWrap}>
        <h3>개인 연락처</h3>
        <input
          className={Style.input}
          type="text"
          placeholder="(오픈카톡, 아이디, 전화번호)"
          value={form.contact}
          onChange={(e) =>
            setForm({ ...form, contact: e.target.value, error: '' })
          }
        />
        <span className={Style.error}>
          {form.error.includes('연락처')
            ? '개인 연락처는 필수 항목 입니다.'
            : ''}
        </span>
      </div>
      <div className={Style.titleWithInputWrap}>
        <h3>개인 포트폴리오 주소</h3>
        <input
          className={Style.input}
          type="text"
          placeholder="본인 포트폴리오 사이트나 깃 허브 주소(링크 형식)"
          onBlur={(e) => URL_PATTERN(e.target.value)}
          value={form.portfolioUrl}
          onChange={(e) =>
            setForm({ ...form, portfolioUrl: e.target.value, error: '' })
          }
        />
        <span className={Style.error}>
          {form.error.includes('주소')
            ? 'URL 주소 형식에 맞게 입력해주세요.'
            : ''}
        </span>
      </div>
    </div>
  );
};

export default UserInfoForm;
