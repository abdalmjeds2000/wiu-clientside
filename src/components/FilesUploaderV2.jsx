import React, { useEffect } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';

const FilesUploader = ({ getFilesList }) => {
  const [fileList, setFileList] = React.useState([]);

  const uploadFile = (file) => {
    const storageRef = ref(storage, `companies/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        const updatedFileList = [...fileList];
        const index = updatedFileList.findIndex((item) => item.uid === file.uid);
        if(updatedFileList[index].status === "removed") return;
        updatedFileList[index].status = 'uploading';
        updatedFileList[index].percent = progress;
        setFileList(updatedFileList);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const updatedFileList = [...fileList];
          const index = updatedFileList.findIndex((item) => item.uid === file.uid);
          updatedFileList[index].status = 'done';
          updatedFileList[index].url = downloadURL;
          setFileList(updatedFileList);
        });
      }
    )
  }

  useEffect(() => {
    getFilesList(fileList);
  }, [fileList]);

  return (
    <Dragger
      customRequest={obj => uploadFile(obj.file)}
      name="file"
      fileList={fileList}
      onChange={info => {
        setFileList(info.fileList);
      }}
      
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        إضغط أو اسحب الملفات لرفعها
      </p>
      <p className="ant-upload-hint">
        يمكنك رفع أكثر من ملف في نفس الوقت
      </p>
    </Dragger>
  )
}

export default FilesUploader