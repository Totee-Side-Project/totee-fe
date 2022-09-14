import { useGetRecommendList } from '@hooks/useGetQuery';
import { UserState } from '@store/user';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import RecommendSlider from './RecommendMentoSlider';
import {ReactComponent as ChevronIcon} from '@assets/chevron-down.svg';
import {SectionTitle} from '@components/atoms';
interface Props{
  type: "recommend" | "best"
}
export const RecommendMento = ({type="recommend"}:Props) => {
  const [user, setUser] = useRecoilState(UserState);
  const { data } = useGetRecommendList();

  const [recommendData, setRecommendData] = useState();

  useEffect(() => {
    if (user.email !== '') {
      setRecommendData(data?.data?.body?.data.content);
    }
  }, [data]);

  const recommendInfo = {
    sub: "Level Up Mentoring",
    title:"커리어 성장을 위한 멘토링",
    desc: "커리어 성장을 위한 멘토링을 찾으시나요? 멘토와 멘토를 잇는 토티가 여러분께 딱맞는 멘토링을 추천해드려요."
  }

  const bestInfo ={
    sub : "The best Mentor in Totee",
    title: "이달의 베스트 멘토",
    desc: "최근 2주 동안 가장 많은 멘토링 신청을 받은 토티의 멘토들입니다. 인기 멘토링에 참여해보세요."
  }

  const Info ={
    "recommend": recommendInfo,
    "best" :bestInfo,
  }

  return(
    <div className="recommend_container">
      <SectionTitle title={Info[type]["title"]} sub={Info[type]["sub"]} description={Info[type]["desc"]}/>
      <div className="recommend_content">
        <RecommendSlider recommendData={recommendData} type={type}/>
      </div>
    </div>
  );
};
