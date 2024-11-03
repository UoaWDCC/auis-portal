import type { Exec, PreviousTeam } from "../types/types";
import { useQuery } from "@apollo/client";
import { GET_EXECS, GET_PREVIOUS_TEAMS } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import { Mapper } from "../utils/Mapper";
import Header from "../components/Header";
import ExecCard from "../components/ExecCard";
import PreviousTeamCard from "../components/PreviousTeamCard";
import { useState, useEffect } from "react";

export default function ExecScreen() {
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
      (acc, team) => {
        // Check if the year exists in the accumulator object
        if (!acc[team.year]) {
          // Initialize the year key with empty arrays for Presidents and Executives
          acc[team.year] = { Presidents: [], Executives: [] };
        }
        // Add the team to the appropriate role array based on the role
        if (team.role === "President") {
          acc[team.year].Presidents.push(team);
        } else if (team.role === "Executive") {
          acc[team.year].Executives.push(team);
        }
        return acc;
      },
      {} as Record<
        string,
        { Presidents: PreviousTeam[]; Executives: PreviousTeam[] }
      >
    );
  };

  const groupedPreviousTeams = groupByYearAndRole(previousTeams);

  // Sorting keys (years) in reverse order
  const sortedYears = Object.keys(groupedPreviousTeams).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <>
      {loadingExecutives || loadingPreviousTeams ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="max-w-screen from-AUIS-dark-teal to-AUIS-teal h-auto bg-gradient-to-b">
            <Header />
            <div className="flex flex-col items-center text-center">
              <h1 className="text-5xl font-bold text-white">Meet Our Team!</h1>
              <h3 className="my-5 px-5 text-xl text-white">
                The faces behind AUIS that make it all happen. Hover over them
                to find out more about them!
              </h3>
              <h2 className="text-tertiary-blue text-3xl font-bold">
                PRESIDENT
              </h2>
              {errorExecutives ? (
                <div className="py-10">There are no execs to display</div>
              ) : (
                <div className="flex flex-wrap justify-center">
                  {presidents?.map((exec) => (
                    <div key={exec.id} className="mx-3 my-5">
                      <ExecCard exec={exec} />
                    </div>
                  ))}
                </div>
              )}
              <h2 className="text-tertiary-blue text-3xl font-bold">
                EXECUTIVE TEAM
              </h2>
              {errorExecutives ? (
                <div className="py-10">There are no execs to display</div>
              ) : (
                <div className="mb-5 flex flex-wrap justify-center">
                  {otherExecutives?.map((exec) => (
                    <div key={exec.id} className="mx-3 my-5">
                      <ExecCard exec={exec} />
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
              <div className="py-10">
                There are no previous teams to display
              </div>
            ) : (
              <div>
                {sortedYears.map((year) => (
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
      )}
    </>
  );
}
