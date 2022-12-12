import React from 'react'
const Layout = ({children}) => {
  return (
    <div class='container'>
        <div className='header'>
            {/**Header */}Header
        </div>
        
        <div class='children'>
          { children }
        </div>

    </div>
  )
}
export default Layout