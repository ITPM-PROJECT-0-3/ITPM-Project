import React, { useState } from "react";
import styles from "./RegostrationFormExaminer.module.css";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";
import { Button, Container, Typography } from "@mui/material";
import { Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FacaltyNameNames = [
  "Department of Electrical & Computer Engineering",
  "Department Of Information Management",
  "Department of Computer Systems Engineering",
  "Department of Software Engineering",
  "Department of Computer Science",
  "Department Of Business Management",
  "Department of Computer Systems Engineering",
  "Department of Information Technology",
  "Other",
];

const TitleNames = [
  "Lecturer",
  "Senior Lecturer",
  "Assistant Professor",
  "Associate Professor",
  "Professor",
  "Adjunct Professor",
];

const universityNames = [
  "Sri Lanka Institute of Information Technology",
  "Other",
];

export default function RegostrationFormExaminer() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [TagName, setTagname] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Univercity, setUnivercity] = useState("");
  const [OtherUniversity, setOtherUniversity] = useState("");
  const [Facalty, setFacalty] = useState("");
  const [Email, setEmail] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const RegisterAdmin = () => {
    console.log(password);

    if (password === Confirmpassword) {
      toast.success("Password matched!", {
        duration: 3000,
        position: "top-right",
      });

      console.log("password match!");
    } else {
      console.log("password Not match");
      toast.error("Password Not Match", {
        duration: 3000,
        position: "top-right",
      });
    }
  };
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newExaminer = {
        TagName: TagName,
        FirstName: FirstName,
        LastName: LastName,
        Univercity: Univercity,
        Facalty: Facalty,
        OtherUniversity: OtherUniversity,
        Email: Email,
        Password: password,
        UserType: "Examiner",
      };

      const ExaminerRegister = await axios.post(
        "http://localhost:8000/api/examiner/register",
        newExaminer
      );

      if (ExaminerRegister.status === 201) {
        const newUser = {
          username: Email,
          password: password,
          UserType: "Examiner",
        };
        console.log(newUser);
        const RegisterExaminer = await axios.post(
          "http://localhost:8000/student/register-examiner",
          newUser
        );

        console.log(RegisterExaminer);
        console.log("hi");
      }

      console.log(ExaminerRegister);

      setTagname("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setFacalty("");
      setUnivercity("");
      setOtherUniversity("");

      toast.success("Successfully Registered!", {
        duration: 3000,
        position: "top-right",
      });

      Navigate("/");
    } catch (err) {
      toast.error("Failed To Register", {
        duration: 3000,
        position: "top-right",
      });
      console.error(err);
    }
  };

  return (
    <div className={styles.bodyD}>
      <Container component="main" maxWidth="sm" className={styles.container}>
        <React.Fragment>
          <Typography
            component="h3"
            variant="h5"
            sx={{ mb: 2, fontWeight: 700, fontSize: "1.5rem" }}
            className={styles.header}
          >
            EXAMINER REGISTRATION.
          </Typography>

          <Form onSubmit={handleSubmit} className={styles.form}>
            <Form.Group controlId="formBasicFirstName" sx={{ mb: 2 }}>
              <Form.Label>Title</Form.Label>
              <Form.Select
                onChange={(e) => setTagname(e.target.value)}
                value={TagName}
                required
              >
                <option value="" disabled>
                  Select Title
                </option>
                {TitleNames.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <br />
            <Row>
              <Col>
                <Form.Group controlId="formBasicFirstName" sx={{ mb: 2 }}>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={FirstName}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicLastName" sx={{ mb: 2 }}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last name"
                    onChange={(e) => setLastName(e.target.value)}
                    value={LastName}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ marginTop: "1rem" }}>
              <Col>
                <Form.Group controlId="formBasicFirstName" sx={{ mb: 2 }}>
                  <Form.Label>University Name</Form.Label>
                  <Form.Select
                    onChange={(e) => setUnivercity(e.target.value)}
                    value={Univercity}
                    required
                  >
                    <option value="" disabled>
                      Select University
                    </option>
                    {universityNames.map((name, index) => (
                      <option key={index} value={name}>
                        {name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                {Univercity === "Other" && (
                  <Form.Group
                    controlId="formBasicLastName"
                    sx={{ mb: 2 }}
                    style={{ marginTop: "0rem" }}
                  >
                    <Form.Label>University Name (Other)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter University Name"
                      value={OtherUniversity}
                      onChange={(e) => setOtherUniversity(e.target.value)}
                    />
                  </Form.Group>
                )}
              </Col>
            </Row>
            <br />

            <Form.Group controlId="formBasicFirstName" sx={{ mb: 3 }}>
              <Form.Label>Facalty Name</Form.Label>
              <Form.Select
                onChange={(e) => setFacalty(e.target.value)}
                value={Facalty}
                required
              >
                <option value="" disabled>
                  Select Facalty
                </option>
                {FacaltyNameNames.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group
              controlId="formBasicEmail"
              sx={{ mb: 2 }}
              style={{ marginTop: "1rem" }}
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                required
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group
                  controlId="formBasicPassword"
                  sx={{ mb: 2 }}
                  style={{ marginTop: "1rem" }}
                >
                  <Form.Label>Password</Form.Label>
                  <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
                    <Input
                      type={showPassword1 ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword1}
                            onMouseDown={handleMouseDownPassword1}
                          >
                            {showPassword1 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{
                        backgroundColor: "white !important",
                        width: "100%",
                        borderRadius: "0.375rem !important",
                        border: "1px solid #dee2e6 !important",
                        alignItems: "center !important",
                        padding: "2.5px",
                        marginLeft: "-10px",
                        color: "black !important",
                      }}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      value={password}
                      required
                    />
                  </FormControl>
                </Form.Group>
              </Col>

              {/* Confirm Password Field */}
              <Col>
                <Form.Group
                  controlId="formConfirmPassword"
                  sx={{ mb: 1 }}
                  style={{ marginTop: "1rem" }}
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
                    <Input
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{
                        backgroundColor: "white !important",
                        width: "100%",
                        borderRadius: "0.375rem !important",
                        border: "1px solid #dee2e6 !important",
                        alignItems: "center !important",
                        padding: "2.5px",
                        marginLeft: "-10px",
                      }}
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={Confirmpassword}
                      required
                    />
                  </FormControl>
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="contained"
              type="submit"
              style={{ marginTop: "1rem" }}
              className={styles.button}
              onClick={RegisterAdmin}
            >
              Register
            </Button>
          </Form>
        </React.Fragment>
      </Container>
    </div>
  );
}
