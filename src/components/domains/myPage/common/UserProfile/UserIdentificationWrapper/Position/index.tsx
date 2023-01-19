import { POSITION_LIST, POSITION_LIST_KEY } from 'constants/position.';
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
          defaultValue={user.position}
        >
          {Object.keys(POSITION_LIST).map((toteePosition) => (
            <option value={POSITION_LIST[toteePosition]} key={toteePosition}>
              {toteePosition}
            </option>
          ))}
        </select>
      ) : (
        <span className={classes.identification}>
          {POSITION_LIST_KEY[user.position]}
        </span>
      )}
    </>
  );
};

export default Position;
