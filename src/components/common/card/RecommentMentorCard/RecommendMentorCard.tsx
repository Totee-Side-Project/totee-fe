import MentoringPostCard from '@components/common/card/MentoringPostCard/MentoringPostCard';
import classes from './RecommendMentorCard.module.scss';

export default function RecommendMentorCard({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <div className={classes.container}>
      <MentoringPostCard
        mentoringPost={{
          title: Math.random().toString(),
          description: '',
          mentoringCycle: '',
          mentor: {
            career: '',
            position: '',
            profileImageUrl: '',
            nickname: '',
          },
        }}
      />
    </div>
  );
}
