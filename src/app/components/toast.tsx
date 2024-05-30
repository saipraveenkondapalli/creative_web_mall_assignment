import React, { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

interface ToastProps {
  message: string;
  type: "error" | "success";
}

function Toast({ message, type }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, [message, type]);

  return (
    <Transition
      show={visible}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`fixed top-20 right-0 m-6 ${
          type === "error" ? "bg-red-500" : "bg-green-500"
        } text-white px-4 py-2 rounded shadow-lg`}
      >
        {message}
      </div>
    </Transition>
  );
}

export default Toast;
