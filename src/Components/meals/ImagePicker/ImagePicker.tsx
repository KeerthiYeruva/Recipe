"use client";
import React, { useRef, useState } from "react";
import "./image-picker.scss";
import Image from "next/image";

interface ImagePickerProps {
  label: string;
  name: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ label, name }) => {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPickedImage(objectUrl);
  };

  const triggerImageUpload = () => {
    imageInputRef.current?.click();
  };

  return (
    <div className="image-picker">
      <label htmlFor={name}>{label}</label>
      <div className="controls">
        <div className="preview" role="region" aria-label="Image preview">
          {!pickedImage ? (
            <p>No image to preview</p>
          ) : (
            <div className="image-container">
              <Image src={pickedImage} alt="Selected meal image preview" fill />
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
          style={{ position: "absolute", left: "-9999px" }}
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
};

export default ImagePicker;
