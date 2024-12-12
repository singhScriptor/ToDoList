# Todo List

A simple and efficient Todo List application that allows users to add, mark as done, and delete tasks. The application uses local storage to save tasks and CRUD operations to manage tasks through an API.

## Demo

Check out the live demo of the Todo List application: [Todo List Demo](https://singhScriptor.github.io/ToDoList)



## Features

- Add new tasks with a title and description.
- Mark tasks as completed, which moves them from the Pending list to the Done list.
- Delete tasks.
- Store tasks in local storage and sync with an API.
- Responsive design using Bootstrap for a modern look and feel.

## Functionality

- **Pending List**: New tasks are added to the Pending list.
- **Done List**: When a task is marked as done, its `completed` status is updated to `true`, it is moved to the Done list, and the status is also updated on the server via an API call.
- **CRUD Operations**: Create, Read, Update, and Delete tasks using `axios` for API calls.


## Getting Started

Follow these instructions to clone the project and get it running on your local machine.

### Prerequisites

- A modern web browser.
- An internet connection to load external libraries.

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/singhScriptor/ToDoList.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd ToDoList
    ```

3. **Open the `index.html` file in your web browser**:
    ```bash
    open index.html
    ```
    Or, if you're using a code editor like Visual Studio Code, right-click on `index.html` and select `Open with Live Server` to run the application.

## Usage

- **Add a task**: Enter the task title and description, then click "Save".
- **Mark as done**: Click the "Done" button to mark the task as completed. This will move the task from the Pending list to the Done list and update the `completed` status in both `localStorage` and on the server via an API call.
- **Delete a task**: Click the "Delete" button to remove the task from the list.

## Built With

- [Bootstrap](https://getbootstrap.com/) - Front-end framework for responsive design.
- [Axios](https://axios-http.com/) - Promise-based HTTP client for the browser and Node.js.
- [Font Awesome](https://fontawesome.com/) - Icon toolkit for scalable vector icons.

## Contributing

If you have suggestions for improving the project, please open an issue or submit a pull request. Contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



