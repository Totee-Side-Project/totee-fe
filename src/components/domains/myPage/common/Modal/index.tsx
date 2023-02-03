import classes from './index.module.scss';

interface IModalProps {
  isOpenedModal: boolean;
  setIsOpenedModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalPage?: React.Dispatch<React.SetStateAction<number>>;
  title: string;
  subTitle: string;
  children: any;
}

const Modal = ({
  isOpenedModal,
  setIsOpenedModal,
  setModalPage,
  title,
  subTitle,
  children,
}: IModalProps) => {
  if (!isOpenedModal) {
    return <></>;
  }

  return (
    <div className={classes.modalContainer}>
      <div className={classes.detailedMemberModal}>
        <button
          className={classes.closeButton}
          onClick={() => {
            setIsOpenedModal(false);
            setModalPage && setModalPage(0);
          }}
        >
          X
        </button>
        <p className={classes.title}>{title}</p>
        <p className={classes.subTitle}>{subTitle}</p>
        {children}
      </div>
    </div>
  );
};

export default Modal;
