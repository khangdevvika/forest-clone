import { TaskHeader } from "@/features/tasks/components/task-header"
import { AddTaskInput } from "@/features/tasks/components/add-task-input"
import { TaskList } from "@/features/tasks/components/task-list"

export default function TasksPage() {
  return (
    <div className="h-full overflow-y-auto no-scrollbar scroll-smooth">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <TaskHeader />
        <AddTaskInput />
        <TaskList />
      </div>
    </div>
  )
}
