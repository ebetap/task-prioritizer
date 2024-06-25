class TaskPrioritizer {
    constructor() {
        this.tasks = [];
    }

    validateTaskProperties({ name, importance, urgency, dueDate }) {
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error('Task name must be a non-empty string.');
        }
        if (typeof importance !== 'number' || importance < 0 || importance > 10) {
            throw new Error('Importance must be a number between 0 and 10.');
        }
        if (typeof urgency !== 'number' || urgency < 0 || urgency > 10) {
            throw new Error('Urgency must be a number between 0 and 10.');
        }
        if (dueDate && isNaN(new Date(dueDate).getTime())) {
            throw new Error('Due date must be a valid date.');
        }
    }

    addTask(name, importance, urgency, dueDate = null, description = '', category = null) {
        this.validateTaskProperties({ name, importance, urgency, dueDate });
        if (this.tasks.some(task => task.name === name)) {
            throw new Error(`Task with the name "${name}" already exists.`);
        }
        const task = { name, importance, urgency, dueDate, description, category, score: importance + urgency, completed: false };
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

    editTask(name, updates) {
        const task = this.tasks.find(task => task.name === name);
        if (task) {
            if (updates.dueDate && isNaN(new Date(updates.dueDate).getTime())) {
                throw new Error('Due date must be a valid date.');
            }
            Object.assign(task, updates);
            this.prioritizeTasks();
        }
    }

    getTasks(includeCompleted = false) {
        if (includeCompleted) {
            return this.tasks;
        }
        return this.tasks.filter(task => !task.completed);
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            this.tasks = tasks.map(task => {
                if (task.dueDate) {
                    task.dueDate = new Date(task.dueDate);
                }
                return task;
            });
            this.prioritizeTasks();
        }
    }
}

export default TaskPrioritizer;
