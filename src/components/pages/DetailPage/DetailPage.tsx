import { loginState } from '@store/login';
import React, { useEffect, useState } from 'react';
import { useGetPostByPostId } from '@hooks/useGetQuery';
import { useNavigate, useParams } from 'react-router-dom';
import './DetailPage.scss';
import arrowIcon from '../../../assets/detail_icon.png';
import IconEye from '../../../assets/detail_eye.png';
import IconMessage from '../../../assets/detail_message.png';
import IconLike from '../../../assets/detail_like.png';
import likeButton from '../../../assets/detail_button.png';
import Option from '../../../assets/detail_option.png';
import { LikeAPI, PostAPI, api } from '@api/api';
import { Comment, CommentInput, SignInModal } from '@components/common';
import { useRecoilState, useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { UserSelector } from '@store/user';
import { checkingDetailPeriod } from '@utils/handleSelectValue';
import Swal from 'sweetalert2';
import { useGetLikeofPost } from '@hooks/useGetQuery';
import { useUpdateLike } from '@hooks/useMutateQuery';

function DetailPage() {
  const navigate = useNavigate();
  let { id } = useParams();

  const { data: postData, refetch } = useGetPostByPostId(
    parseInt(id as string),
  );
  const { data: likeData } = useGetLikeofPost(id as string);
  const LikeUpdateMutation = useUpdateLike(id as string);

  const [detailData, setDetailData] = useState<any>([]);
  const [Like, setLike] = useState<any>(false);
  const [status, setStatus] = useState<any>(detailData.status);
  const [isShowToggle, setIsShowToggle] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const [login, setLogin] = useRecoilState(loginState);
  const LoginLabel = useRecoilValue(UserSelector);

  useEffect(() => {
    if (postData && postData.data?.header.code === 200) {
      setDetailData(postData.data.body.data);
    }
  }, [postData, status]);

  useEffect(() => {
    if (likeData && likeData.data?.header.code === 200) {
      setLike(likeData.data.body.data);
    }
  }, [likeData]);

  const handlerBackArrowClick = () => {
    navigate('/');
  };

  const clickLike = () => {
    let postId = id;
    LikeUpdateMutation.mutateAsync(postId)
      .then((res) => res)
      .catch((err) => console.log(err));
  };

  const handlerLikeButtonClick = () => {
    if (login.state) {
      clickLike();
    } else {
      setIsOpenLoginModal(true);
    }
  };

  const OptionShow = () => {
    if (detailData.nickname == LoginLabel.nickname) {
      return (
        <div className="detail_setting">
          <img
            className="summary_title_icon"
            src={Option}
            onClick={() => setIsShowToggle(!isShowToggle)}
          />
          {isShowToggle && (
            <div className="detail-toggle-container">
              <ul>
                <li onClick={() => navigate(`/edit/${id}`)}>
                  글 <span>수정</span>하기
                </li>
                <li
                  onClick={() =>
                    PostAPI.deletePost(parseInt(id as string)).then((res) => {
                      if (res.status === 200) {
                        Swal.fire({
                          title: '삭제 성공!',
                          text: '게시물 삭제가 완료되었습니다',
                          icon: 'success',
                          confirmButtonText: '확인',
                        }).then((result) => {
                          navigate('/');
                        });
                      }
                    })
                  }
                >
                  글 <span>삭제</span>하기
                </li>
              </ul>
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
  };

  const handlerStatusClick = async () => {
    let postId = id;
    if (detailData.nickname === LoginLabel.nickname) {
      await PostAPI.statusChange(postId as unknown as number)
        .then(async (res) => await refetch())
        .catch((err) => console.log(err));
    } else {
      return null;
    }
  };

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
              style={{
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: `url("${detailData.imageUrl}")`,
              }}
            ></div>
            <div className="detail_summary_container">
              <div className="summary_title_wrapper">
                <div className="summary_title_addoption">
                  <div className="summary_title_text"> {detailData.title}</div>
                  {OptionShow()}
                </div>
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
                    {detailData.period
                      ? checkingDetailPeriod(detailData.period)
                      : null}
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

                  {detailData.status == 'Y' ? (
                    <div
                      className={`summary_category_status_true ${
                        detailData.nickname == LoginLabel.nickname
                          ? 'hover'
                          : ''
                      }`}
                      onClick={handlerStatusClick}
                    >
                      <span>모집중</span>
                    </div>
                  ) : (
                    <div
                      className={`summary_category_status_false  ${
                        detailData.nickname == LoginLabel.nickname
                          ? 'hover'
                          : ''
                      }`}
                      onClick={handlerStatusClick}
                    >
                      <span>모집완료</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="detail_sort_wrapper">
            {detailData.positionList
              ? detailData.positionList.map((arr: any, i: number) => {
                  return (
                    <div
                      className="detail_sort_content"
                      key={`sort-content-${arr}`}
                    >
                      모집분야 - {arr}
                    </div>
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
            {/*<div className="detail_content_title">{detailData.title}</div>*/}
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
            {detailData.commentDTOList &&
              detailData.commentDTOList.map((comment: any) => (
                <Comment
                  postId={parseInt(id as string)}
                  comment={comment}
                  key={`comment-${comment.commentId}`}
                ></Comment>
              ))}
          </div>
          <CommentInput postId={parseInt(id as string)} type="comment" />
        </div>
      )}
      <SignInModal
        isOpen={isOpenLoginModal}
        setIsOpen={setIsOpenLoginModal}
      ></SignInModal>
    </div>
  );
}

export default DetailPage;
