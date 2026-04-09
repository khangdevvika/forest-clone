# Implementation Plan: Analytics Dashboard & Tagging System

This document outlines the strategy for implementing a comprehensive focus analytics system and session tagging feature for the **Forest Clone** application.

## 🌿 Objective

To provide users with meaningful insights into their focus habits while maintaining the "Zen Organic" aesthetic, encouraging long-term engagement through data visualization.

---

## 🛠️ Tech Stack & Library Selection

- **Visualization:** `recharts`
  - **Why?** Native React support, SVG-based (crisp on high-DPI), and highly customizable to match our soft, organic design system.
- **State Management:** `jotai` (Existing)
- **Date Handling:** `date-fns` (Existing)
- **Styling:** CSS Variables + Tailwind CSS 4 (Existing)
- **Animations:** `framer-motion` (Existing)

---

## 🗓️ Phase 1: Data Architecture & Tagging

### 1.1 Data Model Updates

- [x] Modify `src/features/timer/types/session.ts` to include `tagId`.
- [x] Define `Tag` constants in `src/features/timer/constants/tags.ts`.

### 1.2 Tag Selector UI

- [x] Create core component `TagSelector.tsx`.
- [x] Integrate `TagSelector` into the main `TimerDisplay`.
- [ ] Ensure `useTimer` hook persists the `tagId` when completing a session (Partially done, needs verification for all modes).

---

## 📊 Phase 2: Analytics Logic (The "Brain")

### 2.1 Data Processors

- [x] Create utility functions in `src/features/stats/lib/data-utils.ts` (`getWeeklyData`, `getTagDistribution`, etc.).

---

## 🎨 Phase 3: Statistics Dashboard UI

### 3.1 The `/stats` Route

- [x] Create new page `src/app/(app)/stats/page.tsx`.
- [x] Implement Layout with `PageHeader` and `ScrollArea` (zen-bg).

### 3.2 Visualization Components (Recharts)

- [x] Implement Weekly Bar Chart with soft gradients.
- [x] Implement Tag Distribution (Donut Chart).
- [x] Add Summary Cards (This Week, All Time, Peak Focus).

---

## ✨ Phase 4: Zen Organic Polish

- [x] Add Framer Motion animations to charts.
- [x] Apply Grain Texture overlay to the stats page.
- [ ] Add empty states for charts with beautiful illustrations.
- [ ] Implement "Last 7 Days" vs "This Month" toggle in Analytics.

---

## 🚀 Execution Order

- [x] **1. Install Recharts:** `npm install recharts`
- [x] **2. Schema & Tags:** Define the tag constants and update types.
- [x] **3. Tag Integration:** Add `TagSelector` to the Home screen and link to state.
- [x] **4. Stats Page:** Build the shell and basic bar chart.
- [ ] **5. Analytics Refinement:** Improve data processors for monthly/yearly views.
- [x] **6. Persistence:** Ensure tag selection is saved and syncs with historical data.

---

## 🏔️ Phase 5: Advanced Analytics & Insights

- [x] **Compare & Contrast:** Add a "Last Week" vs "This Week" comparison indicator in summary cards.
- [x] **Longest Session:** Add a "Deepest Root" stat showing the single longest focus session.
- [x] **Heatmap Visualization:** Implement a GitHub-style activity heatmap for the year.
- [x] **Export Data:** Allow users to export focus sessions as CSV/JSON.

---

## 🏆 Phase 6: Tag-based Gamification

- [ ] **Tag Levels:** "Level up" specific tags (e.g., Level 5 Study) to unlock specialized tag icons.
- [ ] **Achievements Integration:** Create missions like "Focus for 20 hours in 'Work' to unlock the Office Tree".
- [ ] **Custom Tags:** Allow users to create and color-code their own focus categories.

---

> [!IMPORTANT]
> **Zen Design Tip:** Avoid using bright, standard colors for the charts. Stick to the palette:
>
> - `--sage-500` to `--sage-900` for primary data.
> - `--cream-200` for backgrounds.
> - Soft earth tones (terracotta, slate, muted gold) for category differentiation.
