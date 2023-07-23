import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { BsBuildingFillAdd } from 'react-icons/bs';


const Card = ({ title, desc, icon: Icon, to, color }) => {
  return (
    <Link to={to}>
      <div className="flex flex-col items-center justify-center gap-4 p-4 bg-neutral-100 relative shadow-sm hover:drop-shadow-lg rounded-md">
        <div style={{ backgroundColor: color }} className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
          <Icon style={{ fontSize: 30, color: '#fff' }} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Typography.Title level={5}>{title}</Typography.Title>
          <Typography.Text>{desc}</Typography.Text>
        </div>
      </div>
    </Link>
  )
}
const Dashboard = () => {
  
  return (
    <div>
      <div>
        <Typography.Title level={3}>قائمة الخدمات</Typography.Title>
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <Card
            title="إضافة شركة"
            // desc="إضافة شركة"
            icon={BsBuildingFillAdd}
            to="/new-company"
            color="#8D7B68"
          />
          
        </div>
      </div>
    </div>
  )
}

export default Dashboard