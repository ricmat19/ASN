import React, { FC, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import CollectionAPI from "../../apis/storeAPI";
import FooterC from "../standard/footer";
import AccountNavC from "../standard/accountNav";
import MenuNavC from "../standard/menuNav";

const EventsC: FC = () => {

//   let navigation = useNavigate();

  useEffect((): void => {
    const fetchData = async () => {
      try {
        const eventsResponse = await CollectionAPI.get(`/events`);

        for (let i = 0; i < eventsResponse.data.data.product.length; i++) {
          if (eventsResponse.data.data.product[i].imagekey !== null) {
            let imagesResponse = await CollectionAPI.get(
              `/images/${eventsResponse.data.data.product[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response: { data: string; }) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            eventsResponse.data.data.product[
              i
            ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
          }
        }
        // setCollection(eventsResponse.data.data.product);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

//   const displayItem = async (event: string) => {
//     try {
//       navigation(`/events/${event}`);
//     } catch (err) {
//       console.log(err);
//     }
//   };

  return (
    <div>
      <AccountNavC />
      <MenuNavC />
      <div className="main-body">
        <div className="collection-menu">{}</div>
      </div>
      <FooterC />
    </div>
  );
};

export default EventsC;
