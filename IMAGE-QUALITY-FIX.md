Karcari V5.7 image warning fix

Changed the premix product card Next.js Image quality from 78 to 75 to match the configured/default allowed image quality of 75. This removes the repeated next/image unconfigured quality warnings.

The npm audit vulnerabilities are separate from this image-quality issue. Run `npm audit` to obtain affected dependency paths before choosing safe upgrades. Avoid `npm audit fix --force` without reviewing major-version changes.
