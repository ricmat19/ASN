import React, { FC, useEffect, useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import FooterC from "../../user/standard/footer";
import AdminAccountNavC from "../standard/accountNav";
import AdminMenuNavC from "../standard/menuNav";
import { IEvent } from "../../../interfaces";
import CalendarC from "./calendar";

const EventsC: FC = () => {

  const [, setEvents] = useState<IEvent[]>([]);

  useEffect((): void => {
    const fetchData = async () => {
      try {
        const eventsResponse = await IndexAPI.get(`/events`);

        for (let i = 0; i < eventsResponse.data.data.events.length; i++) {
          if (eventsResponse.data.data.events[i].imagekey !== null) {
            let imagesResponse = await IndexAPI.get(
              `/images/${eventsResponse.data.data.events[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response: { data: string; }) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            eventsResponse.data.data.events[
              i
            ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
          }
        }
        setEvents(eventsResponse.data.data.events);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // const displayEvent = async (event: string) => {
  //   try {
  //     navigation(`/admin/events/${event}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <AdminAccountNavC />
      <AdminMenuNavC />
      <div className="main-body">
        <CalendarC />
      </div>
      <FooterC />
    </div>
  );
};

export default EventsC;
