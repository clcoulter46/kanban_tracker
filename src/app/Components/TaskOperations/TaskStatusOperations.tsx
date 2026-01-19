import React, { useState } from "react";

export interface Props {
    status: string,
    onStatusChange: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void,
}

const TaskStatusOperations: React.FC<Props> = props => {
    const [operation, setOperation] = useState('all')

    return (
        // @ts-expect-error value does exist
        <div onChange={event => props.onStatusChange(event.target.value)}>
            <label><b>Update task status: </b></label>
            <select
                name="operation"
                value={operation}
                // @ts-expect-error value does exist
                onChange={event => setOperation(event.target.value)}
                style={{alignItems: "revert"}}
            >
                <option value="all"> - - - - - - - - - - - - </option>
                {!(props.status === "scheduled") && <option value="scheduled">Mark Scheduled</option>}
                {!(props.status === "in-progress") &&<option value="in-progress">Mark In-progress</option>}
                {!(props.status === "done") &&<option value="done">Mark Done</option>}
            </select>
        </div>
    )
}

export default TaskStatusOperations