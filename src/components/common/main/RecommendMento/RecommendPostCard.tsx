import React from 'react'
import {checkingDetailPeriod} from "@utils/handleSelectValue";



interface Props{
    onClickCard: (e:any)=>void;
    item:{
        postId: number;
        title:string;
        content :string;
        categoryName:string;
        status: boolean;
        period: string;
    }
}

export default function RecommendPostCard({onClickCard, item}:Props) {
console.log(item);
    
  return (
    <div
      className="card_container"
      onClick={onClickCard}
      id={`${item.postId}`}
      style={{ width: 400 + 'px' }}
    >
      <div className="card_image_wrapper"></div>
      <div className="card_title">{item.title}</div>
      <div
        className="card_content"
        dangerouslySetInnerHTML={{ __html: item.content }}
      ></div>
      <div className="card_category">
        <div className="card_category_content">
          {checkingDetailPeriod(item.period)}
        </div>
        <div className="card_category_content">
          {item.categoryName}
        </div>
        <div className="card_category_content">
          {item.status ? '모집중' : '모집완료'}
        </div>
      </div>
    </div>
  )
}
