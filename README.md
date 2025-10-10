# Duplicate Tab Closer

A simple and efficient Chrome extension to find and close duplicate tabs, helping you keep your browser window clean and organized.

![Extension Icon](close_duplicate_tabs.png)

## How It Works

This extension provides a "one-click" solution to browser clutter.

1.  **Click the Extension Icon**: When you click the icon in your Chrome toolbar, a small window will pop up.
2.  **Automatic Scan**: The extension immediately scans all of your open tabs across all windows.
3.  **Close Duplicates**: For any URL that is open in more than one tab, the extension will close all duplicates, keeping only the *last* tab that was opened for that URL.
4.  **Get Feedback**: The popup will briefly display a message indicating how many tabs were closed (e.g., "Closed 5 tab(s).") or "No duplicates found."
5.  **Auto-Close**: After 2 seconds, the popup will automatically disappear.

## Features

- **Instant Cleanup**: No buttons to press in the popup. The action is immediate.
- **Keeps the Last Tab**: Preserves the most recently opened tab from any set of duplicates.
- **Cross-Window Support**: Scans and closes duplicates across all of your open Chrome windows.
- **Lightweight & Fast**: Minimalist design with no background processes running continuously.

## Installation

Since this extension is not on the Chrome Web Store, you can load it locally using Developer Mode.

1.  **Download or Clone**: Download the project files or clone this repository to your local machine.
    ```sh
    git clone <repository-url>
    ```
2.  **Open Chrome Extensions**: Open Google Chrome and navigate to `chrome://extensions`.

3.  **Enable Developer Mode**: In the top-right corner of the Extensions page, turn on the **Developer mode** toggle.

4.  **Load the Extension**:
    - Click the **Load unpacked** button that appears.
    - In the file selection dialog, navigate to and select the `close_duplicate_tabs` project folder.

5.  **Done!**: The "Duplicate Tab Closer" icon will now appear in your Chrome toolbar, ready for use.

## Project Files

- `manifest.json`: The core configuration file for the extension, defining its permissions and properties.
- `popup.html`: The simple HTML structure for the popup window.
- `popup.js`: The JavaScript logic that finds and closes duplicate tabs when the popup is opened.
- `close_duplicate_tabs.png`: The icon for the extension.
