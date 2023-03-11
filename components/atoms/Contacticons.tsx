import { EnvelopeOpenIcon } from '@heroicons/react/24/solid';
import React, { FC } from 'react';
import Github from '../logos/Github';
import LinkedIn from '../logos/LinkedIn';
import ExternalLink from './ExternalLink';

export const logoClasses =
  'w-8 h-8 fill-light-text-primary dark:fill-dark-text-primary hover:fill-neutral-blue dark:hover:fill-neutral-blue cursor-pointer transiton ease-in-out';

const ContactIcons: FC = () => (
  <>
    <ExternalLink href="https://www.linkedin.com/in/daniel-b%C3%ADlek-6177b0249/">
      <LinkedIn className={logoClasses} />
    </ExternalLink>
    <ExternalLink href="https://github.com/dvenomb98">
      <Github className={logoClasses} />
    </ExternalLink>
    <ExternalLink href="mailto:danielbilek98@seznam.cz">
      <EnvelopeOpenIcon className={logoClasses} />
    </ExternalLink>
  </>
);

export default ContactIcons;
