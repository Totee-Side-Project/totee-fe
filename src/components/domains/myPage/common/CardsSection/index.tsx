import { IMemberType } from 'types/member.types';
import { IMentoringPostsType, IStudyPostsType } from 'types/posts.types';
import classes from './index.module.scss';
import MemberCardsSection from './MemberCardsSection';
import MentoringPostCardsSection from './MentoringPostCardsSection';
import StudyPostCardsSection from './StudyPostCardsSection';

interface ICardsSectionProps {
  postSectionTitle: string;
  studyPosts?: IStudyPostsType;
  mentoringPosts?: IMentoringPostsType;
  memberSectionTitle?: string;
  members?: IMemberType[];
  setCurrentPostId?: React.Dispatch<React.SetStateAction<number>>;
  onClickMemberCard?: (member: IMemberType) => void;
}

const CardsSection = ({
  postSectionTitle,
  studyPosts,
  mentoringPosts,
  memberSectionTitle,
  members,
  setCurrentPostId,
  onClickMemberCard,
}: ICardsSectionProps) => {
  return (
    <>
      <p className={classes.title}>{postSectionTitle}</p>
      {studyPosts && (
        <StudyPostCardsSection
          studyPosts={studyPosts}
          setCurrentPostId={setCurrentPostId}
        />
      )}
      {mentoringPosts && (
        <MentoringPostCardsSection
          mentoringPosts={mentoringPosts}
          setCurrentPostId={setCurrentPostId}
        />
      )}
      <div className={classes.horizontal} />
      <p className={classes.title}>{memberSectionTitle}</p>
      <MemberCardsSection
        members={members}
        onClickMemberCard={onClickMemberCard}
      />
    </>
  );
};

export default CardsSection;
