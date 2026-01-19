import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import KanbanCategory from "./KanbanCategory";
import SearchBar from "./SearchBar"
import AddTaskModal from "./Modals/AddTaskModal";

export interface Props {
    tasks: Array<object>
}

export default function KanbanContainer(props: Props): any {
    const { tasks } = props

    const [scheduledTasks, setScheduledTasks] = useState([])
    const [inProgressTasks, setInProgressTasks] = useState([])
    const [doneTasks, setCompletedTasks] = useState([])
    const [taskList, setTaskList] = useState(tasks)
    const [filterList, setFilterList] = useState([])
    const [showAddModal, setShowAddModal] = useState(false)
    const addModalRef = useRef(null)

    useEffect(() => {
        // just for inital render
        if (tasks.length > 0) {
            // @ts-expect-error
            const scheduledTaskList: Array<object>= tasks.filter((task: object) => task?.status === "scheduled")
            // @ts-expect-error
            const inProgressTaskList: Array<object> = tasks.filter((task: object) => task?.status === "in-progress")
            // @ts-expect-error
            const completedTaskList: Array<object> = tasks.filter((task: object) => task?.status === "done")

            // @ts-expect-error
            setScheduledTasks(scheduledTaskList)
            // @ts-expect-error
            setInProgressTasks(inProgressTaskList)
            // @ts-expect-error
            setCompletedTasks(completedTaskList)
        }
    }, [tasks])

    useEffect(() => {
        //repeating this block for react storage reasons
        // @ts-expect-error
        const scheduledTaskList: Array<object> = tasks.filter((task: object) => task?.status === "scheduled")
        // @ts-expect-error
        const inProgressTaskList: Array<object> = tasks.filter((task: object) => task?.status === "in-progress")
        // @ts-expect-error
        const completedTaskList: Array<object> = tasks.filter((task: object) => task?.status === "done")

        // @ts-expect-error
        setScheduledTasks(scheduledTaskList)
        // @ts-expect-error
        setInProgressTasks(inProgressTaskList)
        // @ts-expect-error
        setCompletedTasks(completedTaskList)
    }, [taskList])

    useEffect(() => {
        // @ts-expect-error
        const scheduledTaskList = filterList.filter((task: object) => task?.status === "scheduled")
        // @ts-expect-error
        const inProgressTaskList = filterList.filter((task: object) => task?.status === "in-progress")
        // @ts-expect-error
        const completedTaskList = filterList.filter((task: object) => task?.status === "done")

        setScheduledTasks(scheduledTaskList)
        setInProgressTasks(inProgressTaskList)
        setCompletedTasks(completedTaskList)
    }, [filterList])

    const onConfirmDelete = (id: number) => {
        try {
            // @ts-expect-error
            const deletedTaskIndex = tasks.findIndex((task) => task.id === id)
            const newTaskList = tasks.splice(deletedTaskIndex, 1)
            setTaskList(newTaskList)
        } catch {
            return new Error(`deleting task unsuccessful for task id ${id}`)
        }
    }

    const onTaskStatusChange = async (status: string, id: number) => {
        try {
            // @ts-expect-error
            const updatedTask = tasks.filter((task) => task.id === id)[0]
            // @ts-expect-error
            updatedTask.status = status
            // @ts-expect-error
            const updatedTaskList: Array<object> = await tasks.map(task => [updatedTask].find(o => o.id === task.id))
            setTaskList(updatedTaskList)

        } catch {
            return new Error(`updating task status Unsuccessful for task id ${id} - ${status} `)
        }
    }

    const onConfirmEdit = async (e: Event) => {
        e.preventDefault()
        try {
            const form = e.target
            // @ts-expect-error
            const formData = new FormData(form)
            const formJson = Object.fromEntries(formData.entries())

            let updatedTask: any = {
                title: "",
                description: "",
                assignee: "",
                tags: "",
                priority: "",
            }
            // @ts-expect-error
            updatedTask = tasks.filter((task) => task.id === Number(formJson.id))[0]
            updatedTask.title = formJson.title
            updatedTask.description = formJson.description
            updatedTask.assignee = formJson.assignee
            updatedTask.tags = String(formJson.tags).split(',')
            updatedTask.priority = formJson.priority

            // @ts-expect-error
            const updatedTaskList = await tasks.map(task => [updatedTask].find(o => o.id === task.id))
            setTaskList(updatedTaskList)
        } catch {
            return new Error(`Editing task unsuccesful`)
        }
    }

    const onKeywordClick = async (e: Event, keyword: string) => {
        e.preventDefault()
        try {
            // @ts-ignore
            const filteredList: any = await tasks.filter((task) => {
                const listValues = Object.values(task)
                return listValues.some((value) => {
                    return String(value).toLowerCase().includes(keyword.toLowerCase())
                })
            })
            setFilterList(filteredList)
        } catch {
            return new Error(`Searching for keyword ${keyword} unsuccessful`)
        }
    }

    const onAssigneeClick = async (e: Event, assignee: string) => {
        e.preventDefault()
        try {
            // @ts-ignore
            const filteredList: any = await tasks.filter((task) => {
                // @ts-expect-error
                return String(task.assignee).toLowerCase().includes(assignee.toLowerCase())
            })
            setFilterList(filteredList)
        } catch {
            return new Error(`Searching for assignee ${assignee} unsuccessful`)
        }
    }

    const onTagClick = async (e: Event, tag: string) => {
        e.preventDefault()
        try {
            // @ts-ignore
            const filteredList: any = await tasks.filter((task) => {
                // @ts-expect-error
                const listValues = task.tags
                // @ts-expect-error
                return listValues.some((value) => {
                    return String(value).toLowerCase().includes(tag.toLowerCase())
                })
            })
            setFilterList(filteredList)
        } catch {
            return new Error(`Searching for tag ${tag} unsuccessful`)
        }
    }

    const onAddTaskClick = () => {
        setShowAddModal(true)
    }

    const onConfirmAddTask = (e: Event) => {
        e.preventDefault()
        try {
            const form = e.target
            // @ts-expect-error
            const formData = new FormData(form)
            const formJson = Object.fromEntries(formData.entries())

            const newTask = {
                id: 0,
                title: '',
                description: '',
                assignee: '',
                tags: [],
                priority: '',
                status: '',
            }
            const randomId = Math.floor(Math.random() * 90) + 15;
            newTask.id = randomId
            //normally a database would just do this so I'm making something work for now
            newTask.title = String(formJson.title)
            newTask.description = String(formJson?.description)
            newTask.assignee = String(formJson.assignee)
            if (formJson.tags) { 
                // @ts-expect-error
                newTask.tags = String(formJson?.tags).split(',').join()
            } 
            newTask.priority = String(formJson?.priority)
            newTask.status = "scheduled"
            const newDate = new Date();
            // @ts-expect-error
            newTask.createdAt = newDate.toLocaleString()
            let updatedList: Array<object>
            if (taskList) {
                // @ts-expect-error
                updatedList = taskList.push(newTask)
            } else {
                updatedList = [newTask]
            }
            
            setTaskList(updatedList)
            tasks.push(newTask)
        } catch (error){
            console.error('error', error)
            return new Error(`Unable to create new task`)
        }
        setShowAddModal(false)
    }

    const onExitClick = () => {
        setShowAddModal(false)
    }

    return (
        <div ref={addModalRef}>
            {showAddModal ? createPortal((
                <AddTaskModal
                    onConfirmAddTask={onConfirmAddTask}
                    onExitClick={onExitClick}
                />),
                // @ts-expect-error
                addModalRef.current
            ) :
                <div>
                    <button
                        className="button"
                        onClick={() => onAddTaskClick()}
                    >
                        Add New Task
                    </button>
                    <SearchBar
                        onKeywordClick={onKeywordClick}
                        onAssigneeClick={onAssigneeClick}
                        onTagClick={onTagClick}
                    />

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-evenly",
                            flexGrow: "1"
                        }}
                    > 
                        {taskList ?
                            <>
                                <KanbanCategory
                                    category={"Scheduled"}
                                    tasks={scheduledTasks}
                                    onTaskStatusChange={onTaskStatusChange}
                                    onConfirmDelete={onConfirmDelete}
                                    onConfirmEdit={onConfirmEdit}
                                />
                                <KanbanCategory
                                    category={"In-progress"}
                                    tasks={inProgressTasks}
                                    onTaskStatusChange={onTaskStatusChange}
                                    onConfirmDelete={onConfirmDelete}
                                    onConfirmEdit={onConfirmEdit}
                                />
                                <KanbanCategory
                                    category={"Done"}
                                    tasks={doneTasks}
                                    onTaskStatusChange={onTaskStatusChange}
                                    onConfirmDelete={onConfirmDelete}
                                    onConfirmEdit={onConfirmEdit}
                                />
                            </>
                            : <div>Loading, please wait</div>}
                    </div>
                </div>}
        </div>
    );
}