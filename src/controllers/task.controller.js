import Task from "../models/task.models.js";

/**
 * The function `getTasks` retrieves tasks associated with a specific user and returns them as a JSON
 * response.
 * @param req - The `req` parameter in the `getTasks` function is the request object, which contains
 * information about the HTTP request that was made. This object includes properties such as the
 * request headers, parameters, body, and user information. In this case, `req.user.id` is used to find
 * tasks
 * @param res - The `res` parameter in the code snippet refers to the response object in an Express
 * route handler. It is used to send a response back to the client making the request. In this case,
 * the `res` object is being used to send a JSON response containing the tasks data back to the client
 * @returns If the `Task.find` method does not find any tasks for the user with the specified
 * `req.user.id`, it will return `null` or an empty array. In this case, the function will return a
 * JSON response with a status of 404 and a message saying "Tasks not found...". If tasks are found,
 * the function will return a JSON response with the tasks data.
 */
export const getTasks = async (req, res) => {
    const tasks = await Task.find({user: req.user.id}).populate("user"); // populate para traer los datos del user
    if (!tasks) {
        return res.status(404).json({ message: "Tasks no found..." });
    }
    res.json(tasks);
}


/**
 * The function `getTask` retrieves a task by its ID and populates the user data associated with that
 * task.
 * @param req - The `req` parameter in the code snippet represents the request object, which contains
 * information about the HTTP request that was made. This object includes properties such as the
 * request URL, request method, request headers, request parameters, and request body. It is typically
 * provided by the Express.js framework when handling HTTP
 * @param res - The `res` parameter in the code snippet refers to the response object in an Express.js
 * route handler. It is used to send a response back to the client making the request. In this case,
 * the `res` object is used to send a JSON response containing the task data back to the client
 * @returns If the task with the specified ID is found in the database, the task object along with the
 * user data (populated) will be returned in the response. If the task is not found, a 404 status with
 * a message "Task not found..." will be returned.
 */
export const getTask = async (req, res) => {
    const oneTask = await Task.findById(req.params.id).populate("user"); // populate para traer los datos del user
    if (!oneTask) {
        return res.status(404).json({ message: "Task no found..." });
    }
    res.json(oneTask);
}


/**
 * The function `createTask` creates a new task with the provided title, description, and date, and
 * associates it with the user making the request.
 * @param req - The `req` parameter in the `createTask` function typically represents the HTTP request
 * object, which contains information about the incoming request from the client, such as the request
 * headers, parameters, body, and more. In this case, it is being used to extract the `title`,
 * `description`,
 * @param res - The `res` parameter in the `createTask` function is the response object that will be
 * sent back to the client once the task creation process is completed. It is used to send a response
 * containing the saved task data in JSON format.
 */
export const createTask = async (req, res) => {
    const { title, description, date } = req.body;
    const newTask = new Task({
        title,
        description, 
        date,
        user: req.user.id
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
}


/**
 * The function `UpdateTask` updates a task in a database and returns the updated task, or a "Task not
 * found" message if the task does not exist.
 * @param req - The `req` parameter in the `UpdateTask` function is an object representing the HTTP
 * request. It contains information about the request made to the server, such as the request
 * parameters, body, headers, and more. In this context, `req.params.id` refers to the parameter `id`
 * @param res - The `res` parameter in the `UpdateTask` function is the response object that is used to
 * send a response back to the client making the request. It is typically used to send data, status
 * codes, and other information back to the client. In the provided code snippet, `res` is
 * @returns The `UpdateTask` function is updating a task in the database based on the `id` provided in
 * the request parameters (`req.params.id`) with the data in the request body (`req.body`). If the task
 * is successfully updated, the updated task data is returned in the response. If the task is not found
 * (i.e., `!oneTask`), a 404 status with a JSON
 */
export const UpdateTask = async (req, res) => {
    const oneTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });  // Devuelve el dato nuevo
    if (!oneTask) {
        return res.status(404).json({ message: "Task no found..." });
    }
    res.json(oneTask);
}


/**
 * The function `deleteTask` deletes a task by its ID and returns the deleted task if found, otherwise
 * returns a 404 error message.
 * @param req - The `req` parameter in the `deleteTask` function is an object representing the HTTP
 * request. It contains information about the request made to the server, such as the request
 * parameters, headers, body, and other details. In this context, `req.params.id` is used to access the
 * `
 * @param res - The `res` parameter in the `deleteTask` function is the response object that is used to
 * send a response back to the client making the request. It is typically used to send HTTP responses
 * with data or status codes.
 * @returns The `deleteTask` function is returning the deleted task if it exists, along with its
 * associated user after deleting it from the database. If the task is not found, it returns a 404
 * status with a message "Task not found...".
 */
export const deleteTask = async (req, res) => {
    const oneTask = await Task.findByIdAndDelete(req.params.id).populate("user");
    if (!oneTask) {
        return res.status(404).json({ message: "Task no found..." });
    }
    res.json(oneTask);
}

