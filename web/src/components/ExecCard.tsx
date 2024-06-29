import { ExecCardProps } from "../types/types";

export default function ExecCard({ exec }: ExecCardProps) {
	return (
		<>
			<div className="w-44 h-60 bg-white rounded-2xl flex flex-col justify-between items-center overflow-hidden">
				<div className="w-full h-40 rounded-2xl overflow-hidden px-2 pt-2">
					<img
						src={exec.image}
						alt="Exec Image"
						className="w-full h-full object-cover rounded-xl"
					/>
				</div>

				<h1 className="font-bold text-xl text-black">{exec.name}</h1>
				<div className="w-full h-10 flex justify-center items-center bg-primary-orange ">
					<p className="font-bold text-xl text-white">{exec.position}</p>
				</div>
			</div>
		</>
	);
}
