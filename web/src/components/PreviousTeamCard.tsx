import type { PreviousTeamCardProps } from "../types/types";

export default function PreviousTeamCard({ year, teams }: PreviousTeamCardProps) {
	return (
		<div
			key={year}
			className="my-3 py-2 px-3 md:px-20 w-auto h-auto rounded-3xl relative bg-gradient-to-b from-AUIS-dark-teal to-AUIS-teal"
		>
			<h2 className="text-4xl md:text-5xl font-bold text-tertiary-blue mb-3 absolute left-5 md:left-10 top-2 md:top-5">
				{year}
			</h2>
			{teams.Presidents.length > 0 && (
				<div className="flex flex-col items-center">
					<h3 className="text-2xl font-bold text-tertiary-blue">Presidents</h3>
					<div className="flex flex-wrap justify-center mb-5 px-5">
						{teams.Presidents.map((team) => (
							<p key={team.id} className="mx-3 my-1 text-lg font-bold text-white">
								{team.name}
							</p>
						))}
					</div>
				</div>
			)}
			{teams.Executives.length > 0 && (
				<div className="flex flex-col items-center px-0">
					<h3 className="text-2xl font-bold text-tertiary-blue">Executives</h3>
					<div className="w-full grid grid-cols-3 px-2 mx-40 justify-items-center">
						{teams.Executives.map((team) => (
							<p key={team.id} className="mx-3 my-1 text-lg font-bold text-white">
								{team.name}
							</p>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
