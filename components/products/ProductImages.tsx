import { fallbackIMG } from "@/consts/fallbacks";
import { Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import React, { FC, useState } from "react";


interface ProductImagesProps {
	images?: string[];
	title: string;
}

const ProductImages: FC<ProductImagesProps> = ({ images, title }) => {
	const [featuredImage, setFeaturedImage] = useState(images?.[0] || fallbackIMG.src);

	return (
		<div className="lg:basis-1/2 sm:w-full flex flex-col gap-2">
			<div className="relative w-full overflow-hidden rounded-md max-h-[600px] aspect-square">
				
				<Image
					src={featuredImage}
					alt={title}
					fill
					className="w-full h-full object-cover"
					sizes="100vh, 100vw"
				/>
				
			</div>
			<div className="flex gap-2 overflow-x-auto hide-scrollbar">
				{images &&
					images.length > 1 &&
					images?.map((image, index) => {
						return (
							<Image
								key={index}
								onClick={() => (featuredImage === image ? undefined : setFeaturedImage(image))}
								src={image}
								alt={title}
								className="aspect-square rounded-md cursor-pointer object-cover"
								width={100}
								height={100}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default ProductImages;
