import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const authHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// ——— Auth ———

export const apiSignup = (formValues: object) =>
  axios.post("/signup", formValues, { withCredentials: true });

export const apiLogin = (sendData: object) =>
  axios.post("/login", sendData);

export const apiGetMe = (token: string) =>
  axios.get("/auth/me", authHeader(token));

export const apiDeleteUser = (token: string) =>
  axios.delete("/deleteUser", authHeader(token));

// ——— Canvas ———

export const apiGetCanvasData = (token: string) =>
  axios.get("/canvasData", authHeader(token));

export const apiCreateCanvas = (name: string, token: string) =>
  axios.post("/createCanvas", { nameOf: name }, authHeader(token));

export const apiUpdateCanvas = (id: string, publicUrl: string) =>
  axios.put(`/canvas/${id}`, { publicUrl }, { withCredentials: true });

export const apiUploadBlob = (id: string, formData: FormData, token: string) =>
  axios.post(`/uploadBlob/${id}`, formData, authHeader(token));

export const apiDeleteCanvas = (id: string, token: string) =>
  axios.delete(`/deleteCanvas/${id}`, authHeader(token));
