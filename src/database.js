import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('mySQliteDB.db');

export const initializeDatabase = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);',
        [],
        () => {
          console.log('Groups table created or already exists.');
        },
        (txObj, error) => {
          console.error('Error creating groups table: ', error);
          return true; // Abort transaction in case of error
        }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          title TEXT NOT NULL, 
          description TEXT NOT NULL, 
          completed INTEGER DEFAULT 0, 
          group_id INTEGER NOT NULL,
          FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE CASCADE
        );`,
        [],
        () => {
          console.log('Tasks table created or already exists.');
        },
        (txObj, error) => {
          console.error('Error creating tasks table: ', error);
          return true; // Abort transaction in case of error
        }
      );
    },
    (error) => {
      console.error('Transaction error while initializing the database: ', error);
    },
    () => {
      console.log('Database initialization transaction completed successfully.');
    }
  );
};

export const getGroups = (callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql('SELECT * FROM groups', [], (_, { rows }) => {
        callback(rows._array);
      });
    },
    (error) => {
      console.error('Error fetching groups: ', error);
    }
  );
};

export const addGroup = (name, callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'INSERT INTO groups (name) VALUES (?)',
        [name],
        () => {
          callback();
        },
        (txObj, error) => {
          console.error('Error adding group: ', error);
          return true; // Abort transaction
        }
      );
    },
    (error) => {
      console.error('Transaction error while adding group: ', error);
    }
  );
};

export const getTasksByGroup = (groupId, callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql('SELECT * FROM tasks WHERE group_id = ?', [groupId], (_, { rows }) => {
        callback(rows._array);
      });
    },
    (error) => {
      console.error('Error fetching tasks: ', error);
    }
  );
};

export const addTask = (title, description, groupId, callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'INSERT INTO tasks (title, description, completed, group_id) VALUES (?, ?, ?, ?)',
        [title, description, 0, groupId], // `false` should be passed as `0`
        () => {
          callback();
        },
        (txObj, error) => {
          console.error('Error adding task: ', error);
          return true; // Abort transaction
        }
      );
    },
    (error) => {
      console.error('Transaction error while adding task: ', error);
    }
  );
};

export const toggleTaskStatus = (taskId, completed, callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'UPDATE tasks SET completed = ? WHERE id = ?;',
        [completed ? 1 : 0, taskId],
        () => {
          callback();
        },
        (txObj, error) => {
          console.error('Error updating task status: ', error);
          return true; // Abort transaction
        }
      );
    },
    (error) => {
      console.error('Transaction error while updating task status: ', error);
    }
  );
};

export const deleteTask = (taskId, callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'DELETE FROM tasks WHERE id = ?;',
        [taskId],
        () => {
          callback();
        },
        (txObj, error) => {
          console.error('Error deleting task: ', error);
          return true; // Abort transaction
        }
      );
    },
    (error) => {
      console.error('Transaction error while deleting task: ', error);
    }
  );
};
