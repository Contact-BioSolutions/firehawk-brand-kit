# Team Access & Setup Guide

## Repository Access

**GitHub Repository**: https://github.com/Contact-BioSolutions/firehawk-brand-kit
**Visibility**: Internal (Contact BioSolutions organization members only)
**Package Registry**: GitHub Packages

## Installation for Development Teams

### 1. Authenticate with GitHub Packages

Each team member needs to authenticate with GitHub Packages to install private packages:

```bash
# Create a personal access token with 'read:packages' scope at:
# https://github.com/settings/tokens

# Configure npm to use GitHub Packages for @contact-biosolutions scope
echo "@contact-biosolutions:registry=https://npm.pkg.github.com" >> ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc
```

### 2. Install the Package

```bash
npm install @contact-biosolutions/firehawk-brand-kit
```

### 3. Project Integration

#### Next.js Projects
```js
// tailwind.config.js
module.exports = {
  presets: [require('@contact-biosolutions/firehawk-brand-kit/tailwind/preset')],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
```

#### Sanity Studio Projects
```js
// sanity.config.ts
import '@contact-biosolutions/firehawk-brand-kit/css/base.css'
// ... rest of config
```

## Package Updates

### For Package Maintainers

1. **Make changes** to the brand kit
2. **Update version** in package.json
3. **Create release** on GitHub:
   ```bash
   git tag v0.2.0
   git push origin v0.2.0
   gh release create v0.2.0 --title "Release v0.2.0" --notes "Release notes"
   ```
4. **GitHub Actions** will automatically publish to GitHub Packages

### For Consuming Projects

```bash
# Update to latest version
npm update @contact-biosolutions/firehawk-brand-kit

# Or install specific version
npm install @contact-biosolutions/firehawk-brand-kit@0.2.0
```

## Team Permissions

### Required GitHub Permissions
- **Organization membership**: Contact-BioSolutions
- **Repository access**: Read access to fh-brand-kit repository
- **Package access**: Read access to @contact-biosolutions packages

### For Package Maintainers (Additional)
- **Repository access**: Write access to fh-brand-kit
- **Package access**: Write access for publishing

## Troubleshooting

### Common Issues

#### Authentication Errors
```
npm ERR! 401 Unauthorized - GET https://npm.pkg.github.com/@contact-biosolutions%2ffh-brand-kit
```

**Solution**: Check your `.npmrc` configuration and GitHub token permissions.

#### Package Not Found
```
npm ERR! 404 Not Found - GET https://npm.pkg.github.com/@contact-biosolutions%2ffh-brand-kit
```

**Solution**: Ensure you're a member of Contact-BioSolutions organization and have access to the repository.

#### Version Conflicts
```
npm ERR! peer dep missing: @contact-biosolutions/firehawk-brand-kit@^0.1.0
```

**Solution**: Update package version in your project dependencies.

### Getting Help

1. **Check documentation**: [README.md](../README.md) and [USAGE.md](./USAGE.md)
2. **GitHub Issues**: Create issue in the repository for bugs/feature requests
3. **Team Chat**: Contact the development team lead

## CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/build.yml
name: Build
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
          
      - name: Configure npm for GitHub Packages
        run: echo "@contact-biosolutions:registry=https://npm.pkg.github.com" >> ~/.npmrc
        
      - name: Install dependencies
        run: npm install
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          
      - name: Build
        run: npm run build
```

### Docker Integration

```dockerfile
# Dockerfile
FROM node:18-alpine

# Configure npm for GitHub Packages
RUN echo "@contact-biosolutions:registry=https://npm.pkg.github.com" >> ~/.npmrc

# Set auth token for build
ARG GITHUB_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> ~/.npmrc

COPY package*.json ./
RUN npm install

# Remove token from final image
RUN npm config delete //npm.pkg.github.com/:_authToken

COPY . .
RUN npm run build
```

## Best Practices

### Version Management
- **Lock versions** in production: Use exact versions in package.json
- **Test updates** in development before upgrading production
- **Monitor releases** for breaking changes

### Development Workflow
1. **Import tokens** rather than hardcoding colors/sizes
2. **Use Tailwind classes** for consistency
3. **Follow brand guidelines** in [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md)
4. **Test across projects** before major updates

### Performance
- **Tree shaking**: Import only needed tokens
- **CSS optimization**: Use Tailwind's purge/content configuration
- **Bundle analysis**: Monitor package size impact