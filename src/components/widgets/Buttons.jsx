//button styles
import { tailwindCj } from "../../utils";
import { DotsLoader } from "./Loadings";

/**
 * @author Lusaib Latheef
 * @description The primary button component which has primary color and effects.
 */
export function PrimaryButton(props) {
  const { children, className, loading, disabled, ...rest } = props;

  //default button class properties
  return (
    <button
      {...rest}
      disabled={loading || disabled}
      className={tailwindCj(
        `btn w-auto bg-primary rounded-sm not-italic font-semibold text-base leading-4 text-center text-font-secondary disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-primary-disabled hover:bg-primary-hover border-none`,
        className
      )}
    >
      {loading ? <DotsLoader /> : children}
    </button>
  );
}

/**
 * @author Lusaib Latheef
 * @description The primary button component which has secondary color and affects.
 */
export function SecondayButton(props) {
  const { children, className, loading, disabled, ...rest } = props;

  return (
    <button
      {...rest}
      disabled={loading || disabled}
      className={tailwindCj(
        `btn w-auto border-[1px] border-surface-border rounded-sm not-italic font-semibold text-base leading-4 text-center text-font-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-secondary-disabled hover:bg-secondary-variant `,
        className
      )}
    >
      {loading ? <DotsLoader /> : children}
    </button>
  );
}

/**
 * @author Lusaib Latheef
 * @description The Icon button component to handle the showing of the icon button.
 */
export function IconButton(props) {
  const { children, className, badgeContent, onClick, ...rest } = props;

  const handleClick = (e) => {
    onClick?.(e);
  };

  return (
    <div className="relative inline-flex">
      <button
        className={tailwindCj(
          `btn btn-circle relative overflow-hidden bg-white hover:bg-gray-100 text-black font-bold rounded disabled:cursor-not-allowed border-[0.5px] border-surface-border`,
          className
        )}
        {...rest}
        onClick={handleClick}
      >
        {children}
      </button>

      {/* Badge Content */}
      {badgeContent && (
        <div className="absolute -top-0 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
          {badgeContent}
        </div>
      )}
    </div>
  );
}
