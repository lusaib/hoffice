import Instagram from "../../assets/social-media-icons/instagram.svg";
import FaceBook from "../../assets/social-media-icons/facebook.svg";
import Linkedin from "../../assets/social-media-icons/linkedin.svg";
import TwitterX from "../../assets/social-media-icons/twitterX.svg";

/**
 * @author Lusaib Latheef
 * @description The social media link section of the page.
 */
export default function SocialMediaLinkSection() {
  return (
    <div className="flex items-center space-x-4 mt-[2.2rem] lg:pl-[7%] absolute bottom-[4vh] xl:w-[57.5%] lg:w-[56%] md:w-[70%] md:bottom-[5vh] md:pl-[8%] sm:pl-[15%] max-md:w-[85%] pl-[5%] max-sm:w-[95%]">
      {/* Left Section with Text and Icons */}
      <div className="flex items-center space-x-4 ">
        <p className="text-base text-[#565656] max-[400px]:truncate">
          Follow us for more updates
        </p>
        <img
          src={Linkedin}
          alt="LinkedIn"
          className="w-4 h-4 cursor-pointer hover:text-blue-500"
        />
        <img
          src={TwitterX}
          alt="TwitterX"
          className="w-4 h-4 cursor-pointer hover:text-red-500"
        />
        <img
          src={FaceBook}
          alt="Facebook"
          className="w-4 h-4 cursor-pointer hover:text-blue-600"
        />
        <img
          src={Instagram}
          alt="Instagram"
          className="w-4 h-4 cursor-pointer hover:text-pink-500"
        />
      </div>

      {/* Divider Line */}
      <div className="flex-grow h-[0.5px] bg-black max-[400px]:hidden"></div>
    </div>
  );
}
