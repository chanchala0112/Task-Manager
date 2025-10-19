export const BASE_URL = "http://localhost:8000"

//utills/apiPaths.js
export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register", //Register a new user (Admin or Memeber)
        LOGIN: "/api/auth/login", //Authenticate user & return JWT token
        GET_PROFILE: "/api/auth/peofile", //Get logged-in user details
    },

    USERS: {
        GET_ALL_USERS: "/api/users", //Get all users admin only
        GET_USER_BY_ID: (userId) => `/api/users/${userId}`, //Get user by Id
        CREATE_USER: "/api/users", //Create a new user (Admin only)
        UPDATE_USER: (userId) => `/api/users/${userId}`, //Update user details
        DELETE_USER: (userId) => `/api/users/${userId}`, //Delete a user
    },

    TASKS: {
        GET_DASHBOARD_DATA: "/api/tasks/dashboar-data", //Get dashboard Data
        GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data", //Get user dashboard data
        GET_ALL_TASKS: "/api/tasks", //Get task by Id
        GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`, //Get task by Id
        CREATE_TASK:  "/api/tasks", // Create a new task (Admin only)
        UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`, // Update task details
        DELETE_TASK: (taskId) => `/api/tasks/${taskId}`, // Delete a task (Admin only)

        UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`, // Update task status
        UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`, // Update todolist
    },

    REPORTS: {
        EXPORT_TASKS: "/api/reports/export/tasks", //Download all tasks as an Excel/PDF report
        EXORT_USERS: "/api/reports/export/users", // Download user-task report
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image",
    },
};