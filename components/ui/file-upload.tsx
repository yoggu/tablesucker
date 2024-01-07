"use client";

import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/image-editor/dist/style.min.css";
import "@/styles/uppy.css";

import { Uppy } from "@uppy/core";
import { use, useEffect } from "react";

type FileUploadProps = {
  uppy: Uppy;
};

export default function FileUpload({ uppy }: FileUploadProps) {
  return (
    <div className="uppy-wrapper">
      <Dashboard
        hideUploadButton={true}
        autoOpenFileEditor={true}
        width="100%"
        height="500px"
        theme="auto"
        uppy={uppy}
        plugins={["ImageEditor"]}
      />
    </div>
  );
}
