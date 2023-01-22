import { useState } from 'react';
import { makeRequest } from '../../axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import './update.scss';

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null)
  const [profile, setProfile] = useState(null)
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
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
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div className='update'>
      Update
      <form>
        <input type="file" onChange={e=> setCover(e.target.files[0])}/>
        <input type="file" onChange={e=> setProfile(e.target.files[0])}/>
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
