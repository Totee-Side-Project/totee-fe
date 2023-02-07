import classes from './index.module.scss';

interface IApplicantAcceptanceButtonProps {
  onClickAcceptButton: (isAccept: boolean) => void;
}

const ApplicantAcceptanceButton = ({
  onClickAcceptButton,
}: IApplicantAcceptanceButtonProps) => {
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
