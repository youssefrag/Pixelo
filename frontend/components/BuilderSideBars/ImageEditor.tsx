import { isImageDraft } from "@/helpers/type-helpers";
import { AppDispatch, RootState } from "@/store";
import {
  deleteComponent,
  saveComponentDraft,
  select,
  updateSelectedStyle,
} from "@/store/slices/builderSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ImageEditor({ componentId }: { componentId: string }) {
  const dispatch = useDispatch<AppDispatch>();

  const { ui } = useSelector((state: RootState) => state.builderSlice);

  const styles = ui.draft?.styles;

  const parentId = ui.draft?.targetParentId;

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSelectedStyle({ key: "widthPct", value: e.target.value }));
  };

  const handleBorderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateSelectedStyle({ key: "borderRadius", value: e.target.value })
    );
  };

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSelectedStyle({ key: "brightness", value: e.target.value }));
  };

  const handleSaveImage = () => {
    if (!isImageDraft(ui.draft)) return;

    dispatch(
      saveComponentDraft({
        id: componentId,
        kind: "image",
        parentId: parentId ?? "",
        styles: styles ?? {},
        props: { ...ui.draft.props },
      })
    );
    dispatch(select(ui.draft.targetParentId));
  };

  const handleDeleteImage = () => {
    dispatch(deleteComponent({ id: componentId }));
  };

  return (
    <>
      <div>
        <label className="font-medium text-gray-700">
          Width: {styles?.widthPct}%
        </label>
        <input
          type="range"
          min={10}
          max={100}
          step={10}
          value={styles?.widthPct ?? 80}
          onChange={handleWidthChange}
          className="w-full accent-gray-700 cursor-pointer"
        />
      </div>
      <div className="mt-4">
        <label className="font-medium text-gray-700">
          Border Radius: {styles?.borderRadius}%
        </label>
        <input
          type="range"
          min={0}
          max={50}
          step={10}
          value={styles?.borderRadius ?? 0}
          onChange={handleBorderChange}
          className="w-full accent-gray-700 cursor-pointer"
        />
      </div>
      <div className="mt-4">
        <label className="font-medium text-gray-700">
          Brightness: {styles?.brightness}%
        </label>
        <input
          type="range"
          min={30}
          max={100}
          step={10}
          value={styles?.brightness ?? 100}
          onChange={handleBrightnessChange}
          className="w-full accent-gray-700 cursor-pointer"
        />
      </div>
      <div className="mt-4 flex justify-around">
        <button
          onClick={handleSaveImage}
          className="bg-[#FF7A00] px-6 py-3 rounded-md text-white cursor-pointer"
        >
          Save
        </button>
        <button onClick={handleDeleteImage} className="cursor-pointer">
          Delete
        </button>
      </div>
    </>
  );
}
