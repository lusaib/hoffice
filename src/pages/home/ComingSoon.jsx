import LeftPartComponent from "./LeftPartComponent";
import RightImagePart from "./RightImagePart";
import SocialMediaLinkSection from "./SocialMediaLinkSection";

/**
 * @author Lusaib Latheef
 * @description The coming soon page to show a waitlist of the application.
 */
export default function ComingSoon() {
  return (
    <>
      <div className="size-full flex flex-row overflow-hidden">
        <LeftPartComponent />
        <RightImagePart />
      </div>
      <SocialMediaLinkSection />
    </>
  );
}
