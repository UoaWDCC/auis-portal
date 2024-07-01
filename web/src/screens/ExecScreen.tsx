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

  const [executives, setExecutives] = useState<Exec[]>([]);
  const [previousTeams, setPreviousTeams] = useState<PreviousTeam[]>([]);
  const [noExecs, setNoExecs] = useState(false);
  const [noPreviousTeams, setNoPreviousTeams] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (execsData) {
      try {
        const execs = Mapper.mapToExec(execsData);
        setExecutives(execs);
      } catch (error) {
        setNoExecs(true);
      }
    }
  }, [execsData]);

  useEffect(() => {
    if (prevTeamData) {
      try {
        const teams = Mapper.mapToPreviousTeams(prevTeamData);
        setPreviousTeams(teams);
      } catch (error) {
        setNoPreviousTeams(true);
      }
    }
  }, [prevTeamData]);

  useEffect(() => {
    if (!execsLoading && !prevTeamLoading) {
      setLoading(false);
    }
  }, [execsLoading, prevTeamLoading]);

  if (execsError || prevTeamError) {
    return <div>CMS Offline</div>;
  }

  // Filtering the execs based on their role
  const presidents = executives.filter((exec) => exec.role === "President");
  const otherExecutives = executives.filter(
    (exec) => exec.role === "Executive"
  );

  // Function to group previous teams by year and role
  const groupByYearAndRole = (teams: PreviousTeam[]) => {
    return teams.reduce((acc, team) => {
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
    }, {} as Record<string, { Presidents: PreviousTeam[]; Executives: PreviousTeam[] }>);
  };

  const groupedPreviousTeams = groupByYearAndRole(previousTeams);

  // Sorting keys (years) in reverse order
  const sortedYears = Object.keys(groupedPreviousTeams).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="max-w-screen h-auto bg-gradient-to-b from-AUIS-dark-teal to-AUIS-teal">
            <Header />
            <div className="flex flex-col items-center text-center">
              <h1 className="text-5xl font-bold text-white">Meet Our Team!</h1>
              <h3 className="text-xl text-white px-5 my-5">
                The faces behind AUIS that make it all happen. Hover over them
                to find out more about them!
              </h3>
              <h2 className="text-3xl font-bold text-tertiary-blue">
                PRESIDENTS
              </h2>
              <div className="flex flex-wrap justify-center">
                {presidents?.map((exec) => (
                  <div key={exec.id} className="mx-3 my-5">
                    <ExecCard exec={exec} />
                  </div>
                ))}
              </div>
              <h2 className="text-3xl font-bold text-tertiary-blue">
                EXECUTIVE TEAM
              </h2>
              {noExecs ? (
                <div>There is no execs to display</div>
              ) : (
                <div className="flex flex-wrap justify-center mb-5">
                  {otherExecutives?.map((exec) => (
                    <div key={exec.id} className="mx-3 my-5">
                      <ExecCard exec={exec} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="max-w-screen h-auto bg-white flex flex-col items-center py-5 px-3">
            <h1 className="text-5xl font-bold text-black text-center">
              Previous Teams
            </h1>
            {noPreviousTeams ? (
              <div>There is no previous teams to display</div>
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
