import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./components/shared/Layout"
import Dashboard from "./components/Dashboard"
import Products from "./components/Products"
import ScheduleForm from "./components/SchedulerForm"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="driver-form" element={<ScheduleForm />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
