"use client";

import useSWR from "swr";
import React from "react";
import { RiEditBoxLine } from "react-icons/ri";
import Link from "next/link";
import Spinner from "@/app/components/spinner";
import ViewDetailsDialog from "@/app/dashboard/components/viewDetailsDialog";
import DeleteStudentDialog from "@/app/dashboard/components/deleteDialog";

export default function Dashboard() {
  const { data, isLoading, error } = useSWR("/api/student", async (url) => {
    const response = await fetch(url);
    return (await response.json()) as StudentInterfaceForDb[];
  });

  return (
    <div className={"min-h-screen my-10 mx-7"}>
      <h1 className="text-6xl mb-5 font-bold text-center">Students</h1>
      {isLoading && (
        <div className="text-center">
          <Spinner color={"indigo-500"} size={"md"} />
        </div>
      )}
      {error && <div className={"text-red-500"}>Error loading data</div>}
      {data && <StudentTable student={data} />}
    </div>
  );
}

interface StudentTableProps {
  student: StudentInterfaceForDb[];
}

const StudentTable = ({ student }: StudentTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider"
            >
              Phone
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider"
            >
              City
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {student.map((student) => (
            <tr key={student._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {student.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.city}
              </td>
              <td>
                <div
                  className={
                    "flex space-x-4  text-indigo-600 font-medium text-md hover:cursor-pointer"
                  }
                >
                  <ViewDetailsDialog student={student} />
                  <Link href={`/dashboard/student/${student._id}`}>
                    <RiEditBoxLine />
                  </Link>
                  <DeleteStudentDialog student={student} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
