import TaskPrioritizer from '../src/index.js';

const taskPrioritizer = new TaskPrioritizer();
taskPrioritizer.addTask('Menulis laporan', 5, 3);
taskPrioritizer.addTask('Rapat dengan tim', 4, 5);
taskPrioritizer.addTask('Belajar materi baru', 3, 2);
taskPrioritizer.addTask('Membalas email', 2, 4);

console.log(taskPrioritizer.getTasks());
