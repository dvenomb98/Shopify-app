import classNames from 'classnames'
import React, { FC } from 'react'
import { layoutClasses } from './PageLayout'

interface ContainerProps {
    children: React.ReactNode
    className?: string
}

const Container: FC<ContainerProps> = ({children, className}) => <div className={classNames(layoutClasses, className)}>{children}</div>

export default Container