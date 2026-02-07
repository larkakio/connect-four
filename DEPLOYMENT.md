# Deployment Guide for Connect Four: Neon Gravity

## Pre-Deployment Checklist

- ✅ All components built and tested
- ✅ Icon (1024×1024) and hero image (1200×630) generated
- ✅ Farcaster manifest created
- ✅ Next.js configuration optimized
- ✅ Build successful

## Step 1: Deploy to Vercel

### Quick Deploy

Click the button below to deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/connect-four-neon)

### Manual Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Connect Four Neon Gravity"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/connect-four-neon.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings

3. **Environment Variables**
   Add the following in Vercel dashboard:
   ```
   NEXT_PUBLIC_APP_URL=https://YOUR-APP.vercel.app
   ```
   (Replace with your actual Vercel URL after first deployment)

4. **Deploy**
   Click "Deploy" and wait for build to complete

## Step 2: Configure Farcaster Integration

### Generate Account Association

1. **Ensure Deployment Protection is OFF**
   - Go to Vercel Dashboard → Your Project
   - Navigate to Settings → Deployment Protection
   - Toggle "Vercel Authentication" to OFF
   - Click Save

2. **Generate Credentials**
   - Visit [Base Build Account Association Tool](https://base.dev/preview?tab=account)
   - Paste your Vercel URL (e.g., `https://connect-four-neon.vercel.app`)
   - Click "Submit"
   - Click "Verify" button that appears
   - Follow instructions to sign with your Farcaster account

3. **Copy Credentials**
   After verification, you'll receive an `accountAssociation` object like:
   ```json
   {
     "header": "eyJma...",
     "payload": "eyJkb2...",
     "signature": "MHhmN..."
   }
   ```

### Update Manifest

1. **Edit Farcaster Manifest**
   Update `public/.well-known/farcaster.json`:
   ```json
   {
     "accountAssociation": {
       "header": "YOUR_HEADER_HERE",
       "payload": "YOUR_PAYLOAD_HERE",
       "signature": "YOUR_SIGNATURE_HERE"
     },
     "miniapp": {
       // ... existing config
     }
   }
   ```

2. **Update App URL**
   Replace all placeholder URLs with your actual Vercel URL

3. **Commit and Push**
   ```bash
   git add public/.well-known/farcaster.json
   git commit -m "Add Farcaster account association"
   git push
   ```

4. **Vercel Auto-Deploys**
   Wait for automatic deployment to complete

## Step 3: Verify Your Mini App

### Test Manifest

1. Visit: `https://YOUR-APP.vercel.app/.well-known/farcaster.json`
2. Verify it returns valid JSON with your credentials

### Use Preview Tool

1. Go to [Base Build Preview](https://base.dev/preview)
2. Enter your app URL
3. Test all tabs:
   - **Preview**: Check app launch and embeds
   - **Account**: Verify association credentials
   - **Metadata**: Confirm all fields are correct

### Test in Base App

1. Open Base app on your mobile device
2. Create a new cast
3. Paste your app URL
4. The embed should appear with your hero image
5. Click "Play Neon Gravity" to launch
6. Test gameplay and swipe gestures

## Step 4: Submit for Featured Placement (Optional)

### Requirements

Before submitting, ensure your app meets all guidelines:

- ✅ Load time < 3 seconds
- ✅ Animations at 60 FPS
- ✅ Touch targets ≥ 44px
- ✅ Light and dark mode support
- ✅ In-app authentication (no external redirects)
- ✅ Clear onboarding/instructions
- ✅ High-quality icon and screenshots
- ✅ Descriptive metadata

### Submit

1. Verify your mini app in [Base Build Dashboard](https://base.dev/)
2. Fill out [Featured Placement Form](https://docs.google.com/forms/d/e/1FAIpQLSeZiB3fmMS7oxBKrWsoaew2LFxGpktnAtPAmJaNZv5TOCXIZg/viewform)
3. Wait for review (meeting guidelines does not guarantee placement)

## Troubleshooting

### Manifest Not Loading

- Ensure `.well-known` folder is in `public/` directory
- Verify file is named exactly `farcaster.json`
- Check that Vercel deployment protection is OFF
- Test direct URL access

### Account Association Invalid

- Regenerate credentials using the tool
- Ensure no extra whitespace in JSON
- Verify signature matches your Farcaster account
- Redeploy after updating

### App Not Launching

- Check browser console for errors
- Verify all image URLs are correct
- Test on different devices/browsers
- Ensure NEXT_PUBLIC_APP_URL is set correctly

### Build Failures

- Run `npm run build` locally first
- Check for TypeScript errors
- Verify all dependencies are installed
- Review Vercel build logs

## Monitoring

After deployment:

1. **Analytics**: Set up Vercel Analytics
2. **Errors**: Monitor Vercel logs for runtime errors
3. **Performance**: Use Lighthouse to verify metrics
4. **User Feedback**: Monitor Base app comments

## Updates

To update your app:

1. Make changes locally
2. Test with `npm run build`
3. Commit and push to GitHub
4. Vercel auto-deploys
5. Test updated version

## Support

- [Base Documentation](https://docs.base.org/mini-apps/)
- [Farcaster Mini Apps Docs](https://miniapps.farcaster.xyz/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Support](https://vercel.com/support)

## Quick Links

- **Base Build**: https://base.dev/
- **Preview Tool**: https://base.dev/preview
- **Account Tool**: https://base.dev/preview?tab=account
- **Farcaster Docs**: https://docs.farcaster.xyz/

---

Good luck with your deployment! 🚀
