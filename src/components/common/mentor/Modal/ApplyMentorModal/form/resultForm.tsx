import { applyForm } from '@store/mentor';
import { useRecoilState } from 'recoil';
import Style from './resultForm.module.scss';

const ResultForm = () => {
  //? recoil
  const [form, setForm] = useRecoilState(applyForm);

  return (
    <div className={Style.resultWrap}>
      <div className={Style.careersWrap}>
        <div className={Style.careerWithFliedWrap}>
          <span>분야</span>
          <span className={Style.roundSpan}>{form.field}</span>
        </div>
        <div className={Style.careerWithFliedWrap}>
          <span>실무 경력</span>
          <span className={Style.roundSpan}>{form.career}</span>
        </div>
      </div>
      <div className={Style.portfolioWrap}>
        <input readOnly value={form.portfolioUrl} />
      </div>
    </div>
  );
};

export default ResultForm;
