**🍰 Recipe for Project Success: Clone & Bake Instructions**

**Step 1: Clone the Bakery’s Secret Recipe Book**

1.Open VS Code and pop open the **View > Terminal** (where the baking magic happens).

2.In the terminal, navigate to your kitchen counter—aka the folder where you want to store this delicious project.

3.Clone our sacred recipe book by running the following command:

•git clone https://github.com/benhagg/GroupProjectIS403.git

4.When your cloning timer dings, open the project:

•Go to **File > Open Folder…** and select the GroupProjectIS403 folder. Voilà, you’re in the bakery!

**Step 2: Preheat Your Oven**

•Confirm you’ve got the recipe book connection right by typing:

•git remote -v

•If you see origin https://github.com/benhagg/GroupProjectIS403.git, you’re all set! Your oven is preheated.

**Step 3: Gather Fresh Ingredients (Pull Updates)**

1.Use:

•git pull origin master

•**Note**: If we ever bake from a different branch, just replace master with that branch’s name. (Don’t worry; you’ll smell the difference.)

**Step 4: Whip Up New Ingredients and Share Your Treats**

Got some delicious code to add? Here’s how to send your creations back to the bakery!

1.**Stage Your Ingredients**:

•In the terminal, type: git add .

•This gets everything you’ve prepared ready for baking.

2.**Label Your Masterpiece**:

•Give a quick description of your changes:

•git commit -m "Brief description of what you changed"

3.**Send Your Masterpiece to the Bakery**:

•Share your creations with the whole team by typing:

•git push origin master

**Step 5: Check the Oven Before You Start Baking**

•Before whipping up new changes each day, run git pull origin master to make sure you’re working with the freshest ingredients. It’s the secret to avoiding recipe conflicts!

**The Secret Ingredient 🍪**

Right after you clone the recipe, make sure to install the bakery essentials by running: