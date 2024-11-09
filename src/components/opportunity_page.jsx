import { Navbar } from "./navbar";
import OpportunityCard from "./opportunity_card";

import work from './assets/work.jpeg'
import food from './assets/food.jpeg'
import education from './assets/education.jpg'
import volunteer from './assets/volunteer.jpg'

export default function OpportunityPage() {

    const cards = [
        <OpportunityCard
        uri={'/'}
        name={'Food'}
        description={<p>Locations to Food Pantry Services</p>}
        img_uri={food}

        ></OpportunityCard>,
        <OpportunityCard
        uri={'/'}
        name={'Work'}
        description={<p>Access Work Services</p>}
        img_uri={work}

        ></OpportunityCard>,
        <OpportunityCard
        uri={'/'}
        name={'Education'}
        description={<p>Access Educational Services</p>}
        img_uri={education}

        ></OpportunityCard>,
        <OpportunityCard
        uri={'/'}
        name={'Volunteering'}
        description={<p>Find places to volunteer</p>}
        img_uri={volunteer}

        ></OpportunityCard>,
    ]


    return (
        <>
            <div>
                <Navbar />
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