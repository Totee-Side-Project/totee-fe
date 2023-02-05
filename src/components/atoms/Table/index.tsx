import type { AriaRole, ReactNode } from 'react';

interface ITableProps {
  columns: string[];
  datas: object[] | undefined;
  bodyChildren: ReactNode;
  onClick?: () => void;
  roleTr?: AriaRole;
  classNames?: {
    table?: string;
    thead?: string;
    tbody?: string;
    th?: string;
    tr?: string;
    td?: string;
  };
}

// tr : 행 태그
// td : 열 태그

export const Table = ({
  columns,
  datas,
  bodyChildren,
  onClick,
  roleTr,
  classNames,
}: ITableProps) => {
  return (
    <table className={classNames?.table}>
      <thead className={classNames?.thead}>
        <tr className={classNames?.tr}>
          {columns.map((column) => (
            <th key={column} className={classNames?.th}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={classNames?.tbody}>
        {datas !== undefined
          ? datas.map((data, index) => (
              <tr
                key={index}
                className={classNames?.tr}
                onClick={onClick}
                role={roleTr}
              >
                {Object.values(data).map((value) => (
                  <td key={value} className={classNames?.td}>
                    {value}
                  </td>
                ))}
              </tr>
            ))
          : null}
        {bodyChildren}
      </tbody>
    </table>
  );
};
