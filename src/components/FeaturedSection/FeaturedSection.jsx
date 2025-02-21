import React from "react";
import PropTypes from "prop-types";

const FeaturedSection = ({ children }) => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-500 py-16">
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
};

export default FeaturedSection;
