import ReactQuill from "react-quill";
import { Controller } from 'react-hook-form';

const modules = {

  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'align', 'center', 'right', 'justify',
  'link', 'image', 'video',
];

const EditorHtml = ({ name, control, defaultValue }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      render={({ field: { onChange, value } }) => (
        <ReactQuill style={{marginBottom: '8px'}} value={value} onChange={onChange} theme="snow" modules={modules} formats={formats} />
      )}
    />
  );
};

export default EditorHtml;