import classNames from 'classnames';
import React from 'react';

interface OutsideLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isNonTextable?: boolean;
}

const ExternalLink: React.FC<OutsideLinkProps> = ({ href, children, className, isNonTextable }) => (
  <>
    {!isNonTextable ? (
      <a
        className={classNames('text-neutral-blue hover:underline', className)}
        href={href}
        aria-describedby="new_window"
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    ) : (
      <a href={href} aria-describedby="new_window" target="_blank" rel="noreferrer">
        {children}
      </a>
    )}
  </>
);

export default ExternalLink;
