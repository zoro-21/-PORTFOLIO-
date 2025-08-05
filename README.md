# Thrishank P - Terrigraphic Portfolio

A futuristic 3D art and digital design portfolio website showcasing the work of Thrishank P, a passionate digital artist and creative developer specializing in 3D art, interactive media, and cutting-edge web technologies.

## About Thrishank P

Thrishank P is a passionate digital artist and creative developer who combines technical expertise with artistic vision to create compelling digital experiences. His journey in digital art and development has led him to master various technologies including WebGL, Three.js, and modern web frameworks. He's particularly passionate about creating interactive 3D experiences and pushing the boundaries of what's possible in web-based art and design.

**Contact Information:**
- Email: thrishank3000@gmail.com
- GitHub: [zoro-21](https://github.com/zoro-21/-PORTFOLIO-.git)
- LinkedIn: [Thrishank P](https://www.linkedin.com/in/thrishank-p-34a615295)

## Features

- **Personal About Section**: Comprehensive information about Thrishank P's background and expertise
- **3D Interactive Background**: Powered by Three.js with animated geometric shapes and particle systems
- **Responsive Design**: Fully responsive across all devices
- **Modern UI/UX**: Futuristic design with smooth animations and transitions
- **Contact Form**: Functional contact form with email integration
- **Portfolio Showcase**: Filterable project gallery with various 3D art and interactive projects
- **Professional Timeline**: Journey from 2022-Present as Digital Artist & Developer
- **Performance Optimized**: Fast loading and smooth animations

## Tech Stack

### Frontend
- HTML5
- CSS3 (with modern features like Grid, Flexbox, and CSS Variables)
- JavaScript (ES6+)
- Three.js for 3D graphics
- Google Fonts (Orbitron)

### Backend
- Node.js
- Express.js
- Nodemailer for email functionality
- CORS for cross-origin requests
- Helmet for security
- Rate limiting for API protection

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd /path/to/terrigraphic-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your email configuration:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ADMIN_EMAIL=admin@terrigraphic.com
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
terrigraphic-portfolio/
├── terrigraphic-index.html    # Homepage
├── projects.html              # Portfolio page
├── about.html                # About page
├── contact.html              # Contact page
├── terrigraphic-styles.css   # Main stylesheet
├── terrigraphic-script.js    # Three.js animations
├── server.js                 # Express server
├── package.json              # Dependencies
├── .env.example              # Environment variables template
├── assets/                   # Images and media files
└── README.md                 # This file
```

## Email Configuration

### Gmail Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this app password in your `.env` file

### Other Email Providers
Update the SMTP configuration in `.env`:
```
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-password
```

## Development

### Available Scripts
- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon (auto-restart)

### Adding New Projects
1. Edit `projects.html`
2. Add new project cards to the portfolio grid
3. Update the filter categories if needed

### Customization
- **Colors**: Update CSS variables in `terrigraphic-styles.css`
- **3D Effects**: Modify `terrigraphic-script.js` for different animations
- **Content**: Update HTML files with your content

## Deployment

### Local Production
```bash
NODE_ENV=production npm start
```

### Heroku Deployment
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy:
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Other Platforms
The app can be deployed to any Node.js hosting platform:
- Vercel
- Netlify (with serverless functions)
- DigitalOcean App Platform
- AWS Elastic Beanstalk

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note**: Three.js requires WebGL support. Most modern browsers support this.

## Performance Tips

1. **Images**: Optimize images in the `assets/` folder
2. **3D Performance**: Reduce particle count on mobile devices
3. **Caching**: Enable browser caching for static assets
4. **CDN**: Consider using a CDN for Three.js and other libraries

## Security Features

- Helmet.js for security headers
- Rate limiting on contact form
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own portfolio!

## Support

For questions or issues:
- Create an issue in the repository
- Email: thrishank3000@gmail.com
- LinkedIn: [Thrishank P](https://www.linkedin.com/in/thrishank-p-34a615295)

## Acknowledgments

- Three.js community for excellent 3D graphics library
- Google Fonts for the Orbitron typeface
- Express.js team for the robust web framework

---

**Built with ❤️ by Thrishank P for the future of digital art**
# -PORTFOLIO-
