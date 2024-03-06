import { useState } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

function App() {
  //const [selectedDates, setSelectedDates] = useState([]);
  /*   const dates = { Feb: [13, 20], Mar: [1, 8], Apr: [9, 16] };
   */
  const [price, setPrice] = useState(0);
  const [dates, setDates] = useState({
    "Mar-13": false,
    "Mar-20": false,
    "Apr-17": false,
    "May-1": false,
    "May-8": false,
    "May-15": false,
    "May-22": false,
    "May-29": false,
  });
  const [name, setName] = useState("");

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

    var reference = Object.keys(dates)
      .filter((date) => dates[date])
      .join(",");
    reference = `${name}%20` + reference;
    const link = `https://monzo.me/aureenkaoua/${price}?d=${reference}`;
    console.log(link);
    window.location.href = link;
  };

  function printSelectedDates(dates) {
    const dat = Object.keys(dates)
      .filter((date) => dates[date])
      .join(", ");
    return dat;
  }

  return (
    <div className="App">
      <header>
        <h1>Futsal booking</h1>
      </header>
      <Toaster />
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

          <div className="dates">
            <h3>select your dates below:</h3>
            {Object.keys(dates).map((date) => {
              return (
                <div key={date}>
                  <input
                    id={date}
                    onChange={handleChange}
                    name="check"
                    type="checkbox"
                    value={date}
                  />
                  {date}
                </div>
              );
            })}
          </div>

          <div className="book">
            <p>total cost: {price}</p>
            <button onClick={handleSubmit}>book now</button>
          </div>
        </form>
        <p>selected dates: {printSelectedDates(dates)}</p>
        <p>name: {name}</p>
      </body>
    </div>
  );
}

export default App;
