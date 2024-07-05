import type { Introduction, Value, Partner } from "../types/types";
import { useQuery } from "@apollo/client";
import { GET_INTRODUCTION, GET_VALUES, GET_PARTNERS } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import { Mapper } from "../utils/Mapper";
import Header from "../components/Header";
import { useState, useEffect } from "react";

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
        setNoIntroductions(false);
      }
    }
  }, [introData]);

  useEffect(() => {
    if (valuesData) {
      try {
        const mappedValues = Mapper.mapToValue(valuesData);
        setValues(mappedValues);
      } catch (error) {
        setNoValues(false);
      }
    }
  }, [valuesData]);

  useEffect(() => {
    if (partnersData) {
      try {
        const mappedPartners = Mapper.mapToPartner(partnersData);
        setPartners(mappedPartners);
      } catch (error) {
        setNoPartners(false);
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
          <div>
            <h1>About Us Screen</h1>
          </div>
        </>
      )}
    </>
  );
}
