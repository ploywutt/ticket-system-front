"use client";

import {
  Card,
  Container,
  PriorityBadge,
  SortBadge,
  StatusBadge,
} from "@/components";
import { Filter as Select } from "@/components/filter";
import { TicketResponse } from "@/lib/api/interface";
import {
  Filter,
  Priority,
  Sort,
  Status,
  Status as TicketStatus,
} from "@/shared/enums";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { getTickets } from "../apis/ticket";
import { cn } from "@/lib/utils/cn";
import { NotFound } from "@/components/states/notFound";
import { LoadingError } from "@/components/states/error";

export default function TicketsPage() {
  const router = useRouter();

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(10);
  const [status, setStatus] = useState<TicketStatus>();
  const [priority, setPriority] = useState<Priority>();
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

  const { data, error } = useQuery<TicketResponse, Error>({
    queryKey: [
      "tickets",
      { sortOrder, pageNumber, pageSize, status, priority, search },
    ],
    queryFn: () =>
      getTickets({
        sortOrder,
        pageNumber,
        pageSize,
        status,
        priority,
        keywords: search,
      }),
  });

  const handleFilterChange = <K extends keyof Filter>(
    key: K,
    value: Filter[K] | undefined
  ) => {
    if (key === "priority") setPriority(value as Priority | undefined);
    if (key === "status") setStatus(value as TicketStatus | undefined);
    if (key === "sort" && value !== undefined)
      setSortOrder(value === Sort.NEWEST ? "desc" : "asc");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setSearch(value);
    }, 1000);
  };

  if (error) return <LoadingError />;
  if (data?.meta.totalCount === 0 || data?.items.length === 0)
    return <NotFound />;

  return (
    <Container isNavigationBack={false}>
      <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-8 justify-between">
        <div className="w-full flex flex-col gap-2 md:gap-4 pl-0 lg:pl-20 xl:pl-36 pb-8">
          {data?.items?.map((card) => (
            <button
              key={card.id}
              className="w-full cursor-pointer"
              type="button"
              onClick={() => router.push(`/tickets/${card.id}`)}
            >
              <Card key={card.id} card={card} />
            </button>
          ))}
        </div>

        <div className="sticky top-0 flex flex-row md:flex-col w-full md:w-fit h-fit p-2 md:p-4 gap-1 md:gap-2 rounded-lg bg-foreground">
          <p className="text-lg font-bold">
            {data?.meta.totalCount} tickets found
          </p>
          <input
            type="text"
            placeholder="Search"
            className={cn(
              "text-xs bg-disabled/[.25] p-2 rounded-sm border-2 border-disabled",
              "focus:outline-none focus:ring-2 focus:ring-disabled focus:ring-offset-2 focus:ring-offset-primary"
            )}
            onChange={handleSearch}
            value={inputValue}
          />

          <Select
            item={Priority}
            selected={priority}
            onChange={(item) =>
              handleFilterChange("priority", item as Priority)
            }
            onClear={() => handleFilterChange("priority", undefined)}
            renderSelected={(item) => (
              <PriorityBadge priority={item as Priority} />
            )}
            renderItem={(item) => <PriorityBadge priority={item as Priority} />}
            label="Priority"
          />
          <Select
            item={Status}
            selected={status}
            onChange={(item) => handleFilterChange("status", item as Status)}
            onClear={() => handleFilterChange("status", undefined)}
            renderSelected={(item) => <StatusBadge status={item as Status} />}
            renderItem={(item) => <StatusBadge status={item as Status} />}
            label="Status"
          />
          <Select
            item={Sort}
            selected={sortOrder === "desc" ? Sort.NEWEST : Sort.OLDEST}
            onChange={(item) => handleFilterChange("sort", item as Sort)}
            renderSelected={(item) => <SortBadge sort={item as Sort} />}
            renderItem={(item) => <SortBadge sort={item as Sort} />}
            label="Sort"
          />
          <div className="flex-center self-center mt-8">
            <button
              type="button"
              onClick={() => setPageNumber((prev) => prev - 1)}
              disabled={!data?.meta.hasPrevPage}
            >
              <ArrowLeftCircle
                className={cn("text-primary", {
                  "opacity-50": !data?.meta.hasPrevPage,
                })}
              />
            </button>
            <p className="text-xs font-extrabold">
              {pageNumber + 1} /{" "}
              {Math.ceil((data?.meta.totalCount ?? 0) / pageSize)}
            </p>
            <button
              type="button"
              onClick={() => setPageNumber((prev) => prev + 1)}
              disabled={!data?.meta.hasNextPage}
            >
              <ArrowRightCircle
                className={cn("text-primary", {
                  "opacity-50": !data?.meta.hasNextPage,
                })}
              />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
