class TaskPrioritizer {
    constructor() {
        this.tasks = [];
    }

    addTask(name, importance, urgency) {
        const task = { name, importance, urgency, score: importance + urgency };
        this.tasks.push(task);
        this.prioritizeTasks();
    }

    prioritizeTasks() {
        this.tasks.sort((a, b) => b.score - a.score);
    }

    getTasks() {
        return this.tasks;
    }
}

export default TaskPrioritizer;
