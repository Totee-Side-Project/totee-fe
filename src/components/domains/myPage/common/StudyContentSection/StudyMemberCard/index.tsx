import { useState } from 'react';
import Pagination from '../../Pagination';
import classes from './index.module.scss';

interface IStudyMemberCardProps {
  members?: any;
}

const StudyMemberCard = ({ members }: IStudyMemberCardProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!members || members?.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className={classes.studyMemberCards}>
        {members
          .slice((currentPage - 1) * 4, (currentPage - 1) * 4 + 4)
          .map((member) => (
            <div className={classes.studyMemberCard} key={member.email}>
              <img className={classes.profileImg} src={member.profileImg} />
              <p className={classes.nickname}>{member.nickname}</p>
              <p className={classes.emailPosition}>{member.email}</p>
              <p className={classes.emailPosition}>{member.position}</p>
              <hr />
              <button className={classes.detailButton}>자세히보기</button>
            </div>
          ))}
      </div>
      <Pagination
        posts={members}
        postsLength={members.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default StudyMemberCard;
