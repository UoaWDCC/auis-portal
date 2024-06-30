# Deployed Link: TBD

# How to run Locally:
We need to install a few programs before we can get started. Here are the links to all the programs required:
- [Node JS](https://nodejs.org/en/) - click yes if it asks you to install 
- [Docker](https://docs.docker.com/get-docker/) - To run the containerised database
- [Git](https://git-scm.com/downloads)
- [VS Code](https://code.visualstudio.com/) - recommended IDE
- If you have PGAdmin installed, it can cause problems, troubleshooting information below

1. Install all required programs
2. Open a terminal and navigate to where you would like to save the files, using the command `cd "{directory where you want to save the files}"`
3. Clone the repository using `git clone https://github.com/UoaWDCC/auis-portal.git`
4. Navigate to correct directory by typing `cd auis-portal`
5. Create a file with the name exactly of ".env" within the API folder and copy the contents from the #resources channel on the discord server. DO NOT SHARE ANY OF THE INFORMATION ON THIS FILE PUBLICALLY
6. Create a file with the name exactly of ".env" within the web folder and copy the contents from the #resources channel on the discord server. DO NOT SHARE ANY OF THE INFORMATION ON THIS FILE PUBLICALLY
7. Create a file with the name exactly of ".env" within the strapi folder and copy the contents from the #resources channel on the discord server. DO NOT SHARE ANY OF THE INFORMATION ON THIS FILE PUBLICALLY
8. Open Docker
9. In Terminal run the following commands `yarn`, `yarn run dev` this will run the database, backend, content managment system, and frontend
10. For the Strapi CMS Create an account, this is local, so don't need to worry too much. REMEBER THE EMAIL AND PASSWORD OR YOU WILL LOOSE ACCESS TO CMS LOCALLY. Next time you run it, you can use it to login locally. You can now add data and remove data from the CMS, add types and make other modifications
11. To add information to the backend/Strapi, click "Settings" on the sidebar, click "Roles" under "User & Permission Plugin" under "Authenticated" click the edit button and enable the permission required. This allows the admin user that you are logged in as, to make modifications to those certain areas. This needs to be done everytime a new account is created or a new field is added - this is mostly relevant to the backend team

**Troubleshooting**

If you get an error along the lines of "Incorrect Password when connecting to the database". It is caused by the port 5432 being in use. Either uninstall PGAdmin, and restart to fix that. Or change the port mapping for your computer. Within the database folder, the docker-compose.yaml file, change line 12 to say `- 5435:5432` and then go through all '.env' files and update anywhere that says 'PORT:5432' to 'PORT:5435'. 

On VS Code install the extensions: TailwindCSS Intellisense, and Biome

# Credits:
- Harsheel
- Emma
- Karmveer
- Nick
- Devesh
- Chalisa 
- Tarun
- Diya
- Gury
- Sai Kiran
- Naren
