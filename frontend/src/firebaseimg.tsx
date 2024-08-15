import  {  useState } from "react";
import { imageDb } from './pages/firebase';
import { getDownloadURL,  ref, uploadBytes } from "firebase/storage";
import { nanoid } from "nanoid";

function Firebaseimg() {
    const [img, setImg] = useState<File | null>(null);
    const [imgUrl, setImgUrl] = useState<string[]>([]);
    const v4 = nanoid();

    const handleClick = async() => {
        if (img !== null) {
            const imgRef = ref(imageDb, `files/${v4}`);
            uploadBytes(imgRef, img).then(value => {
                console.log(value);
                getDownloadURL(value.ref).then(url => {
                      setImgUrl(data => [...data, url]);
                });
            });
        }
    };

    

    return (
        <div className="App">
            <input type="file"  onChange={(e) => setImg(e.target.files ? e.target.files[0] : null)} />
            <button onClick={handleClick}>Upload</button>
            <br />
            {imgUrl.map(dataVal => (
                <div key={dataVal}>
                    <img src={dataVal} height="200px" width="200px" alt="Uploaded" />
                    <br />
                </div>
            ))}
        </div>
    );
}

export default Firebaseimg;
