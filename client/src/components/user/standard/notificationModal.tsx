import React, { FC, useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Grid } from "@mui/material";
import { INotification } from "../../../interfaces";

const NotificationModalC: FC = () => {

  const [notifications, setNotifications] = useState<INotification[]>([]);

  const displayAll = async () => {
    const notificationsResponse = await IndexAPI.get(`/notifications`);
    setNotifications(notificationsResponse.data.data.notifications);
  };

  const displayProducts = async () => {
    const notificationsResponse = await IndexAPI.get(`/notifications/products`);
    setNotifications(notificationsResponse.data.data.notifications);
  };

  const displayCourses = async () => {
    const notificationsResponse = await IndexAPI.get(`/notifications/courses`);
    setNotifications(notificationsResponse.data.data.notificationsd);
  };

  const displayMedia = async () => {
    const notificationsResponse = await IndexAPI.get(`/notifications/media`);
    setNotifications(notificationsResponse.data.data.notifications);
  };

  const displayEvents = async () => {
    const notificationsResponse = await IndexAPI.get(`/notifications/events`);
    setNotifications(notificationsResponse.data.data.notifications);
  };

  return (
    <div className="notification-modal-container">
      <nav>
        <Grid
          container
          sx={{
            gap: 1,
            width: "400px",
            justifyContent: "center",
            textAlign: "center",
            paddingBottom: "5px"
          }}
        >
          <Grid xs={2} sx={{cursor: "pointer", fontWeight: "900"}}>
            <div onClick={() => displayAll()}>All</div>
          </Grid>
          <Grid xs={2} sx={{cursor: "pointer"}}>
            <i
              className="fas fa-store-alt"
              onClick={() => displayProducts()}
            ></i>
          </Grid>
          <Grid xs={2} sx={{cursor: "pointer"}}>
            <i
              className="fas fa-chalkboard-teacher"
              onClick={() => displayCourses()}
            ></i>
          </Grid>
          <Grid xs={2} sx={{cursor: "pointer"}}>
            <i className="fas fa-tv" onClick={() => displayMedia()}></i>
          </Grid>
          <Grid xs={2} sx={{cursor: "pointer"}}>
            <i
              className="fas fa-calendar-check"
              onClick={() => displayEvents()}
            ></i>
          </Grid>
        </Grid>
      </nav>
      <hr/>
      {notifications}
    </div>
  );
};

export default NotificationModalC;
