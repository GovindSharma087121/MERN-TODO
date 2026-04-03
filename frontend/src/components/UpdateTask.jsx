import { useState } from "react";
import "../style/addTask.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const UpdateTask = () => {
    const [taskData, setTaskData] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    console.log("id is", id);

    useEffect(() => {
        getTask();
    }, [])

    const getTask = async () => {
        let res = await fetch("http://localhost:3200/get-task/" + id, { credentials: 'include' });

        console.log("res", res);

        const parsedResponse = await res.json();

        setTaskData(parsedResponse.result);

        // res = res.json();

        console.log("parsedResponse", parsedResponse);

        console.log("update task get api res", parsedResponse.result);
    }

    const handleUpdateTask = async () => {
        console.log("task data", taskData);

        const result = await fetch("http://localhost:3200/update-task/" + id, {
            method: "PUT",
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
            <h1>Update Task</h1>
            <label>Title</label>
            <input type="text" name="title" value={taskData?.title} onChange={(event) => setTaskData({ ...taskData, title: event.target.value })} placeholder="Please enter task title" />
            <label>Description</label>
            <textarea rows={4} type="text" name="description" value={taskData?.description} onChange={(event) => setTaskData({ ...taskData, description: event.target.value })} placeholder="Please enter task description" />
            <button onClick={handleUpdateTask}>Update Task</button>
        </div>
    )
}

export default UpdateTask;