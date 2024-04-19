'use client'

import { ImageType } from "@/app/admin/add-products/AddProductFrom";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface SelectFileProps {
    item?: ImageType
    handleFileChange: (value: File) => void
}

const SelectFile: React.FC<SelectFileProps> = ({
    item, handleFileChange
}) => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            handleFileChange(acceptedFiles[0])
            console.log(acceptedFiles[0])
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'Files/*': ['.pdf'] }
    })

    return (<div {...getRootProps()} className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center">
        <input  {...getInputProps()} />
        {isDragActive ? (
            <p>Drop the File here...</p>
        ) : (
            <p>+ {item?.color} File</p>
        )}
    </div>);
}

export default SelectFile;
