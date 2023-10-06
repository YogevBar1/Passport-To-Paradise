import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import EditVacation from "../../VacationArea/EditVacation/EditVacation";
import InsertVacation from "../../VacationArea/InsertVacation/InsertVacation";
import ListVacation from "../../VacationArea/ListVacation/ListVacation";
import ReportVacation from "../../VacationArea/ReportVacation/ReportVacation";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {

    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/vacations" element={<ListVacation />} />
            <Route path="/vacations/add" element={<InsertVacation />} />
            <Route path="/vacations/report" element={<ReportVacation />} />
            <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />

        </Routes>
    );
}

export default Routing;
