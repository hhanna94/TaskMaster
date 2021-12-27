import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import ZA from "../assets/Z-A.svg"
import AZ from "../assets/A-Z.svg"
import UpDown from "../assets/UpDown.svg"

const AllTasksTable = props => {
    const [tableTaskData, setTableTaskData] = useState([])
    const { filteredTasks, toggleReload, setToggleReload } = props

    // States used for pagination and sorting.
    const [currentPage, setCurrentPage] = useState(1)
    const [tasksPerPage, setTasksPerPage] = useState(5)
    const [sortCriteria, setSortCriteria] = useState({column: "priority", direction: true})

    // Options for a user to select how many tasks they want on the page. 
    const tasksPerPageOptions = [5, 10, 25, 50]

    // Function to sort the list, triggered by clicking on the arrow icons in the table.
    const sortList = () => {
        let column = sortCriteria.column;
        let direction = sortCriteria.direction;
        let priorityImg = document.getElementById("priorityImg")
        let statusImg = document.getElementById("statusImg")

        // If the column clicked on is the status icon, then the priority icon should just be an up and down arrow to indicate that the user is not sorting by the priority column, and vice versa.
        column === "status" ? priorityImg.src = UpDown : statusImg.src = UpDown

        // If the direction is false, then sort the tasks by status or priority (depending on which is clicked) in descending order, and change the image to reflect that it is in descending order.
        if (!direction) {
            column === "status" ? statusImg.src = ZA : priorityImg.src = ZA
            return [...filteredTasks].sort( (a,b) => a[column] < b[column] ? 1 : -1)
        } 
        // If the direction is true, then sort the tasks by status or priority (depending on which is clicked) in ascending order, and change the image to reflect that it is in ascending order.
        else {
            column === "status" ? statusImg.src = AZ : priorityImg.src = AZ
            return [...filteredTasks].sort( (a,b) => a[column] > b[column] ? 1 : -1)
        }
    }

    // Function that returns how many pages there will be based on how many tasks are in the filteredTask list divided by the tasksPerPage that has been selected.
    function numPages() {
        let pages = Math.ceil(filteredTasks.length / tasksPerPage)
        return pages > 0 ? pages : 1;
    }

    // Function used when selecting the previous page button. Checks to make sure that the user isn't on the first page, since there is no previous page if the user is on the first page. It will set the new page to be the previous page, then use the changePage function to change what tasks are displayed.
    const prevPage = () => {
        if (currentPage > 1) {
            let newPage = currentPage - 1
            changePage(newPage);
        }
    }

    // Function used when selecting the next page button. Checks to make sure that the user isn't on the last page, since there is no next page if the user is on the last page. It will set the new page to be the next page, then use the changePage function to change what tasks are displayed.
    const nextPage = () => {
        if (currentPage < numPages()) {
            let newPage = currentPage + 1
            changePage(newPage)
        }
    }

    // This is used on loading of the table component to change the page to whatever the currentPage is, which is page 1 by default. This refreshes if you change the tasksPerPage, change the sort, or change any of the filters on the parent view.
    useEffect(() => {
        changePage(currentPage)
    }, [tasksPerPage, toggleReload, sortCriteria])

    // Function used to change which tasks are displayed based on the page.
    const changePage = (page) => {
        var _next = document.getElementById("_next");
        var _prev = document.getElementById("_prev");
        var page_span = document.getElementById("page")

        // If the user manages to get to a page that doesn't exist (either too high or too low), then set the page to either the first page or the last page.
        if (page < 1) {
            page = 1;
        }
        else if (page > numPages()) {
            page = numPages();
        }

        // Logic to set where the display should start and end based on how many tasks should be displayed per page, then sets the state to display those tasks. This starts off sorted using the default sort state.
        let tableStart = (page - 1) * tasksPerPage
        let tableEnd = tableStart + tasksPerPage
        let tableData = sortList().slice(tableStart, tableEnd)
        setTableTaskData(tableData)

        // Changes the text for what page # the user is on.
        page_span.innerHTML = page;

        // If the user is on the first page, hide the previous style button.
        page === 1 ? _prev.style.visibility = "hidden" : _prev.style.visibility = "visible"
        // If the user is on the last page, hide the next style button.
        page === numPages() ? _next.style.visibility = "hidden" : _next.style.visibility = "visible"

        // Set the current page state to be the new page.
        setCurrentPage(page);
    }

    // When a user completes a task in the table, then set the task's status as completed, then call on the API to update the task in the database. Then, trigger a reload so that it updates in the table (if it should be visible based on the filter).
    const completeTask = task => {
        let completedTask = {...task, status: "Completed"}
        axios.put(`http://localhost:8000/api/tasks/${task._id}`, completedTask)
            .then(res => setToggleReload(!toggleReload))
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