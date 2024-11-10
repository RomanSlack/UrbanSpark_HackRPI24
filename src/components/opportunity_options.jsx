import { useParams } from "react-router-dom";
import { OpportunitySelect } from "./opportunity_selection_card";

async function PlacesServiceQuery() {
    // TODO use MapBox Places API Points of Interest Query Search Nearby
    // db fetch user work and user home address for local food banks

    const res = [{
        name: 'place',
        link: 'example.com',
        address: 'santa cruz, ca',
        category: 'earth'
    }]
    return res.map((e) => {
        return (
        <OpportunitySelect
            name={e.name}
            link={e.link}
            address={e.address}
            category={e.category}
        />
    )
    })
}

export function OpportunityOptions() {

    const { category } = useParams()

    const category_select = {
        'place': PlacesServiceQuery
    }

    const category_data = () => {
        const s = category in category_select ? category_select[category] : category_select['place']
        return s()
    }

    return <>
        <div>
            <div className="flex justify-center">
                <div>
                    {category_data()}
                </div>
            </div>
        </div>
    </>
}