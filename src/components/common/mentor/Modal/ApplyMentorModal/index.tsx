import useClickOutside from '@hooks/useClickOutside';
import { useRecoilState } from 'recoil';
import Style from './applyMentorModal.module.scss';
import { applyForm, IApplyForm } from '@store/mentor';
import CommonForm from './form/commonForm';
import CareerForm from './form/careerForm';
import UserInfoForm from './form/userInfoForm';
import IntroduceForm from './form/IntroduceForm';
import ResultForm from './form/resultForm';
import { IApplyMentorModal } from 'types/applyMentorModal';
import { useEffect } from 'react';

const ApplyMentorModal: React.FC<IApplyMentorModal> = (props) => {
  const { isShow, setIsShow } = props;
  //? state
  const [form, setForm] = useRecoilState<IApplyForm>(applyForm);
  //? hooks
  useClickOutside('outside', isShow, setIsShow);

  //? initialForm
  useEffect(() => {
    setForm({
      page: 1,
      field: '',
      career: '',
      contact: '',
      portfolioUrl: '',
      comment: '',
      error: '',
    });
  }, []);

  return (
    <div className={Style.wrap} id="outside">
      <div className={Style.modal}>
        <CommonForm setIsShow={setIsShow}>
          {form.page == 1 && <CareerForm />}
          {form.page == 2 && <UserInfoForm />}
          {form.page == 3 && <IntroduceForm />}
          {form.page == 4 && <ResultForm />}
        </CommonForm>
      </div>
    </div>
  );
};

export default ApplyMentorModal;
