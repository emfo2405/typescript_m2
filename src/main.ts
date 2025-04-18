interface Todo {
    task: string,
    completed: boolean,
    priority: 1 | 2 | 3;
}

//Skapar en klass som heter ToDoList
class ToDoList {
    //Skapar en array där inmatade objekt kan lagras
    private todos: Todo[] = [];

    //Skapar en konstruktor som hämtar värden från localStorage
    constructor() {
        this.loadFromLocalStorage();
    }

    //Om en uppgift är tom eller prioriteten inte är 1,2 eller 3 ska den markeras som false
    addTodo(task:string, priority:number): boolean {
        if (task === "" || priority != 1 || 2 || 3) {
            return false;
        } else {
    
        //Ett nytt objekt för att-göra listan
    let newTodo: Todo = {
        task: task,
        completed: false,
        priority: priority,
    };
    
    //Lägger till det nya objektet i todos och sparar i localStorage
    this.todos.push(newTodo);
    this.saveToLocalStorage();
    return true;
    }
}


    //För att kunna markera en uppgift som klar med en viss plats i arrayen
    markTodoCompleted(todoIndex: number): void {
        //Kontrollera att det finns en uppgift på platsen i arrayen
        if(this.todos[todoIndex]) {
            //Om det finns en task på platsen i arrayen markerar vi den som klar
            this.todos[todoIndex].completed = true;
        }
    }

    //Returnerar de inmatade värdena från arrayen
    getTodos(): Todo[] {
        return this.todos;
    }

    //Sparar värden till localstorage
    saveToLocalStorage(): void {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    //Hämta värden från localstorage
    loadFromLocalStorage(): void {
        //Hämtar in sparade värden från localstorage
        let savedTasks = localStorage.getItem('todos');
        //Kontrollera att det finns sparade värden
        if(savedTasks) {
            this.todos = JSON.parse(savedTasks);
        }
    }

}

let toDoListEl = new ToDoList();

//Hämtar in elementen från HTML-fil
let toDoEl = document.getElementById("task") as HTMLInputElement;
let priorityEl = document.getElementById("priority") as HTMLInputElement;
let submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;
let toDoListUl = document.getElementById("listUL") as HTMLUListElement;

//Funktion för att lägga till 
function printToDoList() {

    //Rensa listan för att inte skapa multiplar
    toDoListUl.innerHTML = "";

    toDoListEl.getTodos().forEach((Todo, todoIndex) =>
    {
        //Skapa ett nytt li element i listan med text från objektet
        let li = document.createElement("li");
        li.innerText = `${Todo.task}, med prioriteten ${Todo.priority}`;

        toDoListUl.appendChild(li);

    }
)
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
