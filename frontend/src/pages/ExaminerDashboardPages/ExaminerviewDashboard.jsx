import React, { useEffect } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Row, Col } from "react-bootstrap";
import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";
import SvgIcon from "@mui/joy/SvgIcon";
import Button from "@mui/joy/Button";
import SchoolIcon from "@mui/icons-material/School";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs("2022-04-17");

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🌚" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function ExaminerviewDashboard() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  useEffect(() => {
    document.title = "Examiner Dashboard | SLIIT";
    return () => {
      document.title = "SLIIT";
    };
  }, []);

  return (
    <div style={{ margin: "10px" }}>
      <Row>
        <Col>
          <Card variant="solid" color="primary" invertedColors>
            <CardContent orientation="horizontal">
              <CircularProgress size="lg" determinate value={20}>
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                </SvgIcon>
              </CircularProgress>
              <CardContent>
                <Typography level="body-md">Submited Marks</Typography>
                <Typography level="h2">72</Typography>
              </CardContent>
            </CardContent>
            <CardActions>
              <Button variant="soft" size="sm">
                View Submited
              </Button>
              <Button variant="solid" size="sm">
                See Progress
              </Button>
            </CardActions>
          </Card>
        </Col>
        <Col>
          <Card
            variant="solid"
            style={{ backgroundColor: "#009688" }}
            invertedColors
          >
            <CardContent orientation="horizontal">
              <CircularProgress size="lg" determinate value={70}>
                <SvgIcon>
                  <SchoolIcon />
                </SvgIcon>
              </CircularProgress>
              <CardContent>
                <Typography level="body-md">Total Groups</Typography>
                <Typography level="h2">670</Typography>
              </CardContent>
            </CardContent>
            <CardActions>
              <Button variant="soft" size="sm">
                View Group-List
              </Button>
              <Button variant="solid" size="sm">
                See Marks
              </Button>
            </CardActions>
          </Card>
        </Col>
        <Col>
          <Card
            variant="solid"
            style={{ backgroundColor: "#455a64" }}
            invertedColors
          >
            <CardContent orientation="horizontal">
              <CircularProgress size="lg" determinate value={50}>
                <SvgIcon>
                  <ManageAccountsIcon />
                </SvgIcon>
              </CircularProgress>
              <CardContent>
                <Typography level="body-md">Completed Groups</Typography>
                <Typography level="h2">432</Typography>
              </CardContent>
            </CardContent>
            <CardActions>
              <Button variant="soft" size="sm">
                Interview Shedule
              </Button>
              <Button variant="solid" size="sm">
                See breakdown
              </Button>
            </CardActions>
          </Card>
        </Col>
      </Row>
      <br />
      <br />
      <Row container spacing={1}>
        <Col item xs={6} md={8}>
          <Card></Card>
        </Col>
        <Col item xs={6} md={4}>
          <Card
            style={{
              backgroundColor: "#ffffff",
              opacity: "0.9",
              width: "100%",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={initialValue}
                loading={isLoading}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                  day: ServerDay,
                }}
                slotProps={{
                  day: {
                    highlightedDays,
                  },
                }}
              />
            </LocalizationProvider>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
