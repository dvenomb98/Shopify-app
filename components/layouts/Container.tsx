import classNames from "classnames";
import React, { FC} from "react";
import { layoutClasses } from "./PageLayout";

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
	children: React.ReactNode;
	className?: string;
}

const Container: FC<ContainerProps> = ({ children, className, ...props }) => (
	<div {...props} className={classNames(layoutClasses, className)}>
		{children}
	</div>
);

export default Container;
