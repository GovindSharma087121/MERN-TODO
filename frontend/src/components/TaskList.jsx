import { Fragment, useEffect, useState } from "react";
import "../style/list.css"
import { Link } from "react-router-dom";

const TaskList = () => {

    const [listData, setListData] = useState();
    const [selectedTasks, setselectedTasks] = useState([]);

    useEffect(() => {
        getListData();
    }, [])

    const getListData = async () => {
        const data = await fetch("http://localhost:3200/tasks", { credentials: 'include' }); // BY THIS ALL COOKIES ARE SEND TO BACKEND AUTOMATICALLY IN EACH REQUEST THAT ARE STORED IN THE WEBSITE

        const listData = await data.json();

        console.log("list data", listData.result);

        setListData(listData.result);
    }

    const deleteTask = async (id) => {

        const result = await fetch("http://localhost:3200/delete-task/" + id, { method: "delete", credentials: 'include' });

        const res = await result.json();

        if (res.success) {
            getListData();
        }
        else {
            alert(res.message);
        }
    }

    const deleteMultiple = async () => {

        console.log("selectedTasks", selectedTasks);

        const result = await fetch("http://localhost:3200/delete-multiple", {
            method: 'delete',
            body: JSON.stringify(selectedTasks),
            headers: { "Content-Type": "Application/Json" },
            credentials: 'include'
        });

        const res = await result.json();

        if (res.success) {
            getListData();
        }
        else {
            alert(res.message);
        }
    }

    const selectAll = (event) => {
        console.log(event.target.checked);

        if (event.target.checked) {
            let items = listData.map((item) => item._id);

            console.log("items id is", items);

            setselectedTasks(items);
        }
        else {
            setselectedTasks([]);
        }
    }

    const selectOneTask = (id) => {
        console.log("select one id", id);

        if (selectedTasks.includes(id)) {
            let items = selectedTasks.filter((item) => item != id);

            setselectedTasks(items);
        }
        else {
            setselectedTasks([id, ...selectedTasks]);
        }
    }

    console.log("listData task", listData);

    return (
        <div>

            <h1>To Do List</h1>

            {
                listData?.length > 0 ?
                    <>
                        <button className="delete-btn delete-multiple" onClick={deleteMultiple}>Delete</button>
                        <ul className="task-list">
                            <li className="list-header"><input type="checkbox" onChange={selectAll} /></li>
                            <li className="list-header">S.No.</li>
                            <li className="list-header">Title</li>
                            <li className="list-header">Description</li>
                            <li className="list-header">Action</li>


                            {listData.map((item, index) =>
                                <Fragment key={index}>
                                    <li className="list-item"><input onChange={() => selectOneTask(item._id)} checked={selectedTasks.includes(item._id)} type="checkbox" /></li>
                                    <li className="list-item">{index + 1}</li>
                                    <li className="list-item">{item.title}</li>
                                    <li className="list-item">{item.description}</li>
                                    <li className="list-item"><button className="delete-btn" onClick={() => deleteTask(item._id)}>Delete</button>
                                        <Link className="update-btn" to={"update/" + item._id}>Update</Link>
                                    </li>
                                </Fragment>
                            )
                            }
                        </ul>
                    </>
                    :
                    <h1 className="empty-data">No Data Found to display</h1>
            }

        </div>
    )
}

export default TaskList;