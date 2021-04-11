import React from "react";
import Admin from "../../layouts/Admin";
import Main from "./Main";

export default function Dashboard() {
    return (
        <Admin child={<Main />} />
    )
}
