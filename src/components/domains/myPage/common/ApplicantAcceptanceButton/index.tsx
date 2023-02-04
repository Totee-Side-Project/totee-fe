import { IMentoringMemberType, IStudyMemberType } from '@api/team/types';
import { useAcceptApplicant } from '@hooks/useAcceptApplicant';
import classes from './index.module.scss';

interface IApplicantAcceptanceButtonProps {
  currentPostId: number;
  setIsOpenedModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentMember?: IMentoringMemberType | IStudyMemberType;
  useAccept: any;
}

const ApplicantAcceptanceButton = ({
  currentPostId,
  setIsOpenedModal,
  currentMember,
  useAccept,
}: IApplicantAcceptanceButtonProps) => {
  const { onClickAcceptButton } = useAcceptApplicant(
    useAccept,
    currentPostId,
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
