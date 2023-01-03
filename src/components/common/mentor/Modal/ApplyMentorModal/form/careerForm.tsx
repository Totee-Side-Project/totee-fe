import DropDown from '@components/common/dropdown';
import { applyForm } from '@store/mentor';
import { useRecoilState } from 'recoil';
import Style from './careerForm.module.scss';

//? DropDown Items
const FIELDS = ['개발 / 프로그래밍', '보안 / 네트워크', '데이터 사이언스'];
const CAREERS = ['주니어(0~2년차)', ' 미드(3~6년차)', '시니어(7년이상)'];

const CareerForm = () => {
  //? recoil
  const [form, setForm] = useRecoilState(applyForm);

  return (
    <div className={Style.careerWrap}>
      <div className={Style.titleWithDropDownWrap}>
        <h3>멘토 분야를 선택해 주세요.</h3>
        <DropDown
          items={FIELDS}
          defValue={form.field}
          onChange={(value) => setForm({ ...form, field: value, error: '' })}
          errorMsg={
            form.error.includes('분야') ? '멘토 분야는 필수 항목 입니다.' : ''
          }
        />
      </div>
      <div className={Style.titleWithDropDownWrap}>
        <h3>실무 경력을 선택해 주세요.</h3>
        <DropDown
          items={CAREERS}
          defValue={form.career}
          onChange={(value) => setForm({ ...form, career: value, error: '' })}
          errorMsg={
            form.error.includes('경력') ? '실무 경력은 필수 항목 입니다.' : ''
          }
        />
      </div>
    </div>
  );
};

export default CareerForm;
