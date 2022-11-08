import { LikeAPI } from '@api/api';
import React, { useEffect, useState } from 'react';
import './postingList.scss';
import deleteButton from '@assets/png/my-page-delete.png';
import com from '@assets/svg/sms.svg';
import view from '@assets/svg/visibility.svg';
import like from '@assets/svg/favorite.svg';
import nextArrow from '@assets/png/arrow_next.png';
import prevArrow from '@assets/png/arrow_prev.png';
import deleteicon from '@assets/png/delete.png';
import { useNavigate } from 'react-router-dom';

function LikePostingList() {
  const [likePost, setLikePost] = useState<any>();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  const [deleteModalState, setDeleteModalState] = useState(false);

  const getLikeList = async () => {
    await LikeAPI.LikeList().then((res) => setLikePost(res.data.body.data));
  };

  const pageNumberList: any = [];
  let listItems: any = [];

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  const currentPosts = (items: any) => {
    let currentPosts;
    currentPosts = items.slice(indexOfFirst, indexOfLast);
    listItems.push(...currentPosts);
    return listItems;
  };

  useEffect(() => {
    getLikeList();
  }, []);

  likePost && currentPosts(likePost);

  let navigate = useNavigate();
  const clickHandlerURLParameter = (arr: any): any => {
    navigate(`/detail/${arr.postId}`);
  };

  const showLikePost = () => {
    const maping = listItems.map((arr: any, i: number) => {
      return (
        <div
          key={i}
          className="postCard"
          onClick={() => clickHandlerURLParameter(arr)}
        >
          <div className="postWrapper">
            <div className="postImgWrapper">
              <div className="postImgBox">
                <img className="img" src={arr.imageUrl} />
              </div>
              <div className="postStatusWrapper">
                {arr.status === 'Y' ? (
                  <div className="postStatus">모집중</div>
                ) : (
                  <div className="postStatusNo">모집완료</div>
                )}
              </div>
            </div>
            <div className="postContentBox">
              <div>
                <div className="postTitle">{arr.title}</div>
                <div
                  className="postContent"
                  dangerouslySetInnerHTML={{ __html: arr.content }}
                ></div>
              </div>
              <div className="postInfoBox">
                <div className="postInfoName">
                  {arr.position}
                  {arr.nickname}
                </div>
                <div className="postIconBox">
                  <div className="postInfo">
                    <img src={com} />
                    {arr.commentNum}
                  </div>
                  <div className="postInfo">
                    <img src={view} /> {arr.view}
                  </div>
                  <div className="postInfo">
                    <img src={like} /> {arr.likeNum}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return maping;
  };

  if (likePost !== undefined) {
    for (let i = 1; i <= Math.ceil(likePost.length / postsPerPage); i++) {
      pageNumberList.push(i);
    }
  }
  const showPageNumber = pageNumberList.map((arr: any, i: number) => {
    return (
      <div
        key={i}
        className={arr === currentPage ? 'active' : 'not_active'}
        onClick={() => {
          setCurrentPage(arr);
        }}
      >
        {arr}
      </div>
    );
  });

  const nextArrowClick = () => {
    if (currentPage < pageNumberList.length) {
      setCurrentPage((prev: any) => prev + 1);
    } else {
      return;
    }
  };

  const prevArrowClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prev: any) => prev - 1);
    } else {
      return;
    }
  };

  const deleteClickHandler = () => {
    setDeleteModalState((prev) => !prev);
  };

  return (
    <div>
      <div className="list_container">
        <div className="list_title">내가 관심목록에 추가한 스터디 글</div>
        {deleteModalState ? (
          <div className="delete_modal">
            <img className="delete_icon" src={deleteicon} alt="" />
            <div>글 삭제하기</div>
          </div>
        ) : null}
        <img
          className="list_button"
          src={deleteButton}
          alt="deleteButton"
          onClick={deleteClickHandler}
        />
      </div>
      <div className="list_wrapper">{listItems && showLikePost()}</div>
      {listItems.length !== 0 ? (
        <div className="page_wrapper">
          <div
            className="list_arrow"
            style={{ backgroundImage: `url(${prevArrow})` }}
            onClick={prevArrowClick}
          ></div>
          <div className="page_number">{showPageNumber}</div>
          <div
            className="list_arrow"
            style={{ backgroundImage: `url(${nextArrow})` }}
            onClick={nextArrowClick}
          ></div>
        </div>
      ) : (
        <div className="list_none">
          <span>아직 관심목록에 추가한 스터디 글이 없습니다</span>
        </div>
      )}
    </div>
  );
}

export default LikePostingList;
