import { CreateStudy } from '@components/organism/CreateStudy/CreateStudy';
import { useGetPostByPostId } from '@hooks/useGetQuery';
import { checkingDetailPeriod } from '@utils/handleSelectValue';
import { useParams } from 'react-router-dom';

const EditStudyPage = () => {
  const { id } = useParams();
  const { data, status } = useGetPostByPostId(Number(id));

  if (status === 'success') {
    const responseData = data?.data.body.data;
    const initialData = {
      title: responseData.title,
      content: responseData.content,
      contactLink: responseData.contactLink,
      contactMethod: responseData.contactMethod,
      detailedRegion: responseData.detailedRegion,
      onlineOrOffline: responseData.onlineOrOffline,
      region: responseData.region,
      period: checkingDetailPeriod(responseData.period),
      recruitNum: String(responseData.recruitNum),
      skillList: responseData.skillList,
    };

    return <CreateStudy initialData={initialData} />;
  }

  return null;
};

export default EditStudyPage;
