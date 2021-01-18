import { useParams, Link } from "react-router-dom";

const Administration = (props) => {
    let serviceId = sessionStorage.getItem("serviceId")
    let serviceName = sessionStorage.getItem("serviceName")
    return (
        <div>
            <h2>Administration - {serviceName}</h2>
            <Link to={`${props.path}`}>Back to Dashboard</Link>
        </div>
    );
};

export default Administration;
