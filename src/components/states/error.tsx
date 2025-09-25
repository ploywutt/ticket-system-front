import { AlertCircle } from "lucide-react";

export const LoadingError = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-8 text-disabled">
      <AlertCircle className="size-32" />
      <p className="text-4xl font-bold">Sorry, something went wrong</p>
    </div>
  );
};
