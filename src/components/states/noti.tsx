export const Noti = ({ title }: { title: string }) => {
  return (
    <div className="flex-center border border-white/[.145] bg-disabled rounded-md p-4 shadow-2xl">
      <p className="text-md font-bold text-primary">Ticket</p>
      <span className="text-mute font-light text-sm underline">{` ${title} `}</span>
      <p className="text-md font-bold text-primary">Updated 🥳</p>
    </div>
  );
};
