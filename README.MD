🏋️‍♀️ Daily Fitness Tracker App
A sleek and intelligent web application designed to help you effortlessly track your daily fitness activities, monitor progress, and gain actionable insights. Built with React and Material UI, this tracker provides a user-friendly interface for logging workouts, pain levels, and supplement intake, all while leveraging AI to offer personalized feedback.

🌟 Features
Daily Entry Tracking: Record essential fitness data including date, weight, height, chosen workout split, pain level, and custom notes.

Flexible Unit System: Seamlessly switch between Metric (kg, cm) and Imperial (lbs, ft/in) units for all measurements.

Customizable Supplements: A dedicated section to add, manage, and track your personalized list of supplements, including quantities taken.

Intuitive UI with Chips: Selected workout splits and pain levels are displayed as visually distinct, colored chips, enhancing usability and clarity.

Summary Statistics: Get an instant overview of your fitness journey with aggregated data like average weight, BMI, most frequent workouts, and supplement usage frequencies.

AI-Powered Insights: Harness the power of the Gemini API to generate intelligent summaries, identify trends, and receive actionable suggestions based on your logged fitness data.

Advanced Filtering & Sorting: Efficiently navigate your progress with options to filter entries by date range and workout type, and sort them in ascending or descending order by date.

Local Data Persistence: All your fitness entries and customized settings are securely saved within your browser's local storage, ensuring your data is always available.

CSV Data Export: Easily download your complete fitness history as a CSV file for backup, external analysis, or sharing.

Fully Responsive Design: The application is meticulously optimized to provide a consistent and enjoyable experience across all devices, from desktops to tablets and mobile phones.

✨ Recent Updates
This iteration brings significant enhancements to user experience and functionality:

Enhanced "Workout Split" and "Pain Level" Fields:

Selected options now appear as visually distinct chips directly within the input fields.

"Workout Split" chips display with unique colors for better differentiation.

"Pain Level" chips use a gradient of colors (green to red) to visually represent intensity.

Both fields maintain a consistent minimum width even when no value is selected, preventing visual inconsistencies.

"Filter & Sort" Section Improvements:

The "Filter Workout" field now also displays the selected workout as a colored chip.

Improved visual handling of empty select fields for better aesthetics.

Application Footer: A subtle footer has been added at the bottom of the application for attribution, including a hyperlink to the developer's portfolio.

🚀 Getting Started
To run this project locally, follow these steps:

Prerequisites
Node.js (LTS version recommended)

npm (comes with Node.js) or Yarn

Installation
Clone the repository:

git clone https://github.com/your-username/daily-fitness-tracker.git
cd daily-fitness-tracker

(Note: Replace your-username with the actual repository owner's username if you are forking this project, or the project's actual URL.)

Install all project dependencies:

npm install
# or
yarn install

This command installs all necessary dependencies, including React, Material-UI, and their related packages, as listed in package.json.

Running the Application
Start the development server:

npm start
# or
yarn start

This will open the application in your default web browser at http://localhost:3000.

📖 How to Use
The application is structured into four main tabs for easy navigation:

1. Entry Form (First Tab)
Date: Select the date for your fitness entry using the date picker.

Weight & Height: Enter your measurements. The unit system (Metric or Imperial) can be toggled at the top of the page, and the input fields will automatically adjust.

Workout Split: Choose one or more workout types from the dropdown. Your selections will appear as dynamically colored chips.

Pain Level: Select your pain level on a scale of 1-10. Your choice will be represented by a color-coded chip.

Supplements: Check the supplements you've consumed and, optionally, enter a specific quantity for each.

Notes: Use this field for any additional thoughts, observations, or details about your day.

Click the "Add Entry" button to save your new data. If an entry for the same date already exists, you'll be prompted to update it.

2. Summary (Second Tab)
This tab provides a quick overview of your accumulated fitness data, displaying average metrics and frequencies.

Click the "Get Fitness Insights ✨" button to generate an AI-powered analysis of your progress using the Gemini API.

3. Filter & Sort (Third Tab)
Start Date / End Date: Define a specific date range to view only relevant entries.

Filter Workout: Select a particular workout type to narrow down your entries to those including that activity.

Sort By Date: Choose whether to display your entries with the newest or oldest entries first.

Click "Apply Filters" to refresh the "Progress" tab with your refined view.

Click "Clear Filters" to reset all filtering and sorting options.

4. Progress (Fourth Tab)
This tab displays a chronological list of all your fitness entries.

Edit Entry: Click the pencil icon next to an entry to pre-fill the "Entry Form" tab with its data, allowing you to make changes.

Delete Entry: Click the trash icon to remove an entry. A confirmation dialog will appear.

Download as CSV: Export all your recorded data into a downloadable CSV file.

Clear All Data: Use this button with caution! It will permanently delete all your stored fitness data after a confirmation.

General Tips
Unit System: Use the radio buttons at the top of the page to switch between "Metric" and "Imperial" measurement systems.

Manage Supplements: In the "Entry Form" tab, click "Manage Supplements" to add or remove custom supplement names from your list.

🛠️ Technologies Used
React: A powerful JavaScript library for building dynamic and interactive user interfaces.

Material UI: A comprehensive React UI component library that implements Google's Material Design, providing pre-built and customizable components.

Gemini API: Utilized for generating AI-powered fitness insights based on user data.

Local Storage: For client-side data persistence.

🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

📄 License
This project is open-source and available under the MIT License.

✉️ Contact
Made with ❤️ by Shamsul Arifin