import { useFormik } from "formik";
import MainLogo from "../../assets/main-logo.svg";
import { InputTextField, SecondayButton } from "../../components";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useState } from "react";

/**
 * @author Lusaib Latheef
 * @description The left part of the waitlist page for entering the mail and providing other informations.
 */
export default function LeftPartComponent() {
  const [loading, setLoading] = useState(false);

  // Function to mimic API call with delay
  const fakeApiCall = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("API call completed");
      }, 3000); // 3-second delay
    });
  };

  //
  const onJoinWaitlistClick = async () => {
    if (formik.errors.waitlistEmail) {
      return toast.error(formik.errors.waitlistEmail);
    } else if (!formik.values.waitlistEmail) {
      return toast.error("Please enter any email!");
    } else if (!formik.values.acceptTermsAndConditions) {
      return toast.error("Please accept our terms and conditions!");
    }
    setLoading(true);

    try {
      // Mimic API call
      await fakeApiCall();
      toast.success("Thanks for sharing your email");
      formik.resetForm();
    } finally {
      setLoading(false);
    }
  };

  //formik handler
  const formik = useFormik({
    initialValues: {
      waitlistEmail: "",
      acceptTermsAndConditions: false,
    },
    onSubmit: onJoinWaitlistClick,
    validationSchema: Yup.object({
      waitlistEmail: Yup.string()
        .email("Invalid email address!")
        .required("Need a valid email to enter here"),
    }),
  });

  return (
    <section className="h-screen flex items-center justify-center flex-col lg:w-1/2 w-full">
      <div id="text-field-box" className="flex flex-col w-[70%] max-sm:w-[90%]">
        <img
          className="w-[14.8rem] h-[4.1rem] object-contain"
          alt="hoffice-logo"
          src={MainLogo}
        />
        <h1 className="mt-[3rem] text-font-primary text-5xl leading-tight xl:text-7xl xl:leading-[5rem]">
          <span className="block max-lg:inline">We&apos;re Saving</span>{" "}
          <span className="block max-lg:inline">You a Seat..</span>
        </h1>

        <p className="mt-4 text-lg leading-[1.7rem] text-[#565656] line-clamp-3">
          <span className="block max-lg:inline">
            Be the first to know about launch updates.
          </span>{" "}
          <span className="block max-lg:inline">
            Reserve your spot in our coworking space.Stay updated on exclusive
            promotions and events.
          </span>{" "}
        </p>
        <div className="flex flex-row w-full items-center justify-between mt-[3rem] gap-3 max-[400px]:flex-col">
          <InputTextField
            id="waitlistEmail"
            name="waitlistEmail"
            disableHelperText={true}
            placeholder="Enter your email"
            outerDivClassName="flex-[1] h-[3rem]"
            className="rounded-sm border-[#757575]! border-[1px]"
            value={formik.values.waitlistEmail}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          <SecondayButton
            loading={loading}
            onClick={onJoinWaitlistClick}
            type="button"
            className="max-[400px]:w-full w-[35%] h-[3rem] text-font-secondary text-sm tracking-[2.5px] bg-secondary hover:bg-secondary-variant disabled:bg-secondary! disabled:text-font-secondary"
          >
            Join the Waitlist
          </SecondayButton>
        </div>
        <div className="mt-[1rem] flex flex-row gap-2 text-sm text-[#A6A6A6] mb-5">
          <input
            id="acceptTermsAndConditions"
            name="acceptTermsAndConditions"
            type="checkbox"
            checked={formik.values.acceptTermsAndConditions}
            onChange={formik.handleChange}
          />
          <span
            className="truncate  max-[500px]:whitespace-normal max-[400px]:line-clamp-2"
            title={
              " By checking this box,you confirm that you agree to recieve all the future updates"
            }
          >
            By checking this box,you confirm that you agree to recieve all the
            future updates
          </span>
        </div>
      </div>
    </section>
  );
}
