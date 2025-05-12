import type { FC } from "react";


export const СommonTasks: FC=()=>{
    const isAuth = true;
    return(
    
        <main>
            <div className="">
                <div>
                    <h1 className="flex justify-center text-3xl">Task</h1>
                </div>
                <div>
                <div className=" flex justify-center items-center min-h-screen  flex-col ">
                    <h2 className="text-xl font-semibold mb-4">Create Shared Task</h2>

                    <form className="w-full max-w-xl p-6 space-y-4 border border-gray-400 rounded-md"
                            style={{ boxShadow: "0px 0px 30px grey" }}>
                        <div>
                        <label htmlFor="name" className="flex text-lg font-medium text-gray-700 justify-center">Task Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full rounded-md border-gray-100 shadow-lg focus:ring-indigo-600 focus:border-indigo-600"
                            placeholder="Enter task name"
                        />
                        </div>

                        <div>
                        <label htmlFor="description" className="flex text-lg font-medium text-gray-700 justify-center">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={5}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Describe the task"
                        ></textarea>
                        </div>

                        <div>
                        <label htmlFor="email" className="flex text-lg font-medium text-gray-700 justify-center">User Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="example@email.com"
                        />
                        </div>

                        <button
                        type="submit"
                        className=" px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                        Create Shared Task
                        </button>
                    </form>
                    </div>


                    <div className="max-w-2xl mx-auto px-4">
                        <h2 className=" flex text-4xl font-semibold mb-4 justify-center">Shared Tasks</h2>
                        <ul className="space-y-2">
                        <li className="p-4 bg-gray-600 rounded-md shadow-sm">
                            <h3 className="text-lg font-medium">Buy groceries</h3>
                            <p>description</p>
                            <p className="text-sm text-gray-400">Shared with: john@example.com</p>
                        </li>
                        <li className="p-4 bg-gray-600 rounded-md shadow-sm">
                            <h3 className=" flex text-lg font-medium ">Prepare presentation</h3>
                            <p>description</p>
                            <p className="text-sm text-gray-400">Shared with: anna@example.com</p>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>

        </main>
        
    )
}


export default СommonTasks