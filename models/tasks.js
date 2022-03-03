const Task = require('./task');

class Tasks {
    _list = {};

    get listArr() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            const task = this._list[key];
            list.push(task);
        })
        return list;
    } //convierte un objeto a un array 

    constructor(){
        this._list = {};
    }

    deleteTask(id){
        if(this._list[id]){
            delete this._list[id];
        }
    }

    uploadTasksFromArray(tasks){
        tasks.forEach(task => {
            this._list[task.id] = task;
        })
    }

    createTask(description) {
        const task = new Task(description);
        this._list[task.id] = task;
    }

    fullList() {
        this.listArr.forEach((task, i) => {
            const idx = `${i+1}.`.green;
            const {description, completedIn} = task;
            const status = (completedIn)
                                ? 'Completed'.green
                                : 'Pending'.red;
            console.log(`${idx} ${description} :: ${status}`);
        })
    }

    listPendingCompleted(completed = true){
        let i = 0;
        this.listArr.forEach(task => {
            const {description, completedIn} = task;
            const status = (completedIn)
                                ? 'Completed'.green
                                : 'Pending'.red;
            if(completed){
                if(completedIn){
                    i++;
                    console.log(`${(i + '.').green} ${description} :: ${status}`);
                }
            } else {
                if(!completedIn){
                    i++;
                    console.log(`${(i + '.').green} ${description} :: ${status}`);
                }
            }
            
        })
    }

    toggleCompleted(ids = []){
        ids.forEach(id => {
            const task = this._list[id];
            if(!task.completedIn){
                task.completedIn = new Date().toISOString();
            }
        });
        this.listArr.forEach( task => {
            if(!ids.includes(task.id)){
               this._list[task.id].completedIn = null;
            }
        })
    }
}

module.exports = Tasks;