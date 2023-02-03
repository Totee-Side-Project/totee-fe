import { queryKeys } from '@hooks/query/queryKeys';
import { useResignateMember } from '@hooks/useResignateMember';
import { useQuery } from 'react-query';
import classes from './index.module.scss';

interface IMemberResignationButtonProps {
  currentPostId: number;
  currentMember?: any;
  setIsOpenedModal: React.Dispatch<React.SetStateAction<boolean>>;
  useResignate: any;
}

const MemberResignationButton = ({
  currentMember,
  currentPostId,
  setIsOpenedModal,
  useResignate,
}: IMemberResignationButtonProps) => {
  const { data }: any = useQuery(queryKeys.user);
  const user = data?.data.body.data;

  const { onClickResignateButton } = useResignateMember(
    useResignate,
    currentPostId,
    setIsOpenedModal,
    currentMember ? currentMember.nickname : '',
  );

  return (
    <>
      {user.nickname !== currentMember?.nickname && (
        <button
          className={classes.resignateButton}
          onClick={() => onClickResignateButton()}
        >
          추방하기
        </button>
      )}
    </>
  );
};

export default MemberResignationButton;
