import { Link } from "react-router-dom";
import "./dashboard.scss";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function Dashboard() {
    return (
        <div className='dashboard'>
            <div className="navbar">
                <div className="left">
                    <Link className="back" to="/" style={{ textDecoration: 'none' }}>
                        <ArrowBackIosNewIcon className="arrow"/>
                        <span>Regresar</span>
                    </Link>
                </div>
            </div>
            <iframe title="DashboardFisiCamp" width="100%" height="877px" src="https://app.powerbi.com/view?r=eyJrIjoiMDRiMTc2MGItMWExNC00OTA5LWE1ZDEtMDcyNDYwNzBlM2MxIiwidCI6Ijg0YzMxY2EwLWFjM2ItNGVhZS1hZDExLTUxOWQ4MDIzM2U2ZiIsImMiOjZ9" frameborder="0" allowFullScreen="true"></iframe>
        </div>
    )
}

export default Dashboard