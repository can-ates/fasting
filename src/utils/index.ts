export const getLocalTime = (date: any): Date => {
  const tzOffsetMS = date.getTimezoneOffset() * 60 * 1000;
  const tzLocalMs = date - tzOffsetMS;
  return new Date(tzLocalMs);
};

export const formatTime = (date: Date, local: boolean = true): string => {
  const localTime: Date = local ? getLocalTime(date) : date;
  return localTime.toISOString().substring(11, 19);
};

export const calculateEndTime = (
  startTime: Date,
  fastingDuration: number
): Date => {
  return new Date(startTime.getTime() + fastingDuration * 1000);
};

export const convertToSeconds = (time: string): number => {
  const parts = time.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseInt(parts[2], 10);

  return hours * 3600 + minutes * 60 + seconds;
};

export const removeSeconds = (timeString: string): string => {
  const [hours, minutes] = timeString.split(":");
  return `${hours}:${minutes}`;
};

export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  let result: string = "";
  if (hours > 0) result += `${hours} hour${hours > 1 ? "s" : ""} `;
  if (minutes > 0) result += `${minutes} minute${minutes > 1 ? "s" : ""} `;
  if (hours === 0 && minutes === 0)
    result += `${seconds} second${seconds > 1 ? "s" : ""}`;

  return result.trim();
};

export const secondsToFormattedTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export const prettyFormatDate = (isoDateString: string): string => {
  const parsedDate = new Date(isoDateString);
  const now = new Date();
  const diffMs = now.getTime() - parsedDate.getTime();

  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) {
    return "just now";
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else {
    return parsedDate.toLocaleDateString();
  }
};

export const hasDaysPassed = (isoDateString: string, day: number): boolean => {
  const date = new Date(isoDateString);
  const now = new Date();

  const daysInMilliseconds = day * 24 * 60 * 60 * 1000;
  const timeDifference = now.getTime() - date.getTime();

  return timeDifference >= daysInMilliseconds;
};
