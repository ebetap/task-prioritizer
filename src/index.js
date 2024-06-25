class TaskPrioritizer {
    constructor() {
        this.tasks = [];
    }

    addTask(name, importance, urgency, dueDate = null) {
        if (this.tasks.some(task => task.name === name)) {
            throw new Error('Task with this name already exists.');
        }
        const task = { name, importance, urgency, dueDate, score: importance + urgency, completed: false };
        this.tasks.push(task);
        this.prioritizeTasks();
    }

    prioritizeTasks(customSort = null) {
        if (customSort) {
            this.tasks.sort(customSort);
        } else {
            this.tasks.sort((a, b) => {
                if (a.score === b.score) {
                    if (a.dueDate && b.dueDate) {
                        return new Date(a.dueDate) - new Date(b.dueDate);
                    } else if (a.dueDate) {
                        return -1;
                    } else if (b.dueDate) {
                        return 1;
                    }
                    return a.name.localeCompare(b.name);
                }
                return b.score - a.score;
            });
        }
    }

    completeTask(name) {
        const task = this.tasks.find(task => task.name === name);
        if (task) task.completed = true;
    }

    deleteTask(name) {
        this.tasks = this.tasks.filter(task => task.name !== name);
    }

    getTasks(includeCompleted = false) {
        if (includeCompleted) {
            return this.tasks;
        }
        return this.tasks.filter(task => !task.completed);
    }
}

export default TaskPrioritizer;
