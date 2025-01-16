# Blog.co

Blog.co is a modern blogging platform that allows users to create, read, update, and delete blog posts. Built with Next.js and Supabase, this application provides a seamless user experience for both authors and readers.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure sign-up and login functionality using Supabase.
- **CRUD Operations**: Create, read, update, and delete blog posts.
- **Responsive Design**: Mobile-friendly layout using Tailwind CSS.
- **Dynamic Routing**: Each blog post has its own unique URL.
- **User Profiles**: Users can manage their profiles and view their posts.
- **View Count**: Track the number of views for each blog post.

## Technologies Used

- **Frontend**: 
  - Next.js
  - React
  - Tailwind CSS
- **Backend**: 
  - Supabase (PostgreSQL, Authentication)
- **Deployment**: Vercel

## Getting Started

To get a local copy of this project up and running, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/blog-co.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd blog-co
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   - Create a `.env` file in the root of the project and add your database connection details:
     ```plaintext
     DATABASE_URL=your_database_url
     DIRECT_URL=your_direct_url
     ```

   - Create a `.env.local` file in the root of the project and add your Supabase credentials:
     ```plaintext
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## Usage

- **Sign Up / Login**: Users can create an account or log in to access their profiles.
- **Create a Post**: Authenticated users can create new blog posts.
- **Edit / Delete Posts**: Users can edit or delete their existing posts.
- **View Posts**: All users can view published posts.

## Contributing

Contributions are welcome! If you have suggestions for improvements or features, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README further to match your personal style or to include additional information about your project!