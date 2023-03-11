import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';
import { UrlObject } from 'url';

interface InternalLinkProps {
  href: string | UrlObject;
  className?: string;
  children: React.ReactNode;
  removeClassNames?: boolean;
}

const InternalLink: React.FC<InternalLinkProps> = ({
  href,
  children,
  className,
  removeClassNames,
}) => (
  <Link
    href={href}
    className={classNames(removeClassNames ? '' : 'text-primary-blue hover:underline', className)}
  >
    {children}
  </Link>
);

export default InternalLink;
