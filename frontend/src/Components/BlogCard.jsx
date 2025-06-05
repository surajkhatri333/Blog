// import React from 'react'
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

// const BlogCard = ({blog}) => {
//     return (

//                     <div
//                         key={blog._id}
//                         className="max-w-2xl bg-white border border-black rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-30"
//                     >
//                         <div className="h-48 w-full overflow-hidden">
//                             <img
//                                 src={`${import.meta.env.VITE_APP_REQUEST_API}/${blog.image}`}
//                                 alt={blog.title}
//                                 className="object-contain w-full h-full"
//                             />
//                         </div>
//                         <div className="p-4 flex-grow">
//                             <h3 className="text-xl font-semibold mb-2 text-gray-800">Title: {blog.title}</h3>
//                             <p className="text-gray-600">Short Description: {blog.short_headline}</p>
//                         </div>
//                         <div className="p-4 border-t flex justify-end">
//                             <Link
//                                 to={`/show/${blog._id}`}
//                                 className="inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//                             >
//                                 View
//                             </Link>
//                         </div>
//                     </div>
//     );
// }

// BlogCard.propTypes ={
//     blog : PropTypes.object.isRequired
// }

// export default 



import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BlogCard = ({ blog }) => {
    return (
        <div className=" bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 max-w-sm mx-auto">
            {/* Image Section */}
            <div className="h-60 overflow-hidden rounded-t-2xl flex items-center justify-center">
                <img
                    src={`${import.meta.env.VITE_APP_REQUEST_API}/${blog.image}`}
                    alt={blog.title}
                    className="w-60 h-60 object-cover hover:scale-80 transition-transform duration-300"
                />
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
                    {blog.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                    {blog.short_headline}
                </p>
            </div>

            {/* Footer Button */}
            <div className="px-5 pb-4 flex justify-end">
                <Link
                    to={`/show/${blog._id}`}
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition"
                >
                    View Blog
                </Link>
            </div>
        </div>
    );
};

BlogCard.propTypes = {
    blog: PropTypes.object.isRequired,
};

export default BlogCard;
