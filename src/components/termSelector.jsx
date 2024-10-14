import React from "react";
import {useState} from "react";

const season = useState("fall", setState);

const Selector = () => (
    <div className="flex m-4">
        <div className="border-2 border-black px-2 py-1 m-1 cursor-pointer hover:bg-gray-200">fall</div>
        <div className="border-2 border-black px-2 py-1 m-1 cursor-pointer hover:bg-gray-200">winter</div>
        <div className="border-2 border-black px-2 py-1 m-1 cursor-pointer hover:bg-gray-200">spring</div>
    </div>
)

export default Selector;