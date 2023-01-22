import { useState } from 'react';
import { makeRequest } from '../../axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import './update.scss';

const Update = ({ setOpenUpdate, user }) => {
  const [cover, seCover] = useState(null)
  const [profile, seProfile] = useState(null)
  const [texts, setTexts] = useState({
    name: "",
    city: "",
    website: "",
  })

  //code to upload file
  const upload = async (file) => {
    try {
      // need FormData to send to api
      const formData = new FormData();
      formData.append("file", file)
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }))
  }

  // to refetch data
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      // only updating profile page with JWT no need for userId
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl = user.coverPic;
    let profileUrl = user.profilePic;
    
    // if file exists we will await for the new file and will return new url, if no new url we will use previous pictures
    coverUrl = cover && await upload(cover);
    profileUrl = profile && await upload(profile);

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
  };

  return (
    <div className='update'>
      Update
      <form>
        <input type="file" />
        <input type="file" />
        <input type="text" name="name" onChange={handleChange} />
        <input type="text" name="city" onChange={handleChange} />
        <input type="text" name="website" onChange={handleChange} />
        <button onClick={handleClick}>Update</button>
      </form>
      <button onClick={() => setOpenUpdate(false)}>X</button>
    </div>
  )
}

export default Update
