import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import Layout from "./page/layout";
import Task from "./page/Task";
import Auth from "./page/Auth";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/tasks" element={<Task />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;