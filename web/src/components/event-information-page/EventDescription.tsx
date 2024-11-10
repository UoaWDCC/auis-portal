import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

interface EventDescriptionProps {
  description: string;
}

export default function EventDescription({
  description,
}: EventDescriptionProps) {
  return (
    <>
      <h2 className="pt-6 text-center text-5xl font-bold">Event Description</h2>
      <div className="flex justify-center pt-6">
        <Markdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          className="markdown mx-5 w-[70rem]"
        >
          {description}
        </Markdown>
      </div>
    </>
  );
}
