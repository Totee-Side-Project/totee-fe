// Todo: 🟠 마이페이지 작업이 끝난 이후에도 쓰이는 곳이 없으면 파일을 제거해줄 예정

// import React, { useEffect } from 'react';
// import { useState } from 'react';
// import { Checkbox } from '@components/atoms';
// import './select.scss';
// import recentIcon from '../../../assets/recentIcon.svg';
// import recentLine from '../../../assets/recentLine.svg';
// import {
//   checkingDetailPeriod,
//   handleSelectValues,
// } from '@utils/handleSelectValue';

// interface ISelectPropsType {
//   values: any;
//   setValues: (e: any) => void;
//   optionData: any;
//   variable: any;
//   isChecked: any;
//   setIsChecked: (e: any) => void;
//   initialData?: any;
// }

// export const PositionSelect = ({
//   values,
//   setValues,
//   optionData,
//   variable,
//   isChecked,
//   setIsChecked,
//   initialData,
// }: ISelectPropsType) => {
//   const [showOptions, setShowOptions] = useState(false);

//   const handleLabelClick = () => {
//     setShowOptions((prev) => !prev);
//   };

//   return (
//     <div className="box_container" onClick={handleLabelClick}>
//       <label className="recent_wrapper">
//         <div className="recent_value">프론트 엔드</div>
//         <img src={recentLine} className="recent_line" alt="|" />
//         <img src={recentIcon} className="recent_icon" alt=">" />
//       </label>
//       {showOptions ? (
//         <ul className="recent_list">
//           {optionData.map((data: any, i: any) => {})}
//         </ul>
//       ) : null}
//     </div>
//   );
// };
export {};
