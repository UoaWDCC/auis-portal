import { FaLinkedin, FaGithub } from "react-icons/fa";

interface PrimaryDeveloperProps {
  name: string;
  linkedIn: string;
  github: string;
}

export default function PrimaryDeveloperCard({
  name,
  linkedIn,
  github,
}: PrimaryDeveloperProps) {
  return (
    <>
      <div className="bg-AUIS-dark-teal flex h-auto min-h-32 w-64 flex-col items-center justify-between rounded-xl p-2">
        <h1 className="font-boFld text-center text-xl text-white">{name}</h1>
        <div className="my-2 flex justify-end">
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-full w-full px-4"
          >
            <FaLinkedin className="h-10 w-10 text-white group-hover:text-black" />
          </a>
          <a
            href={github}
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
