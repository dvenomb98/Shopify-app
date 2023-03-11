import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';
import { UrlObject } from 'url';

interface NavLinkProps {
  href: string | UrlObject;
  title?: string;
  className?: string
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  title,
  className,
}) => (
  <Link
    href={href}
    className={classNames('hover:opacity-70 transition ease-in-out font-medium', className)}
  >
    <li>{title}</li>
  </Link>
);

export default NavLink;