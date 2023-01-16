import { POSITION, positionListKey } from '@utils/position.const';
import './index.scss';

const Position = ({ user, isEditProfile, setPosition }: any) => {
  return (
    <>
      {isEditProfile ? (
        <select
          className="positionDropdown"
          onChange={(e) => setPosition(e.target.value)}
          defaultValue={user.position === 'IOS' ? 'iOS' : user.position}
        >
          {POSITION.map((toteePosition) => (
            <option value={toteePosition} key={toteePosition}>
              {positionListKey[toteePosition.toUpperCase() as string]}
            </option>
          ))}
        </select>
      ) : (
        <span className="identification">
          {positionListKey[user.position.toUpperCase() as string]}
        </span>
      )}
    </>
  );
};

export default Position;
