interface TricolorDividerProps {
  orientation?: "horizontal" | "vertical";
  thickness?: number;
  className?: string;
}

export function TricolorDivider({
  orientation = "horizontal",
  thickness = 4,
  className = "",
}: TricolorDividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={`flex flex-col ${className}`}
        style={{ width: `${thickness}px` }}
      >
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-india-green" />
      </div>
    );
  }

  return (
    <div
      className={`flex ${className}`}
      style={{ height: `${thickness}px` }}
    >
      <div className="flex-1 bg-saffron" />
      <div className="flex-1 bg-white" />
      <div className="flex-1 bg-india-green" />
    </div>
  );
}
