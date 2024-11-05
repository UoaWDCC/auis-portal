import { PrimaryDeveloperCardProps } from "../../types/types";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function PrimaryDeveloperCard({
  primaryDeveloper,
}: PrimaryDeveloperCardProps) {
  return (
    <>
      <div className="bg-AUIS-dark-teal flex h-auto min-h-32 w-64 flex-col items-center justify-between rounded-xl p-2">
        <h1 className="text-center text-xl font-bold text-white">
          {primaryDeveloper.name}
        </h1>
        <div className="my-2 flex justify-end">
          <a
            href={primaryDeveloper.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-full w-full px-4"
          >
            <FaLinkedin className="h-10 w-10 text-white group-hover:text-black" />
          </a>

          <a
            href={primaryDeveloper.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
            className="flex h-full w-full px-4"
          >
            <FaGithub className="h-10 w-10 text-white group-hover:text-black" />
          </a>
        </div>
      </div>
    </>
  );
}
