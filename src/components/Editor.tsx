"use client";

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'link', 'image',
    'list',
];

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function Editor({ value, onChange, placeholder }: EditorProps) {
    return (
        <div className="min-h-[400px] w-full">
            <style jsx global>{`
                .ql-container {
                    font-size: 16px;
                }
                .ql-editor {
                    min-height: 350px;
                }
                .ql-toolbar,
                .ql-container {
                    width: 100% !important;
                }
            `}</style>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                className="h-[350px] mb-12"
            />
        </div>
    );
} 