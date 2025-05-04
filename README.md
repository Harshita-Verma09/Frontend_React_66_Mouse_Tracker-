# Mouse Tracker React Component

This React component, `MouseTracker`, displays the current mouse coordinates on the screen and visually tracks the mouse position with a small blue circle.

## Features

- **Real-time Mouse Tracking:** Shows the current X and Y coordinates of the mouse cursor.
- **Visual Feedback:** A blue circle follows the mouse cursor, providing immediate visual feedback.
- **Custom Hook:** Utilizes a custom React Hook (`useMousePosition`) to encapsulate the mouse tracking logic.
- **Styling with Tailwind CSS:** Styled using Tailwind CSS for a clean and responsive design.

## Installation

1.  **Ensure you have Node.js and npm (or yarn) installed on your system.**
2.  **Create a new React project (if you haven't already):**

    ```bash
    npx create-react-app mouse-tracker-app
    cd mouse-tracker-app
    ```

3.  **Install Tailwind CSS and its peer dependencies:**

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    # or
    yarn add -D tailwindcss postcss autoprefixer
    ```

4.  **Initialize Tailwind CSS:**

    ```bash
    npx tailwindcss init -p
    ```

5.  **Configure Tailwind CSS:**
    - Open the `tailwind.config.js` file and modify the `content` array to include all your template files:

      ```javascript
      /** @type {import('tailwindcss').Config} */
      module.exports = {
        content: [
          "./src/**/*.{js,jsx,ts,tsx}",
          "./public/index.html",
        ],
        theme: {
          extend: {},
        },
        plugins: [],
      }
      ```
    - Open the `postcss.config.js` file and add Tailwind CSS and Autoprefixer:

      ```javascript
      module.exports = {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      }
      ```
    - Import the Tailwind CSS directives into your main CSS file (e.g., `src/index.css` or `src/App.css`):

      ```css
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
      ```

6.  **Create the `useMouseTrack` custom hook:**
    - Create a folder named `hook` in your `src` directory.
    - Create a file named `useMouseTrack.js` inside the `hook` folder.
    - Add the following code to `useMouseTrack.js`:

      ```javascript
      import { useState, useEffect } from 'react';

      const useMousePosition = () => {
        const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

        useEffect(() => {
          const updateMousePosition = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
          };

          window.addEventListener('mousemove', updateMousePosition);

          return () => {
            window.removeEventListener('mousemove', updateMousePosition);
          };
        }, []);

        return mousePosition;
      };

      export default useMousePosition;
      ```

7.  **Create the `MouseTracker` component:**
    - Create a file named `MouseTracker.js` in your `src` directory (or in a `components` folder if you have one).
    - Add the provided code to `MouseTracker.js`:

      ```javascript
      import React from "react";
      import useMousePosition from "../hook/useMouseTrack";

      const MouseTracker = () => {
        const { x, y } = useMousePosition();

        return (
          <div className="h-screen bg-gray-900 flex items-center justify-center text-white relative">
            <h1 className="text-2xl">Mouse Position: X: {x}, Y: {y}</h1>


            <div
              className="absolute w-5 h-5 bg-blue-500 rounded-full pointer-events-none"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                transition: "transform 0.1s linear",
              }}
            />
          </div>
        );
      };

      export default MouseTracker;
      ```

8.  **Use the `MouseTracker` component in your `App.js` (or any other component):**

    ```javascript
    import React from 'react';
    import MouseTracker from './MouseTracker';
    import './App.css'; // Make sure to import your CSS file

    function App() {
      return (
        <div className="App">
          <MouseTracker />
        </div>
      );
    }

    export default App;
    ```

9.  **Run your React application:**

    ```bash
    npm start
    # or
    yarn start
    ```

    This will start your development server, and you should see the Mouse Tracker component in your browser.

## Code Explanation

- **`useMousePosition` Hook:**
    - Uses the `useState` hook to store the current mouse `x` and `y` coordinates.
    - Uses the `useEffect` hook to add an event listener to the `mousemove` event on the `window` object.
    - The `updateMousePosition` function updates the state with the new mouse coordinates whenever the mouse moves.
    - The cleanup function in `useEffect` removes the event listener when the component unmounts to prevent memory leaks.
    - Returns an object containing the current `x` and `y` coordinates.

- **`MouseTracker` Component:**
    - Imports the `useMousePosition` custom hook.
    - Calls the `useMousePosition` hook to get the current mouse coordinates (`x` and `y`).
    - Renders a `div` that takes up the full screen (`h-screen`) with a dark background (`bg-gray-900`), centers its content (`flex items-center justify-center`), and sets the text color to white (`text-white`) and its positioning context to relative (`relative`).
    - Displays the current mouse `x` and `y` coordinates in an `h1` element.
    - Renders a `div` that acts as the visual tracker:
        - It has an absolute position (`absolute`) so it can be positioned anywhere within its relative parent.
        - It has a fixed width and height (`w-5 h-5`).
        - It has a blue background (`bg-blue-500`) and rounded corners (`rounded-full`) to make it a circle.
        - `pointer-events-none` ensures that the circle doesn't interfere with mouse events on other elements.
        - The `transform: translate(${x}px, ${y}px)` style dynamically positions the circle based on the mouse coordinates.
        - `transition: transform 0.1s linear` adds a smooth transition effect to the circle's movement.

## Further Development

- You could customize the appearance of the tracker (color, size, shape).
- You could use the mouse coordinates to trigger other animations or interactions on the page.
- You could implement throttling or debouncing on the mousemove event for performance optimization if needed.
