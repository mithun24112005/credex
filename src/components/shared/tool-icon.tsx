import Image from "next/image";

import { toolMeta } from "@/config/audit";
import type { AiToolName } from "@/types";

type ToolIconProps = {
  tool: AiToolName;
  className?: string;
};

export function ToolIcon({ tool, className }: ToolIconProps) {
  const meta = toolMeta[tool];

  return (
    <Image
      src={meta.iconPath}
      alt={`${tool} logo`}
      width={40}
      height={40}
      className={`object-contain ${className ?? "size-5"}`}
    />
  );
}
