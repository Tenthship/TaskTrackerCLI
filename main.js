const fs = require("fs");
const readline = require("readline");
let task_id = 0
const FILE = "tasks.json"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function options_menu() {
    console.log("1) Enter a new task") // Complete
    console.log("2) Update a task")
    console.log("3) Delete a task")
    console.log("4) Change task status")
    console.log("5) Display all tasks")
    console.log("6) List all tasks that are done")
    console.log("7) List all tasks that are not done")
    console.log("8) List all tasks that are in progress")
}

let data = { tasks: [] }

// Option #1
function user_input() {
    rl.question("Enter a task: ", (answer) => {


        if (fs.existsSync(FILE)) {
            const contents = fs.readFileSync(FILE, "utf8");
            if (contents.trim() !== "") {
                data = JSON.parse(contents);
            }
        }

        let currentTime = new Date()

        const task = {
            id: data.tasks.length,
            task: answer,
            status: "todo",
            createdAt: currentTime
        }

        data.tasks.push(task)

        fs.writeFileSync(FILE, JSON.stringify(data, null, 2))
        main()
    })
}

function update_task() {
    tasks_length = data.tasks.length
    if (tasks_length == 0) {
        console.log("You have no tasks to update")
    } else {
        rl.question("What is the id of the task you would like to update: ", (task_id) => {
            if (task_id >= 0 && task_id <= tasks_length) {
                rl.question("What would you like to change the task to: ", (new_task) => {
                    data.tasks[task_id].task = new_task
                    fs.writeFileSync(FILE, JSON.stringify(data, null, 2))
                    main()
                })
            } else {
                console.log("Please enter a valid task id")
                main()
            }
            
        })
    }

}

function main() {
    console.log("Hello and welcome to task tracker CLI!!!\n")
    options_menu()
    rl.question("Choose an option: ", (answer) => {
        switch (answer) {
            case "1":
                user_input()
                break
            case "2":
                update_task()
                break
            default:
                console.log("Please enter a valid response")
        }
    })

}

main()

