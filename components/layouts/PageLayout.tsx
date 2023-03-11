import classNames from 'classnames';
import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const layoutClasses = 'sm:container mx-auto px-5 lg:px-32 ';

const PageLayout: React.FC<PageLayoutProps> = ({ children, className }) => {
  return (
    <main
      className={classNames(layoutClasses, 'py-16 flex flex-col gap-16 min-h-screen', className)}
    >
      {children}
    </main>
  );
};

export default PageLayout;
