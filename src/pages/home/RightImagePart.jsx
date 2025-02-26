import RightImage from "../../assets/coming-soon-right-image.svg";
import "./styles.css";
/**
 * @author Lusaib Latheef
 * @description The right image part
 */
export default function RightImagePart() {
  return (
    <section
      id="right-part"
      className="h-screen relative lg:w-1/2 max-lg:hidden"
    >
      <div
        className="size-full bg-bottom bg-no-repeat bg-cover max-[1200px]:bg-contain image-div"
        style={{
          backgroundImage: `url(${RightImage})`,
        }}
      />
    </section>
  );
}
