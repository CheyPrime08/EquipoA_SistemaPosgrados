import React from "react";
import { useDropzone } from "react-dropzone";
import "@/styles/login/inputs.css";

export function Upload({ p, h4, onFileChange, currentFile, name }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileChange(name, acceptedFiles[0]);
      }
    },
  });

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>{currentFile ? currentFile.name : p}</p>
      </div>
      <aside className="mt-2 text-[#807363] justify-center items-center flex flex-col">
        <h4>{h4}</h4>
      </aside>
    </section>
  );
}
