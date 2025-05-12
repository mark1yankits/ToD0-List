import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import Layout from "./page/layout";
import Task from "./page/Task";
import Auth from "./page/Auth";
import СommonTasks from "./page/СomonTask";

import Home from "./page/Home";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Task />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/commonTasks" element={<СommonTasks />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;