import { cn } from "../../lib/utils";

const ToolNavItem = ({
  toolType,
  icon,
  label,
  isExpanded,
  isActive,
  onClick,
}: {
  toolType: "humanizer" | "plagiarism" | "ai-detector";
  icon: React.ReactNode;
  label: string;
  isExpanded: boolean;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    className={cn(
      "flex items-center gap-3 m-auto size-10 justify-center rounded-md transition-colors w-full text-left",
      isActive
        ? "bg-indigo-50 text-indigo-700"
        : "text-gray-600 hover:bg-gray-100",
      isExpanded ? "justify-start pl-3" : "justify-center"
    )}
    onClick={onClick}
  >
    {icon}
    {isExpanded && <span className="font-medium">{label}</span>}
  </button>
);

export default ToolNavItem;
