import type { FC } from "react"

export const Home:FC=()=>{
    return(
        <div>
            <div>
                <h1 className="flex justify-center text-6xl font-extrabold ">To Do List</h1>
                <p className="flex justify-center text-3xl">For you</p>
            </div>

            <div className="flex justify-center mt-10 mb-10">
                <img 
                    className=" w-full max-w-lg shadow-lg  rounded-4xl"
                    style={{ boxShadow: "0px 0px 60px grey" }}
                    src="./img/PH-2.jpg" 
                    alt="Motivational" 
                />
            </div>

            <div className="flex justify-center">
                <div className=" p-8 rounded-2xl shadow-xl max-w-2xl text-center">
                    <h1 className="text-4xl font-bold mb-4">Don't quit — Do it 💪</h1>
                    <p className="text-lg">
                        Every big goal starts with a small step.<br />
                        DoToList is your daily tool for action, not excuses.<br />
                        Create, plan, execute — and achieve more.<br />
                        Now's not the time to quit. It's time to do it.
                    </p>
                </div>
            </div>
            
        </div>
    )
}

export default Home