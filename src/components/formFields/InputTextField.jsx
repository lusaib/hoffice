import { tailwindCj } from "../../utils";
import { CircularProgress } from "../widgets";

/**
 * @author Lusaib Latheef
 * @description The input text field component to handle the showing of the text field
 */
export default function InputTextField({
  error,
  endIconButton,
  helperText,
  disableHelperText = false,
  helperTextClassNames = "",
  loading = false,
  className = "",
  outerDivClassName = "",
  ...rest
}) {
  const str = "w-full h-full";

  return (
    <div className={tailwindCj(str, outerDivClassName)}>
      <div className="relative inline-block w-full h-full border-box">
        <input
          {...rest}
          className={tailwindCj(
            `outline-none box-border w-full h-full bg-surface-bg border-[1px] border-surface-border rounded-sm px-[1rem] py-[0.625rem] text-[1rem] font-normal leading-[1.25rem] placeholder-onSurface-tertiary hover:border-onSurface-secondary hover:placeholder-onSurface-secondary active:border-onSurface-secondary active:placeholder-onSurface focus:border-onSurface-secondary focus:placeholder-onSurface`,
            {
              "border-error placeholder-error text-error focus:border-error focus:placeholder-error":
                error,
            },
            className
          )}
          style={{
            height: "100%",
          }}
        />
        {loading && focus?.value && (
          <div className="absolute right-0 top-[12px]">
            <CircularProgress size="small" />
          </div>
        )}
        {endIconButton && (
          <span
            className={`absolute transform -translate-y-[40%] flex items-center justify-center`}
          >
            {endIconButton}
          </span>
        )}
      </div>
      <div
        id={`${rest?.id}_input_helper_text`}
        className={tailwindCj(
          `w-full text-error text-right font-[400] text-base min-h-[25px] h-auto break-normal`,
          {
            hidden: disableHelperText,
          },
          helperTextClassNames
        )}
      >
        {helperText}
      </div>
    </div>
  );
}
