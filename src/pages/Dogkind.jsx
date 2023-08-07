import React, { useState } from 'react';

const Dogkind = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDogkind = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={`dogkind ${isOpen ? 'open' : ''}`}>
      <button className="dogkind-toggle" onClick={toggleDogkind}>
        {selectedOption ? selectedOption.label : '견종을 선택하세요'}
      </button>
      <div className={`dogkind-list ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <ul>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                className="dogkind-item"
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dogkind;