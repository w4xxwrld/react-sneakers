# Miras Sneakers

A modern e-commerce web application for browsing and purchasing premium sneakers, featuring a full-stack architecture with React frontend and FastAPI backend.

![Miras Sneakers](https://img.shields.io/badge/React-18.3.1-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-0.95.2-green) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.4-cyan)

## Features

### 🛍️ Shopping Experience
- **Product Catalog** - Browse 13+ premium sneakers (Air Jordan & Nike collections)
- **Real-time Search** - Instant filtering by product name
- **Price Range Filter** - Dual slider controls for minimum and maximum price
- **Advanced Sorting** - Sort by default order, price (ascending/descending), or alphabetically by name
- **Product Details Modal** - Detailed view with size selection (38-46) and quantity picker (1-10 max)
- **Image Zoom** - Hover over product images for zoomed view

### 🛒 Shopping Cart
- **Persistent Cart** - Add items with selected size and quantity
- **Promo Codes** - Apply discount codes (SAVE10, WELCOME, MIRAS20) for 10-20% off
- **Price Breakdown** - View subtotal, tax (5%), discount, and total
- **Slide-in Animation** - Smooth cart sidebar with roll-in/roll-out effects
- **Empty State** - Friendly message when cart is empty
- **Quantity Display** - Shows item quantity in cart

### ❤️ Favorites
- **Wishlist** - Save favorite items for later viewing
- **Toggle Favorites** - Easy add/remove from any product card
- **Dedicated Page** - View all favorited items on `/favorites` route

### 🎨 User Interface
- **Responsive Design** - Mobile-friendly layout with Tailwind CSS
- **Loading Skeletons** - Animated placeholders while data loads
- **Toast Notifications** - Success/info messages for cart and favorite actions
- **Custom Animations** - Fade-in, slide-in effects throughout the app
- **Professional Footer** - Company info, links, and contact details
- **Error States** - Graceful handling of empty search results

## Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **React Router DOM 6.23.1** - Client-side routing
- **Axios 1.7.2** - HTTP client for API requests
- **Tailwind CSS 3.4.4** - Utility-first CSS framework
- **React Context API** - Global state management

### Backend
- **FastAPI 0.95.2** - High-performance Python web framework
- **Uvicorn 0.22.0** - ASGI server
- **Pydantic** - Data validation and serialization
- **JSON Storage** - File-based persistence with thread-safe operations

### Development Tools
- **Create React App** - React project scaffolding
- **PostCSS & Autoprefixer** - CSS processing
- **ESLint** - Code linting

## Project Structure

```
react-sneakers/
├── public/
│   ├── img/                 # Product images (Jordan & Nike sneakers)
│   ├── index.html          # HTML template
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO robots file
│
├── src/
│   ├── components/
│   │   ├── CardItem.js         # Individual product card component
│   │   ├── Header.js           # Application header with logo and cart
│   │   ├── MyCart.js           # Shopping cart sidebar with promo codes
│   │   ├── PhotoHolder.js      # Image placeholder component
│   │   ├── ProductModal.js     # Product detail modal with size/quantity selection
│   │   ├── Toast.js            # Toast notification component
│   │   ├── Footer.js           # Footer with contact info and links
│   │   └── LoadingSkeletons.js # Skeleton loader for product cards
│   │
│   ├── screens/
│   │   ├── Home.jsx            # Home page with search, filters, and product grid
│   │   └── Favorites.jsx       # Favorites page displaying saved items
│   │
│   ├── App.js              # Main app component with routing and state
│   ├── context.js          # React Context for global state
│   ├── data.json           # Static product data (deprecated)
│   ├── index.js            # React app entry point
│   ├── index.css           # Global styles and animations
│   └── reportWebVitals.js  # Performance monitoring
│
├── backend/
│   ├── main.py             # FastAPI application with REST endpoints
│   ├── utils.py            # Database utility functions (load/save JSON)
│   ├── db.json             # Product, cart, and favorites data storage
│   ├── requirements.txt    # Python dependencies
│   └── README.md           # Backend setup instructions
│
├── package.json            # NPM dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## File Descriptions

### Frontend Components

**`src/App.js`**  
Main application component that handles routing, API calls, and global state management. Provides context for cart, favorites, and loading states. Integrates toast notifications and manages cart sidebar visibility.

**`src/components/CardItem.js`**  
Reusable product card displaying sneaker image, name, and price. Includes favorite toggle and click handler to open detailed modal. Features text truncation and hover effects.

**`src/components/Header.js`**  
Top navigation bar with Miras Sneakers logo, favorites link, and cart button showing total price. Displays cart item count badge.

**`src/components/MyCart.js`**  
Shopping cart sidebar with item list, quantity display, promo code input, and price breakdown (subtotal, tax, discount, total). Includes validation for three promo codes and empty state message.

**`src/components/ProductModal.js`**  
Modal dialog for detailed product view. Features size selector (38-46), quantity picker (1-10), image zoom on hover, and enforced size selection before adding to cart.

**`src/components/Toast.js`**  
Auto-dismissing notification component with success/error/info types. Displays for 3 seconds with slide-in animation. Shows feedback for cart and favorite actions.

**`src/components/Footer.js`**  
Footer section with four columns: About, Information, Support, and Contact. Includes company address, phone, email, and copyright information.

**`src/components/LoadingSkeletons.js`**  
Skeleton placeholder component that mimics product card layout. Shows animated pulse effect while data loads from backend.

**`src/screens/Home.jsx`**  
Home page with complete shopping experience. Includes search bar, price range filters (min/max sliders), sort dropdown, and responsive product grid. Handles modal state and integrates loading skeletons.

**`src/screens/Favorites.jsx`**  
Favorites page displaying all saved items. Shows empty state when no favorites exist. Reuses CardItem component for consistent design.

**`src/context.js`**  
React Context definition for sharing global state (cart, favorites, loading) across components without prop drilling.

**`src/index.css`**  
Global styles with Tailwind directives and custom keyframe animations (fadeIn, slideInRight, slideIn) used throughout the application.

### Backend Files

**`backend/main.py`**  
FastAPI application with REST API endpoints:
- `GET /api/v1/sneakers` - Retrieve all sneakers
- `GET /api/v1/cart` - Get cart items
- `POST /api/v1/cart` - Add item to cart with size and quantity
- `DELETE /api/v1/cart/{id}` - Remove cart item
- `GET /api/v1/favorites` - Get favorite items
- `POST /api/v1/favorites` - Add item to favorites
- `DELETE /api/v1/favorites/{id}` - Remove from favorites

Includes CORS middleware for cross-origin requests and Pydantic models for data validation.

**`backend/utils.py`**  
Database utility functions for thread-safe JSON file operations:
- `load_db()` - Reads db.json with file locking
- `save_db(data)` - Writes JSON atomically using temp file
- `_next_id(collection)` - Generates sequential IDs for new items

**`backend/db.json`**  
Persistent JSON database storing:
- **sneakers** - 13 product entries with id, name, imageUrl, price (KZT)
- **cart** - Shopping cart items with size and quantity
- **favorites** - Favorited product entries

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- npm or yarn

### Frontend Setup

1. Clone the repository:
```bash
git clone https://github.com/w4xxwrld/react-sneakers.git
cd react-sneakers
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the FastAPI server:
```bash
uvicorn main:app --reload --port 3001
```

The API will be available at [http://localhost:3001](http://localhost:3001)

## Configuration

### Environment Variables

Create a `.env` file in the root directory to configure the API endpoint:

```bash
REACT_APP_API_BASE=http://localhost:3001/api/v1
```

### Promo Codes

Available discount codes:
- **SAVE10** - 10% off
- **WELCOME** - 15% off
- **MIRAS20** - 20% off

## Available Scripts

### Frontend

**`npm start`**  
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

**`npm test`**  
Launches the test runner in interactive watch mode

**`npm run build`**  
Builds the app for production to the `build` folder

**`npm run eject`**  
Ejects from Create React App (one-way operation)

### Backend

**`uvicorn main:app --reload --port 3001`**  
Starts FastAPI server with auto-reload on port 3001

## API Documentation

Once the backend is running, visit [http://localhost:3001/docs](http://localhost:3001/docs) for interactive Swagger API documentation.

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/sneakers` | Get all sneakers |
| GET | `/api/v1/cart` | Get cart items |
| POST | `/api/v1/cart` | Add item to cart |
| DELETE | `/api/v1/cart/{id}` | Remove cart item |
| GET | `/api/v1/favorites` | Get favorites |
| POST | `/api/v1/favorites` | Add to favorites |
| DELETE | `/api/v1/favorites/{id}` | Remove favorite |

## Features in Detail

### Search & Filtering
The home page provides multiple ways to find products:
- **Text Search**: Type in the search bar to filter by product name (case-insensitive)
- **Price Range**: Use dual sliders to set minimum and maximum price bounds
- **Sorting**: Choose from default, price ascending, price descending, or alphabetical sorting
- **Real-time Updates**: All filters work together and update instantly

### Size Selection
Before adding items to cart, users must select a size (38-46). The size selector is prominently displayed in the product modal with visual feedback for the selected size.

### Quantity Management
Users can choose 1-10 items per cart entry using increment/decrement buttons. The quantity is displayed in the cart with "Кол-во: X шт." label.

### Promo Code System
The cart includes a promo code input field that validates against three predefined codes. When applied, the discount is calculated and displayed in the price breakdown. Invalid codes show an error message.

### Animations
The application uses custom CSS animations for enhanced UX:
- **fadeIn**: Smooth opacity transition for elements
- **slideInRight**: Cart sidebar slides in from the right
- **slideIn**: Toast notifications slide from top
- **Hover Effects**: Product cards lift and images zoom on hover

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or support, reach out to:
- **Email**: info@miras-sneakers.kz
- **Phone**: +7 (777) 123-45-67
- **Address**: Алматы, Казахстан

---

Built with ❤️ using React and FastAPI

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
