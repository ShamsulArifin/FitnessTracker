Creating a Git repository is a great idea to keep track of your fitness tracker's development and changes\!

Here's a nice `README.md` file for your Fitness Tracker repository. You can copy and paste this directly into a file named `README.md` in the root of your new Git repository.

-----

# 🏋️‍♀️ Daily Fitness Tracker

A simple, client-side web application for tracking your daily fitness metrics, workout splits, pain levels, and supplement intake. This tool is designed to be straightforward to use, saving your data directly in your browser's local storage for persistence across sessions.

-----

## ✨ Features

  * **📅 Daily Date Default:** Automatically sets the date field to today's date for quick entry.
  * **⚖️ Weight Tracking:** Log your daily weight with support for decimal values.
  * **💪 Multi-Select Workout Split:** Choose one or more specific body areas or workout types for each day (e.g., Chest, Biceps, Legs, Cardio).
  * **🩹 Pain Level Tracking:** Select your current pain level from a scale of 1-10 with descriptive options.
  * **💊 Supplement Checkboxes:** Easily mark if you've taken Protein, Creatine, and EAA.
  * **💾 Local Data Persistence:** All your entries are automatically saved to your browser's `localStorage`, meaning your data persists even if you close and reopen the browser tab.
  * **📝 Entry Management:** View a chronological list of your entries, with the most recent at the top.
  * **🗑️ Delete Entries:** Remove individual entries if needed.
  * **📊 CSV Export:** Download all your tracked data into a CSV file, which can be opened in spreadsheet software like Microsoft Excel or Google Sheets for further analysis.
  * **🔥 Clear All Data:** Option to wipe all stored fitness data from your browser (with a confirmation to prevent accidental loss).

-----

## 🚀 How to Use

This is a client-side application, meaning it runs entirely in your web browser without needing a server.

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/ShamsulArifin/FitnessTracker.git
    ```

2.  **Navigate to the Directory:**

    ```bash
    cd daily-fitness-tracker
    ```

3.  **Open the File:**
    Locate the `index.html` file (or `fitness_tracker.html` if you renamed it) in the cloned directory and **double-click it**. It will open directly in your default web browser.

-----

## 👨‍💻 Development

This project is built using:

  * **HTML5:** For the basic structure of the web page.
  * **Tailwind CSS:** For rapid and responsive styling.
  * **JavaScript:** For all interactive functionality, data management (saving/loading to `localStorage`), and CSV export.

-----

## ⚠️ Important Note on Data

The data for this tracker is stored exclusively in your browser's **local storage**. This means:

  * **Data is Local:** Your data is saved on the specific browser and device you are using.
  * **No Cloud Sync:** If you open the tracker on a different computer or a different browser, your data will not be there. It's not synchronized across devices or browsers.
  * **Browser-Dependent:** Clearing your browser's data, cookies, or `localStorage` for the site will delete your fitness tracker data. Always download a CSV backup regularly if your data is critical\!

-----

## 💡 Future Enhancements (Ideas)

  * **Data Visualization:** Graphs or charts to visualize progress over time (weight trends, workout frequency).
  * **Performance Metrics:** Add fields for specific exercises (e.g., Squat 1RM, Bench Press volume).
  * **Goal Setting:** Ability to set and track fitness goals.
  * **Notes Field:** A simple text area for additional daily notes or thoughts.
  * **Cloud Integration:** For true cross-device sync, a backend server and database would be required (e.g., Node.js with MongoDB, Python with PostgreSQL, etc.).

-----

## 🤝 Contributing

Feel free to fork this repository, suggest improvements, or submit pull requests. Any contributions are welcome\!

-----

## 📄 License

This project is open source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

-----