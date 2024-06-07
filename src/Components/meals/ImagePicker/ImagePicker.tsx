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
  const ImageInput = useRef<HTMLInputElement>(null);

  const HandleImage = () => {
    ImageInput.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className="image-picker">
      <label htmlFor={name}>{label}</label>
      <div className="controls">
        <div className="preview">
          {!pickedImage ? (
            <p>No image to preview</p>
          ) : (
            <Image src={pickedImage} alt="image by user" layout="fill" />
          )}
        </div>
        <input
          className="input"
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={ImageInput}
          onChange={handleImageChange}
          required
        />
        <button className="button" type="button" onClick={HandleImage}>
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
