import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Steps, Switch, Typography, message } from 'antd'
import React from 'react'
import FilesUploader from '../../../components/FilesUploader';
import FilesUploaderV2 from '../../../components/FilesUploaderV2';
import { PlusOutlined } from '@ant-design/icons';



const NewCompanyForm = ({ onFinish, onFinishFailed }) => {
  const [form] = Form.useForm();
  const [commercialRegisterFiles, setCommercialRegisterFiles] = React.useState([]);
  const [industryLicenseFiles, setIndustryLicenseFiles] = React.useState([]);
  const [municipalityLicenseFiles, setMunicipalityLicenseFiles] = React.useState([]);
  const [current, setCurrent] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  
  const handleSubmit = async (values) => {
    setLoading(true);
    const data = {
      ...values,
      cr_files: commercialRegisterFiles,
      il_files: industryLicenseFiles,
      ml_files: municipalityLicenseFiles,
    }
    // if any file status is uploading, return
    if (data.cr_files.some(file => file.status === 'uploading') ||
      data.il_files.some(file => file.status === 'uploading') ||
      data.ml_files.some(file => file.status === 'uploading')) 
    {
      message.error('الرجاء انتظار رفع الملفات');
      return;
    }

    try {
      await onFinish(data);
      form.resetFields();
      setCommercialRegisterFiles([]);
      setIndustryLicenseFiles([]);
      setMunicipalityLicenseFiles([]);
      message.success('تم إضافة الشركة بنجاح');
      setCurrent(0);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  const steps = [
    {
      title: 'معلومات الشركة',
      content: (
        <React.Fragment>
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
                  <Select.Option value="فردية">فردية</Select.Option>
                  <Select.Option value="عادية">عادية</Select.Option>
                  <Select.Option value="مساهمة">مساهمة</Select.Option>
                  <Select.Option value="تضامن">تضامن</Select.Option>
                  <Select.Option value="ذات مسؤولية محدودة">ذات مسؤولية محدودة</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="membership_number" label="رقم العضوية" rules={[{ required: true, message: "" }]}>
                <Input placeholder="أدخل رقم العضوية" size='large' />
              </Form.Item>
              {/* <Form.Item name="authorized_name" label="اسم المفوض" rules={[{ required: true, message: "" }]}>
                <Input placeholder="أدخل اسم المفوض" size='large' />
              </Form.Item> */}
              {/* <Form.Item name="workers_number" label="عدد العمال" rules={[{ required: true, message: "" }]}>
                <InputNumber placeholder="أدخل عدد العمال" style={{ width: "100%" }} size='large' />
              </Form.Item> */}
              <Form.Item name="address" label="العنوان" rules={[{ required: true, message: "" }]}>
                <Input placeholder="أدخل العنوان" size='large' />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item name="governorate" label="المحافظة" rules={[{ required: true, message: "" }]}>
                <Select placeholder="اختر المحافظة" allowClear size='large'>
                  <Select.Option value="north_gaza">شمال غزة</Select.Option>
                  <Select.Option value="gaza">غزة</Select.Option>
                  <Select.Option value="ramallah">رام الله</Select.Option>
                  <Select.Option value="mid_gaza">الوسطى</Select.Option>
                  <Select.Option value="khanyounis">خانيونس</Select.Option>
                  <Select.Option value="rafah">رفح</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="phone" label="رقم الجوال" rules={[{ required: true, message: "" }]}>
                <Input placeholder="أدخل رقم الجوال" size='large' />
              </Form.Item>
              <Form.Item name="license_number" label="رقم المشغل المرخص" rules={[{ required: true, message: "" }]}>
                <Input placeholder="أدخل رقم المشغل المرخص" size='large' />
              </Form.Item>
              <Form.Item name="brand" label="السمة التجارية">
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
            <Col span={24}>
              <Typography.Title level={5} style={{ margin: "40px 0 10px" }}>الملفات المطلوبة</Typography.Title>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
                <Form.Item label="السجل التجاري">
                  <FilesUploader fileList={commercialRegisterFiles} setFileList={setCommercialRegisterFiles} />
                </Form.Item>
                <Form.Item label="رخصة الصناعة">
                  <FilesUploader fileList={industryLicenseFiles} setFileList={setIndustryLicenseFiles} />
                </Form.Item>
                <Form.Item label="رخصة بلدية">
                  <FilesUploader fileList={municipalityLicenseFiles} setFileList={setMunicipalityLicenseFiles} />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Form.Item name="status" label="الحالة" initialValue={true} rules={[{ required: true, message: "" }]}>
            <Switch size='default' checkedChildren="نشط" unCheckedChildren="غير نشط" defaultChecked />
          </Form.Item>
        </React.Fragment>
      ),
    },
    {
      title: 'معلومات الأعضاء',
      content: (
        <React.Fragment>
          <Form.List name="members">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key} className='bg-white mb-8 rounded-md border border-gray-300 p-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 relative'>
                    <Form.Item name={[field.name, "full_name"]} label="الإسم بالكامل" rules={[{ required: true, message: "" }]} className='m-b-0'>
                      <Input placeholder="أكتب الاسم الكامل للعضو" />
                    </Form.Item>
                    <Form.Item name={[field.name, "id_number"]} label="رقم الهوية" rules={[{ required: true, message: "" }]} className='m-b-0'>
                      <Input placeholder="أكتب رقم الهوية" />
                    </Form.Item>
                    <Form.Item name={[field.name, "dob"]} label="تاريخ الميلاد" rules={[{ required: true, message: "" }]} className='m-b-0'>
                      <DatePicker placeholder="أدخل تاريخ الميلاد" className="w-full" />
                    </Form.Item>
                    <Form.Item name={[field.name, "address"]} label="العنوان" rules={[{ required: true, message: "" }]} className='m-b-0'>
                      <Input placeholder="أدخل العنوان" />
                    </Form.Item>
                    <Form.Item name={[field.name, "phone_number"]} label="رقم الهاتف/الموبايل" rules={[{ required: true, message: "" }]} className='m-b-0'>
                      <Input placeholder="رقم الهاتف/الموبايل" />
                    </Form.Item>
                    <Form.Item name={[field.name, "licensed_operator_number"]} label="رقم المشغل المرخص" rules={[{ required: true, message: "" }]} className='m-b-0'>
                      <Input placeholder="رقم المشغل المرخص" />
                    </Form.Item>
                    <Form.Item name={[field.name, "is_responsible_member"]} label="عضو مفوض؟" initialValue={false} rules={[{ required: true, message: "" }]}>
                      <Switch size='default' checkedChildren="نعم" unCheckedChildren="لا" />
                    </Form.Item>

                    <span></span>
                    <span></span>
                    <Form.Item name={[field.name, "attachments"]} hidden>
                    </Form.Item>
                    <Form.Item>
                      <FilesUploaderV2
                        getFilesList={(files) => {
                          form.setFieldsValue({
                            members: form.getFieldValue('members').map((member, i) => {
                              if (i === index) {
                                return {
                                  ...member,
                                  attachments: files
                                }
                              }
                              return member
                            })
                          })
                        }}
                      />
                    </Form.Item>
                    <Button type="primary" danger onClick={() => remove(field.name)} className='w-fit left-6 -bottom-5' style={{position:"absolute"}}>
                      حذف
                    </Button>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  عضو جديد
                </Button>
              </>
            )}
          </Form.List>
          
          
          
        </React.Fragment>
      ),
    },
    {
      title: 'معلومات العمّال',
      content: (
        <React.Fragment>
          <Form.List name="workers">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key} className='bg-white mb-8 rounded-md border border-gray-300 p-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 relative'>
                    <Form.Item name={[field.name, "full_name"]} label="الإسم بالكامل" rules={[{ required: true, message: "" }]} className='m-b-0'>
                      <Input placeholder="أكتب الاسم الكامل للعضو" />
                    </Form.Item>
                    <Form.Item name={[field.name, "id_number"]} label="رقم الهوية" rules={[{ required: true, message: "" }]} className='m-b-0'>
                      <Input placeholder="أكتب رقم الهوية" />
                    </Form.Item>
                    <Form.Item name={[field.name, "phone_number"]} label="رقم الهاتف/الموبايل" rules={[{ required: true, message: "" }]} className='m-b-0'>
                      <Input placeholder="رقم الهاتف/الموبايل" />
                    </Form.Item>
                    <Form.Item name={[field.name, "social_status"]} label="الحالة الاجتماعية" rules={[{ required: true, message: "" }]} className='m-b-0'>
                      <Select placeholder="أختر الحالة الاجتماعية" className="w-full">
                        <Option value="أعزب">أعزب</Option>
                        <Option value="متزوج">متزوج</Option>
                        <Option value="مطلق">مطلق</Option>
                        <Option value="أرمل">أرمل</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name={[field.name, "job_title"]} label="المسمى الوظيفي" rules={[{ required: true, message: "" }]} className='m-b-0'>
                      <Input placeholder="أدخل المسمى الوظيفي" />
                    </Form.Item>
                    <Form.Item name={[field.name, "has_certificate"]} label="هل يمتلك شهادة مهنية او اكاديمية؟؟" rules={[{ required: true, message: "" }]} className='m-b-0'>
                      <Select placeholder="نعم/لا" className="w-full">
                        <Option value="yes">نعم</Option>
                        <Option value="no">لا</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name={[field.name, "address"]} label="العنوان" rules={[{ required: true, message: "" }]} className='m-b-0'>
                      <Input placeholder="أدخل العنوان" />
                    </Form.Item>
                    <Form.Item name={[field.name, "gender"]} label="الجنس" rules={[{ required: true, message: "" }]} className='m-b-0'>
                      <Select placeholder="أختر الجنس" className="w-full">
                        <Option value="male">ذكر</Option>
                        <Option value="female">أنثى</Option>
                      </Select>
                    </Form.Item>
                    <br />
                    <Form.Item name={[field.name, "attachments"]} hidden>
                    </Form.Item>
                    <Form.Item>
                      <FilesUploaderV2
                        getFilesList={(files) => {
                          form.setFieldsValue({
                            workers: form.getFieldValue('workers').map((member, i) => {
                              if (i === index) {
                                return {
                                  ...member,
                                  attachments: files
                                }
                              }
                              return member
                            })
                          })
                        }}
                      />
                    </Form.Item>
                    <Button type="primary" danger onClick={() => remove(field.name)} className='w-fit left-6 -bottom-5' style={{position:"absolute"}}>
                      حذف
                    </Button>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  عامل جديد
                </Button>
              </>
            )}
          </Form.List>
          
          
          
        </React.Fragment>
      ),
    },
  ];
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  
  return (
    <Form form={form} disabled={loading} onFinish={handleSubmit} layout="vertical" size='large' onFinishFailed={onFinishFailed} onValuesChange={(_, vs) => console.log(vs)}>
      <Steps current={current} items={items} onChange={setCurrent} style={{marginBottom: 25}} />
      <div>
        {
          steps.map((item, index) => (
            <div key={index} style={{ display: index === current ? 'block' : 'none' }}>
              {item.content}
            </div>
          ))
        }
      </div>
      <div className='flex gap-1 items-center justify-end mt-12'>
        {current > 0 && <Button onClick={() => prev()}>السابق</Button>}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            التالي
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" htmlType="submit" loading={loading}>
            إنهاء وحفظ
          </Button>
        )}
      </div>
    </Form>
  )
}

export default NewCompanyForm