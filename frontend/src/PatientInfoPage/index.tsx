import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { useStateValue, setLatestPatient } from "../state";
import { Entry, Patient } from "../types";

interface EntriesProps {
  entries: Entry[];
}

const PatientInfoEntries: React.FC<EntriesProps> = (props) => {
  const [{ diagnoses: fetchedDiagnosesData }] = useStateValue();
  return (
    <Fragment>
      {props.entries.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <Header as="h4">entries</Header>
          {props.entries.map((entry) => {
            return (
              <div key={entry.id}>
                {entry.date} {entry.description}
                <ul>
                  {entry.diagnosisCodes?.map((diagnosis) => {
                    return (
                      <li key={diagnosis}>
                        {diagnosis} {fetchedDiagnosesData[diagnosis].name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

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
      <p style={{ margin: 0, padding: 0 }}>ssn: {latestPatient.ssn}</p>
      <p style={{ margin: 0, padding: 0 }}>
        occupation: {latestPatient.occupation}
      </p>
      <PatientInfoEntries entries={latestPatient.entries} />
    </div>
  );
};

export default PatientInfoPage;
