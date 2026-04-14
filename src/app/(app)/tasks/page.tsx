import { TaskHeader } from "@/features/tasks/components/task-header"
import { AddTaskInput } from "@/features/tasks/components/add-task-input"
import { TaskList } from "@/features/tasks/components/task-list"

export default function TasksPage() {
  return (
    <div className="relative h-full overflow-y-auto no-scrollbar scroll-smooth">
      {/* iOS 26: Ambient aura layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute top-[-5%] right-[-10%] w-[50%] h-[50%] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--aura-primary) 0%, transparent 70%)",
            filter: "blur(80px)",
            opacity: 0.55,
          }}
        />
        <div
          className="absolute bottom-[10%] left-[-8%] w-[40%] h-[40%] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--aura-accent) 0%, transparent 70%)",
            filter: "blur(100px)",
            opacity: 0.4,
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <TaskHeader />
        <AddTaskInput />
        <TaskList />
      </div>
    </div>
  )
}
