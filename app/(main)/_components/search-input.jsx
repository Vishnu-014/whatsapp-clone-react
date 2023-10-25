'use client';

import React from 'react';

const SearchInput = () => {
  return (
    <input
      type="text"
      className="bg-[#202C33] flex-1 rounded-md py-1 placeholder:text-xs pl-2 focus:ring-0 outline-none text-white text-sm"
      placeholder="Search or start new chat"
    />
  );
};

export default SearchInput;
