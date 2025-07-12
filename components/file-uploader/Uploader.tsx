"use client";
import { useCallback, useState, useEffect } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
} from "./RenderState";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useConstructUrl } from "@/hooks/use-construct";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
}

interface UploaderProps {
  value?: string;
  onChange?: (key: string) => void;
  onUploadComplete?: (key: string, url: string) => void;
  className?: string;
}

export function Uploader({ value, onChange, onUploadComplete }: UploaderProps) {
  const fileUrl = useConstructUrl(value || "");
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    id: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: "image",
    key: value,
    objectUrl: fileUrl,
  });

  useEffect(() => {
    if (value && value !== fileState.key) {
      const publicUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.s3.amazonaws.com/${value}`;

      setFileState((prev) => ({
        ...prev,
        key: value,
        objectUrl: publicUrl,
        uploading: false,
        error: false,
        progress: 100,
      }));
    } else if (!value && fileState.key) {
      setFileState((prev) => ({
        ...prev,
        key: undefined,
        objectUrl: undefined,
        file: null,
        uploading: false,
        error: false,
        progress: 0,
      }));
    }
  }, [value, fileState.key]);

  async function deleteFile(key: string) {
    try {
      setFileState((prev) => ({ ...prev, isDeleting: true }));

      const response = await fetch(`/api/s3/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      });

      if (!response.ok) {
        console.warn("No se pudo eliminar el archivo anterior de S3");
      }
    } catch (error) {
      console.warn("Error eliminando archivo:", error);
    } finally {
      setFileState((prev) => ({ ...prev, isDeleting: false }));
    }
  }

  async function uploadFile(file: File) {
    if (fileState.key || value) {
      const keyToDelete = fileState.key || value;
      await deleteFile(keyToDelete!);
    }

    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
      error: false,
    }));

    try {
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: true,
        }),
      });

      if (!presignedResponse.ok) {
        toast.error("Failed to get presigned URL");
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: true,
        }));

        return;
      }

      const { presignedUrl, key } = await presignedResponse.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentageComplete = (event.loaded / event.total) * 100;
            setFileState((prev) => ({
              ...prev,
              progress: Math.round(percentageComplete),
            }));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFileState((prev) => ({
              ...prev,
              progress: 100,
              uploading: false,
              key: key,
            }));

            if (onChange) {
              onChange(key);
            }

            if (onUploadComplete) {
              onUploadComplete(
                key,
                `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.s3.amazonaws.com/${key}`
              );
            }

            toast.success("Archivo subido correctamente");
            resolve();
          } else {
            reject(new Error("Upload failed"));
          }
        };

        xhr.onerror = () => {
          reject(new Error("Network error"));
        };

        xhr.onabort = () => {
          reject(new Error("Upload cancelled"));
        };
        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch {
      toast.error("Error al subir el archivo");
      setFileState((prev) => ({
        ...prev,
        progress: 0,
        error: true,
        uploading: false,
      }));
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (fileState.objectUrl && fileState.objectUrl.startsWith("blob:")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

        setFileState({
          file: file,
          uploading: false,
          progress: 0,
          objectUrl: URL.createObjectURL(file),
          error: false,
          id: uuidv4(),
          isDeleting: false,
          fileType: "image",
          key: undefined,
        });

        uploadFile(file);
      }
    },
    [fileState.objectUrl, fileState.key, value]
  );

  function rejectedFiles(fileRejection: FileRejection[]) {
    if (fileRejection.length) {
      const tooManyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files"
      );

      const fileSizeToBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
      );

      if (fileSizeToBig) {
        toast.error(
          "El archivo es demasiado grande, el tamaño máximo permitido es de 10MB"
        );
      }

      if (tooManyFiles) {
        toast.error("Solo se permite un archivo");
      }
    }
  }

  const handleDeleteFile = async () => {
    const keyToDelete = fileState.key || value;

    if (keyToDelete) {
      await deleteFile(keyToDelete);
    }

    if (fileState.objectUrl && fileState.objectUrl.startsWith("blob:")) {
      URL.revokeObjectURL(fileState.objectUrl);
    }

    setFileState({
      error: false,
      file: null,
      id: null,
      uploading: false,
      progress: 0,
      isDeleting: false,
      fileType: "image",
      objectUrl: undefined,
      key: undefined,
    });

    if (onChange) {
      onChange("");
    }

    toast.success("Archivo eliminado");
  };

  function renderContent() {
    if (fileState.uploading) {
      return (
        <div className="text-center">
          <h3 className="font-semibold">Subiendo archivo...</h3>
          <p className="text-sm text-muted-foreground">
            {fileState.progress}% completado
          </p>
        </div>
      );
    }

    if (fileState.error) {
      return <RenderErrorState />;
    }

    if (fileState.objectUrl && (fileState.key || value)) {
      return (
        <RenderUploadedState
          previewUrl={fileState.objectUrl}
          onDelete={handleDeleteFile}
          isDeleting={fileState.isDeleting}
        />
      );
    }

    return <RenderEmptyState isDragging={isDragActive} />;
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 10 * 1024 * 1024,
    onDropRejected: rejectedFiles,
  });

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && fileState.objectUrl.startsWith("blob:")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      )}
    >
      <CardContent className="flex items-center justify-center h-full w-full">
        <input {...getInputProps()} />
        {renderContent()}
      </CardContent>
    </Card>
  );
}
