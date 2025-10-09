import React, { useEffect, useState } from 'react'
import "./posts.css"
import Post from '../post/Post'
import { IoSearchSharp } from "react-icons/io5";

const Posts = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchQuery, posts]);
  if (filteredPosts.length < 1) {
    return (
      <div className='postt'>
        <div className='searchbar'>
          <input
            className='search'
            type="text"
            placeholder="Search posts by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IoSearchSharp className='binaculer' />
        </div>
        <div className='posts'>
          <h2>Sorry, Nothing found</h2>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className='postt'>
        <div className='searchbar'>
          <input
            className='search'
            type="text"
            placeholder="Search...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IoSearchSharp className='binaculer' />
        </div>
        <div className='posts'>
          {filteredPosts && filteredPosts.map(p => (
            <Post key={p._id} post={p} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Posts
