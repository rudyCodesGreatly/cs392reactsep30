import React from "react";

const Selector = ({state_of_season, setSeason}) =>{
    return (
        <div className="flex m-4">
            <button onClick={() => setSeason("fall")}
                    className="bg-amber-200 border-2 border-black px-2 py-1 m-1 cursor-pointer hover:bg-gray-200">fall
            </button>
            <button onClick={() => setSeason("winter")}
                    className="bg-white border-2 border-black px-2 py-1 m-1 cursor-pointer hover:bg-gray-200">winter
            </button>
            <button onClick={() => setSeason("spring")}
                    className="bg-green-200 border-2 border-black px-2 py-1 m-1 cursor-pointer hover:bg-gray-200">spring
            </button>
        </div>
    )
}

export default Selector;

