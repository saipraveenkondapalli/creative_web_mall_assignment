import React from "react";

export const TableRow = ({ name, value }: { name: string; value: string }) => {
  return (
    <tr>
      <td className={"px-4 py-2 text-sm font-medium text-black"}>{name}</td>
      <td className={"px-4 py-2 text-sm font-medium text-gray-500"}>{value}</td>
    </tr>
  );
};
