import React, { useEffect, FC, useState, useRef } from "react";
import { useParams } from "react-router";
import IndexAPI from "../../../../apis/indexAPI";
import AdminAccountNavC from "../../standard/accountNav";
import AdminMenuNavC from "../../standard/menuNav";
import FooterC from "../../../user/standard/footer";
import { IBlog } from "../../../../interfaces";
import { Grid } from "@mui/material";

const AdminBlogPostC: FC = () => {
  const { id } = useParams();

  const [, setSelectedBlog] = useState<IBlog[]>([]);
  const [title, setTitle] = useState<string>("");
  const [, setImages] = useState(null);
  const [info, setInfo] = useState<string>("");
  const [imageBuffer, setImageBuffer] = useState("");

  const titleInput = useRef(null);
  const infoInput = useRef(null);

  useEffect((): void => {
    const fetchData = async () => {
      try {
        const blogResponse = await IndexAPI.get(
          `/admin/medias/blog/${id}`
        );

        if (blogResponse.data.data.post.imagekey !== null) {
          let imagesResponse = await IndexAPI.get(
            `/images/${blogResponse.data.data.post.imagekey}`,
            {
              responseType: "arraybuffer",
            }
          ).then((response) =>
            Buffer.from(response.data, "binary").toString("base64")
          );

          setImageBuffer(`data:image/png;base64,${imagesResponse}`);
        }
        setTitle(blogResponse.data.data.post.title);
        setInfo(blogResponse.data.data.post.info);
        
        setSelectedBlog(blogResponse.data.data.post)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const updateMedia = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      let formData = new FormData();

      formData.append("title", title);
      // formData.append("images", images);
      formData.append("info", info);

      await IndexAPI.post("/admin/media/create", formData, {
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
          action="/admin/media/create"
          method="POST"
          encType="multipart/form-data"
        >
          <Grid className="admin-form-title">
            <h2 className="align-center">Create</h2>
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
                  onClick={updateMedia}
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

export default AdminBlogPostC;
