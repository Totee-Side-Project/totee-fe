import React, { useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import classes from './editor.module.scss';
import './editor.scss';

interface Props {
  values: any;
  onChange: (content: any) => void;
}
export const Editor: any = ({ values, onChange }: Props) => {
  const QuillRef = useRef<ReactQuill>();

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
    <div className={classes.editor_container}>
      <ReactQuill
        ref={(element: any) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={values.content}
        onChange={(content) => onChange(content)}
        className={classes.editor_wrapper}
        theme="snow"
        modules={modules}
        formats={formats}
      />
    </div>
  );
};
