import Campground from "../../components/campground/Campground";
import "./campgrounds.scss";
import { makeRequestPublic } from "../../axios.js";
import { useQuery } from "react-query";
import Skeleton from '@mui/material/Skeleton';

function Campgrounds() {

    // const campgrounds = [
    //     {
    //         id: 1,
    //         title: "Camping Aventura",
    //         price: 30,
    //         location: "Bosque Nacional XYZ",
    //         description: "Experimenta la aventura en plena naturaleza. ¡Ideal para amantes del senderismo y la vida al aire libre!",
    //         picture: "https://cdn.pixabay.com/photo/2020/07/14/12/35/elfin-lakes-5404021_1280.jpg"
    //     },
    //     {
    //         id: 2,
    //         title: "Camping Tranquilidad",
    //         price: 25,
    //         location: "Lago Sereno",
    //         description: "Disfruta de la paz y la serenidad junto al lago. Perfecto para escapar del bullicio de la ciudad.",
    //         picture: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419_1280.jpg"
    //     },
    //     {
    //         id: 3,
    //         title: "Camping Montaña Majestuosa",
    //         price: 40,
    //         location: "Montañas Impresionantes",
    //         description: "Vistas panorámicas de montañas majestuosas. Para aquellos que buscan la emoción de la altitud.",
    //         picture: "https://cdn.pixabay.com/photo/2017/10/07/01/01/bach-leek-2825197_1280.jpg"
    //     },
    //     {
    //         id: 4,
    //         title: "Camping Río Serpenteante",
    //         price: 35,
    //         location: "Valle Pintoresco",
    //         description: "Acampa junto al río serpenteante y sumérgete en la belleza natural del valle.",
    //         picture: "https://cdn.pixabay.com/photo/2021/01/04/10/45/tent-5887144_1280.jpg"
    //     },
    //     {
    //         id: 5,
    //         title: "Camping Tranquilidad",
    //         price: 25,
    //         location: "Lago Sereno",
    //         description: "Disfruta de la paz y la serenidad junto al lago. Perfecto para escapar del bullicio de la ciudad.",
    //         picture: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419_1280.jpg"
    //     },
    //     {
    //         id: 6,
    //         title: "Camping Montaña Majestuosa",
    //         price: 40,
    //         location: "Montañas Impresionantes",
    //         description: "Vistas panorámicas de montañas majestuosas. Para aquellos que buscan la emoción de la altitud.",
    //         picture: "https://cdn.pixabay.com/photo/2017/10/07/01/01/bach-leek-2825197_1280.jpg"
    //     },
    //     {
    //         id: 7,
    //         title: "Camping Río Serpenteante",
    //         price: 35,
    //         location: "Valle Pintoresco",
    //         description: "Acampa junto al río serpenteante y sumérgete en la belleza natural del valle.",
    //         picture: "https://cdn.pixabay.com/photo/2021/01/04/10/45/tent-5887144_1280.jpg"
    //     },
    //     {
    //         id: 8,
    //         title: "Camping Río Serpenteante",
    //         price: 35,
    //         location: "Valle Pintoresco",
    //         description: "Acampa junto al río serpenteante y sumérgete en la belleza natural del valle.",
    //         picture: "https://cdn.pixabay.com/photo/2021/01/04/10/45/tent-5887144_1280.jpg"
    //     },
    //     {
    //         id: 9,
    //         title: "Camping Río Serpenteante",
    //         price: 35,
    //         location: "Valle Pintoresco",
    //         description: "Acampa junto al río serpenteante y sumérgete en la belleza natural del valle.",
    //         picture: "https://cdn.pixabay.com/photo/2021/01/04/10/45/tent-5887144_1280.jpg"
    //     },
    //     {
    //         id: 10,
    //         title: "Camping Tranquilidad",
    //         price: 25,
    //         location: "Lago Sereno",
    //         description: "Disfruta de la paz y la serenidad junto al lago. Perfecto para escapar del bullicio de la ciudad.",
    //         picture: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419_1280.jpg"
    //     }
    // ];

    const { isLoading, error, data: campgrounds } = useQuery(['campgrounds'], () =>
        makeRequestPublic.get("/campground").then(res => {
            return res.data;
        })
    )

    return (
        <div className="campgrounds">
            <div className="container">
            <iframe title="DashboardFisiCamp" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=335184c1-0c9e-409b-ab6c-04b75cd9cf59&autoAuth=true&ctid=717b9a79-1b91-41ab-a6f7-a579b46a9b41" frameborder="0" allowFullScreen="true"></iframe>
                {campgrounds && campgrounds.map(campground => (
                    <Campground key={campground.id} data={campground} />
                ))}
                {isLoading &&
                    <>
                        <div className="campground" style={{ gap: 0 }}>
                            <div className="body">
                                <Skeleton variant="rounded" width={'100%'} height={250} />
                            </div>
                            <div className="footer" style={{ gap: 0, lineHeight: 1 }}>
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={'200px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'150px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'180px'} />
                            </div>
                        </div>
                        <div className="campground" style={{ gap: 0 }}>
                            <div className="body">
                                <Skeleton variant="rounded" width={'100%'} height={250} />
                            </div>
                            <div className="footer" style={{ gap: 0, lineHeight: 1 }}>
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={'200px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'150px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'180px'} />
                            </div>
                        </div>
                        <div className="campground" style={{ gap: 0 }}>
                            <div className="body">
                                <Skeleton variant="rounded" width={'100%'} height={250} />
                            </div>
                            <div className="footer" style={{ gap: 0, lineHeight: 1 }}>
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={'200px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'150px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'180px'} />
                            </div>
                        </div>
                        <div className="campground" style={{ gap: 0 }}>
                            <div className="body">
                                <Skeleton variant="rounded" width={'100%'} height={250} />
                            </div>
                            <div className="footer" style={{ gap: 0, lineHeight: 1 }}>
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={'200px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'150px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'180px'} />
                            </div>
                        </div>
                        <div className="campground" style={{ gap: 0 }}>
                            <div className="body">
                                <Skeleton variant="rounded" width={'100%'} height={250} />
                            </div>
                            <div className="footer" style={{ gap: 0, lineHeight: 1 }}>
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={'200px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'150px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'180px'} />
                            </div>
                        </div>
                        <div className="campground" style={{ gap: 0 }}>
                            <div className="body">
                                <Skeleton variant="rounded" width={'100%'} height={250} />
                            </div>
                            <div className="footer" style={{ gap: 0, lineHeight: 1 }}>
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={'200px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'150px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'180px'} />
                            </div>
                        </div>
                        <div className="campground" style={{ gap: 0 }}>
                            <div className="body">
                                <Skeleton variant="rounded" width={'100%'} height={250} />
                            </div>
                            <div className="footer" style={{ gap: 0, lineHeight: 1 }}>
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={'200px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'150px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'180px'} />
                            </div>
                        </div>
                        <div className="campground" style={{ gap: 0 }}>
                            <div className="body">
                                <Skeleton variant="rounded" width={'100%'} height={250} />
                            </div>
                            <div className="footer" style={{ gap: 0, lineHeight: 1 }}>
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={'200px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'150px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'180px'} />
                            </div>
                        </div>
                        <div className="campground" style={{ gap: 0 }}>
                            <div className="body">
                                <Skeleton variant="rounded" width={'100%'} height={250} />
                            </div>
                            <div className="footer" style={{ gap: 0, lineHeight: 1 }}>
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={'200px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'150px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'180px'} />
                            </div>
                        </div>
                        <div className="campground" style={{ gap: 0 }}>
                            <div className="body">
                                <Skeleton variant="rounded" width={'100%'} height={250} />
                            </div>
                            <div className="footer" style={{ gap: 0, lineHeight: 1 }}>
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} width={'200px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'150px'} />
                                <Skeleton variant="text" sx={{ fontSize: '1.8rem' }} width={'180px'} />
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Campgrounds