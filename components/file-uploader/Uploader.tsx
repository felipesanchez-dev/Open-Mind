"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function Uploader() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Arrastra los archivos aquí ...</p>
      ) : (
        <p>
          Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar
          archivos
        </p>
      )}
    </div>
  );
}
