import axios from "axios";

import { CONFIG } from "src/global-config";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || "Something went wrong!")
);

const axiosAuth = axios.create({ baseURL: "https://servicekamu.pviser.com" });

axiosAuth.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || "Something went wrong!")
);

// ----------------------------------------------------------------------

export { axiosAuth };
export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosAuth.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    tokenRefresh: "/auth/token-refresh",
    me: "/users/me",
    signIn: "/auth/login",
    signUp: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    verifyCode: "/auth/verify-code",
  },
  mail: { list: "/api/mail/list", details: "/api/mail/details", labels: "/api/mail/labels" },
  post: {
    list: "/api/post/list",
    details: "/api/post/details",
    latest: "/api/post/latest",
    search: "/api/post/search",
  },
  product: {
    list: "/api/product/list",
    details: "/api/product/details",
    search: "/api/product/search",
  },
  chat: "/api/chat",
  kanban: "/api/kanban",
  calendar: "/api/calendar",

  ilan: {
    categories: "/categories",
    categoryFeatures: "/categories/{id}/features",
    createAdFeature: "/ad-features/create",
    getAdFeatures: "/ad-features/{advertId}",
    createAdvert: "/advert",
    listAdverts: "/advert/list",
    addImages: "/ad-images",
    all: "/advert/all",
    getImages: "/ad-images",
    getAdvertDetails: "/advert/{advertId}",
  },
  projects: {
    root: "/projects",
    id: "/projects/:id",
    backlog: "/projects/:id/backlog",
    addAssigners: "/projects/:id/add-assigners",
    removeAssigners: "/projects/:id/remove-assigners",
  },

  surveys: {
    root: "/surveys",
    id: "/surveys/:id",
    create: "/surveys",
    questions: {
      root: "/surveys/:id/questions",
      id: "/surveys/:id/questions/:question_id",
    },
    responses: {
      root: "/surveys/:id/responses",
      id: "/surveys/:id/responses/:response_id",
    },
  },
  boards: {
    root: "/boards",
    id: "/boards/:id",
    columns: {
      root: "/boards/:id/columns",
      id: "/boards/:id/columns/:id",
    },
    tasks: {
      root: "/boards/:id/tasks",
      id: "/boards/:id/tasks/:taskId",
    },
  },
  tasks: {
    root: "/tasks",
    id: "/tasks/:id",
    addAttachments: "/tasks/:id/add-attachments",
    removeAttachments: "/tasks/:id/remove-attachments",
    addAssigners: "/tasks/:id/add-assigners",
    removeAssigners: "/tasks/:id/remove-assigners",
    comments: {
      root: "/tasks/:id/comments",
      id: "/tasks/:id/comments/:commentId",
    },
  },
  notification: {
    root: "/notification",
    create: "/notification",
    list: "/notification",
    updateStatus: "/notification/update-status",
    delete: "/notification",
  },
  notificationTypes: {
    root: "/notification-types",
    id: "/notification-types/:id",
  },
  notificationTriggerTypes: {
    root: "/notification-trigger-types",
    id: "/notification-trigger-types/:id",
  },
  users: {
    userDetails: "/users/{id}",
  },

};
