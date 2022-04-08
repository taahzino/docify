import React from "react";
import DashboardLayout from "./DashboardLayout";
import ReportCard from "./ReportCard";

const DashboardPage = () => {
    return (
        <DashboardLayout>
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <ReportCard
                        number={22}
                        text="Uploaded Today"
                        icon="bx bx-image-add"
                    />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <ReportCard
                        number={5}
                        text="Registered Today"
                        icon="bx bx-user-plus"
                    />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <ReportCard
                        number={75}
                        text="Total Documents"
                        icon="bx bx-image-alt"
                    />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <ReportCard
                        number={10}
                        text="Total Users"
                        icon="bx bx-user"
                    />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <ReportCard
                        number={6}
                        text="Pending Users"
                        icon="bx bx-user-x"
                    />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <ReportCard
                        number={2}
                        text="Free Users"
                        icon="bx bx-bookmark"
                    />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <ReportCard
                        number={2}
                        text="Premium Users"
                        icon="bx bx-bookmark-heart"
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardPage;
