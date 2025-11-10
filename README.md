# Character Auto-Refresher for SillyTavern
Automatically refreshes your character list when you add, edit, or delete a character card directly from the `characters` folder.

**Tired of constantly hitting the refresh button after managing your character files manually? This extension completely automates the process!** **Very useful for automated downloads from character websites such as Chub!**

This lightweight plugin works in the background to:
- Instantly detect new character cards (`.png`, `.webp`, `.json`) added to your folder.
- Update the character list seamlessly without needing a page reload.
- Keep your SillyTavern session running smoothly.

## Example in Action

![A GIF showing a character file being added to the characters folder and the SillyTavern UI updating automatically without any user intervention.](https://github.com/gusta01010/characters-autorefresh/blob/main/assets/demo.gif?raw=true)

## Installation

Installation is a simple two-step process: install the package from the UI, then move one folder to activate the backend plugin.

### **Prerequisite: Enable Server Plugins**

Before you begin, make sure server plugins are enabled in your SillyTavern.

1.  Open the `config.yaml` file in your main SillyTavern folder.
2.  Find the line `enableServerPlugins: false` and change it to `enableServerPlugins: true`.
3.  Save the file.

### **Step 1: Install the Extension Package**

1.  Open SillyTavern and go to the **Extensions** menu (the stacked blocks icon).
2.  Click on the **"Install extension"** button.
3.  Paste the following URL and click **Install**:
    ```
    https://github.com/gusta01010/characters-autorefresh
    ```

### **Step 2: Activate the Backend Plugin (The Important Part!)**

The installation you just did downloaded all the necessary files. The final step is to move the backend plugin into the correct folder so SillyTavern can run it.

1.  Open your SillyTavern installation folder. Navigate to the extension's location, which depends on the choice you made during installation.

    *   **If you chose "Install just for me":**
        The path is\
        `SillyTavern/data/default-user/extensions/characters-autorefresh/`

    *   **If you chose "Install for all users":**
        The path is\
        `SillyTavern/public/scripts/extensions/third-party/characters-autorefresh/`

2.  Inside whichever of those folders you found, you will see a subfolder named `plugin`. Inside *that* is the folder you need: **`characters-autorefresh`**.

3.  **Move** this final `characters-autorefresh` folder into your main `SillyTavern/plugins` directory.

    After you move it, you should have a folder structure that looks like this:\
    `SillyTavern/plugins/characters-autorefresh/index.js`.

### **Step 3: Restart and Enable**

1.  **Completely restart SillyTavern.** (Close the black terminal window and run `start.bat` or `start.sh` again). This is required to load the new plugin.
2.  Open SillyTavern, go back to the "Extensions" menu.
3.  You can find it as "Character Auto-Refresher" in the `Manage extensions`

That's it! Your character list will now refresh automatically.
## Usage

Once installed and enabled, the extension works automatically. There is no UI to configure.

1.  Simply add, delete, or modify a character card in your `SillyTavern/data/default-user/characters` folder.
2.  The character list in the SillyTavern UI will update on its own within a few seconds.

## License

This project is licensed under the [MIT License](./LICENSE) - see the `LICENSE` file for details.

## Credits

-   Uses the [chokidar](https://github.com/paulmillr/chokidar) library for file system watching.