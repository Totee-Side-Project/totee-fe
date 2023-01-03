import { applyForm } from '@store/mentor';
import { useRecoilState } from 'recoil';
import Style from './IntroduceForm.module.scss';

const IntroduceForm = () => {
  //? recoil
  const [form, setForm] = useRecoilState(applyForm);

  return (
    <div className={Style.introduceWrap}>
      <div className={Style.titleWithDesWrap}>
        <h3>기타 자기 소개 코멘트를 달아 주세요.</h3>
        <textarea
          className={Style.textArea}
          placeholder="경력 또는 자신이 할수 있는 기술 스택 등 자신의 실력을 어필해보세요."
          rows={10}
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
        />
      </div>
    </div>
  );
};

export default IntroduceForm;
