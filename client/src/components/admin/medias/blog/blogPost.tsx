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
  // const [, setImages] = useState(null);
  const [content, setContent] = useState<string>("");
  const [imageBuffer, setImageBuffer] = useState("");

  const titleInput = useRef(null);
  const contentInput = useRef(null);

  useEffect((): void => {
    const fetchData = async () => {
      try {
        const blogResponse = await IndexAPI.get(`/admin/medias/blog/${id}`);

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
        setContent(blogResponse.data.data.post.content);

        setSelectedBlog(blogResponse.data.data.post);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const updateBlog = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {

      await IndexAPI.put(`/admin/medias/blog/update/${id}`, {
        title,
        content,
      });

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
      <Grid className="blog-banner">
          <img className="blog-banner-image" src={imageBuffer} alt="main" />
      </Grid>
      <Grid className="main-body" sx={{margin: "0 100px"}}>
        <form
          className="admin-form"
          action="/admin/media/create"
          method="POST"
          encType="multipart/form-data"
        >
          <Grid sx={{margin: "30px 0"}}>
            <h2 className="align-center">Update</h2>
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
          {/* <Grid className="admin-form-field">
            <label className="admin-label">Images:</label>
            <input
              type="file"
              onChange={(e: any) => setImages(e.target.files[0])}
              name="images"
              className="form-control file-input"
              required
            />
          </Grid> */}
          <Grid className="admin-form-field">
            <label className="admin-label">content:</label>
            <textarea
              value={content}
              ref={contentInput}
              onChange={(e) => setContent(e.target.value)}
              name="content"
              required
            ></textarea>
          </Grid>
          <Grid className="admin-form-button">
            <Grid className="text-center">
              <Grid>
                <button
                  onClick={updateBlog}
                  type="submit"
                  className="btn form-button"
                >
                  Submit
                </button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <FooterC />
    </div>
  );
};

export default AdminBlogPostC;
