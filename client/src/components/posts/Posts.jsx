import Post from '../post/Post';
import './posts.scss';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Posts = () => {

    // query name is 'posts'
    const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts").then((res) => {
        return res.data;
    })
  );

    console.log(data);

    return (
        <div className='posts'>
            {error ? "Something went wrong" : isLoading
             ? "loading" 
             : data.map(posts => (<Post post={posts} key={posts.id}/> ))}
        </div>
    );
};

export default Posts;
