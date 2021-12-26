import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import FooterC from "../../user/standard/footer";
import AdminAccountNavC from "../standard/accountNav";
import AdminMenuNavC from "../standard/menuNav";
import AddEvent from "./addEvent";
import { Button, Grid } from "@mui/material";
import { IEvent } from "../../../interfaces";

const AdminEventsC: FC = () => {

  const [events, setEvents] = useState<IEvent[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [pageNumber, setPageNumber] = useState<number>(0);
  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;

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

  const displayEvents = events
  .slice(pagesVisted, pagesVisted + itemsPerPage)
  .map((event) => {
    return (
      <Grid
      className="collection-item-div"
      key={event.id}
      onClick={() => displayEvent(event.id)}
    >
      <Grid className="collection-item">
        <img className="collection-thumbnail" src={event.imageBuffer} />
      </Grid>
      <Grid>
        <Grid>{event.title}</Grid>
      </Grid>
    </Grid>
    );
  });

  const pageCount = Math.ceil(events.length / itemsPerPage);

  const changePage = ({selected}: {selected:number}): void => {
    setPageNumber(selected);
  };

  let navigation = useNavigate();

  const displayEvent = async (event: string) => {
    try {
      navigation(`/admin/events/${event}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AddEvent open={open} handleClose={handleClose}/>
      <AdminAccountNavC />
      <AdminMenuNavC />
      <div className="main-body">
        <Grid sx={{ textAlign: 'right', paddingRight: "50px" }}>
          <Button onClick={handleOpen} sx={{ fontFamily: "Rajdhani", fontSize: "20px", color: "white", textTransform: "none"}}><a>add event</a></Button>
        </Grid>
        <div className="thumbnail-display">{displayEvents}</div>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationButtons"}
          previousLinkClassName={"prevButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"disabledButton"}
          activeClassName={"activeButton"} pageRangeDisplayed={5} marginPagesDisplayed={5}/>
      </div>
      <FooterC />
    </div>
  );
};

export default AdminEventsC;
