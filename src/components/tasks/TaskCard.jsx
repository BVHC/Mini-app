import React from "react";
import {
	FiTrash2,
	FiClock,
	FiCheckCircle,
	FiCircle,
	FiPlayCircle,
} from "react-icons/fi";
import { useTaskContext } from "../../hooks/useTaskContext";

const PRIORITY_COLORS = {
	high: "bg-red-50 text-red-600 border-red-200",
	medium: "bg-yellow-50 text-yellow-600 border-yellow-200",
	low: "bg-blue-50 text-blue-600 border-blue-200",
};

const STATUS_ICONS = {
	todo: <FiCircle className="w-5 h-5 text-slate-400" />,
	inprogress: <FiPlayCircle className="w-5 h-5 text-blue-500" />,
	done: <FiCheckCircle className="w-5 h-5 text-green-500" />,
};

const TaskCard = ({ task }) => {
	const { dispatch } = useTaskContext();

	const handleStatusChange = (status) => {
		dispatch({ type: "UPDATE", payload: { id: task.id, status } });
	};

	const handleDelete = () => {
		dispatch({ type: "DELETE", payload: { id: task.id } });
	};

	return (
		<div
			className={`p-4 bg-white rounded-xl border ${task.status === "done" ? "border-green-100 bg-slate-50/50" : "border-slate-100"} shadow-sm flex items-start gap-4 group transition-all hover:shadow-md hover:border-indigo-100`}
		>
			<button
				onClick={() => {
					const nextStatus =
						task.status === "todo"
							? "inprogress"
							: task.status === "inprogress"
								? "done"
								: "todo";
					handleStatusChange(nextStatus);
				}}
				className="mt-0.5 cursor-pointer hover:scale-110 transition-transform"
				title="Click to toggle status"
			>
				{STATUS_ICONS[task.status]}
			</button>

			{/* Thông tin task */}
			<div className="flex-1 min-w-0">
				<h3
					className={`text-[15px] font-medium mb-1.5 truncate ${task.status === "done" ? "line-through text-slate-400" : "text-slate-800"}`}
				>
					{task.title}
				</h3>

				<div className="flex items-center gap-3 text-xs">
					<span
						className={`px-2.5 py-0.5 rounded-full border ${PRIORITY_COLORS[task.priority]} capitalize font-medium`}
					>
						{task.priority}
					</span>

					{task.deadline && (
						<span className="flex items-center gap-1 text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
							<FiClock className="w-3 h-3" />
							{new Date(task.deadline).toLocaleDateString("vi-VN")}
						</span>
					)}
				</div>
			</div>

			<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
				<select
					value={task.status}
					onChange={(e) => handleStatusChange(e.target.value)}
					className="text-xs border border-slate-200 rounded-md py-1.5 px-2 bg-slate-50 outline-none text-slate-600 cursor-pointer focus:border-indigo-500"
				>
					<option value="todo">To do</option>
					<option value="inprogress">In Progress</option>
					<option value="done">Done</option>
				</select>

				<button
					onClick={handleDelete}
					className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
					title="Delete Task"
				>
					<FiTrash2 className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
};

export default TaskCard;
