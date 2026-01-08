import Image from "next/image";

interface ContactHeroHeaderProps {
  title: string;
  imageSrc: string;
  alt: string;
}

export default function ContactHeroHeader({
  title,
  imageSrc,
  alt,
}: ContactHeroHeaderProps) {
  return (
    <div className="w-full lg:min-h-[400px] h-[150px] rounded-3xl flex items-center justify-center relative overflow-hidden">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover absolute inset-0"
        priority
      />
      <h1 className="text-white text-3xl md:text-5xl font-bold z-10 tracking-tight">
        {title}
      </h1>
    </div>
  );
}
