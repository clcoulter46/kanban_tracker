/* eslint-disable @typescript-eslint/no-explicit-any */
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
            // @ts-expect-error task status does exist
            const scheduledTaskList: Array<object>= tasks.filter((task: object) => task?.status === "scheduled")
            // @ts-expect-error task status does exist
            const inProgressTaskList: Array<object> = tasks.filter((task: object) => task?.status === "in-progress")
            // @ts-expect-error task status does exist
            const completedTaskList: Array<object> = tasks.filter((task: object) => task?.status === "done")

            // @ts-expect-error objects in list are allowed
            setScheduledTasks(scheduledTaskList)
            // @ts-expect-error objects in list are allowed
            setInProgressTasks(inProgressTaskList)
            // @ts-expect-error objects in list are allowed
            setCompletedTasks(completedTaskList)
        }
    }, [tasks])

    useEffect(() => {
        //repeating this block for react storage reasons
        // @ts-expect-error task status does exist
        const scheduledTaskList: Array<object> = tasks.filter((task: object) => task?.status === "scheduled")
        // @ts-expect-error task status does exist
        const inProgressTaskList: Array<object> = tasks.filter((task: object) => task?.status === "in-progress")
        // @ts-expect-error task status does exist
        const completedTaskList: Array<object> = tasks.filter((task: object) => task?.status === "done")

        // @ts-expect-error objects in list are allowed
        setScheduledTasks(scheduledTaskList)
        // @ts-expect-error objects in list are allowed
        setInProgressTasks(inProgressTaskList)
        // @ts-expect-error objects in list are allowed
        setCompletedTasks(completedTaskList)
    }, [tasks, taskList])

    useEffect(() => {
        // @ts-expect-error task status does exist
        const scheduledTaskList = filterList.filter((task: object) => task?.status === "scheduled")
        // @ts-expect-error task status does exist
        const inProgressTaskList = filterList.filter((task: object) => task?.status === "in-progress")
        // @ts-expect-error task status does exist
        const completedTaskList = filterList.filter((task: object) => task?.status === "done")

        setScheduledTasks(scheduledTaskList)
        setInProgressTasks(inProgressTaskList)
        setCompletedTasks(completedTaskList)
    }, [filterList])

    const onConfirmDelete = (id: number) => {
        try {
            // @ts-expect-error task id does exist
            const deletedTaskIndex = tasks.findIndex((task) => task.id === id)
            const newTaskList = tasks.splice(deletedTaskIndex, 1)
            setTaskList(newTaskList)
        } catch {
            return new Error(`deleting task unsuccessful for task id ${id}`)
        }
    }

    const onTaskStatusChange = async (status: string, id: number) => {
        try {
            // @ts-expect-error task id does exist
            const updatedTask = tasks.filter((task) => task.id === id)[0]
            // @ts-expect-error task status does exist
            updatedTask.status = status
            // @ts-expect-error task id does exist
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
            // @ts-expect-error need to pass form into FormData
            const formData = new FormData(form)
            const formJson = Object.fromEntries(formData.entries())

            let updatedTask: any = {
                title: "",
                description: "",
                assignee: "",
                tags: "",
                priority: "",
            }
            // @ts-expect-error task id does exist
            updatedTask = tasks.filter((task) => task.id === Number(formJson.id))[0]
            updatedTask.title = formJson.title
            updatedTask.description = formJson.description
            updatedTask.assignee = formJson.assignee
            updatedTask.tags = String(formJson.tags).split(',')
            updatedTask.priority = formJson.priority

            // @ts-expect-error task id does exist
            const updatedTaskList = await tasks.map(task => [updatedTask].find(o => o.id === task.id))
            setTaskList(updatedTaskList)
        } catch {
            return new Error(`Editing task unsuccesful`)
        }
    }

    const onKeywordClick = async (e: Event, keyword: string) => {
        e.preventDefault()
        try {
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
            const filteredList: any = await tasks.filter((task) => {
                // @ts-expect-error task assignee does exist
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
            const filteredList: any = await tasks.filter((task) => {
                // @ts-expect-error task tags do exist
                const listValues = task.tags
                return listValues.some((value: any) => {
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
            // @ts-expect-error need to pass form argument to FormData
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
                // @ts-expect-error task tags do exist
                newTask.tags = String(formJson?.tags).split(',').join()
            } 
            newTask.priority = String(formJson?.priority)
            newTask.status = "scheduled"
            const newDate = new Date();
            // @ts-expect-error task createdAt does exist
            newTask.createdAt = newDate.toLocaleString()
            let updatedList: Array<object>
            if (taskList) {
                // @ts-expect-error object error not valid
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
                    // @ts-expect-error event handler
                    onConfirmAddTask={onConfirmAddTask}
                    onExitClick={onExitClick}
                />),
                // @ts-expect-error addModalRef.current exist
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
                        // @ts-expect-error event handler
                        onKeywordClick={onKeywordClick}
                        // @ts-expect-error event handler
                        onAssigneeClick={onAssigneeClick}
                        // @ts-expect-error event handler
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
                                    // @ts-expect-error event handler
                                    onTaskStatusChange={onTaskStatusChange}
                                    // @ts-expect-error event handler
                                    onConfirmDelete={onConfirmDelete}
                                    // @ts-expect-error event handler
                                    onConfirmEdit={onConfirmEdit}
                                />
                                <KanbanCategory
                                    category={"In-progress"}
                                    tasks={inProgressTasks}
                                    // @ts-expect-error event handler
                                    onTaskStatusChange={onTaskStatusChange}
                                    // @ts-expect-error event handler
                                    onConfirmDelete={onConfirmDelete}
                                    // @ts-expect-error event handler
                                    onConfirmEdit={onConfirmEdit}
                                />
                                <KanbanCategory
                                    category={"Done"}
                                    tasks={doneTasks}
                                    // @ts-expect-error event handler
                                    onTaskStatusChange={onTaskStatusChange}
                                    // @ts-expect-error event handler
                                    onConfirmDelete={onConfirmDelete}
                                    // @ts-expect-error event handler
                                    onConfirmEdit={onConfirmEdit}
                                />
                            </>
                            : <div>Loading, please wait</div>}
                    </div>
                </div>}
        </div>
    );
}