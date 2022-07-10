import React from 'react'
import { Icon } from '@components/atoms';
import { ToggleIconProps } from 'types/icon.types';
import classes from './toggleIcon.module.scss';

export function ToggleIcon({imageUrl, style, userInfo, handleLogout, isShowToggle, onClick}:ToggleIconProps) {
  
return (
    <>
    <Icon 
        imageUrl={imageUrl}
        style={{...style}}
        onClick={onClick}
    ></Icon>
    {isShowToggle&&
    <div className={classes.toggleWrapper}>
        <div className={classes.toggleContainer}>
        <section className={classes.userInfo}>
            <h1>{userInfo.nickname}</h1>
            <div>
                <p>{userInfo.email}</p>
                <p>rnjstmdals6@gmail.com</p>
            </div>
        </section>
        <ul>
            <li>관리자 페이지</li>
            <li>내 정보 수정</li>
            <li onClick={handleLogout}>로그아웃</li>
        </ul>
        </div>
    </div>
    }
    </>
  )
}
