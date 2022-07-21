import React, { Component, useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.scss';

export const Editor: any = (props: any) => {
  // const ReactQuill = require('react-quill');
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState('');

  useEffect(() => {
    props.setValues({
      ...props.values,
      ['content']: contents,
    });
  }, [contents]);

  const modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ['clean'],
    ],
  };

  const formats = [
    //'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ];

  return (
    <div className="editor_container">
      <ReactQuill
        ref={(element: any) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={contents}
        onChange={setContents}
        className="editor_wrapper"
        theme="snow"
        modules={modules}
        formats={formats}
      />
    </div>
  );
};
