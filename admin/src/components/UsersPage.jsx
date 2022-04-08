import React from "react";
import DashboardLayout from "./DashboardLayout";
import UserCard from "./UserCard";
import Column from "./Column";
import { Row } from "react-bootstrap";

const UsersPage = () => {
    return (
        <DashboardLayout>
            <Row>
                <Column>
                    <UserCard />
                </Column>
                <Column>
                    <UserCard />
                </Column>
                <Column>
                    <UserCard />
                </Column>
                <Column>
                    <UserCard />
                </Column>
                <Column>
                    <UserCard />
                </Column>
                <Column>
                    <UserCard />
                </Column>
                <Column>
                    <UserCard />
                </Column>
                <Column>
                    <UserCard />
                </Column>
            </Row>
        </DashboardLayout>
    );
};

export default UsersPage;
