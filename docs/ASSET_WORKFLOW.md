# Brand Asset Workflow

Complete workflow for managing Contact BioSolutions brand assets from submission to deployment.

## 🔄 Asset Lifecycle

```
Brand Assets → Inbox → Processing → Review → Approval → Deployment
```

## 1. Asset Submission

### For Brand/Design Teams
1. **Prepare assets** according to [submission guidelines](../brand-assets-inbox/README.md)
2. **Drop assets** in appropriate `brand-assets-inbox/` folders
3. **Commit and push** to trigger automated processing
4. **Monitor** the automated workflow for processing results

### For Developers
1. **Receive assets** from brand team via shared drive, email, etc.
2. **Place assets** in correct `brand-assets-inbox/` subdirectories
3. **Run local processing** (optional): `npm run process-assets`
4. **Commit changes** to trigger automated workflow

## 2. Automated Processing

### Triggered by:
- **File changes** in `brand-assets-inbox/` directory
- **Manual workflow** dispatch from GitHub Actions
- **Scheduled processing** (if configured)

### Processing Steps:
1. **Asset validation** - Check formats, sizes, naming
2. **Organization** - Sort into proper `src/assets/` structure  
3. **Token generation** - Extract colors, fonts, create design tokens
4. **Optimization** - Compress SVGs, optimize images
5. **Type generation** - Update TypeScript definitions
6. **Build verification** - Ensure package builds successfully

### Outputs:
- **Updated assets** in `src/assets/`
- **Design tokens** in `src/tokens/`
- **Processing logs** with detailed results
- **Optimization report** with recommendations
- **Automated PR** with changes for review

## 3. Review Process

### Automated PR Created
When assets are processed, an automated PR is created with:
- **Summary** of changes made
- **Visual diff** of asset updates
- **Processing logs** attached as artifacts
- **Review checklist** for manual validation

### Review Checklist
- [ ] **Visual accuracy** - Assets match brand guidelines
- [ ] **Color fidelity** - Design tokens reflect correct colors
- [ ] **Typography** - Font loading and fallbacks work correctly
- [ ] **Icon consistency** - SVGs have uniform style and sizing
- [ ] **Accessibility** - Color contrast meets WCAG standards
- [ ] **Performance** - File sizes optimized appropriately
- [ ] **Integration** - Test in sample consuming project

### Review Roles
- **Brand Manager**: Verify brand compliance and visual accuracy
- **Lead Developer**: Check technical implementation and integration
- **UX Designer**: Validate accessibility and user experience
- **QA**: Test across different projects and environments

## 4. Approval & Deployment

### Manual Approval Required
- **Brand assets** that affect visual identity
- **Major color changes** that impact accessibility
- **Typography updates** that change font loading
- **Breaking changes** to existing token structure

### Auto-Approval Allowed
- **Asset optimizations** without visual changes
- **Icon additions** following established patterns
- **Minor color adjustments** within brand guidelines
- **Documentation updates**

### Deployment Process
1. **PR approval** by required reviewers
2. **Merge to main** triggers publishing workflow
3. **Version bump** (patch/minor/major based on changes)
4. **Package publishing** to GitHub Packages
5. **Release notes** generated with asset changes
6. **Team notification** of new version availability

## 5. Integration & Testing

### Test in Consuming Projects
Before final approval, test the updated brand kit in:
- **Agronomy Central** (Sanity + Next.js)
- **Sample website** project
- **Storybook** component library (if available)

### Integration Testing Steps
```bash
# In consuming project
npm install @contact-biosolutions/fh-brand-kit@latest

# Verify imports work
import { colors, typography } from '@contact-biosolutions/fh-brand-kit'

# Test Tailwind integration
npm run build

# Visual regression testing
npm run test:visual
```

## 🛠️ Manual Asset Processing

### Local Development
```bash
# Process specific asset type
npm run process-assets -- --category=logos

# Validate without processing
npm run validate-assets

# Generate tokens from processed assets
npm run generate-tokens

# Optimize all assets
npm run optimize-assets

# Full workflow
npm run process-assets && npm run generate-tokens && npm run optimize-assets
```

### Manual Workflow Dispatch
1. Go to **GitHub Actions** → **Process Brand Assets**
2. Click **Run workflow**
3. Select **category** (optional, leave empty for all)
4. Click **Run workflow** button
5. Monitor progress and review created PR

## 🔍 Quality Gates

### Automated Validation
- **File format** compatibility
- **Naming convention** compliance
- **Color value** validity
- **SVG structure** optimization
- **TypeScript compilation**
- **Package build** success

### Manual Validation
- **Brand compliance** review
- **Visual accuracy** verification
- **Accessibility** standards check
- **Cross-project** compatibility test
- **Performance** impact assessment

## 📊 Monitoring & Reporting

### Processing Logs
Located in `logs/` directory:
- **asset-processing-YYYY-MM-DD.log** - Detailed processing steps
- **optimization-report.json** - Asset optimization results
- **processing-summary.json** - High-level summary and recommendations

### Metrics Tracked
- **Processing success rate**
- **Asset optimization savings**
- **Token generation accuracy**
- **Build performance impact**
- **Integration test results**

### Notifications
- **Slack/Teams** notifications for workflow completion
- **Email alerts** for processing failures
- **PR comments** with processing summary
- **Release notes** for version updates

## 🚨 Troubleshooting

### Common Issues

#### Processing Failures
```
❌ Asset processing failed: Invalid file format
```
**Solution**: Check file formats match requirements in guidelines

#### Token Generation Errors
```
❌ Error updating color tokens: Invalid color value
```
**Solution**: Validate color specifications use proper hex/RGB format

#### Build Failures
```
❌ TypeScript compilation failed
```
**Solution**: Check generated tokens for syntax errors

#### PR Creation Issues
```
❌ No changes detected after processing
```
**Solution**: Verify assets were placed in correct inbox directories

### Recovery Procedures
1. **Check processing logs** for specific error details
2. **Restore from backup** if tokens corrupted
3. **Manual asset placement** if automation fails
4. **Contact team lead** for complex issues

### Support Channels
- **GitHub Issues** for bug reports and feature requests
- **Team chat** for quick questions and assistance
- **Documentation** updates for process improvements
- **Retrospectives** for workflow optimization

## 📋 Workflow Templates

### New Logo Integration
1. Drop logo files in `brand-assets-inbox/logos/`
2. Ensure naming follows convention: `cb-logo-primary-full-color.svg`
3. Run processing or push to trigger automation
4. Review generated assets in `src/assets/logos/`
5. Test logo display in sample components
6. Approve and merge PR

### Color Palette Update
1. Export colors from design tool (Figma JSON, CSS, etc.)
2. Place in `brand-assets-inbox/colors/`
3. Process assets to update `src/tokens/colors.ts`
4. Verify color accuracy in generated tokens
5. Test accessibility compliance
6. Update documentation if needed

### Icon Library Addition
1. Prepare SVG icons following style guidelines
2. Drop in `brand-assets-inbox/icons/`
3. Processing will organize by category automatically
4. Review organization in `src/assets/icons/`
5. Test icon display and consistency
6. Update component examples

This workflow ensures consistent, high-quality brand asset management with proper review and approval processes.