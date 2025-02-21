import React from "react";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Search, Sparkles } from "lucide-react";

const SearchBar = ({ value, onChange, onSearch, onFillDescription }) => {
  return (
    <form onSubmit={onSearch} className="w-full max-w-3xl mx-auto">
      <div className="relative flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Try: 'Looking for a 3 bedroom house in Seattle under 1.5 million'"
            className="w-full px-4 py-4 text-gray-900 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            disabled={!value}
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={onFillDescription}
          className="flex items-center gap-2 self-start"
        >
          <Sparkles className="w-4 h-4" />
          <span>Try an example search</span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
