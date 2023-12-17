import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {

  return (
    <div className={`w-full p-6 ml-16`}>
      {children}
    </div>
  );
}

export default Container;