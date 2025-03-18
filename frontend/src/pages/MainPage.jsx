import React, { useState, useEffect } from 'react';

const MainPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data.data);
      console.log(data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className='bg-black min-h-screen p-6 flex flex-wrap justify-center gap-6'>
      {posts.length > 0 ? (
        posts.map((post) => (
          <img
            key={post._id}
            src={"http://localhost:3000" + post.imageURL}
            alt=""
            className='w-64 h-64 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105'
          />
        ))
      ) : (
        <div className='text-white text-center w-full'>No posts available</div>
      )}
    </div>
  );
};

export default MainPage;
