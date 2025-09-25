import { Priority, Status } from "@/shared/enums";
import { PriorityBadge, StatusBadge } from "./badge";
import { formatDate } from "@/lib/utils/date";

interface CardProps {
  createdAt: string;
  description: string;
  id: string;
  priority: Priority;
  status: Status;
  title: string;
  updatedAt: string;
}

export const Card = ({ card }: { card: CardProps }) => {
  return (
    <div className="flex flex-col text-text bg-foreground border border-white/[.145] p-4 rounded-md">
      <div className="block space-y-2 md:flex justify-between gap-4">
        <div className="flex-center">
          <p className="text-sm md:text-lg font-semibold line-clamp-1 text-start">
            {card.title}
          </p>
          <PriorityBadge priority={card.priority} />
        </div>
        <StatusBadge status={card.status} />
      </div>

      <p className="text-xs text-mute text-start">
        {card.updatedAt
          ? `Last Updated at : ${formatDate(card.updatedAt)}`
          : formatDate(card.createdAt)}
      </p>
    </div>
  );
};
