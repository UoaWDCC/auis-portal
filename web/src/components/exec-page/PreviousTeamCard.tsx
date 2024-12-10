import { PreviousTeam } from "../../types/types";

interface PreviousTeamCardProps {
  year: string;
  teams: {
    presidents: PreviousTeam[];
    executives: PreviousTeam[];
  };
}

export default function PreviousTeamCard({
  year,
  teams,
}: PreviousTeamCardProps) {
  return (
    <div
      key={year}
      className="from-AUIS-dark-teal to-AUIS-teal relative my-3 h-auto w-auto rounded-3xl bg-gradient-to-b px-3 py-2 md:px-20"
    >
      <h2 className="text-tertiary-blue absolute left-5 top-2 mb-3 text-4xl font-bold md:left-10 md:top-5 md:text-5xl">
        {year}
      </h2>
      {teams.presidents.length > 0 && (
        <div className="flex flex-col items-center">
          <h3 className="text-tertiary-blue text-2xl font-bold">Presidents</h3>
          <div className="mb-5 flex flex-wrap justify-center px-5">
            {teams.presidents.map((team) => (
              <p
                key={team.id}
                className="mx-3 my-1 text-lg font-bold text-white"
              >
                {team.name}
              </p>
            ))}
          </div>
        </div>
      )}
      {teams.executives.length > 0 && (
        <div className="flex flex-col items-center px-0">
          <h3 className="text-tertiary-blue text-2xl font-bold">Executives</h3>
          <div className="mx-40 grid w-full grid-cols-3 justify-items-center px-2">
            {teams.executives.map((team) => (
              <p
                key={team.id}
                className="mx-3 my-1 text-lg font-bold text-white"
              >
                {team.name}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
