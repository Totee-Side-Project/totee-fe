import { AxiosResponse } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import { Route, Routes } from 'react-router-dom';

import { AdminSidebar } from '@components/domains/admin/AdminSidebar';
import { queryKeys } from '@hooks/query/queryKeys';
import { IUserType } from '@api/user/types';
import { IResponseOfDetail } from '@api/post/types';

import { AdminMentoSection } from '@components/domains/admin/AdminMentoSection';
import classes from './index.module.scss';

const AdminPage = () => {
  const { data } = useQuery(queryKeys.user) as UseQueryResult<
    AxiosResponse<IResponseOfDetail<IUserType>>
  >;

  // TODO: 유저 권항늘 확인해서 redirect 해줘야함
  // const userData = data?.data.body.data;

  // useEffect(() => {
  //   userData && userData.roleType !== 'admin' && console.log('권한없음');
  // }, [userData]);

  return (
    <div className={classes.adminPage}>
      {/* {userData?.roleType === 'admin' && ( */}
      {/* <> */}
      <AdminSidebar />
      <Routes>
        <Route path="mento/*" element={<AdminMentoSection />} />
      </Routes>
      {/* </> */}
      {/* )} */}
    </div>
  );
};

export default AdminPage;
