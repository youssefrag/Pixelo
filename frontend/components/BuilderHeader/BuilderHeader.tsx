import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye } from "@fortawesome/free-solid-svg-icons";

export default function BuilderHeader() {
  return (
    <div className="h-[66px] w-full flex justify-between items-center px-[50px] border-b border-[#E9EAEB]">
      <div className="flex items-center gap-4">
        <FontAwesomeIcon icon={faArrowLeft} size="1x" />
        <div className="text-[20px] font-[500]">Canvas</div>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-[20px] py-[12px] rounded-full bg-black text-white font-[600] text-[14px] cursor-pointer flex gap-2 items-center">
          Preview
          <FontAwesomeIcon icon={faEye} />
        </button>
        <button className="bg-[#FF7A00] px-[20px] py-[12px] rounded-full text-white font-[600] text-[14px] cursor-pointer">
          Publish
        </button>
      </div>
    </div>
  );
}
