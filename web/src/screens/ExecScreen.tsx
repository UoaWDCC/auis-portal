import type { Exec, PreviousTeam } from "../types/types";
import { useQuery } from "@apollo/client";
import { GET_EXECS, GET_PREVIOUS_TEAMS } from "../graphql/queries";
import LoadingSpinner from "../components/navigation/LoadingSpinner";
import { Mapper } from "../utils/Mapper";
import ExecCard from "../components/exec-page/ExecCard";
import PreviousTeamCard from "../components/exec-page/PreviousTeamCard";
import { useState, useEffect } from "react";

export default function ExecScreen({ navbar }: { navbar: JSX.Element }) {
  // Queries
  const {
    loading: execsLoading,
    data: execsData,
    error: execsError,
  } = useQuery(GET_EXECS);

  const {
    loading: prevTeamLoading,
    data: prevTeamData,
    error: prevTeamError,
  } = useQuery(GET_PREVIOUS_TEAMS);

  // States
  const [executives, setExecutives] = useState<Exec[]>([]);
  const [loadingExecutives, setLoadingExecutives] = useState(true);
  const [errorExecutives, setErrorExecutives] = useState(false);

  const [previousTeams, setPreviousTeams] = useState<PreviousTeam[]>([]);
  const [loadingPreviousTeams, setLoadingPreviousTeams] = useState(true);
  const [errorPreviousTeams, setErrorPreviousTeams] = useState(false);

  // useEffect
  useEffect(() => {
    if (!execsLoading) {
      setLoadingExecutives(false);
    }
    if (execsError) {
      setErrorExecutives(true);
    }
    if (execsData) {
      try {
        const mappedExecs = Mapper.mapToExec(execsData);
        setExecutives(mappedExecs);
      } catch (error) {
        setErrorExecutives(true);
      }
    }
  }, [execsData, execsError, execsLoading]);

  useEffect(() => {
    if (!prevTeamLoading) {
      setLoadingPreviousTeams(false);
    }
    if (prevTeamError) {
      setErrorPreviousTeams(true);
    }
    if (prevTeamData) {
      try {
        const mappedPreviousTeams = Mapper.mapToPreviousTeams(prevTeamData);
        setPreviousTeams(mappedPreviousTeams);
      } catch (error) {
        setErrorPreviousTeams(true);
      }
    }
  }, [prevTeamData, prevTeamError, prevTeamLoading]);

  // Filtering the execs based on their role
  const presidents = executives.filter((exec) => exec.role === "President");
  const otherExecutives = executives.filter(
    (exec) => exec.role === "Executive"
  );

  // Function to group previous teams by year and role
  const groupByYearAndRole = (teams: PreviousTeam[]) => {
    return teams.reduce(
      (group, team) => {
        if (!group[team.year]) {
          group[team.year] = { presidents: [], executives: [] };
        }
        if (team.role === "President") {
          group[team.year].presidents.push(team);
        } else if (team.role === "Executive") {
          group[team.year].executives.push(team);
        }
        return group;
      },
      {} as Record<
        string,
        { presidents: PreviousTeam[]; executives: PreviousTeam[] }
      >
    );
  };

  const groupedPreviousTeams = groupByYearAndRole(previousTeams);

  // Sorting keys (years) in reverse order
  const sortedPreviousTeams = Object.keys(groupedPreviousTeams).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  if (loadingExecutives || loadingPreviousTeams) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <>
        <div className="max-w-screen from-AUIS-dark-teal to-AUIS-teal h-auto bg-gradient-to-b">
          {navbar}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl font-bold text-white">Meet Our Team!</h1>
            <h3 className="my-5 px-5 text-xl text-white">
              The faces behind AUIS that make it all happen. Hover over them to
              find out more about them!
            </h3>
            <h2 className="text-tertiary-blue text-3xl font-bold">President</h2>
            {errorExecutives ? (
              <div className="py-10 text-white">There are no execs to display</div>
            ) : (
              <div className="flex flex-wrap justify-center">
                {presidents?.map((exec) => (
                  <div key={exec.id} className="mx-3 my-5">
                    <ExecCard
                      name={exec.name}
                      description={exec.description}
                      image={exec.image}
                      position={exec.position}
                    />
                  </div>
                ))}
              </div>
            )}
            <h2 className="text-tertiary-blue text-3xl font-bold">
              Executive Team
            </h2>
            {errorExecutives ? (
              <div className="py-10 text-white">There are no execs to display</div>
            ) : (
              <div className="mb-5 flex flex-wrap justify-center">
                {otherExecutives?.map((exec) => (
                  <div key={exec.id} className="mx-3 my-5">
                    <ExecCard
                      name={exec.name}
                      description={exec.description}
                      image={exec.image}
                      position={exec.position}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="max-w-screen flex h-auto flex-col items-center bg-white px-3 py-5">
          <h1 className="text-center text-5xl font-bold text-black">
            Previous Teams
          </h1>
          {errorPreviousTeams ? (
            <div className="py-10">There are no previous teams to display</div>
          ) : (
            <div>
              {sortedPreviousTeams.map((year) => (
                <PreviousTeamCard
                  key={year}
                  year={year}
                  teams={groupedPreviousTeams[year]}
                />
              ))}
            </div>
          )}
        </div>
      </>
    </>
  );
}
