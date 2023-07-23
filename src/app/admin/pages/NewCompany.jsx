import React from 'react';
import { Typography, message } from 'antd';
import NewCompanyForm from '../components/NewCompanyForm';
import FilesUploader from '../../../components/FilesUploader';


const NewCompany = () => {
  const handleSubmit = (values) => {
    console.log('Success:', values);
  }
  const onFinishFailed = _ => message.error('الرجاء التأكد من صحة البيانات المدخلة');
  return (
    <div>
      <Typography.Title level={3} style={{marginBottom: 30}}>قم بإضافة بيانات الشركة الجديدة</Typography.Title>
      <div>
        <NewCompanyForm
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        />
      </div>
    </div>
  )
}

export default NewCompany;