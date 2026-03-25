import type { ImgHTMLAttributes } from "react";

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
	priority?: boolean;
};

function OptimizedImage({
	loading,
	decoding,
	fetchPriority,
	priority = false,
	...props
}: OptimizedImageProps) {
	return (
		<img
			{...props}
			loading={loading ?? (priority ? "eager" : "lazy")}
			decoding={decoding ?? "async"}
			fetchPriority={fetchPriority ?? (priority ? "high" : "auto")}
		/>
	);
}

export default OptimizedImage;
