export const getLocalTime = (date: Date): Date => {
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
  return new Date(getLocalTime(startTime).getTime() + fastingDuration * 1000);
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

export const prettyFormatDate = (dateString: string): string => {
  const parsedDate = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - parsedDate.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffSecs < 60) {
    return `${diffSecs} seconds ago`;
  } else if (diffMins < 60) {
    return `${diffMins} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else if (diffDays < 30) {
    return `${diffDays} days ago`;
  } else {
    return parsedDate.toString();
  }
};
