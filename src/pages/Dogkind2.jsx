import '../css/input.css'
import React from 'react';

const Dogkind2 = ({ options, onSelect }) => {

    // 마이페이지 개견 종류 정보 수정

  return (
    <select className="dogkind-select2" onChange={(e) => onSelect(e.target.value)}>
      <option value="">견종을 선택하세요</option>
      {options.map((option) => (
        <option key={option.value} value={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dogkind2;