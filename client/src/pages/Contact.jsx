/* eslint-disable no-unused-vars */
import {
  Label,
  TextInput,
  Checkbox,
  Alert,
  Button,
  Modal,
  Textarea,
} from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { customButtonTheme } from "../customThemes/buttonTheme";

const Contact = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({});

  const handleSubmit = async () => {};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleAgree = () => {
    setOpenModal(false);
    setIsChecked(true);
  };

  return (
    <div className="py-20 min-h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
          <div className="flex h-full flex-col justify-center gap-4 p-6">
            <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
              <form
                className="flex flex-col gap-4 pb-4"
                onSubmit={handleSubmit}
              >
                <h1 className="mb-4 text-2xl font-bold  dark:text-white">
                  Contact Us
                </h1>
                <div>
                  <div className="mb-2">
                    <Label
                      className="text-sm font-medium text-gray-900 dark:text-gray-300"
                      htmlFor="name"
                    >
                      Name:
                    </Label>
                  </div>
                  <div className="flex w-full rounded-lg pt-1">
                    <div className="relative w-full">
                      <TextInput
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        required=""
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <Label
                      className="text-sm font-medium text-gray-900 dark:text-gray-300"
                      htmlFor="email"
                    >
                      Email:
                    </Label>
                  </div>
                  <div className="flex w-full rounded-lg pt-1">
                    <div className="relative w-full">
                      <TextInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        required=""
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <Label
                      className="text-sm font-medium text-gray-900 dark:text-gray-300"
                      data-testid="flowbite-label"
                      htmlFor="comment"
                    >
                      Comment
                    </Label>
                  </div>
                  <div className="flex flex-col w-full rounded-lg pt-1">
                    <div className="relative w-full">
                      <Textarea
                        id="comment"
                        type="text"
                        name="comment"
                        required=""
                        rows="8"
                        maxLength="500"
                        onChange={handleChange}
                      />
                    </div>
                    <p className="text-sm mt-2">Max 500 characters</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mt-4">
                    <Checkbox
                      id="terms"
                      onChange={handleCheckboxChange}
                      required
                      checked={isChecked}
                    />
                    <Label htmlFor="terms">
                      I have read and agree with the
                      <Link
                        onClick={() => setOpenModal(true)}
                        className="text-blue-500 hover:underline hover:text-blue-600"
                      >
                        {" "}
                        privacy statement
                      </Link>
                    </Label>
                  </div>

                  {errorMessage && (
                    <Alert className="mt-5" color="failure">
                      {errorMessage}
                    </Alert>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    theme={customButtonTheme}
                    color="signup"
                    type="submit"
                    disabled={!isChecked}
                  >
                    <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                      Submit
                    </span>
                  </Button>
                </div>
              </form>
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
              <Modal.Header>Privacy Agreement</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union
                    enacts new consumer privacy laws for its citizens, companies
                    around the world are updating their terms of service
                    agreements to comply.
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation
                    (G.D.P.R.) goes into effect on May 25 and is meant to ensure
                    a common set of data rights in the European Union. It
                    requires organizations to notify users as soon as possible
                    of high-risk data breaches that could personally affect
                    them.
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleAgree}>I accept</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  Decline
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
