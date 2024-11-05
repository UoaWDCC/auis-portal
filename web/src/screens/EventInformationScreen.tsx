import { FaCalendarAlt } from "react-icons/fa";
import auisLogo from "../assets/peacock_white_inner_big.png";
import { FaLocationDot } from "react-icons/fa6";
import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

export default function EventInformationScreen({
  navbar,
}: {
  navbar: JSX.Element;
}) {
  //TODO: add screen for not found event

  
    const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`

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

We can’t wait to see you and teri jaans on the dance floor! 🧡🤍💙💚`


  return (
    <>
      <div className="from-AUIS-dark-teal to-AUIS-teal bg-gradient-to-b pb-20">
        {navbar}
        <div className="flex items-center justify-center flex-wrap">
          <div className="drop-shadow-all rounded-lg bg-red-400">
            <img src={auisLogo} className=" w-[30rem]" />
          </div>

          <div className="md:ml-6">
            <h1 className="pb-2 mt-4 text-6xl text-center md:text-left font-bold max-w-[40rem] text-white">
            AUIS Ball 2024
            </h1>
            <h2 className="text-md pb-2 text-gray-300 text-center md:text-left">Hosted by AUIS</h2>
            <div className="my-3 flex items-center gap-2 md:justify-start justify-center text-2xl text-gray-300">
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
            <div className="mb-3 flex items-center gap-2 text-2xl md:justify-start justify-center text-gray-300">
              <FaLocationDot /> LOCATION
            </div>
            <div className=" border-2 rounded-lg  border-gray-600 bg-black bg-opacity-10">
              <div className="flex mt-2 mx-4 justify-between">
                <p className="text-white text-xl">Price: </p>
                <p className="text-right text-white text-xl">$200</p>
              </div>
              <div className="flex items-center justify-center my-2">
                <button className="bg-primary-orange mb-2 mx-4 rounded-lg w-full py-3 text-4xl font-bold text-white transition-all hover:scale-105">
                  Get Tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
            <h2 className=" text-center font-bold text-5xl pt-6">Event Description</h2>
            <div className=" flex justify-center pt-6">
            <Markdown remarkPlugins={[remarkGfm, remarkBreaks]} className=" markdown w-[70rem] mx-5">{test}</Markdown>
            </div>
      </div>
    </>
  );
}
