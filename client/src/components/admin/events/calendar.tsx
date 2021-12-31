import React, { useEffect, useState } from "react";
// import IndexAPI from "../../../apis/indexAPI";
import { IEvent, IDay } from "../../../interfaces";

const CalendarC = () => {
  const [nav, setNav] = useState(0);
  //   const [setClicked] = useState();
  const [events] = useState<IEvent[]>([]);
  const [days, setDays] = useState<IDay[]>([]);
  const [dateDisplay, setDateDisplay] = useState("");
  //   const [daysEventsModal, setDaysEventsModal] = useState("modal");
  //   const [selectedDay, setSelectedDay] = useState("");

  //   const daysEventsRef = useRef();

  //Get a list of the days to dos
  //   const eventForDate = (date: string) => {
  //     let daysEvents = [];
  //     for (let i = 0; i < events.length; i++) {
  //       if (events[i].event_date === date) {
  //         daysEvents.push(events[i].title);
  //       }
  //     }
  //     return daysEvents;
  //   };

  //   const displayEventsModal = (day) => {
  //     if (day.events.length > 0) {
  //       setDaysEventsModal("modal modal-active");
  //       setSelectedDay(day.date);
  //     }
  //   };

  //   const eventsArray = [];
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         document.addEventListener("mousedown", (event) => {
  //           if (dayseventsRef.current !== null) {
  //             if (!dayseventsRef.current.contains(event.target)) {
  //               setDaysEventsModal("modal");
  //             }
  //           }
  //         });
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         //Get a list of all of the events in the DB
  //         const eventsResponse = await IndexAPI.get(`/events`);
  //         for (let i = 0; i < eventsResponse.data.data.events.length; i++) {
  //             eventsArray.push(eventsResponse.data.data.events[i]);
  //         }
  //         setEvents(eventsArray);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  //Setup Calendar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const weekdays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const date = new Date();

        if (nav !== 0) {
          date.setMonth(new Date().getMonth() + nav);
        }

        const month = date.getMonth();
        const year = date.getFullYear();

        const firstMonthDay = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dateString = firstMonthDay.toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });

        setDateDisplay(
          `${date.toLocaleDateString("en-us", { month: "long" })} ${year}`
        );

        const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

        const daysArray = [];
        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
          let dayStringYear = year.toString();
          let dayMonth = month + 1;
          let dayStringMonth = dayMonth.toString();
          if (dayStringMonth.toString().length === 1) {
            dayStringMonth = "0" + dayStringMonth.toString();
          }
          let dayDay = i - paddingDays;
          let dayStringDay = dayDay.toString();
          if (dayStringDay.toString().length === 1) {
            dayStringDay = "0" + dayStringDay.toString();
          }

          let todayDayString = currentDay.toString();
          if (todayDayString.length === 1) {
            todayDayString = "0" + todayDayString;
          }
          let todayMonthString = currentMonth.toString();
          if (todayMonthString.length === 1) {
            todayMonthString = "0" + todayMonthString;
          }
          let todayYearString = currentYear.toString();

          const dayString = `${dayStringYear}-${dayStringMonth.toString()}-${dayStringDay.toString()}`;
          const today = `${todayYearString}-${todayMonthString}-${todayDayString}`;
          if (i > paddingDays) {
            daysArray.push({
              value: i - paddingDays,
              event: "test",
              //   event: eventForDate(dayString),
              date: dayString,
              today: today,
            });
          } else {
            daysArray.push({
              value: "padding",
              event: null,
              date: "",
              today: "",
            });
          }
        }
        setDays(daysArray);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [events, nav]);

  return (
    <div>
      <div className="grid grid-center calendar-container">
        <div className="grid month-row">
          <div>
            <button onClick={() => setNav(nav - 1)} className="month-back">
              <i className="fas fa-chevron-left"></i>
            </button>
          </div>
          <div className="title month-title">{dateDisplay.toLowerCase()}</div>
          <div>
            <button onClick={() => setNav(nav + 1)} className="month-forward">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="day-names">
          <div className="day-name">sun</div>
          <div className="day-name">mon</div>
          <div className="day-name">tue</div>
          <div className="day-name">wed</div>
          <div className="day-name">thur</div>
          <div className="day-name">fri</div>
          <div className="day-name">sat</div>
        </div>
        <div className="title day-boxes">
          {days.map((day, index) => (
            <div key={index}>
              {day.value === "padding" ? (
                ""
              ) : //   ) : day.event.length > 0 && day.date === day.today ? (
              //   day.event.length > 0 &&
              day.date === day.today ? (
                <div
                  className="day-box day-box-task-today"
                  onClick={() => {
                    day.value !== "padding";
                    //   ? setClicked(day.date)
                    //   : setClicked("");
                  }}
                >
                  <div
                    // onClick={() => displayEventModal(day)}
                    className="center-num"
                  >
                    {day.value}
                  </div>
                </div>
              ) : day.date === day.today ? (
                <div
                  className="day-box day-today"
                  onClick={() => {
                    day.value !== "padding";
                    //   ? setClicked(day.date)
                    //   : setClicked("");
                  }}
                >
                  <div
                    // onClick={() => displayEventModal(day)}
                    className="center-num"
                  >
                    {day.value}
                  </div>
                </div>
              ) : (
                //   ) : day.event.length > 0 ? (
                //     <div
                //       className="day-box day-box-task"
                //       onClick={() => {
                //         day.value !== "padding"
                //         //   ? setClicked(day.date)
                //         //   : setClicked("");
                //       }}
                //     >
                //       <div
                //         onClick={() => displayEventModal(day)}
                //         className="center-num"
                //       >
                //         {day.value}
                //       </div>
                //     </div>
                <div
                  className="day-box"
                  onClick={() => {
                    day.value !== "padding";
                    //   ? setClicked(day.date)
                    //   : setClicked("");
                  }}
                >
                  <div
                    // onClick={() => displayEventModal(day)}
                    className="center-num"
                  >
                    {day.value}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarC;
