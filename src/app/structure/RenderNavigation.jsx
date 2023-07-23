import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { nav } from "./navigation"
import { AuthData } from "../../auth/AuthWrapper"

export const RenderRoutes = () => {
  const { user } = AuthData();
  const isuser = localStorage.getItem('todo-app-token');
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={isuser ? '/dashboard' : '/login'} />} />
        {nav.map((r, i) => {
          if(r.isPrivate && user.isAuthenticated) {
            return <Route key={i} path={r.path} element={r.element} />
          } else if(!r.isPrivate) {
            return <Route key={i} path={r.path} element={r.element} />
          } else {
            return null
          }
        })}
      </Routes>
    </>
  )
}


export const RenderMenu = () => {
  const { user, logout } = AuthData();
  const { pathname } = useLocation();

  const lastPath = pathname.split('/')[pathname.split('/').length-1];
  const activeRoute = nav.filter(r => r.path === `/${lastPath}`)[0];
  return (
    <div className="h-full flex items-center justify-between">
      <div className="flex gap-8 items-center">
        <span className="text-xl font-bold">
          <Link to={user.isAuthenticated ? '/dashboard' : '/login'}>
            WIU
          </Link>
        </span>
        <h1 className="capitalize text-xl block max-md:hidden">{activeRoute?.title || 'الصفحة غير موجودة'}</h1>
      </div>
      <div className="hidden max-md:block">
        <h1 className="capitalize text-xl">{activeRoute?.title || 'الصفحة غير موجودة'}</h1>
      </div>
    </div>
  )
}