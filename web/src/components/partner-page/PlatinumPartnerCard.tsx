export interface PartnerCardProps {
    colour: string;
    image: string;
    name: string;
    link: string;
    description: string;
}

export default function PlatinumPartnerCard({
    image,
    name,
    link,
    description,
    colour,
}: PartnerCardProps) {
    // Function to convert hex to RGBA
    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const bgColorWithOpacity = hexToRgba(colour, 0.15);

    // Function to handle the button click
    const handleClick = () => {
        window.open(link, "_blank");
    };

    return (
        <>
            <div className="flex h-full w-80 flex-col items-center relative">
                {/* Platinum Badge */}
                <div className="absolute -top-3 z-10 rounded-full bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 px-4 py-1 text-sm font-bold text-white shadow-lg">
                    ✦ PLATINUM ✦
                </div>

                <div
                    className="group relative flex h-full w-80 flex-col items-center justify-center overflow-hidden rounded-3xl border-4 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl"
                    style={{
                        borderColor: colour,
                        backgroundColor: bgColorWithOpacity,
                        boxShadow: `0 0 20px ${colour}40`
                    }}
                >
                    <div
                        className="flex h-auto w-full items-center justify-center"
                        title={name}
                    >
                        <img src={image} alt={name} className="w-80 rounded-2xl" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/85 to-white/95 p-5 text-center text-lg text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="font-medium">{description}</p>
                    </div>
                </div>

                <h1 className="mt-4 text-center text-2xl font-bold text-black">
                    {name}
                </h1>

                <button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 m-3 rounded-full px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
                    onClick={handleClick}
                >
                    View Sponsor
                </button>
            </div>
        </>
    );
}