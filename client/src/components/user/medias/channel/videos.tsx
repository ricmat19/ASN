import React, { FC, useEffect } from "react";
import IndexAPI from "../../../../apis/indexAPI";
import FooterC from "../../standard/footer";
import MediaMenuC from "../mediasMenu";
import AccountNavC from "../../standard/accountNav";
import MenuNavC from "../../standard/menuNav";
// import { IVideos } from "../../../../interfaces";
// import { useNavigate } from "react-router-dom";
// import ReactPaginate from "react-paginate";

const BlogPostsC: FC = () => {

  // const [ videos , setVideos ] = useState<IVideos[]>([]);
  // const [ pageNumber, setPageNumber] = useState<number>(0);

  let channelResponse;
  useEffect((): void => {
    const fetchData = async () => {
      try {

        channelResponse = await IndexAPI.get(`/medias/channel`);
        console.log(channelResponse.data.data.videos.items);
        
        // setVideos(channelResponse.data.data.videos.items);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // const itemsPerPage: number = 9;
  // const pagesVisted: number = pageNumber * itemsPerPage;
  // const pageCount = Math.ceil(videos.length / itemsPerPage);

  // const changePage = ({selected}: {selected:number}): void => {
  //   setPageNumber(selected);
  // };

  // const displayChannel = videos
  //   .slice(pagesVisted, pagesVisted + itemsPerPage)
  //   .map((video) => {
  //     return (
  //       <div
  //         className="collection-item-div"
  //         key={video.etag}
  //         // onClick={() => displayVideo(video.id)}
  //       >
  //         {/* <div className="collection-item">
  //           <img className="collection-thumbnail" src={post.imageBuffer} />
  //         </div> */}
  //         <div>
  //           {/* <div>{video.title}</div> */}
  //         </div>
  //       </div>
  //     );
  //   });

  // let navigation = useNavigate();

  // const displayVideo = async (id: string) => {
  //   try {
  //     navigation(`/medias/channel/${id}`);
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
        <div className="thumbnail-display">{}</div>
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

export default BlogPostsC;
