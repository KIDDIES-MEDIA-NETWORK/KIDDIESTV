import dayjs from "dayjs";
import "./DayjsConfig";

export const FormatDate = (incomingDate) => {
  if (!incomingDate) return;
  let timeAgo;
  timeAgo = dayjs().to(dayjs(incomingDate));

  if (timeAgo.includes("hours ago")) timeAgo = timeAgo.replace("hours ago", "hrs");
  if (timeAgo.includes("hour ago")) timeAgo = timeAgo.replace("hour ago", "hr");

  if (timeAgo.includes("minutes ago")) timeAgo = timeAgo.replace("minutes ago", "mins");
  if (timeAgo.includes("minute ago")) timeAgo = timeAgo.replace("minute ago", "min");

  if (timeAgo.includes("seconds ago")) timeAgo = timeAgo.replace("seconds ago", "secs");
  if (timeAgo.includes("second ago")) timeAgo = timeAgo.replace("second ago", "sec");





////////////////////////////





  if (timeAgo.includes("month ago"))
    timeAgo = timeAgo.replace("month ago", "month");
  if (timeAgo.includes("months ago"))
    timeAgo = timeAgo.replace("months ago", "months");
  if (timeAgo.includes("years ago"))
    timeAgo = timeAgo.replace("years ago", "yrs");
  if (timeAgo.includes("year ago")) timeAgo = timeAgo.replace("year ago", "yr");
  if (timeAgo.includes("day ago")) timeAgo = timeAgo.replace("day ago", "day");
  if (timeAgo.includes("days ago"))
    timeAgo = timeAgo.replace("days ago", "days");

  return timeAgo;
};
