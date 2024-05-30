"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { PostOfficeApiResponse } from "@/types/PostOffice.types";
import { Form, Formik } from "formik";
import Spinner from "@/app/components/spinner";
import { useRouter } from "next/navigation";

interface StudentFormProps {
  student?: StudentInterfaceForDb;
}

interface MessageProps {
  color: "text-red-500" | "text-green-500";
  message: string;
}

function StudentForm(props: StudentFormProps) {
  const { student } = props;
  const today = new Date().toISOString().split("T")[0];
  const [message, setMessage] = useState<MessageProps>();
  const [pincode, setPincode] = React.useState<string>();
  const router = useRouter();
  const initialData: StudentInterfaceForDb | Student = student
    ? student
    : {
        name: "",
        fatherName: "",
        dob: "",
        email: "",
        phone: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        joiningDate: today,
      };

  const { data, isLoading, error } = useSWR(
    "https://api.postalpincode.in/pincode/" + pincode,
    async (url) => {
      const response = await fetch(url);
      const data = ((await response.json()) as PostOfficeApiResponse[])[0];
      return data.PostOffice;
    },
  );

  const validateForm = (values: Student) => {
    const errors: { [key: string]: string } = {};
    // every values is required
    Object.keys(values).forEach((key) => {
      if (!values[key]) {
        errors[key] = "Required";
      }
    });
    // email validation
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  const handleFormSubmit = async (
    values: Student | StudentInterfaceForDb,
    {
      setSubmitting: setSubmitting,
    }: {
      setSubmitting: (value: boolean) => void;
    },
  ) => {
    setSubmitting(true);
    setMessage(undefined);
    if (student?._id) {
      await updateStudentData(values as StudentInterfaceForDb);
      return;
    }
    //   send a post request to /api/student with the student data
    else {
      const response = await fetch("/api/student", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else if (response.status === 400) {
        setMessage({
          color: "text-red-500",
          message: "Invalid student data",
        });
      } else {
        setMessage({
          color: "text-red-500",
          message: "Failed to add student. try again later.",
        });
      }
    }
    setSubmitting(false);
  };
  const updateStudentData = async (student: StudentInterfaceForDb) => {
    const response = await fetch("/api/student?id=" + student._id, {
      method: "PUT",
      body: JSON.stringify(student),
    });

    if (response.ok) {
      setMessage({
        color: "text-green-500",
        message: "Student updated successfully",
      });
    } else {
      setMessage({
        color: "text-red-500",
        message: "Failed to update student. try again later.",
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialData}
          validate={validateForm}
        >
          {({ handleChange, errors, handleBlur, values, isSubmitting }) => (
            <div className="bg-white my-10 sm:w-full md:w-1/2 mx-auto p-6 shadow-md rounded-lg">
              <h1 className={"text-center font-bold text-3xl mt-2 mb-5"}>
                {student ? "Edit" : "New"} Student Application
              </h1>
              <Form className="space-y-4">
                <div className="grid   md:grid-cols-1 gap-4">
                  <LabelForInput name={"Student Name"} for={"name"} />
                  <input
                    className="py-2 px-4 block w-full border-gray-200 border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="John Doe Jr."
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                  />
                  <DisplayErrorMessage error={errors.name} />

                  <LabelForInput name={"Father Name"} for={"fatherName"} />
                  <input
                    className="py-2 px-4 block w-full border-gray-200 border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="John Doe Sr."
                    name="fatherName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fatherName}
                  />
                  <DisplayErrorMessage error={errors.fatherName} />

                  <LabelForInput name={"Date of birth"} for={"dob"} />
                  <input
                    className="py-2 px-4 block w-full border-gray-200 border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    name="dob"
                    type={"date"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dob}
                  />
                  <DisplayErrorMessage error={errors.dob} />
                  <LabelForInput name={"Email"} for={"email"} />
                  <input
                    className="py-2 px-4 block w-full border-gray-200 border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="john.doe@example.com"
                    name="email"
                    type={"email"}
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <DisplayErrorMessage error={errors.email} />

                  <LabelForInput name={"Phone"} for={"phone"} />
                  <input
                    className="py-2 px-4 block w-full border-gray-200 border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="990-550-4342"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  <DisplayErrorMessage error={errors.phone} />

                  <LabelForInput name={"Address"} for={"address"} />
                  <input
                    className="py-2 px-4 block w-full border-gray-200 border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="D.No-00, Apartment/Block Name,  Street Name, City, District, Pincode"
                    name="address"
                    onBlur={handleBlur}
                    value={values.address}
                    onChange={handleChange}
                  />
                  <DisplayErrorMessage error={errors.address} />
                  <LabelForInput name={"Pincode"} for={"pincode"} />

                  <input
                    className="py-2 px-4 block w-full border-gray-200 border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="500007"
                    type={"number"}
                    min={0}
                    name="pincode"
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value.length === 6) {
                        setPincode(e.target.value);
                      }
                    }}
                    onBlur={handleBlur}
                    value={values.pincode}
                  />

                  {/* select with post office cities   */}

                  <DisplayErrorMessage error={errors.pincode} />
                  <div className={"flex items-center space-x-2"}>
                    <LabelForInput name={"City"} for={"city"} />
                    {isLoading && <Spinner color={"indigo-500"} size={"xsm"} />}
                  </div>

                  <select
                    name="city"
                    id="city"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                  >
                    <option value={""}>Select City</option>

                    {!isLoading &&
                      data &&
                      data.map((postOffice) => (
                        <option key={postOffice.Name} value={postOffice.Name}>
                          {postOffice.Name} - {postOffice.Block}
                        </option>
                      ))}
                  </select>

                  <DisplayErrorMessage error={errors.city} />

                  <LabelForInput name={"State"} for={"state"} />
                  <input
                    className={
                      " py-2 px-4 block w-full border-gray-200 border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    }
                    type="text"
                    name="state"
                    onChange={handleChange}
                    value={data ? data[0].State : ""}
                  />

                  <DisplayErrorMessage error={errors.state} />
                </div>

                {message && (
                  <div className={"text-center font-medium " + message.color}>
                    {message.message}
                  </div>
                )}

                <button
                  type={"submit"}
                  disabled={isSubmitting}
                  className="bg-sky-600 disabled:cursor-no-drop disabled:bg-opacity-50 focus:border-0 mt-3 rounded-full text-white w-full px-2 py-2"
                >
                  {isSubmitting ? <Spinner /> : "Save Student"}
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}

interface LabelProps {
  name: string;
  for: string;
}

const LabelForInput = (props: LabelProps) => {
  return (
    <label
      htmlFor={props.for}
      className={"block text-sm font-medium text-gray-900"}
    >
      {props.name}
    </label>
  );
};

const DisplayErrorMessage = ({ error }: { error: string | undefined }) => {
  return <>{error && <div className="text-red-500 text-sm">{error}</div>}</>;
};

export default StudentForm;
