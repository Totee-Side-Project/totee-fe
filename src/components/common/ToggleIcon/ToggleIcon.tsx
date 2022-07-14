import React, {useRef} from 'react'
import { Icon } from '@components/atoms';
import { ToggleIconProps } from 'types/icon.types';
import classes from './toggleIcon.module.scss';
import { useOutsideAlerter } from '@hooks/useOutsideAlerter';

export function ToggleIcon({imageUrl, style, userInfo, handleLogout, isShowToggle,setIsShowToggle, onClick}:ToggleIconProps) {
    const toggleRef= useRef(null as any);

    useOutsideAlerter(toggleRef, ()=>{setIsShowToggle(false)});
    
    return (
        <>
        <Icon 
            imageUrl={imageUrl}
            style={{...style}}
            onClick={onClick}
        ></Icon>
        {isShowToggle&&
        <div className={classes.toggleWrapper} ref={toggleRef}>
            <div className={classes.toggleContainer}>
            <section className={classes.userInfo}>
                <h1>{userInfo.nickname}</h1>
                <div>
                    <p>{userInfo.roleType}</p>
                    <p>{userInfo.email}</p>
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
