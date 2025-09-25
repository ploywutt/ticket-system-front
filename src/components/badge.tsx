import { cn } from "@/lib/utils/cn";
import { Priority, Sort, Status } from "@/shared/enums";
import { Tag } from "lucide-react";
import { ReactNode } from "react";

interface BadgeProps {
  title: string | ReactNode;
  className?: string;
}

export const Badge = ({ title, className }: BadgeProps) => {
  return (
    <div
      className={cn(
        "place-items-center min-w-24 h-fit p-1 text-xs font-semibold border-mute text-mute",
        "rounded-xs",
        className
      )}
    >
      {title}
    </div>
  );
};

export const StatusBadge = ({ status }: { status: Status }) => {
  const statusClasses = {
    OPEN: "border-mute text-mute bg-mute/[.10]",
    IN_PROGRESS: "border-yellow-500 text-yellow-500 bg-yellow-500/[.10]",
    RESOLVED: "border-blue-500 text-blue-500 bg-blue-500/[.10]",
    CLOSED: "border-mute text-mute bg-mute/[.10]",
  };
  return (
    <Badge
      title={status}
      className={cn("text-center rounded-xs border", statusClasses[status])}
    />
  );
};

export const PriorityBadge = ({ priority }: { priority: Priority }) => {
  const priorityIcons = {
    LOW: "text-teal-500 bg-teal-500/[.10] border-teal-500/[.25]",
    MEDIUM: "text-amber-500 bg-amber-500/[.10] border-amber-500/[.25]",
    HIGH: "text-red-500 bg-red-500/[.10] border-red-500/[.25]",
  };

  return (
    <Badge
      className={cn("rounded-full shadow-xs border", priorityIcons[priority])}
      title={
        <div className="flex items-center gap-1">
          <Tag className="size-4" />
          <p>{priority}</p>
        </div>
      }
    />
  );
};

export const SortBadge = ({ sort }: { sort: Sort }) => {
  const sortClasses = {
    NEWEST: "text-primary bg-primary/[.10]",
    OLDEST: "text-secondary bg-secondary/[.10]",
  };
  return (
    <Badge
      className={cn("rounded-sm text-center", sortClasses[sort])}
      title={sort}
    />
  );
};
