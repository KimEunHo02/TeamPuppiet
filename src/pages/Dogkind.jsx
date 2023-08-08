const Dogkind = ({ options, onSelect }) => {
  return (
    <select className="dogkind-select" onChange={(e) => onSelect(e.target.value)}>
      <option value="">견종을 선택하세요</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dogkind;