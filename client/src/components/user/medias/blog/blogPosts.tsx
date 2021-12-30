import React, { FC, useEffect, useState } from "react";
import IndexAPI from "../../../../apis/indexAPI";
import FooterC from "../../standard/footer";
import MediaMenuC from "../mediasMenu";
import AccountNavC from "../../standard/accountNav";
import MenuNavC from "../../standard/menuNav";
import { IBlog } from "../../../../interfaces";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const BlogPostsC: FC = () => {

  const [ blog , setBlog ] = useState<IBlog[]>([]);
  const [ pageNumber, setPageNumber] = useState<number>(0);

  let blogResponse;
  useEffect((): void => {
    const fetchData = async () => {
      try {

        blogResponse = await IndexAPI.get(`/medias/blog`);
        console.log(blogResponse.data.data.posts);
        
        for (let i = 0; i < blogResponse.data.data.posts.length; i++) {
          if (blogResponse.data.data.posts[i].imagekey !== null) {
            let imagesResponse = await IndexAPI.get(
              `/images/${blogResponse.data.data.posts[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            blogResponse.data.data.posts[
              i
            ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
          }
        }
        setBlog(blogResponse.data.data.posts);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(blog.length / itemsPerPage);

  const changePage = ({selected}: {selected:number}): void => {
    setPageNumber(selected);
  };

  const displayBlog = blog
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((post) => {
      return (
        <div
          className="collection-item-div"
          key={post.id}
          onClick={() => displayPost(post.id)}
        >
          <div className="collection-item">
            <img className="collection-thumbnail" src={post.imageBuffer} />
          </div>
          <div>
            <div>{post.title}</div>
          </div>
        </div>
      );
    });

  let navigation = useNavigate();

  const displayPost = async (id: string) => {
    try {
      navigation(`/medias/blog/${id}`);
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
        <div className="collection-menu">{}</div>
        <div className="thumbnail-display">{displayBlog}</div>
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

export default BlogPostsC;
