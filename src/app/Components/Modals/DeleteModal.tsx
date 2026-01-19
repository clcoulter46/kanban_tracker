import React from "react";

export interface Props {
    id: string,
    onConfirmDelete: (event: React.MouseEvent<HTMLElement>) => void,
    onBackClick: (event: React.MouseEvent<HTMLElement>, id: number) => void,
}

const DeleteModal: React.FC<Props> = props => {
    return (
        <div className="delete-modal" id="delete-modal">
            <div>Are you sure you want to delete this task?</div>
            <div className="evenly-spaced-buttons">
                {/* @ts-expect-error event handler error */}
                <button onClick={props.onBackClick} className="button">Back</button>
                {/* @ts-expect-error event handler error */}
                <button onClick={() => props.onConfirmDelete(props.id)} style={{color: "red"}} className="button">Confirm</button>
            </div>
        </div>
    )
}

export default DeleteModal