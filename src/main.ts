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

    //addTodo(task: string, priority: number): boolean {
    //    if(task != "" && priority === 1 || 2 || 3 )
    //        return true
    //} 
}