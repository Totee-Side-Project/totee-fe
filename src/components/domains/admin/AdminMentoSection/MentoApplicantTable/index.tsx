import { IMento, IMentoListRequestOptions } from '@api/mentor/types';
import { IPageableResponse } from '@api/post/types';
import { Table } from '@components/atoms/Table';

import classes from './index.module.scss';

const MENTO_APPLICANT_TABLE_COLUMNS = ['닉네임', '분야', '실무 경력', '이메일'];

interface IMentoApplicantTableProps {
  data: IPageableResponse<IMento>;
  onSelectClick: (mento: IMento) => void;
  getMentoListParams: IMentoListRequestOptions;
}
export const MentoApplicantTable = ({
  data,
  onSelectClick,
}: IMentoApplicantTableProps) => {
  const mentoContents = data?.content;

  const mentos = mentoContents?.map((mento) => ({
    nickName: mento.nickname,
    field: mento.field,
    career: mento.career,
    email: mento.email,
  }));

  if (!mentoContents || !mentos) {
    return <Table columns={MENTO_APPLICANT_TABLE_COLUMNS} />;
  }

  if (mentos) {
    const tableBodyContent = mentos.map((mento, index) => (
      <tr
        key={index}
        className={classes.tr}
        onClick={() =>
          mentos.length ? onSelectClick(data.content[index]) : null
        }
        role="button"
      >
        {Object.values(mento).map((value) => (
          <td key={value} className={classes.td}>
            {value}
          </td>
        ))}
      </tr>
    ));

    return (
      <Table
        columns={MENTO_APPLICANT_TABLE_COLUMNS}
        onClickWithObjectPayload={onSelectClick}
        bodyChildren={tableBodyContent}
        classNames={{
          table: classes.table,
          thead: classes.thead,
          tbody: classes.tbody,
          th: classes.th,
          td: classes.td,
          tr: classes.tr,
        }}
      />
    );
  }

  return null;
};
