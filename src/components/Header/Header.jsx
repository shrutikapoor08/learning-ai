import React from "react";
import { Link } from "@tanstack/react-router";

const Header = () => {
  return (
    <header className="text-white mb-8">
      <h1 className="text-4xl sm:text-6xl font-bold mb-4">
        Find Your Dream Home in Seattle
      </h1>
      <p className="text-xl opacity-90">
        Search through thousands of listings using plain English
      </p>
    </header>
  );
};

export default Header;
