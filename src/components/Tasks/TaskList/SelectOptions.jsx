import { Select, MenuItem } from "@mui/material";

const SelectOptions = ({ selectValue, onChangeHandler, menuItems }) => {
  return (
    <Select
      value={selectValue}
      onChange={onChangeHandler}
      label="Select Option"
      name="select-option"
    >
      {menuItems.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectOptions;
