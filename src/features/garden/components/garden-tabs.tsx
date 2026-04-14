"use client"

import { LayoutGrid, List } from "lucide-react"
import { useGardenView, TimeRange, ViewMode } from "@/features/garden/hooks/use-garden-view"
import { AnimatedTabs } from "@/components/ui/animated-tabs"

const timeRanges: TimeRange[] = ["Day", "Week", "Month", "Year"]

export function GardenTabs() {
  const { timeRange, setTimeRange, viewMode, setViewMode } = useGardenView()

  const viewModes = [
    { id: "Grid", label: <LayoutGrid className="h-4 w-4" strokeWidth={1.25} /> },
    { id: "List", label: <List className="h-4 w-4" strokeWidth={1.25} /> },
  ]

  return (
    <div className="flex items-center gap-4 px-5 pt-4 pb-2">
      {/* Time Range Tabs */}
      <AnimatedTabs
        tabs={timeRanges}
        activeTab={timeRange}
        onChange={(val) => setTimeRange(val as TimeRange)}
        layoutId="garden-time-range"
      />

      {/* View Mode Toggle */}
      <AnimatedTabs
        tabs={viewModes}
        activeTab={viewMode}
        onChange={(id) => setViewMode(id as ViewMode)}
        layoutId="garden-view-mode"
        variant="default"
        className="bg-muted/50"
      />
    </div>
  )
}
