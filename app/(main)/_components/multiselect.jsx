import React, { useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';

export default function MultiSelectGroup() {
  const [selectedCities, setSelectedCities] = useState(null);
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];

  return (
    <div className="bg-red-100 p-[5rem] border-1 mb-[1rem] flex justify-content-center">
      <MultiSelect
        value={selectedCities}
        onChange={(e) => setSelectedCities(e.value)}
        options={cities}
        optionLabel="name"
        placeholder="Select Cities"
        maxSelectedLabels={3}
        className="w-full md:w-20rem"
      />
    </div>
  );
}
