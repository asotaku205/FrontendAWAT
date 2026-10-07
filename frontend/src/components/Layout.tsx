import Navbar from './Navbar'
import { Outlet } from 'react-router'
import Topbar from './Topbar'

const Layout = () => {;
  return (
    <div className="min-h-screen flex">
      <Navbar />
      <main className="min-w-0 flex-1">
        <Topbar />
        <div className="p-4 bg-gray-100 min-h-screen">
          <Outlet />
        </div>
        
      </main>
    </div>
  )
}

export default Layout