import { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';

import { EditStudyPage } from '@components/organism';
import { useGetPostByPostId } from '@hooks/useGetQuery';

import { IPostDetailType } from 'types/post.types';

// 클릭한 값 보여주기

function EditPage() {
    const [initialData, setInitialData]=useState<IPostDetailType>();

    let { id } = useParams();

    const { data, refetch } = useGetPostByPostId(parseInt(id as string));

    useEffect(() => {
        if (data && data.status === 200) {
            console.log(data.data.body.data)
            setInitialData(data.data.body.data);
        }
      }, [data, status]);
    

    return (
        <EditStudyPage type="edit" initialData={initialData}/>
    );
}

export default EditPage;
