import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
} from "@fortawesome/free-solid-svg-icons";

import type { RootState, AppDispatch } from "@/store";

import { updateSelectedStyle } from "@/store/slices/builderSlice";

export default function HeadingEditor({
  componentId,
  isDraft,
}: {
  componentId: string;
  isDraft: boolean;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const { rootOrder, nodes, ui } = useSelector(
    (state: RootState) => state.builderSlice
  );

  const styles = isDraft ? ui.draft?.styles : nodes[componentId].styles;

  console.log(styles);

  return (
    <>
      {/* {componentId} */}
      <h2>Allign Heading</h2>
      <div className="mt-4 flex gap-7 items-center">
        {styles && styles.textAlign === "left" ? (
          <div className="bg-[#FF7A00] text-white p-2 rounded">
            <FontAwesomeIcon icon={faAlignLeft} size="2x" />
          </div>
        ) : (
          <FontAwesomeIcon
            icon={faAlignLeft}
            size="2x"
            onClick={() =>
              dispatch(updateSelectedStyle({ key: "textAlign", value: "left" }))
            }
            className="cursor-pointer"
          />
        )}
        {styles && styles.textAlign === "center" ? (
          <div className="bg-[#FF7A00] text-white p-2 rounded">
            <FontAwesomeIcon icon={faAlignCenter} size="2x" />
          </div>
        ) : (
          <FontAwesomeIcon
            icon={faAlignCenter}
            size="2x"
            onClick={() =>
              dispatch(
                updateSelectedStyle({ key: "textAlign", value: "center" })
              )
            }
            className="cursor-pointer"
          />
        )}
        {styles && styles.textAlign === "right" ? (
          <div className="bg-[#FF7A00] text-white p-2 rounded">
            <FontAwesomeIcon icon={faAlignRight} size="2x" />
          </div>
        ) : (
          <FontAwesomeIcon
            icon={faAlignRight}
            size="2x"
            onClick={() =>
              dispatch(
                updateSelectedStyle({ key: "textAlign", value: "right" })
              )
            }
            className="cursor-pointer"
          />
        )}
      </div>
    </>
  );
}
