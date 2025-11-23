# Deployment Guide for Vercel

This guide will help you deploy your Contwre website to Vercel.

## Prerequisites

1. A GitHub account
2. A Vercel account (free tier available)
3. Your project pushed to a GitHub repository

## Deployment Steps

### 1. Push to GitHub

If you haven't already, push your project to GitHub:

```bash
git init
git add .
git commit -m "Initial commit: React + Three.js website setup"
git branch -M main
git remote add origin https://github.com/yourusername/contwre-website.git
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the Vite configuration
5. The following settings will be automatically configured:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Environment Variables (if needed)

If you add environment variables later, you can configure them in:
- Vercel Dashboard → Project Settings → Environment Variables

### 4. Custom Domain (Optional)

1. In your Vercel dashboard, go to your project
2. Click on "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Automatic Deployments

Once connected, Vercel will automatically deploy:
- Every push to the `main` branch → Production deployment
- Every push to other branches → Preview deployments
- Every pull request → Preview deployment

## Build Configuration

The project is already configured with:
- `vercel.json` - Vercel-specific configuration
- Optimized build settings in `vite.config.js`
- Proper routing for single-page application

## Performance Optimizations

The build is optimized for:
- Code splitting (vendor and Three.js chunks)
- Tree shaking
- Asset optimization
- Modern browser support

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible
- Check the build logs in Vercel dashboard

### 3D Models Not Loading
- Ensure assets are in the `public` folder
- Check file paths are correct
- Verify file sizes are reasonable

### Styling Issues
- Clear browser cache
- Check Tailwind CSS is properly configured
- Verify PostCSS configuration

## Monitoring

Vercel provides built-in analytics and monitoring:
- Performance metrics
- Error tracking
- Deployment history
- Function logs (if using serverless functions)

## Support

For issues specific to:
- **Vercel**: Check [Vercel Documentation](https://vercel.com/docs)
- **Three.js**: Check [Three.js Documentation](https://threejs.org/docs)
- **React Three Fiber**: Check [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)











