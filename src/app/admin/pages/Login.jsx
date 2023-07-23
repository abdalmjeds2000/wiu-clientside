import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthData } from '../../../auth/AuthWrapper';
import { Button, Form, Input, Typography, message } from 'antd';


const Login = () => {
  const navigate = useNavigate();
  const { login } = AuthData();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const doLogin = async (values) => {
    setLoading(true);
    const response = await login(values.username, values.password);
    if(response.status === 200) {
      navigate('/dashboard');
      return;
    } else {
      setErrorMessage(response.response.data.message);
    }
    setLoading(false);
  }

  return (
    <div className='p-6 flex-1'>
      <div className='max-w-md mx-auto text-center'>
        <div className='mb-12'>
          <Typography.Title level={4} style={{ margin: 0 }}>إتحاد الصناعات الخشبية</Typography.Title>
          <Typography.Text>Wood Industry Union</Typography.Text>
        </div>
        <h1 className='mb-6 text-xl'>تسجيل الدخول</h1>
        <Form name="app-login" layout='vertical' onFinish={doLogin} onFinishFailed={() => message.error('خطأ في الإدخال')}>
          <Form.Item name="username" label="إسم المستخدم" rules={[{ required: true, message: '' }]}>
            <Input placeholder="أكتب إسم المستخدم" size='large' />
          </Form.Item>
          <Form.Item name="password" label="كلمة السر" rules={[{ required: true, message: '' }]}>
            <Input.Password placeholder="أكتب كلمة السر" size='large' />
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={loading} htmlType="submit" size='large' className="w-full">
              تسجيل دخول
            </Button>
          </Form.Item>
        </Form>
        {errorMessage ? <div className='text-sm text-red-600 bg-red-100 border border-red-600 rounded-md p-1.5 w-full'>{errorMessage}</div> : null}
      </div>
    </div>
  )
}

export default Login