import { IStudyMemberType } from '@api/team/types';
import { queryKeys } from '@hooks/query/queryKeys';
import { useQuery } from 'react-query';
import classes from './index.module.scss';

interface IMemberResignationButtonProps {
  onClickResignateButton: any;
  currentMember?: IStudyMemberType;
}

const MemberResignationButton = ({
  onClickResignateButton,
  currentMember,
}: IMemberResignationButtonProps) => {
  const { data }: any = useQuery(queryKeys.user);
  const user = data?.data.body.data;

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
