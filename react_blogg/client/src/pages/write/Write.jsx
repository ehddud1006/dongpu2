import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            console.log(data)
            newPost.photo = filename;
            try {
                await axios.post("http://localhost:3000/api/upload", data);
            } catch (err) { }
        }
        try {
            const res = await axios.post("http://localhost:3000/api/posts", newPost);
            window.location.replace("http://localhost:3000/post/" + res.data._id);
        } catch (err) { }
    };
    return (
        <div className="write">
            {file && (
                <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
            )}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => {
                            setFile(e.target.files[0])
                            // 콘솔 찍어본 결과 
                            // e 는 엄청 긴 객체이며 

                            // console.log(e.target.files[0])
                            // File {name: '20211221_001404.png', lastModified: 1640013248543, 
                            // lastModifiedDate: Tue Dec 21 2021 00:14:08 GMT+0900 (한국 표준시)
                            // , webkitRelativePath: '', size: 169867, …}
                        }
                        }
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={true}
                        onChange={e => {
                            setTitle(e.target.value)
                            // console.log(e.target.value)
                            // Title 창에 입력한 문자열이 동적으로 저장
                        }}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder="Tell your story..."
                        type="text"
                        className="writeInput writeText"
                        onChange={e => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    );
}

export default Write;