import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import { IProject } from "../../../interfaces";
import AccountNavC from "../standard/accountNav";
import MenuNavC from "../standard/menuNav";
import FooterC from "../standard/footer";

const ProjectsC: FC = () => {

  const [projects, setProjects] = useState<IProject[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);

  let projectResponse;
  useEffect((): void => {
    const fetchData = async () => {
      try {
        projectResponse = await IndexAPI.get(`/projects`);
        console.log(projectResponse)

        for (let i = 0; i < projectResponse.data.data.projects.length; i++) {
          if (projectResponse.data.data.projects[i].imagekey !== null) {
            let imagesResponse = await IndexAPI.get(
              `/images/${projectResponse.data.data.projects[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            projectResponse.data.data.projects[
              i
            ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
          }
        }
        setProjects(projectResponse.data.data.projects);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(projects.length / itemsPerPage);

  const changePage = ({selected}: {selected:number}): void => {
    setPageNumber(selected);
  };

  const displayItems = projects
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((project) => {
      return (
        <div
          className="collection-item-div"
          key={project.id}
          onClick={() => displayItem(project.id)}
        >
          <div className="collection-item">
            <img className="collection-thumbnail" src={project.imageBuffer} />
          </div>
          <div>
            <div>{project.title}</div>
          </div>
        </div>
      );
    });

  let navigation = useNavigate();

  const displayItem = async (id: string) => {
    try {
      navigation(`/projects/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AccountNavC />
      <MenuNavC />
      <div className="main-body">
        <div className="thumbnail-display">{displayItems}</div>
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

export default ProjectsC;