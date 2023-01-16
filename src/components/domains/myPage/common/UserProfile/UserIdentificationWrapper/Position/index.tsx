import { POSITION, positionListKey } from '@utils/position.const';
import React from 'react';
import { UserType } from 'types/user.types';
import classes from '../index.module.scss';

interface IPositionProps {
  user: UserType;
  isEditProfile: boolean;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
}

const Position = ({ user, isEditProfile, setPosition }: IPositionProps) => {
  return (
    <>
      {isEditProfile ? (
        <select
          className={classes.positionDropdown}
          onChange={(e) => setPosition(e.target.value)}
          defaultValue={user.position === 'IOS' ? 'iOS' : user.position}
        >
          {POSITION.map((toteePosition) => (
            <option value={toteePosition} key={toteePosition}>
              {positionListKey[toteePosition.toUpperCase()]}
            </option>
          ))}
        </select>
      ) : (
        <span className={classes.identification}>
          {positionListKey[user.position.toUpperCase()]}
        </span>
      )}
    </>
  );
};

export default Position;
