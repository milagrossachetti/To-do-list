require('colors');
const {inquirerMenu, 
    pause, 
    readInput,
    listTaskDelete,
    confirm,
    showListCheck
    } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');
const {saveDB, readDB} = require('./helpers/saveFile');

const main = async() => {
    const tasks = new Tasks();
    let opt = '';
    const tasksDB = readDB();
    if(tasksDB){  //cargar tareas
        tasks.uploadTasksFromArray(tasksDB);
    }
    do{
        opt = await inquirerMenu();
        switch(opt){
            case '1':
                const description = await readInput('Description: ');
                tasks.createTask(description);
            break;
            case '2':
                tasks.fullList();
            break;
            case '3':
                tasks.listPendingCompleted(true);
            break;
            case '4':
                tasks.listPendingCompleted(false);
            break;
            case '5':
                const ids = await showListCheck(tasks.listArr);
                tasks.toggleCompleted(ids);
            break;
            case '6':
                const id = await listTaskDelete(tasks.listArr);
                if(id !== '0'){
                    const ok = await confirm('Are you sure?');
                    if(ok){
                        tasks.deleteTask(id);
                    }
                }
            break;
        }
        saveDB(tasks.listArr);
        await pause();
    }while(opt !== '0');
}

main();