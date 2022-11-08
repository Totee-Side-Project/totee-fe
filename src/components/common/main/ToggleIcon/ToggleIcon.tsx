import React, { useRef } from 'react';
import { Icon } from '@components/atoms';
import { ToggleIconProps } from 'types/icon.types';
import classes from './toggleIcon.module.scss';
import { useOutsideAlerter } from '@hooks/useOutsideAlerter';
import DownIcon from '@assets/svg/toggle-icon.svg';
import { Link } from 'react-router-dom';

export function ToggleIcon({
  imageUrl,
  style,
  userInfo,
  handleLogout,
  isShowToggle,
  setIsShowToggle,
  onClick,
}: ToggleIconProps) {
  const toggleRef = useRef(null as any);

  useOutsideAlerter(toggleRef, () => {
    setIsShowToggle(false);
  });

  return (
    <>
      <span ref={toggleRef}>
        <div className={classes.flex}>
          <Icon
            imageUrl={imageUrl}
            style={{ ...style }}
            onClick={() => setIsShowToggle(!isShowToggle)}
          ></Icon>
          <img
            src={DownIcon}
            className="DownIcon"
            width={20}
            height={20}
            onClick={() => setIsShowToggle(!isShowToggle)}
          ></img>
        </div>
        {isShowToggle && (
          <div className={classes.toggleWrapper}>
            <div className={classes.toggleContainer}>
              <section className={classes.userInfo}>
                <h1>{userInfo.nickname}</h1>
                <div>
                  <p>{userInfo.roleType}</p>
                  <p>{userInfo.email}</p>
                </div>
              </section>
              <ul>
                {userInfo.roleType !== 'USER' ? (
                  <li>관리자 페이지</li>
                ) : (
                  <Link to="/mypage">
                    <li
                      onClick={() => {
                        setIsShowToggle(!isShowToggle);
                      }}
                    >
                      내 정보 수정
                    </li>
                  </Link>
                )}
                <li
                  onClick={() => {
                    setIsShowToggle(!isShowToggle);
                    handleLogout();
                  }}
                >
                  로그아웃
                </li>
              </ul>
            </div>
          </div>
        )}
      </span>
    </>
  );
}
