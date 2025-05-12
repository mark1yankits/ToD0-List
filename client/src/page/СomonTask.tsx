import { useEffect, useState } from "react";
import axios from "axios";

const parseJwt = (token: string) => {
    try {
        const base64Payload = token.split('.')[1];
        const payload = atob(base64Payload);
        return JSON.parse(payload);
    } catch (error) {
        console.error("Token parsing error", error);
        return null;
    }
    };

    const СommonTasks = () => {
        const [tasks, setTasks] = useState<any[]>([]);
        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");
        const [collaboratorEmail, setCollaboratorEmail] = useState("");
        const [isAuth, setIsAuth] = useState(false);
        const [role, setRole] = useState<string>("");
    
        const token = localStorage.getItem("token");
        const userData = token ? parseJwt(token) : null;
        const userId = userData?.id;
        const userRole = userData?.role;  // Отримуємо роль користувача з JWT
    
        useEffect(() => {
            if (userRole) {
                setRole(userRole);  // Зберігаємо роль користувача
            }
        }, [userRole]);
    
        const axiosInstance = axios.create({
            baseURL: "http://localhost:3004/api",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    
        const fetchCommonTasks = async () => {
            try {
                const response = await axiosInstance.get(`/toDoList/user/${userId}`);
                setTasks(response.data);
                setIsAuth(true);
            } catch (err) {
                console.error("Error fetching shared tasks:", err);
            }
        };
    
        useEffect(() => {
            if (userId) {
                fetchCommonTasks();
            }
        }, [userId]);
    
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                const response = await axiosInstance.post("/toDoList", {
                    title,
                    description,
                });
                const listId = response.data.id;
    
                if (collaboratorEmail) {
                    await axiosInstance.post(`/collaborator/${listId}`, {
                        email: collaboratorEmail,
                        role: "Viewer",
                    });
                }
    
                setTitle("");
                setDescription("");
                setCollaboratorEmail("");
                fetchCommonTasks();
            } catch (err) {
                console.error("Error creating shared task:", err);
            }
        };
    
        const handleDelete = async (id: number) => {
            try {
                await axiosInstance.delete(`/toDoList/${id}`);
                fetchCommonTasks();
            } catch (err) {
                console.error("Error deleting task:", err);
            }
        };
    
        return (
            <main>
                {isAuth && (
                    <div>
                        <h1 className="flex justify-center text-3xl">Shared Tasks</h1>
    
                        <div className="flex justify-center items-center min-h-screen flex-col">
                            
    
                            {role === "Admin" && ( 
                                <>
                                <h2 className="text-xl font-semibold mb-4">Create Shared Task</h2>
                                <form
                                    onSubmit={handleSubmit}
                                    className="w-full max-w-xl p-6 space-y-4 border border-gray-600 rounded-md"
                                    style={{ boxShadow: "0px 0px 30px grey" }}
                                >
                                    <div>
                                        <label className="flex text-lg font-medium justify-center">Task Name</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-amber-50 shadow-lg"
                                            placeholder="Enter task name"
                                            required
                                        />
                                    </div>
    
                                    <div>
                                        <label className="flex text-lg font-medium justify-center">Description</label>
                                        <textarea
                                            rows={5}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-amber-50 shadow-lg"
                                            placeholder="Describe the task"
                                        />
                                    </div>
    
                                    <div>
                                        <label className="flex text-lg font-medium justify-center">User Email</label>
                                        <input
                                            type="email"
                                            value={collaboratorEmail}
                                            onChange={(e) => setCollaboratorEmail(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-amber-50 shadow-lg"
                                            placeholder="example@email.com"
                                        />
                                    </div>
    
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Create Shared Task
                                    </button>
                                </form>
                                </>
                            )}
    
                            <div className="max-w-2xl mx-auto px-4 mt-10">
                                <h2 className="flex text-4xl font-semibold mb-4 justify-center">Your Shared Tasks</h2>
                                <ul className="space-y-2">
                                    {tasks.map((task) => (
                                        <li key={task.id} className="p-4 bg-gray-600 rounded-md shadow-sm">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="text-lg font-medium">{task.title}</h3>
                                                    <p>{task.description}</p>
                                                </div>
                                                {role === "Admin" && (  
                                                    <button
                                                        onClick={() => handleDelete(task.id)}
                                                        className="bg-red-500 px-3 py-1 rounded-md text-white hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        );
    };
    
    export default СommonTasks;
    
