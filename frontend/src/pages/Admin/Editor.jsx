import React from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import useAuthStore from '../../store/useAuthStore';
import { FaGithub, FaLinkedin, FaTwitter, FaUpload } from 'react-icons/fa';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { FaCode, FaPalette, FaMobileAlt, FaServer } from 'react-icons/fa';

const Editor = () => {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = React.useState('Personal Detail');

    const tabs = ['Personal Detail', 'About', 'About Card'];

    // Personal Detail State
    const [personalData, setPersonalData] = React.useState({
        profileImage: null,
        tag: '',
        email: '',
        birthday: '',
        location: '',
        github: '',
        linkedin: '',
        twitter: ''
    });

    const [imagePreview, setImagePreview] = React.useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonalData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPersonalData(prev => ({ ...prev, profileImage: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // About Tab State
    const [aboutData, setAboutData] = React.useState({
        description: '',
    });

    const handleAboutChange = (content) => {
        setAboutData(prev => ({ ...prev, description: content }));
    };

    const handleAboutUpload = () => {
        if (!aboutData.description || aboutData.description === '<p><br></p>') {
            toast.error('Please enter a description');
            return;
        }
        // Simulate API call
        console.log('Uploading About Data:', aboutData);
        toast.success('About details updated successfully!');
    };

    // About Card State
    const [aboutCardData, setAboutCardData] = React.useState({
        icon: 'code',
        title: '',
        description: ''
    });

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setAboutCardData(prev => ({ ...prev, [name]: value }));
    };

    const handleCardUpload = () => {
        if (!aboutCardData.title || !aboutCardData.description) {
            toast.error('Please fill in all card details');
            return;
        }
        // Simulate API call
        console.log('Uploading Card Data:', aboutCardData);
        toast.success('Card added successfully!');
        setAboutCardData({ icon: 'code', title: '', description: '' }); // Reset
    };

    const getIconComponent = (iconName) => {
        switch (iconName) {
            case 'code': return <FaCode className="w-6 h-6" />;
            case 'design': return <FaPalette className="w-6 h-6" />;
            case 'mobile': return <FaMobileAlt className="w-6 h-6" />;
            case 'server': return <FaServer className="w-6 h-6" />;
            default: return <FaCode className="w-6 h-6" />;
        }
    };

    // Check if all fields are filled (not null and not empty string)
    const isFormValid = Object.values(personalData).every(value => value !== null && value !== '');

    const handleUpload = () => {
        alert('Data ready for upload: ' + JSON.stringify({ ...personalData, profileImage: personalData.profileImage?.name }));
        // API call would go here
    };

    // Custom Toolbar for Quill
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            ['clean']
        ],
    };

    return (
        <div className="flex min-h-screen bg-smoky-black text-white font-sans">
            <AdminSidebar />

            {/* Inject Custom Styles for Dark Mode Quill */}
            <style>{`
                .ql-toolbar {
                    background-color: #353839; /* onyx */
                    border-color: #4b5563 !important;
                    border-top-left-radius: 0.75rem;
                    border-top-right-radius: 0.75rem;
                }
                .ql-container {
                    background-color: #1e1e1f; /* eerie-black */
                    border-color: #4b5563 !important;
                    border-bottom-left-radius: 0.75rem;
                    border-bottom-right-radius: 0.75rem;
                    color: #d1d5db; /* gray-300 */
                    font-size: 1rem;
                }
                .ql-stroke {
                    stroke: #d1d5db !important;
                }
                .ql-fill {
                    fill: #d1d5db !important;
                }
                .ql-picker {
                    color: #d1d5db !important;
                }
                .ql-editor {
                    min-height: 300px;
                }
            `}</style>

            <div className="flex-1 flex flex-col min-w-0 md:ml-0">
                <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full max-w-[1600px] mx-auto">
                    <header className="mb-8">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-yellow to-vegas-gold">
                            Content Editor
                        </h1>
                    </header>
                    <div className="flex flex-col gap-6">
                        {/* Top Right Horizontal Tabs */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap justify-end gap-3"
                        >
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2 rounded-full font-medium transition-all duration-200 border ${activeTab === tab
                                        ? 'bg-orange-yellow text-eerie-black border-orange-yellow shadow-lg shadow-orange-yellow/20'
                                        : 'bg-onyx hover:bg-jet text-vegas-gold border-gray-800'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </motion.div>

                        {/* Main Editor Area */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex-1 bg-eerie-black p-6 rounded-2xl border border-onyx min-h-[500px] w-full"
                        >
                            {activeTab === 'Personal Detail' ? (
                                <div className="grid lg:grid-cols-2 gap-8">
                                    {/* Form Section */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-orange-yellow border-b border-onyx pb-2">Edit Details</h3>

                                        {/* Image Upload */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-400">Profile Image</label>
                                            <div className="relative border-2 border-dashed border-gray-700 bg-onyx rounded-xl p-8 text-center hover:border-orange-yellow transition-colors group">
                                                <input
                                                    type="file"
                                                    onChange={handleImageChange}
                                                    accept="image/*"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <div className="p-3 bg-jet rounded-full group-hover:bg-gray-800 transition-colors">
                                                        <FaUpload className="w-6 h-6 text-gray-400 group-hover:text-orange-yellow" />
                                                    </div>
                                                    <p className="text-sm text-gray-400">Drop your image here or click to browse</p>
                                                    {personalData.profileImage && (
                                                        <p className="text-xs text-orange-yellow mt-1">Selected: {personalData.profileImage.name}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-400">Tag (e.g. Web Developer)</label>
                                                <input
                                                    type="text"
                                                    name="tag"
                                                    value={personalData.tag}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-onyx border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-yellow focus:border-orange-yellow outline-none text-white placeholder-gray-600"
                                                    placeholder="Role or Tagline"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-400">Birthday</label>
                                                <input
                                                    type="date"
                                                    name="birthday"
                                                    value={personalData.birthday}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-onyx border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-yellow focus:border-orange-yellow outline-none text-white placeholder-gray-600"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-400">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={personalData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-onyx border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-yellow focus:border-orange-yellow outline-none text-white placeholder-gray-600"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-400">Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={personalData.location}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-onyx border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-yellow focus:border-orange-yellow outline-none text-white placeholder-gray-600"
                                                placeholder="City, Country"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-400">Social Links</label>
                                            <div className="space-y-3">
                                                <div className="relative">
                                                    <FaGithub className="absolute left-4 top-3.5 text-gray-500" />
                                                    <input
                                                        type="url"
                                                        name="github"
                                                        value={personalData.github}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-12 pr-4 py-3 bg-onyx border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-yellow focus:border-orange-yellow outline-none text-white placeholder-gray-600"
                                                        placeholder="GitHub URL"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <FaLinkedin className="absolute left-4 top-3.5 text-gray-500" />
                                                    <input
                                                        type="url"
                                                        name="linkedin"
                                                        value={personalData.linkedin}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-12 pr-4 py-3 bg-onyx border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-yellow focus:border-orange-yellow outline-none text-white placeholder-gray-600"
                                                        placeholder="LinkedIn URL"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <FaTwitter className="absolute left-4 top-3.5 text-gray-500" />
                                                    <input
                                                        type="url"
                                                        name="twitter"
                                                        value={personalData.twitter}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-12 pr-4 py-3 bg-onyx border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-yellow focus:border-orange-yellow outline-none text-white placeholder-gray-600"
                                                        placeholder="Twitter URL"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                onClick={handleUpload}
                                                disabled={!isFormValid}
                                                className={`w-full py-3 px-6 rounded-xl font-bold text-lg shadow-lg transition-all transform ${isFormValid
                                                    ? 'bg-gradient-to-r from-orange-yellow to-vegas-gold text-jet hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                                                    : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
                                                    }`}
                                            >
                                                Upload Details
                                            </button>
                                        </div>
                                    </div>

                                    {/* Preview Section */}
                                    <div className="bg-onyx/30 rounded-2xl p-6 h-fit sticky top-6 border border-gray-800">
                                        <h3 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-2">Live Preview</h3>

                                        <div className="bg-eerie-black rounded-xl p-6 border border-gray-800 shadow-xl max-w-sm mx-auto transform transition-all hover:scale-105 duration-300">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-32 h-32 rounded-3xl overflow-hidden mb-6 shadow-2xl ring-4 ring-onyx bg-jet relative group">
                                                    {imagePreview ? (
                                                        <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-600 bg-gray-900/50">
                                                            <span className="text-xs">No Image</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <h4 className="text-2xl font-bold text-white mb-1">{user?.name || 'Your Name'}</h4>
                                                <span className="px-3 py-1 bg-onyx text-orange-yellow text-xs rounded-full font-medium mb-4 inline-block">
                                                    {personalData.tag || 'Web Developer'}
                                                </span>

                                                <div className="w-full h-px bg-onyx mb-4"></div>

                                                <div className="space-y-3 w-full text-left text-sm text-gray-300">
                                                    <div className="flex items-center gap-3 bg-onyx/50 p-2 rounded-lg">
                                                        <span className="text-vegas-gold w-5 icon-placeholder">📧</span>
                                                        <span className="truncate">{personalData.email || 'email@example.com'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 bg-onyx/50 p-2 rounded-lg">
                                                        <span className="text-vegas-gold w-5 icon-placeholder">📍</span>
                                                        <span className="truncate">{personalData.location || 'Location, Country'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 bg-onyx/50 p-2 rounded-lg">
                                                        <span className="text-vegas-gold w-5 icon-placeholder">🎂</span>
                                                        <span className="truncate">{personalData.birthday || 'YYYY-MM-DD'}</span>
                                                    </div>
                                                </div>

                                                <div className="flex justify-center gap-4 mt-6">
                                                    {[
                                                        { link: personalData.github, icon: <FaGithub /> },
                                                        { link: personalData.linkedin, icon: <FaLinkedin /> },
                                                        { link: personalData.twitter, icon: <FaTwitter /> }
                                                    ].map((item, i) => (
                                                        <div key={i} className={`p-3 rounded-xl transition-all ${item.link ? 'bg-jet text-orange-yellow hover:bg-orange-yellow hover:text-jet shadow-lg cursor-pointer' : 'bg-jet/50 text-gray-600'}`}>
                                                            {item.icon}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : activeTab === 'About' ? (
                                <div className="max-w-4xl mx-auto space-y-8">
                                    <div className="flex items-center justify-between border-b border-onyx pb-4">
                                        <h3 className="text-xl font-semibold text-orange-yellow">About Me Section</h3>
                                    </div>

                                    {/* Rich Text Editor */}
                                    <div className="space-y-4">
                                        <label className="block text-sm font-medium text-gray-400">
                                            About Description
                                        </label>
                                        <div className="bg-onyx/50 rounded-xl overflow-hidden">
                                            <ReactQuill
                                                theme="snow"
                                                value={aboutData.description}
                                                onChange={handleAboutChange}
                                                modules={modules}
                                                className="text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-end pt-4">
                                        <button
                                            onClick={handleAboutUpload}
                                            className="px-8 py-3 bg-gradient-to-r from-orange-yellow to-vegas-gold text-jet font-bold rounded-xl shadow-lg hover:shadow-orange-yellow/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                                        >
                                            <FaUpload />
                                            <span>Update About Section</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid lg:grid-cols-2 gap-8">
                                    {/* Form Section */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-orange-yellow border-b border-onyx pb-2">Add New Card</h3>

                                        {/* Icon Selection */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-400">Select Icon</label>
                                            <div className="relative">
                                                <select
                                                    name="icon"
                                                    value={aboutCardData.icon}
                                                    onChange={handleCardChange}
                                                    className="w-full px-4 py-3 bg-onyx border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-yellow focus:border-orange-yellow outline-none text-white appearance-none cursor-pointer"
                                                >
                                                    <option value="code">Web Development (Code)</option>
                                                    <option value="design">UI/UX Design (Palette)</option>
                                                    <option value="mobile">App Development (Mobile)</option>
                                                    <option value="server">Backend/DevOps (Server)</option>
                                                </select>
                                                <div className="absolute right-4 top-3.5 text-gray-400 pointer-events-none">
                                                    ▼
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card Title */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-400">Card Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={aboutCardData.title}
                                                onChange={handleCardChange}
                                                className="w-full px-4 py-3 bg-onyx border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-yellow focus:border-orange-yellow outline-none text-white placeholder-gray-600"
                                                placeholder="e.g. Frontend Development"
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-400">Description (Max 3 lines)</label>
                                            <textarea
                                                name="description"
                                                value={aboutCardData.description}
                                                onChange={handleCardChange}
                                                rows="3"
                                                className="w-full px-4 py-3 bg-onyx border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-yellow focus:border-orange-yellow outline-none text-white placeholder-gray-600 resize-none"
                                                placeholder="Brief description of this skill or service..."
                                            ></textarea>
                                        </div>

                                        {/* Action Button */}
                                        <div className="pt-4">
                                            <button
                                                onClick={handleCardUpload}
                                                className="w-full py-3 px-6 rounded-xl font-bold text-lg shadow-lg bg-gradient-to-r from-orange-yellow to-vegas-gold text-jet hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                                            >
                                                Add Card
                                            </button>
                                        </div>
                                    </div>

                                    {/* Card Preview */}
                                    <div className="bg-onyx/30 rounded-2xl p-6 h-fit sticky top-6 border border-gray-800">
                                        <h3 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-2">Card Live Preview</h3>

                                        <div className="bg-eerie-black p-6 rounded-xl border border-gray-800 shadow-xl hover:shadow-orange-yellow/10 transition-shadow">
                                            <div className="flex flex-col gap-4">
                                                <div className="w-12 h-12 bg-onyx rounded-lg flex items-center justify-center text-orange-yellow shadow-lg ring-1 ring-gray-800">
                                                    {getIconComponent(aboutCardData.icon)}
                                                </div>

                                                <div>
                                                    <h4 className="text-lg font-bold text-white mb-2">
                                                        {aboutCardData.title || 'Card Title'}
                                                    </h4>
                                                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                                                        {aboutCardData.description || 'This description will serve as a brief overview of the skill or service provided, typically spanning about three lines for optimal readability.'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 text-xs text-gray-500 text-center">
                                            This is how the card will appear on your "About" page.
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Editor;
