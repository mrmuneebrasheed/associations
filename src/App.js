import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import request from "request";
import "bootstrap/dist/css/bootstrap.min.css";
import AssociationCard from "./components/AssociationCard";

export default function App() {
    const [associations, setAssociations] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const fetchAssociations = () => {
        fetch("http://localhost:3000/")
            .then((res) => res.json())
            .then((res) => {
                setAssociations(res);
                console.log(`associations`, res);
            });
    };
    useEffect(() => {
        fetchAssociations();
    }, []);

    const sendInformation = () => {
        const data = { name: name, description: description };
        fetch("http://localhost:3000/form/contact", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(function (res) {
                console.log(res);
            })
            .catch(function (res) {
                console.log(res);
            });
        console.log(`name`, name);
        console.log(`description`, description);
    };
    const nameInputHandler = (e) => {
        setName(e.target.value);
    };
    const descriptionInputHandler = (e) => {
        setDescription(e.target.value);
    };
    return (
        <BrowserRouter>
            <Nav />
            <Switch>
                <Route exact path="/">
                    <div className="container my-5 p-5 d-flex justify-content-evenly bg-light">
                        {associations?.map((association) => (
                            <AssociationCard
                                key={association.name}
                                association={association}
                            />
                        ))}
                    </div>
                    <div className="col-4 mx-auto my-5 p-3 border rounded ">
                        <h1 className="text-center bg-primary text-white p-3">
                            Write a message to us
                        </h1>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                onChange={nameInputHandler}
                                type="text"
                                name="name"
                                className="form-control"
                                id="name"
                                placeholder="Your Name"
                            ></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <textarea
                                onChange={descriptionInputHandler}
                                className="form-control"
                                name="description"
                                id="description"
                                rows="3"
                            ></textarea>
                        </div>
                        <button
                            className="btn border border-primary rounded text-primary"
                            type="submit"
                            onClick={sendInformation}
                        >
                            Submit
                        </button>
                    </div>
                </Route>
                <Route path="/admin"></Route>
            </Switch>
        </BrowserRouter>
    );
}
