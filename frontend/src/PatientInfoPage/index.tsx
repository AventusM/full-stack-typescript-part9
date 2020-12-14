import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Header, Icon, Button } from "semantic-ui-react";
import AddDoctorDiagnosisModal from "../AddDoctorDiagnosisModal";
import { apiBaseUrl } from "../constants";
import { useStateValue, setLatestPatient } from "../state";
import {
  AllEntryTypes,
  DoctorDiagnosisFormValues,
  Entry,
  Patient,
} from "../types";

interface EntriesProps {
  entries: Entry[];
}

interface SingleEntryProps {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HospitalEntry: React.FC<SingleEntryProps> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date}</Card.Header>
        <Card.Meta>
          <Icon color="red" name={"hospital"} />
        </Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
        <Card.Description>
          <ul>
            {entry.diagnosisCodes?.map((diagnosis) => {
              return (
                <li key={diagnosis}>
                  {diagnoses[diagnosis].code} {diagnoses[diagnosis].name}
                </li>
              );
            })}
          </ul>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const OccupationalHealthCareEntry: React.FC<SingleEntryProps> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date}</Card.Header>
        <Card.Meta>
          <Icon color="blue" name={"briefcase"} />
        </Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
        <Card.Description>
          <ul>
            {entry.diagnosisCodes?.map((diagnosis) => {
              return (
                <li key={diagnosis}>
                  {diagnoses[diagnosis].code} {diagnoses[diagnosis].name}
                </li>
              );
            })}
          </ul>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const HealthCheckEntry: React.FC<SingleEntryProps> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date}</Card.Header>
        <Card.Meta>
          <Icon name={"stethoscope"} />
        </Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
        <Card.Description>
          <ul>
            {entry.diagnosisCodes?.map((diagnosis) => {
              return (
                <li key={diagnosis}>
                  {diagnoses[diagnosis].code} {diagnoses[diagnosis].name}
                </li>
              );
            })}
          </ul>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const EntryDetails: React.FC<SingleEntryProps> = ({ entry }) => {
  switch (entry.type) {
    case AllEntryTypes.Hospital:
      return <HospitalEntry entry={entry} />;
    case AllEntryTypes.OccupationalHealthCare:
      return <OccupationalHealthCareEntry entry={entry} />;
    case AllEntryTypes.HealthCheck:
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientInfoEntries: React.FC<EntriesProps> = (props) => {
  return (
    <Fragment>
      {props.entries.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <Header as="h4">entries</Header>
          {props.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </Fragment>
  );
};

const PatientInfoPage: React.FC = () => {
  const [{ latestPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewDoctorEventEntry = async (
    values: DoctorDiagnosisFormValues
  ) => {
    try {
      const { data: updatedPatientData } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      dispatch(setLatestPatient(updatedPatientData)); // No need for setters / getters. Simply 'refetch'
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
      <AddDoctorDiagnosisModal
        modalOpen={modalOpen}
        onSubmit={submitNewDoctorEventEntry}
        error={error}
        onClose={closeModal}
      />
      <Button style={{ marginTop: 20 }} onClick={() => openModal()}>
        Add new entry
      </Button>
    </div>
  );
};

export default PatientInfoPage;
