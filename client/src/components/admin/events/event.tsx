import React, { useEffect, FC, useState, useRef } from "react";
import { useParams } from "react-router";
import IndexAPI from "../../../apis/indexAPI";
import AdminAccountNavC from "../standard/accountNav";
import AdminMenuNavC from "../standard/menuNav";
import FooterC from "../../user/standard/footer";
import { IEvent } from "../../../interfaces";
import { Grid } from "@mui/material";

const AdminEventC: FC = () => {
  const { id } = useParams();

  const [title, setTitle] = useState<string>("");
  const [, setImages] = useState(null);
  const [date, setDate] = useState<string>("");
  const [spots, setSpots] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [info, setInfo] = useState<string>("");

  const [, setSelectedProduct] = useState<IEvent[]>([]);
  const [imageBuffer, setImageBuffer] = useState("");

  const titleInput = useRef(null);
  const priceInput = useRef(null);
  const infoInput = useRef(null);

  useEffect((): void => {
    const fetchData = async () => {
      try {
        const eventResponse = await IndexAPI.get(
          `/admin/events/${id}`
        );
        console.log(eventResponse)

        if (eventResponse.data.data.events.imagekey !== null) {
          let imagesResponse = await IndexAPI.get(
            `/images/${eventResponse.data.data.events.imagekey}`,
            {
              responseType: "arraybuffer",
            }
          ).then((response) =>
            Buffer.from(response.data, "binary").toString("base64")
          );

          setImageBuffer(`data:image/png;base64,${imagesResponse}`);
        }
        setSelectedProduct(eventResponse.data.data.events)
        setTitle(eventResponse.data.data.event.title);
        setDate(eventResponse.data.data.event.date);
        setSpots(eventResponse.data.data.event.spots);
        setPrice(eventResponse.data.data.event.price);
        setInfo(eventResponse.data.data.event.info);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const updateEvent = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      let formData = new FormData();

      formData.append("title", title);
      // formData.append("images", images);
      formData.append("spots", spots);
      formData.append("price", price);
      formData.append("info", info);

      await IndexAPI.post("/admin/events/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      // createItem(response);

      // titleInput.current.value = "";
      // typeInput.current.value = "";
      // quantityInput.current.value = "";
      // priceInput.current.value = "";
      // infoInput.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  // const imageURL = async (imagekey: string) =>{

  //     const imagesResponse = await CollectionAPI.get(`/images/${imagekey}`, {
  //         responseType: 'arraybuffer'
  //     })
  //     .then(response => Buffer.from(response.data, 'binary').toString('base64'))
  //     // setImages(imagesResponse);
  // }

    // onChange={imageURL(selectedItem.imagekey)}

  return (
    <div>
      <AdminAccountNavC />
      <AdminMenuNavC />
      <div className="main-body item-details">
        <div className="item-images">
          <div className="image-div">
            <div className="big-image-div">
              <img className="big-image" src={imageBuffer} alt="main" />
            </div>
          </div>
        </div>
        <form
          className="admin-form"
          action="/admin/event/create"
          method="POST"
          encType="multipart/form-data"
        >
          <Grid className="admin-form-title">
            <h1 className="align-center">Create</h1>
          </Grid>
          <Grid className="admin-form-field">
            <label className="admin-label">Title:</label>
            <input
              value={title}
              ref={titleInput}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="name"
              className="form-control"
              required
            />
          </Grid>
          <Grid className="admin-form-field">
            <label className="admin-label">Images:</label>
            <input
              type="file"
              onChange={(e: any) => setImages(e.target.files[0])}
              name="images"
              className="form-control file-input"
              required
            />
          </Grid>
          <Grid className="admin-form-field">
            <label className="admin-label">Date:</label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              name="date"
              className="form-control"
              required
            />
          </Grid>
          <Grid className="admin-form-field">
            <label className="admin-label">Spots:</label>
            <input
              value={spots}
              onChange={(e) => setSpots(e.target.value)}
              type="number"
              name="spots"
              className="form-control"
              required
            />
          </Grid>
          <Grid className="admin-form-field">
            <label className="admin-label">Price:</label>
            <input
              value={price}
              ref={priceInput}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              name="price"
              className="form-control"
              required
            />
          </Grid>
          <Grid className="admin-form-field">
            <label className="admin-label">Info:</label>
            <textarea
              value={info}
              ref={infoInput}
              onChange={(e) => setInfo(e.target.value)}
              name="message"
              rows={5}
              required
            ></textarea>
          </Grid>
          <Grid className="admin-form-button">
            <Grid className="text-center">
              <Grid>
                <button
                  onClick={updateEvent}
                  type="submit"
                  className="btn form-button"
                >
                  Submit
                </button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
      <FooterC />
    </div>
  );
};

export default AdminEventC;
