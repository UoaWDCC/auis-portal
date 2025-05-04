interface MemberTicketInfoProps {
  qrCode: string;
  name: string;
  ticketNumber: string;
}

export default function MemberTicketInfo({
  qrCode,
  name,
  ticketNumber,
}: MemberTicketInfoProps) {
  return (
    <>
      <h2 className="px-5 pb-6 pt-6 text-center text-5xl font-bold md:px-0">
        Your Ticket
      </h2>
      <div className="flex items-center justify-center">
        <div className="mx-2 w-[80rem] max-w-full rounded-lg border-2 border-gray-200 bg-gray-100 py-3">
          <p className="mx-2 flex items-center justify-center pt-4 text-center text-sm font-bold">
            *Please do not purchase another ticket*
          </p>
          <p className="mx-2 flex items-center justify-center pt-4 text-center text-xl font-bold">
            Your Name: {name}
          </p>
          <p className="mx-2 flex items-center justify-center pt-4 text-center text-xl font-bold">
            Your Ticket ID number: {ticketNumber}
          </p>
          <p className="mx-2 flex items-center justify-center pt-4 text-center text-xl font-bold">
            Your Ticket QR Code:
          </p>
          <div className="mx-2 flex items-center justify-center pt-4 text-center text-xl font-bold">
            <img className="drop-shadow-all w-40 rounded-xl" src={qrCode} />
          </div>
        </div>
      </div>
    </>
  );
}
