import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { FC } from "react";
import InternalLink from "./InternalLink";

const ViewAllProducts: FC = () => {
	return (
		<InternalLink href="/produkty" className="hover:underline" removeClassNames>
			<span className="flex items-center gap-1">
				Zobrazit všechny <ArrowRightIcon className="w-4 h-4" />
			</span>
		</InternalLink>
	);
};

export default ViewAllProducts;
