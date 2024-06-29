import ReactMarkdown from "react-markdown";
import type { Exec, PreviousTeam } from "../types/types";
import { useQuery } from "@apollo/client";
import { GET_EXECS, GET_PREVIOUS_TEAMS } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import { Mapper } from "../utils/Mapper";
import Header from "../components/Header";
import ExecCard from "../components/ExecCard";
import PreviousTeamCard from "../components/PreviousTeamCard";

export default function ExecScreen() {
	const { loading: execsLoading, data: execsData, error: execsError } = useQuery(GET_EXECS);
	const { loading: prevTeamLoading, data: prevTeamData, error: prevTeamError } = useQuery(GET_PREVIOUS_TEAMS);

	if (execsLoading || prevTeamLoading) {
		return <LoadingSpinner />;
	}

	if (execsError || prevTeamError) {
		return <div>CMS Offline</div>;
	}

	const execs: Exec[] = Mapper.mapToExec(execsData);
	const previousTeams: PreviousTeam[] = Mapper.mapToPreviousTeams(prevTeamData);

	// Filtering the execs based on their role
	const presidents = execs.filter((exec) => exec.role === "President");
	const executives = execs.filter((exec) => exec.role === "Executive");

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
	const sortedYears = Object.keys(groupedPreviousTeams).sort((a, b) => parseInt(b) - parseInt(a));
	return (
		<>
			<div className="max-w-screen h-auto bg-gradient-to-b from-AUIS-dark-teal to-AUIS-teal">
				<Header />
				<div className="flex flex-col items-center">
					<h1 className="text-5xl font-bold text-white">Meet Our Team!</h1>
					<h3 className="text-xl text-white text-center px-5 my-5">
						The faces behind AUIS that make it all happen. Hover over them to find out more about them!
					</h3>
					<h2 className="text-3xl font-bold text-tertiary-blue">PRESIDENTS</h2>
					<div className="flex flex-wrap justify-center">
						{presidents.map((exec) => (
							<div key={exec.id} className="mx-3 my-5">
								<ExecCard exec={exec} />
							</div>
						))}
					</div>
					<h2 className="text-3xl font-bold text-tertiary-blue">EXECUTIVE TEAM</h2>
					<div className="flex flex-wrap justify-center mb-5">
						{executives.map((exec) => (
							<div key={exec.id} className="mx-3 my-5">
								<ExecCard exec={exec} />
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="max-w-screen h-auto bg-white flex flex-col items-center py-5 px-3">
				<h1 className="text-5xl font-bold text-black text-center">Previous Teams</h1>
				{sortedYears.map((year) => (
					<PreviousTeamCard key={year} year={year} teams={groupedPreviousTeams[year]} />
				))}
			</div>
		</>
	);
}
