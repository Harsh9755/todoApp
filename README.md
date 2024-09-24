# TodoReactExpoSQlite
This is a simple TODO application built with React Native that allows users to create, view, and manage task groups and individual tasks. The app uses SQLite for local storage of groups and tasks, enabling offline functionality. It also allows users to delete tasks, toggle task completion status, and edit task details.

Features:-

  Group Management: Create, view, and delete task groups.
  
  Task Management: Add tasks within groups, mark them as complete/incomplete, edit them, and delete them.
  
  SQLite Integration: Uses SQLite for local data persistence.
  

  How to Run the Project:-
  
  Clone the repository: git clone https://github.com/Harsh9755/todoApp.git
  
  Navigate to the project directory:cd todoApp
  
  Install dependencies: npm install
  
   Run the app: npx expo start ( scan QR code on Expo Go)
   

   Dependencies:-
Make sure to install the following dependencies:

React Native: npm install react-native

SQLite: npm install react-native-sqlite-storage

React Navigation: npm install @react-navigation/native @react-navigation/stack


Home Screen

The home screen displays the list of task groups. Each group can be deleted or accessed to view the tasks within.

![groups](https://github.com/user-attachments/assets/e48d2284-e2f4-4414-a4a3-dfc76c46c894)

Task List Screen

The task list screen shows the tasks within a selected group. Tasks can be marked as complete, incomplete, or deleted.

![tasks](https://github.com/user-attachments/assets/527a61bf-69e1-4ab8-a757-4320a212814b)


