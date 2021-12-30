import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import ReactPaginate from "react-paginate";
import IndexAPI from "../../../../apis/indexAPI";
import FooterC from "../../standard/footer";
import MediaMenuC from "../mediasMenu";
import AccountNavC from "../../standard/accountNav";
import MenuNavC from "../../standard/menuNav";

const PodcastsC: FC = () => {

  const { media } = useParams();

  const [ , setChannel ] = useState<string[]>();
  // const [, setPageNumber] = useState<number>(0);

  let mediaResponse;
  useEffect((): void => {
    const fetchData = async () => {
      try {

        if(media === "channel"){
          mediaResponse = await IndexAPI.get(`/medias/${media}`);
          // console.log(mediaResponse.data.data.videos.items[0].id.videoId);
          
          const videoList: string[] = [];
          for(let i = 0; i < mediaResponse.data.data.videos.items.length; i++){
            videoList.push(mediaResponse.data.data.videos.items[i].id.videoId)
          }
          console.log(videoList)
          setChannel(videoList);
        }

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // const itemsPerPage: number = 9;
  // const pagesVisted: number = pageNumber * itemsPerPage;
  // const pageCount = Math.ceil(channel.length / itemsPerPage);

  // const changePage = ({selected}: {selected:number}): void => {
  //   setPageNumber(selected);
  // };

  // const displayMedias = channel
  //   .slice(pagesVisted, pagesVisted + itemsPerPage)
  //   .map((video) => {
  //     return (
  //       <div
  //         className="collection-item-div"
  //         key={media.id}
  //         onClick={() => displayItem(media.media, media.id)}
  //       >
  //         <div className="collection-item">
  //           <img className="collection-thumbnail" src={media.imageBuffer} />
  //         </div>
  //         <div>
  //           <div>{media.title}</div>
  //         </div>
  //       </div>
  //     );
  //   });

  // let navigation = useNavigate();

  // const displayItem = async (media: string, id: string) => {
  //   try {
  //     navigation(`/medias/${media}/${id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <AccountNavC />
      <MenuNavC />
      <div className="main-body">
        <MediaMenuC />
        <div className="collection-menu">{}</div>
        {/* <div className="thumbnail-display">{displayMedias}</div> */}
        {/* <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationButtons"}
          previousLinkClassName={"prevButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"disabledButton"}
          activeClassName={"activeButton"} pageRangeDisplayed={5} marginPagesDisplayed={5}/> */}
      </div>
      <FooterC />
    </div>
  );
};

export default PodcastsC;
