import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { DoctorDiagnosisFormValues } from "../types";
import { AddDoctorDiagnosisForm } from "./AddDoctorDiagnosisForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: DoctorDiagnosisFormValues) => void;
  error?: string;
}

const AddDoctorDiagnosisModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new doctor visit entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddDoctorDiagnosisForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddDoctorDiagnosisModal;
