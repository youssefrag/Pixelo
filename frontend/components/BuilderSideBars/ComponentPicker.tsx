import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import type { RootState, AppDispatch } from "@/store";
import { closeComponentPicker } from "@/store/slices/builderSlice";

export default function ComponentPicker() {
  const dispatch = useDispatch<AppDispatch>();

  const handleBackToLayout = () => {
    dispatch(closeComponentPicker());
  };

  return (
    <div className="w-[260px] border-r border-[#E9EAEB] p-4">
      <div className="flex items-center gap-4">
        <FontAwesomeIcon
          onClick={handleBackToLayout}
          icon={faArrowLeft}
          size="1x"
          className="cursor-pointer"
        />
        <div className="text-[16px] font-[500]">Pick Component</div>
      </div>
    </div>
  );
}
