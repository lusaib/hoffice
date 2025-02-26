import { useMemo } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Select from "react-select";
import { tailwindCj } from "../../utils";

/**
 * @author Lusaib Latheef
 * @description The dropdown component .
 */
export default function Dropdown({
  options,
  helperText,
  disableHelperText = false,
  placeholder,
  styles,
  onChange,
  error,
  outerDivClass,
  value,
  enableObjectReturn = false,
  onInputChange,
  loading = false,
  ...rest
}) {
  const customDropdownIndicator = ({ innerProps, isFocused }) => {
    return (
      <div
        {...innerProps}
        style={{
          color: error ? "var(--color-error)" : "var(--color-surface-border)",
          paddingRight: "15px",
          height: "35px",
          width: "35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isFocused ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    );
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "100%",
      height: "100%",
      fontSize: "var(--text-base)",
      lineHeight: "var(--text-base--line-height)",
      fontStyle: "normal",
      fontWeight: 400,
      "&:before": {
        content: "none",
      },
      "&:hover": {
        borderColor: "black",
      },
      boxShadow: 0,
      paddingLeft: "4px",
      borderColor: state.isFocused
        ? "black"
        : error
        ? "var(--color-error)"
        : "var(--color-surface-border)",
    }),
    indicatorSeparator: () => ({
      display: "none", // Hide the vertical divider
    }),
    placeholder: (provided) => ({
      ...provided,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: error ? "var(--color-error)" : "#ababab",
      fontSize: "var(--text-base)",
      lineHeight: "var(--text-base--line-height)",
    }),
    menu: (provided) => ({
      ...provided,
      width: "100%",
      zIndex: "var(--z-index-dropdown)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
      "&:hover": {
        backgroundColor: "var(--color-primary-hover)",
        color: "white",
      },
      ...(state.data?.style || {}),
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#666666",
      paddingRight: "22px",
      height: "40px",
      width: "43px",
      display: "flex",
      alignItems: "center", // Align vertically center
      justifyContent: "center",
    }),
  };

  const dropdownIndicator = {
    color: "#666666",
    paddingRight: "22px",
    height: "40px",
    width: "43px",
    display: "flex",
    alignItems: "center", // Align vertically center
    justifyContent: "center",
  };

  const component = useMemo(() => {
    const list = {
      DropdownIndicator: customDropdownIndicator,
    };
    return list;
  }, []);

  return (
    <div className={tailwindCj("w-full h-full", outerDivClass)}>
      {/* relative */}
      <Select
        {...rest}
        value={
          options?.find(function (option) {
            return option?.value === value;
          }) || ""
        }
        options={options}
        placeholder={placeholder}
        styles={{
          ...customStyles,
          ...styles,
          dropdownIndicator: (provided) => ({
            ...provided,
            ...dropdownIndicator,
            color: error ? "var(--color-error)" : "#666666",
          }),
        }}
        onInputChange={(e, actionMeta) => {
          if (actionMeta.action === "input-change") {
            onInputChange?.(e);
          }
        }}
        onChange={(e) => {
          if (rest.isClearable && !e && rest.defaultValue)
            return onChange(rest.defaultValue);
          enableObjectReturn ? onChange(e) : onChange(e?.value);
        }}
        components={component}
        menuShouldScrollIntoView={false}
        isLoading={loading}
      />
      <div
        id={`${rest?.id}_dropdown_helper_text`}
        className={`w-full text-error text-right font-[400] text-base min-h-[25px] ${
          disableHelperText ? "hidden" : ""
        }`}
      >
        {helperText}
      </div>
    </div>
  );
}
