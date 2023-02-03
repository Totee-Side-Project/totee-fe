import { useAcceptApplicants } from '@hooks/useAcceptApplicants';
import classes from './index.module.scss';

interface IApplicantAcceptanceButtonProps {
  currentPostId: number;
  setIsOpenedModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentMember?: any;
  acceptApplicants: any;
}

const ApplicantAcceptanceButton = ({
  currentPostId,
  setIsOpenedModal,
  currentMember,
  acceptApplicants,
}: IApplicantAcceptanceButtonProps) => {
  const { onClickAcceptButton } = useAcceptApplicants(
    acceptApplicants(currentPostId),
    setIsOpenedModal,
    currentMember ? currentMember.nickname : '',
  );

  return (
    <div className={classes.applicantConfirmationButton}>
      <button
        className={classes.rejectButton}
        onClick={() => onClickAcceptButton(false)}
      >
        승인 거부
      </button>
      <button
        className={classes.acceptButton}
        onClick={() => onClickAcceptButton(true)}
      >
        승인 허용
      </button>
    </div>
  );
};

export default ApplicantAcceptanceButton;
