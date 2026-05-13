import React from "react";

const TaskFilters = ({
	statusFilter,
	setStatusFilter,
	priorityFilter,
	setPriorityFilter,
}) => {
	return (
		<div className="flex gap-6 items-center mb-6 bg-white p-3.5 px-5 rounded-xl border border-slate-100 shadow-sm">
			<div className="flex items-center gap-3">
				<label className="text-sm font-semibold text-slate-600">Status:</label>
				<select
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
					className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-indigo-500 bg-slate-50 cursor-pointer min-w-[120px]"
				>
					<option value="all">All Status</option>
					<option value="todo">To do</option>
					<option value="inprogress">In Progress</option>
					<option value="done">Done</option>
				</select>
			</div>

			<div className="w-px h-5 bg-slate-200"></div>
			<div className="flex items-center gap-3">
				<label className="text-sm font-semibold text-slate-600">
					Priority:
				</label>
				<select
					value={priorityFilter}
					onChange={(e) => setPriorityFilter(e.target.value)}
					className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-indigo-500 bg-slate-50 cursor-pointer min-w-[120px]"
				>
					<option value="all">All Priorities</option>
					<option value="high">High</option>
					<option value="medium">Medium</option>
					<option value="low">Low</option>
				</select>
			</div>
		</div>
	);
};

export default TaskFilters;
