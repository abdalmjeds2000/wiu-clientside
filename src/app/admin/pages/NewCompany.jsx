import React from 'react';
import { Typography, message } from 'antd';
import NewCompanyForm from '../components/NewCompanyForm';
import { AuthData } from '../../../auth/AuthWrapper';
import axios from 'axios';


const NewCompany = () => {
  const { apiUrl } = AuthData();
  const handleSubmit = async (values) => {
    const companyData = { ...values };
    delete companyData.members;
    delete companyData.workers;

    let companyId;
    try {
      const response = await axios.post(`${apiUrl}/CreateCompany`, companyData);
      companyId = response.data.data.guid;
    } catch (error) {
      message.error('حدث خطأ أثناء إضافة الشركة');
      return;
    }

    const members = values.members?.map(member => {
      return {
        ...member,
        company_id: companyId
      }
    }) || [];
    const workers = values.workers?.map(worker => {
      return {
        ...worker,
        company_id: companyId
      }
    }) || [];

    try {
      await axios.post(`${apiUrl}/CreateMembers`, { members });
    } catch (error) {
      message.error('حدث خطأ أثناء إضافة الأعضاء');
    }
    try {
      await axios.post(`${apiUrl}/CreateWorkers`, { workers });
    } catch (error) {
      message.error('حدث خطأ أثناء إضافة العمال');
    }
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