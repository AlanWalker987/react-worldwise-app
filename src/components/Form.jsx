// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const { createCity } = useCities();

  const navigate = useNavigate();

  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [geoCodeError, setGeoCodeError] = useState("");
  //const [emoji, setEmoji] = useState("");

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchDetail() {
        try {
          setIsGeoLoading(true);
          setGeoCodeError("");
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          setCityName(data.city || data.locality || "");
          if (data.countryCode === "")
            throw new Error(
              "Please click on the map to load the form for adding the city you have visited"
            );
          // setEmoji(flagemojiToPNG(data.countryCode));

          console.log(data);
        } catch (err) {
          console.log(err);
          setGeoCodeError(err.message);
        } finally {
          setIsGeoLoading(false);
        }
      }
      fetchDetail();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !notes) return;

    const newCity = {
      cityName,
      country,
      emoji: "",
      date: startDate,
      notes,
      position: {
        lat,
        lng,
      },
    };

    await createCity(newCity);
    navigate("/add/cities");
  }

  if (isGeoLoading) return <Spinner />;
  if (!lat && !lng)
    return <Message message="start adding the city by clicking on the map" />;
  if (geoCodeError) return <Message message={geoCodeError} />;

  return (
    <form
      className={`${styles.form} ${isGeoLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
