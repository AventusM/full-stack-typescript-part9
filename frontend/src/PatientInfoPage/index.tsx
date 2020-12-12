import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { useStateValue, setLatestPatient } from "../state";
import { Patient } from "../types";

const PatientInfoPage: React.FC = () => {
  const [{ latestPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const checkAndFetchPatientInfo = async () => {
      const latestPatientMatchesID = id === latestPatient?.id;
      if (!latestPatientMatchesID) {
        try {
          const { data: singlePatientDataFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setLatestPatient(singlePatientDataFromApi));
        } catch (e) {
          console.error(e);
        }
      }
    };

    checkAndFetchPatientInfo();
  }, []);

  // Could use a loading useState which gets adjusted inside useEffect but current code works
  if (!latestPatient) {
    return <p>No data</p>;
  }

  return (
    <div className="App">
      <Header as="h2">
        {latestPatient.name}
        <Icon
          name={
            latestPatient.gender === "male"
              ? "mars"
              : latestPatient.gender === "female"
              ? "venus"
              : "genderless"
          }
        />
      </Header>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>ssn: {latestPatient.ssn}</p>
        <p>occupation: {latestPatient.occupation}</p>
      </div>
    </div>
  );
};

export default PatientInfoPage;
