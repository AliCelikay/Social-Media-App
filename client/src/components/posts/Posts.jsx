import Post from '../post/Post';
import './posts.scss';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Posts = ({ userId }) => {

    // query name is 'posts'
    const { isLoading, error, data } = useQuery(["posts"], () =>
        makeRequest.get("/posts?userId=" + userId).then((res) => {
            return res.data;
        })
    );

    return (
        <div className='posts' >
            {error ? "Something went wrong" : isLoading
                ? "Loading..."
                : data.map(posts => (<Post post={posts} key={posts.id} />))}
        </div>
    );
};

export default Posts;
