import type { Introduction, Value, Partner } from "../types/types";
import { useQuery } from "@apollo/client";
import { GET_INTRODUCTION, GET_VALUES, GET_PARTNERS } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import { Mapper } from "../utils/Mapper";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import ValueCard from "../components/ValueCard";

export default function AboutUsScreen() {
  const {
    loading: introLoading,
    data: introData,
    error: introError,
  } = useQuery(GET_INTRODUCTION);

  const {
    loading: valuesLoading,
    data: valuesData,
    error: valuesError,
  } = useQuery(GET_VALUES);

  const {
    loading: partnersLoading,
    data: partnersData,
    error: partnersError,
  } = useQuery(GET_PARTNERS);

  const [introductions, setIntroductions] = useState<Introduction[]>([]);
  const [values, setValues] = useState<Value[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [noIntroductions, setNoIntroductions] = useState<boolean>(false);
  const [noValues, setNoValues] = useState<boolean>(false);
  const [noPartners, setNoPartners] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (introData) {
      try {
        const mappedIntros = Mapper.mapToIntroduction(introData);
        setIntroductions(mappedIntros);
      } catch (error) {
        setNoIntroductions(true);
      }
    }
  }, [introData]);

  useEffect(() => {
    if (valuesData) {
      try {
        const mappedValues = Mapper.mapToValue(valuesData);
        setValues(mappedValues);
      } catch (error) {
        setNoValues(true);
      }
    }
  }, [valuesData]);

  useEffect(() => {
    if (partnersData) {
      try {
        const mappedPartners = Mapper.mapToPartner(partnersData);
        setPartners(mappedPartners);
      } catch (error) {
        setNoPartners(true);
      }
    }
  }, [partnersData]);

  useEffect(() => {
    if (!introLoading && !valuesLoading && !partnersLoading) {
      setLoading(false);
    }
  }, [introLoading, valuesLoading, partnersLoading]);

  if (introError || valuesError || partnersError) {
    return <div>CMS Offline</div>;
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="max-w-screen from-AUIS-dark-teal to-AUIS-teal h-auto bg-gradient-to-b">
            <Header />
            <div className="max-w-screen flex h-52 items-center justify-center">
              <h1 className="text-5xl font-bold text-white md:text-7xl">
                About Us!
              </h1>
            </div>

            <div className="max-w-screen flex h-auto flex-col items-center bg-white px-5 py-5 text-center text-black md:px-20 lg:px-48">
              <h2 className="text-4xl font-bold">Our Introduction</h2>
              {noIntroductions ? (
                <div>There is no introduction to display</div>
              ) : (
                <>
                  <p className="my-5 text-2xl">
                    {introductions[0].description}
                  </p>

                  <div className="flex w-full flex-col justify-between px-10 sm:flex-row md:w-[50rem]">
                    <div className="m-5 flex flex-col items-center text-3xl">
                      <h6 className="font-bold">{introductions[0].events}+</h6>
                      <h5>Events</h5>
                    </div>

                    <div className="m-5 flex flex-col items-center text-3xl">
                      <h6 className="font-bold">{introductions[0].members}+</h6>
                      <h5>Members</h5>
                    </div>

                    <div className="m-5 flex flex-col items-center text-3xl">
                      <h6 className="font-bold">
                        {introductions[0].followers}+
                      </h6>
                      <h5>Followers</h5>
                    </div>
                  </div>
                </>
              )}

              <a
                href="mailto:au.indiansociety@gmail.com"
                className="bg-primary-orange my-5 rounded-full px-10 py-3 text-2xl font-bold text-white"
              >
                Join Us Now!
              </a>
            </div>

            <div className="max-w-screen from-AUIS-dark-teal to-AUIS-teal flex h-auto flex-col items-center bg-gradient-to-b px-5 py-5 md:px-20">
              <h1 className="text-4xl font-bold text-white">Our Values</h1>
              {noValues ? (
                <div>There is no values to display</div>
              ) : (
                <div className="flex flex-wrap justify-center">
                  {values.map((value) => (
                    <div key={value.id} className="mx-5 my-5 xl:mx-20">
                      <ValueCard value={value} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="max-w-screen flex flex-col items-center bg-white px-2 py-5">
              <h1 className="text-4xl font-bold text-black">Our Partners</h1>
              {noPartners ? (
                <div>There is no partners to display</div>
              ) : (
                <div className="flex flex-wrap justify-center">
                  {partners.map((partner) => (
                    <div key={partner.id} className="m-5 w-full md:w-80">
                      <img src={partner.image} alt="Partner Image" />
                    </div>
                  ))}
                </div>
              )}
              <h3 className="text-center text-xl text-black">
                More information about our partners{" "}
                <span className="text-blue-500 underline">
                  <a href="/sponsors">here</a>
                </span>
              </h3>
            </div>
          </div>
        </>
      )}
    </>
  );
}
