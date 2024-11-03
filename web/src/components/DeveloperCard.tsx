import { DeveloperCardProps } from "../types/types";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function DeveloperCard({ developer }: DeveloperCardProps) {
  return (
    <>
      <div className="bg-AUIS-dark-teal flex h-auto min-h-32 w-64 flex-col items-center rounded-xl p-2">
        <h1 className="text-center text-xl font-bold text-white">
          {developer.name}
        </h1>
        <div className="my-2 flex items-center justify-center">
          <a
            href={developer.linkedIn}
            aria-label="LinkedIn"
            className="flex h-full w-full items-center justify-center px-4"
          >
            <FaLinkedin className="h-10 w-10 text-white group-hover:text-black" />
          </a>

          <a
            href={developer.github}
            aria-label="LinkedIn"
            className="flex h-full w-full items-center justify-center px-4"
          >
            <FaGithub className="h-10 w-10 text-white group-hover:text-black" />
          </a>
        </div>
      </div>
    </>
  );
}
