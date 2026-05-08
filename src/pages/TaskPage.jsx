import React, { useEffect, useState } from "react";
import TaskForm from "../components/tasks/TaskForm";
import TaskCard from "../components/tasks/TaskCard";
import TaskFilters from "../components/tasks/TaskFilters";
import { useTaskContext } from "../contexts/TaskContext";

const TaskPage = () => {
  const { state, dispatch } = useTaskContext();
  const listTasks = state.tasks;
  
	const [statusFilter, setStatusFilter] = useState("all");
	const [priorityFilter, setPriorityFilter] = useState("all");

	const loadTasks = () => {
		const savedTasks = localStorage.getItem("mini-app-tasks");
		return savedTasks ? JSON.parse(savedTasks) : [];
	};
	// const [listTasks, setListTasks] = useState(loadTasks);

	// Tự động lưu localStorage
	// useEffect(() => {
	// 	localStorage.setItem("mini-app-tasks", JSON.stringify(listTasks));
	// }, [listTasks]);

	// Lọc task dựa vào: Status & Priority
	const filteredTasks = listTasks.filter((task) => {
		const matchStatus = statusFilter === "all" || task.status === statusFilter;
		const matchPriority =	priorityFilter === "all" || task.priority === priorityFilter;
		return matchStatus && matchPriority;
	});

	return (
		<div className="max-w-4xl mx-auto w-full">
			<div className="mb-8">
				<h2 className="text-xl font-bold text-slate-800 mb-4">Create Task</h2>
				<TaskForm />
			</div>

			<div>
				<div className="flex justify-between items-end mb-4">
					<h2 className="text-xl font-bold text-slate-800">Task List</h2>
					<span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
						{filteredTasks.length}{" "}
						{filteredTasks.length === 1 ? "task" : "tasks"} found
					</span>
				</div>

				{/* Bộ lọc */}
				<TaskFilters
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
					priorityFilter={priorityFilter}
					setPriorityFilter={setPriorityFilter}
				/>

				{/* Danh sách Card */}
				<div className="flex flex-col gap-3">
					{filteredTasks.length === 0 ? (
						<div className="text-slate-500 text-sm mt-4 text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
							Không tìm thấy task nào. Hãy thay đổi bộ lọc hoặc thêm task mới
							nhé!
						</div>
					) : (
						filteredTasks.map((task) => (
							<TaskCard
								key={task.id}
								task={task}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default TaskPage;
