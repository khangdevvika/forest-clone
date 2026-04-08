import { atom, useAtom } from "jotai"

export type TimeRange = "Day" | "Week" | "Month" | "Year"
export type ViewMode = "Grid" | "List"

const timeRangeAtom = atom<TimeRange>("Day")
const viewModeAtom = atom<ViewMode>("Grid")

export function useGardenView() {
  const [timeRange, setTimeRange] = useAtom(timeRangeAtom)
  const [viewMode, setViewMode] = useAtom(viewModeAtom)

  return {
    timeRange,
    setTimeRange,
    viewMode,
    setViewMode,
  }
}
