import { Link } from "react-router-dom";

export default function OpportunityCard({uri, name, description, img_uri}) {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                src={img_uri}
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                <Link to={uri} state={{category: name}}><button className="btn btn-primary">View</button></Link>
                </div>
            </div>
        </div>
    )
}   