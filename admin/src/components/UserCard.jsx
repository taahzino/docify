import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/UserCard.module.css";
import UserActions from "./UserActions";

const UserCard = () => {
    const [showActions, setShowActions] = useState();
    const dotsRef = useRef();

    useEffect(() => {
        window.addEventListener("click", (e) => {
            if (e.target !== dotsRef.current) {
                setShowActions(false);
            }
        });

        return () => {};
    }, []);

    return (
        <div className={`${styles.userCard} w-100 rounded`}>
            <div className="h4 fw-bold m-1">
                <i
                    className="bx bx-slider m-1 my-2"
                    role="button"
                    ref={dotsRef}
                    onClick={() => {
                        setShowActions((state) => !state);
                    }}
                ></i>
            </div>
            <UserActions show={showActions} />
            <div className="card-header d-flex flex-wrap align-items-center justify-content-center">
                <div className="w-25">
                    <img src="./logo512.png" alt="" className="img-fluid" />
                </div>
                <div className="w-75 d-flex flex-column justify-content-center px-1">
                    <div className="fw-bold">Tahsin Ahmed Tushar</div>
                    <div>tahsintushar.dev@gmail.com</div>
                    <div>01712345678</div>
                </div>
            </div>
            <div className="card-body">
                <div className={`${styles.tag} bg-danger text-light`}>
                    Docs: 20
                </div>
                <div className={`${styles.tag} bg-primary text-light`}>
                    Status: Approved
                </div>
                {/* <div className={`${styles.tag} bg-warning text-dark`}>
                    Pending
                </div> */}
                <div className={`${styles.tag} bg-success text-light`}>
                    Membership: Free
                </div>
                <div className={`${styles.tag} bg-secondary text-light`}>
                    Role: User
                </div>
            </div>
        </div>
    );
};

export default UserCard;
