import React from "react";

export default function AssociationCard({ association }) {
    return (
        <div>
            <div className="card h-100" style={{ width: "18rem" }}>
                <img
                    style={{ height: "200px", objectFit: "contain" }}
                    className="card-img-top"
                    alt="..."
                    src={association.image}
                />
                <div className="card-body">
                    <h2 className="card-title bg-primary text-white p-2 text-center">
                        {association.name}
                    </h2>
                    <p className="card-text">{association.description}</p>
                </div>
            </div>
        </div>
    );
}
