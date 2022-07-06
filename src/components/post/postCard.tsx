import React from 'react';
import './post.scss';
import com from '../../assets/sms.svg';
import view from '../../assets/visibility.svg';
import like from '../../assets/favorite.svg';

function PostCard() {
  return (
    <div className="postCard">
      <div className="postWrapper">
        <div className="postImgWrapper">
          <div className="postImgBox">
            <div className="img"></div>
          </div>
          <div className="postStatusWrapper">
            <div className="postStatus">모집중</div>
          </div>
        </div>
        <div className="postContentBox">
          <div>
            <div className="postTitle">제목 예시입니다.</div>
            <div className="postContent">
              모집중인 프로젝트 또는 스터디.. 인원.. 이러쿵 저러쿵에 대한 간단한
              설명입니다.
            </div>
          </div>
          <div className="postInfoBox">
            <div className="postInfoName">[DE]작성자</div>
            <div className="postIconBox">
              <div className="postInfo">
                <img src={com} />2
              </div>
              <div className="postInfo">
                <img src={view} /> 2
              </div>
              <div className="postInfo">
                <img src={like} /> 2
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
