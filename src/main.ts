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

    addTodo(task:string, priority:number): boolean {
        if (task === "" || priority != 1 || 2 || 3) {
            return false;
        }
    }


}

/*let taskForm = document.getElementById("taskForm") as HTMLFormElement;

//Hämta in den inmatade informationen från användaren
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

//Hämtar in elementen från HTML
let toDoEl = document.getElementById("task") as HTMLInputElement;
let priorityEl = document.getElementById("priority") as HTMLInputElement;

let newToDo: Todo = {
    task: toDoEl.value,
    priority: priorityEl.value,
    completed: false
  };

  console.log(newToDo);
})*/
