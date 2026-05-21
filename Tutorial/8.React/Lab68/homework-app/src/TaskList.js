function TaskList({ tasks, message }) {

    return (

        <div>

            <h3 className="mb-3 text-primary">
                Task List
            </h3>

            <ul className="list-group mb-4">

                {
                    tasks.map((task, index) => {

                        return (

                            <li
                                key={index}
                                className="list-group-item"
                            >
                                {task}
                            </li>

                        );

                    })
                }

            </ul>

            <div className="alert alert-info text-center">

                {message}

            </div>

        </div>

    );

}

export default TaskList;