import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import FooterC from "../standard/footer";
import { IMedia } from "../../../interfaces";
import MediaMenuC from "./mediasMenu";
import AccountNavC from "../standard/accountNav";
import MenuNavC from "../standard/menuNav";

const MediasC: FC = () => {

  const { media } = useParams();

  const [medias, setMedias ] = useState<IMedia[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);

  let mediaResponse;
  useEffect((): void => {
    const fetchData = async () => {
      try {
        mediaResponse = await IndexAPI.get(`/medias/${media}`);

        for (let i = 0; i < mediaResponse.data.data.medias.length; i++) {
          if (mediaResponse.data.data.medias[i].imagekey !== null) {
            let imagesResponse = await IndexAPI.get(
              `/images/${mediaResponse.data.data.medias[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            mediaResponse.data.data.medias[
              i
            ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
          }
        }
        setMedias(mediaResponse.data.data.medias);

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
  };

  const displayMedias = medias
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((media) => {
      return (
        <div
          className="collection-item-div"
          key={media.id}
          onClick={() => displayItem(media.media, media.id)}
        >
          <div className="collection-item">
            <img className="collection-thumbnail" src={media.imageBuffer} />
          </div>
          <div>
            <div>{media.title}</div>
          </div>
        </div>
      );
    });

  let navigation = useNavigate();

  const displayItem = async (media: string, id: string) => {
    try {
      navigation(`/medias/${media}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AccountNavC />
      <MenuNavC />
      <div className="main-body">
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

export default MediasC;
