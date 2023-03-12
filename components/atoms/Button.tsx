import React from 'react';
import classNames from 'classnames';
import Loader from './Loader';

export enum ButtonVariants {
  PRIMARY = 'primary',
  TRANSPARENT = 'transparent',
  CUSTOM = 'custom',
}

export enum ButtonSizes {
  SMALL = 'small',
  BIG = 'big',
}

export enum ButtonWidth {
  FULL = 'full',
  DEFAULT = 'default',
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: `${ButtonVariants}`;
  size?: `${ButtonSizes}`;
  width?: `${ButtonWidth}`;
  loading?: boolean;
}

const baseClasses = {
  [ButtonVariants.PRIMARY]:
    'bg-primary-amber text-primary-black border-none hover:bg-primary-black focus:ring-neutral-yellow hover:text-primary-white',
  [ButtonVariants.TRANSPARENT]:
    'bg-transparent text-neutral-amber hover:text-primary-black border-2 border-primary-amber hover:border-primary-amber focus:ring-neutral-yellow',
  [ButtonVariants.CUSTOM]: '',
};

const heightClasses = {
  [ButtonSizes.SMALL]: 'h-8',
  [ButtonSizes.BIG]: 'h-12',
};

const widthClasses = {
  [ButtonWidth.FULL]: 'w-full',
  [ButtonWidth.DEFAULT]: 'w-48 min-w-fit',
};

const getClasses = (
  variant: `${ButtonVariants}`,
  disabled: boolean,
  size: `${ButtonSizes}`,
  className: string,
  width: `${ButtonWidth}`,
) =>
  classNames(
    'px-5 rounded-sm focus:outline-none focus:ring hover:shadow-md transition ease-in-out',
    baseClasses[variant],
    heightClasses[size],
    widthClasses[width],
    disabled && 'cursor-default pointer-events-none opacity-80',
    className,
  );

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = ButtonVariants.PRIMARY,
  size = ButtonSizes.BIG,
  type = 'button',
  width = ButtonWidth.DEFAULT,
  disabled = false,
  loading,
  onClick,
  ...props
}) => (
  <button
    className={getClasses(variant, disabled, size, className, width)}
    // eslint-disable-next-line react/button-has-type
    type={type}
    disabled={disabled}
    onClick={onClick}
    {...props}
  >
    {loading ? <Loader /> : children}
  </button>
);
