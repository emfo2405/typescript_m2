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
        if (task === "" || ![1, 2, 3].includes(priority)) {
            return false;
        } else {
    
        //Ett nytt objekt för att-göra listan
    let newTodo: Todo = {
        task: task,
        completed: false,
        priority: priority as 1 | 2 | 3,
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
        //Kontrollera att det finns sparade värden och hämta dem
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
let toDoListUl = document.getElementById("list-prio1") as HTMLUListElement;
let toDoListUl2 = document.getElementById("list-prio2") as HTMLUListElement;
let toDoListUl3 = document.getElementById("list-prio3") as HTMLUListElement;
let taskForm = document.getElementById("task-form") as HTMLFormElement;

//Funktion för att lägga till nytt element i listan
function printToDoList() {

    //Rensa listan för att inte skapa multiplar
    toDoListUl.innerHTML = "";
    toDoListUl2.innerHTML = "";
    toDoListUl3.innerHTML = "";

    //För varje element i listan todos skapas ett li-element i listan
    toDoListEl.getTodos().forEach((Todo, todoIndex) =>
    {
        //Skapa ett nytt li element i listan med text från objektet
        let li = document.createElement("li");
            li.innerText = `${Todo.task}`;
        //Markerar om en uppgift är slutförd
        li.style.textDecoration = Todo.completed ? "line-through" : "none";


        let doneButton = document.createElement("button");
        doneButton.innerText = "Slutför";
        doneButton.id = "done-button";
        doneButton.addEventListener("click", () => {
            toDoListEl.markTodoCompleted(todoIndex);
            toDoListEl.saveToLocalStorage();
            printToDoList();
        })

        //Lägg till knapp på listelementen
        li.appendChild(doneButton);

        //Lägg till element i olika listor baserat på prioritet
        if(Todo.priority === 1) {
             toDoListUl.appendChild(li);
        } else if(Todo.priority === 2) {
                 toDoListUl2.appendChild(li);
        } else {
            toDoListUl3.appendChild(li);
        }
    });
}

/*När användaren klickar på submit körs funktionen medan preventDefault hindrar sidan från att laddas om när 
formuläret skickas och istället hanterar vi händelsen med TypeScript*/
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    //Hämta värden för uppgift och prioritering från formulärinputs
    let taskInput = toDoEl.value;
    let priorityInput = parseInt(priorityEl.value);

    //Lägga till värdena från formuläret i klassen todolist
    let userInput = toDoListEl.addTodo(taskInput, priorityInput);

    //Om userInput inte överensstämmer med det som är sagt visas ett felmeddelande
    if(!userInput) {
        alert("Kontrollera att fälten är ifyllda och att prioriteringen är 1, 2 eller 3!");
        return;
    }

    taskForm.reset();
    printToDoList();

});

printToDoList();

