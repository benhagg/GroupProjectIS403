# Instructions for Accessing and Using the GitHub Repository in VS Code

### Step 1: Clone the Repository
1. Open VS Code and go to **View > Terminal** to open the integrated terminal.
2. In the terminal, navigate to the folder where you want to store the project.
3. Clone the Repository by running the following command (this creates a copy of the repo on your computer):
   - `git clone https://github.com/benhagg/GroupProjectIS403.git`
4. Once cloning is complete, open the project in VS Code:
   - Go to **File > Open Folder...** and select the `GroupProjectIS403` folder.

### Step 2: Confirm the Repository Connection
- Confirm that the connection to GitHub is set up by typing this command in the terminal:
   - `git remote -v`
- You should see lines that include `origin https://github.com/benhagg/GroupProjectIS403.git`.

### Step 3: Pulling Updates from GitHub
To keep your local copy up-to-date with changes others make:
1. In the terminal, use:
   - `git pull origin master`
   - **Note**: `master` is the name of the master branch. If we use a different branch, replace `master` with that branch name.

### Step 4: Making Changes and Pushing to GitHub
When you make changes, follow these steps to send them to GitHub:

1. **Stage Your Changes**:
   - In the terminal, type: `git add .`
   - This stages all changes in your project folder.

2. **Commit Your Changes**:
   - Type a message describing your changes:
     - `git commit -m "Brief description of what you changed"`

3. **Push Your Changes to GitHub**:
   - Send your commits to the repository on GitHub by typing:
     - `git push origin master`

### Step 5: Pull Before Making New Changes
- Before making new changes each day, run `git pull origin master` to make sure you’re working with the latest version from GitHub. This helps prevent conflicts.
