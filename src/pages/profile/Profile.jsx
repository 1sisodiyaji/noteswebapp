import React, { useEffect, useState } from 'react'
import getIdFromToken from '../../helpers/GetIdFromToken';
import { SparklesDesign } from '../../components/SparklesDesign';
import axios from 'axios';
import config from '../../helpers/config';
import Cookies from 'js-cookie'; 
import toast, { Toaster } from "react-hot-toast";
import { MeteorsDesign } from '../../components/MeteorsDesign';
const Profile = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [updatedNotesData, SetUpdatedNotesData] = useState(""); // Individual note update data

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getIdFromToken();
      if (data) {
        setUser(data);
        console.log(data);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchNotesData = async () => {
      try {
        const token = Cookies.get("NotesSaverToken");
        const response = await axios.post(
          `${config.BASE_URL}/notes/getNotesByAuthor`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && Array.isArray(response.data)) {
          setNotes(response.data);
          toast.success("You have successfully posted some notes!");
        } else if (response.status === 404) {
          toast.error("You have not posted any notes.");
        } else {
          toast.error("Failed to fetch notes");
        }
      } catch (error) {
        toast.error("An error occurred while fetching notes.");
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    if (user) {
      fetchNotesData();
    }
  }, [user]);

  const handleNoteChange = (newContent) => {
    SetUpdatedNotesData(newContent);
  };

  const handleDeleteNotes = async (id) => {
    const token = Cookies.get("NotesSaverToken");
    const response = await axios.delete(
      `${config.BASE_URL}/notes/deleteNotes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success("Note deleted successfully!");
      setNotes(notes.filter((note) => note._id !== id));
    } else {
      toast.error("Failed to delete note.");
    }
  };

  const handleUpdateNotes = async (id) => {
    const token = Cookies.get("NotesSaverToken");
    const response = await axios.put(
      `${config.BASE_URL}/notes/updateNotes/${id}`,
      { content: updatedNotesData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success("Note updated successfully!"); 
      setNotes(notes.map(note => note._id === id ? { ...note, content: updatedNotesData } : note));
    } else {
      toast.error("Failed to update note.");
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-slate-100 dark:bg-gray-950 space-y-12 pb-12">
        <SparklesDesign title={`${user && user.name}`} />

        <h2 className="text-5xl text-black dark:text-white text-center">
          My Notes
        </h2>
        <div className="grid md:grid-cols-4 gap-4 p-1">
          {loading ? (
            <p>Loading notes...</p>
          ) : notes.length === 0 ? (
            <p>No notes found for this user.</p>
          ) : (
            notes.map((note) => (
              <div key={note._id}>
                <MeteorsDesign
                  name={note.userId.name}
                  content={note.content}
                  createdAt={note.createdAt}
                />
                <div className="flex justify-between">
                  <div
                    className="btn btn-sm bg-warning text-white"
                    onClick={() => {
                      SetUpdatedNotesData(note.content); // Initialize state with note content
                      document.getElementById(`${note._id}/a`).showModal();
                    }}
                  >
                    Edit <i className="fi fi-rr-pen-square"></i>
                    <dialog id={`${note._id}/a`} className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Update Note !!!</h3>

                        <textarea
                          name="updateModelData"
                          id="updateModelData"
                          value={updatedNotesData} // Bind to the state
                          rows={10}
                          onChange={(e) => handleNoteChange(e.target.value)}
                          className="w-full"
                        ></textarea>

                        <div className="modal-action">
                          <form method="dialog" className="flex justify-between">
                            <button className="btn">Close</button>
                            <button
                              type="button"
                              className="btn bg-orange-700 text-white"
                              onClick={() => handleUpdateNotes(note._id)}
                            >
                              Update <i className="fi fi-rr-pen-square"></i>
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>

                  <div
                    className="btn btn-sm bg-red-700 text-white"
                    onClick={() =>
                      document.getElementById(`${note._id}`).showModal()
                    }
                  >
                    Delete <i className="fi fi-sr-trash"></i>
                    <dialog id={`${note._id}`} className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">
                          Are you sure you want to Delete Note !!!
                        </h3>
                        <div className="modal-action">
                          <form
                            method="dialog"
                            className="flex justify-between"
                          >
                            <button className="btn">Close</button>
                            <button
                              type="button"
                              className="btn bg-red-700 text-white"
                              onClick={() => handleDeleteNotes(note._id)}
                            >
                              Delete <i className="fi fi-sr-trash"></i>{" "}
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
         
      </div>
    </>
  );
};

export default Profile;
