import { atomWithStorage } from "jotai/utils"

// Track which achievement IDs have been "claimed" or seen by the user
export const seenAchievementsAtom = atomWithStorage<string[]>("forest-seen-achievements", [])
