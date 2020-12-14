import React from "react";
import { Grid, Button, Form as SemanticUIForm } from "semantic-ui-react";
import { Field, Formik, Form as FormikForm } from "formik";

import {
  TextField,
  DiagnosisSelection,
  NumberField,
} from "../AddPatientModal/FormField";
import {
  AllEntryTypes,
  DoctorDiagnosisFormValues,
  HealthCheckRating,
} from "../types";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: DoctorDiagnosisFormValues) => void;
  onCancel: () => void;
}

type VisitTypeOption = {
  value: AllEntryTypes;
  label: string;
};

type SelectFieldProps = {
  name: string;
  label: string;
  options: VisitTypeOption[];
};

const entryTypes: VisitTypeOption[] = [
  { value: AllEntryTypes.Hospital, label: "Hospital" },
  { value: AllEntryTypes.HealthCheck, label: "Health check" },
  {
    value: AllEntryTypes.OccupationalHealthCare,
    label: "Occupational healthcare",
  },
];

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
}: SelectFieldProps) => (
  <SemanticUIForm.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </SemanticUIForm.Field>
);

export const AddDoctorDiagnosisForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        type: AllEntryTypes.HealthCheck,
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <FormikForm className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description for the patients problem"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Name of the specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Occupation"
              placeholder="Occupation"
              name="occupation"
              component={TextField}
            />
            {/* <SelectField label="Visit type" name="type" options={entryTypes} />  TODO: Support for different options */}
            <Field
              label="Health check rating"
              name="healthCheckRating"
              component={NumberField}
              min={HealthCheckRating.Healthy}
              max={HealthCheckRating.CriticalRisk}
            />
            {/*             <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            /> */}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} basic color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add entry
                </Button>
              </Grid.Column>
            </Grid>
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default AddDoctorDiagnosisForm;
