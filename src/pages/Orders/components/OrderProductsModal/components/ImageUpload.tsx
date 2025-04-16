import React from "react";
import { Controller } from "react-hook-form";
import { Form } from "react-bootstrap";

interface ImageUploadProps {
  control: any;
  errors: any;
  setImagePreview: (url: string | null) => void;
  setValue: (name: string, value: any) => void;
  imagePreview: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  control,
  errors,
  setValue,
  setImagePreview,
  imagePreview,
}) => (
  <>
    <Form.Group className="mb-3">
      <Form.Label>Фото</Form.Label>
      <Controller
        name="photo"
        control={control}
        render={({ field }) => (
          <Form.Control
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            isInvalid={!!errors.photo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
                if (!allowedTypes.includes(file.type)) {
                  alert("Допустимы только форматы: jpg, jpeg, png");
                  e.target.value = "";
                  setImagePreview(null);
                  return;
                }
                setValue("photo", file);
                setImagePreview(URL.createObjectURL(file));
              }
            }}
          />
        )}
      />
      {errors.photo && <p className="text-danger">{errors.photo.message}</p>}
    </Form.Group>

    {imagePreview && (
      <div>
        <img src={imagePreview} alt="Image Preview" width="100" />
      </div>
    )}
  </>
);

export default ImageUpload;
