const Company = () => {
    return (
        <div className="company-block">
            <img className="company-cover" /*src="\src\images\meson-lugar.jpeg"*/ height={100} width={100}></img>
            <img className="company-logo" /*src="\src\images\el-meson-logo.png"*/ height={70} width={100}></img>
            <p className="company-name"> <b>Company Name</b> </p>
            <p className="company-description"> Company Description </p>
            <p className="divider"> </p>
            <img className="map-logo" src="src\images\map-logo-placeholder.png" height={100} width={100}></img>
            <p className="map"></p>
            <p className="joblistings-header"> <b>Available Positions</b> </p>
            <p className="joblistings"> </p>
            <p className="positions">Positions </p>
        </div>
    ); 
}
export default Company;
