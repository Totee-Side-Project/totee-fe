import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { NewIcon } from '@components/atoms/Icon/NewIcon';
import { useOutsideAlerter } from '@hooks/useOutsideAlerter';
import DownIcon from '@assets/toggle-icon.svg';
import { ToggleIconProps } from 'types/icon.types';
import classes from './toggleIcon.module.scss';

export function ToggleIcon({
  imageUrl,
  userInfo,
  handleLogout,
  isShowToggle,
  setIsShowToggle,
}: ToggleIconProps) {
  const toggleRef = useRef(null as any);
  const toggleOnClick = () => setIsShowToggle(!isShowToggle);
  const toggleWithLogoutOnClick = () => {
    toggleOnClick();
    handleLogout();
  };
  useOutsideAlerter(toggleRef, () => setIsShowToggle(false));

  return (
    <>
      <span ref={toggleRef}>
        <div className={classes.flex}>
          <NewIcon
            src={imageUrl}
            alt="user_profile_img"
            style={{ width: '60px', height: '60px', borderRadius: '50%' }}
            onClick={toggleOnClick}
          />
          <NewIcon
            src={DownIcon}
            className="DownIcon"
            alt="down_toggle_icon"
            width={20}
            height={20}
            onClick={toggleOnClick}
          />
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
                    <li onClick={toggleOnClick}>내 정보 수정</li>
                  </Link>
                )}
                <li onClick={toggleWithLogoutOnClick}>로그아웃</li>
              </ul>
            </div>
          </div>
        )}
      </span>
    </>
  );
}
