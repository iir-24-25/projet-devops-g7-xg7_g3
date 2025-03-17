import Image from "next/image";

const UserCard = ({ type, style, imageSrc, alt, width, height, nbretudiant, nbrprof, nbrparent, nbrstaff }: { type: string, style?: React.CSSProperties, imageSrc: string, alt: string, width: number, height: number, nbretudiant?: string, nbrprof?: string, nbrparent?: string, nbrstaff?: string }) => {
  const number = nbretudiant || nbrprof || nbrparent || nbrstaff;

  return (
    <div className="rounded-2xl p-4 flex-1 min-w-[130px]" style={style}>
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="more options" width={20} height={20} />
      </div>
      <div className="flex items-center justify-between my-4">
        <h1 className="text-2xl font-semibold">{number}</h1>
        <Image src={imageSrc} alt={alt} width={width} height={height} className="ml-2" />
      </div>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;