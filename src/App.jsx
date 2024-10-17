// src/App.jsx
import React, {useState} from "react";
import Banner from "./components/Banner.jsx";
import Catalog from "./components/Catalog.jsx";
import {useJsonQuery} from './utilities/fetch';
import termSelector from "./components/termSelector.jsx";
import Selector from "./components/termSelector.jsx";
import Cart from "./components/Cart.jsx";

const App = () => {

    const [season, setSeason] = useState("fall");
    const [isShopping, setIsShopping] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [viewingCart, setViewingCart] = useState(false);

    const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;

    const schedule = data;

    return (<div className="min-h-screen p-4 bg-blue-100">

        <Banner title={schedule.title}/>

        <div>

            <div className="flex justify-between items-center">

                <div className="flex justify-start">
                    <Cart isShopping={isShopping} setIsShopping={setIsShopping} viewingCart={viewingCart} setViewingCart={setViewingCart}></Cart>
                </div>

                <div className="flex justify-end">
                    <Selector state_of_season={season} setSeason={setSeason}></Selector>
                </div>

            </div>

        </div>

        <Catalog courses={schedule.courses}
                 state_of_season={season}
                 isShopping = {isShopping}
                 selectedCourses = {selectedCourses}
                 setSelectedCourses = {setSelectedCourses}
                 viewingCart = {viewingCart}
        />

    </div>);
};

export default App;
