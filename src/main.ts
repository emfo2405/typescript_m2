interface Todo {
    task: string,
    completed: boolean,
    priority: 1 | 2 | 3;
}

//Skapar en klass som heter ToDoList
class ToDoList {
    //Skapar en array där inmatade objekt kan lagras
    private todos: Todo[] = [];

    //Skapar en konstruktor 
    constructor(todos: Todo[]) {
        this.todos = [];

    }


}

//Hämtar in elementen från HTML
let taskForm = document.getElementById("taskForm") as HTMLFormElement;
let toDoEl = document.getElementById("task") as HTMLInputElement;
let priorityEl = document.getElementById("priority") as HTMLInputElement;