import { FaCalendarAlt } from "react-icons/fa";
import auisLogo from "../assets/peacock_white_inner_big.png";
import { FaLocationDot } from "react-icons/fa6";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { EmailLink, InstagramLink } from "../data/data";
import { useRef } from "react";

export default function EventInformationScreen({
  navbar,
}: {
  navbar: JSX.Element;
}) {
  //TODO: add screen for not found event

  const ref = useRef<null | HTMLDivElement>(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;

  const test: string = `
  
  _✨ Our most awaited event of the year… THE AUIS BALL 2024!✨🍾🪩_
    


It’s time to dust off your finest ethnic attire and join us for an unforgettable night of celebrating Indian culture in all its glory 🎉💃🕺

Prepare to be wowed with our stunning ballroom, exquisite range of food options, and music and dance performances to bring the wedding vibes we know you all have been missing! 🌟


- 🗓️ Saturday 3rd August
- ⏰ 6.30pm - 1am
- 📍Grand Millennium Hotel

This is strictly an 18+ ONLY event.

But wait, there’s more! An extra specialty of our Ball this year, ticket holders will get exclusive access to our pre-events leading up to the Ball to truly provide an authentic Indian wedding experience 🤩 More information about these events will be released soon!

We are also calling all passionate choreographers to help us light the stage! 🪔 Apply now through the link in our bio. Forms for dancers will be released soon, keep an eye out! The Choreographer Form will close on Saturday 15th June at 11.59pm.

Don’t miss out on the opportunity to fulfil your filmy fantasies!

Tickets will be released exclusively for AUIS members on Wednesday 12th June at 8pm for the first 100 hours!

After 100 hours, the tickets will be available for everyone.

The closing date for ticket sales will strictly be on Tuesday 23rd July at 11.59pm (not Indian Standard Time)😋

We can’t wait to see you and teri jaans on the dance floor! 🧡🤍💙💚`;

  return (
    <>
      <div className="from-AUIS-dark-teal to-AUIS-teal bg-gradient-to-b pb-20">
        {navbar}
        <div className="flex flex-wrap items-center justify-center">
          <div className="drop-shadow-all rounded-lg bg-red-400">
            <img src={auisLogo} className="w-[30rem]" />
          </div>

          <div className="md:ml-6">
            <h1 className="mt-4 max-w-[40rem] pb-2 text-center text-6xl font-bold text-white md:text-left">
              AUIS Ball 2024
            </h1>
            <h2 className="text-md pb-2 text-center text-gray-300 md:text-left">
              Hosted by AUIS
            </h2>
            <div className="my-3 flex items-center justify-center gap-2 text-2xl text-gray-300 md:justify-start">
              <FaCalendarAlt />{" "}
              {new Date(/*upcomingEvent.eventDateStart*/).toLocaleString(
                "en-NZ",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }
              )}
            </div>
            <div className="mb-3 flex items-center justify-center gap-2 text-2xl text-gray-300 md:justify-start">
              <FaLocationDot /> LOCATION
            </div>
            <div className="rounded-lg border-2 border-gray-600 bg-black bg-opacity-10">
              <div className="mx-4 mt-2 flex justify-between">
                <p className="text-xl text-white">Price: </p>
                <p className="text-right text-xl text-white">$200</p>
              </div>
              <div className="my-2 flex items-center justify-center">
                <button
                  onClick={handleClick}
                  className="bg-primary-orange mx-4 mb-2 w-full rounded-lg py-3 text-2xl font-bold text-white transition-all hover:scale-105"
                >
                  Get Tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="pt-6 text-center text-5xl font-bold">
          Event Description
        </h2>
        <div className="flex justify-center pt-6">
          <Markdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            className="markdown mx-5 w-[70rem]"
          >
            {test}
          </Markdown>
        </div>
      </div>
      <div className="flex items-center justify-center pt-12">
        <div className="mx-5 w-[80rem] border-t-2 border-black pt-6 text-center text-5xl font-bold"></div>
      </div>
      <div className="flex justify-center">
        <div className="mx-5 flex w-[75rem] flex-wrap justify-around">
          <div className="px-5 md:px-0">
            <h3 className="pb-6 text-center text-4xl font-bold md:text-left">
              Location
            </h3>

            <p className="max-w-96 pb-2 text-center md:text-left">
              Grand Millennium Auckland 71 Mayoral Drive, Auckland CBD, Auckland
              1010, New Zealand
            </p>
            <div className="pb-6 text-center md:text-left">
              <a
                className="text-blue-400 underline hover:text-blue-600"
                href={`https://www.google.com/maps/dir//${"Grand+Millennium+Auckland,+71+Mayoral+Drive,+Cnr+Vincent+Street,+Auckland+1010"}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            </div>
          </div>
          <div>
            <iframe
              className="h-96 w-96 md:w-[40rem]"
              src={`https://www.google.com/maps?q=${"Grand Millennium Auckland 71 Mayoral Drive, Auckland CBD, Auckland 1010, New Zealand"}&output=embed`}
            ></iframe>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pt-6">
        <div className="mx-5 w-[80rem] border-t-2 border-black pt-6 text-center text-5xl font-bold"></div>
      </div>
      <h2 ref={ref} className="pt-6 text-center text-5xl font-bold">
        Purchase Tickets
      </h2>
      <div>
        <div className="flex items-center justify-center pt-6">
          <div className="mx-2 flex w-[80rem] items-center justify-between rounded-lg border-2 border-gray-200 bg-gray-100 py-3">
            <p className="pl-4 text-xl font-bold">
              Ticket name AUIS MEMBER TEICKET REALLTY LONG NAME{" "}
            </p>
            <div className="flex items-center justify-center">
              <p className="text-xl font-bold">$200</p>
              <button className="bg-primary-orange text-md mx-4 rounded-lg px-5 py-3 font-bold text-white transition-all hover:scale-105">
                Get Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center pt-6">
          <div className="mx-2 flex w-[80rem] items-center justify-between rounded-lg border-2 border-gray-200 bg-gray-100 py-3">
            <p className="pl-4 text-xl font-bold">
              Ticket name AUIS MEMBER TEICKET REALLTY LONG NAME{" "}
            </p>
            <div className="flex items-center justify-center">
              <p className="text-xl font-bold">$200</p>
              <button className="bg-primary-orange text-md mx-4 rounded-lg px-5 py-3 font-bold text-white transition-all hover:scale-105">
                Get Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center pt-6">
          <div className="mx-2 flex w-[80rem] items-center justify-between rounded-lg border-2 border-gray-200 bg-gray-100 py-3">
            <p className="pl-4 text-xl font-bold">
              Ticket name AUIS MEMBER TEICKET REALLTY LONG NAME{" "}
            </p>
            <div className="flex items-center justify-center">
              <p className="text-xl font-bold">$200</p>
              <button className="bg-primary-orange text-md mx-4 rounded-lg px-5 py-3 font-bold text-white transition-all hover:scale-105">
                Get Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pt-12">
        <div className="mx-5 w-[80rem] border-t-2 border-black pt-6 text-center text-5xl font-bold"></div>
      </div>
      <h2 className="px-5 pt-6 text-center text-5xl font-bold md:px-0">
        Terms & Conditions
      </h2>
      <p className="px-5 pt-3 text-center text-xl md:px-3">
        By purchasing this ticket or being a ticket holder, you accept the terms
        and conditions.
      </p>
      <div className="flex justify-center px-5 xl:px-0">
        <p className="mx-2 flex w-[80rem] pt-4 text-left text-xl">
          ‘The AUIS Ball’ is an event organised by the Auckland University
          Indian Society (AUIS), a student club at the University of Auckland.
          Each ticket grants entry to one individual and is valid only for the
          specified event. This ticket is non-transferable. Ticket scalping is
          strictly prohibited, ie. cannot resell the ticket at a price higher
          than its original purchase value. This is strictly an 18+ event. The
          use of illegal substances, vaping and smoking is strictly prohibited.
          Alcohol consumption must be in accordance with venue regulations. This
          is a non-refundable event unless under extenuating circumstances. We
          prioritise the safety and well-being of our students; thus, we kindly
          request that you adhere to appropriate and respectful behaviour
          towards one another throughout the duration of this event. AUIS and
          the Grand Millennium Hotel will not tolerate inappropriate behaviour,
          and we reserve the right to remove you from the venue. In addition to
          venue security measures, designated executive members from AUIS will
          serve as harassment officers, guaranteeing a secure environment for
          all event attendees. Photography and videography may be conducted
          during the event for promotional purposes. By attending, you consent
          to being photographed or recorded. You bear both financial and legal
          liability for any damages to the premises or equipment incurred by you
          at the venue. You are responsible for any items you bring to the
          venue, which may be discarded if left behind. We shall not incur any
          liability or responsibility for injury to any person...
        </p>
      </div>
      <div className="flex items-center justify-center pt-12">
        <div className="mx-5 w-[80rem] border-t-2 border-black pt-6 text-center text-5xl font-bold"></div>
      </div>
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
      <p className="px-5 pt-6 text-center text-xl md:px-3">
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
