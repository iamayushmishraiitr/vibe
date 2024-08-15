import { useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import {ref, getDownloadURL, uploadBytes,} from "firebase/storage";
import { imageDb } from "../pages/firebase";
import { nanoid } from "nanoid";
type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void;
  imgaeToparent: (string: string[]) => void;
  imageurl: string | null;
};
export default function PostUploader({
  fieldChange,
  imgaeToparent,
  imageurl,
}: ProfileUploaderProps) {
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const v4 = nanoid();
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    console.log(acceptedFiles);
    setImg(acceptedFiles[0]);
    fieldChange(acceptedFiles);
  }, []);

  useEffect(() => {
    if (img !== null) {
      const imgRef = ref(imageDb, `post/${v4}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    }
  }, [img]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });
  if (imgUrl) imgaeToparent(imgUrl);
  return (
    <div {...getRootProps()} >
      <input {...getInputProps()} />
      {img !== null ? (
        <div>
          <img src={`${imgUrl}`} alt="images" className="text-white" />
        </div>
      ) : (
        <div >
          {imageurl  ? (
             <img className="h-[400px] w-[600px]  items-center"
             src= {imageurl}
             alt="Place The image Here"
          />
          ) : (
            <div className="flex flex-col bg-slate-950 items-center h-[500px] w-[800px]">
            <img className="h-[300px] w-[600px]  items-center"
              src="./src/assets/fileupload.svg"
              alt="Place The image Here"
           />
             <h3 className="text-white">Drag The Photo Here</h3>
              </div>
          )}

  
        </div>
      )}
    </div>
  );
}
