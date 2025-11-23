import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BlogCard = ({ blog }) => {
    return (
        <div className=" bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 max-w-sm mx-auto">
            {/* Image Section */}
            <div className="h-60 overflow-hidden rounded-t-2xl flex items-center justify-center">
                <img
                    src={blog.image}
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
                    className="px-4 py-2 text-sm font-medium  bg-blue-500 text-white rounded-lg"
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
