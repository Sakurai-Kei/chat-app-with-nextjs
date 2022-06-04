import Image from "next/image";
import { useState, useEffect } from "react";
import { UploadImageProps } from "../interfaces/Components";

export default function UploadImage(props: UploadImageProps) {
  const { stagedImage, stagedImageChange, stagedImageUpload, inputImageRef } =
    props;

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!stagedImage) {
      return;
    }
    const blob = new Blob([stagedImage], { type: "image/png, image/jpeg" });
    const img = URL.createObjectURL(blob);
    setImagePreview(img);
  }, [stagedImage]);

  return (
    <section className="w-full h-full flex justify-center items-center bg-slate-500 bg-opacity-50 z-10">
      <form className="w-fit h-fit p-4 flex flex-col gap-4 justify-center items-center rounded-lg shadow-md bg-white">
        <div className="w-full h-full flex justify-center rounded-lg hover:bg-slate-400">
          <label htmlFor="picture">
            {!imagePreview && (
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 22H6C4.89543 22 4 21.1046 4 20V3.99999C4 2.89542 4.89543 1.99999 6 1.99999H13C13.009 1.99882 13.018 1.99882 13.027 1.99999H13.033C13.0424 2.00294 13.0522 2.00495 13.062 2.00599C13.1502 2.01164 13.2373 2.02878 13.321 2.05699H13.336H13.351H13.363C13.3815 2.06991 13.3988 2.08429 13.415 2.09999C13.5239 2.14841 13.6232 2.21617 13.708 2.29999L19.708 8.29999C19.7918 8.38477 19.8596 8.48404 19.908 8.59299C19.917 8.61499 19.924 8.63599 19.931 8.65899L19.941 8.68699C19.9689 8.77038 19.9854 8.85717 19.99 8.94499C19.9909 8.95495 19.9932 8.96472 19.997 8.97399V8.97999C19.9986 8.98654 19.9996 8.99324 20 8.99999V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22ZM9 16L6 20H18L13 13L10 17L9 16ZM8.5 11C7.68198 11.0011 7.01568 11.6574 7.00223 12.4753C6.98878 13.2932 7.63315 13.9711 8.45069 13.9991C9.26824 14.0271 9.95746 13.3949 10 12.578V12.868V12.5C10 11.6716 9.32843 11 8.5 11ZM13 3.99999V8.99999H18L13 3.99999Z"
                  fill="#2E3A59"
                ></path>
              </svg>
            )}
            {imagePreview && (
              <div className="w-52 h-52 md:w-96 md:h-96">
                {" "}
                <Image
                  src={imagePreview}
                  alt="user attempting to upload"
                  width={64}
                  height={64}
                  layout="responsive"
                  className="rounded-lg shadow-md"
                />
              </div>
            )}
          </label>
          <input
            hidden
            ref={inputImageRef}
            onChange={stagedImageChange}
            type="file"
            id="picture"
            name="picture"
            accept=".jpg, .jpeg, .png"
            multiple={false}
          />
        </div>
        <button
          onClick={stagedImageUpload}
          type="button"
          className="w-full py-2 bg-blue-500 rounded-lg shadow-md text-white hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
    </section>
  );
}
