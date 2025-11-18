import { AppDispatch, RootState } from "@/store";
import { updateSelectedStyle } from "@/store/slices/builderSlice";
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

  console.log(styles?.borderRadius);

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
    </>
  );
}
