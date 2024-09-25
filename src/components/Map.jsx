import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      Map
      <p>
        position lat : {lat}, lng : {lng}
      </p>
      <button onClick={() => setSearchParams({ lat: 25, lng: 78 })}>
        Change LatLng
      </button>
    </div>
  );
}

export default Map;
