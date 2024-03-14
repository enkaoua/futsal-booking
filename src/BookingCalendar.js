import { useEffect, useState } from "react";
import "./BookingCalendar.css";
import toast, { Toaster } from "react-hot-toast";
import PrintDateNames from "./components/PrintDateNames";

function BookingCalendar() {
  const [data, setData] = useState({});

  const getSetData = async () => {
    console.log("Fetching data...");
    const url =
      "https://script.google.com/macros/s/AKfycbxJ17NqP8RH0fOHJLgmZI-v8Ytl_A5dmMT8hc8MfXzfa_11P67jwBPJpg5xNkTOefc/exec?";

    const ret = await fetch(url);
    const res = await ret.json();
    if (res) {
      console.log(res);
      setData(res);
    }
  };

  useEffect(() => {
    console.log("Fetching data...");
    /* const url =
      "https://script.google.com/macros/s/AKfycbxJ17NqP8RH0fOHJLgmZI-v8Ytl_A5dmMT8hc8MfXzfa_11P67jwBPJpg5xNkTOefc/exec?"; */
    getSetData();
  }, []);

  return (
    <div className="App">
      <body className="body">
        <p>Booking calendar</p>
        {/* {selectedDates && <p>you have selected {selectedDates.length} weeks</p>} */}
        {Object.keys(data).length === 0 && <p>loading booking calendar...</p>}
        <PrintDateNames data={data} />
      </body>
    </div>
  );
}

export default BookingCalendar;
