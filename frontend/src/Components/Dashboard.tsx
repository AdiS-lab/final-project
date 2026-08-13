import Gallery from "./Gallery";
import { useRef, useState, useEffect } from "react";
import SidebarDashboard from "./SidebarDashboard";
import { useUserSession } from "../auth/globalState";
import { useNavigate } from "react-router-dom";
import { Input, SpinnerLight } from "../ui";
import { apiGetCanvasData, apiCreateCanvas, apiDeleteCanvas, apiDeleteUser } from "../api";

function Dashboard() {
  const { userSession } = useUserSession((state) => state);
  const accessToken = userSession.accessToken;
  const [loading, setLoading] = useState<boolean>(false);
  const [signoutLoading, setSignoutLoading] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [imgArr, setImgArr] = useState([]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getCanvasData() {
      try {
        type canvasData = {
          img_url: string;
          id: string;
          name: string;
        };

        const canvasParts = await apiGetCanvasData(accessToken);
        const data = canvasParts.data.response;
        console.log("canvas data look for name " + data[0].name);
        const newArr = data.map((canvasData: canvasData) => {
          console.log("imgURL" + canvasData.img_url);
          return {
            imgUrl: canvasData.img_url,
            imgId: canvasData.id,
            imgName: canvasData.name,
          };
        });

        setImgArr(newArr);
        console.log("newArr" + newArr);
      } catch (error) {
        console.log(error);
      }
    }
    getCanvasData();
  }, []);

  function goToCanvas() {
    console.log("made it");

    if (!dialogRef.current) return;
    setName("");
    dialogRef.current.showModal();
  }

  async function handleCreate() {
    console.log(dialogRef.current);
    if (!dialogRef.current) return;
    if (name === "") return;

    try {
      console.log(name);
      setLoading(true);
      const response = await apiCreateCanvas(name, accessToken);
      const data = response.data;
      const id = data[0].id;
      console.log(id);
      if (!id) return;
      console.log(response.data);
      dialogRef.current.close(); // need to pass name prop onto canvas + props into cards
      navigate(`/canvas/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  function handleClose() {
    if (!dialogRef.current) return;
    console.log(dialogRef.current);
    dialogRef.current.close();
  }

  function handleClick(id: string) {
    navigate(`/canvas/${id}`, { replace: true });
  }

  async function deleteSession(id: string) {
    console.log("made it to delete");
    const response = await apiDeleteCanvas(id, accessToken);
    console.log(response);
    window.open("/dashboard", "_self");
  }

  function signOut() {
    setSignoutLoading(true);
    apiDeleteUser(accessToken);
    navigate("/", { replace: true });
  }

  return (
    <>
      <div className="flex flex-row w-full min-h-screen">
        <SidebarDashboard
          onClick={goToCanvas}
          signOut={signOut}
          signoutLoading={signoutLoading}
        />
        <Gallery
          imgArr={imgArr}
          handleClick={handleClick}
          deleteSession={deleteSession}
        />
      </div>
      <dialog
        ref={dialogRef}
        className="w-[360px] rounded-xl border border-[#303036] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0"
        style={{ background: "rgba(22, 22, 22, 0.92)", color: "#d0d0d0" }}
      >
        <div className="flex flex-col gap-4 p-6">
          <h1 className="text-base font-semibold">New Session</h1>
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Session name"
            className="bg-transparent placeholder-[#444]"
          />
          <div className="flex gap-3 justify-end">
            <button
              className="text-sm px-4 py-1.5 rounded-md border border-[#303036] cursor-pointer"
              onClick={handleClose}
            >
              Cancel
            </button>
            {!loading ? (
              <button
                className="text-sm px-4 py-1.5 rounded-md border border-[#303036] cursor-pointer"
                onClick={handleCreate}
              >
                Create
              </button>
            ) : (
              <div className="text-sm px-4 py-1.5 rounded-md border border-[#303036] flex items-center gap-2">
                <SpinnerLight />
                Creating
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
export default Dashboard;
