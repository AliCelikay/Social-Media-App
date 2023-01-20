import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import './comments.scss';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from "moment";

const Comments = ({ postId }) => {
    const [ desc, setDescription] = useState("");
    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["comments"], () =>
        makeRequest.get("/comments?postId=" + postId).then((res) => {
            return res.data;
        })
    );

        // to refetch data
        const queryClient = useQueryClient();

        // using mutation to make api request
        const mutation = useMutation((newComment) => {
            // end point is /posts and we will be sending desc & img
            return makeRequest.post("/comments", newComment);
        },
            {
                onSuccess: () => {
                    // invalidate and refetch
                    queryClient.invalidateQueries(["comments"]);
                },
            }
        );
    
        const handleClick = async (e) => {
            e.preventDefault();
            mutation.mutate({ desc, postId });
            setDescription("");
        };

    return (
        <div className='comments'>
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input 
                    type="text" 
                    placeholder='Write a comment' 
                    onChange={(e) => setDescription(e.target.value)} 
                    value={desc}
                />
                <button onClick={handleClick}>Send</button>
            </div>
            {isLoading ? "Loading..." : data.map((comment, index) => (
                <div className="comment" key={index}>
                    <img src={comment.profilePic} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className='date'>{moment(comment.createdAt).fromNow()}</span>
                </div>
            ))}
        </div>
    )
}

export default Comments
