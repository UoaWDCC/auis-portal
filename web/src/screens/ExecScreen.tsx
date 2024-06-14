import LoadingSpinner from "@components/LoadingSpinner";
import ReactMarkdown from "react-markdown";
import type { Exec } from "../types/types";
import { mapToExec } from "@utils/mapToExec";
import { useQuery } from "@apollo/client";
import { GET_EXECS } from "../graphql/queries";

function ExecScreen() {
  const { loading, data, error } = useQuery(GET_EXECS);
  if (loading) return <LoadingSpinner />;
  if (error) return <div>CMS Offline</div>;
  const execs: Exec[] = mapToExec(data);

  return (
    <div className="mt-20">
      <h1>Meet the Execs</h1>
      <div className="grid grid-cols-2 gap-10">
        {execs.map((exec) => (
          <div key={exec.id} className="bg-white text-black p-5 rounded-lg">
            <div className="flex items-center">
              <img
                className="rounded-full max-w-40 max-h-40 mr-4"
                src={`${exec.image}`}
                alt="exec information"
              />
              <div>
                <h1 className="text-xl font-bold">{exec.name}</h1>
                <h2 className="text-lg">{exec.position}</h2>
                <p className="text-base">{exec.bio}</p>
                <ReactMarkdown>**Test**</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExecScreen;
