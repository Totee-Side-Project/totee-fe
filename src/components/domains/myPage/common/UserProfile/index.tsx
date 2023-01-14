import { useGetUserAPI } from '@hooks/query/useGetQuery';
import ReadOnlyUserProfile from './ReadOnlyUserProfile';
import './index.scss';

const UserProfile = () => {
  const user = useGetUserAPI().data.data.body.data;

  return (
    <section className="userProfile">
      <ReadOnlyUserProfile user={user} />
    </section>
  );
};

export default UserProfile;
