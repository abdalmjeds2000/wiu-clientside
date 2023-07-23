import { Button, ConfigProvider, theme } from 'antd';
import './App.css';
import { AuthWrapper } from './auth/AuthWrapper';
import { BrowserRouter } from 'react-router-dom';
import { StyleProvider } from '@ant-design/cssinjs';
import 'antd/dist/reset.css';
import { useState } from 'react';
import { MdOutlineColorLens } from 'react-icons/md';
const colors = [
  '#F31559',
  '#35A29F',
  '#0079FF',
  '#6528F7',
  '#FF8551',
  '#FFC26F',
]; 
const App = () => {
  const [appColor, setAppColor] = useState(colors[2]);

  return (
    <ConfigProvider
      theme={{
          token: {
            colorPrimary: appColor,
            fontFamily: 'Alexandria, sans-serif',
            borderRadius: '4px',
          },
      }}
  >
    <StyleProvider hashPriority="high">
      <BrowserRouter>
        <div className='app-container bg-gray-100'>
          <AuthWrapper />
        </div>
        {/* <AppColorPicker setAppColor={setAppColor} /> */}
      </BrowserRouter>
    </StyleProvider>
  </ConfigProvider>
  )
}

export default App



const AppColorPicker = ({ setAppColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  // beuaty colors
  

  return (
    <div className='fixed bottom-4 left-4'>
      <div className='relative'>

        <div className='bg-white shadow-xl w-10 hover:bg-gray-50 relative hover:drop-shadow-xl rounded-full flex flex-col items-center justify-end'>
          {
            isOpen ? (
              <div className='flex flex-col gap-1 items-center mt-4 mb-2'>
                {colors?.map((color, i) => (
                  <button key={i} type='button' onClick={() => setAppColor(color)} style={{ backgroundColor: color }} className="w-6 h-6 rounded-full hover:opacity-75" />
                ))}
              </div>
            ) : null
          }
          <button type='button' className='rounded-full' onClick={() => setIsOpen(!isOpen)}>
            <MdOutlineColorLens size={26} className='m-2' />
          </button>
        </div>
      </div>
    </div>
  )
}