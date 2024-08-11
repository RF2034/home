import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
}) => {
  const imageLoader = ({ src, width }: { src: string; width: number }) => {
    return `${src}?auto=format,compress&w=${width}&q=80`;
  };

  return (
    <Image
      loader={imageLoader}
      src={src}
      alt={alt}
      className={className}
      layout="responsive"
      width={100}
      height={100}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

export default OptimizedImage;
