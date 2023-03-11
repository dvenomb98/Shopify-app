import React from 'react';
import classNames from 'classnames';
import { BellAlertIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';

export enum AlertVariants {
  WARNING = 'warning',
  INFO = 'info',
  CONFIRMED = 'confirmed',
}

export enum AlertWidth {
  FULL = 'full',
  DEFAULT = 'default',
}

export interface AlertProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  /* Varianta (mění barvu a ikonku) */
  variant?: `${AlertVariants}`;
  classNames?: string;
  width?: `${AlertWidth}`;
}

const iconsVariants = {
  [AlertVariants.WARNING]: ExclamationTriangleIcon,
  [AlertVariants.INFO]: BellAlertIcon,
  [AlertVariants.CONFIRMED]: CheckCircleIcon,
};

const baseClasses = {
  [AlertVariants.WARNING]: 'bg-neutral-redlight text-neutral-red',
  [AlertVariants.INFO]: 'bg-neutral-bluelight2 text-light-text-primary',
  [AlertVariants.CONFIRMED]: 'bg-neutral-greenlight text-neutral-green',
};

const widthClasses = {
  [AlertWidth.FULL]: 'w-full',
  [AlertWidth.DEFAULT]: 'w-48 min-w-fit',
};

const iconClasses = {
  [AlertVariants.WARNING]: 'fill-neutral-red',
  [AlertVariants.INFO]: 'fill-light-text-primary',
  [AlertVariants.CONFIRMED]: 'fill-neutral-green',
};

const Alert: React.FC<AlertProps> = ({
  children,
  className,
  variant = AlertVariants.INFO,
  width = AlertWidth.FULL,
  ...props
}) => {
  const Icon = iconsVariants[variant];

  return (
    <div
      {...props}
      className={classNames(
        'flex items-center gap-3 rounded-sm p-2',
        baseClasses[variant],
        widthClasses[width],
        className,
      )}
    >
      <Icon className={classNames('w-5 h-5 self-center', iconClasses[variant])} />
      {children}
    </div>
  );
};

export default Alert;
