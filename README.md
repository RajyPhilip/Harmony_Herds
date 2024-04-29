# Harmony Herds - Milking Tracker with Music

Welcome to Harmony Herds, a mobile-first web application built with React that helps dairy farmers track their milking sessions while incorporating music to enhance cattle yield.

## Live Link: https://harmony-herds.onrender.com/

## Description

Harmony Herds is a web application designed to simplify milking session tracking for dairy farmers while leveraging the calming effect of music to reduce stress in cattle. This application provides an intuitive user interface, music integration, pause and stop functionality, local storage for milking session history, and a dedicated page for displaying milking history.

## Features

### Intuitive User Interface
- A mobile-first design ensures usability on a variety of devices.
- A central "Start Milking" button provides a straightforward interface for initiating milking sessions.

### Music Integration
- Music playback begins automatically when a milking session is started.
- Slow-paced and calming genres like classical or instrumental music are used to create a soothing environment for cattle.

### Pause and Stop Functionality
- The "Start Milking" button transitions to "Pause" and "Stop" when clicked.
  - **Pause:** Pauses both the music and the timer. The button becomes "Resume."
  - **Resume:** Resumes music playback and continues the timer.
  - **Stop:** Ends the music and prompts the user to enter the quantity of milk inside a popup.

### Local Storage for Milking History
- Milking session history is stored locally using localStorage.
- Each session's date, start time, end time, and total milk milked are saved for future reference.

### Milking History Display
- A dedicated page displays milking session history in a tabular format.
- Columns for Date, start time, end time, total time, and total milk provide a comprehensive overview of past sessions.

## Installation

To run Harmony Herds locally on your machine, follow these steps:

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd Harmony_Herds
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.


## Authors

- [@RajyPhilip](https://www.github.com/RajyPhilip)

