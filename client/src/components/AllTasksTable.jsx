import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import ZA from "../assets/Z-A.svg"
import AZ from "../assets/A-Z.svg"
import UpDown from "../assets/UpDown.svg"

const AllTasksTable = props => {
    const [tableTaskData, setTableTaskData] = useState([])
    const { filteredTasks, toggleReload, setToggleReload } = props

    const [currentPage, setCurrentPage] = useState(1)
    const [tasksPerPage, setTasksPerPage] = useState(5)
    const [sortCriteria, setSortCriteria] = useState({column: "priority", direction: true})

    const tasksPerPageOptions = [5, 10, 25, 50]

    const sortList = () => {
        let column = sortCriteria.column;
        let direction = sortCriteria.direction;
        let priorityImg = document.getElementById("priorityImg")
        let statusImg = document.getElementById("statusImg")

        column === "status" ? priorityImg.src = UpDown : statusImg.src = UpDown
        if (!direction) {
            column === "status" ? statusImg.src = ZA : priorityImg.src = ZA
            return [...filteredTasks].sort( (a,b) => a[column] < b[column] ? 1 : -1)
        } else {
            column === "status" ? statusImg.src = AZ : priorityImg.src = AZ
            return [...filteredTasks].sort( (a,b) => a[column] > b[column] ? 1 : -1)
        }
    }

    function numPages() {
        let pages = Math.ceil(filteredTasks.length / tasksPerPage)
        return pages > 0 ? pages : 1;
    }

    const prevPage = () => {
        if (currentPage > 1) {
            let newPage = currentPage - 1
            changePage(newPage);
        }
    }

    const nextPage = () => {
        if (currentPage < numPages()) {
            let newPage = currentPage + 1
            changePage(newPage)
        }
    }

    useEffect(() => {
        console.log("running")
        changePage(currentPage)
    }, [tasksPerPage, toggleReload, sortCriteria])

    const changePage = (page) => {
        var _next = document.getElementById("_next");
        var _prev = document.getElementById("_prev");
        var page_span = document.getElementById("page")

        if (page < 1) {
            page = 1;
        }
        else if (page > numPages()) {
            page = numPages();
        }

        let tableStart = (page - 1) * tasksPerPage
        let tableEnd = tableStart + tasksPerPage
        let tableData = sortList().slice(tableStart, tableEnd)
        setTableTaskData(tableData)

        page_span.innerHTML = page;

        page === 1 ? _prev.style.visibility = "hidden" : _prev.style.visibility = "visible"
        page === numPages() ? _next.style.visibility = "hidden" : _next.style.visibility = "visible"
        setCurrentPage(page);
    }

    const completeTask = task => {
        let completedTask = {...task, status: "Completed"}
        axios.put(`http://localhost:8000/api/tasks/${task._id}`, completedTask)
            .then(res => {
                setToggleReload(!toggleReload)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container mt-5">
            <p className="me-4 mb-1 text-end"><strong>Total Tasks:</strong> {filteredTasks.length}</p>
            <table className="table table-bordered border-dark text-center align-middle">
                <thead>
                    <tr>
                        <th className="col-3" >Task Name </th>
                        <th className="col-1">Due Date</th>
                        <th className="col-2">Priority <img id="priorityImg" className="ms-2" onClick={ e => {setSortCriteria({column: "priority", direction: !sortCriteria.direction})}} style={{width: "1em", height: "1em"}} src={AZ} /></th>
                        <th className="col-2">Status <img id="statusImg" className="ms-2" onClick={ e => {setSortCriteria({column: "status", direction: !sortCriteria.direction})}} style={{width: "1em", height: "1em"}} src={UpDown} /></th>
                        <th className="col-2">Assigned To</th>
                        <th className="col-2" colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableTaskData.map((task, i) => {
                        return (
                            <tr key={i}>
                                        <td><Link to={`/tasks/${task._id}`}>{task.taskName}</Link></td>
                                        <td>{new Date(task.dueDate).toLocaleDateString("en-US", { timeZone: 'UTC' })}</td>
                                        <td>{task.priority}</td>
                                        <td>{task.status}</td>
                                        <td>{task.assignTo.firstName} {task.assignTo.lastName}</td>
                                        <td className="col-1">{<Link className="button blue-button px-4 py-1" to={`/tasks/${task._id}/edit`}>Edit</Link>}</td>
                                        <td>{ task.status !== "Completed" ? <button onClick={e => {completeTask(task)}} className="red-button">Complete</button> : <button className="button btn-secondary" disabled>Complete</button>}</td>
                            </tr>
                        )
                    })}
                    {!tableTaskData.length>0 ? <tr><td colSpan="6">No results found, trying changing your filters.</td></tr> : <tr style={{display:"none"}}></tr>}
                </tbody>
                <tfoot>
                </tfoot>
            </table>
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex gap-3 align-items-center">
                    <button onClick={prevPage} id="_prev" className=" red-button">Previous</button>
                    <label>Current Page: <span id="page"></span></label>
                    <button id="_next" onClick={nextPage} className=" blue-button">Next</button>
                </div>
                <div>
                    <label className="me-3">Rows per Page: </label>
                    <select onChange={e => { setTasksPerPage(parseInt(e.target.value)) }} name="taskPerPageSelect" id="taskPerPageSelect" className="py-0">
                        {tasksPerPageOptions.map((num, i) => {
                            return (
                                <option key={i} value={num}>{num}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </div>
    );
};


export default AllTasksTable;