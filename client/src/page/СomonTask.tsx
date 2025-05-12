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

        const [isModalOpen, setIsModalOpen] = useState(false);


        const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
        const [sharedTasks, setSharedTasks] = useState<any[]>([]);

        const [tasks, setTasks] = useState<any[]>([]);
        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");
        const [collaboratorEmail, setCollaboratorEmail] = useState("");
        const [isAuth, setIsAuth] = useState(false);
        const [role, setRole] = useState<string>("");
    
        const token = localStorage.getItem("token");
        const userData = token ? parseJwt(token) : null;
        const userId = userData?.id;
        const userRole = userData?.role;  
        const userEmail = userData?.email
    
        // for save role user
        useEffect(() => {
            if (userRole) {
                setRole(userRole);  
            }
        }, [userRole]);
        

        const axiosInstance = axios.create({
            baseURL: "http://localhost:3004/api",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    
        // show all common task
        const fetchCommonTasks = async () => {
            try {
                const response = await axiosInstance.get(`/toDoList/user/${userId}`);
                setTasks(response.data);
                setIsAuth(true);
            } catch (err) {
                console.error("Error fetching shared tasks:", err);
            }
        };


        // show task with acess

        const fetchCommonTasksWithAcees = async () => {
            try {
                const response = await axiosInstance.get(`/collaborator/user/${userEmail}`);
                setSharedTasks(response.data); //<--- save joint tugs
            } catch (err) {
                console.error("Error fetching shared tasks with access:", err);
            }
        };
    
        useEffect(() => {
            if (userId) {
                fetchCommonTasks();
            }
        }, [userId]);
        

        // for compleate task btn

        const handleComplete = async (id: number) => {
            try {
                await axiosInstance.patch(`/toDoList/${id}`, {
                    isCompleted: true,
                });
                fetchCommonTasks();
            } catch (err) {
                console.error("Error marking task as complete:", err);
            }
        };


        const unhandleComplete = async (id: number) => {
            try {
                await axiosInstance.patch(`/toDoList/${id}`, {
                    isCompleted: false,
                });
                fetchCommonTasks();
            } catch (err) {
                console.error("Error marking task as complete:", err);
            }
        };



        // add task requires the admin role
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                let userExists = false;
                let collaboratorRole = "Viewer"; 
        
                if (collaboratorEmail) {
                    const emailCheckResponse = await axiosInstance.get(`/user/check-email/${collaboratorEmail}`);
                    if (emailCheckResponse.data.exists) {
                        userExists = true;
                        if (emailCheckResponse.data.role) {
                            collaboratorRole = emailCheckResponse.data.role; 
                        }
                    } else {
                        alert("Користувача з таким email не знайдено.");
                        return;
                    }
                }
        
                const response = await axiosInstance.post("/toDoList", {
                    title,
                    description,
                });
        
                const listId = response.data.id;
        
                if (userExists && collaboratorEmail) {
                    await axiosInstance.post(`/collaborator/${listId}`, {
                        email: collaboratorEmail,
                        role: collaboratorRole,
                    });
                }
        
                setTitle("");
                setDescription("");
                setCollaboratorEmail("");
                fetchCommonTasks();
            } catch (err) {
                console.error("Помилка під час створення спільного списку:", err);
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
    

                            {/* show  task  */}

                            <div className="max-w-2xl mx-auto px-4 mt-10">
                                <h2 className="flex text-4xl font-semibold mb-4 justify-center">Your Shared Tasks</h2>
                                <ul className="space-y-2">
                                    {tasks
                                    .filter((task)=> !task.isCompleted)
                                    .map((task) => (
                                        <li key={task.id} className="p-4 bg-gray-600 rounded-md shadow-sm">
                                            <div className="flex justify-between">

                                                <div>
                                                    <h3 className="text-lg font-medium">{task.title}</h3>
                                                    <p>{task.description}</p>
                                                </div>

                                                {role === "Admin" && (  
                                                    <button
                                                        onClick={() => handleDelete(task.id)}
                                                        className="bg-red-500 px-3 py-1 mr-5 ml-5 rounded-md text-white hover:bg-blue-500"
                                                    >
                                                        Delete
                                                    </button>
                                                )}

                                                <button
                                                        onClick={() => handleComplete(task.id)}
                                                        className="bg-blue-600 px-3 py-1 rounded-md text-white hover:bg-red-600"
                                                    >
                                                        Compleated
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>


                                
                                {
                                        isModalOpen ? (
                                            <button
                                                className="flex mx-auto mt-12 mb-5 justify-center text-gray-600 cursor-pointer hover:text-white hover:scale-110 transition-all duration-300"
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                Close
                                            </button>
                                        ) : (
                                            <button
                                                className="flex mx-auto mt-12 mb-12 justify-center text-gray-600 cursor-pointer hover:text-white hover:scale-110 transition-all duration-300"
                                                onClick={() => setIsModalOpen(true)}
                                            >
                                                Show your complete task
                                            </button>
                                        )
                                }
                                
                                


                                {
                                    isAccessModalOpen ? 
                                    <button className="flex mx-auto mb-5 justify-center text-gray-600 hover:text-white hover:scale-110 transition-all duration-300"
                                        onClick={() => setIsAccessModalOpen(false)}>
                                        Close Shared With Me
                                    </button> :
                                    <button className="flex mx-auto mb-5 justify-center text-gray-600 hover:text-white hover:scale-110 transition-all duration-300"
                                        onClick={() => {
                                            setIsAccessModalOpen(true);
                                            fetchCommonTasksWithAcees(); 
                                        }}>
                                        Show Shared With Me
                                    </button>
                                }
                                
                            </div>


                            {/* compleate task show */}

                            
                            {isModalOpen && (
                                <div>
                                    <>
                                    {tasks
                                    .filter((item)=> item.isCompleted)
                                    .length ===0 ?
                                    <p className="text-center text-xl text-gray-500">No completed tasks available.</p>
                                    :
                                    tasks
                                    .filter((item)=> item.isCompleted)
                                    .map((task)=>(
                                        <li key={task.id} className="p-4 bg-gray-600 rounded-md shadow-sm">
                                        <div className="flex justify-between">

                                            <div>
                                                <h3 className="text-lg font-medium">{task.title}</h3>
                                                <p>{task.description}</p>
                                            </div>

                                            {role === "Admin" && (  
                                                <>
                                                    <button
                                                        onClick={() => handleDelete(task.id)}
                                                        className="bg-red-500 mr-5 ml-5 px-3 py-1 rounded-md text-white hover:bg-blue-500"
                                                    >
                                                        Delete
                                                    </button>

                                                    <button
                                                    onClick={() => unhandleComplete(task.id)}
                                                    className="bg-blue-600 px-3 py-1 rounded-md text-white hover:bg-red-600"
                                                    >
                                                    mark not completed
                                                    </button>
                                                </>
                                            )}

                                            <h1 className="flex pl-20 text-green-400 text-lg">Complete</h1>

                                        </div>
                                    </li>
                                    ))}
                                    </>
                                </div>
                            )}


                            {/* Acess modal window */}


                            <>
                                {isAccessModalOpen && (
                                    <div className="mt-10">
                                        <h2 className="text-center text-2xl font-semibold mb-4">Tasks Shared With You</h2>
                                        {sharedTasks.length === 0 ? (
                                            <p className="text-center text-gray-400">No shared tasks available.</p>
                                        ) : (
                                            <ul className="space-y-2">
                                            {sharedTasks.map((task) => (
                                                <li key={task.id} className="p-4 bg-gray-600 rounded-md shadow-sm">
                                                <div className="flex justify-between">
                                                    <div>
                                                    <h3 className="text-lg font-medium">{task.list.title}</h3>
                                                    <p>{task.list.description}</p>
                                                    </div>
                                                    <h1 className="flex pl-20 text-blue-300 text-lg">Shared</h1>
                                                </div>
                                                </li>
                                            ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </>

                        </div>
                    </div>
                )}
            </main>
        );
    };
    
    export default СommonTasks;

