import classNames from 'classnames';
import React from 'react';

interface PageHeaderProps {
  header: string;
  description?: string;
  headerClasses?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ header, description, headerClasses }) => {
  return (
    <div className="borderDefaultColor border-b pb-4">
      <h1 className={classNames('font-bold text-header leading-tight sm:text-h1', headerClasses)}>
        {header}
      </h1>
      {!!description && <p className="text-secondary pt-2">{description} </p>}
    </div>
  );
};

export default PageHeader;
