# DayWise

![image](https://github.com/user-attachments/assets/5cad29be-3be8-48c1-acb1-86fc010801b1)

DayWise is a user-friendly event management application designed to help you efficiently track and manage your daily events. Built using React, it provides a seamless calendar-based interface, allowing you to add, update, or delete events with ease, while ensuring no overlapping events are scheduled. All changes persist in your browser using localStorage, and a centralized state is maintained using React Context for consistent and efficient updates.

## Features

### 1. **Interactive Calendar**
- Displays the calendar for a month in a grid format, showing each day clearly.
- Built using the powerful `moment` package for date and time manipulation.

### 2. **Event Management**
- **Add Events**: Click on any day to create a new event.
- **Update Events**: Modify existing events directly from the interface.
- **Delete Events**: Easily remove events when they are no longer needed.
- **Event Categories with Color Coding**: Visual differentiation of event types.

### 3. **Conflict Detection**
- Ensures that events do not overlap based on their start and end times.
- Displays error messages for overlapping events, ensuring a conflict-free schedule.

### 4. **Persistent Storage**
- All events are saved to your browser's `localStorage`, so your data remains available even after a page refresh.
- No server or external database is required.

### 5. **Centralized State Management**
- Uses React Context to maintain a single source of truth for all event-related data.
- Provides consistent updates across the app and ensures clean state management.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **Moment.js**: For handling and formatting dates and times.
- **Material-UI**: For responsive and modern UI components.
- **React Context**: For state management and ensuring a single source of truth.
- **LocalStorage**: For storing events persistently in the browser.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/daywise.git
   ```

2. Navigate to the project directory:
   ```bash
   cd daywise
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and go to:
   ```
   http://localhost:5173
   ```

## How to Use

1. **View Calendar**:
   - The main screen displays the current month in a grid format.

2. **Add an Event**:
   - Click on a specific day.
   - Fill in the event details (name, start time, end time, description, category).
   - Save the event.
   - The app will validate the timing to ensure no overlaps.

3. **Edit or Delete an Event**:
   - Click on the day with events.
   - Use the edit or delete options for each event.

4. **Persist Events**:
   - All changes are automatically saved to `localStorage`.
   - Refresh the page, and your events will still be there.

## Project Structure

- `components/`: Contains reusable UI components like the calendar and event form.
- `context/`: Contains React Context for centralized state management.
- `utils/`: Utility functions for date and time handling.
- `App.js`: The main app component.



