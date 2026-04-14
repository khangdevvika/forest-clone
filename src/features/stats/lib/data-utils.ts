import { Session } from "@/features/timer/types/session";
import { Tag } from "@/features/timer/constants/tags";
import { 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  parseISO, 
  isWithinInterval,
  startOfDay,
  getHours,
  subWeeks
} from "date-fns";

export interface WeeklyData {
  day: string;
  fullDate: string;
  minutes: number;
}

export interface TagDistribution {
  name: string;
  value: number; // minutes
  color: string;
}

/**
 * Groups session duration by day of the current week (Mon-Sun)
 */
export const getWeeklyData = (sessions: Session[], dateRange: { start: Date; end: Date }): WeeklyData[] => {
  const days = eachDayOfInterval(dateRange);
  
  return days.map(day => {
    const dayStart = startOfDay(day);
    const daySessions = sessions.filter(s => {
      const completedAt = parseISO(s.completedAt);
      return isWithinInterval(completedAt, {
        start: dayStart,
        end: endOfWeek(day, { weekStartsOn: 1 }) // Using ISO week (starts Mon)
      }) && format(completedAt, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
    });

    const totalMinutes = daySessions.reduce((acc, s) => acc + s.durationMinutes, 0);

    return {
      day: format(day, 'EEE'), // Mon, Tue...
      fullDate: format(day, 'MMM d'),
      minutes: totalMinutes
    };
  });
};

/**
 * Groups session duration by tag
 */
export const getTagDistribution = (sessions: Session[], tags: Tag[]): TagDistribution[] => {
  const distribution: Record<string, number> = {};

  sessions.forEach(s => {
    distribution[s.tagId] = (distribution[s.tagId] || 0) + s.durationMinutes;
  });

  return Object.entries(distribution).map(([tagId, minutes]) => {
    const tag = tags.find(t => t.id === tagId);
    return {
      name: tag?.label || "Unknown",
      value: minutes,
      color: tag?.color || "var(--sage-500)"
    };
  }).sort((a, b) => b.value - a.value);
};

/**
 * Analyzes which hours of the day have the most activity
 */
export const getPeakFocusTimes = (sessions: Session[]): { hour: number; minutes: number }[] => {
  const hourlyData: Record<number, number> = {};

  // Initialize 24 hours
  for (let i = 0; i < 24; i++) hourlyData[i] = 0;

  sessions.forEach(s => {
    const hour = getHours(parseISO(s.completedAt));
    hourlyData[hour] += s.durationMinutes;
  });

  return Object.entries(hourlyData).map(([hour, minutes]) => ({
    hour: parseInt(hour),
    minutes
  }));
};

/**
 * Finds the single longest focus session
 */
export const getLongestSession = (sessions: Session[]): Session | null => {
  if (sessions.length === 0) return null;
  return [...sessions].sort((a, b) => b.durationMinutes - a.durationMinutes)[0];
};

/**
 * Calculates comparison data between current week and previous week
 */
export const getComparisonData = (sessions: Session[], currentWeekRange: { start: Date; end: Date }) => {
  const prevWeekStart = startOfWeek(subWeeks(currentWeekRange.start, 1), { weekStartsOn: 1 });
  const prevWeekEnd = endOfWeek(subWeeks(currentWeekRange.start, 1), { weekStartsOn: 1 });

  const currentWeekMinutes = sessions
    .filter(s => isWithinInterval(parseISO(s.completedAt), currentWeekRange))
    .reduce((acc, s) => acc + s.durationMinutes, 0);

  const prevWeekMinutes = sessions
    .filter(s => isWithinInterval(parseISO(s.completedAt), { start: prevWeekStart, end: prevWeekEnd }))
    .reduce((acc, s) => acc + s.durationMinutes, 0);

  const diff = currentWeekMinutes - prevWeekMinutes;
  const percentage = prevWeekMinutes === 0 ? 100 : Math.round((diff / prevWeekMinutes) * 100);

  return {
    currentTotal: currentWeekMinutes,
    prevTotal: prevWeekMinutes,
    diff,
    percentage,
    trend: diff >= 0 ? 'up' : 'down'
  };
};

/**
 * Generates heatmap data for the last year
 */
export const getYearlyHeatmapData = (sessions: Session[]) => {
  const data: Record<string, { date: string, count: number, minutes: number }> = {};
  
  sessions.forEach(s => {
    const dateStr = format(parseISO(s.completedAt), 'yyyy-MM-dd');
    if (!data[dateStr]) {
      data[dateStr] = { date: dateStr, count: 0, minutes: 0 };
    }
    data[dateStr].count += 1;
    data[dateStr].minutes += s.durationMinutes;
  });

  return Object.values(data);
};

/**
 * Exports sessions to CSV format
 */
export const exportToCSV = (sessions: Session[]) => {
  const headers = ["ID", "Completed At", "Duration (min)", "Tree", "Coins", "Mode", "Tag ID"];
  const rows = sessions.map(s => [
    s.id,
    s.completedAt,
    s.durationMinutes,
    s.treeName,
    s.coinsEarned,
    s.mode,
    s.tagId
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `forest_focus_sessions_${format(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Exports sessions to JSON format
 */
export const exportToJSON = (sessions: Session[]) => {
  const dataStr = JSON.stringify(sessions, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `forest_focus_sessions_${format(new Date(), 'yyyy-MM-dd')}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
