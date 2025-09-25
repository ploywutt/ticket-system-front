import { FileQuestion } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-8 text-disabled">
      <FileQuestion className="size-32" />
      <p className="text-4xl font-bold">No tickets found</p>
    </div>
  );
};
