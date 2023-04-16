import { InstagramPhoto } from "@/types/types";
import Link from "next/link";
import React, { FC } from "react";
import ProductsLayout from "../layouts/CardLayouts";
import Instagram from "../logos/Instagram";
import IGPhoto from "./IGPhoto";

interface PhotosWrapperProps {
	photos: InstagramPhoto[];
}

const PhotosWrapper: FC<PhotosWrapperProps> = ({ photos }) => {
	if (!photos.length) return null;

	return (
		<div className="flex flex-col gap-10">
			<Link href="/" target="_blank" className="flex items-center gap-5">
				<h2 className="text-h2">Sledujte nás na instagramu</h2>
				<Instagram className="w-8 h-8 fill-primary-pink" />
			</Link>
			<ProductsLayout >
				{photos.map((photo) => (
					<IGPhoto key={photo.id} photo={photo} />
				))}
			</ProductsLayout>
		</div>
	);
};

export default PhotosWrapper;
