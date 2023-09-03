import { FundProjectionScreenOutlined, PlusCircleOutlined, TableOutlined } from '@ant-design/icons';
import Dashboard from '../admin/pages/Dashboard/Dashboard';
import Login from '../admin/pages/Login';
import NewCompany from '../admin/pages/NewCompany';

export const nav = [
  { path: "/dashboard",     name: "Dashboard",    title: 'الصفحة الرئيسية',          icon: <FundProjectionScreenOutlined />,   element: <Dashboard />,             isMenu: true,       isPrivate: true },
  { path: "/login",         name: "Login",        title: 'تسجيل الدخول',                                                      element: <Login />,                  isMenu: false,     isPrivate: false },
  { path: "/new-company",   name: "New Company",  title: 'تسجيل شركة جديدة',         icon: <PlusCircleOutlined />,             element: <NewCompany />,            isMenu: true,       isPrivate: false },
];