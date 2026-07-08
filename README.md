# Wyze Security System Bundle Builder

This is my submission for the frontend take-home assignment. It implements a multi-step bundle builder with a live review panel based on the provided Figma design.

## Setup Instructions

Make sure you have Node installed.

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173/`.

## Tech Stack

* **React 19 & TypeScript:** Bootstrapped with Vite for fast HMR.
* **Tailwind CSS v4:** Used for styling, combined with `clsx` and `tailwind-merge` for conditional class composition. 
* **State Management:** Handled entirely via React hooks and Context, avoiding the overhead of external libraries like Redux or Zustand.
* **Icons:** `lucide-react` for standard UI icons, alongside custom assets exported directly from Figma.

## Implementation Details & Approach

### Data-Driven Architecture
The entire builder configures itself from `src/data/bundle.json`. This acts as the mock API response. The UI maps over this JSON to render the steps, products, plans, and available variants.

### Variant Selection & Steppers
Handling variants correctly was a priority. The state tracks quantities per unique variant ID rather than per product. When a user selects a different color, the active variant ID updates, and the stepper reflects the count for that specific color. This ensures the review panel can display line items for every selected variant independently.

### Responsive Layout
The layout matches the desktop Figma specs pixel-for-pixel using a two-column CSS grid. On smaller viewports, the layout stacks vertically, placing the review panel at the bottom or making it accessible as a summary, keeping the core building flow usable. Flex properties and min/max constraints were heavily used to maintain alignment.

### "Save for Later"
I implemented client-side persistence using `localStorage`. When the "Save my system for later" button is clicked, the current state (selected variants and quantities) is serialized. On page load, the app hydrates from `localStorage` if a saved session exists, restoring the user's progress exactly as they left it.

## Tradeoffs

* **Mock Backend vs Real API:** Since this is a frontend-focused task, I opted to serve the initial data from a local JSON file rather than building out an Express backend. It fulfills the requirement while keeping the project easy to review and run.
* **Recalculations:** Totals, subtotals, and savings are recalculated on the fly based on the current state. For a small catalog like this, dynamic calculation is fast and prevents state syncing bugs.
* **CSS Grid vs Flexbox:** I used CSS Grid heavily in the builder section to ensure product cards in the same row maintain equal heights, regardless of how long their descriptions or titles are. This prevents broken grid layouts without resorting to fixed heights.
