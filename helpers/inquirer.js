const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            {
                value: '1',
                name: `${'1.'.brightMagenta} Create list`
            }, 
            {
                value: '2',
                name: `${'2.'.brightMagenta} List tasks`
            },
            {
                value: '3',
                name: `${'3.'.brightMagenta} List completed tasks`
            },
            {
                value: '4',
                name: `${'4.'.brightMagenta} List pending tasks`
            },
            {
                value: '5',
                name: `${'5.'.brightMagenta} Complete tasks`
            },
            {
                value: '6',
                name: `${'6.'.brightMagenta} Delete task`
            },
            {
                value: '0',
                name: `${'0.'.brightMagenta} Exit\n`
            },
        ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('----------------------------'.brightWhite.bgMagenta);
    console.log('     Select an option:      '.brightWhite.bgMagenta);
    console.log('----------------------------\n'.brightWhite.bgMagenta);
    
    const {option} = await inquirer.prompt(questions);
    return option;
}

const pause = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.brightMagenta} to continue`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async(message) => {
    const question =[
        {
            type: 'input',
            name: 'description',
            message,
            validate(value){
                if(value.length === 0 ){
                    return 'Please enter a value';
                }
                else return true;
            }
        }
    ];

    const {description} = await inquirer.prompt(question);
    return description;
}

const listTaskDelete = async(tasks = []) => {
    const choices = tasks.map((task, i) =>{
        const idx = `${i+1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.description}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]

    const {id} = await inquirer.prompt(questions);
    return id;
}

const confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const showListCheck = async(tasks = []) => {
    const choices = tasks.map((task, i) =>{
        const idx = `${i+1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.description}`,
            checked: (task.completedIn) ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    inquirerMenu, 
    pause,
    readInput,
    listTaskDelete,
    confirm,
    showListCheck
}