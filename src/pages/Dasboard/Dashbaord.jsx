import React, { useEffect, useState } from "react";
import UserProfile from "../../helpers/userProfile";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../helpers/config";
import toast, { Toaster } from "react-hot-toast";
import { ProfilePicture } from "../../helpers/userProfile";

const Dashboard = () => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [noteList, setNoteList] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = Cookies.get("NotesSaverToken");

    if (!token) {
      console.error("User is not authenticated");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${config.BASE_URL}/notes/createGroup`,
        {
          groupName: groupName,
          Color: selectedColor,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Group created successfully!");
        setLoading(false);
        setIsModalOpen(false);
        setGroupName("");
        setSelectedColor("");
        setGroupList((prevList) => [...prevList, response.data]);
      } else {
        toast.error("Failed to create group:");
        setLoading(false);
        console.error("Failed to create group:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating group:");
      console.error("Error creating group:", error);
      setLoading(false);
    }
  };

  const handleNoteSubmit = async (event) => {
    event.preventDefault();
    const token = Cookies.get("NotesSaverToken");

    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${config.BASE_URL}/notes/createNotes`,
        {
          GroupId: selectedGroup._id,
          content: noteContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setNoteContent(""); // Clear the textarea
        fetchNotesList();
        toast.success("Note created successfully!");
      } else {
        console.error("Failed to create note:", response.data.message);
        toast.error("Failed to create note:");
      }
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Error occurred during saving your note");
    } finally {
      setLoading(false);
    }
  };

  const fetchNotesList = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/notes/notes/${selectedGroup._id}`);
      if (response.status === 200) {
        console.log("Your notes are", response.data);
        toast.success("Notes fetched successfully!");
        setNoteList(response.data);
      }
    } catch (error) {
      toast.error("Error fetching notes");
      console.error("Error fetching notes:", error);
    }
  };
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#FFD733"];
  useEffect(() => {
    const fetchGroupList = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/notes/groups`);
        if (response.status === 200) { 
          toast.success("Group list fetched successfully!");
          setGroupList(response.data);
        }
      } catch (error) {
        toast.error("Error fetching group list");
        console.error("Error fetching group list:", error);
      }
    };

    fetchGroupList();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetchNotesList();
    }
  }, [selectedGroup]);

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-slate-400 dark:bg-gray-950">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/3 min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl text-black dark:text-white md:mt-20 my-3 sticky top-0 z-10  w-full p-4 text-center">
              Pocket Notes
            </h1>

            <div className="flex-grow overflow-y-auto space-y-2 p-3">
              {groupList.length > 0 &&
                groupList.map((group) => (
                  <UserProfile
                    key={group._id}
                    userName={group.groupName}
                    color={group.Color}
                    onClick={() => {
                      console.log("Selected group:", group);
                      setSelectedGroup(group);
                    }}
                  />
                ))}
            </div>

            <div className="sticky bottom-0 z-10  w-full p-4 flex justify-end">
              <button onClick={openModal}>
                <i className="fi fi-ss-add text-7xl text-cyan-700  cursor-pointer"></i>{" "}
              </button>
            </div>
          </div>

          <div className="w-full lg:w-2/3 flex flex-col">
          
            {selectedGroup ? (
              <div>

                <div
                  className="  mt-16  w-full right-0 p-2"
                  style={{ backgroundColor: selectedGroup.Color }}
                >
                  <div className="flex justify-between items-center space-x-4">
                    <ProfilePicture
                      name={selectedGroup.groupName}
                      color={selectedGroup.Color}
                    />
                    <h2 className="text-3xl font-bold text-black dark:text-white">
                      {selectedGroup.groupName}
                    </h2>
                    <p className="text-sm text-black dark:text-white text-center">
                      📅 <br />
                      {new Date(selectedGroup.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex-grow overflow-y-auto p-4" style={{height: '500px'}}>
                <div className="p-4">
                  {noteList.length > 0 ? (
                    noteList.map((note, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md my-2"
                      >
                        <div className="text-lg text-black dark:text-white mt-2">
                          {note.content}
                        </div>

                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex justify-end">
                          <p>
                            {new Date(note.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}{" "}
                            <strong> . </strong>
                            {new Date(note.createdAt).toLocaleTimeString(
                              "en-GB",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-600 dark:text-gray-400">
                      No notes available.
                    </div>
                  )}
                </div>
 
                </div>
                <div className="p-4 text-end z-10 relative">
  <form onSubmit={handleNoteSubmit} className="relative">
    <div className="relative">
      <textarea
        name="notesByUser"
        id="notesByUser"
        rows={4}
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        className="w-full bg-slate-500 dark:bg-slate-300 p-2 rounded-md text-black dark:text-white"
        placeholder="Enter your note here..."
      ></textarea>
      <button
        type="submit"
        className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        disabled={loading || noteContent.trim() === ''}
      >
        {loading ? "Saving..." : <><i className="fi fi-sr-location-arrow"></i></>}
      </button>
    </div>
  </form>
</div>


              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <img
                  src="https://res.cloudinary.com/ducw7orvn/image/upload/v1723408091/image-removebg-preview_1_xphrkc.png"
                  alt="Pocket Notes"
                  className="w-full "
                  loading="lazy"
                />
                <h1 className="text-5xl text-black dark:text-white text-center">
                  Pocket Notes
                </h1>
                <p className="text-black dark:text-white text-2xl text-center">
                  Send and receive messages without keeping your phone online.{" "}
                  <br />
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                </p>
                <p className="text-black dark:text-white text-center">
                  🔒 end-to-end encrypted
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <dialog
        id="CreateNewGroup"
        className={`modal ${isModalOpen ? "modal-open" : ""}`}
      >
        <div className="modal-box bg-slate-300 dark:bg-slate-900">
          <h3 className="font-bold text-lg text-black dark:text-white">
            Create New Group!
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="py-4">
              <label
                htmlFor="group-name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Group Name
              </label>
              <input
                type="text"
                id="group-name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder="Enter group name"
              />
            </div>

            <div className="py-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Choose Color
              </label>
              <div className="flex space-x-2 mt-2">
                {colors.map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                      selectedColor === color
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
            </div>

            <div className="modal-action mt-4 flex justify-between">
              <button type="button" onClick={closeModal} className="btn">
                Close
              </button>
              <button
                type="submit"
                className="btn bg-blue-500 hover:bg-blue-600 text-white"
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Dashboard;
