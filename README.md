# Blog.co


Blog.co is a modern blogging platform that allows users to create, read, update, and delete blog posts. Built with Next.js and Supabase, this application provides a seamless user experience for both authors and readers.

### **Blog Page**

<img width="1440" alt="Screenshot 2025-01-17 at 1 39 10 PM" src="https://github.com/user-attachments/assets/7a6c9304-a233-4d7e-855c-84a25c266290" />

### **Profile Page**

<img width="1440" alt="Screenshot 2025-01-17 at 1 39 44 PM" src="https://github.com/user-attachments/assets/fd8d51ad-f439-446f-9d09-46de923d51fd" />

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Email Templates](#email-templates)
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
  - Prisma (ORM)
- **Deployment**:
  - Vercel

## Note: Due to email provider limitations, the demo site is available for login only. 
## Please use the default credentails: (email: admin@gmail.com, password: admin) to log in. 


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

## Email Templates

### Confirm Signup Email

The email template for the "Confirm Signup" email in Supabase is as follows:

```html
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your user:</p>
<p>
  <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next={{ .RedirectTo }}">Confirm your email</a>
</p>
```

### Reset Password Email

The email template for the "Reset Password" email in Supabase is as follows:

```html
<h2>Reset Password</h2>
<p>Follow this link to reset the password for your user:</p>
<p>
  <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/reset-password">Reset Password</a>
</p>
```

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
