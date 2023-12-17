import React, { ReactNode } from 'react';
import useSidebar from '@/hook/useSidebarWidth';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const sidebarWidth = useSidebar();

  return (
    <div className={`w-full p-6 ${sidebarWidth.Open ? 'ml-16' : ''}`}>
      {children}
    </div>
  );
}

export default Container;