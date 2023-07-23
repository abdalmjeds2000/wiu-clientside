import { Button, Col, Form, Input, InputNumber, Row, Select, Switch, Typography, message } from 'antd'
import React from 'react'
import FilesUploader from '../../../components/FilesUploader';

const NewCompanyForm = ({ onFinish, onFinishFailed }) => {
  const [form] = Form.useForm();
  const [commercialRegisterFiles, setCommercialRegisterFiles] = React.useState([]);
  const [industryLicenseFiles, setIndustryLicenseFiles] = React.useState([]);
  const [municipalityLicenseFiles, setMunicipalityLicenseFiles] = React.useState([]);

  const handleSubmit = (values) => {
    const data = {
      ...values,
      commercial_register_files: commercialRegisterFiles,
      industry_license_files: industryLicenseFiles,
      municipality_license_files: municipalityLicenseFiles,
    }
    // if any file status is uploading, return
    if (data.commercial_register_files.some(file => file.status === 'uploading') ||
      data.industry_license_files.some(file => file.status === 'uploading') ||
      data.municipality_license_files.some(file => file.status === 'uploading')) {
        message.error('الرجاء انتظار رفع الملفات');
      return;
    }

    onFinish(data);
  }
  return (
    <Form form={form} layout='vertical' onFinish={handleSubmit} onFinishFailed={onFinishFailed}>
      <Typography.Title level={5}>معلومات الشركة</Typography.Title>
      <Row gutter={24}>
        <Col xs={24} lg={12}>
          <Form.Item name="name" label="اسم الشركة" rules={[{ required: true, message: "" }]}>
            <Input placeholder="أدخل اسم الشركة" autoFocus size='large' />
          </Form.Item>
          <Form.Item name="membership" label="العضوية" rules={[{ required: true, message: "" }]}>
            <Select placeholder="اختر العضوية" allowClear size='large'>
              <Select.Option value="1">هيئة عامة أساسية</Select.Option>
              <Select.Option value="2">مجلس إدارة</Select.Option>
              <Select.Option value="3">عضوية فخرية</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="type" label="النوع" rules={[{ required: true, message: "" }]}>
            <Select placeholder="اختر النوع" allowClear size='large'>
              <Select.Option value="individual">فردية</Select.Option>
              <Select.Option value="normal">عادية</Select.Option>
              <Select.Option value="shareholding">مساهمة</Select.Option>
              <Select.Option value="solidarity">تضامن</Select.Option>
              <Select.Option value="limited">ذات مسؤولية محدودة</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="membership_number" label="رقم العضوية" rules={[{ required: true, message: "" }]}>
            <Input placeholder="أدخل رقم العضوية" size='large' />
          </Form.Item>
          <Form.Item name="company_number" label="رقم الشركة" rules={[{ required: true, message: "" }]}>
            <Input placeholder="أدخل رقم الشركة" size='large' />
          </Form.Item>
          <Form.Item name="authorized_name" label="اسم المفوض" rules={[{ required: true, message: "" }]}>
            <Input placeholder="أدخل اسم المفوض" size='large' />
          </Form.Item>
          <Form.Item name="workers_number" label="عدد العمال" rules={[{ required: true, message: "" }]}>
            <InputNumber placeholder="أدخل عدد العمال" style={{ width: "100%" }} size='large' />
          </Form.Item>
          <Form.Item name="license_number" label="رقم المشغل المرخص" rules={[{ required: true, message: "" }]}>
            <Input placeholder="أدخل رقم المشغل المرخص" size='large' />
          </Form.Item>
          <Form.Item name="brand" label="السمة التجارية" rules={[{ required: true, message: "" }]}>
            <Input placeholder="أدخل السمة التجارية" size='large' />
          </Form.Item>
          <Form.Item name="production_type" label="نوع الإنتاج" rules={[{ required: true, message: "" }]}>
            <Select placeholder="اختر نوع الإنتاج" mode='tags' allowClear size='large'>
              <Select.Option value="الأثاث المنزلي">الأثاث المنزلي</Select.Option>
              <Select.Option value="إثاث مدرسي ومكتبي">إثاث مدرسي ومكتبي</Select.Option>
              <Select.Option value="ديكورات وتصميم">ديكورات وتصميم</Select.Option>
              <Select.Option value="مطابخ">مطابخ</Select.Option>
              <Select.Option value="مكتب هندسي">مكتب هندسي</Select.Option>
              <Select.Option value="مواد خام">مواد خام</Select.Option>
              <Select.Option value="فرشات وإسفنج">فرشات وإسفنج</Select.Option>
              <Select.Option value="ستاير وقماش">ستاير وقماش</Select.Option>
              <Select.Option value="دهانات">دهانات</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item name="address" label="العنوان" rules={[{ required: true, message: "" }]}>
            <Input placeholder="أدخل العنوان" size='large' />
          </Form.Item>
          <Form.Item name="governorate" label="المحافظة" rules={[{ required: true, message: "" }]}>
            <Select placeholder="اختر المحافظة" allowClear size='large'>
              <Select.Option value="north_gaza">شمال غزة</Select.Option>
              <Select.Option value="gaza">غزة</Select.Option>
              <Select.Option value="mid_gaza">الوسطى</Select.Option>
              <Select.Option value="khanyounis">خانيونس</Select.Option>
              <Select.Option value="rafah">رفح</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="phone" label="رقم الجوال" rules={[{ required: true, message: "" }]}>
            <Input placeholder="أدخل رقم الجوال" size='large' />
          </Form.Item>
          <Typography.Title level={5} style={{ margin: "40px 0 10px" }}>الملفات المطلوبة</Typography.Title>
          <Form.Item label="السجل التجاري">
            <FilesUploader fileList={commercialRegisterFiles} setFileList={setCommercialRegisterFiles} />
          </Form.Item>
          <Form.Item label="رخصة الصناعة">
            <FilesUploader fileList={industryLicenseFiles} setFileList={setIndustryLicenseFiles} />
          </Form.Item>
          <Form.Item label="رخصة بلدية">
            <FilesUploader fileList={municipalityLicenseFiles} setFileList={setMunicipalityLicenseFiles} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="status" label="الحالة" initialValue={false} rules={[{ required: true, message: "" }]}>
        <Switch size='default' checkedChildren="نشط" unCheckedChildren="غير نشط" />
      </Form.Item>

      <Form.Item style={{ margin: "50px 0" }}>
        <Button type="primary" htmlType="submit" size='large'>
          إضافة
        </Button>
        <Button htmlType="button" size='large' style={{ margin: '0 8px' }} onClick={() => form.resetFields()}>
          إلغاء
        </Button>
      </Form.Item>
    </Form>
  )
}

export default NewCompanyForm