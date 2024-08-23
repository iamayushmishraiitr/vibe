import { useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { imageDb } from "../../pages/firebase";
import { nanoid } from "nanoid";
export default function dropBox(props:any) {
   const onImageUpload  = props.onImageUpload
  const [load, setLoad] = useState(false);
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const v4 = nanoid();
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setImg(acceptedFiles[0]);
  }, []);

  useEffect(() => {
    setLoad(true);
    if (img !== null) {
      const imgRef = ref(imageDb, `post/${v4}`);
      uploadBytes(imgRef, img).then((value) => {
        getDownloadURL(value.ref).then((url) => {
          setImgUrl((data) => [...data, url]);
          onImageUpload(url)
        });
      });
    }
    setLoad(false);
  }, [img]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {img !== null ? (
        <div>
          {load ? (
            <h1 className="h-[30px] w-[40px] text-white">Loading...</h1>
          ) : (
            <img src={imgUrl[imgUrl.length - 1]} alt="images" />
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <img src="../../assets/fileupload.svg" alt="Place the image here" />
          <h3 className="text-white mt-4">Drag or Select The Photo Here</h3>
        </div>
      )}
    </div>
  );
}
