import React, { Fragment, useState } from "react";
import { mutate } from "swr";
import { FaTrashAlt } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import Spinner from "@/app/components/spinner";

interface DeleteDialogProps {
  student: StudentInterfaceForDb;
}

export default function DeleteStudentDialog({ student }: DeleteDialogProps) {
  // The open/closed state lives outside the `Dialog` and is managed by you
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const deleteStudent = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/student?id=${student._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // invalidate the previous data and re-fetch the data and close the modal
        await mutate("/api/student");
        closeModal();
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting student");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <FaTrashAlt className={"text-red-500"} onClick={openModal} />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Student
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete{" "}
                      <span
                        className={
                          "font-bold font-mono text-bold text-xl text-gray-700"
                        }
                      >
                        {student.name}
                      </span>
                      . This action is irreversible.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      disabled={isSubmitting}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent
                      bg-red-500 px-2 py-1 text-sm font-medium text-white hover:bg-red-600
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500
                        focus-visible:ring-offset-2
                        disabled:cursor-no-drop
                        disabled:opacity-70
                        "
                      onClick={deleteStudent}
                    >
                      {isSubmitting ? <Spinner /> : "Delete"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
