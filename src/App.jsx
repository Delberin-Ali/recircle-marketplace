import React, { useState } from 'react';
import { Search, Plus, ShoppingBag, User, Heart, MapPin, Clock } from 'lucide-react';

const App = () => {
    const [view, setView] = useState('browse'); // browse, sell, product
    const [products, setProducts] = useState([
        {
            id: 1,
            title: 'Vintage Leather Jacket',
            price: 45,
            category: 'Fashion',
            condition: 'Good',
            seller: 'Sarah M.',
            location: 'Zürich',
            image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
            description: 'Classic brown leather jacket, barely worn. Size M.',
            postedDate: '2 days ago'
        },
        {
            id: 2,
            title: 'iPhone 12 Pro',
            price: 380,
            category: 'Electronics',
            condition: 'Excellent',
            seller: 'Mike T.',
            location: 'Geneva',
            image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400',
            description: '128GB, works perfectly, includes charger and case.',
            postedDate: '1 day ago'
        },
        {
            id: 3,
            title: 'Mountain Bike',
            price: 250,
            category: 'Sports',
            condition: 'Good',
            seller: 'Anna K.',
            location: 'Bern',
            image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400',
            description: '26" wheels, 21 speeds, great for trails.',
            postedDate: '5 days ago'
        },
        {
            id: 4,
            title: 'Ikea Bookshelf',
            price: 30,
            category: 'Furniture',
            condition: 'Fair',
            seller: 'John D.',
            location: 'Zürich',
            image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400',
            description: 'White Billy bookshelf, some scratches but sturdy.',
            postedDate: '1 week ago'
        }
    ]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [favorites, setFavorites] = useState([]);

    const [newProduct, setNewProduct] = useState({
        title: '',
        price: '',
        category: 'Fashion',
        condition: 'Good',
        location: '',
        description: '',
        image: ''
    });

    const categories = ['All', 'Fashion', 'Electronics', 'Sports', 'Furniture', 'Books', 'Toys'];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handlePostProduct = () => {
        if (newProduct.title && newProduct.price && newProduct.location) {
            const product = {
                id: products.length + 1,
                ...newProduct,
                price: parseFloat(newProduct.price),
                seller: 'You',
                postedDate: 'Just now',
                image: newProduct.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
            };
            setProducts([product, ...products]);
            setNewProduct({
                title: '',
                price: '',
                category: 'Fashion',
                condition: 'Good',
                location: '',
                description: '',
                image: ''
            });
            setView('browse');
        }
    };

    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <ShoppingBag className="text-blue-600" size={28} />
                            <h1 className="text-2xl font-bold text-gray-900">ReCircle</h1>
                        </div>
                        <nav className="flex space-x-6">
                            <button
                                onClick={() => setView('browse')}
                                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${
                                    view === 'browse' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <Search size={18} />
                                <span>Browse</span>
                            </button>
                            <button
                                onClick={() => setView('sell')}
                                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${
                                    view === 'sell' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <Plus size={18} />
                                <span>Sell Item</span>
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Browse View */}
            {view === 'browse' && (
                <div className="max-w-7xl mx-auto px-4 py-6">
                    {/* Search and Filters */}
                    <div className="mb-6 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search for items..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex space-x-2 overflow-x-auto pb-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                                        selectedCategory === cat
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
                                onClick={() => {
                                    setSelectedProduct(product);
                                    setView('product');
                                }}
                            >
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(product.id);
                                        }}
                                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                                    >
                                        <Heart
                                            size={18}
                                            className={favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                                        />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                                    <p className="text-2xl font-bold text-blue-600 mb-2">CHF {product.price}</p>
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                        {product.location}
                    </span>
                                        <span>{product.condition}</span>
                                    </div>
                                    <div className="flex items-center mt-2 text-xs text-gray-500">
                                        <Clock size={12} className="mr-1" />
                                        {product.postedDate}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No items found. Try adjusting your search.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Sell View */}
            {view === 'sell' && (
                <div className="max-w-2xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-bold mb-6">List Your Item</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Item Title *
                                </label>
                                <input
                                    type="text"
                                    value={newProduct.title}
                                    onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Vintage Leather Jacket"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Price (CHF) *
                                    </label>
                                    <input
                                        type="number"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="45"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category *
                                    </label>
                                    <select
                                        value={newProduct.category}
                                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        {categories.filter(c => c !== 'All').map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Condition *
                                    </label>
                                    <select
                                        value={newProduct.condition}
                                        onChange={(e) => setNewProduct({...newProduct, condition: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option>Excellent</option>
                                        <option>Good</option>
                                        <option>Fair</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        value={newProduct.location}
                                        onChange={(e) => setNewProduct({...newProduct, location: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Zürich"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    rows="4"
                                    placeholder="Describe your item..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image URL (optional)
                                </label>
                                <input
                                    type="text"
                                    value={newProduct.image}
                                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <button
                                onClick={handlePostProduct}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                Post Item
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Detail View */}
            {view === 'product' && selectedProduct && (
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <button
                        onClick={() => setView('browse')}
                        className="mb-4 text-blue-600 hover:text-blue-700 flex items-center"
                    >
                        ← Back to Browse
                    </button>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-6">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.title}
                                className="w-full h-96 object-cover"
                            />

                            <div className="p-6">
                                <h2 className="text-3xl font-bold mb-3">{selectedProduct.title}</h2>
                                <p className="text-4xl font-bold text-blue-600 mb-4">CHF {selectedProduct.price}</p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center text-gray-700">
                                        <MapPin size={18} className="mr-2" />
                                        <span>{selectedProduct.location}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <User size={18} className="mr-2" />
                                        <span>Seller: {selectedProduct.seller}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <Clock size={18} className="mr-2" />
                                        <span>Posted {selectedProduct.postedDate}</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                  <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm mr-2">
                    {selectedProduct.category}
                  </span>
                                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {selectedProduct.condition}
                  </span>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-semibold mb-2">Description</h3>
                                    <p className="text-gray-700">{selectedProduct.description}</p>
                                </div>

                                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                                    Contact Seller
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;