import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface DropdownProps {
  label: string;
  options: { label: string; value: string | number }[];
  initialValue?: string | number;
  onValueChange?: (value: string | number) => void;
  [rest: string]: any; // For additional props like `variant`, `margin`, etc.
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, initialValue = '', onValueChange, ...rest }) => {
  const [selectedValue, setSelectedValue] = useState<string | number>(initialValue);

  const handleDropdownChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string | number;
    setSelectedValue(value);
    if (onValueChange) {
      onValueChange(value); // Notify parent component (if necessary)
    }
  };

  return (
    <FormControl {...rest}>
      <InputLabel>{label}</InputLabel>
      <Select value={String(selectedValue)} onChange={handleDropdownChange} label={label}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
