import Header from "@components/Header";
import { useQuery } from "@apollo/client";
import ReactMarkdown from "react-markdown";
import { GET_INTRODUCTION, GET_VALUES } from "../graphql/queries";
import type { Introduction, Value } from "../types/types";
import LoadingSpinner from "@components/LoadingSpinner";
import { Mapper } from "@utils/Mapper";

function AboutUsSCreen() {
  const { loading, data, error } = useQuery(GET_INTRODUCTION);
  if (loading) return <LoadingSpinner />;
  if (error) return <div>CMS Offline</div>;
  const introduction: Introduction[] = Mapper.mapToIntroduction(data);

  const { loading :loadinga , data : dataa, error:errora } = useQuery(GET_VALUES);
  if (loadinga) return <LoadingSpinner />;
  if (errora) return <div>CMS Offline</div>;
  const introductiona: Value[] = Mapper.mapToIntroduction(dataa);

  return (
    <>
      <div className="  bg-gradient-to-b from-AUIS-dark-teal to-AUIS-teal">
        <Header />
        <div className=" h-52 flex justify-center items-center">
          <h1 className=" text-5xl cm:text-6xl md:text-8xl text-white font-bold  drop-shadow-glow">
            About Us!
          </h1>
        </div>
      </div>
      <div className=" bg-white px-8 sm:px-16 md:px-32 py-16">
        <h2 className=" text-center text-black text-3xl sm:text-5xl md:text-7xl font-bold pb-12">
          Our Introduction
        </h2>
        <ReactMarkdown className=" text-justify text-black text-xl md:text-3xl pb-12">
          {introduction[0].description}
        </ReactMarkdown>
        <div className=" grid gap-y-8 md:flex text-center">
          <div className="flex-[33%]">
            <p className=" text-black text-3xl lg:text-5xl font-bold row-start-1 row-end-1 col-start-1 col-end-1">
              {introduction[0].events}
            </p>
            <p className=" text-black text-3xl lg:text-5xl font-bold row-start-2 row-end-2 col-start-1 col-end-1">
              Events
            </p>
          </div>
          <div className="flex-[33%]">
            <p className=" text-black text-3xl lg:text-5xl font-bold row-start-1 row-end-1 col-start-2 col-end-2">
              {introduction[0].members}
            </p>
            <p className=" text-black text-3xl lg:text-5xl font-bold row-start-2 row-end-2 col-start-2 col-end-2">
              Members
            </p>
          </div>
          <div className="flex-[33%]">
            <p className=" text-black text-3xl lg:text-5xl font-bold row-start-1 row-end-1 col-start-3 col-end-3">
              {introduction[0].followers}
            </p>
            <p className=" text-black text-3xl lg:text-5xl font-bold row-start-2 row-end-2 col-start-3 col-end-3">
              Followers
            </p>
          </div>
        </div>
        <div className="flex justify-center content-center py-12">
            <button type="button" className="  px-10 py-3 bg-primary-orange font-bold text-white text-3xl rounded-2xl">Join Us Now</button>
        </div>
      </div>
      <div className="  bg-gradient-to-b from-AUIS-dark-teal to-AUIS-teal">
        <h2 className=" text-7xl text-white font-bold text-center py-12">
          Our Values
        </h2>
        <div className=" grid md:grid-cols-2 md:grid-rows-2 grid-cols-1 grid-row-4">
            <div className=" md:row-start-1 md:row-end-1 row-start-1 row-end-1">
                

            </div>



        </div>
      </div>
    </>
  );
}

export default AboutUsSCreen;
