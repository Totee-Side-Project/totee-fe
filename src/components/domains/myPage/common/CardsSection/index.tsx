import type { IMentoringMemberType, IStudyMemberType } from '@api/team/types';
import { StudyPostsType } from '@api/post/types';
import { IMentoringPost, MentoringPostsType } from '@api/mentoring/types';
import MemberCardsSection from './MemberCardsSection';
import MentoringPostCardsSection from './MentoringPostCardsSection';
import StudyPostCardsSection from './StudyPostCardsSection';
import classes from './index.module.scss';

interface ICardsSectionProps {
  postSectionTitle: string;
  studyPosts?: StudyPostsType;
  mentoringPosts?: MentoringPostsType;
  memberSectionTitle?: string;
  members?: IStudyMemberType[] | IMentoringMemberType[];
  setCurrentPostId?: React.Dispatch<React.SetStateAction<number>>;
  onClickStudyMemberCard?: (member: IStudyMemberType) => void;
  onClickMentoringMemberCard?: (member: IMentoringMemberType) => void;
  onClickFavoriteMentoringPostCard?: (post: IMentoringPost) => void;
}

const CardsSection = ({
  postSectionTitle,
  studyPosts,
  mentoringPosts,
  memberSectionTitle,
  members,
  setCurrentPostId,
  onClickStudyMemberCard,
  onClickMentoringMemberCard,
  onClickFavoriteMentoringPostCard,
}: ICardsSectionProps) => {
  return (
    <>
      <p className={classes.title}>{postSectionTitle}</p>
      {studyPosts && (
        <StudyPostCardsSection
          postSectionTitle={postSectionTitle}
          studyPosts={studyPosts}
          setCurrentPostId={setCurrentPostId}
        />
      )}
      {mentoringPosts && (
        <MentoringPostCardsSection
          postSectionTitle={postSectionTitle}
          mentoringPosts={mentoringPosts}
          setCurrentPostId={setCurrentPostId}
          onClickFavoriteMentoringPostCard={onClickFavoriteMentoringPostCard}
        />
      )}
      <div className={classes.horizontal} />
      <p className={classes.title}>{memberSectionTitle}</p>
      <MemberCardsSection
        members={members}
        onClickStudyMemberCard={onClickStudyMemberCard}
        onClickMentoringMemberCard={onClickMentoringMemberCard}
      />
    </>
  );
};

export default CardsSection;
