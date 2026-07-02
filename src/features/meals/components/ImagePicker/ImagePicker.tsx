"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

import { useObjectUrl } from "@/shared/hooks/useObjectUrl";
import "./image-picker.scss";

interface ImagePickerProps {
  label: string;
  name: string;
}

export function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<File | null>(null);
  const imagePreviewUrl = useObjectUrl(pickedImage);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPickedImage(file ?? null);
  };

  const triggerImageUpload = () => {
    imageInputRef.current?.click();
  };

  return (
    <div className="image-picker">
      <label htmlFor={name}>{label}</label>
      <div className="controls">
        <div className="preview" role="region" aria-label="Image preview">
          {!imagePreviewUrl ? (
            <p>No image to preview</p>
          ) : (
            <div className="image-container">
              <Image
                src={imagePreviewUrl}
                alt="Selected meal image preview"
                fill
              />
            </div>
          )}
        </div>
        <input
          className="input"
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInputRef}
          onChange={handleImageChange}
          aria-label={`Upload ${label.toLowerCase()}`}
          required
        />
        <button
          className="button"
          type="button"
          onClick={triggerImageUpload}
          aria-label={`Click to select ${label.toLowerCase()}`}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
