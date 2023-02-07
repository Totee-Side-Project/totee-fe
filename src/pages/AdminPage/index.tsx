import { Route, Routes } from 'react-router-dom';

import { AdminSidebar } from '@components/domains/admin/AdminSidebar';
import { AdminMentoSection } from '@components/domains/admin/AdminMentoSection';

import classes from './index.module.scss';

const AdminPage = () => {
  return (
    <div className={classes.adminPage}>
      <AdminSidebar />
      <Routes>
        <Route path="mento/*" element={<AdminMentoSection />} />
      </Routes>
    </div>
  );
};

export default AdminPage;
