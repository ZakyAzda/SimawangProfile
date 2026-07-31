import Image from "next/image";

interface Props {
  nama: string;
  foto?: string;
  slug: string;
  size?: "card" | "detail";
}

export function KepalaAvatar({ nama, foto, size = "card" }: Props) {
  const isDetail = size === "detail";
  const sizeClass = isDetail ? "h-[280px] w-full" : "h-12 w-12";
  const radiusClass = isDetail ? "rounded-[24px]" : "rounded-full";

  return (
    <div
      className={`relative overflow-hidden bg-zinc-100 flex items-center justify-center ${sizeClass} ${radiusClass}`}
    >
      {foto ? (
        <Image
          src={foto}
          alt={`Foto ${nama}`}
          fill
          className="object-cover"
        />
      ) : (
        <span
          className="material-symbols-outlined text-zinc-300"
          style={{ fontSize: isDetail ? 80 : 24 }}
        >
          person
        </span>
      )}
    </div>
  );
}
