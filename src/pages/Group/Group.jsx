import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import config from '../../helpers/config';
import { useParams } from 'react-router-dom'; 
import { MeteorsDesign } from '../../components/MeteorsDesign';
import { BackgroundBoxesDesign } from '../../components/BackgroundBoxesDesign';

const Group = () => {
  const { slug } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try { 
        const response = await axios.get(`${config.BASE_URL}/notes/getGroupData/${slug}`);
        setGroupData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!groupData) return <p>No data found.</p>;

  return (
    <div className='min-h-screen bg-slate-100 dark:bg-gray-950'> 
     <BackgroundBoxesDesign title = {groupData.groupName} description = {`Color: ${groupData.Color}`} />
      <div className=' grid grid-cols-4 gap-4'> 
        {groupData.notes.length === 0 ? (
          <p>No notes found for this group.</p>
        ) : ( 
          groupData.notes.map((note) => ( 
           <MeteorsDesign key={note._id} name={note.userId.name} content={note.content} createdAt={note.createdAt} />
          )) 
        )}
      </div>
    </div>
  );
};

export default Group;
