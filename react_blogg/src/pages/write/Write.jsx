import React from 'react';
import "./write.css"

function Write() {
    return (
        <div className='write'>
            <img class="writeImg" src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
            <form action="" className="writeForm">
                <div className="writeFormGroup">
                    {/* label htmlFor은 아이콘을 누르면 html태그가 실행되게 해준다. */}
                    <label htmlFor='fileInput'>
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput" style={{ display: "none" }} />
                    {/* autoFocus는 새로고침마다 이 input 태그로 포커스가 맞춰진다. */}
                    <input type="text" placeholder='Title' className='writeInput' autoFocus={true}></input>
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder='Tell your story...' type="text" className='writeInput writeText'></textarea>
                </div>
                <button className="writeSubmit">Publish</button>
            </form>
        </div>
    );
}

export default Write;