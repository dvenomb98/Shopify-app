import React, { FC } from 'react';

export interface SvgProps {
  props?: React.SVGProps<SVGSVGElement>;
  className?: string;
}

const Facebook: FC<SvgProps> = ({ props, className }) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M14.14 22.184V12.52h3.242l.487-3.766H14.14V6.35c0-1.09.302-1.833 1.867-1.833H18v-3.37A27.021 27.021 0 0 0 15.095 1c-2.875 0-4.843 1.755-4.843 4.977v2.778H7v3.766h3.252v9.663h3.888Z" />
  </svg>
);

export default Facebook;
