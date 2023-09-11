import React from 'react'
import { BorderlessTableOutlined, CalendarOutlined, EnvironmentOutlined, FileTextOutlined, IdcardOutlined, InstagramOutlined, PhoneFilled, UserOutlined } from '@ant-design/icons'
import { Alert, Avatar, Tooltip, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { AuthData } from '../../../auth/AuthWrapper';

const MemberProfile = ({ member }) => {

  return (
    <div className='pt-20'>
      
      <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
        <div className="flex justify-center">
          <Avatar 
            icon={<UserOutlined className='text-7xl my-auto' />} 
            className="mx-auto absolute -top-20 transition duration-200 transform hover:scale-110" 
            style={{ display: "flex", justifyContent: "center", backgroundColor: '#fde3cf', color: '#f56a00', width: "8rem", height: "8rem" }}
          />
        </div>
        
        <div>
            <h1 className="font-bold text-center text-3xl text-gray-900">{member.full_name}</h1>
            <p className="text-center text-sm text-gray-400 font-medium"><Tooltip title="معرّف الشركة" placement="bottom">{member.company_id}</Tooltip> {member.is_responsible_member && "(عضو مفوّض)"}</p>
            
            <div className="my-5 px-6">
              <a href={`tel:${member.phone_number}`} className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-third">
                <PhoneFilled className="text-lg" /> <span className="font-bold">{member.phone_number}</span>
              </a>
            </div>

            <div className="w-full">
              <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                  <span href="#" className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-third transition duration-150">
                    <span className="rounded-full bg-secondary text-white w-8 h-8 leading-none p-1.5 ml-2 text-xl"><IdcardOutlined /></span>
                          <span>رقم الهوية: </span>
                          <span className="font-semibold">{member.id_number}</span>
                  </span>
                  <span href="#" className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-third transition duration-150">
                    <span className="rounded-full bg-secondary text-white w-8 h-8 leading-none p-1.5 ml-2 text-xl"><CalendarOutlined /></span>
                          <span>تاريخ الميلاد: </span>
                          <span className="font-semibold">{member.dob ? moment(member.dob).format('DD/MM/YYYY') : ''}</span>
                  </span>
                  <span href="#" className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-third transition duration-150">
                    <span className="rounded-full bg-secondary text-white w-8 h-8 leading-none p-1.5 ml-2 text-xl"><EnvironmentOutlined /></span>
                          <span>العنوان: </span>
                          <span className="font-semibold">{member.address}</span>
                  </span>
                  <span href="#" className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-third transition duration-150">
                    <span className="rounded-full bg-secondary text-white w-8 h-8 leading-none p-1.5 ml-2 text-xl"><BorderlessTableOutlined /></span>
                          <span>رقم المشغل المرخص: </span>
                          <span className="font-semibold">{member.licensed_operator_number}</span>
                  </span>
                  <span href="#" className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-third transition duration-150">
                    <span className="rounded-full bg-secondary text-white w-8 h-8 leading-none p-1.5 ml-2 text-xl"><FileTextOutlined /></span>
                          <span>المرفقات: </span>
                          <span className="font-semibold">
                            <div className='flex flex-col gap-2 items-center mt-4'>
                              {member.attachments?.map((file, i) => (
                                <a key={i} href={file.url} target="_blank" rel="noreferrer" className='flex gap-1 items-center'>
                                  <span>{file.name}</span>
                                  <span className='w-[24px]'>
                                    <FileIcon extension={file.name.split('.')[file.name.split('.')?.length-1]} {...defaultStyles[file.name.split('.')[file.name.split('.').length-1]]} />
                                  </span>
                                </a>
                              ))}
                            </div>
                            {member.attachments?.length === 0 ? <Typography.Text type='secondary' className='block text-center'>لا يوجد مرفقات</Typography.Text> : null}
                          </span>
                  </span>
              </div>
            </div>
        </div>
    </div>

    </div>
  )
}



const Index = () => {
  const { apiUrl } = AuthData();
  const { id } = useParams();
  const [stat, setStat] = React.useState({ member: {}, loading: true, error: false });
  const getMember = async () => {
    try {
      const { data } = await axios(`${apiUrl}/GetMember?member_id=${id}`);
      setStat({ member: data.member, loading: false });
    } catch (error) {
      setStat({ member: {}, loading: false, error: true });
    }
  }

  React.useEffect(() => { getMember() }, []);


  if(stat.loading) return <div>loading...</div>
  if(stat.error) return <Alert message="Error" description="Error while loading member data" type="error" showIcon />;
  return <MemberProfile member={stat.member} />
}


export default Index