import { useEffect, useState } from "react";
import axios from "axios";

const Task = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);


    
    const token = localStorage.getItem("token"); 


    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const fetchTasks = async () => {
        try {
            const response = await axiosInstance.get("http://localhost:3004/api/tasks");
            setTasks(response.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("http://localhost:3004/api/tasks", {
                title,
                description,
                completed,
            });

            if (response.status === 201) {
                setMessage("Task successfully created!");
                setTitle("");
                setDescription("");
                setCompleted(false);
                fetchTasks(); 
            }
        } catch (error: any) {
            console.error("Error creating task:", error.message);
            setMessage("Failed to create task. Please try again.");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`http://localhost:3004/api/tasks/${id}`);
            setMessage("Task successfully deleted!");
            fetchTasks();
        } catch (err) {
            console.error("Error deleting task:", err);
            setMessage("Failed to delete task.");
        }
    };



    const handleToggleComplete = async (id: string, currentState: boolean) => {
        try {
            await axiosInstance.patch(`http://localhost:3004/api/tasks/${id}`, {
                completed: !currentState,
            });
            fetchTasks(); 
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    return (
        <div className="flex flex-col items-center">


            <div className="bg-slate-800 p-6 rounded-md text-white max-w-md mb-8">
                <h2 className="text-2xl mb-4">Create New Task</h2>
                {message && <p className="mb-4 text-center text-green-400">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2">Task Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-500 p-2 rounded-md w-full"
                    >
                        Create Task
                    </button>
                </form>
            </div>



            <div className="bg-slate-700 p-6 rounded-md text-white max-w-4xl w-full">
                <h2 className="text-2xl mb-4 text-center">Task List</h2>
                <div className="space-y-4">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <div key={task.id} className="bg-slate-800 p-4 rounded-md flex justify-between items-center">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold">{task.title}</h3>
                                    <p className="text-sm text-gray-400">{task.description}</p>
                                    <span className={`text-sm ${task.completed ? 'text-green-400' : 'text-red-400'}`}>
                                        {task.completed ? 'Completed' : 'Not Completed'}
                                    </span>
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleToggleComplete(task.id, task.completed)}
                                        className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-md"
                                    >
                                        {task.completed ? 'Undo' : 'Complete'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="bg-red-500 hover:bg-red-400 text-white p-2 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-300">No tasks available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Task;
