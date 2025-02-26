import { tailwindCj } from "../../utils";

/**
 * @author Lusaib Latheef
 * @description The input text are component to handle the show of
 */
export default function InputTextArea({
  error,
  className,
  outerClassName = "",
  endIconButton,
  helperText,
  disableHelperText = false,
  helperTextClassNames = "",
  ...rest
}) {
  return (
    <div className={tailwindCj("w-full h-full", outerClassName)}>
      <div className="relative">
        <textarea
          {...rest}
          className={tailwindCj(
            `break-normal outline-none box-border w-full h-full bg-surface-bg border-[1px] border-surface-border rounded-sm textarea text-base font-normal placeholder-onSurface-tertiary  hover:border-onSurface-secondary hover:placeholder-onSurface-secondary active:border-onSurface-secondary active:placeholder-onSurface focus:border-onSurface-secondary focus:placeholder-onSurface `,
            {
              "border-error placeholder-error focus:border-error text-error focus:placeholder-error":
                error,
            },
            className
          )}
        />
        {endIconButton && (
          <span className="absolute top-[40%] right-3 transform -translate-y-1/2 flex items-center justify-center">
            {endIconButton}
          </span>
        )}
      </div>
      <div
        id={`${rest?.id}_input_text_area_helper_text`}
        className={tailwindCj(
          `w-full text-error text-right font-[400] text-base min-h-[25px] h-auto ${
            disableHelperText ? "hidden" : ""
          }`,
          helperTextClassNames
        )}
      >
        {helperText}
      </div>
    </div>
  );
}
