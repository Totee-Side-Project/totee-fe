import React, { useEffect, useState } from 'react';
import { useGetPostByPostId } from '@hooks/useGetQuery';
import { useNavigate, useParams } from 'react-router-dom';
import './Detail.scss';
import arrowIcon from '../../../assets/detail_icon.png';
import IconEye from '../../../assets/detail_eye.png';
import IconMessage from '../../../assets/detail_message.png';
import IconLike from '../../../assets/detail_like.png';
import likeButton from '../../../assets/detail_button.png';
import { LikeAPI } from '@api/api';
import {Comment, CommentInput} from '@components/common';

function Detail() {
  const navigate = useNavigate();
  let { id } = useParams();
  const { data } = useGetPostByPostId(parseInt(id as string));
  const [detailData, setDetailData] = useState<any>([]);
  const [Like, setLike] = useState<any>(false);

  useEffect(() => {
    const getLike = async () => {
      let postId = id;
      await LikeAPI.getIsLikeInfo(postId)
        .then((res) => setLike(res.data.body.data))
        .catch((err) => console.log('4', err));
    };
    getLike();
  }, []);

  useEffect(() => {
    console.log("data", data);
    if (data && data.data?.header.code === 200) {
      setDetailData(data.data.body.data);
    }
  }, [data]);

  const handlerBackArrowClick = () => {
    navigate('/');
  };

  const clickLike = async () => {
    let postId = id;
    await LikeAPI.postLike(postId).then((res) => console.log(res));
    await LikeAPI.getIsLikeInfo(postId)
      .then((res) => setLike(res.data.body.data))
      .catch((err) => console.log('4', err));
  };

  const handlerLikeButtonClick = () => {
    clickLike();
  };

  const checkingDetailPeriod = () => {
    if (detailData.period == 'VeryShortTerm') {
      return <span>1개월미만</span>;
    } else if (detailData.period == 'ShortTerm') {
      return <span>1~3개월</span>;
    } else if (detailData.period == 'MidTerm') {
      return <span>3~6개월</span>;
    } else if (detailData.period == 'LongTerm') {
      return <span>6개월이상</span>;
    } else {
      return null;
    }
  };
  console.log('3', detailData);
  return (
    <div>
      {detailData && (
        <div className="detail_container">
          <div className="detail_profile_wrapper">
            <div className="detail_arrow_wrapper">
              <img
                className="detail_arrow"
                src={arrowIcon}
                onClick={handlerBackArrowClick}
              />
            </div>
            <div
              className="detail_profile"
              style={{ backgroundImage: `url("${detailData.imageUrl}")` }}
            ></div>
            <div className="detail_summary_container">
              <div className="summary_title_wrapper">
                <div className="summary_title_text"> {detailData.title}</div>
                <div className="summary_title_line"></div>
              </div>
              <div className="summary_category_wrapper">
                <div className="summary_category_left">
                  <div className="summary_category_name">
                    {detailData.categoryName}
                  </div>
                  <div className="summary_category_name">
                    {detailData.onlineOrOffline}
                  </div>
                  <div className="summary_category_name">
                    {detailData.recruitNum}
                  </div>
                  <div className="summary_category_name">
                    {detailData.period ? checkingDetailPeriod() : null}
                  </div>
                </div>
                <div className="summary_category_right">
                  <div className="summary_like_button">
                    {Like ? (
                      <img
                        src={likeButton}
                        className="summary_like_true_button"
                        onClick={handlerLikeButtonClick}
                      />
                    ) : (
                      <img
                        src={likeButton}
                        className="summary_like_false_button"
                        onClick={handlerLikeButtonClick}
                      />
                    )}
                  </div>
                  <div className="summary_category_status">
                    {detailData.status == 'Y' ? (
                      <span>모집중</span>
                    ) : (
                      <span>모집완료</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="detail_sort_wrapper">
            {detailData.positionList
              ? detailData.positionList.map((arr: any, i: number) => {
                  return (
                    <div className="detail_sort_content" key={`sort-content-${arr}`}>모집분야 - {arr}</div>
                  );
                })
              : null}
          </div>
          <div className="detail_contact">
            연락방식 -{' '}
            <a href={detailData.contactLink}>{detailData.contactLink}</a>
          </div>
          <div className="detail_line"></div>
          <div className="detail_content_wrapper">
            <div className="detail_content_title">{detailData.title}</div>
            <div
              className="detail_content"
              dangerouslySetInnerHTML={{ __html: detailData.content }}
            ></div>
          </div>
          <div className="detail_line"></div>
          <div className="detail_reaction">
            <div className="reaction_content">
              <img className="reaction_image" src={IconLike} />
              <span>{detailData.likeNum}</span>
            </div>
            <div className="reaction_content">
              <img className="reaction_image" src={IconMessage} />
              <span>{detailData.commentNum}</span>
            </div>
            <div className="reaction_content">
              <img className="reaction_image" src={IconEye} />
              <span>{detailData.view}</span>
            </div>
          </div>
        <div className="comment_title">댓글</div>
        <div className="comment_list">
        {detailData.commentDTOList &&detailData.commentDTOList.map((comment:any)=>
          <Comment postId={parseInt(id as string)} comment={comment} key={`comment-${comment.commentId}`}></Comment>
        )}
        </div>
        <CommentInput postId={parseInt(id as string)} type="comment"/>
        
      </div>
      )}
    </div>
  );
}

export default Detail;
