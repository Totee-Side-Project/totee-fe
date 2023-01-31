import { IMemberType } from 'types/member.types';
import { IMentoringPostsType, IStudyPostsType } from 'types/posts.types';
import classes from './index.module.scss';
import MemberCard from './MemberCard';
import MentoringPostCard from './MentoringPostCard';
import StudyPostCard from './StudyPostCard';

interface ICardsProps {
  postSectionTitle: string;
  studyPosts?: IStudyPostsType;
  mentoringPosts?: IMentoringPostsType;
  memberSectionTitle?: string;
  members?: IMemberType[];
  setCurrentPostId?: React.Dispatch<React.SetStateAction<number>>;
  onClickMemberCard?: (member: IMemberType) => void;
}

const Cards = ({
  postSectionTitle,
  studyPosts,
  mentoringPosts,
  memberSectionTitle,
  members,
  setCurrentPostId,
  onClickMemberCard,
}: ICardsProps) => {
  return (
    <>
      <p className={classes.title}>{postSectionTitle}</p>
      {studyPosts && (
        <StudyPostCard
          studyPosts={studyPosts}
          setCurrentPostId={setCurrentPostId}
        />
      )}
      {mentoringPosts && (
        <MentoringPostCard
          mentoringPosts={mentoringPosts}
          setCurrentPostId={setCurrentPostId}
        />
      )}
      <div className={classes.horizontal} />
      <p className={classes.title}>{memberSectionTitle}</p>
      <MemberCard members={members} onClickMemberCard={onClickMemberCard} />
    </>
  );
};

export default Cards;
