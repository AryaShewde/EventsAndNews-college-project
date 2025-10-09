import React, { useEffect, useState } from 'react'
import "./home.css"
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import axios from "axios"
import { useLocation } from 'react-router-dom'
import Loading from '../loading/Loading.jsx'
import Footer from '../../components/footer/Footer.jsx'

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [lazyLoading, setLazyLoading] = useState(false);
  const postsPerLoad = 3;  

  useEffect(() => {
    const fetchPosts = async () => {
      // const res = await fetch(`https://eventsandnewsapi.onrender.com/api/posts`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
      // await res.json();
      const res = await axios.get("https://ean-be-updated.vercel.app/api/posts" + search)
      setPosts(res.data)
      setVisiblePosts(res.data.slice(0, postsPerLoad));
      setLoading(false);
    }
    fetchPosts()
  }, [search])

  const loadMorePosts = () => {
    if (!lazyLoading && visiblePosts.length < posts.length) {
      setLazyLoading(true);

      const currentLength = visiblePosts.length;
      const morePosts = posts.slice(currentLength, currentLength + postsPerLoad);

      setTimeout(() => {
        setVisiblePosts(prevVisiblePosts => [...prevVisiblePosts, ...morePosts]);
        setLazyLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
        loadMorePosts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [visiblePosts, posts, lazyLoading]);

  return (
    <>
      <Header />
      <div className='home'>
        {loading ? (
          <Loading />
        ) : (
          <div className='allposts'>
            <Posts posts={visiblePosts} />
            {lazyLoading && <p className='Lazyloading'>Loading ...</p>}
          </div>
        )}
      </div>
      <Footer/>
    </>
  )
}

export default Home
