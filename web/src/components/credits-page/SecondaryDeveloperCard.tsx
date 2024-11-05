import { SecondaryDeveloperCardProps } from "../../types/types";
import { FaGithub } from "react-icons/fa";

export default function SecondaryDeveloperCard({
  secondaryDeveloper,
}: SecondaryDeveloperCardProps) {
  return (
    <>
      <div className="bg-AUIS-dark-teal flex h-auto w-64 flex-col items-center justify-between rounded-xl p-2">
        <h1 className="text-center text-xl font-bold text-white">
          {secondaryDeveloper.name}
        </h1>
        <div className="my-2 flex justify-end">
          <a
            href={secondaryDeveloper.github}
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full w-full px-4"
          >
            <FaGithub className="h-10 w-10 text-white group-hover:text-black" />
          </a>
        </div>
      </div>
    </>
  );
}
