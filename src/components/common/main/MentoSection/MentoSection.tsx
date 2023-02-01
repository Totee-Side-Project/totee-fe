import MentorPostViewModal from '@components/common/mentor/Modal/MentorPostViewModal';
import { useGetRecommendList } from '@hooks/query/useGetQuery';
import { UserState } from '@store/user';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { SectionSlider } from '@components/common';
import { SectionTitle } from '@components/atoms';
import BestMentorCard from '@components/common/card/BestMentorCard/BestMentorCard';
import './recommend.scss';

interface Props {
  type: 'recommend' | 'best';
}

export const MentoSection = ({ type = 'recommend' }: Props) => {
  const [user, setUser] = useRecoilState(UserState);
  const { data } = useGetRecommendList();

  const [recommendData, setRecommendData] = useState();

  useEffect(() => {
    if (user.email !== '') {
      setRecommendData(data?.data?.body?.data.content);
    }
  }, [data]);

  const recommendInfo = {
    sub: 'Level Up Mentoring',
    title: '커리어 성장을 위한 멘토링',
    desc: '커리어 성장을 위한 멘토링을 찾으시나요? 멘토와 멘토를 잇는 토티가 여러분께 딱맞는 멘토링을 추천해드려요.',
  };

  const bestInfo = {
    sub: 'The best Mentor in Totee',
    title: '이달의 베스트 멘토',
    desc: '최근 2주 동안 가장 많은 멘토링 신청을 받은 토티의 멘토들입니다. 인기 멘토링에 참여해보세요.',
  };

  const Info = {
    recommend: recommendInfo,
    best: bestInfo,
  };

  const Mentorcard = ({ onClick }: { onClick: () => void }) =>
    type === 'recommend' ? null : <BestMentorCard onClick={onClick} />;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="recommend_container">
      <div className="title_container">
        <SectionTitle
          title={Info[type]['title']}
          sub={Info[type]['sub']}
          description={Info[type]['desc']}
        />
      </div>
      <div>
        <SectionSlider>
          <Mentorcard
            key={`mentor-card-1`}
            onClick={() => setIsOpen((pre) => !pre)}
          />
          <Mentorcard
            key={`mentor-card-2`}
            onClick={() => setIsOpen((pre) => !pre)}
          />
          <Mentorcard
            key={`mentor-card-3`}
            onClick={() => setIsOpen((pre) => !pre)}
          />
        </SectionSlider>
      </div>
      {isOpen && <MentorPostViewModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};
