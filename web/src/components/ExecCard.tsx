import { ExecCardProps } from "../types/types";

export default function ExecCard({ exec }: ExecCardProps) {
	return (
		<>
			<div className="relative w-44 h-60 bg-white rounded-2xl flex flex-col justify-between items-center cursor-pointer overflow-hidden shadow-lg transition-transform transform hover:scale-105">
				<div className="w-full h-40 rounded-2xl overflow-hidden px-2 pt-2">
					<img src={exec.image} alt="Exec Image" className="w-full h-full object-cover rounded-xl" />
				</div>

				<h1 className="font-bold text-xl text-black">{exec.name}</h1>
				<div className="w-full h-10 flex justify-center items-center bg-primary-orange ">
					<p className="font-bold text-xl text-white">{exec.position}</p>
				</div>
				{/* Description Overlay */}
				<div className="absolute inset-0 bg-white bg-opacity-95 opacity-0 transition-opacity duration-300 hover:opacity-100 flex items-center justify-center p-4">
					<p className="text-black text-center">{exec.description}</p>
				</div>
			</div>
		</>
	);
}
