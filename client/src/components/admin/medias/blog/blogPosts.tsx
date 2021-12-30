import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../../apis/indexAPI";
import FooterC from "../../../user/standard/footer";
import { IBlog } from "../../../../interfaces";
import MediaMenuC from "./blogMenu";
import AdminAccountNavC from "../../standard/accountNav";
import AdminMenuNavC from "../../standard/menuNav";
import AddBlog from "./addBlog";
import { Button, Grid } from "@mui/material";

const AdminMediasC: FC = () => {

  const { media } = useParams();

  const [type, setType] = useState<string>("");
  const [medias, setMedias] = useState<IBlog[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let mediasResponse;
  useEffect((): void => {
    const fetchData = async () => {
      try {
        mediasResponse = await IndexAPI.get(`/admin/medias/${media}`);

        for (let i = 0; i < mediasResponse.data.data.blogs.length; i++) {
          if (mediasResponse.data.data.blogs[i].imagekey !== null) {
            let imagesResponse = await IndexAPI.get(
              `/images/${mediasResponse.data.data.blogs[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            mediasResponse.data.data.blogs[
              i
            ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
          }
        }
        setMedias(mediasResponse.data.data.blogs);

        if(media === "blog"){
          setType("add post")
        }

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(medias.length / itemsPerPage);

  const changePage = ({selected}: {selected:number}): void => {
    setPageNumber(selected);
    console.log(pagesVisted)
  };

  const displayMedias = medias;
    // .slice(pagesVisted, pagesVisted + itemsPerPage)
    // .map((media) => {
    //   return (
    //     <Grid
    //       className="collection-item-div"
    //       key={media.id}
    //       onClick={() => displayItem(media.media, media.id)}
    //     >
    //       <Grid className="collection-item">
    //         <img className="collection-thumbnail" src={media.imageBuffer} />
    //       </Grid>
    //       <Grid>
    //         <Grid>{media.title}</Grid>
    //       </Grid>
    //     </Grid>
    //   );
    // });

  // let navigation = useNavigate();

  // const displayItem = async (media: string, id: string) => {
  //   try {
  //     navigation(`/admin/medias/${media}/${id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      {media === 'blog' ? <AddBlog open={open} handleClose={handleClose}/> : ""}
      <AdminAccountNavC />
      <AdminMenuNavC />
      <div className="main-body">
        <Grid sx={{ textAlign: 'right', paddingRight: "50px" }}>
          <Button onClick={handleOpen} sx={{ fontFamily: "Rajdhani", fontSize: "20px", color: "white", textTransform: "none"}}><a>{type}</a></Button>
        </Grid>
        <MediaMenuC />
        <div className="thumbnail-display">{displayMedias}</div>
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

export default AdminMediasC;
