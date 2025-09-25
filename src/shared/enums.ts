export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum Status {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
}

export enum Sort {
  NEWEST = "NEWEST",
  OLDEST = "OLDEST",
}

export type Filter = {
  priority: Priority;
  status: Status;
  sort: Sort;
};
