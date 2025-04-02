import Image from "next/image";

const UserCard = ({ type, style, imageSrc, alt, width, height, nbretudiant, nbrprof, nbrparent, nbrstaff }: { type: string, style?: React.CSSProperties, imageSrc: string, alt: string, width: number, height: number, nbretudiant?: string, nbrprof?: string, nbrparent?: string, nbrstaff?: string }) => {
  const number = nbretudiant || nbrprof || nbrparent || nbrstaff;

  return (
    <div
      className="flex items-center justify-between p-4 rounded-xl shadow-sm"
      style={style}
    >
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{type}</span>
        <span className="text-2xl font-semibold">
          {type === "student" && nbretudiant}
          {type === "teacher" && nbrprof}
          {type === "parent" && nbrparent}
          {type === "staff" && nbrstaff}
        </span>
      </div>
      <div className="w-16 h-16 flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default UserCard;