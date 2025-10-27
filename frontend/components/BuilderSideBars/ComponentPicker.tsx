import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import type { RootState, AppDispatch } from "@/store";
import {
  closeComponentPicker,
  startHeadingDraft,
  startParagraphDraft,
  startTableDraft,
  startListDraft,
} from "@/store/slices/builderSlice";

import HIcon from "@/public/assets/heading-01.svg";
import PIcon from "@/public/assets/pilcrow-01.svg";
import TableIcon from "@/public/assets/table.svg";
import LIcon from "@/public/assets/LIcon.svg";
import ImageIcon from "@/public/assets/image-01.svg";
import VideoIcon from "@/public/assets/play-circle.svg";

export default function ComponentPicker() {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const parentId = ui.leftBar.tab === "component" ? ui.leftBar.parentId : null;

  const handleBackToLayout = () => {
    dispatch(closeComponentPicker());
  };

  const handleHeadingDraft = () => {
    dispatch(startHeadingDraft({ parentId }));
  };

  const handleParagraphDraft = () => {
    dispatch(startParagraphDraft({ parentId }));
  };

  const handleTableDraft = () => {
    dispatch(startTableDraft({ parentId }));
  };

  const handleListDraft = () => {
    dispatch(startListDraft({ parentId }));
  };

  return (
    <div className="w-[260px] border-r border-[#E9EAEB] p-4">
      <div className="flex items-center gap-4 border-b border-b-[#E9EAEB] pb-3">
        <FontAwesomeIcon
          onClick={handleBackToLayout}
          icon={faArrowLeft}
          size="1x"
          className="cursor-pointer"
        />
        <div className="text-[16px] font-[500]">Pick Component</div>
      </div>
      <div className="my-3 font-[600] text-[16px]">Text</div>
      <div className="grid grid-cols-2 gap-4 pb-5 border-b border-b-[#E9EAEB]">
        <div>
          <div
            onClick={handleHeadingDraft}
            className="h-[86px] w-[109px] bg-gray-200 flex justify-center items-center rounded-2xl cursor-pointer"
          >
            <HIcon className="w-6 h-6 text-black" />
          </div>
          <div className="mt-1 text-[14px]">Heading</div>
        </div>
        <div>
          <div
            onClick={handleParagraphDraft}
            className="h-[86px] w-[109px] bg-gray-200 flex justify-center items-center rounded-2xl cursor-pointer"
          >
            <PIcon className="w-6 h-6 text-black" />
          </div>
          <div className="mt-1 text-[14px]">Paragraph</div>
        </div>
        <div>
          <div
            onClick={handleTableDraft}
            className="h-[86px] w-[109px] bg-gray-200 flex justify-center items-center rounded-2xl cursor-pointer"
          >
            <TableIcon className="w-6 h-6 text-black" />
          </div>
          <div className="mt-1 text-[14px]">Table</div>
        </div>
        <div>
          <div
            onClick={handleListDraft}
            className="h-[86px] w-[109px] bg-gray-200 flex justify-center items-center rounded-2xl cursor-pointer"
          >
            <LIcon className="w-8 h-8 text-black" />
          </div>
          <div className="mt-1 text-[14px]">List</div>
        </div>
      </div>
      <div className="my-3 font-[600] text-[16px] mt-5">Media</div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="h-[86px] w-[109px] bg-gray-200 flex justify-center items-center rounded-2xl cursor-pointer">
            <ImageIcon className="w-6 h-6 text-black" />
          </div>
          <div className="mt-1 text-[14px]">Image</div>
        </div>
        <div>
          <div className="h-[86px] w-[109px] bg-gray-200 flex justify-center items-center rounded-2xl cursor-pointer">
            <VideoIcon className="w-6 h-6 text-black" />
          </div>
          <div className="mt-1 text-[14px]">Video</div>
        </div>
      </div>
    </div>
  );
}
