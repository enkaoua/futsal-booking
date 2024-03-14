import { useEffect, useState } from "react";
import "./Book.css";
import toast, { Toaster } from "react-hot-toast";

function Book() {
  const [price, setPrice] = useState(0);
  const [dates, setDates] = useState({});
  const [name, setName] = useState("");
  const [data, setData] = useState({});

  const handleChange = (event) => {
    console.log(dates);
    if (event.target.checked) {
      // change state value of that date to true
      setDates({ ...dates, [event.target.value]: true });
      setPrice(price + 8);
    } else {
      // change state value of that date to false
      setDates({ ...dates, [event.target.value]: false });
      setPrice(price - 8);
    }
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.length < 1) {
      toast.error("please enter a name");
      return;
    }

    if (price == 0) {
      toast.error("please select a week");
      return;
    }

    // post data to google sheet
    postDataToGoogleSheet(dates, name);

    var reference = Object.keys(dates)
      .filter((date) => dates[date])
      .join(",");
    reference = `${name}%20` + reference;
    const link = `https://monzo.me/aureenkaoua/${price}?d=${reference}`;
    console.log(link);
    window.location.href = link;
  };

  async function postDataToGoogleSheet(dates, name) {
    const url =
      "https://script.google.com/macros/s/AKfycbxJ17NqP8RH0fOHJLgmZI-v8Ytl_A5dmMT8hc8MfXzfa_11P67jwBPJpg5xNkTOefc/exec?";

    const formData = new URLSearchParams();
    formData.append("dates", dates);
    formData.append("name", name);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });
  }

  function printSelectedDates(dates) {
    const dat = Object.keys(dates)
      .filter((date) => dates[date])
      .join(", ");
    return dat;
  }

  return (
    <div className="App">
      <body className="body">
        <p>what weeks would you like to book for?</p>
        {/* {selectedDates && <p>you have selected {selectedDates.length} weeks</p>} */}
        <form>
          <div className="name">
            <h3>enter your name below:</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="price-dates">
            <div className="dates">
              <h3>select your dates below:</h3>
              {Object.keys(data).length < 1 && <p>loading...</p>}
              {Object.keys(data).map((date) => {
                return (
                  <div className="date" key={date}>
                    <input
                      id={date}
                      onChange={handleChange}
                      name="check"
                      type="checkbox"
                      value={date}
                    />
                    <p>{date}</p>
                    <p>--</p>
                    <p className="spots-left">
                      {
                        /* print number of values in data[date] that are not empty strings */
                        10 - data[date].filter((val) => val !== "").length
                      }{" "}
                      spots left
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="price"> total cost: £{price}</p>

          <div className="book">
            <button onClick={handleSubmit}>book now</button>
          </div>
        </form>
        <p>Selected dates: {printSelectedDates(dates)}</p>
        <p>name: {name}</p>
      </body>
    </div>
  );
}

export default Book;
