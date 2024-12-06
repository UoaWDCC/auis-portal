export default function TicketQuestion({
  question,
  indexId,
  onAnswerChange,
}: {
  question: string;
  indexId: number;
  onAnswerChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    indexId: number
  ) => void;
}) {
  return (
    <div>
      <label className="flex items-center justify-center py-3 text-center text-xl">
        {question}
      </label>
      <input
        type="text"
        onChange={(e) => onAnswerChange(e, indexId)}
        className="input flex w-full items-center justify-center rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none"
      />
    </div>
  );
}
