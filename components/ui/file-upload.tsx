"use client";

import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/image-editor/dist/style.min.css";
import "@/styles/cropper.css";

import { Uppy } from "@uppy/core";

type FileUploadProps = {
  uppy: Uppy;
};

export default function FileUpload({ uppy }: FileUploadProps) {
  return (
    <Dashboard
      hideUploadButton={true}
      autoOpenFileEditor={true}
      theme="auto"
      uppy={uppy}
      plugins={["ImageEditor"]}
    />
  );
}
