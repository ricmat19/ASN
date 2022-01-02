import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import { ICourse } from "../../../interfaces";
import FooterC from "../../user/standard/footer";
import CoursesMenuC from "./coursesMenu";
import AdminAccountNavC from "../standard/accountNav";
import AdminMenuNavC from "../standard/menuNav";
import AddCourse from "./addCourse";
import { Button, Grid } from "@mui/material";

const AdminCoursesC: FC = () => {

  const { subject } = useParams();

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;

  const displayCourses = courses
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((course) => {
      return (
        <Grid
          className="collection-item-div"
          key={course.id}
        >
          <Grid className="collection-item" onClick={() => displayCourse(course.subject, course.id)}>
            <img className="collection-thumbnail" src={course.imageBuffer} />
          </Grid>
          <Grid container>
            <Grid xs={6} sx={{textAlign: "left"}}>{course.title}</Grid>
            <Grid xs={6} sx={{textAlign: "right"}}><button className="delete-button">Delete</button></Grid>
          </Grid>
        </Grid>
      );
    });

  const pageCount = Math.ceil(courses.length / itemsPerPage);

  const changePage = ({selected}: {selected:number}): void => {
    setPageNumber(selected);
  };

  let navigation = useNavigate();

  let coursesResponse;
  useEffect((): void => {
    const fetchData = async () => {
      try {
        coursesResponse = await IndexAPI.get(`/admin/courses/${subject}`);

        for (let i = 0; i < coursesResponse.data.data.courses.length; i++) {
          if (coursesResponse.data.data.courses[i].imagekey !== null) {
            let imagesResponse = await IndexAPI.get(
              `/images/${coursesResponse.data.data.courses[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            coursesResponse.data.data.courses[
              i
            ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
          }
        }
        setCourses(coursesResponse.data.data.courses);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const displayCourse = async (subject: string, id: string) => {
    try {
      navigation(`/admin/courses/${subject}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AddCourse open={open} handleClose={handleClose}/>
      <AdminAccountNavC />
      <AdminMenuNavC />
      <div className="main-body">
        <Grid sx={{ textAlign: 'right', paddingRight: "50px" }}>
          <Button onClick={handleOpen} sx={{ fontFamily: "Rajdhani", fontSize: "20px", color: "white", textTransform: "none"}}><a>add course</a></Button>
        </Grid>
        <CoursesMenuC />
        <div className="thumbnail-display">{displayCourses}</div>
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

export default AdminCoursesC;