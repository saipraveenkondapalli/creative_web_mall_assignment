import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white font-light text-center py-4">
      <p>© {year} Creative web assignment by Sai Praveen</p>
    </footer>
  );
}

export default Footer;
