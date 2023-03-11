import classNames from 'classnames';
import React, { FC } from 'react';
import { layoutClasses } from '../layouts/PageLayout';

const Footer: FC = () => {
  return (
    <footer className={classNames(layoutClasses, 'py-10 flex flex-col gap-5')}>
      <h2>Footer</h2>
    </footer>
  );
};

export default Footer;
