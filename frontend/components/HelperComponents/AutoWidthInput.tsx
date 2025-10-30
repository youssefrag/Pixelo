import { useRef, useEffect, useState } from "react";

export default function AutoWidthInput({
  value,
  onChange,
  onKeyDown,
  onBlur,
}: any) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState(1);

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 10);
    }
  }, [value]);

  return (
    <div className="inline-flex items-center">
      <span
        ref={spanRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "pre",
          font: "inherit",
          padding: "0 8px",
        }}
      >
        {value || " "}
      </span>

      <input
        autoFocus
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        style={{
          width: `${inputWidth}px`,
          font: "inherit",
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "4px 8px",
          backgroundColor: "transparent",
          outline: "none",
          transition: "width 0.1s ease",
        }}
      />
    </div>
  );
}
