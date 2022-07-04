import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import EditorComponent from "./EditorComponent"
import "./setupstudypage.scss"

function SetUpStudyPage() {
  let navigate = useNavigate();
  const [title, setTitle] = useState("")

  //제목 state 저장
  const handlerTitleChange = (e:any) => {
    setTitle(e.target.value)
    // console.log(title)
  }

  //카테고리 
  const categoryName = ["스터디", "프로젝트", "멘토멘티", "동아리", "LAB", "자유게시판"]

  const categoryCheckList = () => {
    const handlerCheckBox = (e:any) => {
      // console.log(e.target.value)
    }
    const category = categoryName.map((arr:any,index:number)=>{
      return (
        <div key={index} className="radio_container">
          <input type="radio" name="category" onClick={handlerCheckBox} value={arr}/>
          <label htmlFor="category" className="radio_label">{arr}</label>
        </div>
      )
    })
    return category
  }

  //취소버튼 클릭시
  const handlerCancelClick = () => {
    navigate("/");
  }

  return (
    <div className="studypage_container">
      <div className="title_container">
        <div className="title_head" >제목</div>
        <input className="title_input" type="text" placeholder="제목을 입력해주세요!" onChange={handlerTitleChange}/>
      </div>
      <div className="category_container">
        <div className="category_head">카테고리</div>
        <div className="category_list">
          {categoryCheckList()}
        </div>
      </div>
      <div className="editor_head">내용</div>
      <EditorComponent/>
      <div className="button_container"> 
        <button className= "upload_button" type="submit">등록하기</button>
        <button className= "cancel_button" onClick={handlerCancelClick}>취소하기</button>
      </div>
    </div>
  )
}

export default SetUpStudyPage