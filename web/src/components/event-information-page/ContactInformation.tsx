import { EmailLink, InstagramLink } from "../../data/data";

export default function LineBreak() {
  return (
    <>
      <h2 className="px-5 pt-6 text-center text-5xl font-bold md:px-0">
        Refund Policy
      </h2>
      <p className="px-5 pt-6 text-center text-xl md:px-3">
        Non-refundable, unless under extenuating circumstances. Email{" "}
        <a
          className="text-blue-400 underline hover:text-blue-600"
          href={`mailto:${EmailLink}`}
        >
          {" "}
          {EmailLink}
        </a>{" "}
        well in advance.
      </p>
      <div className="flex items-center justify-center pt-12">
        <div className="mx-5 w-[80rem] border-t-2 border-black pt-6 text-center text-5xl font-bold"></div>
      </div>
      <h2 className="px-5 pt-6 text-center text-5xl font-bold md:px-0">
        Any Questions?
      </h2>
      <p className="px-5 py-6 text-center text-xl md:px-3">
        If you have any questions regarding events or tickets, please reach out
        on our{" "}
        <a
          className="text-blue-400 underline hover:text-blue-600"
          href={InstagramLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Instagram
        </a>{" "}
        or{" "}
        <a
          className="text-blue-400 underline hover:text-blue-600"
          href={`mailto:${EmailLink}`}
        >
          {" "}
          email
        </a>{" "}
        us! well in advance.
      </p>
    </>
  );
}
