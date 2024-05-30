import React, { Fragment, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { Dialog, Transition } from "@headlessui/react";
import { TableRow } from "@/app/dashboard/components/tableRow";

export interface ViewDetailsDialog {
  student: StudentInterfaceForDb;
}

export default function ViewDetailsDialog(props: ViewDetailsDialog) {
  const { student } = props;
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);

  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <FaEye onClick={openDialog} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDialog}>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Student Details
                  </Dialog.Title>
                  <div className="mt-2 text-gray-400">
                    <table>
                      <tbody>
                        <TableRow name={"Name"} value={student.name} />
                        <TableRow
                          name={"Father Name"}
                          value={student.fatherName}
                        />
                        <TableRow
                          name={"Joining Date"}
                          value={student.joiningDate}
                        />
                        <TableRow name={"Email"} value={student.email} />
                        <TableRow name={"Phone"} value={student.phone} />
                        <TableRow
                          name={"Address"}
                          value={`${student.address}, ${student.city}, ${student.state}, ${student.pincode}`}
                        />
                        <TableRow name={"City"} value={student.city} />
                        <TableRow name={"Date of Birth"} value={student.dob} />
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent
                      bg-red-500 px-2 py-1 text-sm font-medium text-white hover:bg-red-600
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500
                        focus-visible:ring-offset-2
                        disabled:cursor-no-drop
                        disabled:opacity-70
                        "
                      onClick={closeDialog}
                    >
                      Close
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
