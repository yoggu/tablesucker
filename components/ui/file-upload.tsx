"use client";

import Dashboard from "@uppy/react/dashboard";

import "@uppy/core/css/style.css";
import "@uppy/dashboard/css/style.css";
import "@uppy/image-editor/css/style.css";
import "@/styles/uppy.css";

import type { Uppy } from "@uppy/core";

type FileUploadProps = {
  uppy: Uppy;
};

export default function FileUpload({ uppy }: FileUploadProps) {
  return (
    <div className="uppy-wrapper">
      <Dashboard
        hideUploadButton={true}
        autoOpen="imageEditor"
        width="100%"
        height="500px"
        theme="auto"
        uppy={uppy}
        plugins={["ImageEditor"]}
      />
    </div>
  );
}
