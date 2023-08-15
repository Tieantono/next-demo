import React, { ReactElement } from 'react';

const CustomLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className='container mx-auto bg-gray-100'>
        <div className='p-6'>
            {children}
        </div>
    </div>
}

export default CustomLayout;