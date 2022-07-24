import { useGetRecommendList } from '@hooks/useGetQuery';
import { UserState } from '@store/user';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import RecommendSlider from './RecommendSlider';

const RecommendCard = () => {
  const [user, setUser] = useRecoilState(UserState);
  const { data } = useGetRecommendList();

  const [recommendData, setRecommendData] = useState();

  useEffect(() => {
    if (user.email !== '') {
      setRecommendData(data?.data.body.data.content);
    }
  }, [data]);

  console.log(recommendData);

  return recommendData ? (
    <div className="recommend_container">
      <div className="title_wrapper">
        <span className="title_sub">Level Up project</span>
        <h2 className="title_main">커리어 성장을 위한 프로젝트</h2>
      </div>
      <div className="recommend_content">
        <RecommendSlider recommendData={recommendData} />
      </div>
    </div>
  ) : null;
};

export default RecommendCard;
