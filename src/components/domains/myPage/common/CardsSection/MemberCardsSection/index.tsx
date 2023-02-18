import { useState } from 'react';
import Pagination from '../../Pagination';
import classes from './index.module.scss';
import profileCircle from '../../../../../../assets/svg/profile-circle.svg';
import { IMentoringMemberType, IStudyMemberType } from '@api/team/types';

interface IMemberCardsSectionProps {
  members?: IStudyMemberType[] | IMentoringMemberType[];
  onClickStudyMemberCard?: any;
  onClickMentoringMemberCard?: any;
  cardUnit: number;
}

const MemberCardsSection = ({
  members,
  onClickStudyMemberCard,
  onClickMentoringMemberCard,
  cardUnit,
}: IMemberCardsSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!members || members?.length === 0) {
    return <></>;
  }

  return (
    <div className={classes.memberCardsSection}>
      <div className={classes.memberCards}>
        {members
          .slice(
            (currentPage - 1) * cardUnit,
            (currentPage - 1) * cardUnit + cardUnit,
          )
          .map((member) => (
            <div
              className={classes.memberCard}
              key={member.email}
              onClick={() => {
                onClickStudyMemberCard && onClickStudyMemberCard(member);
                onClickMentoringMemberCard &&
                  onClickMentoringMemberCard(member);
              }}
            >
              <img
                className={classes.profileImg}
                src={member.profileImg ? member.profileImg : profileCircle}
                alt={
                  member.profileImg ? '사용자 프로필 사진' : '기본 프로필 사진'
                }
              />
              <p className={classes.nickname}>{member.nickname}</p>
              <p className={classes.emailPosition}>{member.email}</p>
              <p className={classes.emailPosition}>{member.position}</p>
              <hr />
              <button className={classes.detailButton}>자세히보기</button>
            </div>
          ))}
      </div>
      <Pagination
        postsLength={members.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default MemberCardsSection;
