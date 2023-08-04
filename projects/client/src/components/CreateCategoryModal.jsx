import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormCreateCategory = ({ isOpen, onClose, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Category name can't be empty"),
    }),
    onSubmit: (values, actions) => {
      onSubmit(values);
      actions.resetForm();
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Category</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <Input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Category Name"
            />
            {formik.touched.name && formik.errors.name && (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default FormCreateCategory;
