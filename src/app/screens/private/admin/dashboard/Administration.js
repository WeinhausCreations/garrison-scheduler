import { useParams, Link } from "react-router-dom";

const Administration = (props) => {
    let { id } = useParams();
    return (
        <div>
            <h2>Administration - {props.serviceName}</h2>
            <Link to={`${props.path}`}>Back to Dashboard</Link>
        </div>
    );
};

export default Administration;
