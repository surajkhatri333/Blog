// // export const Hero = () => {
// //     return (
// //         <>
// //             <div className="hero" style={{minHeight:"70vh",position:"relative",top:"20vh"}}>
// //                 <h1>Welcome to My Blog</h1>
// //                 <p>Discover insightful content and share your own stories.</p>
// //                 <button>Create Blog</button>
// //             </div>
// //         </>
// //     )
// // }

// import { Link } from 'react-router-dom';
// import '../styles/Hero.css'
// import { FaPenFancy, FaBlog, FaUsers } from 'react-icons/fa';

// export const Hero = () => {
//     return (
//         <div className="hero" style={{ minHeight: "70vh", position: "relative", top: "10vh" }}>
//             {/* Background overlay for better text visibility */}
//             <div className="hero-overlay">
//                 <h1>Welcome to My Blog</h1>
//                 <p>Discover insightful content, share your experiences, and join a community of passionate writers.</p>
//                 <div className="hero-buttons">
//                     <button className="btn create-btn"><Link to="/create">Create Blog</Link></button>
//                     <button className="btn explore-btn" onClick={()=>window.scrollTo({top:window.innerHeight * 0.6,behavior:'smooth'})}>Explore Blogs</button>
//                 </div>
//                 <div className="hero-icons">
//                     <div>
//                         <FaPenFancy size={40} />
//                         <p>Share Your Story</p>
//                     </div>
//                     <div>
//                         <FaBlog size={40} />
//                         <p>Read Latest Blogs</p>
//                     </div>
//                     <div>
//                         <FaUsers size={40} />
//                         <p>Connect with Authors</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };






import '../styles/Hero.css'
import { FaSearch  } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export const Hero = () => {
  return (
    <div className="hero">
      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-text">
          <h1>Welcome to My Blog</h1>
          <p>Discover insightful content and share your own stories...</p>

          {/* Call to Action Buttons */}
          <div className="hero-buttons">
            <button className="btn explore-btn" onClick={() => window.scrollTo({ top: window.innerHeight , behavior: 'smooth' })}>
              Explore Blogs
            </button>
            <button className="btn create-btn"><Link to="/create">Create Blog</Link></button>
          </div>
        </div>

        {/* Illustration or Hero Image */}
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJsb2clMjB3cml0aW5nfGVufDB8fDB8fHww" alt="Blogging" 
          style={{width:"60%",height:"30%"}}/>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search blogs..." />
        <button><FaSearch /></button>
      </div>

      {/* Feature Highlights */}
      <div className="features">
        <div className="feature-item">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvDbPoX-ydBqsN6-cujKfkblHjaw99a2TbsQ&s" alt="Community" />
          <h3>Engaging Community</h3>
          <p>Join a community of like-minded writers and readers.</p>
        </div>
        <div className="feature-item">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ERzZb6he48CyoiD709DOJ13-KYYYHgKM9Q&s" alt="Insight" />
          <h3>Insights & Tips</h3>
          <p>Get expert advice and tips from seasoned bloggers.</p>
        </div>
        <div className="feature-item">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RXtSwfYwp3DibUOSmwKAoJpJEfD8o6HyMQ&s" alt="Share" />
          <h3>Share Your Story</h3>
          <p>Share your experiences and connect with others.</p>
        </div>
      </div>
    </div>
  );
};

