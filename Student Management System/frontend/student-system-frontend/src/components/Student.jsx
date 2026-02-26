import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Student() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, address };

    fetch("http://localhost:8080/students/newStudent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    })
      .then((res) => res.json())
      .then((savedStudent) => {
        setStudents((prevStudents) => [...prevStudents, savedStudent]);
        setName("");
        setAddress("");
      });
  };

  // DELETE request
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/students/${id}`, {
      method: "DELETE",
    }).then(() => {
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    });
  };

  // EDIT request (basic example — replace with a modal or form in real app)
  const handleEdit = (student) => {
    const updatedName = prompt("Enter new name:", student.name);
    const updatedAddress = prompt("Enter new address:", student.address);

    if (updatedName && updatedAddress) {
      fetch(`http://localhost:8080/students/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...student, name: updatedName, address: updatedAddress }),
      })
        .then((res) => res.json())
        .then((updatedStudent) => {
          setStudents((prevStudents) =>
            prevStudents.map((s) => (s.id === student.id ? updatedStudent : s))
          );
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} sx={paperStyle}>
        <Typography variant="h5" sx={{ color: "blue", mb: 2 }}>
          <u>Add Student</u>
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ "& > :not(style)": { m: 1 } }}
        >
          <TextField
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>
        </Box>
      </Paper>

      <Typography variant="h5" sx={{ mt: 3 }}>
        Students
      </Typography>

      <Paper elevation={3} sx={paperStyle}>
        {students.map((student) => (
          <Paper
            elevation={6}
            sx={{
              m: 1,
              p: 2,
              textAlign: "left",
              position: "relative",
            }}
            key={student.id}
          >
            {/* Top right icons */}
            <Box sx={{ position: "absolute", top: 5, right: 5 }}>
              <IconButton
                color="primary"
                onClick={() => handleEdit(student)}
                size="small"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDelete(student.id)}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            {/* Student Info */}
            <Typography>Id: {student.id}</Typography>
            <Typography>Name: {student.name}</Typography>
            <Typography>Address: {student.address}</Typography>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
