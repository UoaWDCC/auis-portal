interface MemberTicketInfoProps {
  qrCode: string;
  name: string;
  ticketNumber: string;
}

export default function MemberTicketInfo({
  qrCode,
  name,
  ticketNumber
}: MemberTicketInfoProps) {
  return (
    <>
      <h2 className="px-5 pt-6 pb-6 text-center text-5xl font-bold md:px-0">
        Your Ticket
      </h2>
    <div className="flex justify-center items-center">
      <div className="mx-2 w-[80rem] max-w-full rounded-lg border-2 border-gray-200 bg-gray-100 py-3">
      <p className="mx-2 flex justify-center items-center pt-4 text-sm text-center font-bold">
          *Please do not purchase another ticket*
        </p>
        <p className="mx-2 flex justify-center items-center pt-4 text-xl text-center font-bold">
          Your Name: {name}
        </p>
        <p className="mx-2 flex justify-center items-center pt-4 text-xl text-center font-bold">
          Your Ticket ID number: {ticketNumber}
        </p>
        <p className="mx-2 flex  justify-center items-center pt-4 text-xl text-center font-bold">
          Your Ticket QR Code: 
          
        </p>
        <div className="mx-2 flex justify-center items-center pt-4 text-xl text-center font-bold">
        <img className=" w-40 rounded-xl drop-shadow-all" src={qrCode}/>
        </div>
        </div>
</div>
    </>
  );
}
