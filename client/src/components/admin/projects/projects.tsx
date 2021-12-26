import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import { IProject } from "../../../interfaces";
import AdminAccountNavC from "../standard/accountNav";
import AdminMenuNavC from "../standard/menuNav";
import FooterC from "../../user/standard/footer";
import AddProject from "./addProject";
import { Button, Grid } from "@mui/material";

const AdminProjectsC: FC = () => {

  const [projects, setProjects ] = useState<IProject[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;

  const displayProjects = projects
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

  const pageCount = Math.ceil(projects.length / itemsPerPage);

  const changePage = ({selected}: {selected:number}): void => {
    setPageNumber(selected);
  };

  let navigation = useNavigate();

  let projectsResponse;
  useEffect((): void => {
    const fetchData = async () => {
      try {
        projectsResponse = await IndexAPI.get(`/admin/projects`);

        for (let i = 0; i < projectsResponse.data.data.projects.length; i++) {
          if (projectsResponse.data.data.projects[i].imagekey !== null) {
            let imagesResponse = await IndexAPI.get(
              `/images/${projectsResponse.data.data.projects[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            projectsResponse.data.data.projects[
              i
            ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
          }
        }
        setProjects(projectsResponse.data.data.projects);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const displayItem = async (id: string) => {
    try {
      navigation(`/admin/projects/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AddProject open={open} handleClose={handleClose}/>
      <AdminAccountNavC />
      <AdminMenuNavC />
      <div className="main-body">
        <Grid sx={{ textAlign: 'right', paddingRight: "50px" }}>
          <Button onClick={handleOpen} sx={{ fontFamily: "Rajdhani", fontSize: "20px", color: "white", textTransform: "none"}}><a>add project</a></Button>
        </Grid>
        <div className="thumbnail-display">{displayProjects}</div>
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

export default AdminProjectsC;