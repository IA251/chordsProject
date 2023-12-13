ChordScaleManager

ChordScaleManager is a web application designed to facilitate chord scale management for piano and guitar players etc. The server-side is built using .NET in C#, and the client-side is developed with React. The application leverages a SQL Server database to store user data and song details. Additionally, Spotify's API is utilized for uploading song data, a feature exclusive to administrators.
Features
Ladder Adjustment: Users can dynamically adjust the ladder, moving up and down to view and play different chord scales in real-time.
Ease of Use: The application provides an option to switch between default scale, simplifying chord scales for a more user-friendly experience.
Integration with Spotify API: Administrators can use Spotify's API to upload song data, directly to the application.
Admin Panel: Authorized users have access to an admin panel, allowing them to manage the song collection by adding, editing, and deleting songs.
Visual Aesthetics: The application includes a function that checks the dominant color in the image to enhance the visual appeal.
Clean Responses: Using a server-side mapper ensures neat  responses for appropriate readability.
Technologies Used
Server Side (.NET in C#):
.NET for building the server-side logic.
C# for the programming language.
Architecture:
The server-side project follows the 5-layer model, ensuring a structured and modular design.
Client Side (React):
React for the dynamic and interactive user interface.
Database (SQL Server):
SQL Server used to store user data, song details, and ladder adjustments.
External Libraries:
Axios for making asynchronous requests between the client and server.
Material-UI for a clean and responsive user interface.

