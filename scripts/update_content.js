const fs = require('fs');
const path = require('path');

const contentPath = path.join(__dirname, '..', 'visual-data', 'content.json');
let content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

// Testimonials
const testimonialsDir = path.join(__dirname, '..', 'public', 'images', 'testimonials');
const testimonialsFiles = fs.readdirSync(testimonialsDir).filter(f => f.match(/\.(png|jpe?g)$/i));
content.testimonials.items = testimonialsFiles.map((f, i) => ({
  imageUrl: `/images/testimonials/${f}`,
  imageAlt: `Testimonial ${i + 1}`,
  quote: `Client testimonial ${i + 1}`,
  showBeforeAfter: f.toLowerCase().includes('before'),
  beforeLabel: "Before",
  afterLabel: "After"
}));

// Video Testimonials
const videoTestimonialsDir = path.join(__dirname, '..', 'public', 'images', 'videoTestimonials');
const videoFiles = fs.readdirSync(videoTestimonialsDir).filter(f => f.endsWith('.mp4'));
const videoThumbnails = fs.readdirSync(videoTestimonialsDir).filter(f => f.match(/\.(png|jpe?g)$/i));
content.videoTestimonials.items = videoFiles.map((f, i) => ({
  id: i + 1,
  name: `Client ${i + 1}`,
  location: "India",
  quote: `Amazing results ${i + 1}`,
  thumbnail: `/images/videoTestimonials/${videoThumbnails[i % videoThumbnails.length] || 'placeholder.png'}`,
  videoUrl: `/images/videoTestimonials/${f}`
}));

// Screenshots
const screenshotsDir = path.join(__dirname, '..', 'public', 'images', 'screenshots');
const screenshotsFiles = fs.readdirSync(screenshotsDir).filter(f => f.match(/\.(png|jpe?g)$/i));
content.screenshots.items = screenshotsFiles.map((f, i) => ({
  id: i + 1,
  name: `Screenshot ${i + 1}`,
  location: "",
  quote: "",
  thumbnail: `/images/screenshots/${f}`
}));

// Team
const teamDir = path.join(__dirname, '..', 'public', 'images', 'team');
const teamFiles = fs.readdirSync(teamDir).filter(f => f.match(/\.(png|jpe?g)$/i));
content.team.members = teamFiles.map((f, i) => ({
  name: f.split('.')[0],
  role: "Team Member",
  imageUrl: `/images/team/${f}`
}));

fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
console.log('content.json updated successfully.');
