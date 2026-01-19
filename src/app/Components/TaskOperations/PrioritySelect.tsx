/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

export default function PrioritySelect(priority: any): any {
    const [priorityStatus, setPriorityStatus] = useState(priority)

    return (
        <div>
            <select
                name="priorityStatus"
                value={priorityStatus}
                // @ts-expect-error value exists
                onChange={e => setPriorityStatus(e.target.value)}
            >
                <option value="high">HIGH</option>
                <option value="medium">MEDIUM</option>
                <option value="low">LOW</option>
            </select>
            <br />
        </div>
    )
}