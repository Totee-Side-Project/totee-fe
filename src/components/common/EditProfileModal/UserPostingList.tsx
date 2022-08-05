import React, { useEffect, useState } from 'react';
import { PostAPI } from '@api/api';
import './postingList.scss';
import deleteButton from '../../../assets/my-page-delete.png';
import com from '@assets/sms.svg';
import view from '@assets/visibility.svg';
import like from '@assets/favorite.svg';
import nextArrow from '../../../assets/arrow_next.png';
import prevArrow from '../../../assets/arrow_prev.png';
import deleteicon from '../../../assets/delete.png';

function UserPostingList() {
  const [myPost, setMyPost] = useState<any>();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  const [deleteState, setDeleteState] = useState(false);

  const getMyPostList = async () => {
    await PostAPI.myPost().then((res) => setMyPost(res.data.body.data.content));
  };

  useEffect(() => {
    getMyPostList();
  }, []);

  let listItems: any = [];
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  const currentPosts = (items: any) => {
    let currentPosts;
    currentPosts = items.slice(indexOfFirst, indexOfLast);
    listItems.push(...currentPosts);
    return listItems;
  };

  myPost && currentPosts(myPost);

  const showMyPost = () => {
    const maping = listItems.map((arr: any, i: number) => {
      return (
        <div key={i} className="postCard">
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
                  {arr.author}
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

  const pageNumberList = [];
  if (myPost !== undefined) {
    for (let i = 1; i <= Math.ceil(myPost.length / postsPerPage); i++) {
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
    setDeleteState((prev) => !prev);
  };

  return (
    <div>
      <div className="list_container">
        <div className="list_title">내가 작성한 스터디 글</div>
        {deleteState ? (
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
      <div className="list_wrapper">{myPost && showMyPost()}</div>
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
    </div>
  );
}

export default UserPostingList;
