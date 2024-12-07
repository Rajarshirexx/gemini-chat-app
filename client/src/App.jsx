import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";

export default function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Main />
    </div>
  )
}