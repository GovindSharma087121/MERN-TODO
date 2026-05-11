import { useState } from "react";
import "../style/addTask.css";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
    const [taskData, setTaskData] = useState();
    const navigate = useNavigate();

    const handleAddTask = async () => {
        console.log("task data", taskData);

        const result = await fetch("https://mern-todo-2r8z.onrender.com/add-task", {
            method: "Post",
            body: JSON.stringify(taskData),
            headers: { "Content-Type": "Application/Json" },
            credentials: 'include'
        });

        const res = await result.json();

        console.log("result", res);

        if (res.success) {
            navigate("/");
        }
        else {
            alert(res.message);
        }
    }

    return (
        <div className="container">
            <h1>Add New Task</h1>
            <label>Title</label>
            <input type="text" name="title" onChange={(event) => setTaskData({ ...taskData, title: event.target.value })} placeholder="Please enter task title" />
            <label>Description</label>
            <textarea rows={4} type="text" name="description" onChange={(event) => setTaskData({ ...taskData, description: event.target.value })} placeholder="Please enter task description" />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    )
}

export default AddTask;