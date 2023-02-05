import { Table } from '@components/atoms/Table';
import { useGetMentoList } from '@hooks/query/useGetQuery';
import classes from './index.module.scss';

const MENTO_APPLICANT_TABLE_COLUMNS = ['닉네임', '분야', '실무 경력', '이메일'];
const MENTO_APPLICANTS_PAGE = 0;
const MENTO_APPLICANTS_SIZE = 8;

export const MentoApplicantTable = () => {
  const { data } = useGetMentoList({
    kind: 'all',
    page: MENTO_APPLICANTS_PAGE,
    size: MENTO_APPLICANTS_SIZE,
  });

  const mentos = data?.content.map((mento) => ({
    nickName: mento.nickname,
    field: mento.field,
    career: mento.career,
    email: mento.email,
  }));

  return (
    <Table
      columns={MENTO_APPLICANT_TABLE_COLUMNS}
      datas={mentos}
      bodyChildren={undefined}
      roleTr="button"
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
};
