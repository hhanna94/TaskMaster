import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'




const MyTasks = () => {
    const data = [
        { id: 1, taskName: "Plycon Priority", dueDate: "11/10/21", priority: "High" },
        { id: 2, taskName: "Don Farr Priority", dueDate: "11/11/21", priority: "Low" },
        { id: 3, taskName: "Plycon Priority", dueDate: "11/10/21", priority: "High" },
        { id: 4, taskName: "Plycon Priority", dueDate: "11/10/21", priority: "High" },
        { id: 5, taskName: "Plycon Priority", dueDate: "11/10/21", priority: "High" },
        { id: 6, taskName: "Plycon Priority", dueDate: "11/10/21", priority: "High" },
        { id: 7, taskName: "Plycon Priority", dueDate: "11/10/21", priority: "High" },
        { id: 8, taskName: "Plycon Priority", dueDate: "11/10/21", priority: "High" },
        { id: 9, taskName: "Plycon Priority", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Don Farr Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Don Farr Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Don Farr Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Don Farr Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Modern Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Modern Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon", dueDate: "11/10/21", priority: "High" },
        { id: 10, taskName: "Plycon Butts", dueDate: "11/10/21", priority: "High" },
    ]

    data.forEach(function (row) {
        row["actions"] = <><Link className=" blue-button me-3" to={`/tasks/${row.id}`}>View/Edit</Link> <Link className=" red-button" to={`/tasks/${row.id}/complete`}>Complete</Link></>
    })

    const [currentPage, setCurrentPage] = useState(1)
    const [tasksPerPage, setTasksPerPage] = useState(10)


    const tasksPerPageOptions = [10, 25, 50]

    function numPages() {
        return Math.ceil(data.length / tasksPerPage);
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

    useEffect( () => {
        changePage(currentPage)
    }, [tasksPerPage])


    const changePage = (page) => {
        var _next = document.getElementById("_next");
        var _prev = document.getElementById("_prev");
        var listing_table = document.getElementById("listingTable")
        var page_span = document.getElementById("page")

        if (page < 1) {
            page = 1;
        }
        if (page > numPages()) {
            page = numPages();
        }
        listing_table.innerHTML = "";

        for (var i = (page - 1) * tasksPerPage; i < (page * tasksPerPage) && i < data.length; i++) {
            listing_table.innerHTML += `<tr class=${i%2 == 0 ? "customTable" : "customTable2"}>
            <td>${data[i].taskName}</td>
            <td>${data[i].dueDate}</td>
            <td>${data[i].priority}</td>
            <td>
                <button class=' blue-button me-3'>View/Edit</button>
                <button class=' red-button'>Complete</button>
            </td>
            `
        }
        page_span.innerHTML = page;

        page == 1 ? _prev.style.visibility = "hidden" : _prev.style.visibility = "visible"
        page == numPages() ? _next.style.visibility = "hidden" : _next.style.visibility = "visible"
        setCurrentPage(page);

    }

    return (
        <div className="container w-50">
            <h3>My Open Tasks</h3>
            <table className="mt-4 table table-bordered border-dark text-center align-middle">
                <thead>
                    <tr>
                        <td className="col-3">Task Name</td>
                        <td className="col-3">Due Date</td>
                        <td className="col-2">Priority</td>
                        <td className="col-4">Actions</td>
                    </tr>
                </thead>
                <tbody id="listingTable">

                </tbody>
                <tfoot>
                </tfoot>
            </table>
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex gap-3 align-items-center">
                    <button onClick={prevPage} id="_prev" className=" red-button">Previous</button>
                    <label>Current Page: <span id="page"></span></label>
                    <button id="_next" onClick={nextPage} class="page-link" className=" blue-button">Next</button>
                </div>
                <div>
                    <label className="me-3">Rows per Page: </label>
                    <select onChange={ e => {setTasksPerPage(parseInt(e.target.value))}} name="taskPerPageSelect" id="taskPerPageSelect" className="py-0">
                        {tasksPerPageOptions.map((num, i) => {
                            return (
                                <option value={parseInt(num)}>{num}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </div>
    );
};


export default MyTasks;