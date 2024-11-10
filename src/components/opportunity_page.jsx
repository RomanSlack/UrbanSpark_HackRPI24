import { Navbar } from "./navbar";
import OpportunityCard from "./opportunity_card";

import work from './assets/work.jpeg'
import food from './assets/food.jpeg'
import education from './assets/education.jpg'
import volunteer from './assets/volunteer.jpg'
import { AppNavbar } from "./AppNavbar";
import { useLocation } from "react-router-dom";

export default function OpportunityPage() {

    const { state } = useLocation();

    const cards = [
        <OpportunityCard
        uri={'/opportunity/food'}
        name={'Food'}
        description={<p>Locations to Food Pantry Services</p>}
        img_uri={food}
        city={state.city}

        ></OpportunityCard>,
        <OpportunityCard
        uri={'/opportunity/work'}
        name={'Work'}
        description={<p>Access Work Services</p>}
        img_uri={work}
        city={state.city}


        ></OpportunityCard>,
        <OpportunityCard
        uri={'/opportunity/education'}
        name={'Education'}
        description={<p>Access Educational Services</p>}
        img_uri={education}
        city={state.city}


        ></OpportunityCard>,
        <OpportunityCard
        uri={'/opportunity/volunteer'}
        name={'Volunteering'}
        description={<p>Find places to volunteer</p>}
        img_uri={volunteer}
        city={state.city}

        ></OpportunityCard>,
    ]


    return (
        <>
            <div>
                <div className="grid mb-4">
                    <AppNavbar />
                </div>
                <div className="grid mt-4">
                    <div className="flex justify-center">
                        <div>
                            <div className="grid grid-cols-2 gap-4 items-center">
                                {cards.map((el) => {
                                    return (
                                        <div>
                                            {el}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}