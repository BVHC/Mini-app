import React, { useState } from "react";
import {
	FcHighPriority,
	FcLowPriority,
	FcMediumPriority,
} from "react-icons/fc";
import { useTaskContext } from "../../hooks/useTaskContext";

const TaskForm = () => {
	const { dispatch } = useTaskContext();
	const [title, setTitle] = useState("");
	const [priority, setPriority] = useState("medium");
	const [deadline, setDeadline] = useState("");
	const [errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validate()) return;

		const newTask = {
			id: Date.now(),
			title,
			priority,
			deadline,
			status: "todo",
			createAt: Date.now(),
		};
		dispatch({ type: "ADD", payload: newTask });

		//reset
		setTitle("");
		setPriority("medium");
		setDeadline("");
	};

	const validate = () => {
		const err = {};
		if (!title.trim()) {
			err.title = "Vui lòng nhập tên task!";
		}

		if (deadline) {
			const today = new Date().toISOString().split("T")[0]; // "2026-05-10"
			if (deadline < today) {
				err.deadline = "Deadline không được là ngày trong quá khứ!";
			}
		}
		setErrors(err);
		// Trả về true nếu không có lỗi
		return Object.keys(err).length === 0;
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="border border-slate-200 p-4 rounded-xl bg-white shadow-sm flex flex-wrap gap-4 items-end"
		>
			<div className="flex-1 min-w-[250px]">
				<label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
					Task Title *
				</label>
				<input
					className="w-full border border-slate-200 px-3 py-2 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
					type="text"
					placeholder="What needs to be done?"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
						// Xóa lỗi khi user bắt đầu sửa
						if (errors.title) {
							setErrors((prev) => ({ ...prev, title: undefined }));
						}
					}}
				/>
				{errors.title && (
					<p className="text-red-500 text-xs mt-1">{errors.title}</p>
				)}
			</div>

			<div className="w-[140px]">
				<label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
					Priority
				</label>
				<select
					value={priority}
					onChange={(e) => setPriority(e.target.value)}
					className="w-full border border-slate-200 px-3 py-2 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm bg-white cursor-pointer"
				>
					<option value="high">High</option>
					<option value="medium"> Medium</option>
					<option value="low"> Low</option>
				</select>
			</div>

			<div className="w-[160px]">
				<label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
					Deadline
				</label>
				<input
					type="date"
					value={deadline}
					onChange={(e) => setDeadline(e.target.value)}
					className="w-full border border-slate-200 px-3 py-2 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm cursor-pointer"
				/>
				{errors.deadline && (
					<p className="text-red-500 text-xs mt-1">{errors.deadline}</p>
				)}
			</div>

			{/* Nút Submit */}
			<button
				type="submit"
				className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors h-[38px] text-sm cursor-pointer shadow-sm shadow-indigo-200"
			>
				Add Task
			</button>
		</form>
	);
};

export default TaskForm;
