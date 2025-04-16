import React from "react";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Search, Sparkles } from "lucide-react";

const SearchBar = ({ value, onChange, onSearch, onFillDescription }) => {
  return (
    <form onSubmit={onSearch} className="w-full max-w-4xl mx-auto">
      <div className="relative mx-auto mt-8">
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Looking for a 3 bedroom house in Seattle in the starting range of 1000000 to 21000000 for sale"
            className="w-full px-4 py-4 pr-12 text-gray-800 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
          />
          <Button
            type="submit"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-800 hover:text-gray-700 hover:bg-transparent"
            disabled={!value}
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={onFillDescription}
          className="flex items-center gap-2 text-white mx-auto hover:outline-white mt-8 text-md"
        >
          <Sparkles className="w-4 h-4" />
          <span>Try an example search</span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
