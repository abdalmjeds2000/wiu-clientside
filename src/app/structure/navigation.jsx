import { FundProjectionScreenOutlined, PlusCircleOutlined, TableOutlined } from '@ant-design/icons';
import Dashboard from '../admin/pages/Dashboard/Dashboard';
import Login from '../admin/pages/Login';
import NewCompany from '../admin/pages/NewCompany';
import MemberProfile from '../admin/pages/MemberProfile';
import WorkerProfile from '../admin/pages/WorkerProfile';

export const nav = [
  { path: "/dashboard",     name: "Dashboard",    title: 'الصفحة الرئيسية',          icon: <FundProjectionScreenOutlined />,   element: <Dashboard />,             isMenu: true,       isPrivate: true },
  { path: "/login",         name: "Login",        title: 'تسجيل الدخول',                                                        element: <Login />,                  isMenu: false,     isPrivate: false },
  { path: "/new-company",   name: "New Company",  title: 'تسجيل شركة جديدة',         icon: <PlusCircleOutlined />,             element: <NewCompany />,            isMenu: true,       isPrivate: true },
  { path: "/members/:id",   name: "Member Profile",  title: 'معلومات عضو',                  element: <MemberProfile />,            isMenu: false,       isPrivate: true },
  { path: "/workers/:id",   name: "Worker Profile",  title: 'معلومات عامل',                    element: <WorkerProfile />,            isMenu: false,       isPrivate: true },
];