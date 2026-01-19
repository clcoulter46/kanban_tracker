import React, { useState, useRef, useEffect } from "react";

import { heightAdjuster } from "@/app/utils";

export interface Props {
    id: string,
    title: string,
    description: string,
    assignee: string,
    tags: string,
    priority: string,
    onConfirmEdit: (event: React.MouseEvent<HTMLElement>) => void,
    onBackClick: (event: React.MouseEvent<HTMLElement>) => void,
    onConfirmClick: (event: React.MouseEvent<HTMLElement>) => void,
}

const EditModal: React.FC<Props> = props => {
    const [newTitle, setNewTitle] = useState(props.title)
    const [newDescription, setNewDescription] = useState(props.description)
    const [newAssignee, setNewAssignee] = useState(props.assignee)
    const [newTags, setNewTags] = useState(props.tags)
    const [priorityStatus, setPriorityStatus] = useState(props.priority)
    const tagsRef = useRef(null)
    const descriptionRef = useRef(null)

    useEffect(() => {
        heightAdjuster(tagsRef)
    }, [newTags])

    useEffect(() => {
        heightAdjuster(descriptionRef)
    }, [newDescription])

    return (
        <form className="edit-modal" id="edit-modal" onSubmit={props.onConfirmEdit}>
            <div>Make changes below, then Confirm to save changes.</div>
            <div style={{ flexDirection: "column" }}>
                <div>
                    <label>
                        <b>ID: {' '}</b>
                    </label>
                    <input
                        name="id"
                        value={props.id}
                        readOnly={true}
                    />
                </div>
                <div>
                    <label>
                        <b>Title: {' '}</b>
                        <br />
                        <input
                            name="title"
                            value={newTitle}
                            // @ts-expect-error value does exist
                            onChange={e => setNewTitle(e.target.value)}
                        />
                    </label>
                </div>
                <hr />
                <div>
                    <label>
                        <b>Description: {' '}</b>
                        <textarea
                            name="description"
                            value={newDescription}
                            // @ts-expect-error value does exist
                            onChange={e => setNewDescription(e.target.value)}
                            ref={descriptionRef}
                        />
                    </label>
                </div>
                <hr />
                <div>
                    {/* TODO: be able to validate this from a list of names */}
                    <label>
                        <b>Assignee: {' '}</b>
                        <input
                            name="assignee"
                            value={newAssignee}
                            // @ts-expect-error value does exist
                            onChange={e => setNewAssignee(e.target.value)}
                        />
                    </label>
                </div>
                <hr />
                <div>
                    <label>
                        <b>Tags (separate with commas): {' '}</b>
                        <textarea
                            name="tags"
                            value={newTags}
                            // @ts-expect-error value does exist
                            onChange={e => setNewTags(e.target.value)}
                            ref={tagsRef}
                        />
                    </label>
                </div>
                <hr />
                <b>Priority:</b>
                <div>
                    <select
                        name="priority"
                        value={priorityStatus}
                        // @ts-expect-error value does exist
                        onChange={e => setPriorityStatus(e.target.value)}
                    >
                        <option value="high">HIGH</option>
                        <option value="medium">MEDIUM</option>
                        <option value="low">LOW</option>
                    </select>
                    <br />
                </div>
            </div>
            <div className="evenly-spaced-buttons">
                <button type="button" onClick={props.onBackClick} className="button">Back</button>
                <button type="submit" className="button" onSubmit={props.onConfirmClick}>Confirm</button>
            </div>
        </form>
    )
}

export default EditModal