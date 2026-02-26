# Real-Time Chat App

## Description
A full-stack Java chat application that allows multiple users to communicate in real time. The app uses WebSockets for bidirectional communication between clients and the server, enabling instant message updates without page refreshes.

## Tech Stack
- Java
- Spring Boot
- WebSockets (Spring WebSocket / STOMP)
- HTML/CSS/JavaScript (Frontend)
- Thymeleaf (optional template engine)
- Maven (build tool)

## Features
- Real-time messaging between multiple users
- WebSocket-based communication (no polling)
- User join/leave notifications
- Clean and simple UI for sending and receiving messages

## How to Run Locally

### Backend (Server)
1. Clone the repository:
```bash
git clone https://github.com/Koutsiotas7/Full-Stack-Projects.git

2. Navigate to the chat app folder:
cd Full-Stack-Projects/Real-Time-Chat-App

3. Build and start the server:
mvn spring-boot:run

The backend will start on http://localhost:8080

